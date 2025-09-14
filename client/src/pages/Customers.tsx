import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { queryClient } from "@/lib/queryClient";
import type { Contact, Project, Quote, Payment, Invoice } from "@shared/schema";
import { 
  Users, DollarSign, TrendingUp, ShoppingBag, 
  Phone, Mail, Calendar, Award, Star, 
  Search, Filter, ChevronRight, Eye, History,
  CreditCard, FileText, Download, UserCheck
} from "lucide-react";
import { format } from "date-fns";
import { Link } from "wouter";

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

export default function Customers() {
  const [searchTerm, setSearchTerm] = useState("");
  const [tierFilter, setTierFilter] = useState("all");
  const [selectedCustomerId, setSelectedCustomerId] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch all clients (customers are leads with completed projects)
  const { data: contacts = [], isLoading } = useQuery<Contact[]>({
    queryKey: ["/api/contacts/clients"],
  });

  // Fetch all projects to link with customers
  const { data: projects = [] } = useQuery<Project[]>({
    queryKey: ["/api/projects"],
  });

  // Fetch quotes for revenue calculation
  const { data: quotes = [] } = useQuery<Quote[]>({
    queryKey: ["/api/quotes"],
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

  // Calculate customer metrics
  const customerMetrics = contacts.map(contact => {
    const customerProjects = projects.filter(p => p.contactId === contact.id);
    const completedProjects = customerProjects.filter(p => p.status === "COMPLETED");
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
      totalSpent,
      lastProjectDate,
      averageSpend: customerProjects.length > 0 ? totalSpent / customerProjects.length : 0,
    };
  });

  // Filter customers based on search and tier
  const filteredCustomers = customerMetrics.filter(customer => {
    const matchesSearch = searchTerm === "" || 
      customer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (customer.phone && customer.phone.includes(searchTerm));
    
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
    totalCustomers: contacts.length,
    activeCustomers: customerMetrics.filter(c => c.totalProjects > 0).length,
    totalRevenue: customerMetrics.reduce((sum, c) => sum + c.totalSpent, 0),
    averageCustomerValue: contacts.length > 0 
      ? customerMetrics.reduce((sum, c) => sum + c.totalSpent, 0) / contacts.length 
      : 0,
    topCustomers: sortedCustomers.slice(0, 5),
  };

  // Customer detail dialog content
  const CustomerDetail = ({ customerId }: { customerId: string }) => {
    const customer = customerMetrics.find(c => c.id === customerId);
    if (!customer) return null;

    const customerProjects = projects.filter(p => p.contactId === customerId);
    
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
              <CardTitle className="text-sm">Total Projects</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{customer.totalProjects}</div>
            </CardContent>
          </Card>
        </div>

        <div>
          <h4 className="font-semibold mb-3">Project History</h4>
          <div className="space-y-2">
            {customerProjects.length === 0 ? (
              <p className="text-sm text-muted-foreground">No projects yet</p>
            ) : (
              customerProjects.map(project => (
                <div key={project.id} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                  <div>
                    <p className="font-medium">
                      {project.title || `${project.eventType} Event`}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {formatDate(project.projectDate)} • {project.groupSize} guests
                    </p>
                  </div>
                  <Badge variant={project.status === "COMPLETED" ? "outline" : "default"}>
                    {project.status}
                  </Badge>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <Layout>
      <div className="container mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Customers</h1>
            <p className="text-muted-foreground">
              Manage your customer relationships and track their journey
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" data-testid="button-export">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Link href="/leads">
              <Button data-testid="button-view-leads">
                <Users className="mr-2 h-4 w-4" />
                View Leads
              </Button>
            </Link>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-total-customers">
                {stats.totalCustomers}
              </div>
              <p className="text-xs text-muted-foreground">
                {stats.activeCustomers} active
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600" data-testid="text-total-revenue">
                {formatCurrency(stats.totalRevenue)}
              </div>
              <p className="text-xs text-muted-foreground">
                All-time revenue
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Avg Customer Value</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-avg-value">
                {formatCurrency(stats.averageCustomerValue)}
              </div>
              <p className="text-xs text-muted-foreground">
                Per customer
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Top Spenders</CardTitle>
              <Star className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold" data-testid="text-top-customers">
                {stats.topCustomers.length}
              </div>
              <p className="text-xs text-muted-foreground">
                VIP customers
              </p>
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
                  placeholder="Search by name, email, or phone..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full"
                  data-testid="input-search"
                />
              </div>
              <Select value={tierFilter} onValueChange={setTierFilter}>
                <SelectTrigger className="w-40" data-testid="select-tier-filter">
                  <SelectValue placeholder="All Tiers" />
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
          </CardContent>
        </Card>

        {/* Top Customers */}
        {stats.topCustomers.length > 0 && (
          <Card>
            <CardHeader>
              <CardTitle>Top Customers</CardTitle>
              <CardDescription>
                Your most valuable customers by total revenue
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-5">
                {stats.topCustomers.map((customer, index) => (
                  <div key={customer.id} className="flex flex-col items-center text-center space-y-2">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-primary-foreground flex items-center justify-center text-white font-bold">
                      {index + 1}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {formatCurrency(customer.totalSpent)}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Customers Table */}
        <Card>
          <CardHeader>
            <CardTitle>All Customers</CardTitle>
            <CardDescription>
              Complete list of your customers and their information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="text-center py-8">Loading customers...</div>
            ) : sortedCustomers.length === 0 ? (
              <div className="text-center py-8 text-muted-foreground">
                No customers found matching your criteria
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Customer</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Projects</TableHead>
                    <TableHead>Total Spent</TableHead>
                    <TableHead>Last Event</TableHead>
                    <TableHead>Tier</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {sortedCustomers.map(customer => (
                    <TableRow key={customer.id} data-testid={`row-customer-${customer.id}`}>
                      <TableCell>
                        <div className="font-medium" data-testid={`text-customer-name-${customer.id}`}>
                          {customer.name}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col text-sm">
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
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium" data-testid={`text-projects-${customer.id}`}>
                            {customer.totalProjects}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {customer.completedProjects} completed
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-medium text-green-600" data-testid={`text-spent-${customer.id}`}>
                            {formatCurrency(customer.totalSpent)}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            Avg: {formatCurrency(customer.averageSpend)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <span className="text-sm" data-testid={`text-last-event-${customer.id}`}>
                          {formatDate(customer.lastProjectDate)}
                        </span>
                      </TableCell>
                      <TableCell>
                        <TierBadge totalSpent={customer.totalSpent} />
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Dialog>
                            <DialogTrigger asChild>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => setSelectedCustomerId(customer.id)}
                                data-testid={`button-view-${customer.id}`}
                              >
                                <Eye className="h-4 w-4" />
                              </Button>
                            </DialogTrigger>
                            <DialogContent className="max-w-2xl">
                              <DialogHeader>
                                <DialogTitle>Customer Details</DialogTitle>
                                <DialogDescription>
                                  View complete customer information and history
                                </DialogDescription>
                              </DialogHeader>
                              {selectedCustomerId && <CustomerDetail customerId={selectedCustomerId} />}
                            </DialogContent>
                          </Dialog>
                          <Link href={`/projects?contact=${customer.id}`}>
                            <Button variant="ghost" size="sm" data-testid={`button-projects-${customer.id}`}>
                              <History className="h-4 w-4" />
                            </Button>
                          </Link>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}