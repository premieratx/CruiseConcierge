import { useState, useRef } from "react";
import { Upload, Download, FileText, AlertCircle, CheckCircle, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { QuoteTemplate, InsertQuoteTemplate } from "@shared/schema";
import {
  exportTemplate,
  exportTemplates,
  exportActiveTemplates,
  parseImportFile,
  validateImportFile,
  checkForDuplicates,
  generateUniqueName,
  type ImportValidationResult
} from "@/lib/templateExportImport";

interface ExportButtonProps {
  templates: QuoteTemplate[];
  selectedTemplates?: QuoteTemplate[];
}

interface ImportButtonProps {
  onImportComplete?: () => void;
}

interface ImportPreviewProps {
  validationResult: ImportValidationResult;
  existingTemplates: QuoteTemplate[];
  onConfirm: (templates: QuoteTemplate[], resolutions: ImportResolution[]) => void;
  onCancel: () => void;
}

interface ImportResolution {
  templateId: string;
  action: 'import' | 'skip' | 'rename' | 'overwrite';
  newName?: string;
}

// Export dropdown component
export function ExportButton({ templates, selectedTemplates = [] }: ExportButtonProps) {
  const { toast } = useToast();
  
  const handleExportAll = () => {
    exportTemplates(templates);
    toast({
      title: "Export Complete",
      description: `Exported ${templates.length} templates successfully`,
    });
  };
  
  const handleExportActive = () => {
    const activeTemplates = templates.filter(t => t.active);
    exportActiveTemplates(templates);
    toast({
      title: "Export Complete", 
      description: `Exported ${activeTemplates.length} active templates successfully`,
    });
  };
  
  const handleExportSelected = () => {
    if (selectedTemplates.length === 0) {
      toast({
        title: "No Templates Selected",
        description: "Please select templates to export",
        variant: "destructive"
      });
      return;
    }
    
    exportTemplates(selectedTemplates);
    toast({
      title: "Export Complete",
      description: `Exported ${selectedTemplates.length} selected templates successfully`,
    });
  };
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" data-testid="button-export">
          <Download className="h-4 w-4 mr-2" />
          Export
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={handleExportAll} data-testid="export-all">
          <FileText className="h-4 w-4 mr-2" />
          Export All Templates ({templates.length})
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleExportActive} data-testid="export-active">
          <CheckCircle className="h-4 w-4 mr-2" />
          Export Active Templates ({templates.filter(t => t.active).length})
        </DropdownMenuItem>
        {selectedTemplates.length > 0 && (
          <DropdownMenuItem onClick={handleExportSelected} data-testid="export-selected">
            <Download className="h-4 w-4 mr-2" />
            Export Selected Templates ({selectedTemplates.length})
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

// Single template export button
export function ExportTemplateButton({ template }: { template: QuoteTemplate }) {
  const { toast } = useToast();
  
  const handleExport = () => {
    exportTemplate(template);
    toast({
      title: "Export Complete",
      description: `Exported template "${template.name}" successfully`,
    });
  };
  
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleExport}
      data-testid={`export-template-${template.id}`}
      title="Export template"
    >
      <Download className="h-4 w-4" />
    </Button>
  );
}

// Import button component
export function ImportButton({ onImportComplete }: ImportButtonProps) {
  const [isImporting, setIsImporting] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [validationResult, setValidationResult] = useState<ImportValidationResult | null>(null);
  const [existingTemplates, setExistingTemplates] = useState<QuoteTemplate[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();
  
  const createMutation = useMutation({
    mutationFn: (data: InsertQuoteTemplate) => apiRequest("POST", "/api/quote-templates", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
    },
  });
  
  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<QuoteTemplate> }) =>
      apiRequest("PUT", `/api/quote-templates/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
    },
  });
  
  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    setIsImporting(true);
    
    try {
      // Parse the file
      const data = await parseImportFile(file);
      
      // Validate the data
      const validation = validateImportFile(data);
      
      if (!validation.valid) {
        toast({
          title: "Import Failed",
          description: validation.errors[0] || "Invalid template file format",
          variant: "destructive"
        });
        return;
      }
      
      // Get existing templates to check for conflicts
      const existingData = queryClient.getQueryData<QuoteTemplate[]>(["/api/quote-templates"]) || [];
      setExistingTemplates(existingData);
      setValidationResult(validation);
      setShowPreview(true);
      
    } catch (error: any) {
      toast({
        title: "Import Failed",
        description: error.message || "Failed to process import file",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };
  
  const handleImportConfirm = async (templates: QuoteTemplate[], resolutions: ImportResolution[]) => {
    setIsImporting(true);
    
    try {
      let imported = 0;
      let skipped = 0;
      let errors = 0;
      
      for (let i = 0; i < templates.length; i++) {
        const template = templates[i];
        const resolution = resolutions[i];
        
        if (resolution.action === 'skip') {
          skipped++;
          continue;
        }
        
        try {
          // Prepare template data for import
          const templateData: InsertQuoteTemplate = {
            name: resolution.newName || template.name,
            description: template.description || '',
            eventType: template.eventType,
            duration: template.duration,
            minGroupSize: template.minGroupSize,
            maxGroupSize: template.maxGroupSize,
            basePricePerPerson: template.basePricePerPerson,
            active: template.active,
            isDefault: false,
            displayOrder: template.displayOrder,
            components: template.components,
            defaultItems: template.defaultItems,
            defaultRadioSections: template.defaultRadioSections,
            visualTheme: template.visualTheme,
            automationRules: template.automationRules || [],
            orgId: 'org_demo'
          };
          
          if (resolution.action === 'overwrite') {
            const existing = existingTemplates.find(t => 
              t.name.toLowerCase() === template.name.toLowerCase()
            );
            if (existing) {
              await updateMutation.mutateAsync({ id: existing.id, data: templateData });
            } else {
              await createMutation.mutateAsync(templateData);
            }
          } else {
            await createMutation.mutateAsync(templateData);
          }
          
          imported++;
        } catch (error) {
          console.error(`Failed to import template ${template.name}:`, error);
          errors++;
        }
      }
      
      // Show results
      toast({
        title: "Import Complete",
        description: `Imported ${imported} templates successfully${skipped > 0 ? `, skipped ${skipped}` : ''}${errors > 0 ? `, ${errors} failed` : ''}`,
      });
      
      setShowPreview(false);
      onImportComplete?.();
      
    } catch (error: any) {
      toast({
        title: "Import Failed",
        description: error.message || "Failed to import templates",
        variant: "destructive"
      });
    } finally {
      setIsImporting(false);
    }
  };
  
  return (
    <>
      <Button
        variant="outline"
        onClick={() => fileInputRef.current?.click()}
        disabled={isImporting}
        data-testid="button-import"
      >
        <Upload className="h-4 w-4 mr-2" />
        {isImporting ? "Importing..." : "Import"}
      </Button>
      
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        className="hidden"
        onChange={handleFileSelect}
        data-testid="file-input-import"
      />
      
      {showPreview && validationResult && (
        <ImportPreview
          validationResult={validationResult}
          existingTemplates={existingTemplates}
          onConfirm={handleImportConfirm}
          onCancel={() => setShowPreview(false)}
        />
      )}
    </>
  );
}

// Import preview dialog
function ImportPreview({ validationResult, existingTemplates, onConfirm, onCancel }: ImportPreviewProps) {
  const [resolutions, setResolutions] = useState<ImportResolution[]>(() => {
    const { duplicates, conflicts } = checkForDuplicates(validationResult.templates, existingTemplates);
    
    return validationResult.templates.map((template, index) => {
      const isDuplicate = duplicates.includes(template.name);
      return {
        templateId: `temp-${index}`,
        action: isDuplicate ? 'rename' : 'import',
        newName: isDuplicate ? generateUniqueName(
          template.name, 
          new Set(existingTemplates.map(t => t.name.toLowerCase()))
        ) : undefined
      };
    });
  });
  
  const { duplicates } = checkForDuplicates(validationResult.templates, existingTemplates);
  
  const updateResolution = (index: number, updates: Partial<ImportResolution>) => {
    setResolutions(prev => prev.map((res, i) => 
      i === index ? { ...res, ...updates } : res
    ));
  };
  
  const confirmedTemplates = validationResult.templates.filter((_, i) => 
    resolutions[i]?.action !== 'skip'
  ).length;
  
  return (
    <Dialog open={true} onOpenChange={() => onCancel()}>
      <DialogContent className="max-w-4xl max-h-[80vh]">
        <DialogHeader>
          <DialogTitle>Import Templates Preview</DialogTitle>
          <DialogDescription>
            Review and configure the templates to be imported
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          {validationResult.errors.length > 0 && (
            <Card className="border-destructive">
              <CardHeader>
                <CardTitle className="text-destructive flex items-center gap-2">
                  <AlertCircle className="h-4 w-4" />
                  Import Warnings
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-1">
                  {validationResult.errors.map((error, index) => (
                    <li key={index} className="text-sm text-destructive">• {error}</li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}
          
          <Card>
            <CardHeader>
              <CardTitle>Templates to Import ({validationResult.templates.length})</CardTitle>
              <CardDescription>
                {confirmedTemplates} templates will be imported
                {duplicates.length > 0 && `, ${duplicates.length} name conflicts detected`}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-96">
                <div className="space-y-3">
                  {validationResult.templates.map((template, index) => {
                    const resolution = resolutions[index];
                    const isDuplicate = duplicates.includes(template.name);
                    
                    return (
                      <Card key={index} className="p-4">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h4 className="font-medium">{template.name}</h4>
                              <Badge variant="outline">{template.eventType}</Badge>
                              {isDuplicate && (
                                <Badge variant="destructive">Name Conflict</Badge>
                              )}
                            </div>
                            {template.description && (
                              <p className="text-sm text-muted-foreground mb-2">
                                {template.description}
                              </p>
                            )}
                            <div className="text-xs text-muted-foreground">
                              Duration: {template.duration}h • Components: {template.components?.length || 0}
                            </div>
                          </div>
                          
                          <div className="flex flex-col gap-2 ml-4">
                            <div className="flex items-center gap-2">
                              <Checkbox
                                checked={resolution.action !== 'skip'}
                                onCheckedChange={(checked) => {
                                  updateResolution(index, {
                                    action: checked ? 'import' : 'skip'
                                  });
                                }}
                                data-testid={`checkbox-import-${index}`}
                              />
                              <span className="text-sm">Import</span>
                            </div>
                            
                            {isDuplicate && resolution.action !== 'skip' && (
                              <div className="space-y-2">
                                <div className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`resolution-${index}`}
                                    checked={resolution.action === 'rename'}
                                    onChange={() => updateResolution(index, { 
                                      action: 'rename',
                                      newName: generateUniqueName(
                                        template.name,
                                        new Set(existingTemplates.map(t => t.name.toLowerCase()))
                                      )
                                    })}
                                  />
                                  <span className="text-sm">Rename</span>
                                </div>
                                <div className="flex items-center gap-2">
                                  <input
                                    type="radio"
                                    name={`resolution-${index}`}
                                    checked={resolution.action === 'overwrite'}
                                    onChange={() => updateResolution(index, { 
                                      action: 'overwrite',
                                      newName: undefined 
                                    })}
                                  />
                                  <span className="text-sm">Overwrite</span>
                                </div>
                                {resolution.action === 'rename' && (
                                  <input
                                    type="text"
                                    value={resolution.newName || ''}
                                    onChange={(e) => updateResolution(index, { 
                                      newName: e.target.value 
                                    })}
                                    className="text-xs p-1 border rounded w-full"
                                    placeholder="New name..."
                                  />
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    );
                  })}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
        
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={onCancel} data-testid="button-cancel-import">
            Cancel
          </Button>
          <Button 
            onClick={() => onConfirm(validationResult.templates, resolutions)}
            disabled={confirmedTemplates === 0}
            data-testid="button-confirm-import"
          >
            Import {confirmedTemplates} Templates
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}