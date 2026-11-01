export const categories = [
  { id: 'all', name: 'All Deals', icon: 'Sparkles' },
  { id: 'chicken', name: 'Hot & Crispy Chicken', icon: 'Flame' },
  { id: 'burgers', name: 'Burgers', icon: 'Sandwich' },
  { id: 'biriyani', name: 'KFC Biriyani & Rice', icon: 'Soup' },
  { id: 'drumlets', name: 'Drumlets & Wings', icon: 'Drumstick' },
  { id: 'wraps', name: 'Wraps & Submarines', icon: 'Utensils' },
  { id: 'sides', name: 'Snacks & Sides', icon: 'Cookie' },
  { id: 'drinks', name: 'Drinks & Desserts', icon: 'Coffee' }
];

export const menuItems = [
  {
    id: 'ch-1pc',
    category: 'chicken',
    name: '1 Pc Choice (HC)',
    price: 990,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/1pcchoicehc14cb274dd0e04d6bacf09c50825c79b7.jpg',
    description: 'Select any piece of your choice, freshly hand-breaded and fried to golden crunchy perfection.',
    spicy: true,
    badge: 'Bestseller'
  },
  {
    id: 'ch-2pc',
    category: 'chicken',
    name: 'Quarter / 2Pc (HC)',
    price: 1540,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/quarter2pchc9ef65c073e7b4f01a7ce12b0c326af47.jpg',
    description: '2 pieces of our Signature crispy, juicy chicken seasoned with the Colonel secret herbs and spices.',
    spicy: true,
    badge: 'Popular'
  },
  {
    id: 'ch-4pc',
    category: 'chicken',
    name: 'Half / 4Pc (HC)',
    price: 2860,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/half4pchc545082dbc8734caa86f6779187909323.jpg',
    description: '4 pieces of our Signature crispy, juicy chicken. Ideal for sharing with a friend.',
    spicy: true
  },
  {
    id: 'ch-6pc',
    category: 'chicken',
    name: 'Bucket / 6Pc (H&C)',
    price: 3990,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/bucket6pchce6da3a3f713349de91e51500c7168367.jpg',
    description: 'Hot & Crispy Chicken 6 pc Bucket - the ultimate crunch feast for family and friends.',
    spicy: true,
    badge: 'Bucket Deal'
  },
  {
    id: 'ch-8pc',
    category: 'chicken',
    name: 'Mega Bucket / 8Pc (H&C)',
    price: 5150,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/bucket6pchce6da3a3f713349de91e51500c7168367.jpg',
    description: '8 pieces of golden crispy chicken bucket with signature spice coating and unmatched juiciness.',
    spicy: true,
    badge: 'Mega Value'
  },
  {
    id: 'bg-zinger',
    category: 'burgers',
    name: 'KFC Zinger Burger',
    price: 1590,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/kfczingerburgere4661b9f722a4f51b8fb30bbf4349e40.jpg',
    description: 'Signature chicken burger made with a crunchy spicy fillet, crisp lettuce & delicious rich mayo sauce.',
    spicy: true,
    badge: 'Top Iconic'
  },
  {
    id: 'bg-bigboss',
    category: 'burgers',
    name: 'Big Boss Burger',
    price: 1900,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/bigbossburger29422919518f41969bb1fe8091e0fc82.jpg',
    description: 'Colossal double crispy chicken fillet burger with melted cheese slices and zesty secret sauce.',
    spicy: true,
    badge: 'Chef Special'
  },
  {
    id: 'bg-caribbean',
    category: 'burgers',
    name: 'Caribbean Burger',
    price: 1650,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/caribbeanburger2999c5851a474953be141437df86bc47.jpg',
    description: 'Island-infused flavours with tangy tropical sauce, tender crispy chicken fillet, and fresh crunch.',
    spicy: false,
    badge: 'New'
  },
  {
    id: 'bg-doubledecker',
    category: 'burgers',
    name: 'Double Decker Burger',
    price: 2480,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/doubledeckerburger1ad4a3e6c8a74875b511c8d3816b3ea9.jpg',
    description: '02 crunchy boneless chicken thigh fillets with signature mayo, sliced cheese & toasted sesame bun.',
    spicy: true,
    badge: 'Heavy Bite'
  },
  {
    id: 'bg-cheesemelt',
    category: 'burgers',
    name: 'Cheese Melt Burger',
    price: 1650,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/cheesyburgerf884af4412d74c15ad2edf710f8716ac.jpg',
    description: 'Crispy golden chicken enveloped in hot molten cheese inside a warm toasted bun.',
    spicy: false
  },
  {
    id: 'bg-loadedcheese',
    category: 'burgers',
    name: 'Loaded Cheese Burger',
    price: 1990,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/loadedcheeseburgercc370b180cf0447f88533f6fd0d13040.jpg',
    description: 'KFC Chicken Fillet, two types of cheese, spicy chicken patty, secret sauce, crispy onion rings & lettuce.',
    spicy: true,
    badge: 'Loaded'
  },
  {
    id: 'bg-ramen',
    category: 'burgers',
    name: 'Ramen Burger',
    price: 1650,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/ramenburgerbff8522638fa44e7933c9d1f61aa123d.jpg',
    description: 'Crispy chicken fillet layered with savory umami ramen glaze and crunchy Asian coleslaw.',
    spicy: true
  },
  {
    id: 'bi-reg',
    category: 'biriyani',
    name: 'KFC Biriyani (Regular)',
    price: 690,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/kfcburiyanir9dfa4992da994392a1576c4f2dd6c60b.jpg',
    description: 'Fragrant Sri Lankan spiced Biriyani rice served with two hot drumlets and authentic spicy gravy.',
    spicy: true,
    badge: 'Local Hit'
  },
  {
    id: 'bi-large',
    category: 'biriyani',
    name: 'KFC Biriyani (Large)',
    price: 890,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/kfcburiyanilc3825a0a1b9b416b8789228ff1b63836.jpg',
    description: 'Heaping bowl of seasoned Biriyani rice paired with 1PC Hot & Crispy chicken and thick spicy gravy.',
    spicy: true,
    badge: 'Best Value'
  },
  {
    id: 'bi-spicyrice',
    category: 'biriyani',
    name: 'KFC Spicy Rice',
    price: 1320,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/kfcspicerice7222cc11faef490f879af028586acc90.jpg',
    description: 'Special KFC Spicy Rice with 1PC Boneless chicken fillet and fresh sambol garnish.',
    spicy: true
  },
  {
    id: 'bi-sawan',
    category: 'biriyani',
    name: 'KFC Biriyani Sawan Feast',
    price: 4850,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/kfcsawanfc5687921b074addaae93c9483b03a0d.jpg',
    description: 'Traditional Sri Lankan Sawan platter: Biriyani rice for 4-5 people, 6 Pcs Hot & Crispy chicken, 4 boiled eggs, gravy & 1.5L Pepsi.',
    spicy: true,
    badge: 'Feast Platter'
  },
  {
    id: 'dr-6pc',
    category: 'drumlets',
    name: 'Hot Drumlets (6 Pcs)',
    price: 1350,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/quarter2pchc9ef65c073e7b4f01a7ce12b0c326af47.jpg',
    description: '6 juicy drumlets marinated in spicy chili marinade and fried to a crisp crunch.',
    spicy: true,
    badge: 'Snack Hit'
  },
  {
    id: 'dr-bbq',
    category: 'drumlets',
    name: 'BBQ Drumlets (6 Pcs)',
    price: 1450,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/quarter2pchc9ef65c073e7b4f01a7ce12b0c326af47.jpg',
    description: '6 drumlets tossed in smoky sweet barbecue glaze with sesame seeds.',
    spicy: false
  },
  {
    id: 'wr-twister',
    category: 'wraps',
    name: 'Crispy Chicken Twister',
    price: 1250,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/caribbeanburger2999c5851a474953be141437df86bc47.jpg',
    description: 'Crispy chicken tenders, diced tomatoes, fresh shredded lettuce and pepper mayo rolled in a warm tortilla.',
    spicy: true
  },
  {
    id: 'wr-sub',
    category: 'wraps',
    name: 'KFC Chicken Submarine',
    price: 1450,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/caribbeanburger2999c5851a474953be141437df86bc47.jpg',
    description: 'Toasted submarine bun packed with seasoned chicken, melted cheese, bell peppers & garlic mayo.',
    spicy: false,
    badge: 'Favorite'
  },
  {
    id: 'sd-fries',
    category: 'sides',
    name: 'Hot Crispy French Fries (L)',
    price: 650,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/kfcspicerice7222cc11faef490f879af028586acc90.jpg',
    description: 'Golden potato fries cooked to crisp crunch and seasoned with fine sea salt.',
    spicy: false
  },
  {
    id: 'sd-popcorn',
    category: 'sides',
    name: 'Chicken Popcorn (Large)',
    price: 950,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/1pcchoicehc14cb274dd0e04d6bacf09c50825c79b7.jpg',
    description: 'Bite-sized pieces of 100% tender chicken breast coated in spicy crunchy batter.',
    spicy: true,
    badge: 'Snack King'
  },
  {
    id: 'dk-pepsi',
    category: 'drinks',
    name: 'Pepsi Can (330ml)',
    price: 290,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/quarter2pchc9ef65c073e7b4f01a7ce12b0c326af47.jpg',
    description: 'Chilled refreshing fizzy Pepsi can.',
    spicy: false
  },
  {
    id: 'dk-mousse',
    category: 'drinks',
    name: 'Chocolate Mousse Cup',
    price: 420,
    image: 'https://admin-kfc-web.azurewebsites.net/images/mainmenu/caribbeanburger2999c5851a474953be141437df86bc47.jpg',
    description: 'Creamy dark chocolate mousse crowned with chocolate curls.',
    spicy: false,
    badge: 'Sweet Dessert'
  }
];
