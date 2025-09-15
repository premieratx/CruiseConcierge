import { storage } from "./storage";
import type { InsertQuoteTemplate, QuoteItem, RadioSection } from "@shared/schema";

export async function seedQuoteTemplates() {
  console.log("Creating standard quote templates...");
  
  // Bachelor/Bachelorette Party Template
  const bachelorTemplate: InsertQuoteTemplate = {
    name: "Bachelor/Bachelorette Party Package",
    description: "The ultimate celebration on Lake Travis! Perfect for your last sail before the veil.",
    eventType: "Bachelor/Bachelorette Party",
    defaultItems: [
      {
        type: "line_item",
        name: "Party Cruise (3 Hours)",
        unitPrice: 150000, // $1500
        qty: 1,
        required: true,
        description: "3-hour private party cruise on Lake Travis",
        category: "cruise",
      },
      {
        type: "line_item",
        name: "Premium Sound System",
        unitPrice: 15000, // $150
        qty: 1,
        required: false,
        description: "Bluetooth connectivity, party lights, and premium speakers",
        category: "entertainment",
      },
      {
        type: "line_item",
        name: "Captain & Crew",
        unitPrice: 30000, // $300
        qty: 1,
        required: true,
        description: "Professional captain and crew member",
        category: "service",
      },
      {
        type: "line_item",
        name: "Party Decorations Package",
        unitPrice: 10000, // $100
        qty: 1,
        required: false,
        description: "Balloons, banners, and themed decorations",
        category: "extras",
      },
      {
        type: "line_item",
        name: "Cooler with Ice",
        unitPrice: 5000, // $50
        qty: 2,
        required: false,
        description: "Large cooler filled with ice",
        category: "extras",
      },
    ] as QuoteItem[],
    defaultRadioSections: [
      {
        id: "boat_selection",
        title: "Select Your Boat",
        description: "Choose the perfect vessel for your party",
        required: true,
        options: [
          {
            id: "paradise",
            name: "Paradise - Double Decker Party Boat",
            description: "50 guests max, two levels, water slide",
            price: 0,
            isDefault: true,
          },
          {
            id: "paradise_plus",
            name: "Paradise Plus - Premium Double Decker",
            description: "60 guests max, premium amenities, water toys",
            price: 30000, // $300 upgrade
          },
        ],
        order: 1,
      },
      {
        id: "photo_package",
        title: "Photography Package",
        description: "Capture the memories",
        required: false,
        options: [
          {
            id: "no_photo",
            name: "No Photography",
            price: 0,
            isDefault: true,
          },
          {
            id: "basic_photo",
            name: "Basic Photo Package",
            description: "1 hour of photography, 50+ edited photos",
            price: 25000, // $250
          },
          {
            id: "premium_photo",
            name: "Premium Photo & Video",
            description: "Full event coverage, drone footage, 100+ photos",
            price: 50000, // $500
          },
        ],
        order: 2,
      },
    ] as RadioSection[],
    minGroupSize: 15,
    maxGroupSize: 60,
    basePricePerPerson: 10000, // $100 per person
    duration: 3,
    active: true,
    displayOrder: 1,
    visualTheme: {
      primaryColor: "#ec4899",
      headerImage: "/templates/bachelor.jpg",
      iconSet: "party",
    },
  };

  // Corporate Event Template
  const corporateTemplate: InsertQuoteTemplate = {
    name: "Corporate Event Package",
    description: "Professional yet fun team building experience on the water",
    eventType: "Corporate Event",
    defaultItems: [
      {
        type: "line_item",
        name: "Corporate Cruise (4 Hours)",
        unitPrice: 200000, // $2000
        qty: 1,
        required: true,
        description: "4-hour private corporate cruise with professional amenities",
        category: "cruise",
      },
      {
        type: "line_item",
        name: "Professional Sound System & Microphone",
        unitPrice: 20000, // $200
        qty: 1,
        required: true,
        description: "PA system for presentations and announcements",
        category: "equipment",
      },
      {
        type: "line_item",
        name: "Captain & Professional Crew",
        unitPrice: 40000, // $400
        qty: 1,
        required: true,
        description: "Professional captain and 2 crew members",
        category: "service",
      },
      {
        type: "line_item",
        name: "Catering Service Setup",
        unitPrice: 15000, // $150
        qty: 1,
        required: false,
        description: "Tables, serving stations, and utensils",
        category: "catering",
      },
      {
        type: "line_item",
        name: "Team Building Activities",
        unitPrice: 30000, // $300
        qty: 1,
        required: false,
        description: "Organized water sports and team activities",
        category: "entertainment",
      },
    ] as QuoteItem[],
    defaultRadioSections: [
      {
        id: "catering_option",
        title: "Catering Options",
        description: "Professional catering for your team",
        required: false,
        options: [
          {
            id: "no_catering",
            name: "No Catering (BYOB/Food)",
            price: 0,
            isDefault: true,
          },
          {
            id: "light_catering",
            name: "Light Refreshments",
            description: "Snacks, soft drinks, water",
            price: 2500, // $25 per person (base)
          },
          {
            id: "full_catering",
            name: "Full Catering Service",
            description: "Appetizers, entrees, desserts, beverages",
            price: 6500, // $65 per person (base)
          },
        ],
        order: 1,
      },
      {
        id: "amenities",
        title: "Additional Amenities",
        description: "Enhance your corporate event",
        required: false,
        options: [
          {
            id: "standard",
            name: "Standard Amenities",
            price: 0,
            isDefault: true,
          },
          {
            id: "premium",
            name: "Premium Business Package",
            description: "WiFi hotspot, charging stations, presentation screen",
            price: 35000, // $350
          },
        ],
        order: 2,
      },
    ] as RadioSection[],
    minGroupSize: 20,
    maxGroupSize: 100,
    basePricePerPerson: 12500, // $125 per person
    duration: 4,
    active: true,
    displayOrder: 2,
    visualTheme: {
      primaryColor: "#3b82f6",
      headerImage: "/templates/corporate.jpg",
      iconSet: "business",
    },
  };

  // Birthday Party Template
  const birthdayTemplate: InsertQuoteTemplate = {
    name: "Birthday Celebration Package",
    description: "Make your special day unforgettable with a birthday cruise!",
    eventType: "Birthday Party",
    defaultItems: [
      {
        type: "line_item",
        name: "Birthday Cruise (3 Hours)",
        unitPrice: 125000, // $1250
        qty: 1,
        required: true,
        description: "3-hour private birthday celebration cruise",
        category: "cruise",
      },
      {
        type: "line_item",
        name: "Party Sound System",
        unitPrice: 15000, // $150
        qty: 1,
        required: true,
        description: "DJ-ready sound system with party lights",
        category: "entertainment",
      },
      {
        type: "line_item",
        name: "Captain & Crew",
        unitPrice: 30000, // $300
        qty: 1,
        required: true,
        description: "Professional captain and crew member",
        category: "service",
      },
      {
        type: "line_item",
        name: "Birthday Decorations",
        unitPrice: 7500, // $75
        qty: 1,
        required: false,
        description: "Birthday banners, balloons, and table decorations",
        category: "extras",
      },
      {
        type: "line_item",
        name: "Cooler with Ice",
        unitPrice: 5000, // $50
        qty: 1,
        required: false,
        description: "Large cooler filled with ice",
        category: "extras",
      },
    ] as QuoteItem[],
    defaultRadioSections: [
      {
        id: "cake_option",
        title: "Birthday Cake",
        description: "Celebrate with a custom cake",
        required: false,
        options: [
          {
            id: "no_cake",
            name: "No Cake",
            price: 0,
            isDefault: true,
          },
          {
            id: "standard_cake",
            name: "Standard Birthday Cake",
            description: "Serves up to 30 guests",
            price: 12500, // $125
          },
          {
            id: "custom_cake",
            name: "Custom Designer Cake",
            description: "Custom design, serves up to 50 guests",
            price: 25000, // $250
          },
        ],
        order: 1,
      },
      {
        id: "entertainment",
        title: "Entertainment Add-ons",
        description: "Make it extra special",
        required: false,
        options: [
          {
            id: "no_entertainment",
            name: "No Additional Entertainment",
            price: 0,
            isDefault: true,
          },
          {
            id: "dj_service",
            name: "Professional DJ Service",
            description: "3-hour DJ service with MC",
            price: 50000, // $500
          },
          {
            id: "live_music",
            name: "Live Music Band",
            description: "3-piece acoustic band",
            price: 80000, // $800
          },
        ],
        order: 2,
      },
    ] as RadioSection[],
    minGroupSize: 10,
    maxGroupSize: 50,
    basePricePerPerson: 8500, // $85 per person
    duration: 3,
    active: true,
    displayOrder: 3,
    visualTheme: {
      primaryColor: "#f59e0b",
      headerImage: "/templates/birthday.jpg",
      iconSet: "celebration",
    },
  };

  // General Party Cruise Template
  const generalTemplate: InsertQuoteTemplate = {
    name: "Party Cruise Package",
    description: "Your perfect day on Lake Travis - customizable for any occasion!",
    eventType: "Party Cruise",
    defaultItems: [
      {
        type: "line_item",
        name: "Lake Travis Cruise",
        unitPrice: 100000, // $1000 base
        qty: 1,
        required: true,
        description: "Private party cruise on beautiful Lake Travis",
        category: "cruise",
      },
      {
        type: "line_item",
        name: "Captain & Crew",
        unitPrice: 30000, // $300
        qty: 1,
        required: true,
        description: "Professional captain and crew",
        category: "service",
      },
      {
        type: "line_item",
        name: "Bluetooth Sound System",
        unitPrice: 10000, // $100
        qty: 1,
        required: false,
        description: "Connect your phone and play your music",
        category: "entertainment",
      },
      {
        type: "line_item",
        name: "Cooler with Ice",
        unitPrice: 5000, // $50
        qty: 1,
        required: false,
        description: "Large cooler filled with ice",
        category: "extras",
      },
    ] as QuoteItem[],
    defaultRadioSections: [
      {
        id: "duration",
        title: "Cruise Duration",
        description: "How long would you like to cruise?",
        required: true,
        options: [
          {
            id: "2_hours",
            name: "2 Hours",
            price: 0,
            isDefault: true,
          },
          {
            id: "3_hours",
            name: "3 Hours",
            price: 50000, // $500
          },
          {
            id: "4_hours",
            name: "4 Hours",
            price: 100000, // $1000
          },
          {
            id: "6_hours",
            name: "6 Hours (Full Day)",
            price: 200000, // $2000
          },
        ],
        order: 1,
      },
      {
        id: "water_toys",
        title: "Water Toys & Activities",
        description: "Add some fun to your cruise",
        required: false,
        options: [
          {
            id: "no_toys",
            name: "No Water Toys",
            price: 0,
            isDefault: true,
          },
          {
            id: "basic_toys",
            name: "Basic Package",
            description: "Floating mat and noodles",
            price: 10000, // $100
          },
          {
            id: "premium_toys",
            name: "Premium Package",
            description: "Water trampoline, kayaks, paddleboards",
            price: 30000, // $300
          },
        ],
        order: 2,
      },
    ] as RadioSection[],
    minGroupSize: 6,
    maxGroupSize: 100,
    basePricePerPerson: 7500, // $75 per person
    duration: 3,
    active: true,
    isDefault: true, // This is the default template
    displayOrder: 0,
    visualTheme: {
      primaryColor: "#06b6d4",
      headerImage: "/templates/general.jpg",
      iconSet: "default",
    },
  };

  try {
    // Create all templates
    const templates = [
      generalTemplate,
      bachelorTemplate,
      corporateTemplate,
      birthdayTemplate,
    ];

    for (const template of templates) {
      const created = await storage.createQuoteTemplate(template);
      console.log(`✅ Created template: ${created.name}`);
    }

    console.log("✨ All quote templates created successfully!");
    return true;
  } catch (error) {
    console.error("Error creating quote templates:", error);
    return false;
  }
}

