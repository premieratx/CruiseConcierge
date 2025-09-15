import { useState, useCallback, useEffect } from 'react';
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
  useDraggable,
  useDroppable,
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
import { Alert, AlertDescription } from '@/components/ui/alert';
import { useToast } from '@/hooks/use-toast';
import { 
  Type, List, RadioIcon, CheckSquare, Hash, Info, Minus, 
  DollarSign, FileText, Image, Table, Grid, GripVertical,
  Plus, Trash2, Copy, Eye, Settings, X, AlertCircle, CheckCircle,
  AlertTriangle, XCircle
} from 'lucide-react';
import { z } from 'zod';
import type { QuoteTemplate, TemplateComponent } from '@shared/schema';

interface QuoteTemplateBuilderProps {
  template?: QuoteTemplate | null;
  onSave: (template: Partial<QuoteTemplate>) => void;
  onCancel: () => void;
}

// Validation schemas
const templateValidationSchema = z.object({
  name: z.string()
    .min(1, "Template name is required")
    .max(100, "Template name cannot exceed 100 characters")
    .regex(/^[a-zA-Z0-9\s\-_,()]+$/, "Template name contains invalid characters"),
  description: z.string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  eventType: z.string()
    .min(1, "Event type is required"),
  duration: z.number()
    .min(1, "Duration must be at least 1 hour")
    .max(12, "Duration cannot exceed 12 hours")
    .int("Duration must be a whole number"),
  minGroupSize: z.number()
    .min(1, "Minimum group size must be at least 1")
    .max(1000, "Minimum group size cannot exceed 1000")
    .int("Group size must be a whole number")
    .optional(),
  maxGroupSize: z.number()
    .min(1, "Maximum group size must be at least 1")
    .max(1000, "Maximum group size cannot exceed 1000")
    .int("Group size must be a whole number")
    .optional(),
}).refine((data) => {
  if (data.minGroupSize && data.maxGroupSize) {
    return data.minGroupSize <= data.maxGroupSize;
  }
  return true;
}, {
  message: "Minimum group size cannot be greater than maximum group size",
  path: ["maxGroupSize"],
});

const componentValidationSchema = z.object({
  title: z.string().min(1, "Component title is required"),
  options: z.array(z.string()).optional().refine((options) => {
    if (options && options.length > 0) {
      return options.every(option => option.trim().length > 0);
    }
    return true;
  }, "All options must be non-empty"),
});

type ValidationErrors = Record<string, string>;
type ComponentValidationErrors = Record<string, Record<string, string>>;

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

