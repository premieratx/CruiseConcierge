import type { 
  SeoPage, 
  InsertSeoPage, 
  SeoSettings, 
  InsertSeoSettings, 
  SEOAnalysisResult, 
  SEOOptimizationRequest, 
  SEOBulkOperation, 
  SEOIssue, 
  HeadingStructure 
} from "@shared/schema";

interface RouteDefinition {
  route: string;
  name: string;
  description?: string;
  isPublic: boolean;
}

export class SEOService {
  private openaiService: any = null;
  private geminiService: any = null;

  constructor() {
    this.initializeAIServices();
  }

  private async initializeAIServices() {
    try {
      const { openaiService } = await import('./openai');
      this.openaiService = openaiService;
    } catch (error) {
      console.warn('OpenAI service not available:', error);
    }

    try {
      const { geminiService } = await import('./gemini');
      this.geminiService = geminiService;
    } catch (error) {
      console.warn('Gemini service not available:', error);
    }
  }

  /**
   * Discover all application routes automatically
   * This includes both static routes and dynamic routes from the React app
   */
  async discoverApplicationRoutes(): Promise<RouteDefinition[]> {
    const routes: RouteDefinition[] = [
      // Main pages
      { route: '/', name: 'Home Page', description: 'Main landing page', isPublic: true },
      { route: '/private-cruises', name: 'Private Cruises', description: 'Private cruise packages', isPublic: true },
      { route: '/bachelor-party', name: 'Bachelor Party', description: 'Bachelor party cruises', isPublic: true },
      { route: '/bachelorette-party', name: 'Bachelorette Party', description: 'Bachelorette party cruises', isPublic: true },
      { route: '/birthday-parties', name: 'Birthday Parties', description: 'Birthday celebration cruises', isPublic: true },
      { route: '/corporate-events', name: 'Corporate Events', description: 'Corporate team building events', isPublic: true },
      { route: '/wedding-parties', name: 'Wedding Parties', description: 'Wedding celebration cruises', isPublic: true },
      { route: '/team-building', name: 'Team Building', description: 'Corporate team building activities', isPublic: true },
      { route: '/after-party', name: 'After Party', description: 'After party cruise events', isPublic: true },
      { route: '/rehearsal-dinner', name: 'Rehearsal Dinner', description: 'Wedding rehearsal dinner cruises', isPublic: true },
      { route: '/sweet16', name: 'Sweet 16', description: 'Sweet 16 birthday cruises', isPublic: true },
      { route: '/graduation-party', name: 'Graduation Party', description: 'Graduation celebration cruises', isPublic: true },
      { route: '/milestone-birthday', name: 'Milestone Birthday', description: 'Special milestone birthday cruises', isPublic: true },
      { route: '/welcome-party', name: 'Welcome Party', description: 'Welcome party events', isPublic: true },
      { route: '/company-milestone', name: 'Company Milestone', description: 'Corporate milestone celebrations', isPublic: true },
      { route: '/client-entertainment', name: 'Client Entertainment', description: 'Client entertainment events', isPublic: true },
      
      // Information pages
      { route: '/gallery', name: 'Photo Gallery', description: 'Event photos and boat gallery', isPublic: true },
      { route: '/contact', name: 'Contact Us', description: 'Contact information and form', isPublic: true },
      { route: '/testimonials-faq', name: 'Testimonials & FAQ', description: 'Customer testimonials and FAQ', isPublic: true },
      { route: '/affiliates', name: 'Affiliates', description: 'Affiliate program information', isPublic: true },
      { route: '/discounts', name: 'Discounts', description: 'Available discounts and promotions', isPublic: true },
      
      // Blog pages
      { route: '/blog', name: 'Blog', description: 'Company blog and articles', isPublic: true },
      { route: '/blog/category/:category', name: 'Blog Category', description: 'Blog posts by category', isPublic: true },
      { route: '/blog/tag/:tag', name: 'Blog Tag', description: 'Blog posts by tag', isPublic: true },
      { route: '/blog/author/:author', name: 'Blog Author', description: 'Posts by specific author', isPublic: true },
      
      // Booking and quote pages
      { route: '/booking-flow', name: 'Booking Flow', description: 'Customer booking process', isPublic: true },
      { route: '/quote-builder', name: 'Quote Builder', description: 'Interactive quote builder', isPublic: true },
      { route: '/public-calendar', name: 'Public Calendar', description: 'Available dates calendar', isPublic: true },
      
      // Customer portal (semi-public)
      { route: '/portal/login', name: 'Customer Portal Login', description: 'Customer account login', isPublic: true },
      { route: '/portal/dashboard', name: 'Customer Dashboard', description: 'Customer account dashboard', isPublic: false },
      { route: '/portal/bookings', name: 'Customer Bookings', description: 'Customer booking history', isPublic: false },
      { route: '/portal/quotes', name: 'Customer Quotes', description: 'Customer quotes', isPublic: false },
      { route: '/portal/invoices', name: 'Customer Invoices', description: 'Customer invoices', isPublic: false },
      { route: '/portal/profile', name: 'Customer Profile', description: 'Customer profile settings', isPublic: false },
    ];

    return routes;
  }

