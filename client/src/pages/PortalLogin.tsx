import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation } from "wouter";
import { Loader2, Smartphone, Shield, Clock } from "lucide-react";
import logoPath from "@assets/PPC Logo LARGE_1757881944449.png";

export default function PortalLogin() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [codeSent, setCodeSent] = useState(false);
  const [error, setError] = useState("");
  const [rateLimitInfo, setRateLimitInfo] = useState<{ remaining: number; resetIn?: number } | null>(null);
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const formatPhoneNumber = (value: string) => {
    // Remove all non-digits
    const digits = value.replace(/\D/g, '');
    
    // Format as (XXX) XXX-XXXX
    if (digits.length <= 3) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
  };

  const handlePhoneChange = (e: ChangeEvent<HTMLInputElement>) => {
    const formatted = formatPhoneNumber(e.target.value);
    if (formatted.length <= 14) { // Limit to formatted phone length
      setPhoneNumber(formatted);
    }
  };

  const handleRequestCode = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest("POST", "/api/portal/auth/request-code", {
        phoneNumber: phoneNumber.replace(/\D/g, ''), // Send only digits
        name: name.trim() || undefined
      });

      const data = await response.json();

      if (response.ok) {
        setCodeSent(true);
        setRateLimitInfo({ 
          remaining: data.rateLimitRemaining || 0,
          resetIn: data.resetIn 
        });
        
        toast({
          title: "Authentication Code Sent! 📱",
          description: "Check your phone for a text message with your login code.",
        });

        // Redirect to verify page with phone number
        setLocation(`/portal/verify?phone=${encodeURIComponent(phoneNumber)}`);
      } else {
        if (data.code === "RATE_LIMITED") {
          setError(`Too many requests. Please try again in ${Math.ceil(data.resetIn / 60)} minutes.`);
          setRateLimitInfo({ remaining: 0, resetIn: data.resetIn });
        } else {
          setError(data.error || "Failed to send authentication code");
        }
      }
    } catch (error) {
      console.error("Request code error:", error);
      setError("Failed to send authentication code. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 dark:from-gray-900 dark:via-gray-800 dark:to-blue-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Logo and Header */}
        <div className="text-center space-y-4">
          <div className="flex justify-center">
            <img 
              src={logoPath} 
              alt="Premier Party Cruises" 
              className="h-16 w-auto object-contain"
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customer Portal</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Secure access to your cruise bookings, quotes, and invoices
            </p>
          </div>
        </div>

        {/* Security Features */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className="space-y-2">
            <div className="mx-auto w-10 h-10 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
              <Smartphone className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">SMS Verification</p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto w-10 h-10 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
              <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Secure Access</p>
          </div>
          <div className="space-y-2">
            <div className="mx-auto w-10 h-10 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center">
              <Clock className="w-5 h-5 text-orange-600 dark:text-orange-400" />
            </div>
            <p className="text-xs text-gray-600 dark:text-gray-400">Quick Login</p>
          </div>
        </div>

        {/* Login Form */}
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-center">Sign In</CardTitle>
            <CardDescription className="text-center">
              Enter your phone number to receive a secure login code via SMS
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleRequestCode} className="space-y-4">
              {/* Name Field (Optional) */}
              <div className="space-y-2">
                <Label htmlFor="name">Name (Optional)</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  data-testid="input-name"
                  className="text-lg h-12"
                />
              </div>

              {/* Phone Number Field */}
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number *</Label>
                <Input
                  id="phone"
                  type="tel"
                  placeholder="(555) 123-4567"
                  value={phoneNumber}
                  onChange={handlePhoneChange}
                  required
                  data-testid="input-phone"
                  className="text-lg h-12"
                  autoComplete="tel"
                />
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  We'll send a verification code to this number
                </p>
              </div>

              {/* Error Display */}
              {error && (
                <Alert variant="destructive" data-testid="alert-error">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Rate Limit Info */}
              {rateLimitInfo && rateLimitInfo.remaining <= 1 && (
                <Alert data-testid="alert-rate-limit">
                  <AlertDescription>
                    {rateLimitInfo.remaining === 0 
                      ? `You've reached the SMS limit. Try again in ${Math.ceil((rateLimitInfo.resetIn || 0) / 60)} minutes.`
                      : `${rateLimitInfo.remaining} SMS remaining this hour.`
                    }
                  </AlertDescription>
                </Alert>
              )}

              {/* Submit Button */}
              <Button 
                type="submit" 
                className="w-full h-12 text-lg font-semibold"
                disabled={isLoading || !phoneNumber.trim() || phoneNumber.replace(/\D/g, '').length < 10}
                data-testid="button-request-code"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Sending Code...
                  </>
                ) : (
                  <>
                    <Smartphone className="mr-2 h-5 w-5" />
                    Send Verification Code
                  </>
                )}
              </Button>
            </form>

            {/* Security Notice */}
            <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-xs text-blue-800 dark:text-blue-200 text-center">
                🔒 Your privacy is protected. We only use your phone number for secure authentication.
                Code expires in 15 minutes.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Help Text */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Need help? Contact us at support@premierpartycruises.com</p>
          <p className="mt-1">or call (555) 123-CRUISE</p>
        </div>
      </div>
    </div>
  );
}