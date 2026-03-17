import {
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  Clock,
  GlassWater,
  MapPin,
  Phone,
  Wine,
} from "lucide-react";
import { AnimatePresence, motion, useScroll, useTransform } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────
interface MenuItem {
  name: string;
  price: string;
  note?: string;
}

interface MenuCategory {
  category: string;
  items: MenuItem[];
  note?: string;
}

// ─── Menu Data ───────────────────────────────────────────────────────────────
const drinksData: MenuCategory[] = [
  {
    category: "Water",
    items: [
      { name: "Acqua Panna (1L)", price: "$10" },
      { name: "Pellegrino (1L)", price: "$10" },
    ],
  },
  {
    category: "Coffee & Tea",
    items: [
      {
        name: "Drip Coffee",
        price: "$5",
        note: "Unlimited refills in-house · Regular: Perla de Inzá (Colombia) · Decaf: Midnight Cowboy (Colombia)",
      },
      { name: "Cold Brew", price: "$6", note: "No refills" },
      {
        name: "Harney & Sons Tea",
        price: "$5",
        note: "English Breakfast, Earl Grey, Mint, Chamomile, Green",
      },
      { name: "Hot Chocolate", price: "$10", note: "Valrhona + marshmallow" },
      { name: "Hot Cider", price: "$8" },
      { name: "Iced Tea", price: "$5" },
      { name: "Arnold Palmer", price: "$6" },
      { name: "Hibiscus Iced Tea", price: "$5" },
      { name: "Hibiscus Palmer", price: "$6" },
    ],
  },
  {
    category: "Juice, Lemonade & Soda",
    items: [
      { name: "Fresh Orange Juice", price: "$8" },
      { name: "Green Juice", price: "$9" },
      { name: "Pink Lemonade", price: "$6" },
      { name: "Peach Lemonade", price: "$7" },
      { name: "Homemade Sodas", price: "$6" },
      { name: "Shirley Temple", price: "$7" },
      { name: "Root Beer Float", price: "$10" },
      { name: "Coke Float", price: "$10" },
      { name: "Coke / Diet Coke", price: "$4" },
    ],
  },
  {
    category: "Beer",
    items: [
      { name: "Pilsner, Blue Moon, IPA", price: "$9" },
      { name: "Torch & Crown Après Ale", price: "$9" },
      { name: "Miller High Life", price: "$7" },
      { name: "Aval Hard Cider", price: "$7" },
      { name: "Guinness", price: "$10" },
      { name: "Athletic Brewing (non-alcoholic)", price: "$7" },
      { name: "Michelada", price: "$12" },
    ],
  },
  {
    category: "Cocktails",
    items: [
      { name: "Bourbon Hot Cider", price: "$16" },
      {
        name: "Mimosa",
        price: "$14",
        note: "Multiple flavors + flight available",
      },
      { name: "Bloody Mary", price: "$15" },
      { name: "Margarita", price: "$17", note: "Pomegranate" },
      { name: "Paloma Picante", price: "$17" },
      { name: "Old Fashioned", price: "$17", note: "Rum blend" },
      { name: "Bubby's Punch", price: "$17" },
      { name: "Bubby's Spritz", price: "$15" },
      { name: "Hugo Spritz", price: "$15" },
      { name: "Passionfruit Mojito", price: "$17" },
      { name: "Bourbon Sweet Tea", price: "$17" },
      { name: "Cold Brewtini", price: "$17" },
      { name: "Rye Manhattan", price: "$17" },
      { name: "Kyiv Mule", price: "$17" },
      { name: "High Noon Pear", price: "$8" },
      { name: "Non-alcoholic Negroni", price: "$12" },
    ],
  },
];

const winesData = {
  sparklingRose: [
    { name: "Prosecco", glass: "$12", bottle: "$45" },
    { name: "Crémant", glass: "$15", bottle: "$60" },
    { name: "Rosé", glass: "$12", bottle: "$45" },
  ],
  white: [
    { name: "Pinot Grigio", glass: "$12", bottle: "$45" },
    { name: "Sauvignon Blanc", glass: "$14", bottle: "$50" },
    { name: "Petit Chablis", glass: null, bottle: "$65" },
  ],
  red: [
    { name: "Tempranillo", glass: "$12", bottle: "$45" },
    { name: "Côtes du Rhône", glass: "$14", bottle: "$50" },
    { name: "Bordeaux", glass: null, bottle: "$50" },
  ],
};

