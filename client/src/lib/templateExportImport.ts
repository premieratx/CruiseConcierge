import type { QuoteTemplate } from "@shared/schema";

// Export file format interface
export interface ExportedTemplate {
  version: string;
  timestamp: string;
  source: string;
  templates: Array<{
    id: string;
    name: string;
    description?: string;
    eventType: string;
    duration: number;
    minGroupSize?: number;
    maxGroupSize?: number;
    basePricePerPerson?: number;
    active: boolean;
    components: any[];
    defaultItems: any[];
    defaultRadioSections: any[];
    visualTheme?: any;
    displayOrder: number;
    metadata?: any;
  }>;
}

// Export validation interface
export interface ImportValidationResult {
  valid: boolean;
  errors: string[];
  templates: QuoteTemplate[];
}

/**
 * Export a single template to a downloadable JSON file
 */
export const exportTemplate = (template: QuoteTemplate): void => {
  const exportData: ExportedTemplate = {
    version: "1.0",
    timestamp: new Date().toISOString(),
    source: "Premier Party Cruises CRM",
    templates: [sanitizeTemplateForExport(template)]
  };
  
  downloadJsonFile(
    exportData,
    `template-${template.name.replace(/[^a-zA-Z0-9]/g, '-')}.json`
  );
};

/**
 * Export multiple templates to a downloadable JSON file
 */
export const exportTemplates = (templates: QuoteTemplate[]): void => {
  const exportData: ExportedTemplate = {
    version: "1.0",
    timestamp: new Date().toISOString(),
    source: "Premier Party Cruises CRM",
    templates: templates.map(sanitizeTemplateForExport)
  };
  
  const dateStr = new Date().toISOString().split('T')[0];
  downloadJsonFile(
    exportData,
    `templates-export-${dateStr}.json`
  );
};

/**
 * Export all active templates
 */
export const exportActiveTemplates = (templates: QuoteTemplate[]): void => {
  const activeTemplates = templates.filter(t => t.active);
  exportTemplates(activeTemplates);
};

/**
 * Sanitize template data for export (remove system-specific fields)
 */
const sanitizeTemplateForExport = (template: QuoteTemplate): any => {
  const {
    createdAt,
    orgId,
    ...exportableTemplate
  } = template;
  
  return {
    ...exportableTemplate,
    // Ensure backward compatibility with legacy formats
    defaultItems: template.defaultItems || [],
    defaultRadioSections: template.defaultRadioSections || [],
    components: template.components || [],
    visualTheme: template.visualTheme || {},
    metadata: {
      exportedAt: new Date().toISOString(),
      originalId: template.id
    }
  };
};

/**
 * Create and trigger download of JSON file
 */
const downloadJsonFile = (data: any, filename: string): void => {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: 'application/json'
  });
  
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.style.display = 'none';
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
};

/**
 * Validate imported template file
 */
export const validateImportFile = (data: any): ImportValidationResult => {
  const errors: string[] = [];
  const templates: QuoteTemplate[] = [];
  
  // Check basic structure
  if (!data || typeof data !== 'object') {
    errors.push("Invalid file format: Not a valid JSON object");
    return { valid: false, errors, templates };
  }
  
  if (!data.version) {
    errors.push("Missing export version information");
  }
  
  if (!data.templates || !Array.isArray(data.templates)) {
    errors.push("Invalid file format: Templates array not found");
    return { valid: false, errors, templates };
  }
  
  if (data.templates.length === 0) {
    errors.push("No templates found in import file");
    return { valid: false, errors, templates };
  }
  
  // Validate each template
  data.templates.forEach((template: any, index: number) => {
    const templateErrors = validateTemplateStructure(template, index);
    errors.push(...templateErrors);
    
    if (templateErrors.length === 0) {
      // Convert to proper template format
      const sanitizedTemplate = sanitizeTemplateForImport(template);
      templates.push(sanitizedTemplate);
    }
  });
  
  return {
    valid: errors.length === 0,
    errors,
    templates
  };
};

/**
 * Validate individual template structure
 */
