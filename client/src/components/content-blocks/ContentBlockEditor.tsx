import { SelectContentBlock } from "@shared/schema";
import { TextBlockEditor } from "./TextBlockEditor";
import { ImageBlockEditor } from "./ImageBlockEditor";
import { VideoBlockEditor } from "./VideoBlockEditor";
import { CTABlockEditor } from "./CTABlockEditor";
import { SectionBlockEditor } from "./SectionBlockEditor";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

interface ContentBlockEditorProps {
  block: SelectContentBlock;
  onSave: () => void;
  onCancel: () => void;
}

export function ContentBlockEditor({ block, onSave, onCancel }: ContentBlockEditorProps) {
  switch (block.type) {
    case 'text':
      return <TextBlockEditor block={block} onSave={onSave} onCancel={onCancel} />;
    case 'image':
      return <ImageBlockEditor block={block} onSave={onSave} onCancel={onCancel} />;
    case 'video':
      return <VideoBlockEditor block={block} onSave={onSave} onCancel={onCancel} />;
    case 'cta':
      return <CTABlockEditor block={block} onSave={onSave} onCancel={onCancel} />;
    case 'section':
      return <SectionBlockEditor block={block} onSave={onSave} onCancel={onCancel} />;
    default:
      return (
        <Card className="p-4">
          <div className="text-center text-muted-foreground mb-4">
            No editor available for block type: {block.type}
          </div>
          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </Card>
      );
  }
}