const brunchData: MenuCategory[] = [
  {
    category: "Pancakes",
    note: "World famous!",
    items: [
      { name: "James Beard", price: "$24" },
      { name: "1890 Sourdough", price: "$24" },
      { name: "Gluten-Free", price: "$26" },
      {
        name: "Pancake Toppings",
        price: "+$3",
        note: "Blueberry, banana, Nutella & more",
      },
      { name: "Pancake Flight", price: "$27" },
      { name: "Fried Chicken & Pancakes", price: "$29" },
    ],
  },
  {
    category: "Bread & Pastries",
    items: [
      { name: "Buttermilk Biscuits", price: "$8 / $16" },
      { name: "Bagel + Cream Cheese", price: "$4" },
      { name: "Rye / Sourdough Loaf", price: "$8" },
    ],
  },
  {
    category: "Breakfast Plates",
    items: [
      { name: "Shrimp & Grits", price: "$26" },
      { name: "Bubby's Breakfast", price: "$25" },
      { name: "Griddle Special", price: "$24" },
      { name: "Cheese Grits Breakfast", price: "$26" },
      { name: "Biscuits + Hatch Chili Sausage", price: "$26" },
      { name: "Huevos Rancheros", price: "$25" },
      { name: "Eggs Benedict", price: "$27" },
      { name: "Green Omelet", price: "$26" },
      { name: "Market Omelet", price: "$26" },
      { name: "Abe Lincoln Breakfast", price: "$28" },
      { name: "Smoked Salmon Bagel Plate", price: "$24" },
      { name: "Steel Cut Oatmeal", price: "$17" },
      { name: "Granola", price: "$18" },
      { name: "Fried Chicken", price: "$25" },
    ],
  },
  {
    category: "Sandwiches",
    items: [
      { name: "Avocado Toast", price: "$24" },
      { name: "Turkey Pastrami Reuben", price: "$23" },
      { name: "Turkey B.A.L.T.", price: "$22" },
      { name: "Hot Chicken Sandwich", price: "$24" },
      { name: "Tomato Soup + Grilled Cheese", price: "$22" },
    ],
  },
  {
    category: "Salads & Soup",
    items: [
      { name: "Grain Bowl", price: "$24", note: "+ protein add-ons" },
      { name: "Caesar", price: "$21", note: "+ add-ons" },
      { name: "Kale & Farro", price: "$22", note: "+ add-ons" },
      { name: "Cobb Salad", price: "$24" },
      { name: "Matzo Ball Soup", price: "$15" },
      { name: "Veggie Chili", price: "$15" },
      { name: "Tomato Soup + Grilled Cheese", price: "$22" },
    ],
  },
  {
    category: "Burgers",
    note: "Add-ons: cheese +$2, extras +$3",
    items: [
      { name: "Bubby's Burger", price: "$24" },
      { name: "Double Bubby 2.0", price: "$26" },
      { name: "Chicken Burger", price: "$23" },
      { name: "Veggie Burger", price: "$23" },
    ],
  },
  {
    category: "Sides & Add-ons",
    items: [
      { name: "Home Fries", price: "$7" },
      { name: "Bacon", price: "$7" },
      { name: "Sausage", price: "$7–9" },
      { name: "Toast", price: "$4" },
      { name: "Mac n Cheese", price: "$14" },
      { name: "Deviled Eggs", price: "$13" },
      { name: "Fries", price: "$7" },
      { name: "Coleslaw", price: "$6" },
      { name: "Spicy Broccoli", price: "$8" },
    ],
  },
];

