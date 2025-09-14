import { useState } from 'react';
import { useLocation } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { type Contact, type Project } from '@shared/schema';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { 
  Plus, Search, Filter, Mail, Phone, Calendar, Users, 
  DollarSign, TrendingUp, ChevronRight, Edit, Trash2,
  MessageSquare, FileText, Clock, User, Building, Ship
} from 'lucide-react';

const PIPELINE_STAGES = [
  { value: 'NEW_LEAD', label: 'New Lead', color: 'bg-blue-500' },
  { value: 'CONTACTED', label: 'Contacted', color: 'bg-yellow-500' },
  { value: 'QUALIFIED', label: 'Qualified', color: 'bg-purple-500' },
  { value: 'QUOTE_SENT', label: 'Quote Sent', color: 'bg-orange-500' },
  { value: 'NEGOTIATION', label: 'Negotiation', color: 'bg-pink-500' },
  { value: 'CLOSED_WON', label: 'Closed Won', color: 'bg-green-500' },
  { value: 'CLOSED_LOST', label: 'Closed Lost', color: 'bg-red-500' },
];

export default function Leads() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Contact | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pipeline');

  // Fetch contacts
  const { data: contacts = [], isLoading: contactsLoading } = useQuery({
    queryKey: ['/api/contacts'],
  });

  // Fetch projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['/api/projects'],
  });

  // Fetch pipeline summary
  const { data: pipelineSummary } = useQuery({
    queryKey: ['/api/pipeline/summary'],
  });

  // Create contact mutation
  const createContact = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest('POST', '/api/contacts', data);
    },
    onSuccess: () => {
      toast({
        title: 'Lead Created',
        description: 'New lead has been added to your pipeline.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/contacts'] });
      setIsCreateModalOpen(false);
    },
  });

  // Update project status
  const updateProjectStatus = useMutation({
    mutationFn: async ({ projectId, status }: { projectId: string; status: string }) => {
      return apiRequest('PATCH', `/api/projects/${projectId}`, { status });
    },
    onSuccess: () => {
      toast({
        title: 'Status Updated',
        description: 'Lead status has been updated.',
      });
      queryClient.invalidateQueries({ queryKey: ['/api/projects'] });
    },
  });

  // Filter contacts based on search and status
  const filteredContacts = contacts.filter((contact: Contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.phone?.includes(searchTerm);
    
    if (filterStatus === 'all') return matchesSearch;
    
    // Get project status for this contact
    const contactProjects = projects.filter((p: Project) => p.contactId === contact.id);
    if (filterStatus === 'no_project') return matchesSearch && contactProjects.length === 0;
    
    return matchesSearch && contactProjects.some((p: Project) => p.status === filterStatus);
  });

  // Group projects by status for pipeline view
  const projectsByStatus = PIPELINE_STAGES.reduce((acc, stage) => {
    acc[stage.value] = projects.filter((p: Project) => p.status === stage.value);
    return acc;
  }, {} as Record<string, Project[]>);

  // Get contact for a project
  const getContactForProject = (project: Project) => {
    return contacts.find((c: Contact) => c.id === project.contactId);
  };

  const handleCreateLead = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    
    createContact.mutate({
      name: formData.get('name'),
      email: formData.get('email'),
      phone: formData.get('phone'),
      company: formData.get('company'),
      source: formData.get('source'),
      notes: formData.get('notes'),
      tags: formData.get('tags')?.toString().split(',').map(t => t.trim()).filter(Boolean) || [],
    });
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Lead Management</h1>
            <p className="text-muted-foreground mt-1">
              Track and manage your sales pipeline
            </p>
          </div>
          
          <Dialog open={isCreateModalOpen} onOpenChange={setIsCreateModalOpen}>
            <DialogTrigger asChild>
              <Button data-testid="button-create-lead">
                <Plus className="w-4 h-4 mr-2" />
                New Lead
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
              <form onSubmit={handleCreateLead}>
                <DialogHeader>
                  <DialogTitle>Create New Lead</DialogTitle>
                  <DialogDescription>
                    Add a new contact to your sales pipeline
                  </DialogDescription>
                </DialogHeader>
                
                <div className="grid gap-4 py-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Name *</Label>
                      <Input
                        id="name"
                        name="name"
                        required
                        placeholder="John Doe"
                        data-testid="input-lead-name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="company">Company</Label>
                      <Input
                        id="company"
                        name="company"
                        placeholder="Acme Corp"
                        data-testid="input-lead-company"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="john@example.com"
                        data-testid="input-lead-email"
                      />
                    </div>
                    <div>
                      <Label htmlFor="phone">Phone</Label>
                      <Input
                        id="phone"
                        name="phone"
                        placeholder="(512) 555-0123"
                        data-testid="input-lead-phone"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="source">Lead Source</Label>
                    <Select name="source" defaultValue="WEBSITE">
                      <SelectTrigger data-testid="select-lead-source">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="WEBSITE">Website</SelectItem>
                        <SelectItem value="CHATBOT">Chatbot</SelectItem>
                        <SelectItem value="REFERRAL">Referral</SelectItem>
                        <SelectItem value="SOCIAL_MEDIA">Social Media</SelectItem>
                        <SelectItem value="PHONE">Phone</SelectItem>
                        <SelectItem value="EMAIL">Email</SelectItem>
                        <SelectItem value="OTHER">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <Label htmlFor="tags">Tags (comma-separated)</Label>
                    <Input
                      id="tags"
                      name="tags"
                      placeholder="birthday, vip, corporate"
                      data-testid="input-lead-tags"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="notes">Notes</Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      rows={3}
                      placeholder="Additional information..."
                      data-testid="textarea-lead-notes"
                    />
                  </div>
                </div>
                
                <DialogFooter>
                  <Button
                    type="submit"
                    disabled={createContact.isPending}
                    data-testid="button-save-lead"
                  >
                    Create Lead
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>New Leads</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pipelineSummary?.newLeads || 0}</div>
            <p className="text-xs text-muted-foreground">This month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Quotes Sent</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pipelineSummary?.quoteSent || 0}</div>
            <p className="text-xs text-muted-foreground">Awaiting response</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Conversion Rate</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {pipelineSummary?.conversionRate ? `${Math.round(pipelineSummary.conversionRate)}%` : '0%'}
            </div>
            <p className="text-xs text-muted-foreground">Won / Total</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pipeline Value</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${((pipelineSummary?.totalPipelineValue || 0) / 100).toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">Total potential</p>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="pipeline">Pipeline View</TabsTrigger>
          <TabsTrigger value="list">List View</TabsTrigger>
        </TabsList>

        {/* Pipeline View */}
        <TabsContent value="pipeline">
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {PIPELINE_STAGES.map((stage) => (
              <div key={stage.value} className="min-h-[400px]">
                <div className="mb-3">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{stage.label}</h3>
                    <Badge variant="secondary" className="text-xs">
                      {projectsByStatus[stage.value]?.length || 0}
                    </Badge>
                  </div>
                  <div className={`h-1 ${stage.color} rounded-full mt-2`} />
                </div>
                
                <div className="space-y-2">
                  {projectsByStatus[stage.value]?.map((project: Project) => {
                    const contact = getContactForProject(project);
                    return (
                      <Card 
                        key={project.id}
                        className="cursor-pointer hover:shadow-md transition-shadow"
                        onClick={() => setLocation(`/projects/${project.id}`)}
                      >
                        <CardContent className="p-3">
                          <div className="space-y-1">
                            <p className="font-medium text-sm truncate">
                              {project.name}
                            </p>
                            {contact && (
                              <p className="text-xs text-muted-foreground truncate">
                                {contact.name}
                              </p>
                            )}
                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                              <Calendar className="w-3 h-3" />
                              {new Date(project.eventDate).toLocaleDateString()}
                            </div>
                            {project.groupSize > 0 && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                <Users className="w-3 h-3" />
                                {project.groupSize} guests
                              </div>
                            )}
                          </div>
                        </CardContent>
                      </Card>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </TabsContent>

        {/* List View */}
        <TabsContent value="list">
          {/* Search and Filters */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search leads by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search-leads"
              />
            </div>
            
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-[200px]" data-testid="select-filter-status">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Leads</SelectItem>
                <SelectItem value="no_project">No Project</SelectItem>
                {PIPELINE_STAGES.map((stage) => (
                  <SelectItem key={stage.value} value={stage.value}>
                    {stage.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Leads Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Source</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Tags</TableHead>
                    <TableHead>Created</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredContacts.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No leads found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredContacts.map((contact: Contact) => {
                      const contactProjects = projects.filter((p: Project) => p.contactId === contact.id);
                      return (
                        <TableRow 
                          key={contact.id}
                          className="cursor-pointer hover:bg-muted/50"
                          onClick={() => setSelectedLead(contact)}
                        >
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <User className="w-4 h-4 text-muted-foreground" />
                              {contact.name}
                            </div>
                            {contact.company && (
                              <div className="flex items-center gap-1 text-xs text-muted-foreground mt-1">
                                <Building className="w-3 h-3" />
                                {contact.company}
                              </div>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              {contact.email && (
                                <div className="flex items-center gap-1 text-xs">
                                  <Mail className="w-3 h-3 text-muted-foreground" />
                                  {contact.email}
                                </div>
                              )}
                              {contact.phone && (
                                <div className="flex items-center gap-1 text-xs">
                                  <Phone className="w-3 h-3 text-muted-foreground" />
                                  {contact.phone}
                                </div>
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className="text-xs">
                              {contact.source}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            {contactProjects.length > 0 ? (
                              <div className="space-y-1">
                                {contactProjects.slice(0, 2).map((project: Project) => (
                                  <Badge key={project.id} variant="secondary" className="text-xs">
                                    {project.eventType}
                                  </Badge>
                                ))}
                                {contactProjects.length > 2 && (
                                  <Badge variant="outline" className="text-xs">
                                    +{contactProjects.length - 2} more
                                  </Badge>
                                )}
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">No projects</span>
                            )}
                          </TableCell>
                          <TableCell>
                            {contact.tags && contact.tags.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {contact.tags.slice(0, 3).map((tag, idx) => (
                                  <Badge key={idx} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            ) : (
                              <span className="text-xs text-muted-foreground">No tags</span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className="text-xs text-muted-foreground">
                              {new Date(contact.createdAt).toLocaleDateString()}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex justify-end gap-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setLocation(`/contacts/${contact.id}`);
                                }}
                                data-testid={`button-view-${contact.id}`}
                              >
                                <ChevronRight className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      );
                    })
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}