const validateTemplateStructure = (template: any, index: number): string[] => {
  const errors: string[] = [];
  const prefix = `Template ${index + 1}:`;
  
  if (!template.name || typeof template.name !== 'string' || template.name.trim().length === 0) {
    errors.push(`${prefix} Missing or invalid name`);
  }
  
  if (!template.eventType || typeof template.eventType !== 'string') {
    errors.push(`${prefix} Missing or invalid event type`);
  }
  
  if (!template.duration || typeof template.duration !== 'number' || template.duration < 1) {
    errors.push(`${prefix} Missing or invalid duration`);
  }
  
  if (template.minGroupSize !== undefined && 
      (typeof template.minGroupSize !== 'number' || template.minGroupSize < 1)) {
    errors.push(`${prefix} Invalid minimum group size`);
  }
  
  if (template.maxGroupSize !== undefined && 
      (typeof template.maxGroupSize !== 'number' || template.maxGroupSize < 1)) {
    errors.push(`${prefix} Invalid maximum group size`);
  }
  
  if (template.minGroupSize && template.maxGroupSize && 
      template.minGroupSize > template.maxGroupSize) {
    errors.push(`${prefix} Minimum group size cannot be greater than maximum group size`);
  }
  
  if (template.components && !Array.isArray(template.components)) {
    errors.push(`${prefix} Invalid components structure`);
  }
  
  return errors;
};

/**
 * Sanitize imported template for storage
 */
const sanitizeTemplateForImport = (template: any): QuoteTemplate => {
  return {
    id: '', // Will be generated by the system
    orgId: 'org_demo', // Will be set by the system
    name: template.name.trim(),
    description: template.description || '',
    eventType: template.eventType,
    duration: template.duration,
    minGroupSize: template.minGroupSize || null,
    maxGroupSize: template.maxGroupSize || null,
    basePricePerPerson: template.basePricePerPerson || null,
    active: template.active !== undefined ? template.active : true,
    isDefault: false, // Never import as default
    displayOrder: template.displayOrder || 0,
    components: template.components || [],
    defaultItems: template.defaultItems || [],
    defaultRadioSections: template.defaultRadioSections || [],
    visualTheme: template.visualTheme || {},
    automationRules: template.automationRules || [],
    createdAt: new Date(), // Will be set by the system
  };
};

/**
 * Read and parse uploaded file
 */
export const parseImportFile = async (file: File): Promise<any> => {
  if (!file.name.toLowerCase().endsWith('.json')) {
    throw new Error("Invalid file type. Please select a JSON file.");
  }
  
  if (file.size > 10 * 1024 * 1024) { // 10MB limit
    throw new Error("File size too large. Maximum size is 10MB.");
  }
  
  try {
    const text = await file.text();
    return JSON.parse(text);
  } catch (error) {
    throw new Error("Invalid JSON file. Please check the file format.");
  }
};

/**
 * Check for duplicate template names
 */
export const checkForDuplicates = (
  importTemplates: QuoteTemplate[], 
  existingTemplates: QuoteTemplate[]
): { duplicates: string[]; conflicts: Array<{ imported: QuoteTemplate; existing: QuoteTemplate }> } => {
  const duplicates: string[] = [];
  const conflicts: Array<{ imported: QuoteTemplate; existing: QuoteTemplate }> = [];
  
  const existingNames = new Set(existingTemplates.map(t => t.name.toLowerCase()));
  
  importTemplates.forEach(importTemplate => {
    const nameKey = importTemplate.name.toLowerCase();
    if (existingNames.has(nameKey)) {
      duplicates.push(importTemplate.name);
      const existing = existingTemplates.find(t => t.name.toLowerCase() === nameKey);
      if (existing) {
        conflicts.push({ imported: importTemplate, existing });
      }
    }
  });
  
  return { duplicates, conflicts };
};

/**
 * Generate unique name for duplicate template
 */
export const generateUniqueName = (baseName: string, existingNames: Set<string>): string => {
  let counter = 1;
  let newName = `${baseName} (Copy)`;
  
  while (existingNames.has(newName.toLowerCase())) {
    counter++;
    newName = `${baseName} (Copy ${counter})`;
  }
  
  return newName;
};