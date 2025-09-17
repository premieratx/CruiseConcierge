import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { queryClient, apiRequest } from "@/lib/queryClient";
import type { Project, Contact, Quote, Booking, InsertProject } from "@shared/schema";
import { 
  Calendar, Clock, Users, Ship, DollarSign, MapPin, 
  CheckCircle, AlertCircle, Phone, Mail, FileText, 
  ChevronRight, Search, Filter, RefreshCw, Eye,
  Download, Send, Star, TrendingUp, User, Briefcase, Plus
} from "lucide-react";
import { format } from "date-fns";
import { Link, useLocation } from "wouter";

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', { 
    style: 'currency', 
    currency: 'USD' 
  }).format(amount / 100);
};

// Helper function to format date
const formatDate = (date: Date | string | null) => {
  if (!date) return "Not scheduled";
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'MMM dd, yyyy');
};

// Helper function to format time
const formatTime = (date: Date | string | null) => {
  if (!date) return "";
  const dateObj = typeof date === 'string' ? new Date(date) : date;
  return format(dateObj, 'h:mm a');
};

// Project status badge component
const StatusBadge = ({ status }: { status: string }) => {
  const statusConfig = {
    NEW: { label: "New", variant: "secondary" as const },
    SCHEDULED: { label: "Scheduled", variant: "default" as const },
    CONFIRMED: { label: "Confirmed", variant: "default" as const },
    IN_PROGRESS: { label: "In Progress", variant: "secondary" as const },
    COMPLETED: { label: "Completed", variant: "outline" as const },
    CANCELLED: { label: "Cancelled", variant: "destructive" as const },
  };

  const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.NEW;
  
  return (
    <Badge variant={config.variant}>
      {config.label}
    </Badge>
  );
};

// Event type badge component
const EventTypeBadge = ({ type }: { type: string }) => {
  const typeConfig = {
    wedding: { label: "Wedding", icon: "💒" },
    corporate: { label: "Corporate", icon: "🏢" },
    birthday: { label: "Birthday", icon: "🎂" },
    bachelor: { label: "Bachelor", icon: "🍺" },
    bachelorette: { label: "Bachelorette", icon: "👰" },
    graduation: { label: "Graduation", icon: "🎓" },
    anniversary: { label: "Anniversary", icon: "💕" },
    other: { label: "Other", icon: "🎉" },
  };

  const config = typeConfig[type as keyof typeof typeConfig] || typeConfig.other;
  
  return (
    <Badge variant="outline">
      <span className="mr-1">{config.icon}</span>
      {config.label}
    </Badge>
  );
};

