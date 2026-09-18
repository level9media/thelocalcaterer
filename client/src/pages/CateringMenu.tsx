/*
 * CateringMenu — Modern Farmhouse Premium
 * Two-tier layout: top-level category cards + Experiences section (Southwest, BBQ, Italian)
 * No scrollable tab bar — clean, flat, non-scrolling navigation
 */
import { useState } from "react";
import { Link, useLocation } from "wouter";
import { ArrowRight, Download, ChevronDown, ChevronUp } from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import SEO from "@/components/SEO";

// Per-route SEO metadata for each menu sub-page
const MENU_SEO: Record<string, { title: string; description: string }> = {
  "/catering-menu": {
    title: "Catering Menu | Chef-Crafted Menus for Every Event | The Local Caterer",
    description: "Browse The Local Caterer's full catering menu — appetizers, entrees, BBQ, Italian, Mexican, desserts & more. Fully customizable for weddings, corporate events, and private parties in Mesa, AZ.",
  },
  "/mexican-catering-menu": {
    title: "Mexican Catering Menu Mesa AZ | Tacos, Enchiladas & More | The Local Caterer",
    description: "Authentic Mexican catering in Mesa, AZ. Taco bars, enchiladas, tamales, street corn, and more. Perfect for weddings, corporate events, and private parties. Get a free quote.",
  },
  "/lunch-catering-menu": {
    title: "Lunch Catering Menu Mesa AZ | Office Lunches & Corporate Catering | The Local Caterer",
    description: "Professional lunch catering in Mesa, AZ. Sandwich bars, salads, hot entrees, and boxed lunches for office meetings, corporate events, and team gatherings.",
  },
  "/italian-catering-menu": {
    title: "Italian Catering Menu Mesa AZ | Pasta, Risotto & More | The Local Caterer",
    description: "Chef-crafted Italian catering in Mesa, AZ. Pasta stations, risotto, bruschetta, tiramisu, and more. Ideal for weddings, private dinners, and corporate events.",
  },
  "/breakfast-catering-menu": {
    title: "Breakfast Catering Mesa AZ | Morning Event Catering | The Local Caterer",
    description: "Breakfast and brunch catering in Mesa, AZ. Egg stations, pastries, fruit displays, and more for morning corporate events, team meetings, and private parties.",
  },
  "/asian-catering-menu": {
    title: "Asian Catering Menu Mesa AZ | Sushi, Stir Fry & More | The Local Caterer",
    description: "Asian-inspired catering in Mesa, AZ. Sushi displays, stir fry stations, dumplings, and more. Chef-crafted menus for events of all sizes across the Phoenix metro.",
  },
  "/dessert-menu": {
    title: "Dessert Catering Menu Mesa AZ | Cakes, Pastries & Sweets | The Local Caterer",
    description: "Dessert catering in Mesa, AZ. Custom cakes, pastry displays, churros, tiramisu, and more. The perfect sweet finish for weddings, corporate events, and private parties.",
  },
  "/holiday-menu-2025": {
    title: "Holiday Catering Menu 2025 Mesa AZ | Thanksgiving & Christmas Catering | The Local Caterer",
    description: "Holiday catering in Mesa, AZ for 2025. Thanksgiving, Christmas, and New Year's menus for corporate parties, family gatherings, and private events. Book early.",
  },
  "/sandwich-bar-mesa-az": {
    title: "Sandwich Bar Catering Mesa AZ | Build-Your-Own Sandwich Station | The Local Caterer",
    description: "Sandwich bar catering in Mesa, AZ. Build-your-own sandwich stations with premium meats, artisan breads, and fresh toppings. Perfect for office lunches and casual events.",
  },
};

const HERO = "https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/img_3984_6f626893.webp";

// ─── MENU DATA ─────────────────────────────────────────────────────────────────

type MenuItem = { name: string; desc: string };
type MenuSection = { title: string; items: MenuItem[] };
type MenuCategory = {
  id: string;
  label: string;
  icon: string;
  description: string;
  sections: MenuSection[];
};