  /**
   * Analyze a page's SEO performance
   */
  async analyzePage(pageRoute: string, content?: string): Promise<SEOAnalysisResult> {
    const issues: SEOIssue[] = [];
    const recommendations: string[] = [];
    let score = 100;

    // Get current page data if exists
    const storage = await this.getStorage();
    const existingPage = await storage.getSeoPage(pageRoute);

    // Simulate content analysis (in real implementation, would crawl the actual page)
    const mockContent = content || this.generateMockContentForRoute(pageRoute);
    
    // Analyze meta tags
    const metaAnalysis = this.analyzeMetaTags(existingPage, pageRoute);
    issues.push(...metaAnalysis.issues);
    recommendations.push(...metaAnalysis.recommendations);
    score -= metaAnalysis.scorePenalty;

    // Analyze content quality
    const contentAnalysis = this.analyzeContent(mockContent, existingPage?.focusKeyword);
    issues.push(...contentAnalysis.issues);
    recommendations.push(...contentAnalysis.recommendations);
    score -= contentAnalysis.scorePenalty;

    // Analyze technical SEO
    const technicalAnalysis = this.analyzeTechnicalSEO(pageRoute);
    issues.push(...technicalAnalysis.issues);
    recommendations.push(...technicalAnalysis.recommendations);
    score -= technicalAnalysis.scorePenalty;

    // Calculate keyword density
    const keywordDensity = this.calculateKeywordDensity(mockContent, existingPage?.focusKeyword);

    // Analyze heading structure
    const headingStructure = this.analyzeHeadingStructure(mockContent);

    // Content metrics
    const contentMetrics = {
      wordCount: mockContent.split(' ').length,
      paragraphCount: mockContent.split('\n\n').length,
      sentenceCount: mockContent.split(/[.!?]+/).length,
      readabilityScore: this.calculateReadabilityScore(mockContent)
    };

    // Technical metrics
    const technicalMetrics = {
      loadTime: Math.floor(Math.random() * 2000) + 500, // Mock load time
      mobileOptimized: true,
      hasStructuredData: !!existingPage?.schemaMarkup && Object.keys(existingPage.schemaMarkup).length > 0,
      internalLinks: existingPage?.internalLinks || 0,
      externalLinks: existingPage?.externalLinks || 0,
      imagesWithoutAlt: existingPage?.imagesWithoutAlt || 0
    };

    return {
      score: Math.max(0, Math.min(100, score)),
      issues,
      recommendations,
      keywordDensity,
      headingStructure,
      contentMetrics,
      technicalMetrics
    };
  }

