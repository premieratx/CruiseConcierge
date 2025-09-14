import { useState } from 'react';
import { useLocation, Link } from 'wouter';
import { useQuery, useMutation } from '@tanstack/react-query';
import { apiRequest, queryClient } from '@/lib/queryClient';
import { type Contact, type Project, type Quote, type Booking } from '@shared/schema';
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
import { format } from 'date-fns';
import { 
  Plus, Search, Filter, Mail, Phone, Calendar, Users, 
  DollarSign, TrendingUp, ChevronRight, Edit, Trash2,
  MessageSquare, FileText, Clock, User, Building, Ship,
  Award, Star, History, CreditCard, Download, UserCheck,
  Eye, ShoppingBag
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

// Customer tier badge component
const TierBadge = ({ totalSpent }: { totalSpent: number }) => {
  let tier = "Bronze";
  let variant: "outline" | "secondary" | "default" | "destructive" = "outline";
  
  if (totalSpent >= 1000000) { // $10,000+
    tier = "Platinum";
    variant = "default";
  } else if (totalSpent >= 500000) { // $5,000+
    tier = "Gold";
    variant = "secondary";
  } else if (totalSpent >= 200000) { // $2,000+
    tier = "Silver";
    variant = "outline";
  }
  
  return (
    <Badge variant={variant}>
      <Award className="mr-1 h-3 w-3" />
      {tier}
    </Badge>
  );
};

export default function Leads() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [mainTab, setMainTab] = useState('leads');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedLead, setSelectedLead] = useState<Contact | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('pipeline');
  const [customerSearchTerm, setCustomerSearchTerm] = useState('');
  const [tierFilter, setTierFilter] = useState('all');
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);

  // Fetch all contacts
  const { data: contacts = [], isLoading: contactsLoading } = useQuery<Contact[]>({
    queryKey: ['/api/contacts'],
  });

  // Fetch customers (contacts with bookings)
  const { data: customers = [], isLoading: customersLoading } = useQuery<Contact[]>({
    queryKey: ['/api/contacts/clients'],
  });

  // Fetch projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ['/api/projects'],
  });

  // Fetch bookings
  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ['/api/bookings'],
    queryFn: async () => {
      const response = await fetch('/api/bookings');
      if (!response.ok) throw new Error('Failed to fetch bookings');
      return response.json();
    },
  });

  // Fetch quotes for revenue calculation
  const { data: quotes = [] } = useQuery<Quote[]>({
    queryKey: ['/api/quotes'],
    queryFn: async () => {
      // Fetch quotes for all projects
      const allQuotes: Quote[] = [];
      for (const project of projects) {
        try {
          const response = await fetch(`/api/projects/${project.id}/quotes`);
          if (response.ok) {
            const projectQuotes = await response.json();
            allQuotes.push(...projectQuotes);
          }
        } catch (error) {
          console.error(`Failed to fetch quotes for project ${project.id}`, error);
        }
      }
      return allQuotes;
    },
    enabled: projects.length > 0,
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

  // Filter leads (contacts without bookings)
  const leads = contacts.filter(contact => 
    !bookings.some(booking => booking.projectId && 
      projects.some(project => project.id === booking.projectId && project.contactId === contact.id))
  );

  // Filter contacts based on search and status
  const filteredLeads = leads.filter((contact: Contact) => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          contact.phone?.includes(searchTerm);
    
    if (filterStatus === 'all') return matchesSearch;
    
    // Get project status for this contact
    const contactProjects = projects.filter((p: Project) => p.contactId === contact.id);
    if (filterStatus === 'no_project') return matchesSearch && contactProjects.length === 0;
    
    return matchesSearch && contactProjects.some((p: Project) => p.status === filterStatus);
  });

  // Calculate customer metrics
  const customerMetrics = customers.map(contact => {
    const customerProjects = projects.filter(p => p.contactId === contact.id);
    const completedProjects = customerProjects.filter(p => p.status === "CLOSED_WON");
    const customerBookings = bookings.filter(b => 
      customerProjects.some(p => p.id === b.projectId)
    );
    const customerQuotes = quotes.filter(q => 
      customerProjects.some(p => p.id === q.projectId)
    );
    
    const totalSpent = customerQuotes
      .filter(q => q.status === "PAID" || q.status === "SENT")
      .reduce((sum, q) => sum + q.total, 0);
    
    const lastProjectDate = customerProjects
      .map(p => p.projectDate)
      .filter(d => d)
      .sort((a, b) => {
        const dateA = typeof a === 'string' ? new Date(a) : a;
        const dateB = typeof b === 'string' ? new Date(b) : b;
        if (!dateA || !dateB) return 0;
        return dateB.getTime() - dateA.getTime();
      })[0];
    
    return {
      ...contact,
      totalProjects: customerProjects.length,
      completedProjects: completedProjects.length,
      totalBookings: customerBookings.length,
      totalSpent,
      lastProjectDate,
      averageSpend: customerProjects.length > 0 ? totalSpent / customerProjects.length : 0,
    };
  });

  // Filter customers based on search and tier
  const filteredCustomers = customerMetrics.filter(customer => {
    const matchesSearch = customerSearchTerm === "" || 
      customer.name.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(customerSearchTerm.toLowerCase()) ||
      (customer.phone && customer.phone.includes(customerSearchTerm));
    
    let matchesTier = true;
    if (tierFilter !== "all") {
      if (tierFilter === "platinum" && customer.totalSpent < 1000000) matchesTier = false;
      if (tierFilter === "gold" && (customer.totalSpent < 500000 || customer.totalSpent >= 1000000)) matchesTier = false;
      if (tierFilter === "silver" && (customer.totalSpent < 200000 || customer.totalSpent >= 500000)) matchesTier = false;
      if (tierFilter === "bronze" && customer.totalSpent >= 200000) matchesTier = false;
    }
    
    return matchesSearch && matchesTier;
  });

  // Sort customers by total spent (descending)
  const sortedCustomers = [...filteredCustomers].sort((a, b) => b.totalSpent - a.totalSpent);

  // Calculate summary stats
  const stats = {
    totalCustomers: customers.length,
    activeCustomers: customerMetrics.filter(c => c.totalProjects > 0).length,
    totalRevenue: customerMetrics.reduce((sum, c) => sum + c.totalSpent, 0),
    averageCustomerValue: customers.length > 0 
      ? customerMetrics.reduce((sum, c) => sum + c.totalSpent, 0) / customers.length 
      : 0,
    topCustomers: sortedCustomers.slice(0, 5),
  };

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

  // Customer detail dialog content
  const CustomerDetail = ({ customerId }: { customerId: string }) => {
    const customer = customerMetrics.find(c => c.id === customerId);
    if (!customer) return null;

    const customerProjects = projects.filter(p => p.contactId === customerId);
    const customerBookings = bookings.filter(b => 
      customerProjects.some(p => p.id === b.projectId)
    );
    
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-semibold">{customer.name}</h3>
            <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {customer.email}
              </span>
              {customer.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {customer.phone}
                </span>
              )}
            </div>
          </div>
          <TierBadge totalSpent={customer.totalSpent} />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Spent</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(customer.totalSpent)}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm">Total Bookings</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customer.totalBookings}</div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Recent Bookings</h4>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Date</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Group Size</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {customerBookings.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center text-muted-foreground">
                    No bookings yet
                  </TableCell>
                </TableRow>
              ) : (
                customerBookings.map((booking) => (
                  <TableRow key={booking.id}>
                    <TableCell>{formatDate(booking.startTime)}</TableCell>
                    <TableCell>{booking.partyType || booking.type}</TableCell>
                    <TableCell>{booking.groupSize} guests</TableCell>
                    <TableCell>
                      <Badge variant={booking.status === 'booked' ? 'default' : 'secondary'}>
                        {booking.status}
                      </Badge>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    );
  };

  return (
    <div className="container mx-auto p-6">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Sales & Customers</h1>
            <p className="text-muted-foreground mt-1">
              Manage leads and track customer relationships
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

      {/* Main Tabs */}
      <Tabs value={mainTab} onValueChange={setMainTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="leads">
            <Users className="w-4 h-4 mr-2" />
            Leads ({leads.length})
          </TabsTrigger>
          <TabsTrigger value="customers">
            <UserCheck className="w-4 h-4 mr-2" />
            Customers ({customers.length})
          </TabsTrigger>
        </TabsList>

        {/* Leads Tab */}
        <TabsContent value="leads">
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

          {/* Sub-tabs for Leads View */}
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
                                  {project.title || 'Untitled Project'}
                                </p>
                                {contact && (
                                  <p className="text-xs text-muted-foreground truncate">
                                    {contact.name}
                                  </p>
                                )}
                                {project.projectDate && (
                                  <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                    <Calendar className="w-3 h-3" />
                                    {formatDate(project.projectDate)}
                                  </div>
                                )}
                                {project.groupSize && project.groupSize > 0 && (
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
                      {filteredLeads.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                            No leads found
                          </TableCell>
                        </TableRow>
                      ) : (
                        filteredLeads.map((contact: Contact) => {
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
                                  Website
                                </Badge>
                              </TableCell>
                              <TableCell>
                                {contactProjects.length > 0 ? (
                                  <div className="space-y-1">
                                    {contactProjects.slice(0, 2).map((project: Project) => (
                                      <Badge key={project.id} variant="secondary" className="text-xs">
                                        {project.eventType || 'Event'}
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
                                  {formatDate(contact.createdAt)}
                                </div>
                              </TableCell>
                              <TableCell className="text-right">
                                <div className="flex justify-end gap-1">
                                  <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      setLocation(`/projects?contact=${contact.id}`);
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
        </TabsContent>

        {/* Customers Tab */}
        <TabsContent value="customers">
          {/* Customer Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.totalCustomers}</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Total Revenue</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">
                  {formatCurrency(stats.totalRevenue)}
                </div>
                <p className="text-xs text-muted-foreground">Lifetime value</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Average Value</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {formatCurrency(stats.averageCustomerValue)}
                </div>
                <p className="text-xs text-muted-foreground">Per customer</p>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader className="pb-2">
                <CardDescription>Active Customers</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stats.activeCustomers}</div>
                <p className="text-xs text-muted-foreground">With bookings</p>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <div className="flex gap-4 mb-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search customers..."
                value={customerSearchTerm}
                onChange={(e) => setCustomerSearchTerm(e.target.value)}
                className="pl-9"
                data-testid="input-search-customers"
              />
            </div>
            
            <Select value={tierFilter} onValueChange={setTierFilter}>
              <SelectTrigger className="w-[200px]" data-testid="select-tier-filter">
                <Award className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by tier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Tiers</SelectItem>
                <SelectItem value="platinum">Platinum</SelectItem>
                <SelectItem value="gold">Gold</SelectItem>
                <SelectItem value="silver">Silver</SelectItem>
                <SelectItem value="bronze">Bronze</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Customers Table */}
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Bookings</TableHead>
                    <TableHead>Last Booking</TableHead>
                    <TableHead>Average Value</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCustomers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                        No customers found
                      </TableCell>
                    </TableRow>
                  ) : (
                    sortedCustomers.map((customer) => (
                      <TableRow 
                        key={customer.id}
                        className="cursor-pointer hover:bg-muted/50"
                        onClick={() => setSelectedCustomerId(customer.id)}
                      >
                        <TableCell>
                          <div>
                            <div className="font-medium">{customer.name}</div>
                            <div className="text-xs text-muted-foreground">{customer.email}</div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <TierBadge totalSpent={customer.totalSpent} />
                        </TableCell>
                        <TableCell className="font-semibold text-green-600">
                          {formatCurrency(customer.totalSpent)}
                        </TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {customer.totalBookings} bookings
                          </Badge>
                        </TableCell>
                        <TableCell className="text-sm">
                          {formatDate(customer.lastProjectDate)}
                        </TableCell>
                        <TableCell>
                          {formatCurrency(customer.averageSpend)}
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              setSelectedCustomerId(customer.id);
                            }}
                            data-testid={`button-view-customer-${customer.id}`}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          {/* Top Customers Section */}
          {stats.topCustomers.length > 0 && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold mb-3">Top Customers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {stats.topCustomers.slice(0, 3).map((customer, index) => (
                  <Card key={customer.id}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-base">
                          #{index + 1} {customer.name}
                        </CardTitle>
                        <TierBadge totalSpent={customer.totalSpent} />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total Spent:</span>
                          <span className="font-semibold text-green-600">
                            {formatCurrency(customer.totalSpent)}
                          </span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Bookings:</span>
                          <span>{customer.totalBookings}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Last Booking:</span>
                          <span>{formatDate(customer.lastProjectDate)}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Customer Detail Dialog */}
      <Dialog open={!!selectedCustomerId} onOpenChange={(open) => !open && setSelectedCustomerId(null)}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Customer Details</DialogTitle>
          </DialogHeader>
          {selectedCustomerId && <CustomerDetail customerId={selectedCustomerId} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}