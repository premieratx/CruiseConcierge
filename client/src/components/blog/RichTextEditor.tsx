import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { 
  Bold, 
  Italic, 
  Underline, 
  Link, 
  List, 
  ListOrdered, 
  Quote, 
  Code, 
  Image,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo,
  Redo,
  Type,
  Palette
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  minHeight?: string;
}

export function RichTextEditor({
  value,
  onChange,
  placeholder = "Start writing...",
  className = "",
  minHeight = "300px"
}: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isLinkDialogOpen, setIsLinkDialogOpen] = useState(false);
  const [linkUrl, setLinkUrl] = useState("");
  const [linkText, setLinkText] = useState("");

  // Initialize editor content
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  // Handle content changes
  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  // Execute formatting commands
  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    handleInput();
  };

  // Insert HTML at cursor
  const insertHTML = (html: string) => {
    const selection = window.getSelection();
    if (selection && selection.rangeCount > 0) {
      const range = selection.getRangeAt(0);
      range.deleteContents();
      const div = document.createElement('div');
      div.innerHTML = html;
      const fragment = document.createDocumentFragment();
      while (div.firstChild) {
        fragment.appendChild(div.firstChild);
      }
      range.insertNode(fragment);
    }
    handleInput();
  };

  // Handle link insertion
  const handleInsertLink = () => {
    if (linkUrl && linkText) {
      insertHTML(`<a href="${linkUrl}" target="_blank" rel="noopener noreferrer">${linkText}</a>`);
      setLinkUrl("");
      setLinkText("");
      setIsLinkDialogOpen(false);
    }
  };

  // Handle image insertion
  const handleInsertImage = () => {
    const url = prompt("Enter image URL:");
    if (url) {
      insertHTML(`<img src="${url}" alt="Image" style="max-width: 100%; height: auto;" />`);
    }
  };

  // Toolbar button component
  const ToolbarButton = ({ 
    onClick, 
    icon: Icon, 
    title, 
    isActive = false 
  }: { 
    onClick: () => void; 
    icon: any; 
    title: string; 
    isActive?: boolean;
  }) => (
    <Button
      variant={isActive ? "default" : "ghost"}
      size="sm"
      onClick={onClick}
      title={title}
      type="button"
      className="h-8 w-8 p-0"
      data-testid={`button-${title.toLowerCase().replace(/\s+/g, '-')}`}
    >
      <Icon className="h-4 w-4" />
    </Button>
  );

  return (
    <Card className={className}>
      <CardContent className="p-0">
        {/* Toolbar */}
        <div className="border-b p-2">
          <div className="flex flex-wrap items-center gap-1">
            {/* Text formatting */}
            <ToolbarButton
              onClick={() => execCommand('bold')}
              icon={Bold}
              title="Bold"
            />
            <ToolbarButton
              onClick={() => execCommand('italic')}
              icon={Italic}
              title="Italic"
            />
            <ToolbarButton
              onClick={() => execCommand('underline')}
              icon={Underline}
              title="Underline"
            />

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Headings */}
            <select 
              onChange={(e) => execCommand('formatBlock', e.target.value)}
              className="text-sm border rounded px-2 py-1"
              data-testid="select-heading"
            >
              <option value="">Normal</option>
              <option value="h1">Heading 1</option>
              <option value="h2">Heading 2</option>
              <option value="h3">Heading 3</option>
              <option value="h4">Heading 4</option>
              <option value="h5">Heading 5</option>
              <option value="h6">Heading 6</option>
            </select>

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Alignment */}
            <ToolbarButton
              onClick={() => execCommand('justifyLeft')}
              icon={AlignLeft}
              title="Align Left"
            />
            <ToolbarButton
              onClick={() => execCommand('justifyCenter')}
              icon={AlignCenter}
              title="Align Center"
            />
            <ToolbarButton
              onClick={() => execCommand('justifyRight')}
              icon={AlignRight}
              title="Align Right"
            />

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Lists */}
            <ToolbarButton
              onClick={() => execCommand('insertUnorderedList')}
              icon={List}
              title="Bullet List"
            />
            <ToolbarButton
              onClick={() => execCommand('insertOrderedList')}
              icon={ListOrdered}
              title="Numbered List"
            />

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Special elements */}
            <ToolbarButton
              onClick={() => execCommand('formatBlock', 'blockquote')}
              icon={Quote}
              title="Quote"
            />
            <ToolbarButton
              onClick={() => execCommand('formatBlock', 'pre')}
              icon={Code}
              title="Code Block"
            />

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Media and links */}
            <Popover open={isLinkDialogOpen} onOpenChange={setIsLinkDialogOpen}>
              <PopoverTrigger asChild>
                <Button
                  variant="ghost"
                  size="sm"
                  type="button"
                  className="h-8 w-8 p-0"
                  title="Insert Link"
                  data-testid="button-insert-link"
                >
                  <Link className="h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="space-y-3">
                  <div>
                    <Label htmlFor="linkText">Link Text</Label>
                    <Input
                      id="linkText"
                      value={linkText}
                      onChange={(e) => setLinkText(e.target.value)}
                      placeholder="Enter link text"
                      data-testid="input-link-text"
                    />
                  </div>
                  <div>
                    <Label htmlFor="linkUrl">URL</Label>
                    <Input
                      id="linkUrl"
                      value={linkUrl}
                      onChange={(e) => setLinkUrl(e.target.value)}
                      placeholder="https://example.com"
                      data-testid="input-link-url"
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setIsLinkDialogOpen(false)}
                      type="button"
                    >
                      Cancel
                    </Button>
                    <Button
                      size="sm"
                      onClick={handleInsertLink}
                      type="button"
                      data-testid="button-confirm-link"
                    >
                      Insert Link
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <ToolbarButton
              onClick={handleInsertImage}
              icon={Image}
              title="Insert Image"
            />

            <Separator orientation="vertical" className="h-6 mx-1" />

            {/* Undo/Redo */}
            <ToolbarButton
              onClick={() => execCommand('undo')}
              icon={Undo}
              title="Undo"
            />
            <ToolbarButton
              onClick={() => execCommand('redo')}
              icon={Redo}
              title="Redo"
            />
          </div>
        </div>

        {/* Editor */}
        <div
          ref={editorRef}
          contentEditable
          onInput={handleInput}
          className="p-4 outline-none prose prose-sm max-w-none"
          style={{ minHeight }}
          data-placeholder={placeholder}
          data-testid="editor-content"
          suppressContentEditableWarning={true}
        />

        {/* Style for placeholder */}
        <style jsx>{`
          [contenteditable][data-placeholder]:empty:before {
            content: attr(data-placeholder);
            color: #9ca3af;
            font-style: italic;
          }
          [contenteditable] {
            word-wrap: break-word;
          }
          [contenteditable] img {
            max-width: 100%;
            height: auto;
            display: block;
            margin: 1rem 0;
          }
          [contenteditable] blockquote {
            border-left: 4px solid #e5e7eb;
            padding-left: 1rem;
            margin: 1rem 0;
            font-style: italic;
            color: #6b7280;
          }
          [contenteditable] pre {
            background-color: #f3f4f6;
            padding: 1rem;
            border-radius: 0.375rem;
            overflow-x: auto;
            font-family: 'Courier New', monospace;
            margin: 1rem 0;
          }
          [contenteditable] h1, [contenteditable] h2, [contenteditable] h3,
          [contenteditable] h4, [contenteditable] h5, [contenteditable] h6 {
            margin: 1.5rem 0 0.5rem 0;
            font-weight: bold;
          }
          [contenteditable] h1 { font-size: 2rem; }
          [contenteditable] h2 { font-size: 1.75rem; }
          [contenteditable] h3 { font-size: 1.5rem; }
          [contenteditable] h4 { font-size: 1.25rem; }
          [contenteditable] h5 { font-size: 1.125rem; }
          [contenteditable] h6 { font-size: 1rem; }
          [contenteditable] p {
            margin: 0.75rem 0;
            line-height: 1.6;
          }
          [contenteditable] ul, [contenteditable] ol {
            margin: 1rem 0;
            padding-left: 2rem;
          }
          [contenteditable] li {
            margin: 0.25rem 0;
          }
          [contenteditable] a {
            color: #3b82f6;
            text-decoration: underline;
          }
          [contenteditable] a:hover {
            color: #2563eb;
          }
        `}</style>
      </CardContent>
    </Card>
  );
}