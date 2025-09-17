import * as fs from "fs";
import { GoogleGenAI, Modality } from "@google/genai";

// DON'T DELETE THIS COMMENT - Gemini integration from blueprint:javascript_gemini
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function analyzePhotoForContent(imagePath: string) {
  try {
    const imageBytes = fs.readFileSync(imagePath);
    
    const analysisPrompt = `
      Analyze this Premier Party Cruises photo for content management:
      
      Return detailed JSON:
      {
        "objects": ["boats", "people", "decorations", "lake_travis", "etc"],
        "activities": ["dancing", "partying", "swimming", "dining", "celebrating"],
        "setting": ["indoor/outdoor", "day/night/sunset", "boat_type"],
        "mood": ["energetic", "elegant", "fun", "professional", "romantic"],
        "event_type": ["bachelorette", "bachelor", "family", "corporate", "wedding"],
        "quality_score": 8,
        "ugc_potential": 9,
        "caption_suggestions": ["3 engaging caption options"],
        "best_use_cases": ["home_hero", "gallery", "bachelorette_page"],
        "video_potential": 8,
        "editing_suggestions": ["brightness enhancement", "color saturation", "background blur"],
        "searchable_keywords": ["party", "boat", "lake", "celebration"]
      }
    `;

    const model = ai.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json"
      }
    });

    const response = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          inlineData: {
            data: imageBytes.toString("base64"),
            mimeType: "image/jpeg"
          }
        }, {
          text: analysisPrompt
        }]
      }]
    });

    const result = await response.response.text();
    return JSON.parse(result || "{}");
  } catch (error) {
    console.error('Photo analysis failed:', error);
    throw error;
  }
}

// Nano Banana Photo Editing
export async function editPhotoWithNanoBanana(
  imagePath: string, 
  editType: 'enhance' | 'style' | 'background' | 'color' | 'custom',
  editPrompt: string
) {
  try {
    const imageBytes = fs.readFileSync(imagePath);
    
    const editPrompts = {
      enhance: `Enhance this photo for Premier Party Cruises marketing: improve lighting, contrast, and sharpness. Make colors more vibrant and appealing. ${editPrompt}`,
      style: `Apply a professional party cruise style to this photo: warm, inviting colors with a premium feel. ${editPrompt}`,
      background: `Improve the background of this photo while keeping the main subjects. ${editPrompt}`,
      color: `Adjust the colors in this photo for better visual appeal and brand consistency. ${editPrompt}`,
      custom: editPrompt
    };

    const model = ai.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp" // Correct model for image editing
    });

    const response = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          inlineData: {
            data: imageBytes.toString("base64"),
            mimeType: "image/jpeg"
          }
        }, {
          text: editPrompts[editType]
        }]
      }]
    });

    const result = await response.response;
    
    // Check for image data in response
    const candidates = result.candidates;
    if (!candidates || candidates.length === 0) {
      throw new Error('No edited image generated');
    }

    const content = candidates[0].content;
    if (!content || !content.parts) {
      throw new Error('Invalid response format');
    }

    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return {
          imageData: part.inlineData.data, // base64 encoded
          mimeType: part.inlineData.mimeType || "image/jpeg"
        };
      }
    }

    throw new Error('No image data in response');
  } catch (error) {
    console.error('Photo editing failed:', error);
    throw error;
  }
}

// Generate new image with Nano Banana
export async function generateImageWithNanoBanana(prompt: string) {
  try {
    const model = ai.getGenerativeModel({ 
      model: "gemini-2.0-flash-exp" // Correct model for image generation
    });

    const response = await model.generateContent({
      contents: [{
        role: 'user',
        parts: [{
          text: prompt
        }]
      }]
    });

    const result = await response.response;
    const candidates = result.candidates;
    
    if (!candidates || candidates.length === 0) {
      throw new Error('No image generated');
    }

    const content = candidates[0].content;
    if (!content || !content.parts) {
      throw new Error('Invalid response format');
    }

    for (const part of content.parts) {
      if (part.inlineData && part.inlineData.data) {
        return {
          imageData: part.inlineData.data,
          mimeType: part.inlineData.mimeType || "image/jpeg"
        };
      }
    }

    throw new Error('No image data in response');
  } catch (error) {
    console.error('Image generation failed:', error);
    throw error;
  }
}

export async function findBestPhotosForSection(photos: any[], sectionType: string) {
  const prompt = `
    Given these photo analysis results, select the best 6 photos for the "${sectionType}" section:
    ${JSON.stringify(photos.map(p => ({ id: p.id, analysis: p.aiAnalysis })))}
    
    Return JSON array of photo IDs ranked by relevance: ["id1", "id2", "id3", "id4", "id5", "id6"]
  `;
  
  const model = ai.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    generationConfig: { 
      responseMimeType: "application/json" 
    }
  });
  
  const response = await model.generateContent({
    contents: [{
      role: 'user',
      parts: [{
        text: prompt
      }]
    }]
  });
  
  const result = await response.response.text();
  return JSON.parse(result || "[]");
}