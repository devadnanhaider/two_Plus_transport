import { COMPANY_INFO } from './companyInfo';

export interface ServiceItem {
  id: string;
  title: string;
  shortDesc: string;
  description: string;
  image: string;
  features: string[];
  iconName: string;
  pricingStarting: string;
}

export interface Vehicle {
  id: string;
  name: string;
  category: 'Bus' | 'Van' | 'Luxury Sedan' | 'Tow Truck';
  capacity: string;
  features: string[];
  image: string;
  ratePerHour: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  comment: string;
  rating: number;
  avatar: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  image: string;
}

export const SERVICES_DATA: ServiceItem[] = [
  {
    id: 'staff-transportation',
    title: 'Staff Transportation',
    shortDesc: 'Reliable, scheduled daily corporate & industrial employee shuttle solutions.',
    description: 'Demand Transport provides cost-effective, punctual corporate commuting services. We ensure your workforce arrives safely and comfortably on site, with dedicated routes, GPS fleet tracking, and climate-controlled luxury coaches.',
    image: '/images/school-staff.jpg',
    features: ['Fixed Route Schedules', 'GPS Live Tracking', 'AC Luxury Buses', 'Professional Uniformed Drivers', '24/7 Dispatch Control'],
    iconName: 'Users',
    pricingStarting: 'QAR 250 / Day'
  },
  {
    id: 'school-transportation',
    title: 'School Transportation',
    shortDesc: 'Highest safety standard student transit with certified drivers and real-time monitoring.',
    description: 'Prioritizing child safety above all. Safe, dependable school bus fleet equipped with seatbelts, female bus supervisors, CCTV cameras, and mobile app parent notification systems.',
    image: '/images/school-staff.jpg',
    features: ['Certified School Drivers', 'Child Safety Seatbelts', 'Female Bus Attendants', 'Parent Mobile Alerts', 'Regular Fleet Sanitization'],
    iconName: 'GraduationCap',
    pricingStarting: 'QAR 180 / Month per Student'
  },
  {
    id: 'airport-transportation',
    title: 'Airport Taxi & VIP Transfers',
    shortDesc: 'Punctual, stress-free airport pickup & drop-off with flight delay tracking.',
    description: 'Experience premium airport transfers with meet-and-greet services. Our executive chauffeurs monitor your flight status in real-time, ensuring seamless airport arrivals and departures in executive sedans and luxury vans.',
    image: '/images/airport-transport.jpg',
    features: ['Flight Delay Monitoring', 'Flight Hall Meet & Greet', 'Luxury Mercedes & Cadillac Fleet', 'Luggage Assistance', 'Fixed Flat Rates'],
    iconName: 'Plane',
    pricingStarting: 'QAR 120 / Trip'
  },
  {
    id: 'valet-parking',
    title: 'Valet Parking Services',
    shortDesc: 'VIP valet parking management for hotels, grand events, restaurants & venues.',
    description: 'Elevate your venue’s guest experience with our polished valet parking team. Trained attendants, secure vehicle handling, computerized key management, and full comprehensive insurance coverage.',
    image: '/images/valet-parking.jpg',
    features: ['Uniformed Professional Staff', 'Digital Ticket & Key Registry', 'Full Liability Insurance', 'VIP Guest Concierge', 'Peak Event Capacity Management'],
    iconName: 'Car',
    pricingStarting: 'QAR 350 / Event'
  },
  {
    id: 'tour-packages',
    title: 'Tour & Sightseeing Packages',
    shortDesc: 'Custom city tours, desert safari charters, and group sightseeing excursions.',
    description: 'Discover Qatar in luxury and comfort. We offer tailored tour itineraries for corporate delegates, tourist groups, and VIP guests, featuring multilingual tour guides and premium transport.',
    image: '/images/hero-fleet.jpg',
    features: ['Multilingual Tour Guides', 'Customizable Sightseeing Routes', 'Refreshment Amenities', 'Desert Safari Vans', 'Group Discount Packages'],
    iconName: 'Compass',
    pricingStarting: 'QAR 450 / Full Day'
  },
  {
    id: 'towing-breakdown',
    title: 'Towing & Roadside Assistance',
    shortDesc: '24/7 fast dispatch flatbed towing, breakdown rescue, and vehicle recovery.',
    description: 'Stranded on the road? Our heavy-duty hydraulic flatbed tow trucks provide instant emergency towing, jump-start assistance, tire change, and secure car transport across Qatar.',
    image: '/images/towing-service.jpg',
    features: ['Rapid 15-Minute Response', 'Hydraulic Tilt Flatbeds', 'Zero-Damage Wheel Strapping', 'Interstate Vehicle Hauling', '24/7 Hotline Support'],
    iconName: 'Truck',
    pricingStarting: 'QAR 100 / Tow'
  }
];

