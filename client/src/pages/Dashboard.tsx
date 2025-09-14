import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { ChatWidget } from "@/components/ChatWidget";
import { ChatBubble } from "@/components/ChatBubble";
import { AvailabilityGrid } from "@/components/AvailabilityGrid";
import { QuoteBuilder } from "@/components/QuoteBuilder";
import { CRMPipeline } from "@/components/CRMPipeline";
import { Analytics } from "@/components/Analytics";
import { IntegrationStatus } from "@/components/IntegrationStatus";
import { CalendarView } from "@/components/CalendarView";
import Navigation from "@/components/Navigation";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Ship, User, Send, CreditCard, Mail, MessageSquare, Users, FileText, MessageCircle, Plus, TrendingUp, Calendar, LayoutDashboard } from "lucide-react";

export default function Dashboard() {
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  const [selectedQuoteId, setSelectedQuoteId] = useState("quote_demo_1"); // Demo quote ID
  const [quoteForm, setQuoteForm] = useState({
    customerName: "Sarah Johnson",
    customerEmail: "sarah.j@example.com",
    customerPhone: "+1 (555) 123-4567",
    delivery: "email" as "email" | "sms",
    personalMessage: ""
  });
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleSendQuote = async () => {
    try {
      // Using the selected quote ID (demo for now)
      const response = await apiRequest("POST", `/api/quotes/${selectedQuoteId}/send`, {
        delivery: quoteForm.delivery,
        customerInfo: {
          name: quoteForm.customerName,
          email: quoteForm.customerEmail,
          phone: quoteForm.customerPhone
        },
        personalMessage: quoteForm.personalMessage
      });

      const result = await response.json();
      
      if (result.success) {
        toast({
          title: "Quote Sent Successfully! 🚢",
          description: `Quote delivered via ${quoteForm.delivery} to ${quoteForm.customerName}`,
        });
        setQuoteModalOpen(false);
      }
    } catch (error) {
      console.error("Failed to send quote:", error);
      toast({
        title: "Error",
        description: "Failed to send quote. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handlePaymentDemo = () => {
    // Simulate payment processing
    toast({
      title: "Payment Processing Demo",
      description: "This would redirect to Stripe checkout for real payment processing.",
    });
    setPaymentModalOpen(false);
  };

  const openQuoteModal = (quoteId: string = "quote_demo_1") => {
    setSelectedQuoteId(quoteId);
    setQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-marine-50 via-background to-marine-100">
      {/* Navigation Header */}
      <Navigation />

      {/* Quick Actions Bar */}
      <div className="container mx-auto px-4 py-4">
        <div className="bg-card/90 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-border">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">Quick Actions</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              data-testid="button-quick-new-lead"
              onClick={() => setLocation("/leads?action=new")}
            >
              <Plus className="mr-2 h-4 w-4" />
              New Lead
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              data-testid="button-quick-create-quote"
              onClick={() => setLocation("/quotes/new")}
            >
              <FileText className="mr-2 h-4 w-4" />
              Create Quote
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              data-testid="button-quick-chat"
              onClick={() => setLocation("/chat")}
            >
              <MessageCircle className="mr-2 h-4 w-4" />
              Chat Assistant
            </Button>
            <Button 
              variant="outline" 
              className="w-full justify-start" 
              data-testid="button-quick-pipeline"
              onClick={() => setLocation("/leads")}
            >
              <TrendingUp className="mr-2 h-4 w-4" />
              Pipeline
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Tabs */}
      <div className="container mx-auto px-4 py-6">
        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-6">
            <TabsTrigger value="overview" className="flex items-center gap-2" data-testid="tab-overview">
              <LayoutDashboard className="h-4 w-4" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="calendar" className="flex items-center gap-2" data-testid="tab-calendar">
              <Calendar className="h-4 w-4" />
              Calendar
            </TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left Column: Chat Widget & Controls */}
              <div className="lg:col-span-1 space-y-6">
                <ChatWidget isPreview={true} />
                <ChatBubble isDemo={true} />
              </div>

              {/* Center Column: Availability & Booking Flow */}
              <div className="lg:col-span-1 space-y-6">
                <AvailabilityGrid />
                <QuoteBuilder />
              </div>

              {/* Right Column: CRM & Analytics */}
              <div className="lg:col-span-1 space-y-6">
                <CRMPipeline />
                <Analytics />
                <IntegrationStatus />
              </div>
            </div>
          </TabsContent>

          {/* Calendar Tab */}
          <TabsContent value="calendar" className="space-y-6">
            <CalendarView />
          </TabsContent>
        </Tabs>
      </div>

      {/* Quote Delivery Modal */}
      <Dialog open={quoteModalOpen} onOpenChange={setQuoteModalOpen}>
        <DialogContent className="max-w-md w-full boat-shadow" data-testid="quote-modal">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center space-x-2">
              <Send className="w-5 h-5" />
              <span>Send Quote</span>
            </DialogTitle>
            <p className="text-sm text-muted-foreground">Choose delivery method</p>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Customer Info */}
            <div>
              <Label className="text-xs font-medium mb-1">Customer Information</Label>
              <div className="space-y-2">
                <Input
                  type="text"
                  placeholder="Full Name"
                  value={quoteForm.customerName}
                  onChange={(e) => setQuoteForm(prev => ({ ...prev, customerName: e.target.value }))}
                  data-testid="input-customer-name"
                />
                <Input
                  type="email"
                  placeholder="Email Address"
                  value={quoteForm.customerEmail}
                  onChange={(e) => setQuoteForm(prev => ({ ...prev, customerEmail: e.target.value }))}
                  data-testid="input-customer-email"
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  value={quoteForm.customerPhone}
                  onChange={(e) => setQuoteForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                  data-testid="input-customer-phone"
                />
              </div>
            </div>
            
            {/* Delivery Options */}
            <div>
              <Label className="text-xs font-medium mb-2">Delivery Method</Label>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant={quoteForm.delivery === 'email' ? "default" : "outline"}
                  onClick={() => setQuoteForm(prev => ({ ...prev, delivery: 'email' }))}
                  className="flex items-center justify-center space-x-2 p-3"
                  data-testid="button-delivery-email"
                >
                  <Mail className="w-4 h-4" />
                  <span className="text-sm">Email</span>
                </Button>
                <Button
                  variant={quoteForm.delivery === 'sms' ? "default" : "outline"}
                  onClick={() => setQuoteForm(prev => ({ ...prev, delivery: 'sms' }))}
                  className="flex items-center justify-center space-x-2 p-3"
                  data-testid="button-delivery-sms"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">SMS</span>
                </Button>
              </div>
            </div>
            
            {/* Personal Message */}
            <div>
              <Label className="text-xs font-medium mb-1">Personal Message (Optional)</Label>
              <Textarea
                placeholder="Add a personal note..."
                value={quoteForm.personalMessage}
                onChange={(e) => setQuoteForm(prev => ({ ...prev, personalMessage: e.target.value }))}
                className="h-20 resize-none"
                data-testid="textarea-personal-message"
              />
            </div>
            
            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setQuoteModalOpen(false)}
                data-testid="button-cancel-quote"
              >
                Cancel
              </Button>
              <Button
                className="flex-1"
                onClick={handleSendQuote}
                data-testid="button-send-quote"
              >
                Send Quote
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Modal */}
      <Dialog open={paymentModalOpen} onOpenChange={setPaymentModalOpen}>
        <DialogContent className="max-w-md w-full boat-shadow" data-testid="payment-modal">
          <DialogHeader>
            <DialogTitle className="font-heading flex items-center space-x-2">
              <CreditCard className="w-5 h-5" />
              <span>Secure Payment</span>
            </DialogTitle>
            <p className="text-sm text-muted-foreground">Complete your booking</p>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Payment Summary */}
            <div className="bg-muted rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Birthday Party - Disco Boat</span>
                <span className="text-sm">March 15, 2024</span>
              </div>
              <div className="flex justify-between items-center text-lg font-bold">
                <span>Deposit Required</span>
                <span className="text-primary">$178.61</span>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Remaining $535.84 due 7 days before cruise
              </p>
            </div>
            
            {/* Demo Notice */}
            <div className="bg-primary/10 rounded-lg p-3">
              <p className="text-sm text-primary font-medium">Demo Mode</p>
              <p className="text-xs text-muted-foreground">
                This would integrate with Stripe for real payment processing
              </p>
            </div>
            
            {/* Actions */}
            <div className="flex space-x-2 pt-2">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => setPaymentModalOpen(false)}
                data-testid="button-cancel-payment"
              >
                Cancel
              </Button>
              <Button
                className="flex-1 bg-austin-500 hover:bg-austin-500/90"
                onClick={handlePaymentDemo}
                data-testid="button-process-payment"
              >
                Process Payment
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Action Buttons */}
      <div className="fixed bottom-4 left-4 space-y-2 z-40">
        <Button
          onClick={() => openQuoteModal()}
          className="w-full px-4 py-2 bg-secondary text-secondary-foreground rounded-lg shadow-lg hover:shadow-xl transition-all text-sm"
          data-testid="button-open-quote-modal"
        >
          <Send className="mr-2 h-4 w-4" />
          Send Quote
        </Button>
        <Button
          onClick={() => setPaymentModalOpen(true)}
          className="w-full px-4 py-2 bg-austin-500 hover:bg-austin-500/90 text-white rounded-lg shadow-lg hover:shadow-xl transition-all text-sm"
          data-testid="button-open-payment-modal"
        >
          <CreditCard className="mr-2 h-4 w-4" />
          Process Payment
        </Button>
      </div>
    </div>
  );
}
