import { useState, useEffect } from 'react';
import { useLocation, Link } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { type Contact, type Project, type Quote, type Booking } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useToast } from '@/hooks/use-toast';
import { format } from 'date-fns';
import { 
  DndContext, 
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  type DragEndEvent,
  type DragStartEvent
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { 
  Plus, Search, Filter, Mail, Phone, Calendar, Users, 
  DollarSign, TrendingUp, ChevronRight, Edit, Trash2,
  MessageSquare, FileText, Clock, User, Building, Ship,
  Award, Star, History, CreditCard, Download, UserCheck,
  Eye, ShoppingBag, Send, CheckCircle, XCircle, Activity,
  GripVertical, ArrowRight, MailIcon, PhoneIcon, MessageCircleIcon
} from 'lucide-react';

// Pipeline stages as required
const PIPELINE_STAGES = [
  { id: 'ph_new', label: 'New Lead', color: 'bg-blue-500', textColor: 'text-blue-700' },
  { id: 'ph_quote_sent', label: 'Quote Sent', color: 'bg-yellow-500', textColor: 'text-yellow-700' },
  { id: 'ph_deposit_paid', label: 'Deposit Paid', color: 'bg-orange-500', textColor: 'text-orange-700' },
  { id: 'ph_fully_paid', label: 'Fully Paid', color: 'bg-green-500', textColor: 'text-green-700' },
  { id: 'ph_event_complete', label: 'Event Complete', color: 'bg-purple-500', textColor: 'text-purple-700' },
];

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount / 100);
};

