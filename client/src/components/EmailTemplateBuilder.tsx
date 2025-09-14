import { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
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
  Type, Image, Table2, MousePointer, Square, Minus,
  GripVertical, Plus, Trash2, Settings, X, Eye,
  FileText, Mail, AlertCircle
} from 'lucide-react';
import type { EmailTemplate, TemplateComponent } from '@shared/schema';

interface EmailTemplateBuilderProps {
  template?: EmailTemplate | null;
  onSave: (template: Partial<EmailTemplate>) => void;
  onCancel: () => void;
}

// Email component types
const EMAIL_COMPONENT_TYPES = [
  { type: 'header', label: 'Header', icon: Square, description: 'Email header with logo' },
  { type: 'text', label: 'Text', icon: Type, description: 'Text content block' },
  { type: 'button', label: 'Button', icon: MousePointer, description: 'Call-to-action button' },
  { type: 'image', label: 'Image', icon: Image, description: 'Image or logo' },
  { type: 'table', label: 'Table', icon: Table2, description: 'Data table' },
  { type: 'quote_summary', label: 'Quote Summary', icon: FileText, description: 'Quote details summary' },
  { type: 'divider', label: 'Divider', icon: Minus, description: 'Horizontal separator' },
  { type: 'info_box', label: 'Alert Box', icon: AlertCircle, description: 'Highlighted information' },
  { type: 'footer', label: 'Footer', icon: Square, description: 'Email footer' },
];

// Common email variables
const EMAIL_VARIABLES = [
  '{{contact.name}}',
  '{{contact.email}}',
  '{{contact.phone}}',
  '{{project.eventType}}',
  '{{project.eventDate}}',
  '{{project.groupSize}}',
  '{{quote.total}}',
  '{{quote.deposit}}',
  '{{quote.id}}',
  '{{quote.expiresAt}}',
  '{{company.name}}',
  '{{company.phone}}',
  '{{company.email}}',
  '{{company.website}}',
];

// Sortable email component
function SortableEmailComponent({ component, onEdit, onDelete }: {
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

  const ComponentIcon = EMAIL_COMPONENT_TYPES.find(t => t.type === component.type)?.icon || Type;

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
          {component.type === 'text' && component.properties.content && (
            <div className="text-sm text-gray-500 truncate">{component.properties.content}</div>
          )}
          {component.type === 'button' && component.properties.text && (
            <Badge variant="secondary" className="text-xs">{component.properties.text}</Badge>
          )}
        </div>
        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onEdit(component.id)}
            data-testid={`button-edit-email-component-${component.id}`}
          >
            <Settings className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onDelete(component.id)}
            data-testid={`button-delete-email-component-${component.id}`}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}

