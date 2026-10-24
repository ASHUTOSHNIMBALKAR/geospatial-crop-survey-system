export interface CropData {
  id: string;
  name: string;
  type: 'Kharif' | 'Rabi' | 'Zaid';
  area: number; // in hectares
  health: number; // 0-1 (NDVI)
  yield: number; // forecast in tons
  coords: [number, number];
  status: 'Ready' | 'Harvested' | 'Stressed' | 'Optimal';
  district: string;
  taluka: string;
  carbonCredits?: number;
}

export const CROP_DISTRIBUTION = [
  { name: 'Sugarcane', value: 4500, color: '#10b981' },
  { name: 'Grapes', value: 3800, color: '#3b82f6' },
  { name: 'Onions', value: 2100, color: '#f59e0b' },
  { name: 'Pomegranate', value: 1200, color: '#ef4444' },
];

export const MAHARASHTRA_CROP_SAMPLES: CropData[] = [
  { id: '1', name: 'Pune WEST - Sugarcane', type: 'Kharif', area: 124, health: 0.76, yield: 240, coords: [18.5204, 73.8567], status: 'Optimal', district: 'Pune', taluka: 'Haveli', carbonCredits: 12.5 },
  { id: '2', name: 'Nashik - Grapes', type: 'Rabi', area: 54, health: 0.89, yield: 110, coords: [20.0056, 73.7898], status: 'Ready', district: 'Nashik', taluka: 'Niphad', carbonCredits: 8.2 },
  { id: '3', name: 'Junnar - Onions', type: 'Rabi', area: 210, health: 0.65, yield: 450, coords: [19.2104, 73.8667], status: 'Stressed', district: 'Pune', taluka: 'Junnar', carbonCredits: 4.1 },
  { id: '4', name: 'Shirur - Pomegranate', type: 'Kharif', area: 95, health: 0.72, yield: 180, coords: [18.8282, 74.3733], status: 'Optimal', district: 'Pune', taluka: 'Shirur', carbonCredits: 15.6 },
  { id: '5', name: 'Solapur - Grapes', type: 'Rabi', area: 320, health: 0.55, yield: 640, coords: [17.6599, 75.9064], status: 'Harvested', district: 'Solapur', taluka: 'South Solapur', carbonCredits: 2.3 },
  { id: '6', name: 'Purandar - Custard Apple', type: 'Kharif', area: 85, health: 0.82, yield: 140, coords: [18.2833, 73.9667], status: 'Optimal', district: 'Pune', taluka: 'Purandar', carbonCredits: 18.2 },
  { id: '7', name: 'Baramati - Sugarcane', type: 'Kharif', area: 410, health: 0.92, yield: 820, coords: [18.1500, 74.5833], status: 'Ready', district: 'Pune', taluka: 'Baramati', carbonCredits: 25.4 },
];

export const HISTORY_DATA = [
  { month: 'Jan', yield: 450, rain: 20 },
  { month: 'Feb', yield: 480, rain: 25 },
  { month: 'Mar', yield: 520, rain: 15 },
  { month: 'Apr', yield: 600, rain: 10 },
  { month: 'May', yield: 580, rain: 5 },
  { month: 'Jun', yield: 700, rain: 240 },
  { month: 'Jul', yield: 850, rain: 380 },
];

export const FIELD_SURVEYS = [
  { 
    id: 'S1', 
    farmer: 'Arjun P.', 
    image: 'https://images.unsplash.com/photo-1592982537447-7440770cbfc9?auto=format&fit=crop&q=80&w=400', 
    tags: ['Verified', 'Sugarcane'], 
    time: '2h ago',
    date: '2026-03-24',
    lat: 18.52,
    lng: 73.85,
    location: 'Haveli, Pune'
  },
  { 
    id: 'S2', 
    farmer: 'Vithal R.', 
    image: 'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=400', 
    tags: ['Water Stress', 'Onions'], 
    time: '5h ago',
    date: '2026-03-24',
    lat: 19.21,
    lng: 73.87,
    location: 'Junnar, Pune'
  },
  { 
    id: 'S3', 
    farmer: 'Ganesh S.', 
    image: 'https://images.unsplash.com/photo-1594916844976-54181827473d?auto=format&fit=crop&q=80&w=400', 
    tags: ['Optimal', 'Grapes'], 
    time: '8h ago',
    date: '2026-03-23',
    lat: 18.28,
    lng: 73.97,
    location: 'Purandar, Pune'
  },
];

export const SUSTAINABILITY_STATS = [
  { name: 'Soil Organic Carbon', value: 0.85, target: 1.2 },
  { name: 'Water Usage Efficiency', value: 72, target: 90 },
  { name: 'Carbon Credits Generated', value: 12480, target: 20000 },
];












