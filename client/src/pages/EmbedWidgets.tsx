import { useState, useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { 
  Copy, Code, ExternalLink, Settings, Monitor, Smartphone, 
  Eye, Palette, Download, Share, Check, MessageSquare, Calendar
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { cn } from '@/lib/utils';

interface EmbedConfig {
  width: string;
  height: string;
  responsive: boolean;
  theme: 'light' | 'dark' | 'auto';
  borderRadius: number;
  showShadow: boolean;
}

const defaultChatbotConfig: EmbedConfig = {
  width: '400',
  height: '600',
  responsive: false,
  theme: 'light',
  borderRadius: 8,
  showShadow: true,
};

const defaultBookingConfig: EmbedConfig = {
  width: '100%',
  height: '800',
  responsive: true,
  theme: 'light',
  borderRadius: 8,
  showShadow: true,
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: "easeOut" }
  }
};

export default function EmbedWidgets() {
  const [chatbotConfig, setChatbotConfig] = useState<EmbedConfig>(defaultChatbotConfig);
  const [bookingConfig, setBookingConfig] = useState<EmbedConfig>(defaultBookingConfig);
  const [copiedStates, setCopiedStates] = useState<{ [key: string]: boolean }>({});
  const [previewMode, setPreviewMode] = useState<'desktop' | 'mobile'>('desktop');
  const { toast } = useToast();

  // Get current domain for embed URLs
  const baseUrl = window.location.origin;

  // Generate embed code
  const generateEmbedCode = (type: 'chatbot' | 'booking', config: EmbedConfig): string => {
    const url = `${baseUrl}/embed/${type}`;
    const width = config.responsive ? '100%' : `${config.width}px`;
    const height = `${config.height}px`;
    const styles = [
      `border-radius: ${config.borderRadius}px`,
      config.showShadow ? 'box-shadow: 0 4px 12px rgba(0,0,0,0.15)' : '',
      config.responsive ? 'min-width: 320px' : '',
    ].filter(Boolean).join('; ');

    return `<iframe 
  src="${url}" 
  width="${width}" 
  height="${height}" 
  frameborder="0"
  style="${styles}">
</iframe>`;
  };

  // Copy to clipboard
  const copyToClipboard = async (text: string, key: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [key]: true }));
      toast({
        title: "Copied to clipboard!",
        description: "Embed code copied successfully.",
      });
      
      // Reset copied state after 2 seconds
      setTimeout(() => {
        setCopiedStates(prev => ({ ...prev, [key]: false }));
      }, 2000);
    } catch (err) {
      toast({
        title: "Copy failed",
        description: "Unable to copy to clipboard. Please copy manually.",
        variant: "destructive",
      });
    }
  };

  // Update config helper
  const updateConfig = (
    type: 'chatbot' | 'booking', 
    updates: Partial<EmbedConfig>
  ) => {
    if (type === 'chatbot') {
      setChatbotConfig(prev => ({ ...prev, ...updates }));
    } else {
      setBookingConfig(prev => ({ ...prev, ...updates }));
    }
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      {/* Header */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
      >
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white" data-testid="text-page-title">
              Embed Widgets
            </h1>
            <p className="text-gray-600 dark:text-gray-300 mt-2" data-testid="text-page-description">
              Add AI chatbot and booking widgets to any website with simple embed codes
            </p>
          </div>
          
          {/* Preview Mode Toggle */}
          <div className="flex items-center space-x-2">
            <Button
              variant={previewMode === 'desktop' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('desktop')}
              data-testid="button-preview-desktop"
            >
              <Monitor className="h-4 w-4 mr-2" />
              Desktop
            </Button>
            <Button
              variant={previewMode === 'mobile' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setPreviewMode('mobile')}
              data-testid="button-preview-mobile"
            >
              <Smartphone className="h-4 w-4 mr-2" />
              Mobile
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Widget Tabs */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.1 }}
      >
        <Tabs defaultValue="chatbot" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="chatbot" className="flex items-center gap-2" data-testid="tab-chatbot">
              <MessageSquare className="h-4 w-4" />
              AI Chatbot Widget
            </TabsTrigger>
            <TabsTrigger value="booking" className="flex items-center gap-2" data-testid="tab-booking">
              <Calendar className="h-4 w-4" />
              Booking Widget
            </TabsTrigger>
          </TabsList>

          {/* AI Chatbot Widget Tab */}
          <TabsContent value="chatbot" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Chatbot Configuration
                  </CardTitle>
                  <CardDescription>
                    Customize the appearance and behavior of your AI chatbot widget
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Dimensions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="chatbot-width">Width</Label>
                      <Input
                        id="chatbot-width"
                        value={chatbotConfig.width}
                        onChange={(e) => updateConfig('chatbot', { width: e.target.value })}
                        placeholder="400"
                        data-testid="input-chatbot-width"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="chatbot-height">Height</Label>
                      <Input
                        id="chatbot-height"
                        value={chatbotConfig.height}
                        onChange={(e) => updateConfig('chatbot', { height: e.target.value })}
                        placeholder="600"
                        data-testid="input-chatbot-height"
                      />
                    </div>
                  </div>

                  {/* Responsive */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="chatbot-responsive">Responsive Width</Label>
                    <Switch
                      id="chatbot-responsive"
                      checked={chatbotConfig.responsive}
                      onCheckedChange={(responsive) => updateConfig('chatbot', { responsive })}
                      data-testid="switch-chatbot-responsive"
                    />
                  </div>

                  {/* Theme */}
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select 
                      value={chatbotConfig.theme} 
                      onValueChange={(theme: any) => updateConfig('chatbot', { theme })}
                    >
                      <SelectTrigger data-testid="select-chatbot-theme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto (System)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Border Radius */}
                  <div className="space-y-2">
                    <Label htmlFor="chatbot-radius">Border Radius: {chatbotConfig.borderRadius}px</Label>
                    <input
                      id="chatbot-radius"
                      type="range"
                      min="0"
                      max="20"
                      value={chatbotConfig.borderRadius}
                      onChange={(e) => updateConfig('chatbot', { borderRadius: parseInt(e.target.value) })}
                      className="w-full"
                      data-testid="slider-chatbot-radius"
                    />
                  </div>

                  {/* Shadow */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="chatbot-shadow">Drop Shadow</Label>
                    <Switch
                      id="chatbot-shadow"
                      checked={chatbotConfig.showShadow}
                      onCheckedChange={(showShadow) => updateConfig('chatbot', { showShadow })}
                      data-testid="switch-chatbot-shadow"
                    />
                  </div>

                  <Separator />

                  {/* Reset to defaults */}
                  <Button
                    variant="outline"
                    onClick={() => setChatbotConfig(defaultChatbotConfig)}
                    className="w-full"
                    data-testid="button-reset-chatbot"
                  >
                    Reset to Defaults
                  </Button>
                </CardContent>
              </Card>

              {/* Preview Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Widget Preview
                  </CardTitle>
                  <CardDescription>
                    See how your chatbot widget will look when embedded
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={cn(
                    "border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-lg",
                    previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
                  )}>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                      <div className="space-y-2">
                        <MessageSquare className="h-8 w-8 mx-auto text-blue-500" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          AI Chatbot Widget Preview
                        </p>
                        <p className="text-xs text-gray-500">
                          {chatbotConfig.responsive ? 'Responsive' : `${chatbotConfig.width}x${chatbotConfig.height}`}
                        </p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" data-testid="button-preview-chatbot">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-md">
                            <DialogHeader>
                              <DialogTitle>Chatbot Widget Preview</DialogTitle>
                            </DialogHeader>
                            <div className="w-full h-96 border rounded-lg overflow-hidden">
                              <iframe
                                src="/embed/chatbot"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                title="Chatbot Preview"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Embed Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Embed Code
                </CardTitle>
                <CardDescription>
                  Copy this code and paste it into your website where you want the chatbot to appear
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    value={generateEmbedCode('chatbot', chatbotConfig)}
                    readOnly
                    className="font-mono text-sm min-h-[120px] pr-12"
                    data-testid="textarea-chatbot-code"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(generateEmbedCode('chatbot', chatbotConfig), 'chatbot')}
                    data-testid="button-copy-chatbot"
                  >
                    {copiedStates.chatbot ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Badge variant="secondary">Direct URL</Badge>
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {baseUrl}/embed/chatbot
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${baseUrl}/embed/chatbot`, 'chatbot-url')}
                  >
                    {copiedStates['chatbot-url'] ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Booking Widget Tab */}
          <TabsContent value="booking" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Configuration Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Booking Configuration
                  </CardTitle>
                  <CardDescription>
                    Customize the appearance and behavior of your booking widget
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Dimensions */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="booking-width">Width</Label>
                      <Input
                        id="booking-width"
                        value={bookingConfig.width}
                        onChange={(e) => updateConfig('booking', { width: e.target.value })}
                        placeholder="100%"
                        data-testid="input-booking-width"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="booking-height">Height</Label>
                      <Input
                        id="booking-height"
                        value={bookingConfig.height}
                        onChange={(e) => updateConfig('booking', { height: e.target.value })}
                        placeholder="800"
                        data-testid="input-booking-height"
                      />
                    </div>
                  </div>

                  {/* Responsive */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="booking-responsive">Responsive Width</Label>
                    <Switch
                      id="booking-responsive"
                      checked={bookingConfig.responsive}
                      onCheckedChange={(responsive) => updateConfig('booking', { responsive })}
                      data-testid="switch-booking-responsive"
                    />
                  </div>

                  {/* Theme */}
                  <div className="space-y-2">
                    <Label>Theme</Label>
                    <Select 
                      value={bookingConfig.theme} 
                      onValueChange={(theme: any) => updateConfig('booking', { theme })}
                    >
                      <SelectTrigger data-testid="select-booking-theme">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="light">Light</SelectItem>
                        <SelectItem value="dark">Dark</SelectItem>
                        <SelectItem value="auto">Auto (System)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Border Radius */}
                  <div className="space-y-2">
                    <Label htmlFor="booking-radius">Border Radius: {bookingConfig.borderRadius}px</Label>
                    <input
                      id="booking-radius"
                      type="range"
                      min="0"
                      max="20"
                      value={bookingConfig.borderRadius}
                      onChange={(e) => updateConfig('booking', { borderRadius: parseInt(e.target.value) })}
                      className="w-full"
                      data-testid="slider-booking-radius"
                    />
                  </div>

                  {/* Shadow */}
                  <div className="flex items-center justify-between">
                    <Label htmlFor="booking-shadow">Drop Shadow</Label>
                    <Switch
                      id="booking-shadow"
                      checked={bookingConfig.showShadow}
                      onCheckedChange={(showShadow) => updateConfig('booking', { showShadow })}
                      data-testid="switch-booking-shadow"
                    />
                  </div>

                  <Separator />

                  {/* Reset to defaults */}
                  <Button
                    variant="outline"
                    onClick={() => setBookingConfig(defaultBookingConfig)}
                    className="w-full"
                    data-testid="button-reset-booking"
                  >
                    Reset to Defaults
                  </Button>
                </CardContent>
              </Card>

              {/* Preview Panel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Eye className="h-5 w-5" />
                    Widget Preview
                  </CardTitle>
                  <CardDescription>
                    See how your booking widget will look when embedded
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className={cn(
                    "border-2 border-dashed border-gray-300 dark:border-gray-600 p-4 rounded-lg",
                    previewMode === 'mobile' ? 'max-w-sm mx-auto' : 'w-full'
                  )}>
                    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 text-center">
                      <div className="space-y-2">
                        <Calendar className="h-8 w-8 mx-auto text-green-500" />
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                          Booking Widget Preview
                        </p>
                        <p className="text-xs text-gray-500">
                          {bookingConfig.responsive ? 'Responsive' : `${bookingConfig.width}x${bookingConfig.height}`}
                        </p>
                        <Dialog>
                          <DialogTrigger asChild>
                            <Button size="sm" data-testid="button-preview-booking">
                              <ExternalLink className="h-4 w-4 mr-2" />
                              Open Preview
                            </Button>
                          </DialogTrigger>
                          <DialogContent className="max-w-4xl max-h-[80vh]">
                            <DialogHeader>
                              <DialogTitle>Booking Widget Preview</DialogTitle>
                            </DialogHeader>
                            <div className="w-full h-96 border rounded-lg overflow-hidden">
                              <iframe
                                src="/embed/booking"
                                width="100%"
                                height="100%"
                                frameBorder="0"
                                title="Booking Preview"
                              />
                            </div>
                          </DialogContent>
                        </Dialog>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Embed Code */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Code className="h-5 w-5" />
                  Embed Code
                </CardTitle>
                <CardDescription>
                  Copy this code and paste it into your website where you want the booking widget to appear
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="relative">
                  <Textarea
                    value={generateEmbedCode('booking', bookingConfig)}
                    readOnly
                    className="font-mono text-sm min-h-[120px] pr-12"
                    data-testid="textarea-booking-code"
                  />
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-2 right-2"
                    onClick={() => copyToClipboard(generateEmbedCode('booking', bookingConfig), 'booking')}
                    data-testid="button-copy-booking"
                  >
                    {copiedStates.booking ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                </div>

                <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                  <Badge variant="secondary">Direct URL</Badge>
                  <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded">
                    {baseUrl}/embed/booking
                  </code>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => copyToClipboard(`${baseUrl}/embed/booking`, 'booking-url')}
                  >
                    {copiedStates['booking-url'] ? (
                      <Check className="h-3 w-3" />
                    ) : (
                      <Copy className="h-3 w-3" />
                    )}
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </motion.div>

      {/* Usage Instructions */}
      <motion.div
        initial="hidden"
        animate="visible"
        variants={fadeInUp}
        transition={{ delay: 0.2 }}
      >
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Share className="h-5 w-5" />
              How to Use Embed Widgets
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <MessageSquare className="h-4 w-4 text-blue-500" />
                  AI Chatbot Widget
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Perfect for customer support and lead generation</li>
                  <li>• Compact size ideal for sidebars or floating widgets</li>
                  <li>• Captures leads and generates quotes automatically</li>
                  <li>• Works on any website with iframe support</li>
                </ul>
              </div>
              
              <div className="space-y-3">
                <h4 className="font-semibold flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-green-500" />
                  Booking Widget
                </h4>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-1">
                  <li>• Full-featured booking interface</li>
                  <li>• Shows real-time availability</li>
                  <li>• Responsive design for all devices</li>
                  <li>• Direct integration with your booking system</li>
                </ul>
              </div>
            </div>

            <Separator />

            <div className="space-y-2">
              <h4 className="font-semibold">Integration Steps:</h4>
              <ol className="text-sm text-gray-600 dark:text-gray-300 space-y-1 list-decimal list-inside ml-4">
                <li>Customize the widget settings above</li>
                <li>Copy the generated embed code</li>
                <li>Paste the code into your website's HTML</li>
                <li>The widget will automatically load and function</li>
              </ol>
            </div>

            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
              <p className="text-sm text-blue-800 dark:text-blue-200">
                <strong>Tip:</strong> Test your widgets thoroughly on your website. 
                You can always come back here to adjust settings or generate new embed codes.
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}