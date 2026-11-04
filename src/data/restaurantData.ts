import { MenuItem, SignatureDish, GalleryItem } from '../types/restaurant';

export const RESTAURANT_INFO = {
  name: 'AURELIA',
  fullName: 'AURELIA Mayfair',
  tagline: 'Haute Cuisine, Open Hearth & Rare Terroir',
  michelinStars: 3,
  accolades: [
    '3 Michelin Stars (2024 - 2026)',
    "The World's 50 Best Restaurants #12",
    'Relais & Châteaux Grand Chef',
    'Wine Spectator Grand Award of Excellence'
  ],
  address: '42 Mayfair Promenade, London W1J 8HQ, United Kingdom',
  phone: '+44 (0) 20 7946 0888',
  email: 'concierge@aurelia-dining.com',
  whatsapp: '+44 7911 123456',
  openingHours: [
    { days: 'Tuesday - Thursday', dinner: '17:30 - 23:00', lunch: '12:00 - 14:30' },
    { days: 'Friday - Saturday', dinner: '17:00 - 23:30', lunch: '12:00 - 15:00' },
    { days: 'Sunday', dinner: '17:30 - 22:30', lunch: '12:00 - 15:30' },
    { days: 'Monday', dinner: 'Closed (Private Salon Bookings Only)', lunch: 'Closed' }
  ],
  dressCode: 'Elegant Attire requested. Collared shirts and jackets recommended for gentlemen. Athletic wear not permitted.',
  valetService: 'Complimentary white-glove valet parking available at our private porte-cochère on Curzon Street.'
};

export const SIGNATURE_DISHES: SignatureDish[] = [
  {
    id: 'wagyu-truffle-reserve',
    title: 'A5 Miyazaki Wagyu & Périgord Truffle',
    subtitle: '72-Hour Glaze · Smoked Parsnip Emulsion · Glazed Morel Crowns',
    category: 'Grilled Specialties',
    price: 135,
    description: 'Prized Japanese Miyazaki A5 tenderloin seared over binchotan white charcoal to medium-rare perfection. Rested in bone marrow butter, accented with shaved winter black truffle, smoked parsnip puree, glazed wild morels, and delicate flakes of 24-karat edible gold.',
    ingredients: [
      'A5 Miyazaki Beef (Miyazaki Prefecture, Japan)',
      'Black Périgord Truffles (Dordogne, France)',
      'Wild French Morel Mushrooms',
      'Smoked Jersey Cream Parsnip Puree',
      '24-Karat Edible Gold Leaf',
      'Aged Madeira Jus'
    ],
    technique: 'Direct high-heat binchotan charcoal sear at 800°C followed by a 14-minute low-temperature butter baste with thyme and charred garlic.',
    winePairing: '2016 Château Pontet-Canet, Pauillac Grand Cru Classé',
    image: '/src/assets/images/dish_wagyu_truffle_1793791698385.jpg',
    servingTemperature: '54°C Core',
    prepTime: '28 min'
  },
  {
    id: 'hokkaido-scallops-caviar',
    title: 'Pan-Seared Hokkaido Scallops & Royal Caviar',
    subtitle: 'Saffron Velouté · Imperial Ossetra Caviar · Sea Fennel Emulsion',
    category: 'Seafood',
    price: 88,
    description: 'Diver-caught Hokkaido sea scallops caramelized in clarified noisette butter, perched over a velvety saffron and white wine velouté, crowned with Royal Ossetra sturgeon caviar and emerald drops of foraged samphire oil.',
    ingredients: [
      'Wild Diver Scallops (Hokkaido, Japan)',
      'Royal Ossetra Sturgeon Caviar (Caspian origin)',
      'Kashmir Saffron (Grade A1)',
      'Crispy Sea Fennel & Coastal Samphire',
      'Cold-Pressed Chive Essence'
    ],
    technique: 'Flash-seared in copper pans for exactly 90 seconds on a single face to preserve raw crystalline sweetness in the core.',
    winePairing: '2020 Domaine Leflaive Puligny-Montrachet 1er Cru',
    image: '/src/assets/images/dish_hokkaido_scallop_1793791699576.jpg',
    servingTemperature: '48°C Core',
    prepTime: '18 min'
  },
  {
    id: 'dry-aged-duck-lavender',
    title: 'Dry-Aged Challandais Duck with Wild Lavender Honey',
    subtitle: 'Black Cherry Gastrique · Heirloom Beetroot Mosaic · Cacao Nib Jus',
    category: 'Main Courses',
    price: 92,
    description: 'Challans duck breast dry-aged on Himalayan salt blocks for 21 days. Roasted with lavender blossom honey and Sichuan peppercorns, accompanied by multi-textured heirloom beetroots and bitter Valrhona cacao jus.',
    ingredients: [
      '21-Day Salt-Aged Challandais Duck (Vendée, France)',
      'Wild Mountain Lavender Honey (Provence)',
      'Chioggia & Golden Roasted Beetroots',
      'Valrhona Guanaja 70% Dark Cacao',
      'Aged Balsamico di Modena Tradizionale'
    ],
    technique: 'Slow skin rendering over cedar planks with fragrant hay smoke infusion.',
    winePairing: '2018 Domaine Dujac Morey-Saint-Denis, Burgundy',
    image: '/src/assets/images/dish_wagyu_truffle_1793791698385.jpg',
    servingTemperature: '52°C Core',
    prepTime: '35 min'
  }
];