const dinnerData: MenuCategory[] = [
  {
    category: "Starters",
    items: [
      { name: "Mac n Cheese Balls", price: "$13" },
      { name: "Nachos", price: "$15", note: "+ chicken add-on available" },
      { name: "Chicken Wings", price: "$15" },
      { name: "Deviled Eggs", price: "$13" },
      { name: "Pigs in a Blanket", price: "$13" },
    ],
  },
  {
    category: "Biscuits",
    items: [{ name: "Buttermilk Biscuits", price: "$8 / $16" }],
  },
  {
    category: "Salads & Soups",
    items: [
      { name: "Grain Bowl", price: "$24", note: "+ protein add-ons" },
      { name: "Caesar", price: "$21", note: "+ add-ons" },
      { name: "Kale & Farro", price: "$22", note: "+ add-ons" },
      { name: "Cobb Salad", price: "$24" },
      { name: "Matzo Ball Soup", price: "$15" },
      { name: "Veggie Chili", price: "$15" },
    ],
  },
  {
    category: "Mains",
    items: [
      { name: "Chicken Pot Pie", price: "$27" },
      { name: "Chicken Shish Kebabs", price: "$24" },
      { name: "NY Strip Steak", price: "$35" },
      { name: "Seared Salmon", price: "$27" },
      { name: "Meatloaf", price: "$24" },
      { name: "Fried Chicken", price: "$26" },
      { name: "Chicken & Pancakes", price: "$29" },
      { name: "Hot Chicken Sandwich", price: "$24" },
      { name: "Tomato Soup + Grilled Cheese", price: "$22" },
    ],
  },
  {
    category: "Burgers",
    note: "Add-ons: cheese +$2, extras +$3",
    items: [
      { name: "Bubby's Burger", price: "$24" },
      { name: "Double Bubby 2.0", price: "$26" },
      { name: "Chicken Burger", price: "$23" },
      { name: "Veggie Burger", price: "$23" },
    ],
  },
  {
    category: "Pancakes",
    note: "Limited dinner selection",
    items: [
      { name: "James Beard", price: "$24", note: "+ toppings $3" },
      { name: "Pancake Flight", price: "$27" },
      { name: "Chicken & Pancakes", price: "$29" },
    ],
  },
  {
    category: "Sides",
    items: [
      { name: "Mac n Cheese", price: "$14" },
      { name: "Broccoli", price: "$8" },
      { name: "Asparagus", price: "$8" },
      { name: "Brussels Sprouts", price: "$7–8" },
      { name: "Baked Potato", price: "$9" },
      { name: "Fries", price: "$7" },
      { name: "Mashed Potatoes", price: "$7" },
      { name: "Coleslaw", price: "$6" },
    ],
  },
];

const kidsData: MenuCategory[] = [
  {
    category: "Kids Menu",
    note: "For guests under 12 only",
    items: [
      { name: "Kids Pancakes", price: "$13", note: "+ toppings $3" },
      { name: "Mac n Cheese", price: "$12" },
      { name: "Junior Burger", price: "$15" },
      { name: "Chicken Strips", price: "$12" },
      { name: "Grilled Cheese", price: "$12" },
      { name: "Fruit Salad", price: "$7", note: "Daytime only" },
    ],
  },
];

const dessertsData: MenuCategory[] = [
  {
    category: "Homemade Pies",
    items: [
      { name: "Apple Pie", price: "$9" },
      { name: "Sour Cherry", price: "$9" },
      { name: "Banoffee", price: "$9" },
      { name: "Peanut Butter Chocolate", price: "$9" },
      { name: "Key Lime", price: "$9" },
    ],
  },
  {
    category: "Other Desserts",
    items: [
      { name: "Brownie", price: "$6" },
      { name: "Cookie", price: "$4" },
      { name: "Ice Cream", price: "$6", note: "Vanilla or chocolate" },
      { name: "Root Beer Float", price: "$10" },
      { name: "Coke Float", price: "$10" },
    ],
  },
];

