import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import PublicNavigation from '@/components/PublicNavigationLuxury';
import Footer from '@/components/Footer';
import SEOHead from '@/components/SEOHead';
import Breadcrumb from '@/components/Breadcrumb';
import { SectionReveal } from '@/components/SectionReveal';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent } from '@/components/ui/dialog';
import { Camera, X, ChevronLeft, ChevronRight, Ship, Sparkles, Users, Video as VideoIcon, Calendar } from 'lucide-react';
import { useLocation } from 'wouter';

// Media Item type from Media Library
interface MediaItem {
  id: string;
  filename: string;
  originalName: string;
  altText?: string;
  fileType: 'photo' | 'video' | 'edited_photo' | 'generated_video';
  filePath: string;
  uploadDate: string;
  autoTags?: string[];
  manualTags?: string[];
}

interface CategorySection {
  id: string;
  name: string;
  icon: any;
  tags: string[];
  description: string;
}

// Static fleet photos consolidated from all boats (Clever Girl → Meeseeks/The Irony → Day Tripper)
const staticFleetPhotos: MediaItem[] = [
  // Clever Girl - 8 photos
  { id: 'fleet-clever-1', filename: 'clever-girl-1.jpg', originalName: 'Clever Girl deck with Texas star', altText: 'Clever Girl deck with disco balls and Texas star', fileType: 'photo', filePath: '/attached_assets/clever girl-1 lake travis party boat rental_1763966476656.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-2', filename: 'clever-girl-2.jpg', originalName: 'Clever Girl main deck view', altText: 'Clever Girl party boat main deck view', fileType: 'photo', filePath: '/attached_assets/clever girl-2 party boat rental austin_1763966476657.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-3', filename: 'clever-girl-3.jpg', originalName: 'Clever Girl disco balls', altText: 'Clever Girl disco balls close-up view', fileType: 'photo', filePath: '/attached_assets/clever girl-3 bachelorette party boat austin_1763966476657.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-4', filename: 'clever-girl-4.jpg', originalName: 'Clever Girl seating area', altText: 'Clever Girl deck seating area', fileType: 'photo', filePath: '/attached_assets/clever girl-4 party boat rental austin_1763966476657.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-6', filename: 'clever-girl-6.jpg', originalName: 'Clever Girl shaded deck', altText: 'Clever Girl covered deck with disco balls', fileType: 'photo', filePath: '/attached_assets/clever girl-6 party boat lake travis_1763966476657.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-8', filename: 'clever-girl-8.jpg', originalName: 'Clever Girl lake views', altText: 'Clever Girl side deck view Lake Travis', fileType: 'photo', filePath: '/attached_assets/clever girl-8 party boat rental austin_1763966476658.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-9', filename: 'clever-girl-9.jpg', originalName: 'Clever Girl bow area', altText: 'Clever Girl bow seating and coolers', fileType: 'photo', filePath: '/attached_assets/clever girl-9 party boat austin_1763966476658.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-clever-10', filename: 'clever-girl-10.jpg', originalName: 'Clever Girl on water', altText: 'Clever Girl party boat exterior on Lake Travis', fileType: 'photo', filePath: '/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  
  // Meeseeks / The Irony - 8 photos
  { id: 'fleet-meeseeks-1', filename: 'meeseeks-1.webp', originalName: 'Meeseeks party boat', altText: 'Meeseeks 25-person party boat on Lake Travis', fileType: 'photo', filePath: '/attached_assets/meeseeks-25-person-boat.webp', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-meeseeks-2', filename: 'meeseeks-2.jpg', originalName: 'Meeseeks seating area', altText: 'Meeseeks boat seating area with Lake Travis views', fileType: 'photo', filePath: '/attached_assets/meeseeks-1_1763968010088.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-meeseeks-3', filename: 'meeseeks-3.jpg', originalName: 'Meeseeks covered deck', altText: 'Meeseeks boat covered deck on Lake Travis', fileType: 'photo', filePath: '/attached_assets/meeseeks-2_1763968010089.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-meeseeks-4', filename: 'meeseeks-4.jpg', originalName: 'Meeseeks full deck view', altText: 'Meeseeks boat interior deck view', fileType: 'photo', filePath: '/attached_assets/meeseeks-3 lake travis party boat_1763968010089.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-meeseeks-5', filename: 'meeseeks-5.jpg', originalName: 'Meeseeks cabin and seating', altText: 'Meeseeks boat cabin and seating', fileType: 'photo', filePath: '/attached_assets/meeseeks-4 austin party boat rental_1763968010090.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-meeseeks-6', filename: 'meeseeks-6.jpg', originalName: 'Meeseeks open air deck', altText: 'Meeseeks boat outdoor deck area', fileType: 'photo', filePath: '/attached_assets/meeseeks-5 austin party barge rental_1763968010090.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-irony-1', filename: 'irony-1.jpg', originalName: 'The Irony twin boat full view', altText: 'The Irony boat full view on water', fileType: 'photo', filePath: '/attached_assets/the irony -3 party boat rental austin_1763968010090.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-irony-2', filename: 'irony-2.jpg', originalName: 'The Irony deck view', altText: 'The Irony boat stern view with seating', fileType: 'photo', filePath: '/attached_assets/the irony-2 party boat rental austin_1763968010090.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  
  // Day Tripper - 7 photos
  { id: 'fleet-day-1', filename: 'day-tripper-1.webp', originalName: 'Day Tripper party boat', altText: 'Day Tripper 14-person party boat on Lake Travis', fileType: 'photo', filePath: '/attached_assets/day-tripper-14-person-boat.webp', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-2', filename: 'day-tripper-2.jpg', originalName: 'Day Tripper shaded seating', altText: 'Day Tripper deck with blue canopy shade', fileType: 'photo', filePath: '/attached_assets/day tripper - party boat rental austin_1763968078448.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-3', filename: 'day-tripper-3.jpg', originalName: 'Day Tripper rear view', altText: 'Day Tripper boat rear view on water', fileType: 'photo', filePath: '/attached_assets/day tripper-1 party boat with captain austin_1763968078449.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-4', filename: 'day-tripper-4.jpg', originalName: 'Day Tripper deck layout', altText: 'Day Tripper interior deck layout', fileType: 'photo', filePath: '/attached_assets/day tripper-2 party boat austin lake travis_1763968078449.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-5', filename: 'day-tripper-5.jpg', originalName: 'Day Tripper bow view', altText: 'Day Tripper open water view from bow', fileType: 'photo', filePath: '/attached_assets/day tripper-3 party boat austin_1763968078451.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-6', filename: 'day-tripper-6.jpg', originalName: 'Day Tripper cabin and deck', altText: 'Day Tripper cabin and deck view', fileType: 'photo', filePath: '/attached_assets/day tripper-5 party barge lake travis_1763968078452.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
  { id: 'fleet-day-7', filename: 'day-tripper-7.jpg', originalName: 'Day Tripper safety features', altText: 'Day Tripper front view with lifeboat', fileType: 'photo', filePath: '/attached_assets/day tripper-6 party boat austin_1763968078452.jpg', uploadDate: new Date().toISOString(), manualTags: ['boats', 'fleet'] },
];

// Party photos - real celebrations on our boats
const staticPartyPhotos: MediaItem[] = [
  { id: 'party-1', filename: 'party-1.webp', originalName: 'Party cruise celebration', altText: 'Party cruise celebration on Lake Travis', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-6.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-2', filename: 'party-2.webp', originalName: 'Lake Travis party boat', altText: 'Lake Travis party boat celebration', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-34.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-3', filename: 'party-3.webp', originalName: 'Group celebration on boat', altText: 'Group celebration on party boat', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-46.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-4', filename: 'party-4.webp', originalName: 'Friends on party cruise', altText: 'Friends celebrating on party cruise', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-47.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-5', filename: 'party-5.webp', originalName: 'Bachelor party on Lake Travis', altText: 'Bachelor party celebration on Lake Travis', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-50.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere', 'events'] },
  { id: 'party-6', filename: 'party-6.webp', originalName: 'Bachelorette celebration', altText: 'Bachelorette party celebration', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-57.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere', 'events'] },
  { id: 'party-7', filename: 'party-7.webp', originalName: 'Party boat fun', altText: 'Party boat fun on Lake Travis', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-91.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-8', filename: 'party-8.webp', originalName: 'Disco cruise celebration', altText: 'Disco cruise celebration', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-92.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-9', filename: 'party-9.webp', originalName: 'Friends celebrating', altText: 'Friends celebrating on cruise', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-95.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-10', filename: 'party-10.webp', originalName: 'Party cruise group', altText: 'Party cruise group photo', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-98.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-11', filename: 'party-11.webp', originalName: 'Lake Travis celebration', altText: 'Lake Travis celebration', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-99.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-12', filename: 'party-12.webp', originalName: 'Group photo on boat', altText: 'Group photo on party boat', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-107.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-13', filename: 'party-13.webp', originalName: 'Party atmosphere', altText: 'Party atmosphere on Lake Travis', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-115.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-14', filename: 'party-14.webp', originalName: 'Disco party cruise', altText: 'Disco party cruise', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-129.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-15', filename: 'party-15.webp', originalName: 'Friends on cruise', altText: 'Friends on party cruise', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-135.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-16', filename: 'party-16.webp', originalName: 'Celebration cruise', altText: 'Celebration cruise on Lake Travis', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-149.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-17', filename: 'party-17.webp', originalName: 'Party boat group', altText: 'Party boat group celebration', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-159.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-18', filename: 'party-18.webp', originalName: 'Lake Travis party', altText: 'Lake Travis party celebration', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-166.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-19', filename: 'party-19.webp', originalName: 'Boat party fun', altText: 'Boat party fun', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-171.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-20', filename: 'party-20.webp', originalName: 'Cruise celebration', altText: 'Cruise celebration', fileType: 'photo', filePath: '/gallery-optimized/_capitalcityshots-300.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-21', filename: 'party-21.webp', originalName: 'Party cruise friends', altText: 'Party cruise friends', fileType: 'photo', filePath: '/gallery-optimized/_ccs-2.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-22', filename: 'party-22.webp', originalName: 'Group on party boat', altText: 'Group on party boat', fileType: 'photo', filePath: '/gallery-optimized/_ccs-5.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-23', filename: 'party-23.webp', originalName: 'Lake Travis disco', altText: 'Lake Travis disco party', fileType: 'photo', filePath: '/gallery-optimized/_CCS-14.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-24', filename: 'party-24.webp', originalName: 'Party celebration', altText: 'Party celebration on boat', fileType: 'photo', filePath: '/gallery-optimized/_ccs-16.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-25', filename: 'party-25.webp', originalName: 'Friends cruising', altText: 'Friends cruising on Lake Travis', fileType: 'photo', filePath: '/gallery-optimized/_ccs-21.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-26', filename: 'party-26.webp', originalName: 'Boat party group', altText: 'Boat party group', fileType: 'photo', filePath: '/gallery-optimized/_CCS-25.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-27', filename: 'party-27.webp', originalName: 'Party boat fun', altText: 'Party boat fun', fileType: 'photo', filePath: '/gallery-optimized/_CCS-32.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-28', filename: 'party-28.webp', originalName: 'Cruise celebration', altText: 'Cruise celebration', fileType: 'photo', filePath: '/gallery-optimized/_CCS-36.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-29', filename: 'party-29.webp', originalName: 'Group photo', altText: 'Group photo on party boat', fileType: 'photo', filePath: '/gallery-optimized/_CCS-39.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-30', filename: 'party-30.webp', originalName: 'Party cruise', altText: 'Party cruise', fileType: 'photo', filePath: '/gallery-optimized/_CCS-40.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-31', filename: 'party-31.webp', originalName: 'Lake Travis fun', altText: 'Lake Travis party fun', fileType: 'photo', filePath: '/gallery-optimized/_CCS-42.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-32', filename: 'party-32.webp', originalName: 'Disco party', altText: 'Disco party celebration', fileType: 'photo', filePath: '/gallery-optimized/_CCS-49.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-33', filename: 'party-33.webp', originalName: 'Friends on boat', altText: 'Friends on party boat', fileType: 'photo', filePath: '/gallery-optimized/_CCS-55.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-34', filename: 'party-34.webp', originalName: 'Party atmosphere', altText: 'Party atmosphere', fileType: 'photo', filePath: '/gallery-optimized/_CCS-57.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-35', filename: 'party-35.webp', originalName: 'Celebration cruise', altText: 'Celebration cruise', fileType: 'photo', filePath: '/gallery-optimized/_CCS-67.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-36', filename: 'party-36.webp', originalName: 'Group celebration', altText: 'Group celebration', fileType: 'photo', filePath: '/gallery-optimized/_CCS-69.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-37', filename: 'party-37.webp', originalName: 'Party boat', altText: 'Party boat on Lake Travis', fileType: 'photo', filePath: '/gallery-optimized/_ccs-70.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-38', filename: 'party-38.webp', originalName: 'Lake Travis party', altText: 'Lake Travis party', fileType: 'photo', filePath: '/gallery-optimized/_CCS-75.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-39', filename: 'party-39.webp', originalName: 'Disco cruise', altText: 'Disco cruise celebration', fileType: 'photo', filePath: '/gallery-optimized/_CCS-84.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-40', filename: 'party-40.webp', originalName: 'Friends partying', altText: 'Friends partying on boat', fileType: 'photo', filePath: '/gallery-optimized/_CCS-85.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-41', filename: 'party-41.webp', originalName: 'Boat celebration', altText: 'Boat celebration', fileType: 'photo', filePath: '/gallery-optimized/_CCS-87.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-42', filename: 'party-42.webp', originalName: 'Party cruise fun', altText: 'Party cruise fun', fileType: 'photo', filePath: '/gallery-optimized/_CCS-88.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-43', filename: 'party-43.webp', originalName: 'Group on cruise', altText: 'Group on party cruise', fileType: 'photo', filePath: '/gallery-optimized/_CCS-89.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-44', filename: 'party-44.webp', originalName: 'Lake Travis cruise', altText: 'Lake Travis cruise', fileType: 'photo', filePath: '/gallery-optimized/_ccs-90.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-45', filename: 'party-45.webp', originalName: 'Party celebration', altText: 'Party celebration', fileType: 'photo', filePath: '/gallery-optimized/_CCS-91.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-46', filename: 'party-46.webp', originalName: 'Disco party fun', altText: 'Disco party fun', fileType: 'photo', filePath: '/gallery-optimized/_CCS-92.webp', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere'] },
  { id: 'party-47', filename: 'party-47.jpg', originalName: 'Bachelorette group on rainbow float', altText: 'Bachelorette group on rainbow float Lake Travis', fileType: 'photo', filePath: '/attached_assets/disco_fun_best2_1765193453547.jpg', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere', 'events'] },
  { id: 'party-48', filename: 'party-48.jpg', originalName: 'Champagne spray celebration', altText: 'Champagne spray celebration on party boat', fileType: 'photo', filePath: '/attached_assets/disco_fun5_1765193453548.jpg', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere', 'events'] },
  { id: 'party-49', filename: 'party-49.jpg', originalName: 'Bachelorette group with sun hats', altText: 'Bachelorette group with sun hats', fileType: 'photo', filePath: '/attached_assets/disco_fun2_1765193453547.jpg', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere', 'events'] },
  { id: 'party-50', filename: 'party-50.jpg', originalName: 'Party group with heart sunglasses', altText: 'Party group with heart sunglasses', fileType: 'photo', filePath: '/attached_assets/disco_fun3_1765193453548.jpg', uploadDate: new Date().toISOString(), manualTags: ['party', 'party_atmosphere', 'events'] },
];

const categories: CategorySection[] = [
  {
    id: 'all',
    name: 'All Media',
    icon: Camera,
    tags: [],
    description: 'View all photos and videos'
  },
  {
    id: 'boats',
    name: 'Our Fleet',
    icon: Ship,
    tags: ['boats', 'fleet'],
    description: 'See our amazing boats'
  },
  {
    id: 'party_atmosphere',
    name: 'Party Vibes',
    icon: Sparkles,
    tags: ['party_atmosphere', 'party'],
    description: 'Experience the party atmosphere'
  },
  {
    id: 'events',
    name: 'Events',
    icon: Users,
    tags: ['events', 'celebration'],
    description: 'Real celebrations and events'
  },
  {
    id: 'videos',
    name: 'Videos',
    icon: VideoIcon,
    tags: ['video'],
    description: 'Watch our cruise videos'
  }
];

export default function Gallery() {
  const [, navigate] = useLocation();
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [filteredPhotos, setFilteredPhotos] = useState<MediaItem[]>([]);
  const [brokenImageIds, setBrokenImageIds] = useState<Set<string>>(new Set());

  // Fetch published media from Media Library
  const { data: mediaLibraryPhotos = [], isLoading } = useQuery<MediaItem[]>({
    queryKey: ['/api/media/published'],
    queryFn: async () => {
      const response = await fetch('/api/media/published?section=gallery');
      if (!response.ok) return [];
      const data = await response.json();
      return data.items || [];
    },
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
  });

  // Combine media library photos with static fleet photos and party photos
  const allPhotos = [...staticFleetPhotos, ...staticPartyPhotos, ...mediaLibraryPhotos];
  const photos = allPhotos;

  // Set initial filtered photos when data loads, filtering out broken images
  useEffect(() => {
    if (photos && photos.length > 0) {
      const validPhotos = photos.filter(p => !brokenImageIds.has(p.id));
      setFilteredPhotos(validPhotos);
    }
  }, [photos, brokenImageIds]);

  const filterByCategory = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const validPhotos = photos.filter(p => !brokenImageIds.has(p.id));
    if (categoryId === 'all') {
      setFilteredPhotos(validPhotos);
    } else if (categoryId === 'videos') {
      setFilteredPhotos(validPhotos.filter(p => p.fileType === 'video' || p.fileType === 'generated_video'));
    } else if (categoryId === 'boats') {
      // Show static fleet photos (already tagged and ordered correctly)
      setFilteredPhotos(staticFleetPhotos.filter(p => !brokenImageIds.has(p.id)));
    } else {
      const category = categories.find(c => c.id === categoryId);
      if (category) {
        setFilteredPhotos(validPhotos.filter(p => 
          p.manualTags?.some(tag => category.tags.includes(tag))
        ));
      }
    }
  };

  const openLightbox = (index: number) => {
    setSelectedIndex(index);
    setLightboxOpen(true);
  };

  const nextImage = () => {
    setSelectedIndex((prev) => (prev + 1) % filteredPhotos.length);
  };

  const prevImage = () => {
    setSelectedIndex((prev) => (prev - 1 + filteredPhotos.length) % filteredPhotos.length);
  };

  const getCategoryCount = (categoryId: string) => {
    const validPhotos = photos.filter(p => !brokenImageIds.has(p.id));
    if (categoryId === 'all') return validPhotos.length;
    if (categoryId === 'videos') return validPhotos.filter(p => p.fileType === 'video' || p.fileType === 'generated_video').length;
    if (categoryId === 'boats') return staticFleetPhotos.filter(p => !brokenImageIds.has(p.id)).length;
    const category = categories.find(c => c.id === categoryId);
    if (!category) return 0;
    return validPhotos.filter(p => p.manualTags?.some(tag => category.tags.includes(tag))).length;
  };

  const handleImageError = (photoId: string) => {
    console.warn(`Failed to load image: ${photoId}`);
    setBrokenImageIds(prev => new Set([...prev, photoId]));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950" data-page-ready="gallery">
      <SEOHead 
        pageRoute="/gallery"
        defaultTitle="Lake Travis Party Boats Photo Gallery | Austin Cruises"
        defaultDescription="View stunning Lake Travis party boat photos. Real celebrations, fleet tours, bachelor parties. See the fun before you book!"
        defaultKeywords={[
          'premier party cruises photos',
          'lake travis boat rental gallery', 
          'austin party boat images',
          'lake travis cruise photos',
          'boat rental austin gallery',
          'party cruise pictures'
        ]}
        schemaType="webpage"
      />
      
      <PublicNavigation />
      <Breadcrumb />
      
      {/* Hero Section - Compact */}
      <SectionReveal>
        <section className="relative py-6 px-4 md:px-6">
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-5xl heading-unbounded font-bold text-gray-900 dark:text-white">
              Lake Travis Party Boats Photo Gallery
            </h1>
          </div>
        </section>
      </SectionReveal>

      {/* Category Filter - Sticky */}
      <section className="py-4 bg-white dark:bg-gray-900 sticky top-0 z-40 border-b border-gray-200 dark:border-gray-700 shadow-md">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const count = getCategoryCount(category.id);
              const Icon = category.icon;
              return (
                <Button
                  key={category.id}
                  onClick={() => filterByCategory(category.id)}
                  variant={selectedCategory === category.id ? 'default' : 'outline'}
                  size="sm"
                  className={`font-sans tracking-wider rounded-xl ${
                    selectedCategory === category.id 
                      ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                      : 'hover:bg-gray-200 dark:hover:bg-gray-700'
                  }`}
                  data-testid={`filter-${category.id}`}
                >
                  <Icon className="h-4 w-4 mr-2" />
                  {category.name}
                  <Badge variant="secondary" className="ml-2 text-xs font-sans tracking-wider">{count}</Badge>
                </Button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Main Photo Grid */}
      <SectionReveal>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6">
            {isLoading ? (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {[...Array(24)].map((_, i) => (
                  <div key={i} className="aspect-square bg-gray-200 dark:bg-gray-800 animate-pulse rounded-xl" />
                ))}
              </div>
            ) : filteredPhotos.length === 0 ? (
              <Card className="p-12 text-center rounded-xl">
                <Camera className="h-16 w-16 mx-auto mb-4 text-gray-400" />
                <p className="text-xl text-gray-600 dark:text-gray-400 mb-4">
                  No items in this category yet
                </p>
                <Button onClick={() => filterByCategory('all')} variant="outline" className="rounded-xl">
                  View All Media
                </Button>
              </Card>
            ) : (
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {filteredPhotos.map((photo, index) => (
                  <Card
                    key={photo.id}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                    onClick={() => openLightbox(index)}
                    data-testid={`gallery-item-${index}`}
                  >
                    <div className="aspect-square relative overflow-hidden bg-gray-100 dark:bg-gray-800">
                      {photo.fileType === 'video' || photo.fileType === 'generated_video' ? (
                        <>
                          <video
                            src={photo.filePath || `/api/media/view/${photo.id}`}
                            className="w-full h-full object-cover"
                            muted
                          />
                          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                            <VideoIcon className="h-8 w-8 text-white" />
                          </div>
                        </>
                      ) : (
                        <>
                          <img
                            src={photo.filePath || `/api/media/view/${photo.id}`}
                            alt={photo.altText || photo.originalName}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                            loading="lazy"
                            onError={() => handleImageError(photo.id)}
                          />
                          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <Camera className="h-6 w-6 text-white" />
                          </div>
                        </>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </SectionReveal>

      {/* Party Vibes Section - Real Party Photos */}
      <section className="py-12 bg-gradient-to-b from-purple-50 to-white dark:from-purple-900/20 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-4 mb-2">
                <Sparkles className="h-10 w-10 text-purple-600" />
                <h2 className="text-4xl heading-unbounded font-bold text-gray-900 dark:text-white">
                  Party Vibes
                </h2>
                <Sparkles className="h-10 w-10 text-purple-600" />
              </div>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Real photos from real parties - See the energy on Lake Travis
              </p>
            </div>
          </SectionReveal>

          <SectionReveal>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {[
                { src: '/gallery-optimized/_capitalcityshots-6.webp', alt: 'Party cruise celebration' },
                { src: '/gallery-optimized/_capitalcityshots-34.webp', alt: 'Lake Travis party boat' },
                { src: '/gallery-optimized/_capitalcityshots-46.webp', alt: 'Group celebration on boat' },
                { src: '/gallery-optimized/_capitalcityshots-47.webp', alt: 'Friends on party cruise' },
                { src: '/gallery-optimized/_capitalcityshots-50.webp', alt: 'Bachelor party on Lake Travis' },
                { src: '/gallery-optimized/_capitalcityshots-57.webp', alt: 'Bachelorette celebration' },
                { src: '/gallery-optimized/_capitalcityshots-91.webp', alt: 'Party boat fun' },
                { src: '/gallery-optimized/_capitalcityshots-92.webp', alt: 'Disco cruise celebration' },
                { src: '/gallery-optimized/_capitalcityshots-95.webp', alt: 'Friends celebrating' },
                { src: '/gallery-optimized/_capitalcityshots-98.webp', alt: 'Party cruise group' },
                { src: '/gallery-optimized/_capitalcityshots-99.webp', alt: 'Lake Travis celebration' },
                { src: '/gallery-optimized/_capitalcityshots-107.webp', alt: 'Group photo on boat' },
                { src: '/gallery-optimized/_capitalcityshots-115.webp', alt: 'Party atmosphere' },
                { src: '/gallery-optimized/_capitalcityshots-129.webp', alt: 'Disco party cruise' },
                { src: '/gallery-optimized/_capitalcityshots-135.webp', alt: 'Friends on cruise' },
                { src: '/gallery-optimized/_capitalcityshots-149.webp', alt: 'Celebration cruise' },
                { src: '/gallery-optimized/_capitalcityshots-159.webp', alt: 'Party boat group' },
                { src: '/gallery-optimized/_capitalcityshots-166.webp', alt: 'Lake Travis party' },
                { src: '/gallery-optimized/_capitalcityshots-171.webp', alt: 'Boat party fun' },
                { src: '/gallery-optimized/_capitalcityshots-300.webp', alt: 'Cruise celebration' },
                { src: '/gallery-optimized/_ccs-2.webp', alt: 'Party cruise friends' },
                { src: '/gallery-optimized/_ccs-5.webp', alt: 'Group on party boat' },
                { src: '/gallery-optimized/_CCS-14.webp', alt: 'Lake Travis disco' },
                { src: '/gallery-optimized/_ccs-16.webp', alt: 'Party celebration' },
                { src: '/gallery-optimized/_ccs-21.webp', alt: 'Friends cruising' },
                { src: '/gallery-optimized/_CCS-25.webp', alt: 'Boat party group' },
                { src: '/gallery-optimized/_CCS-32.webp', alt: 'Party boat fun' },
                { src: '/gallery-optimized/_CCS-36.webp', alt: 'Cruise celebration' },
                { src: '/gallery-optimized/_CCS-39.webp', alt: 'Group photo' },
                { src: '/gallery-optimized/_CCS-40.webp', alt: 'Party cruise' },
                { src: '/gallery-optimized/_CCS-42.webp', alt: 'Lake Travis fun' },
                { src: '/gallery-optimized/_CCS-49.webp', alt: 'Disco party' },
                { src: '/gallery-optimized/_CCS-55.webp', alt: 'Friends on boat' },
                { src: '/gallery-optimized/_CCS-57.webp', alt: 'Party atmosphere' },
                { src: '/gallery-optimized/_CCS-67.webp', alt: 'Celebration cruise' },
                { src: '/gallery-optimized/_CCS-69.webp', alt: 'Group celebration' },
                { src: '/gallery-optimized/_ccs-70.webp', alt: 'Party boat' },
                { src: '/gallery-optimized/_CCS-75.webp', alt: 'Lake Travis party' },
                { src: '/gallery-optimized/_CCS-84.webp', alt: 'Disco cruise' },
                { src: '/gallery-optimized/_CCS-85.webp', alt: 'Friends partying' },
                { src: '/gallery-optimized/_CCS-87.webp', alt: 'Boat celebration' },
                { src: '/gallery-optimized/_CCS-88.webp', alt: 'Party cruise fun' },
                { src: '/gallery-optimized/_CCS-89.webp', alt: 'Group on cruise' },
                { src: '/gallery-optimized/_ccs-90.webp', alt: 'Lake Travis cruise' },
                { src: '/gallery-optimized/_CCS-91.webp', alt: 'Party celebration' },
                { src: '/gallery-optimized/_CCS-92.webp', alt: 'Disco party fun' },
                { src: '/attached_assets/disco_fun_best2_1765193453547.jpg', alt: 'Bachelorette group on rainbow float' },
                { src: '/attached_assets/disco_fun5_1765193453548.jpg', alt: 'Champagne spray celebration' },
                { src: '/attached_assets/disco_fun2_1765193453547.jpg', alt: 'Bachelorette group with sun hats' },
                { src: '/attached_assets/disco_fun3_1765193453548.jpg', alt: 'Party group with heart sunglasses' },
              ].map((photo, idx) => (
                <Card
                  key={idx}
                  className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                >
                  <div className="aspect-square relative overflow-hidden">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <Camera className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </SectionReveal>
        </div>
      </section>

      {/* Fleet Photos Section */}
      <section className="py-6 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-950">
        <div className="max-w-7xl mx-auto px-6">
          <SectionReveal>
            <div className="text-center mb-4">
              <div className="flex items-center justify-center gap-4 mb-2">
                <Ship className="h-10 w-10 text-blue-600" />
                <h2 className="text-4xl heading-unbounded font-bold text-gray-900 dark:text-white">
                  Our Fleet
                </h2>
                <Ship className="h-10 w-10 text-blue-600" />
              </div>
              <p className="text-base text-gray-600 dark:text-gray-300">
                Explore our custom-built party boats - See every detail before you book
              </p>
            </div>
          </SectionReveal>

          {/* Clever Girl Subsection */}
          <SectionReveal>
            <div className="mb-20">
              <div className="text-center mb-8">
                <h3 className="text-3xl heading-unbounded font-bold text-gray-900 dark:text-white mb-2">Clever Girl</h3>
                <p className="text-base text-gray-600 dark:text-gray-400">Our flagship 50-person party boat with 14 disco balls</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { src: '/attached_assets/clever girl-1 lake travis party boat rental_1763966476656.jpg', alt: 'Clever Girl deck with Texas star' },
                  { src: '/attached_assets/clever girl-2 party boat rental austin_1763966476657.jpg', alt: 'Clever Girl main deck view' },
                  { src: '/attached_assets/clever girl-3 bachelorette party boat austin_1763966476657.jpg', alt: 'Clever Girl disco balls' },
                  { src: '/attached_assets/clever girl-4 party boat rental austin_1763966476657.jpg', alt: 'Clever Girl seating area' },
                  { src: '/attached_assets/clever girl-6 party boat lake travis_1763966476657.jpg', alt: 'Clever Girl shaded deck' },
                  { src: '/attached_assets/clever girl-8 party boat rental austin_1763966476658.jpg', alt: 'Clever Girl lake views' },
                  { src: '/attached_assets/clever girl-9 party boat austin_1763966476658.jpg', alt: 'Clever Girl bow area' },
                  { src: '/attached_assets/clever girl-10 austin bachelorette party_1763966476658.jpg', alt: 'Clever Girl on water' },
                ].map((photo, idx) => (
                  <Card
                    key={idx}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Meeseeks / The Irony Subsection */}
          <SectionReveal>
            <div className="mb-20">
              <div className="text-center mb-8">
                <h3 className="text-3xl heading-unbounded font-bold text-gray-900 dark:text-white mb-2">Meeseeks / The Irony</h3>
                <p className="text-base text-gray-600 dark:text-gray-400">Twin 25-person boats for medium-sized celebrations</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { src: '/attached_assets/meeseeks-25-person-boat.webp', alt: 'Meeseeks party boat' },
                  { src: '/attached_assets/meeseeks-1_1763968010088.jpg', alt: 'Meeseeks seating area with lake views' },
                  { src: '/attached_assets/meeseeks-2_1763968010089.jpg', alt: 'Meeseeks covered deck' },
                  { src: '/attached_assets/meeseeks-3 lake travis party boat_1763968010089.jpg', alt: 'Meeseeks full deck view' },
                  { src: '/attached_assets/meeseeks-4 austin party boat rental_1763968010090.jpg', alt: 'Meeseeks cabin and seating' },
                  { src: '/attached_assets/meeseeks-5 austin party barge rental_1763968010090.jpg', alt: 'Meeseeks open air deck' },
                  { src: '/attached_assets/the irony -3 party boat rental austin_1763968010090.jpg', alt: 'The Irony twin boat full view' },
                  { src: '/attached_assets/the irony-2 party boat rental austin_1763968010090.jpg', alt: 'The Irony deck view' },
                ].map((photo, idx) => (
                  <Card
                    key={idx}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </SectionReveal>

          {/* Day Tripper Subsection */}
          <SectionReveal>
            <div className="mb-20">
              <div className="text-center mb-8">
                <h3 className="text-3xl heading-unbounded font-bold text-gray-900 dark:text-white mb-2">Day Tripper</h3>
                <p className="text-base text-gray-600 dark:text-gray-400">Perfect for intimate gatherings up to 14 guests</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {[
                  { src: '/attached_assets/day-tripper-14-person-boat.webp', alt: 'Day Tripper party boat' },
                  { src: '/attached_assets/day tripper - party boat rental austin_1763968078448.jpg', alt: 'Day Tripper shaded seating area' },
                  { src: '/attached_assets/day tripper-1 party boat with captain austin_1763968078449.jpg', alt: 'Day Tripper rear deck view' },
                  { src: '/attached_assets/day tripper-2 party boat austin lake travis_1763968078449.jpg', alt: 'Day Tripper interior deck layout' },
                  { src: '/attached_assets/day tripper-3 party boat austin_1763968078451.jpg', alt: 'Day Tripper bow view' },
                  { src: '/attached_assets/day tripper-5 party barge lake travis_1763968078452.jpg', alt: 'Day Tripper cabin and deck' },
                  { src: '/attached_assets/day tripper-6 party boat austin_1763968078452.jpg', alt: 'Day Tripper safety features' },
                ].map((photo, idx) => (
                  <Card
                    key={idx}
                    className="group cursor-pointer overflow-hidden hover:shadow-xl transition-all duration-300 p-0 rounded-xl"
                  >
                    <div className="aspect-square relative overflow-hidden">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <Camera className="h-6 w-6 text-white" />
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>


      {/* CTA Section */}
      <SectionReveal>
        <section className="py-24 bg-white dark:bg-gray-950">
          <div className="max-w-7xl mx-auto px-6 text-center">
            <h3 className="text-3xl heading-unbounded font-bold mb-6 text-gray-900 dark:text-white">
              Ready to Create Your Own Memories?
            </h3>
            <p className="text-base text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
              Book your Lake Travis adventure today and join thousands of happy customers
            </p>
            <div
              className="xola-custom xola-checkout inline-block"
              data-button-id="695186923c261203770cc2e7"
              data-testid="button-gallery-book-now"
            >
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold text-base px-12 py-6 rounded-xl"
              >
                <Calendar className="mr-3 h-6 w-6" />
                BOOK YOUR CRUISE NOW
              </Button>
            </div>
          </div>
        </section>
      </SectionReveal>

      {/* Lightbox */}
      <Dialog open={lightboxOpen} onOpenChange={setLightboxOpen}>
        <DialogContent className="max-w-7xl w-full p-0 bg-black rounded-xl">
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-4 right-4 z-50 p-2 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
            data-testid="button-close-lightbox"
          >
            <X className="h-6 w-6" />
          </button>
          
          {filteredPhotos.length > 0 && filteredPhotos[selectedIndex] && (
            <>
              <div className="relative w-full h-[80vh] flex items-center justify-center">
                <img
                  src={filteredPhotos[selectedIndex].filePath || `/api/media/view/${filteredPhotos[selectedIndex].id}`}
                  alt={filteredPhotos[selectedIndex].altText || filteredPhotos[selectedIndex].originalName}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              {filteredPhotos.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    data-testid="button-prev-photo"
                  >
                    <ChevronLeft className="h-8 w-8" />
                  </button>
                  <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-black/50 hover:bg-black/70 rounded-full text-white transition-colors"
                    data-testid="button-next-photo"
                  >
                    <ChevronRight className="h-8 w-8" />
                  </button>
                </>
              )}

              <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-4">
                <p className="text-center text-base">
                  {selectedIndex + 1} / {filteredPhotos.length}
                </p>
                {filteredPhotos[selectedIndex].title && (
                  <p className="text-center text-sm text-gray-300 mt-1">
                    {filteredPhotos[selectedIndex].title}
                  </p>
                )}
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </div>
  );
}