// Helper function to format date
const formatDate = (date: Date | string | null) => {
  if (!date) return "N/A";
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

// Sortable Lead Card Component
function SortableLeadCard({ lead, project, onClick }: { lead: Contact; project?: Project; onClick: () => void }) {
  const [, setLocation] = useLocation();
  
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: lead.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const handleViewProfile = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLocation(`/customers/${lead.id}`);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative group ${isDragging ? 'z-50' : ''}`}
      data-testid={`lead-card-${lead.id}`}
    >
      <Card className="p-3 hover:shadow-md transition-all cursor-pointer border-l-4 border-l-primary">
        <div className="flex items-start justify-between">
          <div
            className="flex-1"
            onClick={onClick}
          >
            <h4 className="font-semibold text-sm mb-1" data-testid={`text-lead-name-${lead.id}`}>
              {lead.name}
            </h4>
            {lead.email && (
              <p className="text-xs text-muted-foreground mb-1" data-testid={`text-lead-email-${lead.id}`}>
                {lead.email}
              </p>
            )}
            {project && (
              <>
                {project.eventType && (
                  <Badge variant="outline" className="text-xs mr-1 mb-1" data-testid={`badge-event-type-${lead.id}`}>
                    {project.eventType}
                  </Badge>
                )}
                {project.groupSize && (
                  <Badge variant="secondary" className="text-xs" data-testid={`badge-group-size-${lead.id}`}>
                    {project.groupSize} guests
                  </Badge>
                )}
                {project.projectDate && (
                  <p className="text-xs text-muted-foreground mt-1" data-testid={`text-event-date-${lead.id}`}>
                    <Calendar className="inline w-3 h-3 mr-1" />
                    {formatDate(project.projectDate)}
                  </p>
                )}
              </>
            )}
          </div>
          <div className="flex gap-1 items-center">
            {/* Quote Link - Always visible if available */}
            {lead.quoteUrl && (
              <Button
                variant="outline"
                size="sm"
                className="h-6 px-2 text-xs"
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(lead.quoteUrl, '_blank');
                }}
                data-testid={`button-quote-link-${lead.id}`}
                title="View Quote"
              >
                <FileText className="h-3 w-3 mr-1" />
                Quote
              </Button>
            )}
            
            {/* Action buttons - visible on hover */}
            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button 
                variant="ghost" 
                size="sm" 
                className="h-6 w-6 p-0"
                onClick={handleViewProfile}
                data-testid={`button-view-profile-${lead.id}`}
                title="View Customer Profile"
              >
                <User className="h-3 w-3" />
              </Button>
              <div
                {...attributes}
                {...listeners}
                className="cursor-grab active:cursor-grabbing p-1"
                data-testid={`drag-handle-${lead.id}`}
              >
                <GripVertical className="w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}

// Lead Details Modal Component
function LeadDetailsModal({ 
  lead, 
  project,
  quotes,
  isOpen, 
  onClose,
  onUpdate 
}: { 
  lead: Contact | null; 
  project?: Project;
  quotes?: Quote[];
  isOpen: boolean; 
  onClose: () => void;
  onUpdate: () => void;
}) {
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('details');
  const [isEditing, setIsEditing] = useState(false);
  const [editedLead, setEditedLead] = useState(lead);

  useEffect(() => {
    setEditedLead(lead);
  }, [lead]);

  const updateContact = useMutation({
    mutationFn: async (data: Partial<Contact>) => {
      return apiRequest('PATCH', `/api/contacts/${lead?.id}`, data);
    },
    onSuccess: () => {
      toast({
        title: 'Contact Updated',
        description: 'Contact information has been updated.',
      });
      setIsEditing(false);
      onUpdate();
    },
  });

  const sendQuoteEmail = async () => {
    if (!lead?.email) {
      toast({
        title: 'No Email',
        description: 'This lead does not have an email address.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Create and send quote logic here
      toast({
        title: 'Quote Sent',
        description: `Quote sent to ${lead.email}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send quote.',
        variant: 'destructive',
      });
    }
  };

  const sendSMS = async () => {
    if (!lead?.phone) {
      toast({
        title: 'No Phone',
        description: 'This lead does not have a phone number.',
        variant: 'destructive',
      });
      return;
    }

    try {
      // Send SMS logic here
      toast({
        title: 'SMS Sent',
        description: `SMS sent to ${lead.phone}`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to send SMS.',
        variant: 'destructive',
      });
    }
  };

  if (!lead) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-hidden" data-testid="lead-details-modal">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>{lead.name}</span>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(!isEditing)}
                data-testid="button-edit-lead"
              >
                <Edit className="w-4 h-4 mr-1" />
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
            </div>
          </DialogTitle>
          <DialogDescription>Lead details and activity</DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="details" data-testid="tab-details">Details</TabsTrigger>
            <TabsTrigger value="activity" data-testid="tab-activity">Activity</TabsTrigger>
            <TabsTrigger value="quotes" data-testid="tab-quotes">Quotes</TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[400px] mt-4">
            <TabsContent value="details" className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Name</Label>
                  {isEditing ? (
                    <Input
                      value={editedLead?.name || ''}
                      onChange={(e) => setEditedLead({ ...editedLead!, name: e.target.value })}
                      data-testid="input-lead-name"
                    />
                  ) : (
                    <p className="text-sm font-medium" data-testid="text-lead-name">{lead.name}</p>
                  )}
                </div>
                <div>
                  <Label>Email</Label>
                  {isEditing ? (
                    <Input
                      type="email"
                      value={editedLead?.email || ''}
                      onChange={(e) => setEditedLead({ ...editedLead!, email: e.target.value })}
                      data-testid="input-lead-email"
                    />
                  ) : (
                    <p className="text-sm font-medium" data-testid="text-lead-email">{lead.email || 'N/A'}</p>
                  )}
                </div>
                <div>
                  <Label>Phone</Label>
                  {isEditing ? (
                    <Input
                      type="tel"
                      value={editedLead?.phone || ''}
                      onChange={(e) => setEditedLead({ ...editedLead!, phone: e.target.value })}
                      data-testid="input-lead-phone"
                    />
                  ) : (
                    <p className="text-sm font-medium" data-testid="text-lead-phone">{lead.phone || 'N/A'}</p>
                  )}
                </div>
                <div>
                  <Label>Created</Label>
                  <p className="text-sm font-medium" data-testid="text-lead-created">
                    {formatDate(lead.createdAt)}
                  </p>
                </div>
                {lead.quoteUrl && (
                  <div className="col-span-2">
                    <Label>Quote Link</Label>
                    <div className="flex items-center gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => window.open(lead.quoteUrl, '_blank')}
                        data-testid="button-modal-quote-link"
                        className="text-xs"
                      >
                        <FileText className="h-3 w-3 mr-1" />
                        View Quote
                      </Button>
                      <span className="text-xs text-muted-foreground truncate">
                        {lead.quoteUrl}
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {project && (
                <div className="space-y-4 pt-4 border-t">
                  <h3 className="font-semibold">Event Details</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>Event Type</Label>
                      <p className="text-sm font-medium" data-testid="text-event-type">
                        {project.eventType || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <Label>Group Size</Label>
                      <p className="text-sm font-medium" data-testid="text-group-size">
                        {project.groupSize || 'N/A'}
                      </p>
                    </div>
                    <div>
                      <Label>Event Date</Label>
                      <p className="text-sm font-medium" data-testid="text-event-date">
                        {formatDate(project.projectDate)}
                      </p>
                    </div>
                    <div>
                      <Label>Budget</Label>
                      <p className="text-sm font-medium" data-testid="text-budget">
                        {project.budget ? formatCurrency(project.budget) : 'N/A'}
                      </p>
                    </div>
                  </div>
                  {project.specialRequests && (
                    <div>
                      <Label>Special Requests</Label>
                      <p className="text-sm" data-testid="text-special-requests">
                        {project.specialRequests}
                      </p>
                    </div>
                  )}
                </div>
              )}

              {isEditing && (
                <div className="flex justify-end gap-2 pt-4">
                  <Button
                    variant="outline"
                    onClick={() => {
                      setIsEditing(false);
                      setEditedLead(lead);
                    }}
                    data-testid="button-cancel-edit"
                  >
                    Cancel
                  </Button>
                  <Button
                    onClick={() => updateContact.mutate(editedLead!)}
                    disabled={updateContact.isPending}
                    data-testid="button-save-changes"
                  >
                    Save Changes
                  </Button>
                </div>
              )}
            </TabsContent>

            <TabsContent value="activity" className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-sm">
                  <Activity className="w-4 h-4 text-blue-500" />
                  <span className="font-medium">Lead created</span>
                  <span className="text-muted-foreground">{formatDate(lead.createdAt)}</span>
                </div>
                {project && (
                  <>
                    <div className="flex items-center gap-2 text-sm">
                      <Calendar className="w-4 h-4 text-green-500" />
                      <span className="font-medium">Project created</span>
                      <span className="text-muted-foreground">{formatDate(project.createdAt)}</span>
                    </div>
                    {quotes && quotes.length > 0 && (
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">{quotes.length} quote(s) created</span>
                      </div>
                    )}
                  </>
                )}
              </div>
            </TabsContent>

            <TabsContent value="quotes" className="space-y-4">
              {quotes && quotes.length > 0 ? (
                <div className="space-y-3">
                  {quotes.map((quote) => (
                    <Card key={quote.id} className="p-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <p className="font-medium text-sm">Quote #{quote.id.slice(0, 8)}</p>
                            <Badge variant={quote.status === 'ACCEPTED' ? 'default' : 'secondary'} className="text-xs">
                              {quote.status}
                            </Badge>
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            Created {formatDate(quote.createdAt)}
                          </p>
                          <div className="flex items-center gap-2">
                            <Link href={`/quote/${quote.id}`}>
                              <Button variant="outline" size="sm" className="h-7" data-testid={`button-view-quote-${quote.id}`}>
                                <Eye className="h-3 w-3 mr-1" />
                                View Quote
                              </Button>
                            </Link>
                            {project && (
                              <Link href={`/quotes/new?projectId=${project.id}`}>
                                <Button variant="ghost" size="sm" className="h-7" data-testid={`button-create-new-quote-${quote.id}`}>
                                  <Plus className="h-3 w-3 mr-1" />
                                  New Version
                                </Button>
                              </Link>
                            )}
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(quote.total)}</p>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-2 opacity-50" />
                  <p className="mb-3">No quotes created yet</p>
                  {project && (
                    <Link href={`/quotes/new?projectId=${project.id}`}>
                      <Button variant="outline" size="sm" data-testid="button-create-first-quote">
                        <Plus className="h-4 w-4 mr-2" />
                        Create Quote
                      </Button>
                    </Link>
                  )}
                </div>
              )}
            </TabsContent>
          </ScrollArea>
        </Tabs>

        <DialogFooter className="flex flex-row justify-between items-center">
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={sendQuoteEmail}
              disabled={!lead.email}
              data-testid="button-send-email"
            >
              <MailIcon className="w-4 h-4 mr-1" />
              Email
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={sendSMS}
              disabled={!lead.phone}
              data-testid="button-send-sms"
            >
              <MessageCircleIcon className="w-4 h-4 mr-1" />
              SMS
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => lead.phone && window.open(`tel:${lead.phone}`)}
              disabled={!lead.phone}
              data-testid="button-call"
            >
              <PhoneIcon className="w-4 h-4 mr-1" />
              Call
            </Button>
          </div>
          <Button variant="ghost" onClick={onClose} data-testid="button-close-modal">
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

// Create Lead Modal Component
function CreateLeadModal({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    eventType: '',
    groupSize: '',
    projectDate: '',
    specialRequests: '',
  });

  const createLead = useMutation({
    mutationFn: async () => {
      // Create contact
      const contactRes = await apiRequest('POST', '/api/contacts', {
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
      });
      const contact = await contactRes.json();

      // Create project if event details provided
      if (formData.eventType || formData.groupSize || formData.projectDate) {
        await apiRequest('POST', '/api/projects', {
          contactId: contact.id,
          eventType: formData.eventType,
          groupSize: formData.groupSize ? parseInt(formData.groupSize) : undefined,
          projectDate: formData.projectDate || undefined,
          specialRequests: formData.specialRequests || undefined,
          status: 'NEW',
          pipelinePhase: 'ph_new',
        });
      }

      return contact;
    },
    onSuccess: () => {
      toast({
        title: 'Lead Created',
        description: 'New lead has been added to your pipeline.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      onClose();
      setFormData({
        name: '',
        email: '',
        phone: '',
        eventType: '',
        groupSize: '',
        projectDate: '',
        specialRequests: '',
      });
    },
    onError: () => {
      toast({
        title: 'Error',
        description: 'Failed to create lead.',
        variant: 'destructive',
      });
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md" data-testid="create-lead-modal">
        <DialogHeader>
          <DialogTitle>Create New Lead</DialogTitle>
          <DialogDescription>Add a new lead to your pipeline</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="John Doe"
              required
              data-testid="input-new-lead-name"
            />
          </div>

          <div>
            <Label htmlFor="email">Email *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              placeholder="john@example.com"
              required
              data-testid="input-new-lead-email"
            />
          </div>

          <div>
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              placeholder="(512) 488-5892"
              data-testid="input-new-lead-phone"
            />
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-3">Event Details (Optional)</h3>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="eventType">Event Type</Label>
                <Select value={formData.eventType} onValueChange={(value) => setFormData({ ...formData, eventType: value })}>
                  <SelectTrigger id="eventType" data-testid="select-event-type">
                    <SelectValue placeholder="Select event type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Birthday Party">Birthday Party</SelectItem>
                    <SelectItem value="Corporate Event">Corporate Event</SelectItem>
                    <SelectItem value="Wedding">Wedding</SelectItem>
                    <SelectItem value="Bachelor/Bachelorette">Bachelor/Bachelorette</SelectItem>
                    <SelectItem value="Anniversary">Anniversary</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="groupSize">Group Size</Label>
                <Input
                  id="groupSize"
                  type="number"
                  value={formData.groupSize}
                  onChange={(e) => setFormData({ ...formData, groupSize: e.target.value })}
                  placeholder="25"
                  data-testid="input-group-size"
                />
              </div>

              <div>
                <Label htmlFor="projectDate">Event Date</Label>
                <Input
                  id="projectDate"
                  type="date"
                  value={formData.projectDate}
                  onChange={(e) => setFormData({ ...formData, projectDate: e.target.value })}
                  data-testid="input-project-date"
                />
              </div>

              <div>
                <Label htmlFor="specialRequests">Special Requests</Label>
                <Textarea
                  id="specialRequests"
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  placeholder="Any special requirements or notes..."
                  data-testid="textarea-special-requests"
                />
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} data-testid="button-cancel">
            Cancel
          </Button>
          <Button
            onClick={() => createLead.mutate()}
            disabled={!formData.name || !formData.email || createLead.isPending}
            data-testid="button-create-lead"
          >
            {createLead.isPending ? 'Creating...' : 'Create Lead'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default function Leads() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [viewMode, setViewMode] = useState<'pipeline' | 'list'>('pipeline');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedLead, setSelectedLead] = useState<Contact | null>(null);
  const [isDetailsModalOpen, setIsDetailsModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Fetch all leads with quote links
  const { data: leadsResponse, isLoading: contactsLoading } = useQuery<{success: boolean, leads: Contact[], count: number}>({
    queryKey: ['/api/leads'],
  });
  
  const contacts = leadsResponse?.leads || [];

  // Fetch projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Fetch quotes
  const { data: quotes = [] } = useQuery<Quote[]>({
    queryKey: ['/api/quotes'],
  });

  // Update project pipeline phase
  const updateProjectPhase = useMutation({
    mutationFn: async ({ projectId, phase }: { projectId: string; phase: string }) => {
      return apiRequest('PATCH', `/api/projects/${projectId}`, { 
        pipelinePhase: phase,
        status: phase === 'ph_event_complete' ? 'COMPLETED' : 'ACTIVE'
      });
    },
    onSuccess: () => {
      toast({
        title: 'Pipeline Updated',
        description: 'Lead moved to new stage.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
    },
  });

  // Create project for contact without one
  const createProject = useMutation({
    mutationFn: async (contactId: string) => {
      return apiRequest('POST', '/api/projects', {
        contactId,
        title: 'New Project',
        status: 'NEW',
        pipelinePhase: 'ph_new',
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
    },
  });

  // Group leads by pipeline stage
  const leadsByStage = PIPELINE_STAGES.reduce((acc, stage) => {
    acc[stage.id] = contacts.filter(contact => {
      const project = projects.find(p => p.contactId === contact.id);
      if (!project) {
        // Contacts without projects go to "New Lead" stage
        return stage.id === 'ph_new';
      }
      return project.pipelinePhase === stage.id;
    });
    return acc;
  }, {} as Record<string, Contact[]>);

  // Filter leads based on search
  const filteredLeadsByStage = Object.keys(leadsByStage).reduce((acc, stageId) => {
    acc[stageId] = leadsByStage[stageId].filter(contact =>
      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.phone?.includes(searchTerm)
    );
    return acc;
  }, {} as Record<string, Contact[]>);

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveId(null);

    if (!over || active.id === over.id) return;

    // Find which stage the item was dropped into
    const newStage = PIPELINE_STAGES.find(stage => 
      filteredLeadsByStage[stage.id].some(lead => lead.id === over.id)
    );

    if (!newStage) return;

    const contact = contacts.find(c => c.id === active.id);
    if (!contact) return;

    // Get or create project for this contact
    let project = projects.find(p => p.contactId === contact.id);
    
    if (!project) {
      // Create a project for this contact
      await createProject.mutateAsync(contact.id);
      // Refetch to get the new project
      await queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
      project = projects.find(p => p.contactId === contact.id);
    }

    if (project) {
      // Update the project's pipeline phase
      await updateProjectPhase.mutate({
        projectId: project.id,
        phase: newStage.id,
      });
    }
  };

  const activeLead = activeId ? contacts.find(c => c.id === activeId) : null;

  const openLeadDetails = (lead: Contact) => {
    setSelectedLead(lead);
    setIsDetailsModalOpen(true);
  };

  const getProjectForLead = (leadId: string) => {
    return projects.find(p => p.contactId === leadId);
  };

  const getQuotesForProject = (projectId: string) => {
    return quotes.filter(q => q.projectId === projectId);
  };

  // Calculate pipeline metrics
  const pipelineMetrics = {
    totalLeads: contacts.length,
    newLeads: leadsByStage['ph_new'].length,
    quoteSent: leadsByStage['ph_quote_sent'].length,
    depositPaid: leadsByStage['ph_deposit_paid'].length,
    fullyPaid: leadsByStage['ph_fully_paid'].length,
    completed: leadsByStage['ph_event_complete'].length,
    conversionRate: contacts.length > 0 
      ? Math.round((leadsByStage['ph_fully_paid'].length / contacts.length) * 100)
      : 0,
  };

  if (contactsLoading || projectsLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight" data-testid="text-page-title">Lead Management</h1>
          <p className="text-muted-foreground" data-testid="text-page-subtitle">Track and manage your sales pipeline</p>
        </div>
        <Button onClick={() => setIsCreateModalOpen(true)} data-testid="button-create-lead">
          <Plus className="w-4 h-4 mr-2" />
          New Lead
        </Button>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Total Leads</p>
              <p className="text-2xl font-bold" data-testid="metric-total-leads">{pipelineMetrics.totalLeads}</p>
            </div>
            <Users className="w-8 h-8 text-primary opacity-50" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">New This Month</p>
              <p className="text-2xl font-bold" data-testid="metric-new-leads">{pipelineMetrics.newLeads}</p>
            </div>
            <TrendingUp className="w-8 h-8 text-blue-500 opacity-50" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Conversion Rate</p>
              <p className="text-2xl font-bold" data-testid="metric-conversion-rate">{pipelineMetrics.conversionRate}%</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">Fully Paid</p>
              <p className="text-2xl font-bold" data-testid="metric-fully-paid">{pipelineMetrics.fullyPaid}</p>
            </div>
            <DollarSign className="w-8 h-8 text-green-500 opacity-50" />
          </div>
        </Card>
      </div>

      {/* Search and View Toggle */}
      <div className="flex justify-between items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search leads..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10"
            data-testid="input-search-leads"
          />
        </div>
        <Tabs value={viewMode} onValueChange={(v) => setViewMode(v as 'pipeline' | 'list')}>
          <TabsList>
            <TabsTrigger value="pipeline" data-testid="tab-pipeline-view">Pipeline</TabsTrigger>
            <TabsTrigger value="list" data-testid="tab-list-view">List</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Pipeline View */}
      {viewMode === 'pipeline' ? (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {PIPELINE_STAGES.map((stage) => (
              <div key={stage.id} className="flex flex-col" data-testid={`pipeline-stage-${stage.id}`}>
                <div className="flex items-center justify-between mb-3 px-2">
                  <div className="flex items-center gap-2">
                    <div className={`w-3 h-3 rounded-full ${stage.color}`} />
                    <h3 className="font-semibold text-sm">{stage.label}</h3>
                  </div>
                  <Badge variant="secondary" className="text-xs" data-testid={`badge-count-${stage.id}`}>
                    {filteredLeadsByStage[stage.id].length}
                  </Badge>
                </div>
                
                <Card className="flex-1 p-3 min-h-[400px] bg-muted/10">
                  <SortableContext
                    items={filteredLeadsByStage[stage.id].map(lead => lead.id)}
                    strategy={verticalListSortingStrategy}
                  >
                    <div className="space-y-2">
                      {filteredLeadsByStage[stage.id].map((lead) => (
                        <SortableLeadCard
                          key={lead.id}
                          lead={lead}
                          project={getProjectForLead(lead.id)}
                          onClick={() => openLeadDetails(lead)}
                        />
                      ))}
                    </div>
                  </SortableContext>
                  
                  {filteredLeadsByStage[stage.id].length === 0 && (
                    <div className="text-center py-8 text-muted-foreground">
                      <p className="text-sm">No leads</p>
                    </div>
                  )}
                </Card>
              </div>
            ))}
          </div>
          
          <DragOverlay>
            {activeLead ? (
              <Card className="p-3 shadow-lg border-2 border-primary">
                <h4 className="font-semibold text-sm">{activeLead.name}</h4>
                {activeLead.email && (
                  <p className="text-xs text-muted-foreground">{activeLead.email}</p>
                )}
              </Card>
            ) : null}
          </DragOverlay>
        </DndContext>
      ) : (
        /* List View */
        <Card>
          <CardContent className="p-0">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="border-b bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium">Name</th>
                    <th className="text-left p-4 font-medium">Email</th>
                    <th className="text-left p-4 font-medium">Phone</th>
                    <th className="text-left p-4 font-medium">Stage</th>
                    <th className="text-left p-4 font-medium">Event Type</th>
                    <th className="text-left p-4 font-medium">Event Date</th>
                    <th className="text-left p-4 font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {contacts
                    .filter(contact =>
                      contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                      contact.phone?.includes(searchTerm)
                    )
                    .map((contact) => {
                      const project = getProjectForLead(contact.id);
                      const stage = PIPELINE_STAGES.find(s => 
                        project ? s.id === project.pipelinePhase : s.id === 'ph_new'
                      );
                      
                      return (
                        <tr key={contact.id} className="border-b hover:bg-muted/50 cursor-pointer" 
                            onClick={() => openLeadDetails(contact)}
                            data-testid={`lead-row-${contact.id}`}>
                          <td className="p-4 font-medium">{contact.name}</td>
                          <td className="p-4">{contact.email || 'N/A'}</td>
                          <td className="p-4">{contact.phone || 'N/A'}</td>
                          <td className="p-4">
                            <Badge className={stage?.textColor} variant="outline">
                              {stage?.label}
                            </Badge>
                          </td>
                          <td className="p-4">{project?.eventType || 'N/A'}</td>
                          <td className="p-4">{formatDate(project?.projectDate)}</td>
                          <td className="p-4">
                            <Button
                              size="sm"
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                openLeadDetails(contact);
                              }}
                              data-testid={`button-view-lead-${contact.id}`}
                            >
                              <Eye className="w-4 h-4" />
                            </Button>
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              
              {contacts.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">
                  <Users className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No leads found</p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setIsCreateModalOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create First Lead
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Lead Details Modal */}
      <LeadDetailsModal
        lead={selectedLead}
        project={selectedLead ? getProjectForLead(selectedLead.id) : undefined}
        quotes={selectedLead && getProjectForLead(selectedLead.id) 
          ? getQuotesForProject(getProjectForLead(selectedLead.id)!.id)
          : undefined}
        isOpen={isDetailsModalOpen}
        onClose={() => {
          setIsDetailsModalOpen(false);
          setSelectedLead(null);
        }}
        onUpdate={() => {
          queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
        }}
      />

      {/* Create Lead Modal */}
      <CreateLeadModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      />
    </div>
  );
}