export const FLEET_DATA: Vehicle[] = [
  {
    id: 'fleet-1',
    name: 'Luxury Executive Coach (50-Seater)',
    category: 'Bus',
    capacity: '50 Passengers',
    features: ['Reclining Leather Seats', 'High-Speed Wi-Fi', 'Onboard Entertainment', 'Climate Control'],
    image: '/images/school-staff.jpg',
    ratePerHour: 'QAR 350 / Hr'
  },
  {
    id: 'fleet-2',
    name: 'Mercedes-Benz V-Class VIP Van',
    category: 'Van',
    capacity: '7 Passengers',
    features: ['VIP Conference Seating', 'Ambient Lighting', 'Privacy Glass', 'Refreshment Bar'],
    image: '/images/airport-transport.jpg',
    ratePerHour: 'QAR 180 / Hr'
  },
  {
    id: 'fleet-3',
    name: 'Cadillac Escalade Platinum SUV',
    category: 'Luxury Sedan',
    capacity: '6 Passengers',
    features: ['Bose Surround Audio', 'Panoramic Sunroof', 'Chauffeur Service', 'Full Leather Interior'],
    image: '/images/airport-transport.jpg',
    ratePerHour: 'QAR 220 / Hr'
  },
  {
    id: 'fleet-4',
    name: 'Toyota Coaster Commuter Shuttle',
    category: 'Bus',
    capacity: '22 Passengers',
    features: ['Spacious Luggage Bay', 'Dual AC Compressors', 'Tinted Windows', 'Automated Side Door'],
    image: '/images/hero-fleet.jpg',
    ratePerHour: 'QAR 150 / Hr'
  },
  {
    id: 'fleet-5',
    name: 'Heavy Duty Hydraulic Flatbed Tow Truck',
    category: 'Tow Truck',
    capacity: 'Up to 5 Tons',
    features: ['Full Tilt Hydraulics', 'Soft-Strap Tie Down', 'Winch Assistance', 'GPS Navigation'],
    image: '/images/towing-service.jpg',
    ratePerHour: 'QAR 120 / Trip'
  }
];

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 't1',
    name: 'Sheikh Hamad Al-Thani',
    role: 'Event Director',
    company: 'Doha International Summit',
    comment: 'Demand Transport managed our VIP valet parking and delegation shuttles flawlessly. Their drivers were punctual, polite, and handled over 400 executive vehicles with zero hassle.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't2',
    name: 'Sarah Jenkins',
    role: 'HR & Facilities Head',
    company: 'Global Energy Qatar',
    comment: 'We have been using Demand Transport for our daily staff transportation for over 2 years. Their buses are immaculate and on-time every single morning.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 't3',
    name: 'Mohammed Al-Kuwari',
    role: 'Operations Director',
    company: 'St. Regis Resort',
    comment: 'The valet parking crew provided by Demand Transport is top notch. Premium service quality that perfectly matches our 5-star hotel reputation.',
    rating: 5,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80'
  }
];

export const BLOGS_DATA: BlogPost[] = [
  {
    id: 'b1',
    title: 'Top Benefits of Outsourcing Corporate Staff Transportation in Qatar',
    excerpt: 'Discover how dedicated corporate shuttles boost employee productivity, reduce parking congestion, and save operating expenses.',
    date: 'Sep 24, 2026',
    author: 'Transport Insights Team',
    category: 'Corporate Fleet',
    readTime: '4 min read',
    image: '/images/school-staff.jpg'
  },
  {
    id: 'b2',
    title: 'Safety First: Essential School Bus Security Features Every Parent Should Know',
    excerpt: 'A comprehensive guide on GPS tracking, seatbelt compliance, and supervisor protocols in modern student transit.',
    date: 'Sep 18, 2026',
    author: 'Safety Directorate',
    category: 'School Transport',
    readTime: '6 min read',
    image: '/images/hero-fleet.jpg'
  },
  {
    id: 'b3',
    title: 'How Professional Valet Parking Transforms High-End Hospitality & Events',
    excerpt: 'First impressions matter. Learn why luxury venues in Doha trust specialized valet management teams.',
    date: 'Sep 10, 2026',
    author: 'Valet Operations',
    category: 'Valet Services',
    readTime: '5 min read',
    image: '/images/valet-parking.jpg'
  }
];

export const TEAM_MEMBERS = [
  {
    name: 'Kadir Miye',
    role: 'Chief Executive Officer',
    email: COMPANY_INFO.email,
    phone: COMPANY_INFO.mobileDisplay,
    image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=400&auto=format&fit=crop&q=80'
  },
  {
    name: 'Tariq Al-Mansoor',
    role: 'Head of Fleet & Logistics',
    email: COMPANY_INFO.email,
    phone: COMPANY_INFO.mobileDisplay,
    image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&auto=format&fit=crop&q=80'
  },
  {
    name: 'Aisha Al-Hassan',
    role: 'Director of Valet & Hospitality',
    email: COMPANY_INFO.email,
    phone: COMPANY_INFO.mobileDisplay,
    image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&auto=format&fit=crop&q=80'
  },
  {
    name: 'Faisal Rahman',
    role: 'Safety & Dispatch Control Lead',
    email: COMPANY_INFO.email,
    phone: COMPANY_INFO.landlineDisplay,
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&auto=format&fit=crop&q=80'
  }
];