// ─── Animated Particles ────────────────────────────────────────────────────────
function FloatingParticles({ count = 18 }: { count?: number }) {
  const particles = Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    size: 2 + Math.random() * 3,
    duration: 6 + Math.random() * 10,
    delay: Math.random() * 8,
    opacity: 0.15 + Math.random() * 0.35,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            bottom: "-10px",
            width: p.size,
            height: p.size,
            backgroundColor: `oklch(0.85 0.08 75 / ${p.opacity})`,
          }}
          animate={{
            y: ["-10px", "-100vh"],
            opacity: [0, p.opacity, p.opacity, 0],
            x: ["0px", `${(Math.random() - 0.5) * 80}px`],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

// ─── Animated Divider ───────────────────────────────────────────────────────────
function AnimatedDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <motion.div
        className="h-px flex-1 max-w-32"
        style={{
          background:
            "linear-gradient(to right, transparent, oklch(0.70 0.08 75 / 60%))",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
      <motion.div
        animate={{ rotate: 360 }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{ color: "oklch(0.70 0.08 75)" }}
        className="text-lg"
      >
        ✦
      </motion.div>
      <motion.div
        animate={{ scale: [1, 1.4, 1] }}
        transition={{
          duration: 2.5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
        style={{ color: "oklch(0.85 0.06 75)" }}
        className="text-sm"
      >
        ✦
      </motion.div>
      <motion.div
        animate={{ rotate: -360 }}
        transition={{
          duration: 12,
          repeat: Number.POSITIVE_INFINITY,
          ease: "linear",
        }}
        style={{ color: "oklch(0.70 0.08 75)" }}
        className="text-lg"
      >
        ✦
      </motion.div>
      <motion.div
        className="h-px flex-1 max-w-32"
        style={{
          background:
            "linear-gradient(to left, transparent, oklch(0.70 0.08 75 / 60%))",
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        whileInView={{ scaleX: 1, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      />
    </div>
  );
}

// ─── Shimmer Counter ──────────────────────────────────────────────────────────
function StatCard({
  value,
  label,
  delay = 0,
}: { value: string; label: string; delay?: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="text-center px-6 py-4 relative"
    >
      <motion.div
        className="absolute inset-0 rounded-lg opacity-0"
        style={{
          background:
            "radial-gradient(circle, oklch(0.70 0.08 75 / 8%) 0%, transparent 70%)",
        }}
        whileHover={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
      />
      <motion.p
        className="font-serif text-4xl font-bold mb-1"
        style={{ color: "oklch(0.94 0.018 78)" }}
        animate={{ opacity: [0.8, 1, 0.8] }}
        transition={{
          duration: 3,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
          delay,
        }}
      >
        {value}
      </motion.p>
      <p
        className="font-sans text-xs uppercase tracking-widest"
        style={{ color: "oklch(0.65 0.06 75)" }}
      >
        {label}
      </p>
    </motion.div>
  );
}

// ─── Components ──────────────────────────────────────────────────────────────

function PolicyBanner() {
  const [open, setOpen] = useState(true);
  return (
    <div
      style={{
        backgroundColor: "oklch(0.37 0.12 25)",
        color: "oklch(0.96 0.015 75)",
      }}
      className="w-full text-sm"
    >
      <div className="max-w-6xl mx-auto px-4">
        <button
          data-ocid="policy.toggle"
          type="button"
          onClick={() => setOpen((p) => !p)}
          className="w-full flex items-center justify-between py-3 font-sans font-medium tracking-wide uppercase text-xs opacity-90 hover:opacity-100 transition-opacity"
        >
          <span className="flex items-center gap-2">
            <AlertTriangle size={14} />
            Restaurant Policies & Notices
          </span>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <ul className="pb-3 grid sm:grid-cols-2 gap-x-8 gap-y-1 text-xs opacity-90">
                {[
                  "Not an allergen-free kitchen — cross-contamination possible",
                  "People with severe allergies are advised not to dine",
                  "Brunch order cutoff: 3:45 PM · Dinner order cutoff: 9:30 PM",
                  "Dining time limit: 90 minutes",
                  "20% gratuity added for parties of 5+ and delivery/takeout above $200",
                  "Delivery minimum: $20",
                ].map((policy) => (
                  <li key={policy} className="flex items-start gap-1.5">
                    <span className="mt-0.5 shrink-0">•</span>
                    {policy}
                  </li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

function FeaturedSpotlight() {
  return (
    <section
      className="w-full py-20 px-4 relative overflow-hidden"
      style={{ backgroundColor: "oklch(0.12 0.02 25)" }}
    >
      {/* Ambient glow blobs */}
      <motion.div
        className="absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.37 0.12 25 / 20%)" }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{
          duration: 6,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-80 h-80 rounded-full blur-3xl pointer-events-none"
        style={{ background: "oklch(0.55 0.10 60 / 15%)" }}
        animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-4"
        >
          <p
            className="font-sans uppercase tracking-[0.3em] text-xs mb-2"
            style={{ color: "oklch(0.70 0.08 75)" }}
          >
            House Favorites
          </p>
          <h2
            className="font-serif text-3xl md:text-4xl font-bold uppercase tracking-wide"
            style={{ color: "oklch(0.94 0.018 78)" }}
          >
            Crafted to Perfection
          </h2>
        </motion.div>

        <AnimatedDivider />

        <div className="grid md:grid-cols-2 gap-8 mt-10">
          {/* Coffee Card */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            whileHover={{ y: -6 }}
            className="relative group overflow-hidden rounded-2xl cursor-default"
            style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}
          >
            <img
              src="/assets/generated/coffee-premium.dim_800x600.jpg"
              alt="Premium artisan coffee — side view"
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            {/* Shimmer sweep on hover */}
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,230,180,0.12) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
              transition={{
                duration: 1.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,3,2,0.88) 0%, rgba(8,3,2,0.08) 55%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.p
                className="font-sans uppercase tracking-[0.25em] text-xs mb-1"
                style={{ color: "oklch(0.70 0.08 75)" }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
              >
                Signature
              </motion.p>
              <h3
                className="font-serif text-2xl font-bold"
                style={{ color: "oklch(0.96 0.018 78)" }}
              >
                Artisan Coffee
              </h3>
              <p
                className="font-sans text-sm mt-1"
                style={{ color: "oklch(0.75 0.02 80)" }}
              >
                Perla de Inzá single-origin · Unlimited refills · from $5
              </p>
            </div>
          </motion.div>

          {/* Sandwich Card */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, ease: "easeOut", delay: 0.1 }}
            whileHover={{ y: -6 }}
            className="relative group overflow-hidden rounded-2xl cursor-default"
            style={{ boxShadow: "0 8px 48px rgba(0,0,0,0.6)" }}
          >
            <img
              src="/assets/generated/sandwich-premium.dim_800x600.jpg"
              alt="Premium gourmet sandwich — side view"
              className="w-full h-80 object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <motion.div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none"
              style={{
                background:
                  "linear-gradient(105deg, transparent 40%, rgba(255,230,180,0.12) 50%, transparent 60%)",
                backgroundSize: "200% 100%",
              }}
              animate={{ backgroundPosition: ["-100% 0", "200% 0"] }}
              transition={{
                duration: 1.4,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, rgba(8,3,2,0.88) 0%, rgba(8,3,2,0.08) 55%)",
              }}
            />
            <div className="absolute bottom-0 left-0 right-0 p-6">
              <motion.p
                className="font-sans uppercase tracking-[0.25em] text-xs mb-1"
                style={{ color: "oklch(0.70 0.08 75)" }}
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{
                  duration: 2.5,
                  repeat: Number.POSITIVE_INFINITY,
                  delay: 1,
                }}
              >
                House Classic
              </motion.p>
              <h3
                className="font-serif text-2xl font-bold"
                style={{ color: "oklch(0.96 0.018 78)" }}
              >
                Gourmet Sandwich
              </h3>
              <p
                className="font-sans text-sm mt-1"
                style={{ color: "oklch(0.75 0.02 80)" }}
              >
                Turkey Pastrami Reuben · Turkey B.A.L.T. · from $22
              </p>
            </div>
          </motion.div>
        </div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-14 grid grid-cols-3 divide-x"
          style={{
            borderColor: "oklch(0.94 0.018 78 / 10%)",
            border: "1px solid oklch(0.94 0.018 78 / 10%)",
            borderRadius: "12px",
          }}
        >
          <StatCard value="Est. 1990" label="NYC Institution" delay={0} />
          <StatCard value="35+" label="Menu Items" delay={0.1} />
          <StatCard value="5★" label="Signature Dishes" delay={0.2} />
        </motion.div>
      </div>
    </section>
  );
}

function MenuItemRow({ item, index }: { item: MenuItem; index: number }) {
  return (
    <motion.div
      data-ocid={`menu.item.${index + 1}`}
      className="flex items-start justify-between gap-4 py-2.5 border-b border-maroon/10 last:border-0 group"
      initial={{ opacity: 0, x: -8 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.3, delay: Math.min(index * 0.025, 0.4) }}
    >
      <div className="flex-1 min-w-0">
        <span className="font-sans font-medium text-foreground text-sm leading-snug group-hover:text-primary transition-colors">
          {item.name}
        </span>
        {item.note && (
          <p className="text-xs text-muted-foreground mt-0.5 font-sans">
            {item.note}
          </p>
        )}
      </div>
      <span
        className="font-serif font-semibold text-sm shrink-0 tabular-nums"
        style={{ color: "oklch(0.37 0.12 25)" }}
      >
        {item.price}
      </span>
    </motion.div>
  );
}

function WineSection() {
  const WineTable = ({
    title,
    items,
  }: {
    title: string;
    items: { name: string; glass: string | null; bottle: string }[];
  }) => (
    <div className="mb-6">
      <h4
        className="font-serif text-sm font-semibold uppercase tracking-widest mb-3 pb-1 border-b"
        style={{
          color: "oklch(0.37 0.12 25)",
          borderColor: "oklch(0.37 0.12 25 / 20%)",
        }}
      >
        {title}
      </h4>
      <div className="space-y-0">
        {items.map((wine) => (
          <div
            key={wine.name}
            data-ocid="wine.item.1"
            className="flex items-center justify-between py-2.5 border-b border-maroon/10 last:border-0 group"
          >
            <span className="font-sans font-medium text-sm text-foreground group-hover:text-primary transition-colors">
              {wine.name}
            </span>
            <div className="flex gap-4 items-center">
              {wine.glass ? (
                <span className="text-xs text-muted-foreground font-sans">
                  <span className="inline-flex items-center gap-1">
                    <GlassWater size={11} />
                    {wine.glass}
                  </span>
                </span>
              ) : (
                <span className="text-xs text-muted-foreground font-sans w-12" />
              )}
              <span className="text-xs text-muted-foreground font-sans">
                <span className="inline-flex items-center gap-1">
                  <Wine size={11} />
                  {wine.bottle}
                </span>
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
  return (
    <div>
      <WineTable title="Sparkling & Rosé" items={winesData.sparklingRose} />
      <WineTable title="White Wine" items={winesData.white} />
      <WineTable title="Red Wine" items={winesData.red} />
      <p className="text-xs text-muted-foreground font-sans mt-2">
        <GlassWater size={11} className="inline mr-1" />
        Glass&nbsp;&nbsp;
        <Wine size={11} className="inline mr-1" />
        Bottle
      </p>
    </div>
  );
}

function CategorySection({
  cat,
  startIndex,
}: { cat: MenuCategory; startIndex: number }) {
  return (
    <div className="mb-8">
      <div className="flex items-baseline gap-3 mb-3">
        <h3
          className="font-serif text-base font-semibold uppercase tracking-widest"
          style={{ color: "oklch(0.37 0.12 25)" }}
        >
          {cat.category}
        </h3>
        {cat.note && (
          <span className="text-xs font-sans text-muted-foreground italic">
            {cat.note}
          </span>
        )}
      </div>
      <div>
        {cat.items.map((item, i) => (
          <MenuItemRow key={item.name} item={item} index={startIndex + i} />
        ))}
      </div>
    </div>
  );
}

function MenuSectionContent({
  categories,
  showWines = false,
}: { categories: MenuCategory[]; showWines?: boolean }) {
  let runningIndex = 0;
  return (
    <motion.div
      key={categories[0]?.category}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
    >
      <div className="grid md:grid-cols-2 gap-x-12">
        {categories.map((cat) => {
          const section = (
            <CategorySection
              key={cat.category}
              cat={cat}
              startIndex={runningIndex}
            />
          );
          runningIndex += cat.items.length;
          return section;
        })}
        {showWines && (
          <div className="mb-8 md:col-span-2">
            <div className="flex items-baseline gap-3 mb-3">
              <h3
                className="font-serif text-base font-semibold uppercase tracking-widest"
                style={{ color: "oklch(0.37 0.12 25)" }}
              >
                Wines
              </h3>
            </div>
            <WineSection />
          </div>
        )}
      </div>
    </motion.div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
const TABS = [
  { id: "drinks", label: "Drinks" },
  { id: "brunch", label: "Brunch" },
  { id: "dinner", label: "Dinner" },
  { id: "kids", label: "Kids" },
  { id: "desserts", label: "Desserts" },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("brunch");
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  // Typewriter for tagline
  const tagline = "World Famous Pancakes & Classic American Comfort Food";
  const [displayed, setDisplayed] = useState("");
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setDisplayed(tagline.slice(0, i + 1));
      i++;
      if (i >= tagline.length) clearInterval(timer);
    }, 38);
    return () => clearInterval(timer);
  }, []);

  const scrollToMenu = () => {
    document
      .getElementById("menu-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <PolicyBanner />

      {/* Sticky Header */}
      <header
        className="sticky top-0 z-50 w-full shadow-parchment"
        style={{ backgroundColor: "oklch(0.94 0.022 80)" }}
      >
        <div className="max-w-6xl mx-auto px-4 py-0">
          <div className="flex items-center justify-between h-16">
            <motion.div
              className="font-serif font-bold text-2xl tracking-[0.15em] uppercase select-none"
              style={{ color: "oklch(0.32 0.11 25)" }}
              whileHover={{ letterSpacing: "0.22em" }}
              transition={{ duration: 0.3 }}
            >
              Bubby's
            </motion.div>
            <nav
              className="hidden md:flex items-center gap-1"
              aria-label="Menu sections"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  data-ocid={`nav.${tab.id}.tab`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    scrollToMenu();
                  }}
                  className={`px-4 py-2 text-sm font-sans font-medium uppercase tracking-wider rounded-sm transition-all duration-200 ${
                    activeTab === tab.id
                      ? "text-primary-foreground"
                      : "hover:bg-maroon/10"
                  }`}
                  style={
                    activeTab === tab.id
                      ? {
                          backgroundColor: "oklch(0.37 0.12 25)",
                          color: "oklch(0.96 0.015 75)",
                        }
                      : { color: "oklch(0.37 0.12 25)" }
                  }
                >
                  {tab.label}
                </button>
              ))}
            </nav>
            <a
              href="tel:2122190666"
              data-ocid="header.phone.button"
              className="hidden md:flex items-center gap-2 text-sm font-sans font-medium px-4 py-2 rounded-sm border-2 transition-all duration-200 hover:text-primary-foreground"
              style={{
                borderColor: "oklch(0.37 0.12 25)",
                color: "oklch(0.37 0.12 25)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "oklch(0.37 0.12 25)";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "oklch(0.96 0.015 75)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLAnchorElement).style.backgroundColor =
                  "transparent";
                (e.currentTarget as HTMLAnchorElement).style.color =
                  "oklch(0.37 0.12 25)";
              }}
            >
              <Phone size={14} />
              Reserve
            </a>
          </div>
          <div className="md:hidden flex gap-1 pb-2 overflow-x-auto scrollbar-hide">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                type="button"
                data-ocid={`mobile.nav.${tab.id}.tab`}
                onClick={() => {
                  setActiveTab(tab.id);
                  scrollToMenu();
                }}
                className="shrink-0 px-3 py-1.5 text-xs font-sans font-medium uppercase tracking-wider rounded-sm transition-all duration-200"
                style={
                  activeTab === tab.id
                    ? {
                        backgroundColor: "oklch(0.37 0.12 25)",
                        color: "oklch(0.96 0.015 75)",
                      }
                    : {
                        color: "oklch(0.37 0.12 25)",
                        border: "1px solid oklch(0.37 0.12 25 / 30%)",
                      }
                }
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Hero with parallax + particles + typewriter */}
      <section
        ref={heroRef}
        className="relative w-full overflow-hidden"
        style={{ minHeight: "480px" }}
      >
        <motion.img
          src="/assets/generated/bubbys-hero.dim_1600x700.jpg"
          alt="Bubby's restaurant"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ y: heroY }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(to bottom, rgba(26,10,8,0.55) 0%, rgba(26,10,8,0.75) 100%)",
          }}
        />
        <FloatingParticles count={22} />
        <motion.div
          style={{ opacity: heroOpacity }}
          className="relative z-10 flex flex-col items-center justify-center text-center px-6 py-28"
        >
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="font-sans uppercase tracking-[0.3em] text-xs mb-4"
            style={{ color: "oklch(0.85 0.08 75)" }}
          >
            New York City · Est. 1990
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-serif text-5xl md:text-7xl font-bold uppercase tracking-wide mb-4"
            style={{
              color: "oklch(0.96 0.025 75)",
              textShadow: "0 2px 32px rgba(0,0,0,0.5)",
            }}
          >
            Bubby's
          </motion.h1>
          {/* Typewriter tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
            className="font-serif italic text-xl md:text-2xl mb-8 min-h-[2rem]"
            style={{ color: "oklch(0.88 0.04 75)" }}
          >
            {displayed}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY }}
            >
              |
            </motion.span>
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="flex flex-wrap justify-center items-center gap-6 text-sm font-sans"
            style={{ color: "oklch(0.80 0.04 75)" }}
          >
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              Brunch 8 AM – 4 PM
            </span>
            <span className="w-px h-4 bg-current opacity-30" />
            <span className="flex items-center gap-1.5">
              <Clock size={14} />
              Dinner until 9:30 PM
            </span>
            <span className="w-px h-4 bg-current opacity-30 hidden sm:block" />
            <span className="hidden sm:flex items-center gap-1.5">
              <Phone size={14} />
              212-219-0666
            </span>
          </motion.div>
          {/* Scroll cue */}
          <motion.button
            onClick={scrollToMenu}
            type="button"
            className="mt-10 flex flex-col items-center gap-1 opacity-60 hover:opacity-100 transition-opacity"
            style={{ color: "oklch(0.85 0.06 75)" }}
            animate={{ y: [0, 8, 0] }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            <span className="font-sans text-xs uppercase tracking-widest">
              View Menu
            </span>
            <ChevronDown size={18} />
          </motion.button>
        </motion.div>
      </section>

      {/* Featured Spotlight */}
      <FeaturedSpotlight />

      {/* Menu Section */}
      <main id="menu-section" className="flex-1 py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              <p
                className="font-sans uppercase tracking-[0.25em] text-xs mb-2"
                style={{ color: "oklch(0.37 0.12 25)" }}
              >
                Our Menu
              </p>
              <h2
                className="font-serif text-4xl font-bold uppercase tracking-wide"
                style={{ color: "oklch(0.32 0.11 25)" }}
              >
                {TABS.find((t) => t.id === activeTab)?.label}
                {activeTab === "brunch" && (
                  <span
                    className="ml-3 font-sans text-sm font-normal normal-case tracking-normal"
                    style={{ color: "oklch(0.37 0.12 25 / 70%)" }}
                  >
                    8 AM – 4 PM
                  </span>
                )}
              </h2>
              <motion.div
                className="mx-auto mt-3 h-0.5 w-16 rounded-full"
                style={{ backgroundColor: "oklch(0.37 0.12 25)" }}
                layoutId="menu-underline"
              />
            </motion.div>
          </div>

          <div
            className="rounded-lg border-2 p-6 md:p-10 shadow-parchment"
            style={{
              backgroundColor: "oklch(0.96 0.018 78)",
              borderColor: "oklch(0.37 0.12 25 / 35%)",
            }}
          >
            <AnimatePresence mode="wait">
              {activeTab === "drinks" && (
                <MenuSectionContent
                  key="drinks"
                  categories={drinksData}
                  showWines
                />
              )}
              {activeTab === "brunch" && (
                <MenuSectionContent key="brunch" categories={brunchData} />
              )}
              {activeTab === "dinner" && (
                <MenuSectionContent key="dinner" categories={dinnerData} />
              )}
              {activeTab === "kids" && (
                <MenuSectionContent key="kids" categories={kidsData} />
              )}
              {activeTab === "desserts" && (
                <MenuSectionContent key="desserts" categories={dessertsData} />
              )}
            </AnimatePresence>
          </div>

          <p className="text-center text-xs text-muted-foreground font-sans mt-6">
            ⚠️ Raw/undercooked food items may be served. Some dishes contain leaf
            lard. Consuming raw or undercooked meats, poultry, seafood, or eggs
            may increase your risk of foodborne illness.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer
        className="w-full py-12 px-4 mt-8"
        style={{ backgroundColor: "oklch(0.25 0.03 230)" }}
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-10 mb-8">
            <div>
              <div
                className="font-serif text-4xl font-bold uppercase tracking-[0.12em] mb-3"
                style={{ color: "oklch(0.91 0.015 80)" }}
              >
                Bubby's
              </div>
              <p
                className="font-serif italic text-sm"
                style={{ color: "oklch(0.70 0.02 80)" }}
              >
                World Famous Pancakes & Classic American Comfort Food
              </p>
              <p
                className="font-sans text-xs mt-3"
                style={{ color: "oklch(0.60 0.015 80)" }}
              >
                New York City · Est. 1990
              </p>
            </div>
            <div>
              <h4
                className="font-sans text-xs uppercase tracking-widest font-semibold mb-4"
                style={{ color: "oklch(0.60 0.04 75)" }}
              >
                Contact & Hours
              </h4>
              <ul
                className="space-y-2 font-sans text-sm"
                style={{ color: "oklch(0.78 0.02 80)" }}
              >
                <li className="flex items-center gap-2">
                  <Phone size={13} />
                  <a href="tel:2122190666" className="hover:underline">
                    212-219-0666
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <MapPin size={13} className="mt-0.5 shrink-0" />
                  <span>120 Hudson St, New York, NY</span>
                </li>
                <li className="flex items-start gap-2">
                  <Clock size={13} className="mt-0.5 shrink-0" />
                  <span>Brunch 8 AM – 4 PM · Dinner until 9:30 PM</span>
                </li>
              </ul>
            </div>
            <div>
              <h4
                className="font-sans text-xs uppercase tracking-widest font-semibold mb-4"
                style={{ color: "oklch(0.60 0.04 75)" }}
              >
                Farm Sourcing
              </h4>
              <ul
                className="space-y-2 font-sans text-sm"
                style={{ color: "oklch(0.78 0.02 80)" }}
              >
                <li>🐔 Chicken — Sullivan County Farms</li>
                <li>🥩 Beef — Autumn Harvest Farm</li>
              </ul>
              <p
                className="font-sans text-xs mt-4"
                style={{ color: "oklch(0.55 0.015 80)" }}
              >
                We source locally and seasonally whenever possible.
              </p>
            </div>
          </div>
          <div
            className="pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3 text-xs font-sans"
            style={{
              borderColor: "oklch(0.91 0.015 80 / 12%)",
              color: "oklch(0.55 0.015 80)",
            }}
          >
            <p>
              © {new Date().getFullYear()} Bubby's Restaurant. All rights
              reserved.
            </p>
            <p>
              Built with ❤️ using{" "}
              <a
                href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:underline"
                style={{ color: "oklch(0.65 0.04 75)" }}
              >
                caffeine.ai
              </a>
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
