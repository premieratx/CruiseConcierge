import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";
import { 
  ArrowLeft, User, Mail, Phone, Save, 
  Shield, Clock, CheckCircle, AlertCircle,
  Eye, EyeOff, Calendar
} from "lucide-react";
import logoPath from "@assets/PPC Logo LARGE_1757881944449.png";

interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  tags: string[];
  createdAt: string;
}

export default function PortalProfile() {
  const [isEditing, setIsEditing] = useState(false);
  const [showActivityLog, setShowActivityLog] = useState(false);
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });

  // Get customer profile
  const { data: profile, isLoading, error } = useQuery<{customer: CustomerProfile}>({
    queryKey: ["/api/portal/customer/profile"],
    queryFn: async () => {
      const response = await apiRequest("GET", "/api/portal/customer/profile");
      if (!response.ok) {
        throw new Error("Failed to load profile");
      }
      return response.json();
    },
    onSuccess: (data) => {
      setFormData({
        name: data.customer.name,
        email: data.customer.email
      });
    }
  });

  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: async (updateData: {name?: string; email?: string}) => {
      const response = await apiRequest("PUT", "/api/portal/customer/profile", updateData);
      if (!response.ok) {
        throw new Error("Failed to update profile");
      }
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Profile Updated! ✅",
        description: "Your profile information has been updated successfully.",
      });
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["/api/portal/customer/profile"] });
    },
    onError: (error: any) => {
      toast({
        title: "Update Failed",
        description: error.message || "Failed to update profile. Please try again.",
        variant: "destructive"
      });
    }
  });

  const handleSaveProfile = (e: FormEvent) => {
    e.preventDefault();
    
    if (!formData.name.trim()) {
      toast({
        title: "Validation Error",
        description: "Name is required.",
        variant: "destructive"
      });
      return;
    }

    if (!formData.email.trim() || !formData.email.includes('@')) {
      toast({
        title: "Validation Error", 
        description: "Please enter a valid email address.",
        variant: "destructive"
      });
      return;
    }

    const updates: any = {};
    if (formData.name !== profile?.customer.name) updates.name = formData.name;
    if (formData.email !== profile?.customer.email) updates.email = formData.email;

    if (Object.keys(updates).length === 0) {
      toast({
        title: "No Changes",
        description: "No changes were made to your profile.",
      });
      setIsEditing(false);
      return;
    }

    updateProfileMutation.mutate(updates);
  };

  const handleCancelEdit = () => {
    if (profile) {
      setFormData({
        name: profile.customer.name,
        email: profile.customer.email
      });
    }
    setIsEditing(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatPhoneNumber = (phone: string) => {
    const cleaned = phone.replace(/\D/g, '');
    if (cleaned.length === 11 && cleaned.startsWith('1')) {
      const number = cleaned.substring(1);
      return `(${number.substring(0, 3)}) ${number.substring(3, 6)}-${number.substring(6)}`;
    }
    if (cleaned.length === 10) {
      return `(${cleaned.substring(0, 3)}) ${cleaned.substring(3, 6)}-${cleaned.substring(6)}`;
    }
    return phone;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading your profile...</p>
        </div>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Failed to load profile. Please try again or contact support.
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                onClick={() => setLocation("/portal/dashboard")}
                data-testid="button-back"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Back to Dashboard
              </Button>
              <div>
                <h1 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Profile Settings
                </h1>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Manage your account information
                </p>
              </div>
            </div>
            <img 
              src={logoPath} 
              alt="Premier Party Cruises" 
              className="h-10 w-auto"
            />
          </div>
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Profile Information */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <User className="h-5 w-5" />
                    Personal Information
                  </CardTitle>
                  {!isEditing && (
                    <Button
                      variant="outline"
                      onClick={() => setIsEditing(true)}
                      data-testid="button-edit-profile"
                    >
                      Edit Profile
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSaveProfile} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="name"
                        type="text"
                        value={formData.name}
                        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                        data-testid="input-name"
                      />
                    </div>
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                        disabled={!isEditing}
                        className={`pl-10 ${!isEditing ? 'bg-gray-50 dark:bg-gray-700' : ''}`}
                        data-testid="input-email"
                      />
                    </div>
                  </div>

                  {/* Phone Field (Read-only) */}
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formatPhoneNumber(profile.customer.phone)}
                        disabled
                        className="pl-10 bg-gray-50 dark:bg-gray-700 text-gray-500"
                        data-testid="input-phone"
                      />
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Phone number cannot be changed. Contact support if you need to update this.
                    </p>
                  </div>

                  {/* Action Buttons */}
                  {isEditing && (
                    <div className="flex gap-3 pt-4">
                      <Button
                        type="submit"
                        disabled={updateProfileMutation.isPending}
                        data-testid="button-save-profile"
                      >
                        {updateProfileMutation.isPending ? (
                          <>
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                            Saving...
                          </>
                        ) : (
                          <>
                            <Save className="h-4 w-4 mr-2" />
                            Save Changes
                          </>
                        )}
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={handleCancelEdit}
                        disabled={updateProfileMutation.isPending}
                        data-testid="button-cancel-edit"
                      >
                        Cancel
                      </Button>
                    </div>
                  )}
                </form>
              </CardContent>
            </Card>
          </div>

          {/* Account Information Sidebar */}
          <div className="space-y-6">
            {/* Account Status */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Account Status
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3 p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="h-5 w-5 text-green-600" />
                  <div>
                    <p className="font-medium text-green-800 dark:text-green-200">
                      Verified Account
                    </p>
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Phone number verified via SMS
                    </p>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Customer Since:</span>
                    <span className="font-medium">{formatDate(profile.customer.createdAt)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600 dark:text-gray-400">Account Type:</span>
                    <span className="font-medium">Premium Customer</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Customer Tags */}
            {profile.customer.tags && profile.customer.tags.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Customer Tags</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {profile.customer.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Security Settings */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Authentication</p>
                      <p className="text-xs text-gray-500">Login via phone verification</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Secure Sessions</p>
                      <p className="text-xs text-gray-500">2-hour session timeout</p>
                    </div>
                    <CheckCircle className="h-5 w-5 text-green-600" />
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => setShowActivityLog(!showActivityLog)}
                  data-testid="button-toggle-activity"
                >
                  <Clock className="h-4 w-4 mr-2" />
                  {showActivityLog ? "Hide" : "View"} Activity Log
                </Button>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Quick Actions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => setLocation("/portal/dashboard")}
                  data-testid="button-dashboard"
                >
                  <User className="h-4 w-4 mr-2" />
                  Back to Dashboard
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => window.open("/book", "_blank")}
                  data-testid="button-book-cruise"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  Book New Cruise
                </Button>
                
                <Button
                  variant="outline"
                  className="w-full justify-start"
                  onClick={() => {
                    toast({
                      title: "Contact Support",
                      description: "Redirecting to customer support...",
                    });
                  }}
                  data-testid="button-support"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Contact Support
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Activity Log (expandable) */}
        {showActivityLog && (
          <Card className="mt-8">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Recent Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Portal login</p>
                    <p className="text-xs text-gray-500">Today at {new Date().toLocaleTimeString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  <div className="flex-1">
                    <p className="text-sm font-medium">Viewed dashboard</p>
                    <p className="text-xs text-gray-500">Today at {new Date(Date.now() - 300000).toLocaleTimeString()}</p>
                  </div>
                </div>

                <p className="text-xs text-gray-500 text-center mt-4">
                  Only showing recent activity. Contact support for complete history.
                </p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}