import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, FileText, Edit2, Trash2, Copy } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface DocumentTemplate {
  id: string;
  name: string;
  type: string;
  content: string;
  createdAt: Date;
}

const templateTypes = [
  { value: "visit-report", label: "Visit Report" },
  { value: "rental-agreement", label: "Rental Agreement" },
  { value: "property-listing", label: "Property Listing" },
  { value: "email", label: "Email Template" },
  { value: "contract", label: "Contract" },
  { value: "invoice", label: "Invoice" },
  { value: "other", label: "Other" },
];

export const DocumentTemplates = () => {
  const [templates, setTemplates] = useState<DocumentTemplate[]>([
    {
      id: "1",
      name: "Standard Visit Report",
      type: "visit-report",
      content: "Property: {{property_address}}\nDate: {{visit_date}}\nClient: {{client_name}}\n\nObservations:\n{{observations}}\n\nRecommendations:\n{{recommendations}}",
      createdAt: new Date(),
    },
    {
      id: "2",
      name: "Property Listing Template",
      type: "property-listing",
      content: "{{property_type}} - {{bedrooms}} bedrooms\nLocation: {{location}}\nPrice: {{price}}\n\nDescription:\n{{description}}\n\nFeatures:\n{{features}}",
      createdAt: new Date(),
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingTemplate, setEditingTemplate] = useState<DocumentTemplate | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    type: "",
    content: "",
  });

  const handleSave = () => {
    if (!formData.name || !formData.type || !formData.content) {
      toast({
        title: "Error",
        description: "Please fill in all fields",
        variant: "destructive",
      });
      return;
    }

    if (editingTemplate) {
      setTemplates(templates.map(t => 
        t.id === editingTemplate.id 
          ? { ...t, ...formData }
          : t
      ));
      toast({ title: "Template updated successfully" });
    } else {
      const newTemplate: DocumentTemplate = {
        id: Date.now().toString(),
        ...formData,
        createdAt: new Date(),
      };
      setTemplates([...templates, newTemplate]);
      toast({ title: "Template created successfully" });
    }

    setIsDialogOpen(false);
    setEditingTemplate(null);
    setFormData({ name: "", type: "", content: "" });
  };

  const handleEdit = (template: DocumentTemplate) => {
    setEditingTemplate(template);
    setFormData({
      name: template.name,
      type: template.type,
      content: template.content,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setTemplates(templates.filter(t => t.id !== id));
    toast({ title: "Template deleted" });
  };

  const handleDuplicate = (template: DocumentTemplate) => {
    const duplicate: DocumentTemplate = {
      ...template,
      id: Date.now().toString(),
      name: `${template.name} (Copy)`,
      createdAt: new Date(),
    };
    setTemplates([...templates, duplicate]);
    toast({ title: "Template duplicated" });
  };

  const openNewDialog = () => {
    setEditingTemplate(null);
    setFormData({ name: "", type: "", content: "" });
    setIsDialogOpen(true);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Document Templates</CardTitle>
            <CardDescription>
              Create and manage reusable document templates with placeholders
            </CardDescription>
          </div>
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button onClick={openNewDialog}>
                <Plus className="h-4 w-4 mr-2" />
                New Template
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>
                  {editingTemplate ? "Edit Template" : "Create New Template"}
                </DialogTitle>
                <DialogDescription>
                  Use {"{{placeholder}}"} syntax for dynamic content
                </DialogDescription>
              </DialogHeader>
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Template Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g., Standard Visit Report"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="type">Template Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {templateTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="content">Template Content</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Enter your template content with {{placeholders}}"
                    className="min-h-[200px] font-mono text-sm"
                  />
                </div>
              </div>
              <DialogFooter>
                <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>
                  {editingTemplate ? "Update" : "Create"} Template
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2">
          {templates.map((template) => (
            <Card key={template.id} className="bg-muted/30">
              <CardContent className="pt-4">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold text-foreground">{template.name}</h3>
                  </div>
                  <Badge variant="secondary">
                    {templateTypes.find(t => t.value === template.type)?.label || template.type}
                  </Badge>
                </div>
                <p className="text-sm text-muted-foreground line-clamp-3 font-mono mb-4">
                  {template.content}
                </p>
                <div className="flex gap-2">
                  <Button variant="ghost" size="sm" onClick={() => handleEdit(template)}>
                    <Edit2 className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDuplicate(template)}>
                    <Copy className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="sm" onClick={() => handleDelete(template.id)}>
                    <Trash2 className="h-4 w-4 text-destructive" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
