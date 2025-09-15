import { useState, useCallback } from 'react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Textarea } from '@/components/ui/textarea';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { 
  Type, List, RadioIcon, CheckSquare, Hash, Info, Minus, 
  DollarSign, FileText, Image, Table, Grid, GripVertical,
  Plus, Trash2, Copy, Eye, Settings, X
} from 'lucide-react';
import type { QuoteTemplate, TemplateComponent } from '@shared/schema';

interface QuoteTemplateBuilderProps {
  template?: QuoteTemplate | null;
  onSave: (template: Partial<QuoteTemplate>) => void;
  onCancel: () => void;
}

// Component types available in the builder
const COMPONENT_TYPES = [
  { type: 'header', label: 'Header', icon: Type, description: 'Quote header with title' },
  { type: 'text', label: 'Text Block', icon: Type, description: 'Rich text content' },
  { type: 'line_items', label: 'Line Items', icon: List, description: 'Product/service items' },
  { type: 'radio_group', label: 'Radio Group', icon: RadioIcon, description: 'Single choice options' },
  { type: 'checkbox_group', label: 'Checkbox Group', icon: CheckSquare, description: 'Multiple choice options' },
  { type: 'quantity_selector', label: 'Quantity Selector', icon: Hash, description: 'Number input with +/- buttons' },
  { type: 'info_box', label: 'Info Box', icon: Info, description: 'Highlighted information' },
  { type: 'divider', label: 'Divider', icon: Minus, description: 'Horizontal separator' },
  { type: 'pricing_breakdown', label: 'Pricing', icon: DollarSign, description: 'Cost breakdown' },
  { type: 'terms', label: 'Terms', icon: FileText, description: 'Terms and conditions' },
  { type: 'image', label: 'Image', icon: Image, description: 'Image or logo' },
  { type: 'table', label: 'Table', icon: Table, description: 'Data table' },
  { type: 'quote_summary', label: 'Quote Summary', icon: Grid, description: 'Summary section' },
];

