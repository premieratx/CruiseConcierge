import { useState, useEffect } from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { AlertCircle, AlertTriangle, CheckCircle2, ChevronLeft, Loader2, FileText, Send, RefreshCw } from "lucide-react";

interface ParsedPost {
  index: number;
  title: string;
  rawContent: string;
  firstWords: string;
  wordCount: number;
}

interface VerifiedPost extends ParsedPost {
  issues: { severity: "error" | "warning"; text: string }[];
  formattedContent: string;
  metaDescription: string;
  slug: string;
  summary: string;
  errorCount: number;
  approved: boolean;
}

interface PublishResult {
  index: number;
  title: string;
  slug?: string;
  id?: number;
  success: boolean;
  error?: string;
}

type Step = "paste" | "review" | "verify" | "done";

const CLUSTER_OPTIONS = [
  { value: "atx-disco", label: "ATX Disco Cruise" },
  { value: "bachelor", label: "Bachelor Party" },
  { value: "bachelorette", label: "Bachelorette Party" },
  { value: "private", label: "Private Cruises" },
  { value: "general", label: "General / Lake Travis" },
];

export default function BlogBatchImporter() {
  const [step, setStep] = useState<Step>("paste");
  const [rawText, setRawText] = useState("");
  const [contentCluster, setContentCluster] = useState("atx-disco");
  const [parsedPosts, setParsedPosts] = useState<ParsedPost[]>([]);
  const [editedTitles, setEditedTitles] = useState<Record<number, string>>({});
  const [verifiedPosts, setVerifiedPosts] = useState<VerifiedPost[]>([]);
  const [publishResults, setPublishResults] = useState<PublishResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMsg, setLoadingMsg] = useState("");
  const [error, setError] = useState("");

  // Category / tag / author state
  const [categories, setCategories] = useState<any[]>([]);
  const [tags, setTags] = useState<any[]>([]);
  const [authors, setAuthors] = useState<any[]>([]);
  const [selectedCategoryIds, setSelectedCategoryIds] = useState<number[]>([]);
  const [selectedTagIds, setSelectedTagIds] = useState<number[]>([]);
  const [selectedAuthorId, setSelectedAuthorId] = useState<string>("");

  useEffect(() => {
    const fetchMeta = async () => {
      try {
        const [catRes, tagRes, authRes] = await Promise.all([
          fetch("/api/blog/categories"),
          fetch("/api/blog/tags"),
          fetch("/api/blog/admin/authors"),
        ]);
        if (catRes.ok) setCategories(await catRes.json());
        if (tagRes.ok) setTags(await tagRes.json());
        if (authRes.ok) {
          const authData = await authRes.json();
          setAuthors(Array.isArray(authData) ? authData : authData.authors || []);
        }
      } catch {}
    };
    fetchMeta();
  }, []);

  const toggleCategory = (id: number) => {
    setSelectedCategoryIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  const toggleTag = (id: number) => {
    setSelectedTagIds(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    );
  };

  // ─── Step 1: Parse ───────────────────────────────────────────────
  const handleParse = async () => {
    setError("");
    setLoading(true);
    setLoadingMsg("AI is reading your pasted text and splitting it into individual posts...");
    try {
      const res = await fetch("/api/blog/batch/parse", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rawText }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Parse failed");
      setParsedPosts(data.posts);
      const titles: Record<number, string> = {};
      data.posts.forEach((p: ParsedPost) => { titles[p.index] = p.title; });
      setEditedTitles(titles);
      setStep("review");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  // ─── Step 2 → 3: Verify ─────────────────────────────────────────
  const handleVerify = async () => {
    setError("");
    setLoading(true);
    setLoadingMsg(`Fact-checking ${parsedPosts.length} post${parsedPosts.length > 1 ? "s" : ""} against Premier Party Cruises pricing and policies...`);
    try {
      const postsWithEditedTitles = parsedPosts.map(p => ({
        ...p,
        title: editedTitles[p.index] ?? p.title,
      }));
      const res = await fetch("/api/blog/batch/verify", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ posts: postsWithEditedTitles, contentCluster }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Verify failed");
      setVerifiedPosts(data.results);
      setStep("verify");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const toggleApproved = (index: number) => {
    setVerifiedPosts(prev =>
      prev.map(p => p.index === index ? { ...p, approved: !p.approved } : p)
    );
  };

  const updateVerifiedField = (index: number, field: keyof VerifiedPost, value: any) => {
    setVerifiedPosts(prev =>
      prev.map(p => p.index === index ? { ...p, [field]: value } : p)
    );
  };

  // ─── Step 3 → 4: Publish ─────────────────────────────────────────
  const handlePublish = async () => {
    const toPublish = verifiedPosts.filter(p => p.approved);
    if (toPublish.length === 0) {
      setError("No posts are approved for publishing. Approve at least one post.");
      return;
    }
    setError("");
    setLoading(true);
    setLoadingMsg(`Publishing ${toPublish.length} post${toPublish.length > 1 ? "s" : ""}...`);
    try {
      const res = await fetch("/api/blog/batch/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          posts: toPublish,
          authorId: selectedAuthorId ? parseInt(selectedAuthorId) : null,
          categoryIds: selectedCategoryIds,
          tagIds: selectedTagIds,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Publish failed");
      setPublishResults(data.results);
      setStep("done");
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setStep("paste");
    setRawText("");
    setParsedPosts([]);
    setVerifiedPosts([]);
    setPublishResults([]);
    setEditedTitles({});
    setError("");
  };

  const approvedCount = verifiedPosts.filter(p => p.approved).length;
  const errorPostCount = verifiedPosts.filter(p => p.errorCount > 0).length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-8">

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          <Link href="/admin/blogs">
            <Button variant="ghost" size="sm">
              <ChevronLeft className="w-4 h-4 mr-1" /> Blog Management
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Batch Blog Importer</h1>
            <p className="text-sm text-gray-500">Paste multiple blogs at once — AI parses, fact-checks, and publishes them</p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center gap-2 mb-8">
          {(["paste", "review", "verify", "done"] as Step[]).map((s, i) => {
            const labels = ["1. Paste", "2. Review Split", "3. Verify & Publish", "4. Done"];
            const active = step === s;
            const past = ["paste", "review", "verify", "done"].indexOf(step) > i;
            return (
              <div key={s} className="flex items-center gap-2">
                <div className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                  active ? "bg-blue-900 text-white" : past ? "bg-green-100 text-green-800" : "bg-gray-200 text-gray-500"
                }`}>
                  {past && <CheckCircle2 className="w-3.5 h-3.5" />}
                  {labels[i]}
                </div>
                {i < 3 && <div className="w-6 h-px bg-gray-300" />}
              </div>
            );
          })}
        </div>

        {/* Error Banner */}
        {error && (
          <div className="flex items-start gap-2 p-4 mb-6 bg-red-50 border border-red-200 rounded-lg text-red-800 text-sm">
            <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>{error}</span>
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="flex flex-col items-center justify-center py-16 gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-blue-900" />
            <p className="text-gray-600 text-center max-w-sm">{loadingMsg}</p>
          </div>
        )}

        {/* ─── STEP 1: PASTE ─── */}
        {!loading && step === "paste" && (
          <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-1">Paste Your Blog Content</h2>
              <p className="text-sm text-gray-500">
                Paste one or multiple blog posts. Separate them clearly with a title on its own line.
                The AI will detect where each post starts and ends.
              </p>
            </div>

            <div>
              <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Content Cluster</Label>
              <Select value={contentCluster} onValueChange={setContentCluster}>
                <SelectTrigger className="w-64">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {CLUSTER_OPTIONS.map(o => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-gray-400 mt-1">
                This determines which service pages get internal links inserted into the posts.
              </p>
            </div>

            <Textarea
              value={rawText}
              onChange={e => setRawText(e.target.value)}
              placeholder={`Paste your blog post(s) here. Example format:\n\nTop 10 Things to Do on Lake Travis This Summer\n\nLake Travis is one of Austin's best kept secrets...\n\n---\n\nWhy the ATX Disco Cruise is the Best Bachelorette Party in Austin\n\nIf you're planning a bachelorette party in Austin...`}
              className="min-h-[360px] font-mono text-sm resize-y"
            />

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-gray-400">
                {rawText.split(/\s+/).filter(w => w.length > 0).length.toLocaleString()} words pasted
              </span>
              <Button
                onClick={handleParse}
                disabled={rawText.trim().length < 50}
                className="bg-blue-900 hover:bg-blue-800 text-white"
              >
                <FileText className="w-4 h-4 mr-2" />
                Parse Posts
              </Button>
            </div>
          </div>
        )}

        {/* ─── STEP 2: REVIEW SPLIT ─── */}
        {!loading && step === "review" && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 p-6">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">
                    Found {parsedPosts.length} Blog Post{parsedPosts.length !== 1 ? "s" : ""}
                  </h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    Confirm the titles and split points below. Edit any titles before proceeding.
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setStep("paste")}>
                  <RefreshCw className="w-3.5 h-3.5 mr-1.5" /> Re-paste
                </Button>
              </div>

              <div className="space-y-3">
                {parsedPosts.map((post, i) => (
                  <div key={post.index} className="border border-gray-100 rounded-lg p-4 bg-gray-50">
                    <div className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-900 text-white text-xs flex items-center justify-center font-medium mt-0.5">
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <Input
                          value={editedTitles[post.index] ?? post.title}
                          onChange={e => setEditedTitles(prev => ({ ...prev, [post.index]: e.target.value }))}
                          className="font-medium text-gray-900 mb-2"
                        />
                        <p className="text-xs text-gray-400">
                          <span className="font-medium text-gray-500">Starts with:</span> "{post.firstWords}..."
                        </p>
                        <p className="text-xs text-gray-400 mt-0.5">
                          {post.wordCount.toLocaleString()} words
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Metadata selection */}
            <div className="bg-white rounded-xl border border-gray-200 p-6 space-y-5">
              <h3 className="text-base font-semibold text-gray-900">Categories, Tags & Author</h3>
              <p className="text-sm text-gray-500 -mt-3">These will be applied to all posts in this batch.</p>

              {authors.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Author</Label>
                  <Select value={selectedAuthorId} onValueChange={setSelectedAuthorId}>
                    <SelectTrigger className="w-64">
                      <SelectValue placeholder="Select author..." />
                    </SelectTrigger>
                    <SelectContent>
                      {authors.map((a: any) => (
                        <SelectItem key={a.id} value={String(a.id)}>{a.name}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {categories.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Categories</Label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((cat: any) => (
                      <label key={cat.id} className="flex items-center gap-1.5 cursor-pointer">
                        <Checkbox
                          checked={selectedCategoryIds.includes(cat.id)}
                          onCheckedChange={() => toggleCategory(cat.id)}
                        />
                        <span className="text-sm text-gray-700">{cat.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {tags.length > 0 && (
                <div>
                  <Label className="text-sm font-medium text-gray-700 mb-2 block">Tags</Label>
                  <div className="flex flex-wrap gap-2">
                    {tags.map((tag: any) => (
                      <label key={tag.id} className="flex items-center gap-1.5 cursor-pointer">
                        <Checkbox
                          checked={selectedTagIds.includes(tag.id)}
                          onCheckedChange={() => toggleTag(tag.id)}
                        />
                        <span className="text-sm text-gray-700">{tag.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <Button
                onClick={handleVerify}
                className="bg-blue-900 hover:bg-blue-800 text-white"
              >
                <CheckCircle2 className="w-4 h-4 mr-2" />
                Fact-Check & Format All Posts
              </Button>
            </div>
          </div>
        )}

        {/* ─── STEP 3: VERIFY ─── */}
        {!loading && step === "verify" && (
          <div className="space-y-5">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Verification Results</h2>
                  <p className="text-sm text-gray-500 mt-0.5">
                    {approvedCount} of {verifiedPosts.length} posts approved ·{" "}
                    {errorPostCount > 0 ? (
                      <span className="text-red-600">{errorPostCount} with errors requiring review</span>
                    ) : (
                      <span className="text-green-600">All posts passed fact-check</span>
                    )}
                  </p>
                </div>
                <Button variant="outline" size="sm" onClick={() => setStep("review")}>
                  <ChevronLeft className="w-3.5 h-3.5 mr-1" /> Back
                </Button>
              </div>
            </div>

            <Accordion type="multiple" className="space-y-3">
              {verifiedPosts.map((post) => (
                <AccordionItem
                  key={post.index}
                  value={String(post.index)}
                  className="bg-white border border-gray-200 rounded-xl overflow-hidden"
                >
                  <AccordionTrigger className="px-5 py-4 hover:no-underline">
                    <div className="flex items-center gap-3 text-left w-full min-w-0">
                      {post.errorCount > 0 ? (
                        <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                      ) : (
                        <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                      )}
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{post.title}</p>
                        <p className="text-xs text-gray-400 mt-0.5">{post.summary}</p>
                      </div>
                      <div className="flex items-center gap-2 flex-shrink-0 mr-2">
                        {post.issues.filter(i => i.severity === "error").length > 0 && (
                          <Badge variant="destructive" className="text-xs">
                            {post.issues.filter(i => i.severity === "error").length} error{post.issues.filter(i => i.severity === "error").length > 1 ? "s" : ""}
                          </Badge>
                        )}
                        {post.issues.filter(i => i.severity === "warning").length > 0 && (
                          <Badge className="text-xs bg-yellow-100 text-yellow-800 hover:bg-yellow-100">
                            {post.issues.filter(i => i.severity === "warning").length} warning{post.issues.filter(i => i.severity === "warning").length > 1 ? "s" : ""}
                          </Badge>
                        )}
                        <div
                          onClick={e => { e.stopPropagation(); toggleApproved(post.index); }}
                          className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium cursor-pointer transition-colors ${
                            post.approved
                              ? "bg-green-100 text-green-800 hover:bg-green-200"
                              : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                          }`}
                        >
                          <Checkbox
                            checked={post.approved}
                            onCheckedChange={() => toggleApproved(post.index)}
                            className="w-3 h-3"
                            onClick={e => e.stopPropagation()}
                          />
                          {post.approved ? "Approved" : "Excluded"}
                        </div>
                      </div>
                    </div>
                  </AccordionTrigger>

                  <AccordionContent className="px-5 pb-5">
                    {/* Issues */}
                    {post.issues.length > 0 && (
                      <div className="mb-4 space-y-2">
                        <p className="text-sm font-medium text-gray-700">Issues Found:</p>
                        {post.issues.map((issue, j) => (
                          <div
                            key={j}
                            className={`flex items-start gap-2 p-3 rounded-lg text-sm ${
                              issue.severity === "error"
                                ? "bg-red-50 text-red-800 border border-red-100"
                                : "bg-yellow-50 text-yellow-800 border border-yellow-100"
                            }`}
                          >
                            {issue.severity === "error" ? (
                              <AlertCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            ) : (
                              <AlertTriangle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                            )}
                            {issue.text}
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Meta Description */}
                    <div className="mb-4">
                      <Label className="text-sm font-medium text-gray-700 mb-1.5 block">
                        Meta Description
                        <span className="font-normal text-gray-400 ml-2">
                          ({post.metaDescription.length} chars)
                        </span>
                      </Label>
                      <Input
                        value={post.metaDescription}
                        onChange={e => updateVerifiedField(post.index, "metaDescription", e.target.value)}
                        className="text-sm"
                      />
                    </div>

                    {/* Slug */}
                    <div className="mb-4">
                      <Label className="text-sm font-medium text-gray-700 mb-1.5 block">URL Slug</Label>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-400">/blogs/</span>
                        <Input
                          value={post.slug}
                          onChange={e => updateVerifiedField(post.index, "slug", e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, "-"))}
                          className="text-sm font-mono"
                        />
                      </div>
                    </div>

                    {/* Formatted content preview */}
                    <div>
                      <Label className="text-sm font-medium text-gray-700 mb-1.5 block">Formatted Content Preview</Label>
                      <div
                        className="border border-gray-200 rounded-lg p-4 prose prose-sm max-w-none max-h-64 overflow-y-auto bg-gray-50 text-sm"
                        dangerouslySetInnerHTML={{ __html: post.formattedContent }}
                      />
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>

            {approvedCount > 0 && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 flex items-center justify-between">
                <div>
                  <p className="font-medium text-blue-900">
                    Ready to publish {approvedCount} post{approvedCount !== 1 ? "s" : ""}
                  </p>
                  <p className="text-sm text-blue-700 mt-0.5">
                    {verifiedPosts.length - approvedCount > 0 &&
                      `${verifiedPosts.length - approvedCount} post${verifiedPosts.length - approvedCount > 1 ? "s" : ""} excluded · `}
                    Content cluster: {CLUSTER_OPTIONS.find(o => o.value === contentCluster)?.label}
                  </p>
                </div>
                <Button
                  onClick={handlePublish}
                  className="bg-blue-900 hover:bg-blue-800 text-white"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Publish {approvedCount} Post{approvedCount !== 1 ? "s" : ""}
                </Button>
              </div>
            )}
          </div>
        )}

        {/* ─── STEP 4: DONE ─── */}
        {!loading && step === "done" && (
          <div className="bg-white rounded-xl border border-gray-200 p-8 text-center space-y-6">
            <CheckCircle2 className="w-16 h-16 text-green-500 mx-auto" />
            <div>
              <h2 className="text-2xl font-bold text-gray-900">
                {publishResults.filter(r => r.success).length} Post{publishResults.filter(r => r.success).length !== 1 ? "s" : ""} Published
              </h2>
              <p className="text-gray-500 mt-1">
                {publishResults.filter(r => !r.success).length > 0 &&
                  `${publishResults.filter(r => !r.success).length} failed — see details below`}
              </p>
            </div>

            <div className="text-left space-y-2 max-w-lg mx-auto">
              {publishResults.map(result => (
                <div
                  key={result.index}
                  className={`flex items-center gap-3 p-3 rounded-lg text-sm ${
                    result.success ? "bg-green-50 text-green-800" : "bg-red-50 text-red-800"
                  }`}
                >
                  {result.success ? (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  )}
                  <div className="flex-1 min-w-0">
                    <span className="font-medium truncate block">{result.title}</span>
                    {result.success && result.slug && (
                      <a
                        href={`/blogs/${result.slug}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-green-600 hover:underline"
                      >
                        /blogs/{result.slug} ↗
                      </a>
                    )}
                    {!result.success && (
                      <span className="text-xs">{result.error}</span>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex justify-center gap-3 pt-2">
              <Button onClick={handleStartOver} variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" /> Import More Posts
              </Button>
              <Link href="/admin/blogs">
                <Button className="bg-blue-900 hover:bg-blue-800 text-white">
                  View All Posts
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
