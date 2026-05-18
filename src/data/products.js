export const products = [
  {
    slug: 'crystal-golem',
    name: 'Crystal Golem',
    price: 12.00,
    description: 'Highly detailed 28mm crystal golem miniature...',
    image: '/images/shop/crystal-golem.JPG',
    materials: ['Resin'],
    scale: '28mm',
    inStock: true,
    collections: ['wargame', 'resin'],
    tags: ['Miniature', 'Sci-Fi', '28mm', 'Resin'],
    stripeLink: 'https://buy.stripe.com/yourlink'
  },
  {
    slug: 'dragon',
    name: 'Dragon',
    price: 25.00,
    description: 'Powerful dragon miniature...',
    image: '/images/shop/dragon.jpg',
    materials: ['Resin'],
    scale: '75mm',
    inStock: true,
    collections: ['wargame', 'resin'],
    tags: ['Miniature', 'Fantasy', '75mm', 'Resin'],
    stripeLink: 'https://buy.stripe.com/yourlink'
  },
    {
    slug: 'bed-slat-holder',
    name: 'Bed Slat Holder',
    price: 25.00,
    description: 'Bed slat holder for securing slats in place...',
    image: '/images/shop/bed-slat-holder.jpg',
    materials: ['PLA+', 'PETG', 'ASA'],
    scale: '100mm',
    inStock: true,
    collections: ['diy', 'fdm'],
    tags: ['DIY', 'Practical', 'FDM'],
    stripeLinks: {
        'PLA+': 'https://buy.stripe.com/link1',
        'PETG': 'https://buy.stripe.com/link2',
        'ASA': 'https://buy.stripe.com/link3',
    }
  }
]

export const collections = [
  { slug: 'resin', name: 'Resin Prints', description: 'High detail resin printed models and miniatures.' },
  { slug: 'fdm', name: 'FDM Prints', description: 'Durable FDM printed parts and models.' },
  { slug: 'wargame', name: 'Wargame', description: 'Miniatures for tabletop wargaming.' },
  { slug: 'vehicle', name: 'Vehicles', description: 'Scale vehicles and automotive models.' },
  { slug: 'diy', name: 'DIY & Practical', description: 'Useful items and tools for everyday use.' }
]