export const MENU_ITEMS: MenuItem[] = [
  // Starters
  {
    id: 'starter-1',
    name: 'Imperial Ossetra Caviar Tartlet',
    frenchName: 'Tartelette au Caviar Impérial',
    category: 'starters',
    price: 58,
    dietary: ['Signature'],
    description: 'Buckwheat sablé with smoked crème fraîche, cured quail egg yolk emulsion, and golden Ossetra pearls.',
    ingredients: ['Royal Ossetra Caviar', 'Buckwheat Crust', 'Normandy Crème Fraîche', 'Chive Oil'],
    winePairing: 'Krug Grande Cuvée 170th Edition Brut Champagne',
    origin: 'Brittany, France'
  },
  {
    id: 'starter-2',
    name: 'Heirloom Tomato & White Truffle Carpaccio',
    frenchName: 'Carpaccio de Tomates & Truffe Blanche',
    category: 'starters',
    price: 38,
    dietary: ['Vegetarian', 'Gluten-Free'],
    description: 'Compressed summer heirloom varieties, 30-year white Modena balsamico, buffalo burrata gelato, and shaved Alba truffle.',
    ingredients: ['Heirloom Isle of Wight Tomatoes', 'Burrata Gelato', 'Alba White Truffle', 'Aged Balsamic'],
    winePairing: '2022 Gravner Ribolla Gialla Anfora, Friuli',
    origin: 'Isle of Wight & Piedmont'
  },
  {
    id: 'starter-3',
    name: 'Foie Gras Poêlé au Poivre de Sichuan',
    frenchName: 'Foie Gras Poêlé & Mirabelles',
    category: 'starters',
    price: 46,
    dietary: ['Signature'],
    description: 'Pan-seared duck liver medallion, spiced mirabelle plum chutney, brioche feuilletée, and port wine reduction.',
    ingredients: ['Landes Duck Foie Gras', 'Lorraine Mirabelles', 'Handmade Brioche', 'Tawny Port 20yr'],
    winePairing: '2015 Château Guiraud, Sauternes 1er Grand Cru',
    origin: 'Landes, France'
  },
  {
    id: 'starter-4',
    name: 'Velouté of White Asparagus & Langoustine',
    frenchName: 'Velouté d’Asperges Blanches & Langoustine',
    category: 'starters',
    price: 44,
    dietary: ['Gluten-Free', 'Wild-Caught'],
    description: 'Velvety Landes white asparagus soup poured tableside around sweet roasted Scottish langoustine and hazelnut oil.',
    ingredients: ['Landes White Asparagus', 'Scottish Scampi/Langoustine', 'Piedmont Hazelnuts', 'Chervil'],
    winePairing: '2021 Meursault "Les Narvaux" Domaine Vincent Girardin',
    origin: 'Scotland & Landes'
  },

  // Main Courses
  {
    id: 'main-1',
    name: 'Challandais Duck Breast Dry-Aged in Hay',
    frenchName: 'Canard Challandais Rôti au Foin',
    category: 'mains',
    price: 92,
    dietary: ['Signature'],
    description: 'Slow-roasted breast with crunchy crackling skin, wild lavender honey lacquer, heirloom beetroot mosaic, and spiced cherry jus.',
    ingredients: ['21-Day Salt-Aged Duck', 'Lavender Honey', 'Wild Cherries', 'Chioggia Beets'],
    winePairing: '2018 Domaine Dujac Morey-Saint-Denis, Burgundy',
    origin: 'Vendée, France',
    isChefSpecial: true
  },
  {
    id: 'main-2',
    name: 'Pyrenean Milk-Fed Lamb Saddle',
    frenchName: 'Selle d’Agneau de Lait des Pyrénées',
    category: 'mains',
    price: 96,
    dietary: ['Halal', 'Gluten-Free'],
    description: 'Herb-crusted roasted saddle, sweetbread cromesquis, charred artichoke barigoule, and concentrated rosemary jus.',
    ingredients: ['Milk-Fed Lamb', 'Globe Artichokes', 'Preserved Lemon', 'Wild Thyme'],
    winePairing: '2017 Vega Sicilia Valbuena 5°, Ribera del Duero',
    origin: 'Pyrenees Mountains'
  },
  {
    id: 'main-3',
    name: 'Roasted Morels with Vin Jaune & Spelt',
    frenchName: 'Morilles Farcies au Vin Jaune & Épeautre',
    category: 'mains',
    price: 68,
    dietary: ['Vegetarian'],
    description: 'Jumbo morels stuffed with shallot confit and wild herbs, served in an intoxicating Jura Vin Jaune emulsion with organic einkorn risotto.',
    ingredients: ['French Morels', 'Jura Vin Jaune 2014', 'Organic Spelt', 'Comté 36 Months'],
    winePairing: '2015 Domaine Macle Château-Chalon Vin Jaune',
    origin: 'Jura, France'
  },

  // Seafood
  {
    id: 'seafood-1',
    name: 'Pan-Seared Hokkaido Scallops & Caviar',
    frenchName: 'Coquilles Saint-Jacques au Caviar',
    category: 'seafood',
    price: 88,
    dietary: ['Wild-Caught', 'Signature'],
    description: 'Golden diver scallops, Kashmir saffron velouté, Ossetra caviar crown, and crispy samphire.',
    ingredients: ['Diver Scallops', 'Royal Ossetra Caviar', 'Saffron', 'Samphire'],
    winePairing: '2020 Domaine Leflaive Puligny-Montrachet',
    origin: 'Hokkaido, Japan',
    image: '/src/assets/images/dish_hokkaido_scallop_1793791699576.jpg'
  },
  {
    id: 'seafood-2',
    name: 'Wild Turbot Steamed in Kelp & Sea Butter',
    frenchName: 'Turbot Sauvage Cuit au Varech',
    category: 'seafood',
    price: 94,
    dietary: ['Wild-Caught', 'Gluten-Free'],
    description: 'Line-caught Brittany turbot slow-poached with kombu seaweed, cockle broth, braised sea leeks, and champagne beurre blanc.',
    ingredients: ['Brittany Turbot', 'Kombu Seaweed', 'Dorset Cockles', 'Vintage Champagne Butter'],
    winePairing: '2019 Corton-Charlemagne Grand Cru, Louis Latour',
    origin: 'Brittany Coast'
  },
  {
    id: 'seafood-3',
    name: 'Brittany Blue Lobster Thermidor Reimagined',
    frenchName: 'Homard Bleu aux Épices Douces',
    category: 'seafood',
    price: 115,
    dietary: ['Wild-Caught', 'Signature'],
    description: 'Whole native blue lobster roasted with crustacean coral butter, mild tarragon reduction, glazed chanterelles, and golden gratin.',
    ingredients: ['Brittany Blue Lobster', 'Coral Butter', 'Fresh Tarragon', 'Golden Chanterelles'],
    winePairing: '2018 Bâtard-Montrachet Grand Cru, Domaine Faiveley',
    origin: 'Roscoff, France'
  },

  // Grilled Specialties
  {
    id: 'grill-1',
    name: 'A5 Miyazaki Wagyu Tenderloin',
    frenchName: 'Filet de Bœuf Wagyu A5 au Binchotan',
    category: 'grill',
    price: 135,
    dietary: ['Signature'],
    description: 'Charred on white binchotan coals, Périgord truffle jus, smoked parsnip puree, glazed morels, and 24k gold leaf.',
    ingredients: ['A5 Miyazaki Beef', 'Black Truffle', 'Morel Mushrooms', 'Smoked Parsnip'],
    winePairing: '2016 Château Pontet-Canet, Pauillac',
    origin: 'Miyazaki, Japan',
    image: '/src/assets/images/dish_wagyu_truffle_1793791698385.jpg',
    isChefSpecial: true
  },
  {
    id: 'grill-2',
    name: 'Dry-Aged Galician Blond Ribeye (55 Days)',
    frenchName: 'Côte de Bœuf Rubia Gallega Maturée',
    category: 'grill',
    price: 110,
    dietary: ['Gluten-Free'],
    description: 'Aged Spanish ex-dairy cattle steak grilled over olive wood embers. Unmatched depth of flavor, marrow croquettes, and charred shallot glaze.',
    ingredients: ['55-Day Rubia Gallega Beef', 'Bone Marrow Emulsion', 'Charred Cipollini Onions', 'Smoked Maldon Salt'],
    winePairing: '2010 Bodegas Muga Prado Enea Gran Reserva, Rioja',
    origin: 'Galicia, Spain'
  },
  {
    id: 'grill-3',
    name: 'Ibérico Bellota Pork Pluma with Quince & Pine',
    frenchName: 'Pluma Ibérique au Coing & Pignons',
    category: 'grill',
    price: 76,
    dietary: ['Gluten-Free'],
    description: 'Rare acorn-fed black pig feather-cut steak seared rare, glazed with spiced quince purée, toasted pine nut praline, and wild mountain thyme.',
    ingredients: ['100% Jamón Ibérico de Bellota Pork', 'Spiced Quince Puree', 'Spanish Pine Nuts', 'Wild Mountain Thyme'],
    winePairing: '2019 Clos Erasmus, Priorat',
    origin: 'Jabugo, Spain'
  },

  // Desserts
  {
    id: 'dessert-1',
    name: 'Soleil: Golden Citrus & Valrhona Cacao Dome',
    frenchName: 'Le Dôme d’Or & Agrumes de Sicile',
    category: 'desserts',
    price: 32,
    dietary: ['Vegetarian', 'Signature'],
    description: 'Dark chocolate dome with gold leaf finish, Sicilian blood orange compote, bergamot crémeux, and cocoa nib crisp.',
    ingredients: ['Valrhona Guanaja 70%', 'Sicilian Blood Orange', 'Calabrian Bergamot', '24k Gold Leaf'],
    winePairing: 'Château d’Yquem 2011, Premier Cru Supérieur Sauternes',
    origin: 'Sicily & Tain-l’Hermitage'
  },
  {
    id: 'dessert-2',
    name: 'Tahitian Vanilla & Smoked Tonka Soufflé',
    frenchName: 'Soufflé Chaud à la Vanille de Tahiti',
    category: 'desserts',
    price: 28,
    dietary: ['Vegetarian'],
    description: 'Warm risen soufflé infused with Grand Cru Tahitian vanilla bean, served with salted butter caramel and smoked tonka bean crème anglaise poured tableside.',
    ingredients: ['Grand Cru Tahitian Vanilla', 'Smoked Tonka Bean', 'Isigny Salted Butter', 'Madagascan Cocoa'],
    winePairing: '2017 Klein Constantia Vin de Constance, South Africa',
    origin: 'Tahiti & Normandy'
  },
  {
    id: 'dessert-3',
    name: 'Piedmont Hazelnut & Black Truffle Mille-Feuille',
    frenchName: 'Mille-Feuille Noisette & Truffe Noire',
    category: 'desserts',
    price: 34,
    dietary: ['Vegetarian', 'Signature'],
    description: 'Caramelized inverted puff pastry, Piedmont IGP hazelnut praline mousse, and subtle autumn black truffle honey infusion.',
    ingredients: ['Piedmont Hazelnuts IGP', 'Inverted Puff Pastry', 'Winter Truffle Honey', 'Fleur de Sel'],
    winePairing: 'Graham’s 30-Year-Old Tawny Port, Douro Valley',
    origin: 'Piedmont, Italy'
  },

  // Drinks & Cocktails
  {
    id: 'drink-1',
    name: 'The Alchemist: Smoked Amber Old Fashioned',
    category: 'drinks',
    price: 28,
    dietary: ['Signature'],
    description: 'Rare Pappy Van Winkle 15yr Bourbon, black walnut bitters, Demerara nectar, hand-carved ice sphere, and charred cedar smoke infused under a crystal cloche.',
    ingredients: ['Bourbon Whiskey', 'Black Walnut Bitters', 'Demerara Nectar', 'Charred Cedar Smoke', 'Orange Oil'],
    origin: 'Kentucky & London House Barrel'
  },
  {
    id: 'drink-2',
    name: 'Aurelia 24k Botanical Elixir',
    category: 'drinks',
    price: 32,
    dietary: ['Signature', 'Gluten-Free'],
    description: 'Monkey 47 Schwarzwald Gin, French elderflower liqueur, clarified yuzu juice, Dom Pérignon Champagne topper, and suspended 24k gold leaf.',
    ingredients: ['Monkey 47 Gin', 'St. Germain', 'Clarified Yuzu', 'Dom Pérignon 2013', 'Edible Gold'],
    origin: 'Black Forest & Champagne'
  },
  {
    id: 'drink-3',
    name: 'Kashmir Saffron & Fig Negroni',
    category: 'drinks',
    price: 26,
    dietary: ['Signature'],
    description: 'Saffron-infused Tanqueray No. Ten, Campari washed with burnt fig leaves, and Carpano Antica Formula vermouth.',
    ingredients: ['Kashmir Saffron Gin', 'Fig Leaf Campari', 'Antica Vermouth', 'Flame Flamed Orange'],
    origin: 'Milan & Kashmir'
  },
  {
    id: 'drink-4',
    name: 'The Royal Cellar Flight (3 Grand Crus)',
    category: 'drinks',
    price: 185,
    dietary: ['Signature'],
    description: 'Curated 75ml pours from our coravin cellar: 2015 Meursault Premier Cru, 2014 Château Palmer Margaux, and 2008 Dom Pérignon Rosé.',
    ingredients: ['Grand Cru Burgundy', 'Grand Cru Bordeaux', 'Vintage Prestige Champagne'],
    origin: 'Cellar Vaults'
  }
];

