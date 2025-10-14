import { GoogleGenAI } from "@google/genai";

// Gemini AI service for SEO optimization
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export interface SEOOptimizationResult {
  optimizedContent: string;
  suggestedImages: string[];
  internalLinks: Array<{ text: string; url: string; position: string }>;
  seoImprovements: string[];
  focusKeywords: string[];
}

export async function optimizeBlogPostForSEO(
  title: string,
  content: string,
  metaDescription: string
): Promise<SEOOptimizationResult> {
  const systemPrompt = `You are an expert SEO content optimizer specializing in boat rental and party cruise content for Lake Travis, Austin, Texas.

Your task is to analyze and optimize blog post content for SEO while:
1. Maintaining the existing HTML structure and schema markup
2. Improving content quality and readability
3. Naturally incorporating focus keywords from the title
4. Suggesting relevant internal linking opportunities
5. Ensuring content targets the right search intent

Available internal link destinations:
- /bachelor-party-austin (Bachelor party boat rentals)
- /bachelorette-party-austin (Bachelorette party cruises)
- /combined-bachelor-bachelorette-austin (Combined parties)
- / (Homepage - Premier Party Cruises)
- /private-cruises (Private boat rentals)

Return a JSON object with:
{
  "focusKeywords": ["keyword1", "keyword2", ...],
  "seoImprovements": ["improvement1", "improvement2", ...],
  "internalLinkSuggestions": [
    {"text": "anchor text", "url": "/page", "context": "sentence where it should appear"},
    ...
  ],
  "contentEnhancements": [
    {"section": "section name", "improvement": "what to improve"},
    ...
  ]
}`;

  const prompt = `Analyze and provide SEO optimization recommendations for this blog post:

TITLE: ${title}

META DESCRIPTION: ${metaDescription}

CONTENT (first 3000 chars):
${content.substring(0, 3000)}

Focus on:
1. Identifying 3-5 primary focus keywords from the title
2. Suggesting 3-5 specific SEO improvements
3. Recommending 4-6 natural internal linking opportunities with exact anchor text and context
4. Identifying content sections that need enhancement

Return ONLY valid JSON following the schema.`;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: "object",
          properties: {
            focusKeywords: {
              type: "array",
              items: { type: "string" }
            },
            seoImprovements: {
              type: "array",
              items: { type: "string" }
            },
            internalLinkSuggestions: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  text: { type: "string" },
                  url: { type: "string" },
                  context: { type: "string" }
                },
                required: ["text", "url", "context"]
              }
            },
            contentEnhancements: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  section: { type: "string" },
                  improvement: { type: "string" }
                },
                required: ["section", "improvement"]
              }
            }
          },
          required: ["focusKeywords", "seoImprovements", "internalLinkSuggestions"]
        }
      },
      contents: prompt
    });

    const rawJson = response.text;
    if (!rawJson) {
      throw new Error("Empty response from Gemini");
    }

    const analysis = JSON.parse(rawJson);
    
    return {
      optimizedContent: content,
      suggestedImages: [],
      internalLinks: analysis.internalLinkSuggestions || [],
      seoImprovements: analysis.seoImprovements || [],
      focusKeywords: analysis.focusKeywords || []
    };
  } catch (error) {
    console.error("Gemini SEO optimization error:", error);
    throw new Error(`Failed to optimize content: ${error}`);
  }
}

export function removeDuplicateH1Tags(content: string): string {
  // Remove duplicate H1 tags, keeping only the first one
  const h1Regex = /<h1[^>]*>.*?<\/h1>/gi;
  const h1Matches = content.match(h1Regex);
  
  if (!h1Matches || h1Matches.length <= 1) {
    return content;
  }

  // Keep the first H1, remove all others
  let processedContent = content;
  for (let i = 1; i < h1Matches.length; i++) {
    processedContent = processedContent.replace(h1Matches[i], '');
  }

  return processedContent;
}

export function centerHeaders(content: string): string {
  const addCenterClass = (match: string, tagName: string, attributes: string) => {
    // Check if there's already a class attribute
    const classMatch = attributes.match(/class=["']([^"']*)["']/i);
    
    if (classMatch) {
      // Merge text-center into existing classes
      const existingClasses = classMatch[1];
      if (!existingClasses.includes('text-center')) {
        const newClasses = `${existingClasses} text-center`.trim();
        const newAttributes = attributes.replace(
          /class=["'][^"']*["']/i,
          `class="${newClasses}"`
        );
        return `<${tagName}${newAttributes}>`;
      }
      return match; // Already has text-center
    } else {
      // Add new class attribute
      return `<${tagName}${attributes} class="text-center">`;
    }
  };

  return content
    .replace(/<(h1)([^>]*)>/gi, (match, tag, attrs) => addCenterClass(match, tag, attrs))
    .replace(/<(h2)([^>]*)>/gi, (match, tag, attrs) => addCenterClass(match, tag, attrs))
    .replace(/<(h3)([^>]*)>/gi, (match, tag, attrs) => addCenterClass(match, tag, attrs))
    .replace(/<(h4)([^>]*)>/gi, (match, tag, attrs) => addCenterClass(match, tag, attrs));
}

export function replaceUnsplashImages(content: string, imageMapping: Record<string, string>): string {
  let processedContent = content;
  
  // Replace Unsplash URLs with real images
  for (const [unsplashPattern, realImage] of Object.entries(imageMapping)) {
    const regex = new RegExp(`https://images\\.unsplash\\.com/[^"'\\s]+`, 'gi');
    processedContent = processedContent.replace(regex, (match) => {
      return realImage;
    });
  }
  
  return processedContent;
}

export function addInternalLinks(content: string, links: Array<{ text: string; url: string; position: string }>): string {
  let processedContent = content;
  
  for (const link of links) {
    // Find the context and add link if not already linked
    const contextRegex = new RegExp(link.text.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'i');
    
    // Only add link if the text isn't already a link
    if (!processedContent.includes(`>${link.text}<`)) {
      processedContent = processedContent.replace(
        contextRegex,
        `<a href="${link.url}">${link.text}</a>`
      );
    }
  }
  
  return processedContent;
}

// Image mapping based on blog topic
export function getImageForBlogPost(slug: string): string {
  const imageMap: Record<string, string> = {
    'must-haves-for-the-perfect-austin-bachelorette-weekend': '/attached_assets/bachelor-party-group-guys.webp',
    'lake-travis-party-boat-rentals-ultimate-guide-for-large-group-events-20-guests': '/attached_assets/clever-girl-50-person-boat.webp',
    'lake-travis-sunset-cruises-romantic-and-celebration-options-for-every-occasion': '/attached_assets/party-atmosphere-1.webp',
    'first-time-lake-travis-boat-rental-essential-tips-for-austin-party-planning': '/attached_assets/day-tripper-14-person-boat.webp',
    'lake-travis-boat-party-reviews-real-customer-experiences-and-testimonials': '/attached_assets/dancing-party-scene.webp',
    'lake-travis-wedding-boat-rentals-unique-venues-for-austin-celebrations': '/attached_assets/party-atmosphere-2.webp'
  };

  return imageMap[slug] || '/attached_assets/party-atmosphere-3.webp';
}
