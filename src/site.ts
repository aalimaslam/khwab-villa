export const SITE = {
  name: 'Khwab Villa',
  url: 'https://khwabvilla.com',
  tagline: 'A Dream Stay in Kashmir’s Serenity',
  description:
    'Khwab Villa in Preng, Kangan, Ganderbal is a luxurious five-bedroom Kashmiri retreat surrounded by mountains, orchard gardens and the Sindh River — with bonfire, BBQ, gazebo, games room and a cozy library.',
  address: {
    street: 'Preng, Kangan',
    locality: 'Ganderbal',
    region: 'Jammu & Kashmir',
    postalCode: '191202',
    country: 'IN',
    full: 'Preng, Kangan, Jammu & Kashmir - 191202',
  },
  phones: ['+91-8899211010', '+91-8899004526'],
  whatsapp: '918899211010',
  email: 'khwabvillakashmir@gmail.com',
  price: 'Rs. 12,000',
  maps: 'https://maps.google.com/?cid=2185475502506331522',
  geo: { lat: 34.277258, lng: 74.864232 },
  mapEmbed:
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3296.8742856381855!2d74.86423177629824!3d34.27725780581433!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x38e179f7d131fae3%3A0x1e545e63f0354d82!2skhwab%20Villa%20%7C%20A%20Luxury%20Stay!5e0!3m2!1sen!2sin!4v1790770486176!5m2!1sen!2sin',
};

export const NAV = [
  { href: '/', label: 'Home' },
  { href: '/rooms/', label: 'Rooms' },
  { href: '/gallery/', label: 'Gallery' },
  { href: '/attractions/', label: 'Explore' },
  { href: '/blog/', label: 'Blogs' },
  { href: '/about/', label: 'About' },
];

export const FACILITIES: [string, string][] = [
  ['garden', 'Garden'], ['shield', 'Safety & Security'], ['game', 'Indoor/Outdoor Games'], ['car', 'Parking Area'],
  ['gazebo', 'Gazebo'], ['cctv', 'CCTV Surveillance'], ['ext', 'Fire Extinguisher'], ['wifi', 'Free Wi-Fi'],
  ['balcony', 'Balcony / Terrace'], ['work', 'Workstation'], ['water', 'Water Purifier'], ['music', 'Music System'],
  ['bbq', 'BBQ Facility'], ['fridge', 'Refrigerator'], ['fire', 'Bonfire'], ['mountain', 'Mountain View'],
];

export const ROOM_AMENITIES = [
  'King-Size Bed', 'Air Conditioning', 'Wi-Fi', 'TV', 'Workstation', 'Wardrobe', 'Attached Bathroom', 'Power Backup',
  'Geyser', 'Toiletries', 'Hair Dryer', 'Extra Mattress', 'Seating Area', 'Private Balcony', 'Hangers', 'Towels',
];

export const ATTRACTIONS = [
  { name: 'Sindh River', distance: 'Walking distance', text: 'Flowing through enchanting valleys, the Sindh offers serene picnics, leisure walks and a picturesque backdrop for photography. Adventure enthusiasts can enjoy angling and rafting in its cool, rushing waters.' },
  { name: 'Wayil', distance: '≈ 8.8 km', text: 'A picturesque summer retreat in Ganderbal known for lush greenery, a cool climate and stunning mountain views — a peaceful escape for nature lovers and trekkers along serene riverbanks.' },
  { name: 'Kheer Bhawani Temple', distance: '≈ 18.4 km', text: 'A revered shrine in Tulmulla dedicated to Goddess Ragnya Devi, surrounded by chinar trees and a sacred spring known for its colour-changing waters. It draws thousands of devotees, especially on Jyeshtha Ashtami.' },
  { name: 'Naranag Temple', distance: '≈ 18.7 km', text: 'An 8th-century stone-carved temple complex dedicated to Lord Shiva, surrounded by meadows and mountains — a favourite of trekkers and history enthusiasts.' },
  { name: 'Manasbal Lake', distance: '≈ 23.2 km', text: 'Known for clear waters and blooming lotus flowers, Manasbal is a paradise for birdwatchers, with boating that makes it perfect for relaxation and photography.' },
  { name: 'Sonmarg', distance: '≈ 47.9 km', text: 'The “Meadow of Gold” — snow-capped peaks, lush meadows and gushing rivers. A hub for trekking, camping and horseback riding, and skiing and snowboarding in winter.' },
];

export const GALLERY: { src: string; cap: string; cat: string }[] = [
  { src: 'night-view', cap: 'Khwab Villa at dusk', cat: 'villa' },
  { src: 'bedroom-1', cap: 'Super Deluxe room', cat: 'rooms' },
  { src: 'garden-table', cap: 'Breakfast on the lawn', cat: 'dining' },
  { src: 'blossom-view', cap: 'Spring blossoms', cat: 'villa' },
  { src: 'bonfire-villa', cap: 'Bonfire evenings', cat: 'evenings' },
  { src: 'living-room', cap: 'Living room & fireplace', cat: 'rooms' },
  { src: 'drone-valley', cap: 'Aerial view of the valley', cat: 'villa' },
  { src: 'chef-serving', cap: 'Our chef at work', cat: 'dining' },
  { src: 'bedroom-6', cap: 'Carved walnut bed', cat: 'rooms' },
  { src: 'front-view-1', cap: 'The front lawn', cat: 'villa' },
  { src: 'breakfast-table', cap: 'Fresh breakfast spread', cat: 'dining' },
  { src: 'bathroom-1', cap: 'Attached bathroom', cat: 'rooms' },
  { src: 'drone-night', cap: 'The villa by night', cat: 'evenings' },
  { src: 'dining-room', cap: 'Dining & lounge', cat: 'dining' },
  { src: 'bedroom-3', cap: 'Bedroom with workstation', cat: 'rooms' },
  { src: 'balcony-view', cap: 'Balcony mountain views', cat: 'villa' },
  { src: 'bonfire-1', cap: 'Fireside under the stars', cat: 'evenings' },
  { src: 'bedroom-7', cap: 'Sunlit bedroom', cat: 'rooms' },
  { src: 'front-garden', cap: 'Garden & façade', cat: 'villa' },
  { src: 'chef-breakfast', cap: 'Chef-served breakfast', cat: 'dining' },
  { src: 'bedroom-9', cap: 'Cozy corners', cat: 'rooms' },
  { src: 'bonfire-2', cap: 'Evening warmth', cat: 'evenings' },
  { src: 'bathroom-3', cap: 'Rain shower', cat: 'rooms' },
  { src: 'front-view-2', cap: 'Framed by pines', cat: 'villa' },
  { src: 'garden-breakfast', cap: 'Breakfast with a view', cat: 'dining' },
  { src: 'bedroom-5', cap: 'Mountain-facing windows', cat: 'rooms' },
  { src: 'bathroom-2', cap: 'Glass shower & vanity', cat: 'rooms' },
  { src: 'bedroom-4', cap: 'Blue accent suite', cat: 'rooms' },
  { src: 'bedroom-8', cap: 'Warm wooden interiors', cat: 'rooms' },
  { src: 'bathroom-4', cap: 'Bright, modern bath', cat: 'rooms' },
];