// Sortable component wrapper
function SortableComponent({ component, onEdit, onDelete }: {
  component: TemplateComponent;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: component.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const ComponentIcon = COMPONENT_TYPES.find(t => t.type === component.type)?.icon || Type;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="group relative bg-white border rounded-lg p-4 mb-2 hover:shadow-md transition-shadow"
    >
      <div className="flex items-center gap-3">
        <div
          {...attributes}
          {...listeners}
          className="cursor-move text-gray-400 hover:text-gray-600"
        >
          <GripVertical className="h-5 w-5" />
        </div>
        <ComponentIcon className="h-4 w-4 text-gray-500" />
        <div className="flex-1">
          <div className="font-medium">{component.properties.title || component.type}</div>
          <div className="text-sm text-gray-500">
            {component.properties.description || COMPONENT_TYPES.find(t => t.type === component.type)?.description}
          </div>
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(component.id)}
            data-testid={`button-edit-component-${component.id}`}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(component.id)}
            data-testid={`button-delete-component-${component.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function QuoteTemplateBuilder({ template, onSave, onCancel }: QuoteTemplateBuilderProps) {
  const [name, setName] = useState(template?.name || '');
  const [description, setDescription] = useState(template?.description || '');
  const [eventType, setEventType] = useState(template?.eventType || 'other');
  const [duration, setDuration] = useState(template?.duration || 4);
  const [minGroupSize, setMinGroupSize] = useState(template?.minGroupSize || 1);
  const [maxGroupSize, setMaxGroupSize] = useState(template?.maxGroupSize || 100);
  const [components, setComponents] = useState<TemplateComponent[]>(() => {
    // Load from new components field if available (preferred)
    if (template?.components && template.components.length > 0) {
      return template.components;
    }
    
    // Fall back to reconstructing from legacy fields for backward compatibility
    const reconstructedComponents: TemplateComponent[] = [];
    
    // Reconstruct line_items components from defaultItems
    if (template?.defaultItems && template.defaultItems.length > 0) {
      template.defaultItems.forEach((item, index) => {
        reconstructedComponents.push({
          id: `item-${index}`,
          type: 'line_items',
          properties: item,
          order: reconstructedComponents.length,
          children: [],
        });
      });
    }
    
    // Reconstruct radio_group components from defaultRadioSections
    if (template?.defaultRadioSections && template.defaultRadioSections.length > 0) {
      template.defaultRadioSections.forEach((section, index) => {
        reconstructedComponents.push({
          id: `radio-${index}`,
          type: 'radio_group',
          properties: {
            title: section.title,
            description: section.description,
            required: section.required,
            options: section.options,
          },
          order: reconstructedComponents.length,
          children: [],
        });
      });
    }
    
    return reconstructedComponents;
  });
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) return;

    // If dragging from component library to canvas
    if (active.id.toString().startsWith('library-')) {
      const componentType = active.id.toString().replace('library-', '');
      const newComponent: TemplateComponent = {
        id: `component-${Date.now()}`,
        type: componentType as any,
        properties: {
          title: COMPONENT_TYPES.find(t => t.type === componentType)?.label || componentType,
        },
        order: components.length,
        children: [],
      };
      setComponents([...components, newComponent]);
    }
    // If reordering existing components
    else if (active.id !== over.id) {
      setComponents((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        const reordered = arrayMove(items, oldIndex, newIndex);
        return reordered.map((item, index) => ({ ...item, order: index }));
      });
    }
    
    setActiveId(null);
  };

  const handleAddComponent = (type: string) => {
    const newComponent: TemplateComponent = {
      id: `component-${Date.now()}`,
      type: type as any,
      properties: {
        title: COMPONENT_TYPES.find(t => t.type === type)?.label || type,
      },
      order: components.length,
      children: [],
    };
    setComponents([...components, newComponent]);
  };

  const handleDeleteComponent = (id: string) => {
    setComponents(components.filter(c => c.id !== id));
    if (selectedComponent === id) {
      setSelectedComponent(null);
    }
  };

  const handleEditComponent = (id: string) => {
    setSelectedComponent(id);
  };

  const updateComponentProperty = (id: string, property: string, value: any) => {
    setComponents(components.map(c => 
      c.id === id 
        ? { ...c, properties: { ...c.properties, [property]: value } }
        : c
    ));
  };

  const handleSave = () => {
    // Store full components structure to preserve all data
    const templateData: Partial<QuoteTemplate> = {
      name,
      description,
      eventType,
      duration,
      minGroupSize,
      maxGroupSize,
      // Store full components array in new components field
      components: components,
      // For backward compatibility, properly map components to legacy fields
      defaultItems: components
        .filter(c => c.type === 'line_items')
        .map(c => c.properties as any),
      defaultRadioSections: components
        .filter(c => c.type === 'radio_group')
        .map(c => ({
          id: c.id,
          title: c.properties.title || '',
          description: c.properties.description || '',
          required: c.properties.required || false,
          options: c.properties.options || [],
          order: c.order,
        })),
      active: true,
    };
    onSave(templateData);
  };

  const selectedComponentData = components.find(c => c.id === selectedComponent);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {template ? 'Edit Quote Template' : 'Create Quote Template'}
            </h2>
            <p className="text-gray-600">Design a reusable quote template</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              data-testid="button-toggle-preview"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            <Button onClick={handleSave} data-testid="button-save-template">
              Save Template
            </Button>
            <Button variant="outline" onClick={onCancel} data-testid="button-cancel">
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Component Library */}
        <div className="w-64 border-r bg-gray-50 p-4">
          <h3 className="font-semibold mb-3">Components</h3>
          <ScrollArea className="h-full">
            <div className="space-y-2 pr-4">
              {COMPONENT_TYPES.map(component => (
                <div
                  key={component.type}
                  className="bg-white border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                  onClick={() => handleAddComponent(component.type)}
                  data-testid={`component-library-${component.type}`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <component.icon className="h-4 w-4 text-gray-500" />
                    <span className="font-medium text-sm">{component.label}</span>
                  </div>
                  <p className="text-xs text-gray-500">{component.description}</p>
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Template Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Template Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Template Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Bachelor Party - 25 Guests"
                      data-testid="input-template-name"
                    />
                  </div>
                  <div>
                    <Label>Event Type</Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger data-testid="select-event-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="bachelor">Bachelor Party</SelectItem>
                        <SelectItem value="bachelorette">Bachelorette Party</SelectItem>
                        <SelectItem value="birthday">Birthday Party</SelectItem>
                        <SelectItem value="corporate">Corporate Event</SelectItem>
                        <SelectItem value="wedding">Wedding Reception</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe this template..."
                    data-testid="textarea-description"
                  />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Duration (hours)</Label>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      min={1}
                      max={12}
                      data-testid="input-duration"
                    />
                  </div>
                  <div>
                    <Label>Min Group Size</Label>
                    <Input
                      type="number"
                      value={minGroupSize}
                      onChange={(e) => setMinGroupSize(Number(e.target.value))}
                      min={1}
                      data-testid="input-min-group"
                    />
                  </div>
                  <div>
                    <Label>Max Group Size</Label>
                    <Input
                      type="number"
                      value={maxGroupSize}
                      onChange={(e) => setMaxGroupSize(Number(e.target.value))}
                      min={1}
                      data-testid="input-max-group"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Components Canvas */}
            <Card>
              <CardHeader>
                <CardTitle>Template Components</CardTitle>
                <CardDescription>
                  Drag components from the library or reorder existing ones
                </CardDescription>
              </CardHeader>
              <CardContent>
                <DndContext
                  sensors={sensors}
                  collisionDetection={closestCenter}
                  onDragStart={handleDragStart}
                  onDragEnd={handleDragEnd}
                >
                  <SortableContext
                    items={components.map(c => c.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    {components.length > 0 ? (
                      <div>
                        {components.map(component => (
                          <SortableComponent
                            key={component.id}
                            component={component}
                            onEdit={handleEditComponent}
                            onDelete={handleDeleteComponent}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
                        <Grid className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-lg font-medium mb-1">No components yet</p>
                        <p className="text-sm">Click components in the library to add them here</p>
                      </div>
                    )}
                  </SortableContext>
                </DndContext>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Properties Panel */}
        {selectedComponentData && (
          <div className="w-80 border-l bg-white p-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Component Properties</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedComponent(null)}
                data-testid="button-close-properties"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-full">
              <div className="space-y-4 pr-4">
                <div>
                  <Label>Title</Label>
                  <Input
                    value={selectedComponentData.properties.title || ''}
                    onChange={(e) => updateComponentProperty(selectedComponentData.id, 'title', e.target.value)}
                    data-testid="input-component-title"
                  />
                </div>
                
                {selectedComponentData.type === 'text' && (
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      value={selectedComponentData.properties.content || ''}
                      onChange={(e) => updateComponentProperty(selectedComponentData.id, 'content', e.target.value)}
                      rows={6}
                      data-testid="textarea-component-content"
                    />
                  </div>
                )}
                
                {selectedComponentData.type === 'info_box' && (
                  <>
                    <div>
                      <Label>Message</Label>
                      <Textarea
                        value={selectedComponentData.properties.message || ''}
                        onChange={(e) => updateComponentProperty(selectedComponentData.id, 'message', e.target.value)}
                        rows={3}
                        data-testid="textarea-info-message"
                      />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select
                        value={selectedComponentData.properties.boxType || 'info'}
                        onValueChange={(value) => updateComponentProperty(selectedComponentData.id, 'boxType', value)}
                      >
                        <SelectTrigger data-testid="select-box-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Info</SelectItem>
                          <SelectItem value="warning">Warning</SelectItem>
                          <SelectItem value="success">Success</SelectItem>
                          <SelectItem value="error">Error</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                {selectedComponentData.type === 'pricing_breakdown' && (
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Show Breakdown</Label>
                      <Switch
                        checked={selectedComponentData.properties.showBreakdown || false}
                        onCheckedChange={(checked) => updateComponentProperty(selectedComponentData.id, 'showBreakdown', checked)}
                        data-testid="switch-show-breakdown"
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Show Per Person</Label>
                      <Switch
                        checked={selectedComponentData.properties.showPerPerson || false}
                        onCheckedChange={(checked) => updateComponentProperty(selectedComponentData.id, 'showPerPerson', checked)}
                        data-testid="switch-show-per-person"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Show Deposit</Label>
                      <Switch
                        checked={selectedComponentData.properties.showDeposit || false}
                        onCheckedChange={(checked) => updateComponentProperty(selectedComponentData.id, 'showDeposit', checked)}
                        data-testid="switch-show-deposit"
                      />
                    </div>
                  </div>
                )}
                
                {selectedComponentData.type === 'radio_group' && (
                  <>
                    <div>
                      <Label>Options</Label>
                      <Textarea
                        value={selectedComponentData.properties.options?.join('\n') || ''}
                        onChange={(e) => updateComponentProperty(selectedComponentData.id, 'options', e.target.value.split('\n').filter(Boolean))}
                        rows={4}
                        placeholder="One option per line"
                        data-testid="textarea-radio-options"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Required</Label>
                      <Switch
                        checked={selectedComponentData.properties.required || false}
                        onCheckedChange={(checked) => updateComponentProperty(selectedComponentData.id, 'required', checked)}
                        data-testid="switch-required"
                      />
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div>
                  <Label>Visibility Condition</Label>
                  <Select
                    value={selectedComponentData.properties.visibilityCondition || 'always'}
                    onValueChange={(value) => updateComponentProperty(selectedComponentData.id, 'visibilityCondition', value)}
                  >
                    <SelectTrigger data-testid="select-visibility">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="always">Always Show</SelectItem>
                      <SelectItem value="bachelor">Bachelor Parties Only</SelectItem>
                      <SelectItem value="bachelorette">Bachelorette Parties Only</SelectItem>
                      <SelectItem value="corporate">Corporate Events Only</SelectItem>
                      <SelectItem value="large_group">Large Groups (25+)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </ScrollArea>
          </div>
        )}
      </div>
    </div>
  );
}