export const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g-1',
    title: 'The Main Grand Dining Salon',
    category: 'atmosphere',
    image: '/src/assets/images/hero_dining_room_1793791697687.jpg',
    description: 'Intimate candlelit dining room adorned with aged brass dividers, bespoke velvet armchairs, and acoustic architectural ceiling.'
  },
  {
    id: 'g-2',
    title: 'A5 Miyazaki Wagyu Plating',
    category: 'plating',
    image: '/src/assets/images/dish_wagyu_truffle_1793791698385.jpg',
    description: 'Finished with shaved Périgord winter truffles, glazed wild morels, and pure 24k gold leaf on custom black stoneware.'
  },
  {
    id: 'g-3',
    title: 'Pan-Seared Hokkaido Diver Scallops',
    category: 'plating',
    image: '/src/assets/images/dish_hokkaido_scallop_1793791699576.jpg',
    description: 'Caramelized scallops crowned with Royal Ossetra caviar and saffron emulsion droplets on natural slate.'
  },
  {
    id: 'g-4',
    title: 'Executive Chef Plating at the Hearth',
    category: 'kitchen',
    image: '/src/assets/images/chef_plating_kitchen_1793791699900.jpg',
    description: 'Chef Marcus Vance executing the final floral touches on the 10-course tasting odyssey.'
  },
  {
    id: 'g-5',
    title: 'The Subterranean Grand Cru Cellar',
    category: 'cellar',
    image: '/src/assets/images/wine_cellar_ambiance_1793791700147.jpg',
    description: 'Temperature-controlled vault housing 1,800+ rare vintages, featuring a 200-year-old oak tasting table for private salon dinners.'
  }
];

export const CHEF_INFO = {
  name: 'Marcus Vance',
  role: 'Executive Chef & Culinary Director',
  origin: 'Lyon & Tokyo trained',
  bio: 'Trained under legends Joël Robuchon in Paris and Seiji Yamamoto in Tokyo, Chef Marcus Vance blends meticulous French classical precision with the philosophy of Japanese seasonal purity (Shun). At Aurelia, his kitchen operates on custom-built binchotan hearths, working exclusively with small-batch biodynamic purveyors across Britain, France, and Japan.',
  quote: '"Cooking at this level is not about manipulation; it is about uncovering the immortal soul of the ingredient through fire, salt, time, and relentless discipline."',
  tastingMenuName: "The Aurelia Odyssey: 10-Course Symphony",
  tastingPrice: 245,
  winePairingPrice: 165
};
