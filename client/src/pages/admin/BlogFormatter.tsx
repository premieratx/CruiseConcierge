import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import AdminNoIndex from "@/components/AdminNoIndex";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Progress } from "@/components/ui/progress";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Sparkles, Loader2, CheckCircle, XCircle, AlertTriangle, TestTube, Eye, Shield } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/queryClient";

interface FormatResult {
  processed: number;
  errors: number;
  dryRun?: boolean;
  details: Array<{
    id: string;
    title: string;
    status: 'success' | 'error';
    message?: string;
    preview?: {
      original: string;
      formatted: string;
      sanitized: string;
      warnings: string[];
    };
  }>;
}

export default function BlogFormatter() {
  const [formatResults, setFormatResults] = useState<FormatResult | null>(null);
  const [testMode, setTestMode] = useState(true);
  const [dryRunMode, setDryRunMode] = useState(true);

  const formatMutation = useMutation({
    mutationFn: async (isDryRun: boolean) => {
      const response = await apiRequest('/api/blog/admin/format-all-posts', {
        method: 'POST',
        body: JSON.stringify({ 
          limit: testMode ? 2 : undefined,
          dryRun: isDryRun
        }),
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return response;
    },
    onSuccess: (data: FormatResult) => {
      setFormatResults(data);
    },
    onError: (error: any) => {
      console.error('Format failed:', error);
    }
  });

  const handleDryRun = () => {
    setFormatResults(null);
    formatMutation.mutate(true);
  };

  const handleApplyChanges = () => {
    setFormatResults(null);
    formatMutation.mutate(false);
  };

  return (
    <Layout>
      <AdminNoIndex />
      <div className="container mx-auto py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2 flex items-center gap-2">
              <Sparkles className="h-8 w-8 text-primary" />
              Blog Post Formatter
            </h1>
            <p className="text-muted-foreground">
              Use Gemini AI to optimize all published blog posts for SEO and visual appearance
            </p>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle>AI Blog Formatting</CardTitle>
              <CardDescription>
                This tool will use Gemini AI to reformat all 77 published blog posts with:
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 mb-6">
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Proper semantic HTML structure (h2, h3, p, ul, ol, blockquote)</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Clear heading hierarchy for SEO optimization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Enhanced readability with better spacing and paragraphs</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>Preserved links and images</span>
                </li>
                <li className="flex items-start gap-2">
                  <Shield className="h-5 w-5 text-green-600 mt-0.5" />
                  <span>HTML sanitization to prevent XSS attacks</span>
                </li>
              </ul>

              <Alert className="mb-6">
                <Shield className="h-4 w-4" />
                <AlertTitle>Security Notice</AlertTitle>
                <AlertDescription>
                  All formatted content is automatically sanitized to remove potentially dangerous HTML, scripts, and malicious code before being saved to the database.
                </AlertDescription>
              </Alert>

              <div className="mb-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <TestTube className="h-5 w-5 text-blue-600" />
                    <div>
                      <div className="font-medium text-blue-900 dark:text-blue-100">
                        Test Mode {testMode ? 'ON' : 'OFF'}
                      </div>
                      <div className="text-sm text-blue-700 dark:text-blue-300">
                        {testMode ? 'Format only 2 posts for testing' : 'Format all 77 published posts'}
                      </div>
                    </div>
                  </div>
                  <Switch
                    checked={testMode}
                    onCheckedChange={setTestMode}
                    data-testid="switch-test-mode"
                  />
                </div>
              </div>

              <Button 
                size="lg" 
                className="w-full mb-4"
                disabled={formatMutation.isPending}
                onClick={handleDryRun}
                data-testid="button-dry-run"
              >
                {formatMutation.isPending ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Processing Preview...
                  </>
                ) : (
                  <>
                    <Eye className="mr-2 h-5 w-5" />
                    Preview Changes (Dry Run)
                  </>
                )}
              </Button>

              {formatResults?.dryRun && (
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button 
                      size="lg" 
                      variant="default"
                      className="w-full"
                      disabled={formatMutation.isPending}
                      data-testid="button-apply-changes"
                    >
                      <Sparkles className="mr-2 h-5 w-5" />
                      Apply Changes to {formatResults.processed} Posts
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle className="flex items-center gap-2">
                        <AlertTriangle className="h-5 w-5 text-amber-500" />
                        Confirm Blog Post Formatting
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        This will apply the formatting changes to {formatResults.processed} published blog posts. The content will be sanitized and optimized for SEO. This action cannot be undone. Continue?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel data-testid="button-cancel-apply">Cancel</AlertDialogCancel>
                      <AlertDialogAction 
                        onClick={handleApplyChanges}
                        data-testid="button-confirm-apply"
                      >
                        Yes, Apply Changes
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              )}
            </CardContent>
          </Card>

          {formatMutation.isPending && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Progress value={undefined} className="w-full" />
                <p className="text-sm text-muted-foreground mt-4">
                  Formatting blog posts with Gemini AI. This may take a few minutes...
                </p>
              </CardContent>
            </Card>
          )}

          {formatMutation.isError && (
            <Alert variant="destructive">
              <XCircle className="h-4 w-4" />
              <AlertTitle>Error</AlertTitle>
              <AlertDescription>
                {formatMutation.error instanceof Error 
                  ? formatMutation.error.message 
                  : 'Failed to format blog posts. Please try again.'}
              </AlertDescription>
            </Alert>
          )}

          {formatResults && (
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {formatResults.errors === 0 ? (
                    <CheckCircle className="h-6 w-6 text-green-600" />
                  ) : (
                    <AlertTriangle className="h-6 w-6 text-amber-500" />
                  )}
                  {formatResults.dryRun ? 'Preview Complete (Dry Run)' : 'Formatting Complete'}
                </CardTitle>
                <CardDescription>
                  Processed {formatResults.processed} posts, {formatResults.errors} errors
                  {formatResults.dryRun && ' - No changes saved'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-green-50 dark:bg-green-950 rounded-lg">
                      <div className="text-2xl font-bold text-green-700 dark:text-green-400">
                        {formatResults.processed}
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-500">
                        {formatResults.dryRun ? 'Previewed' : 'Successfully Formatted'}
                      </div>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-950 rounded-lg">
                      <div className="text-2xl font-bold text-red-700 dark:text-red-400">
                        {formatResults.errors}
                      </div>
                      <div className="text-sm text-red-600 dark:text-red-500">
                        Errors
                      </div>
                    </div>
                  </div>

                  {formatResults.details.length > 0 && (
                    <div className="mt-6">
                      <h3 className="font-semibold mb-3">
                        {formatResults.dryRun ? 'Preview Results' : 'Details'}
                      </h3>
                      <div className="max-h-96 overflow-y-auto space-y-4">
                        {formatResults.details.map((detail) => (
                          <div
                            key={detail.id}
                            className={`p-4 rounded-lg border ${
                              detail.status === 'success'
                                ? 'border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950'
                                : 'border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950'
                            }`}
                            data-testid={`result-${detail.id}`}
                          >
                            <div className="flex items-start gap-2 mb-3">
                              {detail.status === 'success' ? (
                                <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                              ) : (
                                <XCircle className="h-5 w-5 text-red-600 mt-0.5" />
                              )}
                              <div className="flex-1">
                                <div className="font-medium">{detail.title}</div>
                                {detail.message && (
                                  <div className="text-sm text-muted-foreground mt-1">
                                    {detail.message}
                                  </div>
                                )}
                              </div>
                            </div>
                            
                            {detail.preview && formatResults.dryRun && (
                              <div className="mt-3 space-y-3">
                                {detail.preview.warnings.length > 0 && (
                                  <Alert variant="default" className="bg-amber-50 dark:bg-amber-950 border-amber-200 dark:border-amber-800">
                                    <Shield className="h-4 w-4" />
                                    <AlertTitle>Security Warnings</AlertTitle>
                                    <AlertDescription>
                                      <ul className="list-disc list-inside text-sm">
                                        {detail.preview.warnings.map((warning, i) => (
                                          <li key={i}>{warning}</li>
                                        ))}
                                      </ul>
                                    </AlertDescription>
                                  </Alert>
                                )}
                                
                                <Tabs defaultValue="comparison" className="w-full">
                                  <TabsList className="grid w-full grid-cols-3">
                                    <TabsTrigger value="comparison">Comparison</TabsTrigger>
                                    <TabsTrigger value="formatted">Formatted</TabsTrigger>
                                    <TabsTrigger value="sanitized">Sanitized</TabsTrigger>
                                  </TabsList>
                                  <TabsContent value="comparison" className="space-y-2">
                                    <div>
                                      <div className="text-xs font-semibold text-muted-foreground mb-1">Original:</div>
                                      <div className="p-2 bg-white dark:bg-gray-900 rounded border text-sm font-mono overflow-x-auto">
                                        {detail.preview.original}
                                      </div>
                                    </div>
                                    <div>
                                      <div className="text-xs font-semibold text-muted-foreground mb-1">After Sanitization:</div>
                                      <div className="p-2 bg-green-50 dark:bg-green-950 rounded border border-green-200 dark:border-green-800 text-sm font-mono overflow-x-auto">
                                        {detail.preview.sanitized}
                                      </div>
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="formatted">
                                    <div className="p-2 bg-white dark:bg-gray-900 rounded border text-sm font-mono overflow-x-auto">
                                      {detail.preview.formatted}
                                    </div>
                                  </TabsContent>
                                  <TabsContent value="sanitized">
                                    <div className="p-2 bg-white dark:bg-gray-900 rounded border text-sm font-mono overflow-x-auto">
                                      {detail.preview.sanitized}
                                    </div>
                                  </TabsContent>
                                </Tabs>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </Layout>
  );
}
