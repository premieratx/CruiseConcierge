import { useState } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Plus, Edit2, Trash2, Copy, Eye, EyeOff, FileText, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { apiRequest, queryClient } from "@/lib/queryClient";
import type { QuoteTemplate, InsertQuoteTemplate } from "@shared/schema";
import QuoteTemplateBuilder from "@/components/QuoteTemplateBuilder";
import { ExportButton, ExportTemplateButton, ImportButton } from "@/components/TemplateExportImport";


export default function Templates() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<QuoteTemplate | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedTemplates, setSelectedTemplates] = useState<Set<string>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const { toast } = useToast();

  const { data: templates = [], isLoading } = useQuery<QuoteTemplate[]>({
    queryKey: ["/api/quote-templates"],
  });




  const createMutation = useMutation({
    mutationFn: (data: InsertQuoteTemplate) => apiRequest("POST", "/api/quote-templates", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
      toast({ title: "Template created successfully" });
      setIsDialogOpen(false);
      setEditingTemplate(null);
    },
    onError: () => {
      toast({ title: "Failed to create template", variant: "destructive" });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<QuoteTemplate> }) =>
      apiRequest("PUT", `/api/quote-templates/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
      toast({ title: "Template updated successfully" });
      setIsDialogOpen(false);
      setEditingTemplate(null);
    },
    onError: () => {
      toast({ title: "Failed to update template", variant: "destructive" });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => apiRequest("DELETE", `/api/quote-templates/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
      toast({ title: "Template deleted successfully" });
    },
    onError: () => {
      toast({ title: "Failed to delete template", variant: "destructive" });
    },
  });

  const duplicateMutation = useMutation({
    mutationFn: (template: QuoteTemplate) => {
      const { id, createdAt, ...templateData } = template;
      return apiRequest("POST", "/api/quote-templates", {
        ...templateData,
        name: `${template.name} (Copy)`,
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
      toast({ title: "Template duplicated successfully" });
    },
    onError: () => {
      toast({ title: "Failed to duplicate template", variant: "destructive" });
    },
  });

  const toggleActiveMutation = useMutation({
    mutationFn: ({ id, active }: { id: string; active: boolean }) =>
      apiRequest("PUT", `/api/quote-templates/${id}`, { active }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/quote-templates"] });
      toast({ title: "Template status updated" });
    },
  });

  const handleTemplateSave = (templateData: Partial<QuoteTemplate>) => {
    const finalTemplateData = {
      ...templateData,
      visualTheme: templateData.visualTheme || {},
      displayOrder: templateData.displayOrder || templates.length,
    };

    if (editingTemplate) {
      updateMutation.mutate({ id: editingTemplate.id, data: finalTemplateData });
    } else {
      createMutation.mutate(finalTemplateData as InsertQuoteTemplate);
    }
  };

  const openEditDialog = (template: QuoteTemplate) => {
    setEditingTemplate(template);
    setIsDialogOpen(true);
  };

  const handleSelectTemplate = (templateId: string, checked: boolean) => {
    const newSelected = new Set(selectedTemplates);
    if (checked) {
      newSelected.add(templateId);
    } else {
      newSelected.delete(templateId);
      setSelectAll(false);
    }
    setSelectedTemplates(newSelected);
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedTemplates(new Set(filteredTemplates.map(t => t.id)));
      setSelectAll(true);
    } else {
      setSelectedTemplates(new Set());
      setSelectAll(false);
    }
  };

  const getSelectedTemplateObjects = () => {
    return filteredTemplates.filter(t => selectedTemplates.has(t.id));
  };


  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.eventType.toLowerCase().includes(searchTerm.toLowerCase())
  );


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
          <h1 className="text-3xl font-bold">Quote Templates</h1>
          <p className="text-muted-foreground mt-1">Manage reusable quote templates for different event types</p>
          {selectedTemplates.size > 0 && (
            <p className="text-sm text-primary mt-1">
              {selectedTemplates.size} template{selectedTemplates.size === 1 ? '' : 's'} selected
            </p>
          )}
        </div>
        <div className="flex gap-2">
          <ImportButton 
            onImportComplete={() => {
              setSelectedTemplates(new Set());
              setSelectAll(false);
            }}
          />
          <ExportButton 
            templates={filteredTemplates} 
            selectedTemplates={getSelectedTemplateObjects()}
          />
          <Dialog open={isDialogOpen} onOpenChange={(open) => {
            setIsDialogOpen(open);
            if (!open) {
              setEditingTemplate(null);
            }
          }}>
            <DialogTrigger asChild>
              <Button data-testid="button-new-template">
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] max-h-[95vh] w-full p-0">
              <QuoteTemplateBuilder
                template={editingTemplate}
                onSave={handleTemplateSave}
                onCancel={() => {
                  setIsDialogOpen(false);
                  setEditingTemplate(null);
                }}
              />
            </DialogContent>
          </Dialog>
        </div>
      </div>

      <div className="mb-6">
        <div className="flex items-center gap-4">
          <Input
            placeholder="Search templates..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="max-w-md"
            data-testid="input-search"
          />
          {filteredTemplates.length > 0 && (
            <div className="flex items-center gap-2">
              <Checkbox
                checked={selectAll}
                onCheckedChange={handleSelectAll}
                data-testid="checkbox-select-all"
              />
              <span className="text-sm text-muted-foreground">
                Select all {filteredTemplates.length} templates
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {filteredTemplates.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-muted-foreground">No templates found. Create your first template to get started.</p>
          </Card>
        ) : (
          filteredTemplates.map((template) => (
            <Card key={template.id} className="p-6" data-testid={`card-template-${template.id}`}>
              <div className="flex items-start justify-between">
                <div className="flex items-start gap-3">
                  <Checkbox
                    checked={selectedTemplates.has(template.id)}
                    onCheckedChange={(checked) => handleSelectTemplate(template.id, checked as boolean)}
                    data-testid={`checkbox-select-${template.id}`}
                    className="mt-1"
                  />
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-xl font-semibold">{template.name}</h3>
                    <Badge variant={template.active ? "default" : "secondary"}>
                      {template.active ? "Active" : "Inactive"}
                    </Badge>
                    <Badge variant="outline">{template.eventType}</Badge>
                  </div>
                  {template.description && (
                    <p className="text-muted-foreground mb-3">{template.description}</p>
                  )}
                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <span>Duration: {template.duration} hours</span>
                    {template.minGroupSize && <span>Min: {template.minGroupSize} people</span>}
                    {template.maxGroupSize && <span>Max: {template.maxGroupSize} people</span>}
                    {template.basePricePerPerson && (
                      <span>Base: ${(template.basePricePerPerson / 100).toFixed(2)}/person</span>
                    )}
                    {template.defaultItems.length > 0 && (
                      <span>{template.defaultItems.length} default items</span>
                    )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <ExportTemplateButton template={template} />
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => toggleActiveMutation.mutate({ 
                      id: template.id, 
                      active: !template.active 
                    })}
                    data-testid={`button-toggle-${template.id}`}
                  >
                    {template.active ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => duplicateMutation.mutate(template)}
                    data-testid={`button-duplicate-${template.id}`}
                  >
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditDialog(template)}
                    data-testid={`button-edit-${template.id}`}
                  >
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      if (confirm("Are you sure you want to delete this template?")) {
                        deleteMutation.mutate(template.id);
                      }
                    }}
                    data-testid={`button-delete-${template.id}`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
    </Layout>
  );
}