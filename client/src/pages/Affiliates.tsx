import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, TrendingUp, DollarSign, Users, Calendar, Copy, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { Affiliate, InsertAffiliate } from "@shared/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form";
import { format } from "date-fns";

const affiliateFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  code: z.string().min(3, "Code must be at least 3 characters"),
  email: z.string().email("Invalid email address").optional().or(z.literal('')),
  phone: z.string().optional(),
  companyName: z.string().optional(),
  commissionType: z.enum(["percentage", "flat_fee"]),
  commissionRate: z.number().min(0, "Commission rate must be positive"),
  notes: z.string().optional(),
  active: z.boolean(),
});

type AffiliateFormData = z.infer<typeof affiliateFormSchema>;

export default function Affiliates() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingAffiliate, setEditingAffiliate] = useState<Affiliate | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const { toast } = useToast();

  const { data: affiliates = [], isLoading } = useQuery<Affiliate[]>({
    queryKey: ["/api/affiliates"],
  });

  const form = useForm<AffiliateFormData>({
    resolver: zodResolver(affiliateFormSchema),
    defaultValues: {
      name: "",
      code: "",
      email: "",
      phone: "",
      companyName: "",
      commissionType: "percentage",
      commissionRate: 10,
      notes: "",
      active: true,
    },
  });

  const createMutation = useMutation({
    mutationFn: (data: InsertAffiliate) => apiRequest("POST", "/api/affiliates", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/affiliates"] });
      toast({ title: "Affiliate created successfully" });
      setIsDialogOpen(false);
      form.reset();
    },
    onError: () => {
      toast({ title: "Failed to create affiliate", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Affiliate> }) =>
      apiRequest("PUT", `/api/affiliates/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/affiliates"] });
      toast({ title: "Affiliate updated successfully" });
      setIsDialogOpen(false);
      setEditingAffiliate(null);
      form.reset();
    },
    onError: () => {
      toast({ title: "Failed to update affiliate", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/affiliates/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/affiliates"] });
      toast({ title: "Affiliate deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete affiliate", variant: "destructive" });
    },
  });

  const updateStatsMutation = useMutation({
    mutationFn: (id: string) => apiRequest("POST", `/api/affiliates/${id}/update-stats`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/affiliates"] });
      toast({ title: "Stats updated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to update stats", variant: "destructive" });
    },
  });

  const handleSubmit = (data: AffiliateFormData) => {
    const affiliateData = {
      ...data,
      email: data.email || undefined,
      commissionRate: data.commissionType === "flat_fee" 
        ? Math.round(data.commissionRate * 100) 
        : data.commissionRate,
    };

    if (editingAffiliate) {
      updateMutation.mutate({ id: editingAffiliate.id, data: affiliateData });
    } else {
      createMutation.mutate(affiliateData as InsertAffiliate);
    }
  };

  const openEditDialog = (affiliate: Affiliate) => {
    setEditingAffiliate(affiliate);
    form.reset({
      name: affiliate.name,
      code: affiliate.code,
      email: affiliate.email || "",
      phone: affiliate.phone || "",
      companyName: affiliate.companyName || "",
      commissionType: affiliate.commissionType as any,
      commissionRate: affiliate.commissionType === "flat_fee" 
        ? affiliate.commissionRate / 100 
        : affiliate.commissionRate,
      notes: affiliate.notes || "",
      active: affiliate.active,
    });
    setIsDialogOpen(true);
  };

  const filteredAffiliates = affiliates.filter(affiliate =>
    affiliate.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    affiliate.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (affiliate.companyName && affiliate.companyName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const totalStats = filteredAffiliates.reduce((acc, affiliate) => ({
    totalReferrals: acc.totalReferrals + affiliate.totalReferrals,
    totalRevenue: acc.totalRevenue + affiliate.totalRevenue,
    totalCommission: acc.totalCommission + affiliate.totalCommission,
    pendingCommission: acc.pendingCommission + affiliate.pendingCommission,
  }), {
    totalReferrals: 0,
    totalRevenue: 0,
    totalCommission: 0,
    pendingCommission: 0,
  });

  const getCommissionDisplay = (affiliate: Affiliate) => {
    if (affiliate.commissionType === "percentage") {
      return `${affiliate.commissionRate}%`;
    } else {
      return `$${(affiliate.commissionRate / 100).toFixed(2)}`;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <Layout>
    <div className="container mx-auto p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">Affiliates</h1>
          <p className="text-muted-foreground mt-1">Manage affiliate partners and track commissions</p>
        </div>
        <Dialog open={isDialogOpen} onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) {
            setEditingAffiliate(null);
            form.reset();
          }
        }}>
          <DialogTrigger asChild>
            <Button data-testid="button-new-affiliate">
              <Plus className="h-4 w-4 mr-2" />
              New Affiliate
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingAffiliate ? "Edit Affiliate" : "Create Affiliate"}</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Affiliate Name</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="John Doe" data-testid="input-affiliate-name" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Affiliate Code</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="AFF123" data-testid="input-affiliate-code" />
                        </FormControl>
                        <FormDescription>Unique referral code</FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input {...field} type="email" placeholder="john@example.com" data-testid="input-email" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone</FormLabel>
                        <FormControl>
                          <Input {...field} placeholder="(512) 555-0123" data-testid="input-phone" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Company Name</FormLabel>
                      <FormControl>
                        <Input {...field} placeholder="Optional" data-testid="input-company" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="grid grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="commissionType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Commission Type</FormLabel>
                        <div className="flex gap-4 mt-2">
                          <label className="flex items-center">
                            <input
                              type="radio"
                              value="percentage"
                              checked={field.value === "percentage"}
                              onChange={() => field.onChange("percentage")}
                              className="mr-2"
                              data-testid="radio-percentage"
                            />
                            Percentage
                          </label>
                          <label className="flex items-center">
                            <input
                              type="radio"
                              value="flat_fee"
                              checked={field.value === "flat_fee"}
                              onChange={() => field.onChange("flat_fee")}
                              className="mr-2"
                              data-testid="radio-flat-fee"
                            />
                            Flat Fee
                          </label>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="commissionRate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          {form.watch("commissionType") === "percentage" ? "Commission %" : "Commission Amount"}
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            {form.watch("commissionType") === "flat_fee" && (
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                            )}
                            <Input
                              {...field}
                              type="number"
                              step={form.watch("commissionType") === "percentage" ? "1" : "0.01"}
                              className={form.watch("commissionType") === "flat_fee" ? "pl-8" : ""}
                              onChange={e => field.onChange(Number(e.target.value))}
                              data-testid="input-commission-rate"
                            />
                            {form.watch("commissionType") === "percentage" && (
                              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">%</span>
                            )}
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="notes"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Notes</FormLabel>
                      <FormControl>
                        <Textarea {...field} placeholder="Any additional notes..." data-testid="textarea-notes" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="active"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                      <div className="space-y-0.5">
                        <FormLabel className="text-base">Active</FormLabel>
                        <FormDescription>
                          Affiliate can receive commissions
                        </FormDescription>
                      </div>
                      <FormControl>
                        <Switch
                          checked={field.value}
                          onCheckedChange={field.onChange}
                          data-testid="switch-active"
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsDialogOpen(false)}
                    data-testid="button-cancel"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={createMutation.isPending || updateMutation.isPending}
                    data-testid="button-save-affiliate"
                  >
                    {editingAffiliate ? "Update" : "Create"} Affiliate
                  </Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Affiliates</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{filteredAffiliates.length}</div>
            <p className="text-xs text-muted-foreground">
              {filteredAffiliates.filter(a => a.active).length} active
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalStats.totalReferrals}</div>
            <p className="text-xs text-muted-foreground">All time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalStats.totalRevenue / 100).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">From referrals</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Commission</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${(totalStats.pendingCommission / 100).toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">To be paid</p>
          </CardContent>
        </Card>
      </div>

      <div className="mb-6">
        <Input
          placeholder="Search affiliates..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-md"
          data-testid="input-search"
        />
      </div>

      <div className="grid gap-4">
        {filteredAffiliates.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No affiliates found. Create your first affiliate to get started.</p>
          </Card>
        ) : (
          filteredAffiliates.map((affiliate) => (
            <Card key={affiliate.id} data-testid={`card-affiliate-${affiliate.id}`}>
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div>
                    <CardTitle className="text-xl">{affiliate.name}</CardTitle>
                    {affiliate.companyName && (
                      <CardDescription className="mt-1">{affiliate.companyName}</CardDescription>
                    )}
                    <div className="flex items-center gap-3 mt-2">
                      <Badge variant={affiliate.active ? "default" : "secondary"}>
                        {affiliate.active ? "Active" : "Inactive"}
                      </Badge>
                      <div className="flex items-center gap-2">
                        <code className="text-sm font-mono bg-muted px-2 py-1 rounded">
                          {affiliate.code}
                        </code>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6"
                          onClick={() => {
                            navigator.clipboard.writeText(affiliate.code);
                            toast({ title: "Code copied to clipboard" });
                          }}
                          data-testid={`button-copy-code-${affiliate.id}`}
                        >
                          <Copy className="h-3 w-3" />
                        </Button>
                      </div>
                      <Badge variant="outline">
                        Commission: {getCommissionDisplay(affiliate)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => updateStatsMutation.mutate(affiliate.id)}
                      disabled={updateStatsMutation.isPending}
                      data-testid={`button-refresh-${affiliate.id}`}
                    >
                      <RefreshCw className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => openEditDialog(affiliate)}
                      data-testid={`button-edit-${affiliate.id}`}
                    >
                      <Edit2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        if (confirm("Are you sure you want to delete this affiliate?")) {
                          deleteMutation.mutate(affiliate.id);
                        }
                      }}
                      data-testid={`button-delete-${affiliate.id}`}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Referrals</p>
                    <p className="font-semibold">{affiliate.totalReferrals}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Revenue</p>
                    <p className="font-semibold">${(affiliate.totalRevenue / 100).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Commission</p>
                    <p className="font-semibold">${(affiliate.totalCommission / 100).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Pending</p>
                    <p className="font-semibold">${(affiliate.pendingCommission / 100).toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Last Referral</p>
                    <p className="font-semibold">
                      {affiliate.lastReferralDate 
                        ? format(new Date(affiliate.lastReferralDate), 'MMM d, yyyy')
                        : 'Never'}
                    </p>
                  </div>
                </div>
                {affiliate.notes && (
                  <div className="mt-4 p-3 bg-muted rounded-lg">
                    <p className="text-sm">{affiliate.notes}</p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
    </Layout>
  );
}