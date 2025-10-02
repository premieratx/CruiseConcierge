import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export default function Templates() {
  return (
    <Layout>
      <div className="container mx-auto p-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Quote Templates
            </CardTitle>
            <CardDescription>
              Template management coming soon with new system
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Quote template functionality will be available after Lovable migration
            </p>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
}