const coreCategories: MenuCategory[] = [
  {
    id: "appetizers",
    label: "Appetizers",
    icon: "🥂",
    description: "Start your event with chef-crafted bites that set the tone for an unforgettable experience.",
    sections: [
      {
        title: "Boards & Displays",
        items: [
          { name: "Artisan Charcuterie & Cheese Board", desc: "Curated selection of cured meats, imported cheeses, seasonal accompaniments, and artisan crackers — beautifully arranged for display." },
          { name: "Chef's Bruschetta Board", desc: "Toasted crostini loaded with heirloom tomato basil, roasted garlic, and olive tapenade. A crowd-pleasing classic done right." },
          { name: "Fresh Seasonal Fruit Display", desc: "Vibrant, hand-cut seasonal fruits arranged in an eye-catching display. Fresh, colorful, and always a hit." },
        ],
      },
      {
        title: "Cold Appetizers",
        items: [
          { name: "Caprese Skewers", desc: "Fresh mozzarella, ripe cherry tomatoes, and fragrant basil drizzled with aged balsamic glaze." },
          { name: "Shrimp Cocktail Shooters", desc: "Chilled jumbo shrimp served in individual shot glasses with house cocktail sauce and fresh lemon." },
          { name: "Chef's Deviled Eggs", desc: "Classic deviled eggs elevated with house seasoning and a chef's finishing touch." },
          { name: "Antipasto Skewers", desc: "Italian cured meats, marinated olives, fresh mozzarella, and roasted peppers on a single skewer." },
          { name: "Fresh Vegetable Cups with Hummus", desc: "Crisp seasonal vegetables served with house-made hummus — clean, fresh, and always appreciated." },
          { name: "Pasta Salad Cups", desc: "Individual portions of chilled pasta salad with fresh vegetables and a light herb dressing." },
        ],
      },
      {
        title: "Hot Appetizers",
        items: [
          { name: "Bacon-Wrapped Dates with Citrus Goat Cheese", desc: "Medjool dates stuffed with whipped citrus goat cheese, wrapped in crispy bacon. Sweet, savory, and impossible to resist." },
          { name: "Classic Meatballs", desc: "Tender house-made meatballs served in your choice of rich marinara or smoky BBQ sauce." },
          { name: "Chicken Skewers", desc: "Grilled chicken skewers marinated in your choice of fresh herb blend or savory teriyaki glaze." },
          { name: "Stuffed Mushrooms", desc: "Roasted mushroom caps filled with a savory herb and cheese stuffing, baked until golden." },
          { name: "Spinach Artichoke Dip", desc: "Creamy, oven-baked spinach artichoke dip served with toasted bread and tortilla chips." },
          { name: "Mini Green Chile Chicken Burritos", desc: "Bite-sized burritos packed with seasoned chicken, roasted green chiles, and melted cheese." },
        ],
      },
      {
        title: "Sliders",
        items: [
          { name: "Classic Cheeseburger Sliders", desc: "Juicy beef patties with melted cheddar, pickles, and house sauce on soft brioche buns." },
          { name: "Pulled Pork Sliders", desc: "Slow-cooked pulled pork with tangy BBQ sauce and creamy coleslaw on a toasted roll." },
          { name: "Nashville Hot Chicken Sliders", desc: "Crispy fried chicken with house Nashville hot sauce, pickles, and cool ranch slaw." },
          { name: "Italian Beef Sliders", desc: "Tender braised Italian beef with giardiniera and au jus on a toasted hoagie roll." },
        ],
      },
      {
        title: "Premium Cold Appetizers",
        items: [
          { name: "Seared Ahi Tuna on Cucumber", desc: "Sesame-crusted ahi tuna, lightly seared and served on cucumber rounds with citrus soy glaze." },
          { name: "Chilled Shrimp with Chili-Lime Cocktail Sauce", desc: "Premium chilled shrimp served with a bold house-made chili-lime cocktail sauce." },
          { name: "Whipped Goat Cheese Crostini", desc: "Toasted crostini topped with whipped goat cheese, slow-roasted tomatoes, and aged balsamic." },
        ],
      },
      {
        title: "Premium Hot Appetizers",
        items: [
          { name: "Truffle Honey Goat Cheese Stuffed Dates", desc: "Medjool dates filled with whipped goat cheese, finished with truffle honey and a sprinkle of sea salt." },
          { name: "Mini Crab Cakes with Lemon Aioli", desc: "Pan-seared crab cakes made with real crab, served with house lemon aioli." },
          { name: "Short Rib Tostada with Pickled Onion & Crema", desc: "Braised short rib on a crispy tostada with quick-pickled red onion, fresh crema, and cilantro." },
        ],
      },
      {
        title: "Live Action Stations",
        items: [
          { name: "Street Taco Station", desc: "Interactive taco station with your choice of proteins, fresh toppings, and warm tortillas — made to order." },
          { name: "Pasta Station", desc: "Live pasta station with your choice of pasta, sauces, and toppings prepared fresh for each guest." },
          { name: "Stir-Fry Station", desc: "Made-to-order stir-fry with fresh vegetables, proteins, and house sauces cooked live at your event." },
          { name: "Carving Station", desc: "Dramatic carving station featuring a whole roasted protein carved tableside for your guests." },
        ],
      },
    ],
  },
  {
    id: "hors-doeuvres",
    label: "Hors d'Oeuvres",
    icon: "🍸",
    description: "Refined, chef-driven bites designed to open your event with elegance and intention.",
    sections: [
      {
        title: "Cold Hors d'Oeuvres",
        items: [
          { name: "Seared Ahi Tuna on Cucumber", desc: "Sesame-kissed ahi tuna on crisp cucumber rounds with citrus soy and microgreens." },
          { name: "Chilled Shrimp with Chili-Lime Cocktail Sauce", desc: "Premium chilled shrimp with a bold, house-crafted chili-lime cocktail sauce." },
          { name: "Stuffed Mini Sweet Peppers", desc: "Vibrant mini sweet peppers filled with whipped herb cheese — colorful, fresh, and flavorful." },
          { name: "Prosciutto-Wrapped Melon with Honey & Mint", desc: "Sweet cantaloupe wrapped in thin-sliced prosciutto, finished with local honey and fresh mint." },
          { name: "Smoked Salmon Cucumber Rounds", desc: "Thin cucumber rounds topped with smoked salmon, herb cream cheese, and briny capers." },
        ],
      },
      {
        title: "Hot Hors d'Oeuvres",
        items: [
          { name: "Truffle Honey Goat Cheese Stuffed Dates", desc: "Medjool dates filled with whipped goat cheese, drizzled with truffle honey and sea salt." },
          { name: "Mini Crab Cakes with Lemon Aioli", desc: "Pan-seared crab cakes with real lump crab, served with house lemon aioli." },
          { name: "Braised Short Rib Tostada", desc: "Slow-braised short rib on a crispy tostada with pickled red onion, crema, and fresh cilantro." },
          { name: "Herb Chicken Skewers with Garlic & Lemon", desc: "Tender grilled chicken skewers marinated in fresh herbs, garlic, and bright lemon." },
          { name: "Wild Mushroom Tartlets with Parmesan", desc: "Buttery pastry shells filled with sautéed wild mushrooms and aged parmesan." },
        ],
      },
    ],
  },
  {
    id: "breakfast",
    label: "Breakfast",
    icon: "🥞",
    description: "Warm, satisfying breakfast spreads that energize your guests and set the tone for a great event.",
    sections: [
      {
        title: "Classic Breakfast",
        items: [
          { name: "Alex's Buttermilk Pancakes", desc: "There's something extra in these pancakes — and it's love. Named after Alex, these fluffy, golden buttermilk stacks are made with a little extra care and a whole lot of heart. Every guest who tries them asks what the secret is, and the honest answer is simple: we put a little extra love into every single batch. Served with warm maple syrup, whipped butter, and fresh seasonal berries. Once you have them, you'll understand why everyone just can't get enough." },
          { name: "Golden Belgian Waffles", desc: "Crispy-edged waffles with a tender interior, served with classic toppings and powdered sugar." },
          { name: "Classic French Toast", desc: "Thick-cut brioche French toast with warm maple syrup and a dusting of powdered sugar." },
          { name: "Fluffy Scrambled Eggs", desc: "Eggs finished with butter and light seasoning — soft, creamy, and perfectly cooked." },
          { name: "Herb Breakfast Potatoes", desc: "Roasted potatoes with bell peppers, onions, and fresh herbs — crispy outside, tender inside." },
          { name: "Biscuits & House Sausage Gravy", desc: "Flaky buttermilk biscuits smothered in house-made sausage gravy. A true Southern comfort classic." },
          { name: "Choice of Protein", desc: "Select from applewood smoked bacon, savory sausage links, or chicken apple sausage." },
          { name: "Fresh Seasonal Fruit", desc: "Hand-cut seasonal fruit — colorful, refreshing, and the perfect complement to any breakfast spread." },
        ],
      },
      {
        title: "Continental Breakfast",
        items: [
          { name: "Assorted Pastries & Muffins", desc: "A selection of freshly baked pastries and muffins — perfect for meetings and casual morning events." },
          { name: "Yogurt Parfaits", desc: "Creamy yogurt layered with house granola and fresh seasonal fruit." },
          { name: "Fresh Seasonal Fruit Display", desc: "Vibrant, hand-cut seasonal fruits beautifully arranged for display." },
        ],
      },
      {
        title: "Grab & Go Breakfast",
        items: [
          { name: "Bacon Breakfast Burrito", desc: "Scrambled eggs, crispy bacon, roasted potatoes, and melted cheese wrapped in a warm flour tortilla." },
          { name: "Sausage Breakfast Burrito", desc: "Scrambled eggs, savory sausage, roasted potatoes, and cheese in a warm flour tortilla." },
          { name: "Veggie Breakfast Burrito", desc: "Scrambled eggs, roasted peppers, onions, potatoes, and cheese — a satisfying meatless option." },
          { name: "Bacon, Egg & Cheese Sandwich", desc: "Crispy bacon, fluffy egg, and melted cheese on your choice of croissant, English muffin, or bagel." },
          { name: "Sausage, Egg & Cheese Sandwich", desc: "Savory sausage patty, fluffy egg, and melted cheese on your choice of bread." },
          { name: "Ham, Egg & Cheese Sandwich", desc: "Sliced ham, fluffy egg, and melted cheese on your choice of croissant, English muffin, or bagel." },
        ],
      },
    ],
  },
  {
    id: "lunch",
    label: "Lunch",
    icon: "🥗",
    description: "Fresh, energizing lunch options built for corporate events, team meetings, and midday celebrations.",
    sections: [
      {
        title: "Signature Protein Bowl Experience",
        items: [
          { name: "Protein Bowl — Build Your Own", desc: "Choose your base (cilantro lime rice, quinoa, or mixed greens), select a protein (grilled chicken, steak, or roasted salmon), and top with cherry tomatoes, cucumbers, red onion, avocado, shredded cheese, or feta. Finished with balsamic vinaigrette, citrus dressing, or house sauce." },
        ],
      },
      {
        title: "Boxed Sandwich Lunches",
        items: [
          { name: "Italian Hoagie", desc: "Layers of Italian cured meats, provolone, and house Italian dressing on a fresh hoagie roll." },
          { name: "Turkey & Swiss", desc: "Sliced turkey breast with Swiss cheese, crisp lettuce, and tomato on your choice of bread." },
          { name: "Ham & Provolone", desc: "Sliced ham with provolone, fresh vegetables, and house mustard on a soft roll." },
          { name: "Roast Beef & Cheddar", desc: "Thinly sliced roast beef with sharp cheddar and horseradish aioli on a toasted roll." },
          { name: "Chicken Salad Croissant", desc: "House-made chicken salad with celery and herbs on a buttery, flaky croissant." },
        ],
      },
      {
        title: "Salad & Protein Experience",
        items: [
          { name: "Mixed Greens & Spinach Salad", desc: "Fresh spring mix and baby spinach with tomatoes, cucumbers, red onion, and your choice of dressing." },
          { name: "Classic Caesar Salad", desc: "Crisp romaine hearts with house Caesar dressing, shaved parmesan, and garlic croutons." },
          { name: "Add a Protein", desc: "Enhance any salad with grilled chicken, seared steak, or roasted salmon." },
        ],
      },
    ],
  },
  {
    id: "dinner",
    label: "Dinner Entrées",
    icon: "🍽",
    description: "Chef-crafted dinner menus built for weddings, corporate events, and private gatherings that demand excellence.",
    sections: [
      {
        title: "Salad Course",
        items: [
          { name: "Seasonal Mixed Greens", desc: "Fresh greens with cherry tomatoes, cucumber, and house vinaigrette — light, clean, and beautifully presented." },
          { name: "Classic Caesar Salad", desc: "Crisp romaine, shaved parmesan, garlic croutons, and house Caesar dressing." },
          { name: "Strawberry Spinach Salad", desc: "Baby spinach with fresh strawberries, candied pecans, feta, and balsamic vinaigrette — a guest favorite." },
        ],
      },
      {
        title: "Bread Service",
        items: [
          { name: "Artisan Dinner Rolls", desc: "Warm, freshly baked rolls served with whipped butter." },
          { name: "Garlic Herb Focaccia", desc: "Olive oil-brushed focaccia with fresh herbs and flaky sea salt." },
          { name: "Rustic Sourdough Bread", desc: "Sliced sourdough with a crisp crust and chewy interior, served with whipped butter." },
        ],
      },
      {
        title: "Chicken Entrées",
        items: [
          { name: "Herb Roasted Chicken", desc: "Pan-roasted chicken with garlic, rosemary, and a rich natural jus — a timeless crowd-pleaser." },
          { name: "Chicken Saltimbocca", desc: "Seared chicken topped with prosciutto and fresh sage, finished in a silky white wine butter sauce." },
          { name: "Tuscan Cream Chicken", desc: "Seared chicken in a creamy garlic parmesan sauce with sun-dried tomatoes and fresh herbs." },
        ],
      },
      {
        title: "Beef Entrées",
        items: [
          { name: "Sliced Tri-Tip with Natural Jus", desc: "Grilled and sliced tri-tip, rested and finished with a rich natural pan jus." },
          { name: "Braised Short Rib", desc: "Slow-braised beef short rib with a deep red wine reduction — fork-tender and deeply flavorful." },
          { name: "Beef Tenderloin Medallions", desc: "Seared USDA Choice tenderloin medallions with your choice of garlic butter or red wine reduction." },
        ],
      },
      {
        title: "Seafood Entrées",
        items: [
          { name: "Citrus Butter Salmon", desc: "Seared Atlantic salmon finished with a bright lemon butter sauce — clean, elegant, and always impressive." },
          { name: "Garlic Herb Shrimp", desc: "Sautéed jumbo shrimp with garlic, fresh herbs, and white wine — rich and aromatic." },
          { name: "Blackened Mahi Mahi", desc: "Bold blackened seasoning on fresh mahi mahi, seared and finished with a bright citrus glaze." },
        ],
      },
      {
        title: "Sides — Starches",
        items: [
          { name: "Garlic Whipped Potatoes", desc: "Velvety potatoes finished with roasted garlic and butter — the ultimate comfort side." },
          { name: "Creamy Pesto Alfredo Rigatoni", desc: "Rigatoni tossed in a rich alfredo sauce with fragrant basil pesto and aged parmesan." },
          { name: "Herb Roasted Potatoes", desc: "Crispy oven-roasted potatoes with olive oil, garlic, and fresh herbs." },
        ],
      },
      {
        title: "Sides — Vegetables",
        items: [
          { name: "Seasonal Roasted Vegetables", desc: "Chef's selection of fresh seasonal vegetables roasted with olive oil and herbs." },
          { name: "Green Beans with Garlic & Lemon", desc: "Sautéed green beans finished with garlic and a bright squeeze of lemon." },
          { name: "Honey Glazed Carrots", desc: "Roasted carrots finished with a light honey glaze — sweet, tender, and vibrant." },
        ],
      },
    ],
  },
  {
    id: "beverages",
    label: "Beverages",
    icon: "🥤",
    description: "Thoughtfully selected beverage options designed to complement your menu and keep guests refreshed.",
    sections: [
      {
        title: "Basic Beverage Service",
        items: [
          { name: "Iced Tea", desc: "Freshly brewed, lightly sweetened iced tea." },
          { name: "Lemonade", desc: "House-made lemonade — bright, refreshing, and always popular." },
          { name: "Bottled Water", desc: "Individual bottled water for every guest." },
        ],
      },
      {
        title: "Coffee Service",
        items: [
          { name: "Fresh Brewed Regular Coffee", desc: "Rich, freshly brewed coffee — ideal for breakfast events, meetings, and dessert service." },
          { name: "Decaf Coffee", desc: "Freshly brewed decaf for guests who prefer it." },
          { name: "Creamers & Sweeteners", desc: "Full selection of creamers and sweeteners for a complete coffee experience." },
        ],
      },
      {
        title: "Elevated Beverage Service",
        items: [
          { name: "Iced Tea & Lemonade", desc: "Freshly brewed iced tea and house lemonade." },
          { name: "Infused Water", desc: "Refreshing water infused with citrus or seasonal fruit." },
          { name: "Assorted Canned Sodas", desc: "A selection of popular sodas for guests of all preferences." },
        ],
      },
      {
        title: "Mocktail Station",
        items: [
          { name: "Paloma Mocktail", desc: "Fresh grapefruit, lime, and sparkling soda with a salted rim — refreshing and festive." },
          { name: "Cucumber Mint Cooler", desc: "Cucumber, fresh mint, lime, and sparkling water — clean, cool, and sophisticated." },
          { name: "Berry Citrus Spritz", desc: "Mixed berries, citrus, and soda — vibrant, colorful, and crowd-pleasing." },
        ],
      },
    ],
  },
  {
    id: "desserts",
    label: "Desserts",
    icon: "🍪",
    description: "The perfect sweet finish — from crowd-pleasing classics to elevated showstoppers.",
    sections: [
      {
        title: "Classic Desserts",
        items: [
          { name: "Assorted Cookies", desc: "A selection of freshly baked cookies — the perfect crowd-pleasing finish." },
          { name: "Fudgy Brownies", desc: "Rich, dense brownies with a crackly top and chewy center." },
          { name: "Lemon Bars", desc: "Bright, tangy lemon curd on a buttery shortbread crust." },
          { name: "Pecan Bars", desc: "Buttery shortbread topped with a rich, caramelized pecan filling." },
        ],
      },
      {
        title: "Elevated Desserts",
        items: [
          { name: "Mini Cheesecakes", desc: "Individual cheesecakes with a buttery graham cracker crust and seasonal fruit topping." },
          { name: "Classic Tiramisu", desc: "Espresso-soaked ladyfingers layered with mascarpone cream and dusted with cocoa." },
          { name: "Cannolis", desc: "Crispy pastry shells filled with sweetened ricotta and chocolate chips." },
          { name: "Crème Brûlée", desc: "Silky vanilla custard with a perfectly caramelized sugar crust — a true showpiece." },
          { name: "Panna Cotta", desc: "Delicate Italian cream dessert with a light vanilla flavor and seasonal fruit coulis." },
        ],
      },
      {
        title: "Dessert Features",
        items: [
          { name: "Chocolate Covered Strawberries", desc: "Fresh strawberries dipped in rich dark and white chocolate — elegant and always impressive." },
          { name: "Tres Leches Cake", desc: "Light sponge cake soaked in three milks, topped with whipped cream and cinnamon." },
          { name: "Seasonal Cobbler", desc: "Warm, bubbling fruit cobbler with a golden biscuit topping — served with vanilla ice cream." },
          { name: "Mini Churros with Dipping Sauces", desc: "Crispy, cinnamon-sugar churros served with chocolate and caramel dipping sauces." },
        ],
      },
    ],
  },
];