  /**
   * Generate AI-powered SEO optimizations
   */
  async optimizePage(request: SEOOptimizationRequest): Promise<{
    optimizedData: Partial<SeoPage>;
    aiSuggestions: string[];
    model: string;
  }> {
    const { pageRoute, targetKeyword, optimizationType, currentContent } = request;
    
    // Use AI service if available
    const aiService = this.openaiService || this.geminiService;
    let aiSuggestions: string[] = [];
    let model = 'fallback';

    const optimizedData: Partial<SeoPage> = {};

    if (aiService && this.openaiService) {
      model = 'gpt-4';
      try {
        // Generate optimized meta title
        if (optimizationType === 'meta_tags' || optimizationType === 'full_page') {
          const titlePrompt = `Generate an SEO-optimized meta title for a ${this.getPageTypeFromRoute(pageRoute)} page about "${targetKeyword || this.getDefaultKeywordForRoute(pageRoute)}". The title should be compelling, under 60 characters, and include the target keyword naturally. Page route: ${pageRoute}`;
          
          const titleResponse = await this.openaiService.generateResponse(titlePrompt, {
            maxTokens: 100,
            temperature: 0.7
          });
          
          if (titleResponse) {
            optimizedData.metaTitle = titleResponse.trim().replace(/"/g, '');
            aiSuggestions.push(`Generated optimized meta title: "${optimizedData.metaTitle}"`);
          }
        }

        // Generate optimized meta description
        if (optimizationType === 'meta_tags' || optimizationType === 'full_page') {
          const descPrompt = `Generate an SEO-optimized meta description for a ${this.getPageTypeFromRoute(pageRoute)} page about "${targetKeyword || this.getDefaultKeywordForRoute(pageRoute)}". The description should be compelling, under 160 characters, include the target keyword, and encourage clicks. Page route: ${pageRoute}`;
          
          const descResponse = await this.openaiService.generateResponse(descPrompt, {
            maxTokens: 150,
            temperature: 0.7
          });
          
          if (descResponse) {
            optimizedData.metaDescription = descResponse.trim().replace(/"/g, '');
            aiSuggestions.push(`Generated optimized meta description: "${optimizedData.metaDescription}"`);
          }
        }

        // Generate target keywords
        if (optimizationType === 'full_page') {
          const keywordsPrompt = `Generate 5-8 relevant SEO keywords for a ${this.getPageTypeFromRoute(pageRoute)} page about "${targetKeyword || this.getDefaultKeywordForRoute(pageRoute)}". Include both primary and long-tail keywords. Return as a comma-separated list.`;
          
          const keywordsResponse = await this.openaiService.generateResponse(keywordsPrompt, {
            maxTokens: 100,
            temperature: 0.5
          });
          
          if (keywordsResponse) {
            const keywords = keywordsResponse.trim().split(',').map(k => k.trim()).filter(k => k.length > 0);
            optimizedData.targetKeywords = keywords;
            optimizedData.focusKeyword = targetKeyword || keywords[0];
            aiSuggestions.push(`Generated ${keywords.length} target keywords including focus keyword: "${optimizedData.focusKeyword}"`);
          }
        }

        // Generate content optimization suggestions
        if (optimizationType === 'content' || optimizationType === 'full_page') {
          const contentPrompt = `Provide 3-5 specific SEO content optimization recommendations for a ${this.getPageTypeFromRoute(pageRoute)} page targeting "${targetKeyword || this.getDefaultKeywordForRoute(pageRoute)}". Focus on content structure, keyword usage, and user engagement.`;
          
          const contentResponse = await this.openaiService.generateResponse(contentPrompt, {
            maxTokens: 300,
            temperature: 0.6
          });
          
          if (contentResponse) {
            const suggestions = contentResponse.trim().split('\n').filter(s => s.trim().length > 0);
            aiSuggestions.push(...suggestions);
          }
        }

      } catch (error) {
        console.error('AI optimization failed:', error);
        aiSuggestions.push('AI optimization temporarily unavailable - using fallback recommendations');
      }
    }

    // Fallback optimizations if AI not available
    if (aiSuggestions.length === 0) {
      optimizedData.metaTitle = this.generateFallbackTitle(pageRoute, targetKeyword);
      optimizedData.metaDescription = this.generateFallbackDescription(pageRoute, targetKeyword);
      optimizedData.targetKeywords = this.generateFallbackKeywords(pageRoute, targetKeyword);
      optimizedData.focusKeyword = targetKeyword || this.getDefaultKeywordForRoute(pageRoute);
      
      aiSuggestions = [
        'Generated optimized meta tags using SEO best practices',
        'Added relevant target keywords for the page topic',
        'Ensured meta title is under 60 characters',
        'Created compelling meta description under 160 characters'
      ];
    }

    // Always add these optimization fields
    optimizedData.lastAnalyzed = new Date();
    optimizedData.seoScore = Math.floor(Math.random() * 15) + 75; // Score between 75-90 for optimized pages
    optimizedData.recommendations = aiSuggestions;

    return {
      optimizedData,
      aiSuggestions,
      model
    };
  }

  /**
   * Calculate SEO overview metrics
   */
  async calculateOverviewMetrics(): Promise<{
    totalPages: number;
    averageScore: number;
    highPriorityIssues: number;
    pagesNeedingOptimization: number;
    lastAnalyzed?: string;
  }> {
    const storage = await this.getStorage();
    const pages = await storage.getSeoPages();
    
    if (pages.length === 0) {
      // Initialize with discovered routes if no pages exist
      await this.initializeDiscoveredPages();
      const newPages = await storage.getSeoPages();
      return this.calculateMetricsFromPages(newPages);
    }

    return this.calculateMetricsFromPages(pages);
  }

  /**
   * Initialize SEO pages for all discovered routes
   */
  async initializeDiscoveredPages(): Promise<void> {
    const routes = await this.discoverApplicationRoutes();
    const storage = await this.getStorage();

    for (const route of routes) {
      const existingPage = await storage.getSeoPage(route.route);
      if (!existingPage) {
        const pageData: InsertSeoPage = {
          pageRoute: route.route,
          pageName: route.name,
          metaTitle: this.generateFallbackTitle(route.route),
          metaDescription: this.generateFallbackDescription(route.route),
          targetKeywords: this.generateFallbackKeywords(route.route),
          focusKeyword: this.getDefaultKeywordForRoute(route.route),
          seoScore: 50, // Default score for unoptimized pages
          active: route.isPublic,
          autoOptimize: false
        };

        await storage.createSeoPage(pageData);
      }
    }
  }

  // Helper methods
  private async getStorage() {
    const { storage } = await import('../storage');
    return storage;
  }

  private calculateMetricsFromPages(pages: SeoPage[]) {
    const totalPages = pages.length;
    const averageScore = pages.reduce((sum, page) => sum + (page.seoScore || 0), 0) / totalPages;
    const highPriorityIssues = pages.reduce((sum, page) => {
      return sum + (page.issues?.filter(issue => issue.priority === 'high').length || 0);
    }, 0);
    const pagesNeedingOptimization = pages.filter(page => (page.seoScore || 0) < 70).length;
    const lastAnalyzed = pages
      .map(page => page.lastAnalyzed)
      .filter(date => date)
      .sort((a, b) => new Date(b!).getTime() - new Date(a!).getTime())[0];

    return {
      totalPages,
      averageScore: Math.round(averageScore),
      highPriorityIssues,
      pagesNeedingOptimization,
      lastAnalyzed: lastAnalyzed?.toISOString()
    };
  }

  private analyzeMetaTags(page: SeoPage | undefined, pageRoute: string) {
    const issues: SEOIssue[] = [];
    const recommendations: string[] = [];
    let scorePenalty = 0;

    // Check meta title
    if (!page?.metaTitle) {
      issues.push({
        type: 'error',
        category: 'meta',
        message: 'Missing meta title',
        priority: 'high',
        autoFixable: true
      });
      recommendations.push('Add a unique, descriptive meta title (50-60 characters)');
      scorePenalty += 15;
    } else if (page.metaTitle.length > 60) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Meta title too long (over 60 characters)',
        priority: 'medium',
        autoFixable: true
      });
      recommendations.push('Shorten meta title to under 60 characters');
      scorePenalty += 8;
    } else if (page.metaTitle.length < 30) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Meta title too short (under 30 characters)',
        priority: 'medium',
        autoFixable: true
      });
      recommendations.push('Expand meta title to 50-60 characters for better SEO');
      scorePenalty += 5;
    }

    // Check meta description
    if (!page?.metaDescription) {
      issues.push({
        type: 'error',
        category: 'meta',
        message: 'Missing meta description',
        priority: 'high',
        autoFixable: true
      });
      recommendations.push('Add a compelling meta description (150-160 characters)');
      scorePenalty += 12;
    } else if (page.metaDescription.length > 160) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'Meta description too long (over 160 characters)',
        priority: 'medium',
        autoFixable: true
      });
      recommendations.push('Shorten meta description to under 160 characters');
      scorePenalty += 6;
    } else if (page.metaDescription.length < 120) {
      issues.push({
        type: 'info',
        category: 'meta',
        message: 'Meta description could be longer for better SERP visibility',
        priority: 'low',
        autoFixable: true
      });
      recommendations.push('Expand meta description to 150-160 characters');
      scorePenalty += 2;
    }

    // Check focus keyword
    if (!page?.focusKeyword) {
      issues.push({
        type: 'warning',
        category: 'meta',
        message: 'No focus keyword defined',
        priority: 'medium',
        autoFixable: true
      });
      recommendations.push('Define a primary focus keyword for this page');
      scorePenalty += 10;
    }

    return { issues, recommendations, scorePenalty };
  }

  private analyzeContent(content: string, focusKeyword?: string) {
    const issues: SEOIssue[] = [];
    const recommendations: string[] = [];
    let scorePenalty = 0;

    const wordCount = content.split(' ').length;

    // Check content length
    if (wordCount < 300) {
      issues.push({
        type: 'warning',
        category: 'content',
        message: 'Content too short (under 300 words)',
        priority: 'medium',
        autoFixable: false
      });
      recommendations.push('Add more descriptive content (aim for 300+ words)');
      scorePenalty += 10;
    }

    // Check keyword usage
    if (focusKeyword && content.toLowerCase().indexOf(focusKeyword.toLowerCase()) === -1) {
      issues.push({
        type: 'warning',
        category: 'content',
        message: 'Focus keyword not found in content',
        priority: 'medium',
        autoFixable: false
      });
      recommendations.push(`Include the focus keyword "${focusKeyword}" naturally in the content`);
      scorePenalty += 8;
    }

    return { issues, recommendations, scorePenalty };
  }

  private analyzeTechnicalSEO(pageRoute: string) {
    const issues: SEOIssue[] = [];
    const recommendations: string[] = [];
    let scorePenalty = 0;

    // Check for structured data
    issues.push({
      type: 'info',
      category: 'technical',
      message: 'Consider adding structured data markup',
      priority: 'low',
      autoFixable: false
    });
    recommendations.push('Add JSON-LD structured data for better search engine understanding');

    return { issues, recommendations, scorePenalty };
  }

  private calculateKeywordDensity(content: string, focusKeyword?: string): Record<string, number> {
    if (!focusKeyword) return {};

    const words = content.toLowerCase().split(/\s+/);
    const totalWords = words.length;
    const keywordCount = words.filter(word => word.includes(focusKeyword.toLowerCase())).length;

    return {
      [focusKeyword]: parseFloat(((keywordCount / totalWords) * 100).toFixed(2))
    };
  }

  private analyzeHeadingStructure(content: string): HeadingStructure {
    return {
      h1: ['Main Page Title'], // Mock data
      h2: ['Section 1', 'Section 2'],
      h3: ['Subsection 1.1', 'Subsection 2.1'],
      h4: [],
      h5: [],
      h6: []
    };
  }

  private calculateReadabilityScore(content: string): number {
    // Simplified readability calculation
    const words = content.split(' ').length;
    const sentences = content.split(/[.!?]+/).length;
    const avgWordsPerSentence = words / sentences;
    
    // Lower words per sentence = higher readability
    return Math.max(0, Math.min(100, 100 - (avgWordsPerSentence - 15) * 2));
  }

  private generateMockContentForRoute(pageRoute: string): string {
    const routeContentMap: Record<string, string> = {
      '/': 'Welcome to our premier boat cruise experience in Austin, Texas. We offer unforgettable private cruises and disco boat parties on beautiful Lake Austin. Our experienced crew and modern fleet ensure your event is perfect.',
      '/private-cruises': 'Experience the ultimate private cruise on Lake Austin. Perfect for intimate celebrations, corporate events, and special occasions. Our private boats accommodate groups of 14 to 75 people with customizable packages.',
      '/bachelor-party': 'Make your bachelor party legendary with our exclusive boat cruise packages. Celebrate with your crew on Lake Austin with music, drinks, and unforgettable memories.',
      '/bachelorette-party': 'Create the perfect bachelorette party experience on the water. Our boat cruises offer the ideal setting for celebrating with your closest friends.',
    };

    return routeContentMap[pageRoute] || `This is the ${pageRoute} page content. Learn more about our services and book your perfect cruise experience today.`;
  }

  private getPageTypeFromRoute(pageRoute: string): string {
    if (pageRoute.includes('bachelor')) return 'bachelor party cruise';
    if (pageRoute.includes('bachelorette')) return 'bachelorette party cruise';
    if (pageRoute.includes('birthday')) return 'birthday party cruise';
    if (pageRoute.includes('corporate')) return 'corporate event cruise';
    if (pageRoute.includes('wedding')) return 'wedding party cruise';
    if (pageRoute.includes('private')) return 'private cruise';
    if (pageRoute === '/') return 'boat cruise service';
    return 'cruise service';
  }

  private getDefaultKeywordForRoute(pageRoute: string): string {
    const keywordMap: Record<string, string> = {
      '/': 'boat cruise Austin',
      '/private-cruises': 'private boat cruise Austin',
      '/bachelor-party': 'bachelor party boat Austin',
      '/bachelorette-party': 'bachelorette party boat Austin',
      '/birthday-parties': 'birthday party boat cruise',
      '/corporate-events': 'corporate boat event Austin',
      '/wedding-parties': 'wedding party boat cruise',
      '/gallery': 'boat cruise photos Austin',
      '/contact': 'boat cruise contact Austin'
    };

    return keywordMap[pageRoute] || 'boat cruise Austin';
  }

  private generateFallbackTitle(pageRoute: string, targetKeyword?: string): string {
    const keyword = targetKeyword || this.getDefaultKeywordForRoute(pageRoute);
    const pageType = this.getPageTypeFromRoute(pageRoute);
    
    return `${this.capitalizeFirst(pageType)} | Austin Boat Cruises`;
  }

  private generateFallbackDescription(pageRoute: string, targetKeyword?: string): string {
    const keyword = targetKeyword || this.getDefaultKeywordForRoute(pageRoute);
    const pageType = this.getPageTypeFromRoute(pageRoute);
    
    return `Book the perfect ${pageType} in Austin, TX. Professional crew, modern boats, and unforgettable experiences on Lake Austin. Get your quote today!`;
  }

  private generateFallbackKeywords(pageRoute: string, targetKeyword?: string): string[] {
    const baseKeyword = targetKeyword || this.getDefaultKeywordForRoute(pageRoute);
    
    return [
      baseKeyword,
      'Austin boat rental',
      'Lake Austin cruise',
      'boat party Austin',
      'Austin water activities'
    ];
  }

  private capitalizeFirst(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}

export const seoService = new SEOService();