export default function EmailTemplateBuilder({ template, onSave, onCancel }: EmailTemplateBuilderProps) {
  const [name, setName] = useState(template?.name || '');
  const [description, setDescription] = useState(template?.description || '');
  const [templateType, setTemplateType] = useState(template?.templateType || 'quote_delivery');
  const [subject, setSubject] = useState(template?.subject || '');
  const [components, setComponents] = useState<TemplateComponent[]>(
    template?.components || []
  );
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

    if (active.id !== over.id) {
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
    const componentInfo = EMAIL_COMPONENT_TYPES.find(t => t.type === type);
    const newComponent: TemplateComponent = {
      id: `component-${Date.now()}`,
      type: type as any,
      properties: {
        title: componentInfo?.label || type,
      },
      order: components.length,
      children: [],
    };
    
    // Set default properties based on type
    if (type === 'header') {
      newComponent.properties = {
        ...newComponent.properties,
        logoUrl: '/logo.png',
        backgroundColor: '#3B82F6',
        textColor: '#FFFFFF',
      };
    } else if (type === 'button') {
      newComponent.properties = {
        ...newComponent.properties,
        text: 'View Quote',
        url: '{{quote.url}}',
        backgroundColor: '#10B981',
        textColor: '#FFFFFF',
      };
    } else if (type === 'footer') {
      newComponent.properties = {
        ...newComponent.properties,
        content: 'Premier Party Cruises | (512) 565-6209 | info@premierpartycruises.com',
        backgroundColor: '#F3F4F6',
        textColor: '#6B7280',
      };
    }
    
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
    const templateData: Partial<EmailTemplate> = {
      name,
      description,
      templateType,
      subject,
      components,
      variables: EMAIL_VARIABLES.filter(v => 
        subject.includes(v) || 
        components.some(c => JSON.stringify(c.properties).includes(v))
      ),
      active: true,
    };
    onSave(templateData);
  };

  const insertVariable = (variable: string) => {
    if (selectedComponent) {
      const component = components.find(c => c.id === selectedComponent);
      if (component && (component.type === 'text' || component.type === 'button')) {
        const property = component.type === 'button' ? 'text' : 'content';
        const currentValue = component.properties[property] || '';
        updateComponentProperty(selectedComponent, property, currentValue + ' ' + variable);
      }
    } else {
      setSubject(subject + ' ' + variable);
    }
  };

  const selectedComponentData = components.find(c => c.id === selectedComponent);

  return (
    <div className="flex flex-col h-full">
      <div className="p-4 border-b">
        <div className="flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">
              {template ? 'Edit Email Template' : 'Create Email Template'}
            </h2>
            <p className="text-gray-600">Design reusable email templates</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreview(!showPreview)}
              data-testid="button-toggle-email-preview"
            >
              <Eye className="h-4 w-4 mr-2" />
              {showPreview ? 'Hide' : 'Show'} Preview
            </Button>
            <Button onClick={handleSave} data-testid="button-save-email-template">
              Save Template
            </Button>
            <Button variant="outline" onClick={onCancel} data-testid="button-cancel-email">
              Cancel
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Component Library & Variables */}
        <div className="w-64 border-r bg-gray-50">
          <div className="p-4 border-b">
            <h3 className="font-semibold mb-3">Components</h3>
            <ScrollArea className="h-64">
              <div className="space-y-2 pr-4">
                {EMAIL_COMPONENT_TYPES.map(component => (
                  <div
                    key={component.type}
                    className="bg-white border rounded-lg p-3 cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleAddComponent(component.type)}
                    data-testid={`email-component-library-${component.type}`}
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
          
          <div className="p-4">
            <h3 className="font-semibold mb-3">Variables</h3>
            <ScrollArea className="h-64">
              <div className="space-y-1 pr-4">
                {EMAIL_VARIABLES.map(variable => (
                  <div
                    key={variable}
                    className="px-2 py-1 text-xs font-mono bg-gray-100 rounded cursor-pointer hover:bg-gray-200"
                    onClick={() => insertVariable(variable)}
                    data-testid={`variable-${variable}`}
                  >
                    {variable}
                  </div>
                ))}
              </div>
            </ScrollArea>
            <p className="text-xs text-gray-500 mt-2">
              Click to insert into selected component or subject
            </p>
          </div>
        </div>

        {/* Canvas */}
        <div className="flex-1 p-6 overflow-auto">
          <div className="max-w-4xl mx-auto">
            {/* Template Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Email Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Template Name</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Quote Delivery - Standard"
                      data-testid="input-email-template-name"
                    />
                  </div>
                  <div>
                    <Label>Template Type</Label>
                    <Select value={templateType} onValueChange={setTemplateType}>
                      <SelectTrigger data-testid="select-email-type">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="quote_delivery">Quote Delivery</SelectItem>
                        <SelectItem value="payment_confirmation">Payment Confirmation</SelectItem>
                        <SelectItem value="booking_confirmation">Booking Confirmation</SelectItem>
                        <SelectItem value="follow_up">Follow Up</SelectItem>
                        <SelectItem value="reminder">Reminder</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div>
                  <Label>Subject Line</Label>
                  <Input
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="e.g., Your {{project.eventType}} Quote from Premier Party Cruises"
                    data-testid="input-email-subject"
                  />
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe when this template is used..."
                    data-testid="textarea-email-description"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Email Preview */}
            {showPreview && (
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>Email Preview</CardTitle>
                  <CardDescription>
                    Preview with sample data
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="border rounded-lg overflow-hidden">
                    <div className="bg-gray-100 p-4 border-b">
                      <div className="text-sm text-gray-600 mb-1">Subject:</div>
                      <div className="font-medium">
                        {subject.replace(/\{\{[^}]+\}\}/g, (match) => {
                          const sampleData: Record<string, string> = {
                            '{{contact.name}}': 'John Doe',
                            '{{project.eventType}}': 'Bachelor Party',
                            '{{quote.total}}': '$2,500',
                          };
                          return sampleData[match] || match;
                        })}
                      </div>
                    </div>
                    <div className="p-6 bg-white">
                      {components.map((component) => (
                        <div key={component.id} className="mb-4">
                          {component.type === 'header' && (
                            <div className="text-center py-4" style={{ backgroundColor: component.properties.backgroundColor || '#3B82F6' }}>
                              <h1 className="text-2xl font-bold" style={{ color: component.properties.textColor || '#FFFFFF' }}>
                                Premier Party Cruises
                              </h1>
                            </div>
                          )}
                          {component.type === 'text' && (
                            <p className="text-gray-700">
                              {(component.properties.content || '').replace(/\{\{[^}]+\}\}/g, (match) => {
                                const sampleData: Record<string, string> = {
                                  '{{contact.name}}': 'John Doe',
                                  '{{project.eventType}}': 'Bachelor Party',
                                  '{{project.eventDate}}': 'Saturday, September 26, 2025',
                                  '{{quote.total}}': '$2,500',
                                };
                                return sampleData[match] || match;
                              })}
                            </p>
                          )}
                          {component.type === 'button' && (
                            <div className="text-center">
                              <button
                                className="px-6 py-3 rounded-lg font-medium"
                                style={{
                                  backgroundColor: component.properties.backgroundColor || '#10B981',
                                  color: component.properties.textColor || '#FFFFFF',
                                }}
                              >
                                {component.properties.text || 'Click Here'}
                              </button>
                            </div>
                          )}
                          {component.type === 'divider' && (
                            <hr className="my-4 border-gray-200" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Components Canvas */}
            <Card>
              <CardHeader>
                <CardTitle>Email Components</CardTitle>
                <CardDescription>
                  Build your email by adding and arranging components
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
                          <SortableEmailComponent
                            key={component.id}
                            component={component}
                            onEdit={handleEditComponent}
                            onDelete={handleDeleteComponent}
                          />
                        ))}
                      </div>
                    ) : (
                      <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg">
                        <Mail className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                        <p className="text-lg font-medium mb-1">No components yet</p>
                        <p className="text-sm">Click components in the library to add them</p>
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
                data-testid="button-close-email-properties"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <ScrollArea className="h-full">
              <div className="space-y-4 pr-4">
                {selectedComponentData.type === 'text' && (
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      value={selectedComponentData.properties.content || ''}
                      onChange={(e) => updateComponentProperty(selectedComponentData.id, 'content', e.target.value)}
                      rows={6}
                      placeholder="Enter text content. Use variables like {{contact.name}}"
                      data-testid="textarea-email-content"
                    />
                  </div>
                )}
                
                {selectedComponentData.type === 'button' && (
                  <>
                    <div>
                      <Label>Button Text</Label>
                      <Input
                        value={selectedComponentData.properties.text || ''}
                        onChange={(e) => updateComponentProperty(selectedComponentData.id, 'text', e.target.value)}
                        placeholder="e.g., View Quote"
                        data-testid="input-button-text"
                      />
                    </div>
                    <div>
                      <Label>Link URL</Label>
                      <Input
                        value={selectedComponentData.properties.url || ''}
                        onChange={(e) => updateComponentProperty(selectedComponentData.id, 'url', e.target.value)}
                        placeholder="e.g., {{quote.url}}"
                        data-testid="input-button-url"
                      />
                    </div>
                    <div>
                      <Label>Button Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          className="w-20 h-10"
                          value={selectedComponentData.properties.backgroundColor || '#10B981'}
                          onChange={(e) => updateComponentProperty(selectedComponentData.id, 'backgroundColor', e.target.value)}
                          data-testid="input-button-color"
                        />
                        <Input
                          value={selectedComponentData.properties.backgroundColor || '#10B981'}
                          onChange={(e) => updateComponentProperty(selectedComponentData.id, 'backgroundColor', e.target.value)}
                          className="flex-1"
                          data-testid="input-button-hex"
                        />
                      </div>
                    </div>
                    <div>
                      <Label>Text Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          className="w-20 h-10"
                          value={selectedComponentData.properties.textColor || '#FFFFFF'}
                          onChange={(e) => updateComponentProperty(selectedComponentData.id, 'textColor', e.target.value)}
                          data-testid="input-text-color"
                        />
                        <Input
                          value={selectedComponentData.properties.textColor || '#FFFFFF'}
                          onChange={(e) => updateComponentProperty(selectedComponentData.id, 'textColor', e.target.value)}
                          className="flex-1"
                          data-testid="input-text-hex"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {selectedComponentData.type === 'header' && (
                  <>
                    <div>
                      <Label>Logo URL</Label>
                      <Input
                        value={selectedComponentData.properties.logoUrl || ''}
                        onChange={(e) => updateComponentProperty(selectedComponentData.id, 'logoUrl', e.target.value)}
                        placeholder="/logo.png"
                        data-testid="input-logo-url"
                      />
                    </div>
                    <div>
                      <Label>Background Color</Label>
                      <div className="flex gap-2 mt-1">
                        <Input
                          type="color"
                          className="w-20 h-10"
                          value={selectedComponentData.properties.backgroundColor || '#3B82F6'}
                          onChange={(e) => updateComponentProperty(selectedComponentData.id, 'backgroundColor', e.target.value)}
                          data-testid="input-header-bg-color"
                        />
                        <Input
                          value={selectedComponentData.properties.backgroundColor || '#3B82F6'}
                          onChange={(e) => updateComponentProperty(selectedComponentData.id, 'backgroundColor', e.target.value)}
                          className="flex-1"
                          data-testid="input-header-bg-hex"
                        />
                      </div>
                    </div>
                  </>
                )}
                
                {selectedComponentData.type === 'footer' && (
                  <div>
                    <Label>Footer Content</Label>
                    <Textarea
                      value={selectedComponentData.properties.content || ''}
                      onChange={(e) => updateComponentProperty(selectedComponentData.id, 'content', e.target.value)}
                      rows={3}
                      placeholder="Company info, unsubscribe link, etc."
                      data-testid="textarea-footer-content"
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
                      <Label>Box Type</Label>
                      <Select
                        value={selectedComponentData.properties.boxType || 'info'}
                        onValueChange={(value) => updateComponentProperty(selectedComponentData.id, 'boxType', value)}
                      >
                        <SelectTrigger data-testid="select-info-type">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="info">Info (Blue)</SelectItem>
                          <SelectItem value="warning">Warning (Yellow)</SelectItem>
                          <SelectItem value="success">Success (Green)</SelectItem>
                          <SelectItem value="error">Error (Red)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div>
                  <Label>Alignment</Label>
                  <Select
                    value={selectedComponentData.properties.alignment || 'left'}
                    onValueChange={(value) => updateComponentProperty(selectedComponentData.id, 'alignment', value)}
                  >
                    <SelectTrigger data-testid="select-alignment">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="left">Left</SelectItem>
                      <SelectItem value="center">Center</SelectItem>
                      <SelectItem value="right">Right</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label>Padding</Label>
                  <Select
                    value={selectedComponentData.properties.padding || 'normal'}
                    onValueChange={(value) => updateComponentProperty(selectedComponentData.id, 'padding', value)}
                  >
                    <SelectTrigger data-testid="select-padding">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      <SelectItem value="small">Small</SelectItem>
                      <SelectItem value="normal">Normal</SelectItem>
                      <SelectItem value="large">Large</SelectItem>
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