const experienceCategories: MenuCategory[] = [
  {
    id: "southwest",
    label: "Southwest",
    icon: "🌮",
    description: "Bold, vibrant flavors built for groups that want variety, energy, and a genuinely satisfying dining experience.",
    sections: [
      {
        title: "Proteins",
        items: [
          { name: "Pollo Asado", desc: "Citrus-marinated grilled chicken with garlic and spices — bright, bold, and perfectly charred." },
          { name: "Carne Asada", desc: "Grilled steak finished with fresh lime and house seasoning — tender, flavorful, and crowd-approved." },
          { name: "Tomato Chipotle Beef", desc: "Slow-braised beef in a rich tomato chipotle sauce — deep, smoky, and incredibly tender." },
          { name: "Pork Carnitas", desc: "Slow-cooked pork finished crispy with citrus and spices — the gold standard of taco bar proteins." },
        ],
      },
      {
        title: "Rice & Beans",
        items: [
          { name: "Spanish Rice", desc: "Classic tomato-seasoned rice with a light, fluffy texture." },
          { name: "Cilantro Lime Rice", desc: "Fluffy white rice with fresh cilantro and bright lime zest." },
          { name: "Refried Beans", desc: "Creamy, slow-cooked refried beans seasoned with house spices." },
          { name: "Green Chile Black Beans", desc: "Hearty black beans with roasted green chiles and garlic." },
          { name: "Charro Beans", desc: "Savory whole pinto beans cooked with bacon, onion, and cilantro." },
          { name: "Elote-Style Corn (Esquites)", desc: "Street-style corn with cotija cheese, fresh lime, and chili powder — a true crowd favorite." },
        ],
      },
      {
        title: "Taco Bar Accompaniments",
        items: [
          { name: "Taco Bar Setup", desc: "Flour and corn tortillas, shredded lettuce, diced tomatoes, diced onion, sour cream, shredded cheese, lime wedges, and hot sauce — everything your guests need to build the perfect taco." },
          { name: "Chips & House Salsas", desc: "Crispy tortilla chips served with house-made salsa roja, salsa verde, and fresh guacamole." },
        ],
      },
    ],
  },
  {
    id: "bbq",
    label: "Backyard BBQ",
    icon: "🔥",
    description: "Smokehouse-inspired favorites with bold flavor, generous portions, and the kind of comfort food that brings people together.",
    sections: [
      {
        title: "Salads",
        items: [
          { name: "Garden Salad", desc: "Mixed greens with tomatoes, cucumbers, and house dressing — fresh and simple." },
          { name: "BBQ Chopped Salad", desc: "Chopped greens with corn, black beans, tomatoes, cheese, and bold BBQ ranch dressing." },
        ],
      },
      {
        title: "Bread Service",
        items: [
          { name: "Dinner Rolls", desc: "Soft, warm rolls served with butter." },
          { name: "Honey Butter Cornbread", desc: "Warm, golden cornbread served with house honey butter." },
          { name: "Buttermilk Biscuits", desc: "Flaky, golden biscuits served warm with butter." },
        ],
      },
      {
        title: "BBQ Entrées",
        items: [
          { name: "Slow-Smoked Brisket", desc: "Hickory-smoked beef brisket, sliced and served with house BBQ sauce. The centerpiece of any great BBQ spread." },
          { name: "BBQ Pulled Pork", desc: "Tender, slow-cooked pulled pork with a smoky barbecue glaze — piled high and full of flavor." },
          { name: "BBQ Chicken", desc: "Grilled chicken quarters finished with house BBQ sauce — juicy, smoky, and satisfying." },
          { name: "Smoked Sausage", desc: "Savory smoked sausage, sliced and served warm with house mustard." },
        ],
      },
      {
        title: "BBQ Sides",
        items: [
          { name: "Southern Style Green Beans", desc: "Slow-cooked green beans with savory seasoning — a true Southern staple." },
          { name: "Creamy Baked Mac & Cheese", desc: "Rich, cheesy pasta baked until golden and bubbling. A guaranteed crowd-pleaser." },
          { name: "Classic Macaroni Salad", desc: "Chilled pasta salad with a creamy dressing — cool, comforting, and perfect for outdoor events." },
          { name: "Traditional Potato Salad", desc: "Classic potato salad with mustard, herbs, and a creamy dressing." },
          { name: "Slow-Cooked Baked Beans", desc: "Hearty baked beans with smoky depth and a touch of sweetness." },
        ],
      },
    ],
  },
  {
    id: "italian",
    label: "Italian",
    icon: "🍝",
    description: "Classic Italian flavors in a composed, satisfying menu designed for gatherings that call for comfort, elegance, and timeless appeal.",
    sections: [
      {
        title: "Salads",
        items: [
          { name: "Classic Caesar Salad", desc: "Crisp romaine, parmesan, garlic croutons, and house Caesar dressing." },
          { name: "Italian House Salad", desc: "Mixed greens with tomatoes, cucumber, red onion, olives, and Italian vinaigrette." },
        ],
      },
      {
        title: "Bread Service",
        items: [
          { name: "Garlic Herb Bread", desc: "Toasted bread with garlic butter and fresh herbs — warm and irresistible." },
          { name: "Herb Focaccia", desc: "Olive oil-brushed focaccia with herbs and sea salt." },
          { name: "Dinner Rolls", desc: "Soft, warm rolls served with butter." },
        ],
      },
      {
        title: "Italian Chicken",
        items: [
          { name: "Chicken Piccata", desc: "Seared chicken with lemon, capers, and a bright white wine butter sauce — light and elegant." },
          { name: "Chicken Marsala", desc: "Sautéed chicken with earthy mushrooms in a rich marsala wine sauce." },
          { name: "Chicken Parmesan", desc: "Breaded chicken with house marinara and melted mozzarella — a timeless Italian-American classic." },
        ],
      },
      {
        title: "Italian Beef & Seafood",
        items: [
          { name: "Chianti Braised Beef", desc: "Slow-braised beef in a rich Chianti wine sauce — deeply flavorful and fork-tender." },
          { name: "Italian Beef Meatballs", desc: "House-made beef meatballs in a slow-simmered marinara sauce." },
          { name: "Lemon Herb Salmon", desc: "Oven-roasted salmon finished with lemon and fresh herbs." },
          { name: "Shrimp Scampi", desc: "Sautéed jumbo shrimp with garlic, butter, white wine, and lemon — a restaurant-quality classic." },
        ],
      },
      {
        title: "Italian Sides",
        items: [
          { name: "Parmesan Whipped Potatoes", desc: "Creamy potatoes finished with aged parmesan and butter." },
          { name: "Roasted Red Potatoes", desc: "Oven-roasted potatoes with garlic and herbs." },
          { name: "Penne Alfredo", desc: "Penne pasta in a creamy parmesan alfredo sauce." },
          { name: "Baked Ziti Marinara", desc: "Ziti pasta baked with house marinara and melted cheese — bubbly, hearty, and satisfying." },
          { name: "Sautéed Green Beans with Garlic", desc: "Crisp-tender green beans with garlic and seasoning." },
          { name: "Roasted Brussels Sprouts", desc: "Crispy roasted Brussels sprouts with olive oil and sea salt." },
          { name: "Oven Roasted Seasonal Vegetables", desc: "Chef's selection of seasonal vegetables roasted with herbs and olive oil." },
        ],
      },
    ],
  },
];

