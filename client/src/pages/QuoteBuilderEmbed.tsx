import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Code, Save, Eye, EyeOff } from 'lucide-react';

export default function QuoteBuilderEmbed() {
  const [iframeCode, setIframeCode] = useState('');
  const [savedCode, setSavedCode] = useState('');
  const [showPreview, setShowPreview] = useState(true);

  const handleSave = () => {
    setSavedCode(iframeCode);
    localStorage.setItem('quoteBuilderIframe', iframeCode);
  };

  const loadSavedCode = () => {
    const saved = localStorage.getItem('quoteBuilderIframe');
    if (saved) {
      setIframeCode(saved);
      setSavedCode(saved);
    }
  };

  // Load saved code on mount
  useState(() => {
    loadSavedCode();
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 py-6">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
            <Code className="h-8 w-8 text-blue-600" />
            Quote Builder Widget
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Embed your Lovable quote builder using an iframe
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid gap-6">
          {/* Instructions Card */}
          <Card>
            <CardHeader>
              <CardTitle>How to Embed Your Quote Builder</CardTitle>
              <CardDescription>
                Paste your Lovable iframe code below to display the quote builder on this page
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Alert>
                <AlertDescription>
                  <strong>Step 1:</strong> Get your Lovable embed code (should look like: <code className="text-sm bg-gray-100 dark:bg-gray-700 px-2 py-1 rounded">&lt;iframe src="..." /&gt;</code>)
                  <br />
                  <strong>Step 2:</strong> Paste it in the box below
                  <br />
                  <strong>Step 3:</strong> Click "Save & Preview"
                </AlertDescription>
              </Alert>

              <div className="space-y-2">
                <label className="text-sm font-medium">Iframe HTML Code</label>
                <Textarea
                  placeholder='<iframe src="https://your-lovable-app.lovable.app" width="100%" height="800" frameborder="0"></iframe>'
                  value={iframeCode}
                  onChange={(e) => setIframeCode(e.target.value)}
                  className="font-mono text-sm min-h-[120px]"
                  data-testid="textarea-iframe-code"
                />
              </div>

              <div className="flex gap-3">
                <Button 
                  onClick={handleSave}
                  data-testid="button-save-preview"
                >
                  <Save className="h-4 w-4 mr-2" />
                  Save & Preview
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => setShowPreview(!showPreview)}
                  data-testid="button-toggle-preview"
                >
                  {showPreview ? (
                    <>
                      <EyeOff className="h-4 w-4 mr-2" />
                      Hide Preview
                    </>
                  ) : (
                    <>
                      <Eye className="h-4 w-4 mr-2" />
                      Show Preview
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Preview Card */}
          {showPreview && savedCode && (
            <Card>
              <CardHeader>
                <CardTitle>Live Preview</CardTitle>
                <CardDescription>
                  Your embedded quote builder will appear below
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div 
                  className="w-full rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700"
                  dangerouslySetInnerHTML={{ __html: savedCode }}
                  data-testid="iframe-preview"
                />
              </CardContent>
            </Card>
          )}

          {/* Placeholder when no code */}
          {showPreview && !savedCode && (
            <Card className="border-dashed border-2">
              <CardContent className="py-24">
                <div className="text-center text-gray-500 dark:text-gray-400">
                  <Code className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg font-medium">No iframe code yet</p>
                  <p className="text-sm mt-2">Paste your Lovable embed code above and click "Save & Preview"</p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