// Component renderer for preview mode
function ComponentRenderer({ component }: { component: TemplateComponent }) {
  const { type, properties } = component;

  switch (type) {
    case 'header':
      return (
        <div className="text-center border-b pb-4 mb-6">
          <h1 className="text-3xl font-bold text-gray-800">
            {properties.title || 'Quote Header'}
          </h1>
          {properties.subtitle && (
            <p className="text-lg text-gray-600 mt-2">{properties.subtitle}</p>
          )}
        </div>
      );

    case 'text':
      return (
        <div className="prose max-w-none">
          <h3 className="text-lg font-semibold mb-2">{properties.title}</h3>
          {properties.content && (
            <div className="text-gray-700 whitespace-pre-wrap">{properties.content}</div>
          )}
        </div>
      );

    case 'line_items':
      return (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">{properties.title || 'Services'}</h3>
          <div className="space-y-2">
            {properties.items ? properties.items.map((item: any, idx: number) => (
              <div key={idx} className="flex justify-between items-center py-2 border-b last:border-b-0">
                <div className="flex-1">
                  <span className="font-medium">{item.name}</span>
                  {item.description && (
                    <p className="text-sm text-gray-600">{item.description}</p>
                  )}
                </div>
                <div className="text-right">
                  <span className="font-semibold">${item.price || 0}</span>
                  {item.quantity && item.quantity > 1 && (
                    <p className="text-xs text-gray-500">qty: {item.quantity}</p>
                  )}
                </div>
              </div>
            )) : (
              <div className="text-gray-500 italic">No items configured</div>
            )}
          </div>
        </div>
      );

    case 'radio_group':
      return (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">
            {properties.title}
            {properties.required && <span className="text-red-500 ml-1">*</span>}
          </h3>
          {properties.description && (
            <p className="text-gray-600 mb-3">{properties.description}</p>
          )}
          <div className="space-y-2">
            {properties.options ? properties.options.map((option: string, idx: number) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer">
                <input type="radio" name={component.id} className="text-blue-600" />
                <span>{option}</span>
              </label>
            )) : (
              <div className="text-gray-500 italic">No options configured</div>
            )}
          </div>
        </div>
      );

    case 'checkbox_group':
      return (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">{properties.title}</h3>
          {properties.description && (
            <p className="text-gray-600 mb-3">{properties.description}</p>
          )}
          <div className="space-y-2">
            {properties.options ? properties.options.map((option: string, idx: number) => (
              <label key={idx} className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="text-blue-600" />
                <span>{option}</span>
              </label>
            )) : (
              <div className="text-gray-500 italic">No options configured</div>
            )}
          </div>
        </div>
      );

    case 'quantity_selector':
      return (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">{properties.title}</h3>
          <div className="flex items-center gap-3">
            <Button variant="outline" size="sm">-</Button>
            <span className="w-12 text-center font-medium">1</span>
            <Button variant="outline" size="sm">+</Button>
          </div>
        </div>
      );

    case 'info_box':
      const boxTypeStyles = {
        info: 'bg-blue-50 border-blue-200 text-blue-800',
        warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
        success: 'bg-green-50 border-green-200 text-green-800',
        error: 'bg-red-50 border-red-200 text-red-800',
      };
      const iconMap = {
        info: Info,
        warning: AlertTriangle,
        success: CheckCircle,
        error: XCircle,
      };
      const boxType = properties.boxType || 'info';
      const IconComponent = iconMap[boxType as keyof typeof iconMap];
      
      return (
        <div className={`border rounded-lg p-4 ${boxTypeStyles[boxType as keyof typeof boxTypeStyles]}`}>
          <div className="flex items-start gap-3">
            <IconComponent className="h-5 w-5 flex-shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold mb-1">{properties.title}</h3>
              {properties.message && (
                <p className="text-sm">{properties.message}</p>
              )}
            </div>
          </div>
        </div>
      );

    case 'divider':
      return <hr className="border-gray-300 my-6" />;

    case 'pricing_breakdown':
      return (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="text-lg font-semibold mb-3">{properties.title || 'Pricing Summary'}</h3>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>$0.00</span>
            </div>
            {properties.showDeposit && (
              <div className="flex justify-between">
                <span>Deposit Required:</span>
                <span>$0.00</span>
              </div>
            )}
            <div className="border-t pt-2 flex justify-between font-semibold">
              <span>Total:</span>
              <span>$0.00</span>
            </div>
            {properties.showPerPerson && (
              <div className="text-sm text-gray-600">
                Per person: $0.00
              </div>
            )}
          </div>
        </div>
      );

    case 'terms':
      return (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">{properties.title || 'Terms & Conditions'}</h3>
          <div className="text-sm text-gray-700 space-y-2">
            <p>• Payment is due within 30 days of booking confirmation</p>
            <p>• Cancellations require 48-hour notice</p>
            <p>• Additional charges may apply for special requests</p>
          </div>
        </div>
      );

    case 'image':
      return (
        <div className="border rounded-lg p-4 text-center">
          <div className="bg-gray-100 rounded-lg h-48 flex items-center justify-center">
            <div className="text-gray-500">
              <Image className="h-12 w-12 mx-auto mb-2" />
              <p>{properties.title || 'Image Placeholder'}</p>
            </div>
          </div>
        </div>
      );

    case 'table':
      return (
        <div className="border rounded-lg p-4">
          <h3 className="text-lg font-semibold mb-3">{properties.title || 'Data Table'}</h3>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 p-2 text-left">Item</th>
                  <th className="border border-gray-300 p-2 text-left">Description</th>
                  <th className="border border-gray-300 p-2 text-right">Price</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-gray-300 p-2">Sample Item</td>
                  <td className="border border-gray-300 p-2">Sample description</td>
                  <td className="border border-gray-300 p-2 text-right">$0.00</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      );

    case 'quote_summary':
      return (
        <div className="border-2 border-gray-300 rounded-lg p-6 bg-gray-50">
          <h2 className="text-xl font-bold mb-4">{properties.title || 'Quote Summary'}</h2>
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p><strong>Event Type:</strong> Bachelor Party</p>
              <p><strong>Duration:</strong> 4 hours</p>
              <p><strong>Group Size:</strong> 25 people</p>
            </div>
            <div>
              <p><strong>Total Cost:</strong> $0.00</p>
              <p><strong>Deposit:</strong> $0.00</p>
              <p><strong>Balance:</strong> $0.00</p>
            </div>
          </div>
        </div>
      );

    default:
      return (
        <div className="border rounded-lg p-4 bg-gray-50">
          <h3 className="font-semibold text-gray-600">{properties.title || type}</h3>
          <p className="text-sm text-gray-500">Component preview not available</p>
        </div>
      );
  }
}

