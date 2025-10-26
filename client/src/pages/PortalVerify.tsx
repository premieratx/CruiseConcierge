import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { useLocation, useRoute } from "wouter";
import { Loader2, ArrowLeft, RefreshCw, CheckCircle, AlertCircle } from "lucide-react";
import logoPath from "@assets/PPC Logo LARGE_1757881944449.png";

export default function PortalVerify() {
  const [code, setCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestingNew, setIsRequestingNew] = useState(false);
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes in seconds
  const { toast } = useToast();
  const [, setLocation] = useLocation();
  
  // Get phone number from URL params or search params
  const [match, params] = useRoute("/portal/verify");
  const urlParams = new URLSearchParams(window.location.search);
  const phoneNumber = urlParams.get('phone') || urlParams.get('phoneNumber') || '';
  const magicToken = urlParams.get('token');

  // Handle magic link authentication on page load
  useEffect(() => {
    if (magicToken) {
      handleMagicLinkAuth();
    }
  }, [magicToken]);

  // Countdown timer
  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleMagicLinkAuth = async () => {
    if (!magicToken) return;
    
    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest("POST", "/api/portal/auth/verify-code", {
        token: magicToken
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Welcome! 🎉",
          description: `Successfully logged in as ${data.customer.name}`,
        });
        setLocation("/portal/dashboard");
      } else {
        setError(data.error || "Invalid or expired magic link");
      }
    } catch (error) {
      console.error("Magic link auth error:", error);
      setError("Authentication failed. Please try entering the code manually.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerifyCode = async () => {
    if (code.length !== 6) return;
    
    setIsLoading(true);
    setError("");

    try {
      const response = await apiRequest("POST", "/api/portal/auth/verify-code", {
        phoneNumber: phoneNumber.replace(/\D/g, ''),
        code: code
      });

      const data = await response.json();

      if (response.ok) {
        toast({
          title: "Welcome! 🎉",
          description: `Successfully logged in as ${data.customer.name}`,
        });
        setLocation("/portal/dashboard");
      } else {
        setError(data.error || "Invalid verification code");
        setCode(""); // Clear the code on error
      }
    } catch (error) {
      console.error("Verify code error:", error);
      setError("Verification failed. Please try again.");
      setCode("");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRequestNewCode = async () => {
    setIsRequestingNew(true);
    setError("");

    try {
      const response = await apiRequest("POST", "/api/portal/auth/request-code", {
        phoneNumber: phoneNumber.replace(/\D/g, '')
      });

      if (response.ok) {
        toast({
          title: "New Code Sent! 📱",
          description: "A new verification code has been sent to your phone.",
        });
        setTimeLeft(900); // Reset timer
        setCode(""); // Clear current code
      } else {
        const data = await response.json();
        if (data.code === "RATE_LIMITED") {
          setError(`Too many requests. Please try again in ${Math.ceil(data.resetIn / 60)} minutes.`);
        } else {
          setError(data.error || "Failed to send new code");
        }
      }
    } catch (error) {
      console.error("Request new code error:", error);
      setError("Failed to send new code. Please try again.");
    } finally {
      setIsRequestingNew(false);
    }
  };

  // Auto-submit when code is complete
  useEffect(() => {
    if (code.length === 6 && !isLoading) {
      handleVerifyCode();
    }
  }, [code]);

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
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Enter Verification Code</h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              {phoneNumber ? (
                <>We sent a 6-digit code to {phoneNumber}</>
              ) : (
                <>Check your phone for the verification code</>
              )}
            </p>
          </div>
        </div>

        {/* Verification Form */}
        <Card className="shadow-lg border-0 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-xl text-center flex items-center justify-center gap-2">
              {isLoading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
              ) : error ? (
                <AlertCircle className="w-5 h-5 text-red-500" />
              ) : code.length === 6 ? (
                <CheckCircle className="w-5 h-5 text-green-500" />
              ) : null}
              Verify Your Phone
            </CardTitle>
            <CardDescription className="text-center">
              Enter the 6-digit code from your SMS
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Timer */}
            <div className="text-center">
              <div className="text-2xl font-mono font-bold text-blue-600 dark:text-blue-400">
                {formatTime(timeLeft)}
              </div>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {timeLeft > 0 ? "Code expires in" : "Code expired"}
              </p>
            </div>

            {/* OTP Input */}
            <div className="flex justify-center">
              <InputOTP
                maxLength={6}
                value={code}
                onChange={setCode}
                disabled={isLoading || timeLeft <= 0}
                data-testid="input-verification-code"
              >
                <InputOTPGroup>
                  <InputOTPSlot index={0} />
                  <InputOTPSlot index={1} />
                  <InputOTPSlot index={2} />
                </InputOTPGroup>
                <InputOTPGroup>
                  <InputOTPSlot index={3} />
                  <InputOTPSlot index={4} />
                  <InputOTPSlot index={5} />
                </InputOTPGroup>
              </InputOTP>
            </div>

            {/* Error Display */}
            {error && (
              <Alert variant="destructive" data-testid="alert-error">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Code Expired Alert */}
            {timeLeft <= 0 && (
              <Alert data-testid="alert-expired">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Your verification code has expired. Please request a new one.
                </AlertDescription>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
              {/* Manual Verify Button (if needed) */}
              {code.length === 6 && !isLoading && (
                <Button 
                  onClick={handleVerifyCode}
                  className="w-full h-12 text-lg font-semibold"
                  data-testid="button-verify"
                >
                  Verify Code
                </Button>
              )}

              {/* Request New Code */}
              <Button 
                variant="outline"
                onClick={handleRequestNewCode}
                disabled={isRequestingNew || timeLeft > 840} // Allow new code only after 1 minute
                className="w-full h-12"
                data-testid="button-request-new"
              >
                {isRequestingNew ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    <RefreshCw className="mr-2 h-4 w-4" />
                    {timeLeft > 840 ? `Request New Code (${Math.ceil((840 - timeLeft) / 60)}min)` : "Request New Code"}
                  </>
                )}
              </Button>

              {/* Back to Login */}
              <Button 
                variant="ghost"
                onClick={() => setLocation("/portal/login")}
                className="w-full h-12"
                data-testid="button-back"
              >
                <ArrowLeft className="mr-2 h-4 w-4" />
                Back to Login
              </Button>
            </div>

            {/* Help Text */}
            <div className="text-center text-xs text-gray-500 dark:text-gray-400 space-y-1">
              <p>Having trouble receiving the code?</p>
              <p>Check your spam folder or ensure your phone has signal.</p>
            </div>
          </CardContent>
        </Card>

        {/* Support Information */}
        <div className="text-center text-sm text-gray-600 dark:text-gray-400">
          <p>Need help? Contact us at clientservices@premierpartycruises.com</p>
        </div>
      </div>
    </div>
  );
}