export default function Projects() {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [eventTypeFilter, setEventTypeFilter] = useState("all");
  const [selectedTab, setSelectedTab] = useState("active");
  const [showNewProjectDialog, setShowNewProjectDialog] = useState(false);
  const [showPostCreateDialog, setShowPostCreateDialog] = useState(false);
  const [createdProjectId, setCreatedProjectId] = useState<string | null>(null);
  const [newProjectData, setNewProjectData] = useState({
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    eventType: "",
    projectDate: "",
    groupSize: "",
    title: "",
    specialRequests: "",
  });
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  // Fetch projects
  const { data: projects = [], isLoading: projectsLoading } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Fetch contacts to map with projects
  const { data: clients = [] } = useQuery<Contact[]>({
    queryKey: ["/api/contacts/clients"],
  });

  // Fetch bookings
  const { data: bookings = [] } = useQuery<Booking[]>({
    queryKey: ["/api/bookings"],
    queryFn: async () => {
      const startDate = new Date();
      startDate.setMonth(startDate.getMonth() - 1);
      const endDate = new Date();
      endDate.setMonth(endDate.getMonth() + 6);
      
      const params = new URLSearchParams({
        startDate: startDate.toISOString(),
        endDate: endDate.toISOString()
      });
      
      const response = await fetch(`/api/bookings?${params}`);
      if (!response.ok) throw new Error("Failed to fetch bookings");
      return response.json();
    },
  });

  // Fetch all quotes to link with projects
  const { data: allQuotes = [] } = useQuery({
    queryKey: ["/api/quotes"],
    queryFn: async () => {
      const response = await apiRequest('GET', '/api/quotes');
      return response.json();
    },
  });

  // Create contact map for quick lookups
  const contactMap = new Map(clients.map(c => [c.id, c]));

  // Helper function to get quotes for a project
  const getQuotesForProject = (projectId: string) => {
    return allQuotes.filter((quote: any) => quote.projectId === projectId);
  };

  // Create project mutation
  const createProjectMutation = useMutation({
    mutationFn: async () => {
      // First, find or create the contact
      const contactResponse = await apiRequest("POST", "/api/contacts/find-or-create", {
        email: newProjectData.contactEmail,
        name: newProjectData.contactName,
        phone: newProjectData.contactPhone,
      });
      const contact = await contactResponse.json();

      // Then create the project
      const projectData: Partial<InsertProject> = {
        contactId: contact.id,
        title: newProjectData.title || `${newProjectData.eventType} - ${newProjectData.contactName}`,
        eventType: newProjectData.eventType,
        projectDate: newProjectData.projectDate ? new Date(newProjectData.projectDate).toISOString() : undefined,
        groupSize: newProjectData.groupSize ? parseInt(newProjectData.groupSize) : undefined,
        specialRequests: newProjectData.specialRequests || undefined,
        status: "NEW",
        pipelinePhase: "ph_new",
      };

      const response = await apiRequest("POST", "/api/projects", projectData);
      return response.json();
    },
    onSuccess: (project) => {
      toast({
        title: "Success",
        description: "Project created successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      queryClient.invalidateQueries({ queryKey: ["/api/contacts/clients"] });
      setCreatedProjectId(project.id);
      setShowNewProjectDialog(false);
      setShowPostCreateDialog(true);
      // Reset form
      setNewProjectData({
        contactName: "",
        contactEmail: "",
        contactPhone: "",
        eventType: "",
        projectDate: "",
        groupSize: "",
        title: "",
        specialRequests: "",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to create project",
        variant: "destructive",
      });
    },
  });

  // Filter projects based on search and filters
  const filteredProjects = projects.filter(project => {
    const contact = contactMap.get(project.contactId);
    const matchesSearch = searchTerm === "" || 
      project.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact?.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || project.status === statusFilter;
    const matchesEventType = eventTypeFilter === "all" || project.eventType === eventTypeFilter;
    
    return matchesSearch && matchesStatus && matchesEventType;
  });

  // Separate projects by status
  const activeProjects = filteredProjects.filter(p => 
    ["NEW", "SCHEDULED", "CONFIRMED", "IN_PROGRESS"].includes(p.status)
  );
  const completedProjects = filteredProjects.filter(p => p.status === "COMPLETED");
  const cancelledProjects = filteredProjects.filter(p => p.status === "CANCELLED");

  // Calculate summary stats
  const stats = {
    total: projects.length,
    active: activeProjects.length,
    completed: completedProjects.length,
    thisMonth: projects.filter(p => {
      if (!p.projectDate) return false;
      const date = typeof p.projectDate === 'string' ? new Date(p.projectDate) : p.projectDate;
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length,
  };

  // Update project status mutation
  const updateStatusMutation = useMutation({
    mutationFn: async ({ id, status }: { id: string; status: string }) => {
      return apiRequest("PATCH", `/api/projects/${id}`, { status });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/projects"] });
      toast({
        title: "Status Updated",
        description: "Project status has been updated successfully.",
      });
    },
    onError: () => {
      toast({
        title: "Error",
        description: "Failed to update project status.",
        variant: "destructive",
      });
    },
  });

  // Project row component
  const ProjectRow = ({ project }: { project: Project }) => {
    const contact = contactMap.get(project.contactId);
    const projectBooking = bookings.find(b => b.projectId === project.id);
    const projectQuotes = getQuotesForProject(project.id);
    const latestQuote = projectQuotes.length > 0 ? projectQuotes[projectQuotes.length - 1] : null;
    
    return (
      <TableRow data-testid={`row-project-${project.id}`}>
        <TableCell>
          <div className="flex flex-col">
            <span className="font-medium" data-testid={`text-project-title-${project.id}`}>
              {project.title || `${project.eventType} Event`}
            </span>
            <span className="text-sm text-muted-foreground">
              {project.id.slice(0, 8)}
            </span>
          </div>
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <Link href={`/leads?contact=${contact?.id}`}>
              <span className="font-medium hover:underline cursor-pointer" data-testid={`text-contact-name-${project.id}`}>
                {contact?.name || "Unknown"}
              </span>
            </Link>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <Mail className="h-3 w-3" />
                {contact?.email}
              </span>
              {contact?.phone && (
                <span className="flex items-center gap-1">
                  <Phone className="h-3 w-3" />
                  {contact.phone}
                </span>
              )}
            </div>
          </div>
        </TableCell>
        <TableCell>
          <EventTypeBadge type={project.eventType || "other"} />
        </TableCell>
        <TableCell>
          <div className="flex flex-col">
            <span className="font-medium" data-testid={`text-date-${project.id}`}>
              {formatDate(project.projectDate)}
            </span>
            {project.preferredTime && (
              <span className="text-sm text-muted-foreground">
                {project.preferredTime}
              </span>
            )}
          </div>
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-1">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span data-testid={`text-group-size-${project.id}`}>
              {project.groupSize || "TBD"}
            </span>
          </div>
        </TableCell>
        <TableCell>
          {projectBooking && (
            <div className="flex items-center gap-1">
              <Ship className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">
                {projectBooking.boatName}
              </span>
            </div>
          )}
        </TableCell>
        <TableCell>
          <StatusBadge status={project.status} />
        </TableCell>
        <TableCell>
          <div className="flex items-center gap-2">
            {latestQuote ? (
              <div className="flex flex-col gap-1">
                <Link href={`/quote/${latestQuote.id}`}>
                  <Button variant="outline" size="sm" className="h-8" data-testid={`button-view-quote-${project.id}`}>
                    <FileText className="h-3 w-3 mr-1" />
                    View Quote
                  </Button>
                </Link>
                <div className="text-xs text-muted-foreground">
                  {formatCurrency(latestQuote.total)} • {latestQuote.status}
                </div>
              </div>
            ) : (
              <Link href={`/quotes/new?projectId=${project.id}`}>
                <Button variant="ghost" size="sm" className="h-8" data-testid={`button-create-quote-${project.id}`}>
                  <Plus className="h-3 w-3 mr-1" />
                  Create Quote
                </Button>
              </Link>
            )}
            <Select
              value={project.status}
              onValueChange={(value) => updateStatusMutation.mutate({ id: project.id, status: value })}
            >
              <SelectTrigger className="w-32" data-testid={`select-status-${project.id}`}>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="NEW">New</SelectItem>
                <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                <SelectItem value="COMPLETED">Completed</SelectItem>
                <SelectItem value="CANCELLED">Cancelled</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </TableCell>
      </TableRow>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">
              Manage your active bookings and events
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button 
              onClick={() => setShowNewProjectDialog(true)}
              data-testid="button-new-project"
            >
              <Plus className="mr-2 h-4 w-4" />
              New Project
            </Button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
              <Briefcase className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-projects">
                {stats.total}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600" data-testid="text-active-projects">
                {stats.active}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Completed</CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-completed-projects">
                {stats.completed}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">This Month</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-blue-600" data-testid="text-monthly-projects">
                {stats.thisMonth}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search by name, email, or project..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  data-testid="input-search"
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-40" data-testid="select-status-filter">
                  <SelectValue placeholder="All Statuses" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="NEW">New</SelectItem>
                  <SelectItem value="SCHEDULED">Scheduled</SelectItem>
                  <SelectItem value="CONFIRMED">Confirmed</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="COMPLETED">Completed</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
              <Select value={eventTypeFilter} onValueChange={setEventTypeFilter}>
                <SelectTrigger className="w-40" data-testid="select-event-filter">
                  <SelectValue placeholder="All Events" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Events</SelectItem>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="bachelor">Bachelor</SelectItem>
                  <SelectItem value="bachelorette">Bachelorette</SelectItem>
                  <SelectItem value="graduation">Graduation</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Projects Table */}
        <Card>
          <CardHeader>
            <CardTitle>Projects</CardTitle>
            <CardDescription>
              View and manage all your customer projects and bookings
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs value={selectedTab} onValueChange={setSelectedTab}>
              <TabsList>
                <TabsTrigger value="active">
                  Active ({activeProjects.length})
                </TabsTrigger>
                <TabsTrigger value="completed">
                  Completed ({completedProjects.length})
                </TabsTrigger>
                <TabsTrigger value="cancelled">
                  Cancelled ({cancelledProjects.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="active">
                {projectsLoading ? (
                  <div className="flex items-center justify-center py-8">
                    <RefreshCw className="h-6 w-6 animate-spin" />
                  </div>
                ) : activeProjects.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No active projects found
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Group Size</TableHead>
                        <TableHead>Boat</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {activeProjects.map(project => (
                        <ProjectRow key={project.id} project={project} />
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>

              <TabsContent value="completed">
                {completedProjects.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No completed projects found
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Group Size</TableHead>
                        <TableHead>Boat</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {completedProjects.map(project => (
                        <ProjectRow key={project.id} project={project} />
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>

              <TabsContent value="cancelled">
                {cancelledProjects.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground">
                    No cancelled projects found
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Project</TableHead>
                        <TableHead>Customer</TableHead>
                        <TableHead>Event Type</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Group Size</TableHead>
                        <TableHead>Boat</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {cancelledProjects.map(project => (
                        <ProjectRow key={project.id} project={project} />
                      ))}
                    </TableBody>
                  </Table>
                )}
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      {/* New Project Dialog */}
      <Dialog open={showNewProjectDialog} onOpenChange={setShowNewProjectDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Enter the project details to get started
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <Label htmlFor="contact-name">Customer Name *</Label>
              <Input
                id="contact-name"
                value={newProjectData.contactName}
                onChange={(e) => setNewProjectData({ ...newProjectData, contactName: e.target.value })}
                placeholder="John Doe"
                data-testid="input-contact-name"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-email">Email *</Label>
              <Input
                id="contact-email"
                type="email"
                value={newProjectData.contactEmail}
                onChange={(e) => setNewProjectData({ ...newProjectData, contactEmail: e.target.value })}
                placeholder="customer@example.com"
                data-testid="input-contact-email"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="contact-phone">Phone</Label>
              <Input
                id="contact-phone"
                value={newProjectData.contactPhone}
                onChange={(e) => setNewProjectData({ ...newProjectData, contactPhone: e.target.value })}
                placeholder="(512) 488-5892"
                data-testid="input-contact-phone"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="event-type">Event Type *</Label>
              <Select 
                value={newProjectData.eventType}
                onValueChange={(value) => setNewProjectData({ ...newProjectData, eventType: value })}
              >
                <SelectTrigger id="event-type" data-testid="select-event-type">
                  <SelectValue placeholder="Select event type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="wedding">Wedding</SelectItem>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="birthday">Birthday</SelectItem>
                  <SelectItem value="bachelor">Bachelor</SelectItem>
                  <SelectItem value="bachelorette">Bachelorette</SelectItem>
                  <SelectItem value="graduation">Graduation</SelectItem>
                  <SelectItem value="anniversary">Anniversary</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="project-date">Event Date</Label>
              <Input
                id="project-date"
                type="date"
                value={newProjectData.projectDate}
                onChange={(e) => setNewProjectData({ ...newProjectData, projectDate: e.target.value })}
                data-testid="input-project-date"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="group-size">Group Size</Label>
              <Input
                id="group-size"
                type="number"
                value={newProjectData.groupSize}
                onChange={(e) => setNewProjectData({ ...newProjectData, groupSize: e.target.value })}
                placeholder="25"
                data-testid="input-group-size"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="special-requests">Special Requests</Label>
              <Textarea
                id="special-requests"
                value={newProjectData.specialRequests}
                onChange={(e) => setNewProjectData({ ...newProjectData, specialRequests: e.target.value })}
                placeholder="Any special requirements or requests..."
                data-testid="input-special-requests"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowNewProjectDialog(false)}>
              Cancel
            </Button>
            <Button 
              onClick={() => createProjectMutation.mutate()}
              disabled={!newProjectData.contactName || !newProjectData.contactEmail || !newProjectData.eventType || createProjectMutation.isPending}
              data-testid="button-create-project"
            >
              {createProjectMutation.isPending ? "Creating..." : "Create Project"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Post-Create Dialog */}
      <Dialog open={showPostCreateDialog} onOpenChange={setShowPostCreateDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Project Created Successfully!</DialogTitle>
            <DialogDescription>
              What would you like to do next?
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-3">
            <Button 
              onClick={() => {
                setShowPostCreateDialog(false);
                setLocation(`/quotes/builder?projectId=${createdProjectId}`);
              }}
              className="w-full"
              data-testid="button-create-quote"
            >
              <FileText className="mr-2 h-4 w-4" />
              Create Quote
            </Button>
            <Button 
              variant="outline"
              onClick={() => {
                setShowPostCreateDialog(false);
              }}
              className="w-full"
              data-testid="button-view-project"
            >
              <Eye className="mr-2 h-4 w-4" />
              View Project
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </Layout>
  );
}