// Template preview component
function TemplatePreview({ template, components }: { 
  template: { name: string; description: string; eventType: string; duration: number; minGroupSize: number; maxGroupSize: number }; 
  components: TemplateComponent[] 
}) {
  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{template.name || 'Untitled Template'}</CardTitle>
              <CardDescription className="mt-2">{template.description}</CardDescription>
            </div>
            <Badge variant="secondary">{template.eventType}</Badge>
          </div>
          <div className="flex gap-4 text-sm text-gray-600 mt-4">
            <span>Duration: {template.duration}h</span>
            <span>Group: {template.minGroupSize}-{template.maxGroupSize} people</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-6" data-testid="template-preview-content">
            {components.length > 0 ? (
              components
                .sort((a, b) => a.order - b.order)
                .map((component) => (
                  <ComponentRenderer key={component.id} component={component} />
                ))
            ) : (
              <div className="text-center py-12 text-gray-500">
                <Grid className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                <p className="text-lg font-medium mb-1">No components in template</p>
                <p className="text-sm">Add components to see them in the preview</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

// Draggable library component
function DraggableLibraryComponent({ component, onAddComponent }: { 
  component: typeof COMPONENT_TYPES[0];
  onAddComponent: (type: string) => void;
}) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: `library-${component.type}`,
    data: {
      type: 'library-component',
      componentType: component.type,
    },
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className="bg-white border rounded-lg p-3 cursor-grab active:cursor-grabbing hover:shadow-md transition-shadow"
      onClick={() => onAddComponent(component.type)}
      data-testid={`component-library-${component.type}`}
    >
      <div className="flex items-center gap-2 mb-1">
        <component.icon className="h-4 w-4 text-gray-500" />
        <span className="font-medium text-sm">{component.label}</span>
      </div>
      <p className="text-xs text-gray-500">{component.description}</p>
    </div>
  );
}

// Droppable canvas area
function DroppableCanvas({ children, onDrop }: { children: React.ReactNode; onDrop?: () => void }) {
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas-dropzone',
  });

  return (
    <div
      ref={setNodeRef}
      className={`transition-colors ${isOver ? 'bg-blue-50 border-blue-200' : ''}`}
    >
      {children}
    </div>
  );
}

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
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
  const [componentErrors, setComponentErrors] = useState<ComponentValidationErrors>({});
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Validation functions
  const validateTemplate = useCallback(() => {
    const templateData = {
      name,
      description,
      eventType,
      duration,
      minGroupSize: minGroupSize || undefined,
      maxGroupSize: maxGroupSize || undefined,
    };

    try {
      templateValidationSchema.parse(templateData);
      setValidationErrors({});
      return { valid: true, errors: {} };
    } catch (error) {
      if (error instanceof z.ZodError) {
        const errors: ValidationErrors = {};
        error.errors.forEach(err => {
          const path = err.path.join('.');
          errors[path] = err.message;
        });
        setValidationErrors(errors);
        return { valid: false, errors };
      }
      return { valid: false, errors: { general: "Validation failed" } };
    }
  }, [name, description, eventType, duration, minGroupSize, maxGroupSize]);

  const validateComponent = useCallback((component: TemplateComponent) => {
    const errors: Record<string, string> = {};
    
    if (!component.properties.title) {
      errors.title = "Component title is required";
    }
    
    // Validate specific component types
    if (component.type === 'radio_group' || component.type === 'checkbox_group') {
      if (!component.properties.options || component.properties.options.length === 0) {
        errors.options = "At least one option is required";
      } else if (component.properties.options.some((opt: string) => !opt.trim())) {
        errors.options = "All options must be non-empty";
      }
    }
    
    if (component.type === 'line_items') {
      if (component.properties.items) {
        component.properties.items.forEach((item: any, index: number) => {
          if (!item.name) {
            errors[`item_${index}_name`] = `Item ${index + 1} name is required`;
          }
          if (item.price && (isNaN(item.price) || item.price < 0)) {
            errors[`item_${index}_price`] = `Item ${index + 1} price must be a non-negative number`;
          }
        });
      }
    }
    
    return errors;
  }, []);

  const validateAllComponents = useCallback(() => {
    const allErrors: ComponentValidationErrors = {};
    
    components.forEach(component => {
      const componentErrors = validateComponent(component);
      if (Object.keys(componentErrors).length > 0) {
        allErrors[component.id] = componentErrors;
      }
    });
    
    setComponentErrors(allErrors);
    return Object.keys(allErrors).length === 0;
  }, [components, validateComponent]);

  // Real-time validation effect
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      validateTemplate();
      validateAllComponents();
    }, 300); // Debounce validation
    
    return () => clearTimeout(timeoutId);
  }, [validateTemplate, validateAllComponents]);

  // Validation error display component
  const ValidationError = ({ field, className = "" }: { field: string; className?: string }) => {
    const error = validationErrors[field];
    if (!error) return null;
    
    return (
      <p className={`text-sm text-red-500 mt-1 flex items-center gap-1 ${className}`} data-testid={`validation-error-${field}`}>
        <AlertCircle className="h-3 w-3" />
        {error}
      </p>
    );
  };

  // Component validation error display
  const ComponentValidationError = ({ componentId, field }: { componentId: string; field: string }) => {
    const error = componentErrors[componentId]?.[field];
    if (!error) return null;
    
    return (
      <p className="text-sm text-red-500 mt-1 flex items-center gap-1" data-testid={`component-error-${componentId}-${field}`}>
        <AlertCircle className="h-3 w-3" />
        {error}
      </p>
    );
  };

  // Check if template is valid
  const isTemplateValid = Object.keys(validationErrors).length === 0 && Object.keys(componentErrors).length === 0;

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (!over) {
      setActiveId(null);
      return;
    }

    // If dragging from component library to canvas
    if (active.id.toString().startsWith('library-')) {
      const componentType = active.id.toString().replace('library-', '');
      
      // Calculate insertion position based on drop target
      let insertIndex = components.length; // Default to end
      
      if (over.id && over.id !== 'canvas-dropzone') {
        // Find position of target component
        const targetIndex = components.findIndex(c => c.id === over.id);
        if (targetIndex !== -1) {
          insertIndex = targetIndex + 1; // Insert after target
        }
      }
      
      const newComponent: TemplateComponent = {
        id: `component-${Date.now()}`,
        type: componentType as any,
        properties: {
          title: COMPONENT_TYPES.find(t => t.type === componentType)?.label || componentType,
        },
        order: insertIndex,
        children: [],
      };
      
      // Insert component at calculated position
      const newComponents = [...components];
      newComponents.splice(insertIndex, 0, newComponent);
      // Reorder all components to maintain proper order values
      setComponents(newComponents.map((item, index) => ({ ...item, order: index })));
    }
    // If reordering existing components
    else if (active.id !== over.id && !active.id.toString().startsWith('library-')) {
      setComponents((items) => {
        const oldIndex = items.findIndex(i => i.id === active.id);
        const newIndex = items.findIndex(i => i.id === over.id);
        
        if (oldIndex !== -1 && newIndex !== -1) {
          const reordered = arrayMove(items, oldIndex, newIndex);
          return reordered.map((item, index) => ({ ...item, order: index }));
        }
        return items;
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
    
    // Clear component-specific validation errors when user makes changes
    if (componentErrors[id]) {
      setComponentErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[id];
        return newErrors;
      });
    }
  };

  const handleSave = () => {
    setIsValidating(true);
    
    // Validate template and components before saving
    const templateValidation = validateTemplate();
    const componentsValid = validateAllComponents();
    
    if (!templateValidation.valid || !componentsValid) {
      setIsValidating(false);
      
      // Show validation error toast
      const errorCount = Object.keys(validationErrors).length + Object.keys(componentErrors).length;
      toast({
        title: "Validation Failed",
        description: `Please fix ${errorCount} error${errorCount !== 1 ? 's' : ''} before saving the template.`,
        variant: "destructive",
      });
      
      // Scroll to first error
      const firstErrorElement = document.querySelector('[data-testid^="validation-error-"], [data-testid^="component-error-"]');
      if (firstErrorElement) {
        firstErrorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }
    
    // Validation passed, proceed with save
    try {
      const templateData: Partial<QuoteTemplate> = {
        name: name.trim(),
        description: description?.trim() || undefined,
        eventType,
        duration,
        minGroupSize: minGroupSize || undefined,
        maxGroupSize: maxGroupSize || undefined,
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
      
      toast({
        title: "Template Saved",
        description: "Quote template has been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "An error occurred while saving the template. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsValidating(false);
    }
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
            <Button 
              onClick={handleSave} 
              disabled={!isTemplateValid || isValidating}
              data-testid="button-save-template"
            >
              {isValidating ? "Validating..." : "Save Template"}
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
          <p className="text-xs text-gray-600 mb-3">Drag to canvas or click to add</p>
          <ScrollArea className="h-full">
            <div className="space-y-2 pr-4">
              {COMPONENT_TYPES.map(component => (
                <DraggableLibraryComponent
                  key={component.type}
                  component={component}
                  onAddComponent={handleAddComponent}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Canvas / Preview */}
        <div className="flex-1 p-6 overflow-auto">
          {showPreview ? (
            <TemplatePreview
              template={{ name, description, eventType, duration, minGroupSize, maxGroupSize }}
              components={components}
            />
          ) : (
          <div className="max-w-4xl mx-auto">
            {/* Template Info */}
            <Card className="mb-6">
              <CardHeader>
                <CardTitle>Template Information</CardTitle>
              </CardHeader>
              <CardContent className="grid gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>Template Name *</Label>
                    <Input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g., Bachelor Party - 25 Guests"
                      className={validationErrors.name ? "border-red-500 focus:border-red-500" : ""}
                      data-testid="input-template-name"
                    />
                    <ValidationError field="name" />
                  </div>
                  <div>
                    <Label>Event Type *</Label>
                    <Select value={eventType} onValueChange={setEventType}>
                      <SelectTrigger 
                        className={validationErrors.eventType ? "border-red-500 focus:border-red-500" : ""}
                        data-testid="select-event-type"
                      >
                        <SelectValue placeholder="Select event type" />
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
                    <ValidationError field="eventType" />
                  </div>
                </div>
                <div>
                  <Label>Description</Label>
                  <Textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe this template..."
                    className={validationErrors.description ? "border-red-500 focus:border-red-500" : ""}
                    data-testid="textarea-description"
                  />
                  <ValidationError field="description" />
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label>Duration (hours) *</Label>
                    <Input
                      type="number"
                      value={duration}
                      onChange={(e) => setDuration(Number(e.target.value))}
                      min={1}
                      max={12}
                      className={validationErrors.duration ? "border-red-500 focus:border-red-500" : ""}
                      data-testid="input-duration"
                    />
                    <ValidationError field="duration" />
                  </div>
                  <div>
                    <Label>Min Group Size</Label>
                    <Input
                      type="number"
                      value={minGroupSize}
                      onChange={(e) => setMinGroupSize(Number(e.target.value))}
                      min={1}
                      className={validationErrors.minGroupSize ? "border-red-500 focus:border-red-500" : ""}
                      data-testid="input-min-group"
                    />
                    <ValidationError field="minGroupSize" />
                  </div>
                  <div>
                    <Label>Max Group Size</Label>
                    <Input
                      type="number"
                      value={maxGroupSize}
                      onChange={(e) => setMaxGroupSize(Number(e.target.value))}
                      min={1}
                      className={validationErrors.maxGroupSize ? "border-red-500 focus:border-red-500" : ""}
                      data-testid="input-max-group"
                    />
                    <ValidationError field="maxGroupSize" />
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
                  <DroppableCanvas>
                    <SortableContext
                      items={components.map(c => c.id)}
                      strategy={verticalListSortingStrategy}
                    >
                      {components.length > 0 ? (
                        <div className="space-y-2" data-testid="template-components-list">
                          {components
                            .sort((a, b) => a.order - b.order)
                            .map(component => (
                              <SortableComponent
                                key={component.id}
                                component={component}
                                onEdit={handleEditComponent}
                                onDelete={handleDeleteComponent}
                              />
                            ))}
                        </div>
                      ) : (
                        <div className="text-center py-12 text-gray-500 border-2 border-dashed rounded-lg" data-testid="empty-canvas">
                          <Grid className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                          <p className="text-lg font-medium mb-1">No components yet</p>
                          <p className="text-sm">Drag or click components from the library to add them here</p>
                        </div>
                      )}
                    </SortableContext>
                  </DroppableCanvas>
                  <DragOverlay>
                    {activeId ? (
                      <div className="bg-white border rounded-lg p-4 shadow-lg">
                        {activeId.startsWith('library-') ? (
                          <div className="flex items-center gap-2">
                            {(() => {
                              const componentType = activeId.replace('library-', '');
                              const ComponentIcon = COMPONENT_TYPES.find(t => t.type === componentType)?.icon || Type;
                              return (
                                <>
                                  <ComponentIcon className="h-4 w-4 text-gray-500" />
                                  <span className="font-medium text-sm">
                                    {COMPONENT_TYPES.find(t => t.type === componentType)?.label || componentType}
                                  </span>
                                </>
                              );
                            })()}
                          </div>
                        ) : (
                          <div className="flex items-center gap-2">
                            <GripVertical className="h-4 w-4 text-gray-400" />
                            <span className="font-medium text-sm">Moving Component</span>
                          </div>
                        )}
                      </div>
                    ) : null}
                  </DragOverlay>
                </DndContext>
              </CardContent>
            </Card>
          </div>
          )}
        </div>

        {/* Properties Panel */}
        {selectedComponent && selectedComponentData ? (
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
                  <Label>Title *</Label>
                  <Input
                    value={selectedComponentData.properties?.title || ''}
                    onChange={(e) => updateComponentProperty(selectedComponentData.id, 'title', e.target.value)}
                    className={componentErrors[selectedComponentData.id]?.title ? "border-red-500 focus:border-red-500" : ""}
                    data-testid="input-component-title"
                  />
                  <ComponentValidationError componentId={selectedComponentData.id} field="title" />
                </div>
                
                {selectedComponentData.type === 'text' && (
                  <div>
                    <Label>Content</Label>
                    <Textarea
                      value={selectedComponentData.properties?.content || ''}
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
                        value={selectedComponentData.properties?.message || ''}
                        onChange={(e) => updateComponentProperty(selectedComponentData.id, 'message', e.target.value)}
                        rows={3}
                        data-testid="textarea-info-message"
                      />
                    </div>
                    <div>
                      <Label>Type</Label>
                      <Select
                        value={selectedComponentData.properties?.boxType || 'info'}
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
                        checked={selectedComponentData.properties?.showBreakdown || false}
                        onCheckedChange={(checked) => updateComponentProperty(selectedComponentData.id, 'showBreakdown', checked)}
                        data-testid="switch-show-breakdown"
                      />
                    </div>
                    <div className="flex items-center justify-between mb-2">
                      <Label>Show Per Person</Label>
                      <Switch
                        checked={selectedComponentData.properties?.showPerPerson || false}
                        onCheckedChange={(checked) => updateComponentProperty(selectedComponentData.id, 'showPerPerson', checked)}
                        data-testid="switch-show-per-person"
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Show Deposit</Label>
                      <Switch
                        checked={selectedComponentData.properties?.showDeposit || false}
                        onCheckedChange={(checked) => updateComponentProperty(selectedComponentData.id, 'showDeposit', checked)}
                        data-testid="switch-show-deposit"
                      />
                    </div>
                  </div>
                )}
                
                {selectedComponentData.type === 'radio_group' && (
                  <>
                    <div>
                      <Label>Options *</Label>
                      <Textarea
                        value={selectedComponentData.properties?.options?.join('\n') || ''}
                        onChange={(e) => updateComponentProperty(selectedComponentData.id, 'options', e.target.value.split('\n').filter(Boolean))}
                        rows={4}
                        placeholder="One option per line"
                        className={componentErrors[selectedComponentData.id]?.options ? "border-red-500 focus:border-red-500" : ""}
                        data-testid="textarea-radio-options"
                      />
                      <ComponentValidationError componentId={selectedComponentData.id} field="options" />
                    </div>
                    <div className="flex items-center justify-between">
                      <Label>Required</Label>
                      <Switch
                        checked={selectedComponentData.properties?.required || false}
                        onCheckedChange={(checked) => updateComponentProperty(selectedComponentData.id, 'required', checked)}
                        data-testid="switch-required"
                      />
                    </div>
                  </>
                )}
                
                {selectedComponentData.type === 'checkbox_group' && (
                  <>
                    <div>
                      <Label>Options *</Label>
                      <Textarea
                        value={selectedComponentData.properties?.options?.join('\n') || ''}
                        onChange={(e) => updateComponentProperty(selectedComponentData.id, 'options', e.target.value.split('\n').filter(Boolean))}
                        rows={4}
                        placeholder="One option per line"
                        className={componentErrors[selectedComponentData.id]?.options ? "border-red-500 focus:border-red-500" : ""}
                        data-testid="textarea-checkbox-options"
                      />
                      <ComponentValidationError componentId={selectedComponentData.id} field="options" />
                    </div>
                    <div>
                      <Label>Description</Label>
                      <Textarea
                        value={selectedComponentData.properties?.description || ''}
                        onChange={(e) => updateComponentProperty(selectedComponentData.id, 'description', e.target.value)}
                        rows={2}
                        placeholder="Optional description"
                        data-testid="textarea-checkbox-description"
                      />
                    </div>
                  </>
                )}
                
                <Separator />
                
                <div>
                  <Label>Visibility Condition</Label>
                  <Select
                    value={selectedComponentData.properties?.visibilityCondition || 'always'}
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
        ) : (
          <div className="w-80 border-l bg-gray-50 p-4 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <Settings className="h-8 w-8 mx-auto mb-2 text-gray-300" />
              <p className="text-sm font-medium mb-1">No Component Selected</p>
              <p className="text-xs">Click on a component to edit its properties</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}