// ─── COMPONENT ─────────────────────────────────────────────────────────────────

export default function CateringMenu() {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
  const [location] = useLocation();

  const toggleSection = (key: string) => {
    setExpandedSections(prev => ({ ...prev, [key]: prev[key] === false ? true : false }));
  };

  const allCategories = [...coreCategories, ...experienceCategories];
  const activeCategory = allCategories.find(c => c.id === activeId) ?? null;

  const seoData = MENU_SEO[location] ?? MENU_SEO["/catering-menu"];

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5EFE0" }}>
      <SEO
        title={seoData.title}
        description={seoData.description}
        canonical={location}
      />
      <Navigation />

      {/* Hero */}
      <section
        className="relative pt-32 pb-20"
        style={{ backgroundImage: `url(${HERO})`, backgroundSize: "cover", backgroundPosition: "center" }}
      >
        <div className="absolute inset-0" style={{ backgroundColor: "rgba(10,25,15,0.80)" }} />
        <div className="relative z-10 container">
          <p className="text-xs uppercase tracking-[0.3em] font-semibold mb-4" style={{ color: "rgba(245,239,224,0.55)", fontFamily: "'Outfit', sans-serif" }}>
            <Link href="/" className="hover:text-white/80 transition-colors">Home</Link> / Catering Menu
          </p>
          <h1 className="text-5xl md:text-6xl font-semibold mb-4" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
            Our Catering Menu
          </h1>
          <p className="text-lg max-w-xl mb-8" style={{ color: "rgba(245,239,224,0.85)", fontFamily: "'Outfit', sans-serif" }}>
            Chef-crafted menus for every occasion — fully customizable to your event, your guests, and your vision.
          </p>
          <div className="flex flex-wrap gap-4">
            <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta">
              Request a Custom Quote <ArrowRight size={16} />
            </a>
            <a
              href="https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/thelocalcaterer-menu-2025_59b757eb.pdf"
              download="TheLocalCaterer-Menu.pdf"
              className="flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all"
              style={{ backgroundColor: "transparent", border: "1.5px solid rgba(245,239,224,0.5)", color: "#F5EFE0", fontFamily: "'Outfit', sans-serif" }}
            >
              <Download size={14} /> Download Menu PDF
            </a>
          </div>
        </div>
      </section>

      {/* Menu Selection */}
      <section className="py-16" style={{ backgroundColor: "#F5EFE0" }}>
        <div className="container">

          {/* Core Categories */}
          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.25em] font-semibold mb-2" style={{ color: "#C1440E", fontFamily: "'Outfit', sans-serif" }}>Browse by Course</p>
            <h2 className="text-3xl font-semibold mb-8" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
              Menu Categories
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
              {coreCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
                  className="flex flex-col items-center gap-2 p-4 transition-all text-center"
                  style={{
                    backgroundColor: activeId === cat.id ? "#2D6A4F" : "#fff",
                    border: activeId === cat.id ? "2px solid #2D6A4F" : "2px solid #EDE6D3",
                    color: activeId === cat.id ? "#F5EFE0" : "#1A1A1A",
                  }}
                >
                  <span className="text-2xl">{cat.icon}</span>
                  <span className="text-xs font-semibold uppercase tracking-wider leading-tight" style={{ fontFamily: "'Outfit', sans-serif" }}>
                    {cat.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Experiences Section */}
          <div className="mb-14">
            <div className="flex items-center gap-4 mb-2">
              <p className="text-xs uppercase tracking-[0.25em] font-semibold" style={{ color: "#C1440E", fontFamily: "'Outfit', sans-serif" }}>Signature Experiences</p>
              <div className="flex-1 h-px" style={{ backgroundColor: "#EDE6D3" }} />
            </div>
            <h2 className="text-3xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
              Experiences
            </h2>
            <p className="text-sm mb-8 max-w-2xl" style={{ color: "#666", fontFamily: "'Outfit', sans-serif" }}>
              Full themed dining experiences designed around a cuisine — each one a complete menu from first bite to last.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {experienceCategories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveId(activeId === cat.id ? null : cat.id)}
                  className="flex items-center gap-4 p-5 text-left transition-all"
                  style={{
                    backgroundColor: activeId === cat.id ? "#2D6A4F" : "#fff",
                    border: activeId === cat.id ? "2px solid #2D6A4F" : "2px solid #EDE6D3",
                    color: activeId === cat.id ? "#F5EFE0" : "#1A1A1A",
                  }}
                >
                  <span className="text-3xl">{cat.icon}</span>
                  <div>
                    <p className="text-base font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif" }}>{cat.label} Experience</p>
                    <p className="text-xs mt-0.5 leading-relaxed" style={{ fontFamily: "'Outfit', sans-serif", color: activeId === cat.id ? "rgba(245,239,224,0.75)" : "#888" }}>
                      {cat.id === "southwest" && "Taco bars, proteins, rice & beans"}
                      {cat.id === "bbq" && "Smoked meats, Southern sides, cornbread"}
                      {cat.id === "italian" && "Pasta, chicken, seafood & classic sides"}
                    </p>
                  </div>
                  <ChevronDown
                    size={16}
                    className="ml-auto shrink-0 transition-transform"
                    style={{
                      transform: activeId === cat.id ? "rotate(180deg)" : "rotate(0deg)",
                      color: activeId === cat.id ? "#F5EFE0" : "#2D6A4F",
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Active Category Content */}
          {activeCategory && (
            <div className="mt-2 mb-14" style={{ borderTop: "2px solid #2D6A4F" }}>
              {/* Category Header */}
              <div className="flex items-start justify-between flex-wrap gap-6 py-8" style={{ borderBottom: "1px solid #E0D5C0" }}>
                <div>
                  <h2 className="text-4xl font-semibold mb-2" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                    {activeCategory.icon} {activeCategory.label}
                  </h2>
                  <p className="text-base max-w-2xl" style={{ color: "#555", fontFamily: "'Outfit', sans-serif" }}>
                    {activeCategory.description}
                  </p>
                </div>
                <a
                  href="https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/thelocalcaterer-menu-2025_59b757eb.pdf"
                  download="TheLocalCaterer-Menu.pdf"
                  className="flex items-center gap-2 px-5 py-2.5 text-xs font-semibold uppercase tracking-widest transition-all shrink-0"
                  style={{ backgroundColor: "transparent", border: "1.5px solid #2D6A4F", color: "#2D6A4F", fontFamily: "'Outfit', sans-serif" }}
                >
                  <Download size={13} /> Download PDF
                </a>
              </div>

              {/* Sections */}
              <div className="space-y-4 pt-8">
                {activeCategory.sections.map((section, si) => {
                  const key = `${activeId}-${si}`;
                  const isExpanded = expandedSections[key] !== false;
                  return (
                    <div key={key} style={{ backgroundColor: "#fff", border: "1px solid #EDE6D3" }}>
                      <button
                        onClick={() => toggleSection(key)}
                        className="w-full flex items-center justify-between px-6 py-4 text-left"
                      >
                        <h3 className="text-xl font-semibold" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                          {section.title}
                        </h3>
                        {isExpanded
                          ? <ChevronUp size={18} style={{ color: "#2D6A4F" }} />
                          : <ChevronDown size={18} style={{ color: "#2D6A4F" }} />}
                      </button>
                      {isExpanded && (
                        <div className="px-6 pb-6">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {section.items.map((item) => (
                              <div
                                key={item.name}
                                className="p-4"
                                style={{ backgroundColor: "#FDFAF4", borderLeft: "3px solid #2D6A4F" }}
                              >
                                <h4 className="text-base font-semibold mb-1" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#1A1A1A" }}>
                                  {item.name}
                                </h4>
                                <p className="text-sm leading-relaxed" style={{ color: "#666", fontFamily: "'Outfit', sans-serif" }}>
                                  {item.desc}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="p-10 text-center" style={{ backgroundColor: "#2D6A4F" }}>
            <h3 className="text-3xl font-semibold mb-3" style={{ fontFamily: "'Cormorant Garamond', serif", color: "#F5EFE0" }}>
              Ready to Build Your Custom Menu?
            </h3>
            <p className="text-sm mb-6 max-w-lg mx-auto" style={{ color: "rgba(245,239,224,0.8)", fontFamily: "'Outfit', sans-serif" }}>
              All menus are fully customizable. Contact us for a free consultation and a quote tailored to your event.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a href="https://thelocalcaterer.tripleseat.com/party_request/34341" target="_blank" rel="noopener noreferrer" className="btn-terracotta">
                Request a Quote <ArrowRight size={16} />
              </a>
              <a
                href="https://d2xsxph8kpxj0f.cloudfront.net/310519663450394445/axqRDPajaxMWvyLBL3kxLr/thelocalcaterer-menu-2025_59b757eb.pdf"
                download="TheLocalCaterer-Menu.pdf"
                className="flex items-center gap-2 px-6 py-3 text-xs font-semibold uppercase tracking-widest transition-all"
                style={{ backgroundColor: "transparent", border: "1.5px solid rgba(245,239,224,0.5)", color: "#F5EFE0", fontFamily: "'Outfit', sans-serif" }}
              >
                <Download size={14} /> Download Full Menu
              </a>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </div>
  );
}
