import {
  CheckCircle2,
  ChevronDown,
  Clock,
  Facebook,
  Instagram,
  MapPin,
  Menu,
  Minus,
  Phone,
  Plus,
  ShoppingBag,
  Star,
  Trash2,
  Twitter,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────

type MenuCategory = "pancakes" | "breakfast" | "lunch" | "drinks";

interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

const MENU_ITEMS: Record<MenuCategory, MenuItem[]> = {
  pancakes: [
    {
      name: "Classic Pancakes",
      description:
        "Fluffy buttermilk pancakes served with real maple syrup and fresh butter",
      price: 14,
      image: "/assets/generated/pancakes-classic.dim_600x400.jpg",
    },
    {
      name: "Blueberry Pancakes",
      description: "Loaded with fresh blueberries and lemon zest whipped cream",
      price: 16,
      image: "/assets/generated/pancakes-blueberry.dim_600x400.jpg",
    },
    {
      name: "Banana Walnut Pancakes",
      description: "Caramelized bananas, toasted walnuts, cinnamon butter",
      price: 15,
      image: "/assets/generated/pancakes-classic.dim_600x400.jpg",
    },
    {
      name: "Short Stack",
      description: "Two golden pancakes — simple, classic, perfect",
      price: 10,
      image: "/assets/generated/pancakes-blueberry.dim_600x400.jpg",
    },
  ],
  breakfast: [
    {
      name: "Eggs Benedict",
      description:
        "Poached eggs, Canadian bacon, hollandaise on an English muffin",
      price: 18,
      image: "/assets/generated/eggs-benedict.dim_600x400.jpg",
    },
    {
      name: "Full Breakfast Plate",
      description: "Two eggs any style, crispy bacon, home fries, and toast",
      price: 16,
      image: "/assets/generated/breakfast-plate.dim_600x400.jpg",
    },
    {
      name: "Avocado Toast",
      description:
        "Smashed avocado, cherry tomatoes, everything bagel seasoning",
      price: 14,
      image: "/assets/generated/eggs-benedict.dim_600x400.jpg",
    },
    {
      name: "Granola Bowl",
      description: "House granola, Greek yogurt, seasonal fruit, local honey",
      price: 12,
      image: "/assets/generated/breakfast-plate.dim_600x400.jpg",
    },
  ],
  lunch: [
    {
      name: "Classic Burger",
      description: "8oz beef patty, aged cheddar, caramelized onions, pickles",
      price: 18,
      image: "/assets/generated/burger-classic.dim_600x400.jpg",
    },
    {
      name: "Club Sandwich",
      description: "Triple-decker turkey, bacon, lettuce, tomato, house mayo",
      price: 17,
      image: "/assets/generated/club-sandwich.dim_600x400.jpg",
    },
    {
      name: "BLT",
      description:
        "Thick-cut bacon, heirloom tomato, butter lettuce, sourdough",
      price: 15,
      image: "/assets/generated/burger-classic.dim_600x400.jpg",
    },
    {
      name: "Grilled Cheese",
      description: "Three-cheese blend on pullman bread with tomato soup",
      price: 13,
      image: "/assets/generated/club-sandwich.dim_600x400.jpg",
    },
  ],
  drinks: [
    {
      name: "Fresh Lemonade",
      description:
        "Hand-squeezed lemonade with a hint of lavender, served ice cold",
      price: 6,
      image: "/assets/generated/lemonade-fresh.dim_600x400.jpg",
    },
    {
      name: "Hot Chocolate",
      description: "Rich, velvety dark chocolate with fresh whipped cream",
      price: 7,
      image: "/assets/generated/hot-chocolate.dim_600x400.jpg",
    },
    {
      name: "Iced Tea",
      description: "House-brewed black tea with fresh lemon and mint",
      price: 5,
      image: "/assets/generated/lemonade-fresh.dim_600x400.jpg",
    },
    {
      name: "Coffee",
      description:
        "House blend drip coffee, locally roasted, bottomless refills",
      price: 4,
      image: "/assets/generated/hot-chocolate.dim_600x400.jpg",
    },
  ],
};

const ALL_ITEMS: MenuItem[] = Object.values(MENU_ITEMS).flat();

const CATEGORY_LABELS: { key: MenuCategory; label: string }[] = [
  { key: "pancakes", label: "Pancakes" },
  { key: "breakfast", label: "Breakfast" },
  { key: "lunch", label: "Lunch" },
  { key: "drinks", label: "Drinks" },
];

const TESTIMONIALS = [
  {
    quote: "Best pancakes in NYC. This place is a true institution.",
    name: "Sarah M.",
    location: "Manhattan",
  },
  {
    quote:
      "Amazing brunch experience. The eggs benedict are out of this world.",
    name: "John D.",
    location: "Brooklyn",
  },
  {
    quote: "Cozy atmosphere, incredible food. We come back every weekend.",
    name: "Emily R.",
    location: "Queens",
  },
];

const DELIVERY_FEE = 3;

// ─── Sub-components ───────────────────────────────────────────────────────────

function StarRating() {
  return (
    <div className="flex gap-0.5" aria-label="5 stars">
      {[1, 2, 3, 4, 5].map((i) => (
        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
      ))}
    </div>
  );
}

function MenuCard({
  item,
  index,
  qty,
  onAdd,
}: {
  item: MenuItem;
  index: number;
  qty: number;
  onAdd: (name: string) => void;
}) {
  return (
    <article
      className="bg-card rounded-2xl overflow-hidden shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 flex flex-col sm:flex-row lg:flex-col"
      data-ocid={`menu.item.${index + 1}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden sm:w-44 lg:w-full shrink-0 h-48 sm:h-auto lg:h-48">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
        {qty > 0 && (
          <div className="absolute top-2 right-2 w-6 h-6 rounded-full bg-brand-red text-white text-xs font-bold flex items-center justify-center shadow">
            {qty}
          </div>
        )}
      </div>
      {/* Content */}
      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display font-semibold text-lg text-foreground mb-1 leading-snug">
          {item.name}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
          {item.description}
        </p>
        <div className="flex items-center justify-between mt-auto">
          <span className="text-brand-red font-bold text-xl font-body">
            ${item.price}
          </span>
          <button
            type="button"
            onClick={() => onAdd(item.name)}
            className="bg-brand-brown text-white text-sm font-semibold px-4 py-2 rounded-full hover:opacity-90 active:scale-95 transition-all flex items-center gap-1.5"
            data-ocid={`menu.primary_button.${index + 1}`}
          >
            <Plus className="w-3.5 h-3.5" />
            Add
          </button>
        </div>
      </div>
    </article>
  );
}

// ─── Cart Bar ─────────────────────────────────────────────────────────────────

function CartBar({
  cart,
  onClear,
  onViewOrder,
}: {
  cart: Record<string, number>;
  onClear: () => void;
  onViewOrder: () => void;
}) {
  const totalQty = Object.values(cart).reduce((s, q) => s + q, 0);
  const totalPrice = ALL_ITEMS.filter((i) => cart[i.name]).reduce(
    (s, i) => s + i.price * (cart[i.name] ?? 0),
    0,
  );

  return (
    <motion.div
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: 100, opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 28 }}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 w-[calc(100%-2rem)] max-w-md"
      data-ocid="cart.panel"
    >
      <button
        type="button"
        onClick={onViewOrder}
        className="w-full bg-brand-red text-white rounded-2xl shadow-2xl px-5 py-4 flex items-center gap-4 hover:opacity-95 active:scale-[0.99] transition-all"
      >
        <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center shrink-0">
          <ShoppingBag className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0 text-left">
          <p className="font-body font-bold text-sm leading-none">
            {totalQty} {totalQty === 1 ? "item" : "items"} — View Order
          </p>
          <p className="font-body text-xs text-white/75 mt-0.5">
            Tap to review before placing
          </p>
        </div>
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-display font-bold text-lg">${totalPrice}</span>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              onClear();
            }}
            className="w-7 h-7 bg-white/20 hover:bg-white/30 rounded-full flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Clear cart"
            data-ocid="cart.delete_button"
          >
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      </button>
    </motion.div>
  );
}

// ─── Order Success Dialog ─────────────────────────────────────────────────────

function OrderSuccessDialog({
  name,
  orderNumber,
  onClose,
}: {
  name: string;
  orderNumber: string;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm flex items-center justify-center px-4"
      data-ocid="order.dialog"
    >
      <motion.div
        initial={{ scale: 0.85, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.85, opacity: 0 }}
        transition={{ type: "spring", stiffness: 280, damping: 24 }}
        className="bg-card rounded-3xl shadow-2xl p-10 max-w-sm w-full text-center"
      >
        <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
          <CheckCircle2
            className="w-10 h-10 text-green-500"
            strokeWidth={1.5}
          />
        </div>
        <h3 className="font-display text-3xl font-bold text-foreground mb-2">
          Order Placed!
        </h3>
        <p className="font-body text-muted-foreground mb-4 leading-relaxed">
          Thank you <strong className="text-foreground">{name}</strong>! Your
          order will be delivered in{" "}
          <span className="text-brand-red font-semibold">30–45 minutes</span>.
        </p>
        <div className="inline-flex items-center gap-2 bg-muted/60 rounded-xl px-5 py-3 mb-8">
          <span className="font-body text-xs text-muted-foreground uppercase tracking-wider">
            Order #
          </span>
          <span className="font-display font-bold text-foreground text-lg">
            {orderNumber}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          className="w-full bg-brand-red text-white font-body font-bold py-4 rounded-2xl hover:opacity-90 active:scale-95 transition-all text-base"
          data-ocid="order.primary_button"
        >
          Back to Menu
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Order Section ────────────────────────────────────────────────────────────

function OrderSection({
  cart,
  onAdd,
  onRemove,
  onDelete,
  onClear,
}: {
  cart: Record<string, number>;
  onAdd: (name: string) => void;
  onRemove: (name: string) => void;
  onDelete: (name: string) => void;
  onClear: () => void;
}) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    address: "",
    instructions: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showSuccess, setShowSuccess] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const cartItems = ALL_ITEMS.filter((i) => (cart[i.name] ?? 0) > 0);
  const subtotal = cartItems.reduce(
    (s, i) => s + i.price * (cart[i.name] ?? 0),
    0,
  );
  const total = subtotal + (cartItems.length > 0 ? DELIVERY_FEE : 0);

  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.phone.trim()) e.phone = "Phone number is required";
    if (!form.address.trim()) e.address = "Delivery address is required";
    return e;
  };

  const handlePlaceOrder = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    const num = String(Math.floor(1000 + Math.random() * 9000));
    setOrderNumber(num);
    setShowSuccess(true);
  };

  const handleSuccessClose = () => {
    setShowSuccess(false);
    onClear();
    setForm({ name: "", phone: "", address: "", instructions: "" });
    setErrors({});
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section id="order" className="py-24 bg-muted/20">
      <AnimatePresence>
        {showSuccess && (
          <OrderSuccessDialog
            name={form.name}
            orderNumber={orderNumber}
            onClose={handleSuccessClose}
          />
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-6">
        {/* Heading */}
        <div className="text-center mb-14">
          <p className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-brand-red mb-3">
            Delivery & Pickup
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
            Your Order
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Review your items, fill in delivery details, and place your order.
          </p>
        </div>

        {cartItems.length === 0 ? (
          /* Empty state */
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-md mx-auto text-center py-20"
            data-ocid="order.empty_state"
          >
            <div className="w-24 h-24 rounded-full bg-card shadow-card flex items-center justify-center mx-auto mb-6">
              <ShoppingBag
                className="w-10 h-10 text-muted-foreground"
                strokeWidth={1.5}
              />
            </div>
            <h3 className="font-display text-2xl font-bold text-foreground mb-2">
              Your order is empty
            </h3>
            <p className="font-body text-muted-foreground mb-8">
              Add items from the menu above to get started.
            </p>
            <button
              type="button"
              onClick={scrollToMenu}
              className="bg-brand-red text-white font-body font-bold px-8 py-3.5 rounded-full hover:opacity-90 active:scale-95 transition-all"
              data-ocid="order.primary_button"
            >
              Browse Menu
            </button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-10">
            {/* ── Left: Cart Items ─────────────────────────────────────── */}
            <div className="lg:col-span-3 space-y-4">
              <h3 className="font-display text-xl font-bold text-foreground mb-6">
                Items in your order
              </h3>

              {cartItems.map((item, idx) => (
                <motion.div
                  key={item.name}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-card rounded-2xl shadow-card p-4 flex gap-4 items-start"
                  data-ocid={`order.item.${idx + 1}`}
                >
                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 rounded-xl object-cover shrink-0"
                  />

                  {/* Details */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-display font-semibold text-foreground text-base leading-snug">
                          {item.name}
                        </h4>
                        <p className="font-body text-xs text-muted-foreground mt-0.5 leading-relaxed">
                          {item.description}
                        </p>
                        <p className="font-body text-sm text-muted-foreground mt-1">
                          ${item.price} each
                        </p>
                      </div>
                      {/* Subtotal */}
                      <span className="font-display font-bold text-brand-red text-lg shrink-0">
                        ${item.price * (cart[item.name] ?? 0)}
                      </span>
                    </div>

                    {/* Quantity controls */}
                    <div className="flex items-center gap-2 mt-3">
                      <button
                        type="button"
                        onClick={() => onRemove(item.name)}
                        className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center hover:border-brand-red hover:text-brand-red transition-colors"
                        aria-label="Decrease quantity"
                        data-ocid={`order.secondary_button.${idx + 1}`}
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="font-body font-bold text-foreground w-6 text-center">
                        {cart[item.name]}
                      </span>
                      <button
                        type="button"
                        onClick={() => onAdd(item.name)}
                        className="w-8 h-8 rounded-full border-2 border-border flex items-center justify-center hover:border-brand-red hover:text-brand-red transition-colors"
                        aria-label="Increase quantity"
                        data-ocid={`order.primary_button.${idx + 1}`}
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onDelete(item.name)}
                        className="ml-2 w-8 h-8 rounded-full border-2 border-border text-muted-foreground flex items-center justify-center hover:border-red-400 hover:text-red-500 transition-colors"
                        aria-label="Remove item"
                        data-ocid={`order.delete_button.${idx + 1}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* ── Right: Summary + Form ────────────────────────────────── */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 space-y-6">
                {/* Order Summary Card */}
                <div
                  className="bg-card rounded-2xl shadow-card p-6"
                  data-ocid="order.panel"
                >
                  <h3 className="font-display text-xl font-bold text-foreground mb-5">
                    Order Summary
                  </h3>

                  <div className="space-y-2 mb-4">
                    {cartItems.map((item) => (
                      <div
                        key={item.name}
                        className="flex justify-between items-center"
                      >
                        <span className="font-body text-sm text-muted-foreground">
                          {item.name}{" "}
                          <span className="text-xs">×{cart[item.name]}</span>
                        </span>
                        <span className="font-body text-sm font-semibold text-foreground">
                          ${item.price * (cart[item.name] ?? 0)}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div className="h-px bg-border my-4" />

                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="font-body text-sm text-muted-foreground">
                        Subtotal
                      </span>
                      <span className="font-body text-sm text-foreground">
                        ${subtotal}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="font-body text-sm text-muted-foreground">
                        Delivery fee
                      </span>
                      <span className="font-body text-sm text-foreground">
                        ${DELIVERY_FEE}.00
                      </span>
                    </div>
                    <div className="h-px bg-border my-2" />
                    <div className="flex justify-between items-center">
                      <span className="font-display font-bold text-foreground text-lg">
                        Total
                      </span>
                      <span className="font-display font-bold text-brand-red text-2xl">
                        ${total}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Delivery Details Form */}
                <div className="bg-card rounded-2xl shadow-card p-6">
                  <h3 className="font-display text-xl font-bold text-foreground mb-5">
                    Delivery Details
                  </h3>

                  <div className="space-y-4">
                    {/* Name */}
                    <div>
                      <label
                        htmlFor="order-name"
                        className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block"
                      >
                        Full Name
                      </label>
                      <input
                        id="order-name"
                        type="text"
                        value={form.name}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, name: e.target.value }));
                          setErrors((p) => ({ ...p, name: "" }));
                        }}
                        placeholder="Your full name"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors"
                        data-ocid="order.input"
                      />
                      {errors.name && (
                        <p
                          className="font-body text-xs text-red-500 mt-1"
                          data-ocid="order.error_state"
                        >
                          {errors.name}
                        </p>
                      )}
                    </div>

                    {/* Phone */}
                    <div>
                      <label
                        htmlFor="order-phone"
                        className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block"
                      >
                        Phone Number
                      </label>
                      <input
                        id="order-phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, phone: e.target.value }));
                          setErrors((p) => ({ ...p, phone: "" }));
                        }}
                        placeholder="(212) 555-0100"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors"
                        data-ocid="order.input"
                      />
                      {errors.phone && (
                        <p
                          className="font-body text-xs text-red-500 mt-1"
                          data-ocid="order.error_state"
                        >
                          {errors.phone}
                        </p>
                      )}
                    </div>

                    {/* Address */}
                    <div>
                      <label
                        htmlFor="order-address"
                        className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block"
                      >
                        Delivery Address
                      </label>
                      <input
                        id="order-address"
                        type="text"
                        value={form.address}
                        onChange={(e) => {
                          setForm((p) => ({ ...p, address: e.target.value }));
                          setErrors((p) => ({ ...p, address: "" }));
                        }}
                        placeholder="123 Main St, New York, NY"
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors"
                        data-ocid="order.input"
                      />
                      {errors.address && (
                        <p
                          className="font-body text-xs text-red-500 mt-1"
                          data-ocid="order.error_state"
                        >
                          {errors.address}
                        </p>
                      )}
                    </div>

                    {/* Special Instructions */}
                    <div>
                      <label
                        htmlFor="order-instructions"
                        className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1.5 block"
                      >
                        Special Instructions{" "}
                        <span className="normal-case font-normal">
                          (optional)
                        </span>
                      </label>
                      <textarea
                        id="order-instructions"
                        value={form.instructions}
                        onChange={(e) =>
                          setForm((p) => ({
                            ...p,
                            instructions: e.target.value,
                          }))
                        }
                        placeholder="Allergies, dietary preferences..."
                        rows={3}
                        className="w-full bg-background border border-border rounded-xl px-4 py-3 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-red/30 focus:border-brand-red transition-colors resize-none"
                        data-ocid="order.textarea"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handlePlaceOrder}
                      className="w-full bg-brand-red text-white font-body font-bold py-4 rounded-2xl hover:opacity-90 active:scale-95 transition-all text-base mt-2"
                      data-ocid="order.submit_button"
                    >
                      Place Order · ${total}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

// ─── Reservation Section ──────────────────────────────────────────────────────

function ReservationSection() {
  const [form, setForm] = useState({
    name: "",
    date: "",
    time: "",
    guests: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = "Name is required";
    if (!form.date) e.date = "Please select a date";
    if (!form.time) e.time = "Please select a time";
    if (!form.guests) e.guests = "Please select number of guests";
    return e;
  };

  const handleSubmit = () => {
    const e = validate();
    if (Object.keys(e).length > 0) {
      setErrors(e);
      return;
    }
    setSubmitted(true);
  };

  const today = new Date().toISOString().split("T")[0];

  return (
    <section id="reserve" className="py-24 bg-background">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <p className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-brand-red mb-3">
            Book Your Table
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Make a
            <span className="block italic text-brand-brown">Reservation</span>
          </h2>
          <p className="font-body text-muted-foreground max-w-xl mx-auto">
            Reserve your table at Bubby's — walk-ins always welcome,
            reservations recommended on weekends.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-card rounded-3xl shadow-card p-10 text-center"
              data-ocid="reservation.success_state"
            >
              <div className="w-20 h-20 rounded-full bg-green-50 flex items-center justify-center mx-auto mb-6">
                <CheckCircle2
                  className="w-10 h-10 text-green-500"
                  strokeWidth={1.5}
                />
              </div>
              <h3 className="font-display text-3xl font-bold text-foreground mb-3">
                Reservation Received!
              </h3>
              <p className="font-body text-muted-foreground leading-relaxed mb-2">
                Thank you,{" "}
                <strong className="text-foreground">{form.name}</strong>!
              </p>
              <p className="font-body text-muted-foreground leading-relaxed mb-8">
                We&rsquo;ll confirm your reservation shortly. See you on{" "}
                <span className="font-semibold text-brand-brown">
                  {new Date(`${form.date}T00:00:00`).toLocaleDateString(
                    "en-US",
                    { weekday: "long", month: "long", day: "numeric" },
                  )}
                </span>{" "}
                at{" "}
                <span className="font-semibold text-brand-brown">
                  {form.time}
                </span>{" "}
                for{" "}
                <span className="font-semibold text-brand-brown">
                  {form.guests}{" "}
                  {Number.parseInt(form.guests) === 1 ? "guest" : "guests"}
                </span>
                .
              </p>
              <button
                type="button"
                onClick={() => {
                  setSubmitted(false);
                  setForm({ name: "", date: "", time: "", guests: "" });
                }}
                className="font-body text-sm text-brand-red underline-offset-2 hover:underline"
              >
                Make another reservation
              </button>
            </motion.div>
          ) : (
            <div
              className="bg-card rounded-3xl shadow-card p-8 md:p-10"
              data-ocid="reservation.panel"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="res-name"
                    className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block"
                  >
                    Your Name
                  </label>
                  <input
                    id="res-name"
                    type="text"
                    value={form.name}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, name: e.target.value }));
                      setErrors((p) => ({ ...p, name: "" }));
                    }}
                    placeholder="Full name"
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-brand-brown/30 focus:border-brand-brown transition-colors"
                    data-ocid="reservation.input"
                  />
                  {errors.name && (
                    <p
                      className="font-body text-xs text-red-500 mt-1"
                      data-ocid="reservation.error_state"
                    >
                      {errors.name}
                    </p>
                  )}
                </div>

                {/* Date */}
                <div>
                  <label
                    htmlFor="res-date"
                    className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block"
                  >
                    Date
                  </label>
                  <input
                    id="res-date"
                    type="date"
                    min={today}
                    value={form.date}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, date: e.target.value }));
                      setErrors((p) => ({ ...p, date: "" }));
                    }}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-brown/30 focus:border-brand-brown transition-colors"
                    data-ocid="reservation.input"
                  />
                  {errors.date && (
                    <p
                      className="font-body text-xs text-red-500 mt-1"
                      data-ocid="reservation.error_state"
                    >
                      {errors.date}
                    </p>
                  )}
                </div>

                {/* Time */}
                <div>
                  <label
                    htmlFor="res-time"
                    className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block"
                  >
                    Time
                  </label>
                  <select
                    id="res-time"
                    value={form.time}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, time: e.target.value }));
                      setErrors((p) => ({ ...p, time: "" }));
                    }}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-brown/30 focus:border-brand-brown transition-colors appearance-none cursor-pointer"
                    data-ocid="reservation.select"
                  >
                    <option value="" disabled>
                      Select a time
                    </option>
                    {[
                      "9:00 AM",
                      "9:30 AM",
                      "10:00 AM",
                      "10:30 AM",
                      "11:00 AM",
                      "11:30 AM",
                      "12:00 PM",
                      "12:30 PM",
                      "1:00 PM",
                      "1:30 PM",
                      "2:00 PM",
                      "2:30 PM",
                      "5:00 PM",
                      "5:30 PM",
                      "6:00 PM",
                      "6:30 PM",
                      "7:00 PM",
                      "7:30 PM",
                      "8:00 PM",
                      "8:30 PM",
                      "9:00 PM",
                    ].map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>
                  {errors.time && (
                    <p
                      className="font-body text-xs text-red-500 mt-1"
                      data-ocid="reservation.error_state"
                    >
                      {errors.time}
                    </p>
                  )}
                </div>

                {/* Guests */}
                <div className="md:col-span-2">
                  <label
                    htmlFor="res-guests"
                    className="font-body text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 block"
                  >
                    Number of Guests
                  </label>
                  <select
                    id="res-guests"
                    value={form.guests}
                    onChange={(e) => {
                      setForm((p) => ({ ...p, guests: e.target.value }));
                      setErrors((p) => ({ ...p, guests: "" }));
                    }}
                    className="w-full bg-background border border-border rounded-xl px-4 py-3.5 font-body text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-brand-brown/30 focus:border-brand-brown transition-colors appearance-none cursor-pointer"
                    data-ocid="reservation.select"
                  >
                    <option value="" disabled>
                      Select number of guests
                    </option>
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
                      <option key={n} value={String(n)}>
                        {n} {n === 1 ? "Guest" : "Guests"}
                      </option>
                    ))}
                  </select>
                  {errors.guests && (
                    <p
                      className="font-body text-xs text-red-500 mt-1"
                      data-ocid="reservation.error_state"
                    >
                      {errors.guests}
                    </p>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={handleSubmit}
                className="w-full mt-8 bg-brand-brown text-white font-body font-bold py-4 rounded-2xl hover:opacity-90 active:scale-95 transition-all text-base"
                data-ocid="reservation.submit_button"
              >
                Reserve Table
              </button>

              <p className="text-center font-body text-xs text-muted-foreground mt-4">
                Walk-ins always welcome · Reservations recommended on weekends
              </p>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [activeTab, setActiveTab] = useState<MenuCategory>("pancakes");
  const [cart, setCart] = useState<Record<string, number>>({});
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const menuRef = useRef<HTMLElement>(null);

  const hasCart = Object.values(cart).some((q) => q > 0);

  const handleAdd = (name: string) => {
    setCart((p) => ({ ...p, [name]: (p[name] ?? 0) + 1 }));
  };

  const handleRemove = (name: string) => {
    setCart((p) => {
      const qty = (p[name] ?? 0) - 1;
      if (qty <= 0) {
        const next = { ...p };
        delete next[name];
        return next;
      }
      return { ...p, [name]: qty };
    });
  };

  const handleDelete = (name: string) => {
    setCart((p) => {
      const next = { ...p };
      delete next[name];
      return next;
    });
  };

  const scrollToMenu = () =>
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" });
  const scrollToOrder = () =>
    document.getElementById("order")?.scrollIntoView({ behavior: "smooth" });
  const scrollToReserve = () =>
    document.getElementById("reserve")?.scrollIntoView({ behavior: "smooth" });

  // Close mobile menu on outside click
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handler = () => setMobileMenuOpen(false);
    document.addEventListener("click", handler);
    return () => document.removeEventListener("click", handler);
  }, [mobileMenuOpen]);

  const NAV_LINKS = [
    { label: "Menu", href: "#menu" },
    { label: "Our Story", href: "#story" },
    { label: "Reservations", href: "#reserve" },
    { label: "Order Online", href: "#order", badge: hasCart },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header
        className="fixed top-0 left-0 right-0 z-40 bg-background/95 backdrop-blur-sm shadow-nav"
        data-ocid="nav.panel"
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <a
            href="#story"
            className="font-display text-2xl font-bold text-brand-brown"
            data-ocid="nav.link"
          >
            Bubby&rsquo;s
          </a>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
            {NAV_LINKS.map(({ label, href, badge }) => (
              <a
                key={label}
                href={href}
                className="font-body text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5"
                data-ocid="nav.link"
              >
                {label}
                {badge && (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                )}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <a
              href="#reserve"
              className="hidden md:inline-flex bg-brand-brown text-white font-body font-bold text-sm px-5 py-2.5 rounded-full hover:opacity-90 active:scale-95 transition-all"
              data-ocid="nav.primary_button"
            >
              Reserve Table
            </a>
            <button
              type="button"
              className="md:hidden p-2 text-foreground"
              onClick={(e) => {
                e.stopPropagation();
                setMobileMenuOpen((v) => !v);
              }}
              aria-label="Toggle menu"
              data-ocid="nav.toggle"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div
            className="md:hidden bg-background border-t border-border px-6 py-4 flex flex-col gap-4"
            role="menu"
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => e.stopPropagation()}
          >
            {NAV_LINKS.map(({ label, href, badge }) => (
              <a
                key={label}
                href={href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-body text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors flex items-center gap-1.5 py-1"
                data-ocid="nav.link"
              >
                {label}
                {badge && (
                  <span className="w-2.5 h-2.5 rounded-full bg-brand-red" />
                )}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        aria-label="Hero"
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage:
              "url('/assets/generated/hero-pancakes.dim_1400x800.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

        <div className="relative z-10 text-center text-white px-6 max-w-3xl mx-auto">
          <p className="font-body text-sm font-medium tracking-[0.2em] uppercase text-yellow-300 mb-4 animate-fade-in">
            Est. 1990 — TriBeCa, New York
          </p>
          <h1 className="font-display text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up">
            Classic American
            <span className="block italic text-yellow-200">Comfort Food</span>
            Since 1990
          </h1>
          <p className="font-body text-lg md:text-xl text-white/85 mb-10 leading-relaxed animate-fade-up">
            Serving New York&rsquo;s favorite pancakes, pies,
            <br className="hidden md:block" /> and brunch classics
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up">
            <button
              type="button"
              onClick={scrollToReserve}
              className="bg-brand-red text-white font-body font-bold px-8 py-4 rounded-full text-base hover:opacity-90 active:scale-95 transition-all shadow-lg"
              data-ocid="hero.primary_button"
            >
              Reserve a Table
            </button>
            <button
              type="button"
              onClick={scrollToMenu}
              className="border-2 border-white text-white font-body font-bold px-8 py-4 rounded-full text-base hover:bg-white hover:text-brand-dark active:scale-95 transition-all"
              data-ocid="hero.secondary_button"
            >
              View Menu
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 animate-bounce">
          <ChevronDown className="w-6 h-6" />
        </div>
      </section>

      {/* ── Brand Story ─────────────────────────────────────────────────── */}
      <section id="story" className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-16 items-center">
          <div>
            <p className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-brand-red mb-3">
              Our Heritage
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-6 leading-tight">
              A New York
              <span className="block italic text-brand-brown">Tradition</span>
            </h2>
            <div className="w-16 h-1 bg-brand-red rounded-full mb-8" />
            <p className="font-body text-muted-foreground leading-relaxed mb-5 text-lg">
              Since Ron Silver opened Bubby&rsquo;s doors in 1990, we&rsquo;ve
              been more than just a restaurant — we&rsquo;re a gathering place.
              Our recipes were passed down from grandmothers who cooked from the
              heart, filling kitchens with the smell of fresh-baked pies and
              golden pancakes.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed mb-5">
              In the heart of TriBeCa, we&rsquo;ve watched the neighborhood grow
              and change around us, but one thing has never wavered: our
              commitment to honest, soulful American comfort food. Every
              ingredient is sourced with care, every dish made with love.
            </p>
            <p className="font-body text-muted-foreground leading-relaxed">
              Generations of New Yorkers have celebrated birthdays, first dates,
              Sunday mornings, and life&rsquo;s quiet moments at our tables.
              That&rsquo;s the tradition we&rsquo;re honored to carry forward.
            </p>
          </div>

          <div className="relative">
            <div className="bg-card rounded-3xl p-10 shadow-card">
              <div className="grid grid-cols-3 gap-6 mb-10">
                {[
                  { value: "30+", label: "Years Serving NYC" },
                  { value: "Millions", label: "Guests Welcomed" },
                  { value: "1", label: "Iconic Location" },
                ].map(({ value, label }) => (
                  <div key={label} className="text-center">
                    <div className="font-display text-3xl md:text-4xl font-bold text-brand-red mb-2">
                      {value}
                    </div>
                    <div className="font-body text-xs text-muted-foreground uppercase tracking-wide">
                      {label}
                    </div>
                  </div>
                ))}
              </div>
              <div className="rounded-2xl overflow-hidden h-72">
                <img
                  src="/assets/generated/breakfast-plate.dim_600x400.jpg"
                  alt="Bubby's classic breakfast"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -top-6 -right-6 w-24 h-24 rounded-full bg-brand-red flex flex-col items-center justify-center text-white shadow-lg">
                <span className="font-display font-bold text-xl leading-none">
                  Est.
                </span>
                <span className="font-display font-bold text-2xl leading-none">
                  1990
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Menu ────────────────────────────────────────────────────────── */}
      <section id="menu" ref={menuRef} className="py-24 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-brand-red mb-3">
              Handcrafted Daily
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Our Menu
            </h2>
            <p className="font-body text-muted-foreground max-w-xl mx-auto">
              Fresh ingredients, family recipes, made with love every single
              day.
            </p>
          </div>

          {/* Category Tabs */}
          <div className="flex justify-center mb-10" data-ocid="menu.tab">
            <div className="flex gap-1 bg-card rounded-full p-1.5 shadow-card overflow-x-auto max-w-full">
              {CATEGORY_LABELS.map(({ key, label }) => (
                <button
                  type="button"
                  key={key}
                  onClick={() => setActiveTab(key)}
                  className={`font-body font-semibold text-sm px-5 py-2.5 rounded-full whitespace-nowrap transition-all duration-200 ${
                    activeTab === key
                      ? "bg-brand-brown text-white shadow-sm"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                  data-ocid="menu.tab"
                >
                  {label}
                </button>
              ))}
            </div>
          </div>

          {/* Menu Grid */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2 }}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
            >
              {MENU_ITEMS[activeTab].map((item, i) => (
                <MenuCard
                  key={item.name}
                  item={item}
                  index={i}
                  qty={cart[item.name] ?? 0}
                  onAdd={handleAdd}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ── Order Section ───────────────────────────────────────────────── */}
      <OrderSection
        cart={cart}
        onAdd={handleAdd}
        onRemove={handleRemove}
        onDelete={handleDelete}
        onClear={() => setCart({})}
      />

      {/* ── Reservation Section ─────────────────────────────────────────── */}
      <ReservationSection />

      {/* ── Why Choose Us ───────────────────────────────────────────────── */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-brand-red mb-3">
              Why Bubby&rsquo;s
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              Why Choose Us
            </h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: "🏆",
                title: "30+ Years of Tradition",
                desc: "Since 1990, serving New York with the same love and care in every dish.",
              },
              {
                icon: "🌿",
                title: "Locally Sourced",
                desc: "We partner with local farms for the freshest, highest-quality ingredients.",
              },
              {
                icon: "🗽",
                title: "Famous NYC Brunch",
                desc: "A beloved TriBeCa institution, consistently rated one of NYC&rsquo;s best brunch spots.",
              },
              {
                icon: "❤️",
                title: "Loved by Thousands",
                desc: "Generations of New Yorkers return week after week — that says it all.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-card rounded-2xl p-7 shadow-card text-center hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="font-display font-semibold text-lg text-foreground mb-2">
                  {item.title}
                </h3>
                <p className="font-body text-sm text-muted-foreground leading-relaxed">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Testimonials ────────────────────────────────────────────────── */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <p className="font-body text-xs font-semibold tracking-[0.25em] uppercase text-brand-red mb-3">
              Guest Reviews
            </p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground">
              What New Yorkers Say
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((t, i) => (
              <motion.article
                key={t.name}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-card rounded-2xl p-8 shadow-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-border/50"
                data-ocid={`testimonials.item.${i + 1}`}
              >
                <StarRating />
                <blockquote className="font-display text-foreground leading-relaxed mt-5 mb-6 text-lg italic">
                  &ldquo;{t.quote}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-brand-red/10 flex items-center justify-center">
                    <span className="font-display font-bold text-brand-red text-sm">
                      {t.name[0]}
                    </span>
                  </div>
                  <div>
                    <p className="font-body font-semibold text-foreground text-sm">
                      – {t.name}
                    </p>
                    <p className="font-body text-xs text-muted-foreground">
                      {t.location}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────────── */}
      <section
        className="py-28 relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, oklch(0.43 0.115 50), oklch(0.30 0.08 42), oklch(0.52 0.185 26))",
        }}
      >
        <div
          className="absolute top-0 right-0 w-96 h-96 rounded-full opacity-10"
          style={{
            background: "oklch(0.97 0.01 78)",
            transform: "translate(30%, -30%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-64 h-64 rounded-full opacity-10"
          style={{
            background: "oklch(0.97 0.01 78)",
            transform: "translate(-30%, 30%)",
          }}
        />

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
          <p className="font-body text-sm font-semibold tracking-[0.2em] uppercase text-yellow-300 mb-4">
            Come Visit Us
          </p>
          <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Ready to Experience
            <span className="block italic">Bubby&rsquo;s?</span>
          </h2>
          <p className="font-body text-white/80 text-lg mb-10 leading-relaxed">
            Reserve your table today or order online.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              type="button"
              onClick={scrollToReserve}
              className="bg-white text-brand-brown font-body font-bold px-10 py-4 rounded-full text-base hover:bg-yellow-50 active:scale-95 transition-all shadow-lg"
              data-ocid="cta.primary_button"
            >
              Reserve Table
            </button>
            <button
              type="button"
              onClick={scrollToOrder}
              className="border-2 border-white text-white font-body font-bold px-10 py-4 rounded-full text-base hover:bg-white/10 active:scale-95 transition-all"
              data-ocid="cta.secondary_button"
            >
              Order Online
            </button>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer
        style={{
          background: "oklch(0.18 0.04 38)",
          color: "oklch(0.94 0.014 80)",
        }}
      >
        <div className="max-w-7xl mx-auto px-6 py-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div>
            <h3
              className="font-display text-3xl font-bold mb-3"
              style={{ color: "oklch(0.94 0.014 80)" }}
            >
              Bubby&rsquo;s
            </h3>
            <p className="font-body text-sm leading-relaxed opacity-70">
              Classic American comfort food in the heart of TriBeCa since 1990.
              Breakfast, brunch, lunch, and dinner made with love.
            </p>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-5 opacity-90">
              Visit Us
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 opacity-60 shrink-0" />
                <span className="font-body text-sm opacity-75">
                  120 Hudson St
                  <br />
                  New York, NY 10013
                  <br />
                  TriBeCa
                </span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 opacity-60 shrink-0" />
                <a
                  href="tel:2122190666"
                  className="font-body text-sm opacity-75 hover:opacity-100 transition-opacity"
                >
                  212-219-0666
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-5 opacity-90">
              Hours
            </h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 opacity-60 shrink-0" />
                <div className="font-body text-sm opacity-75">
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "oklch(0.94 0.014 80)" }}
                  >
                    Mon – Fri
                  </p>
                  <p>9:00 AM – 10:00 PM</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="w-4 h-4 mt-0.5 opacity-60 shrink-0" />
                <div className="font-body text-sm opacity-75">
                  <p
                    className="font-semibold mb-1"
                    style={{ color: "oklch(0.94 0.014 80)" }}
                  >
                    Sat – Sun
                  </p>
                  <p>8:00 AM – 11:00 PM</p>
                </div>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-display font-semibold text-lg mb-5 opacity-90">
              Follow Us
            </h4>
            <ul className="space-y-4">
              {[
                {
                  icon: Instagram,
                  label: "Instagram",
                  href: "https://instagram.com/bubbysrestaurant",
                },
                {
                  icon: Facebook,
                  label: "Facebook",
                  href: "https://facebook.com/bubbysnyc",
                },
                {
                  icon: Twitter,
                  label: "Twitter / X",
                  href: "https://twitter.com/bubbysnyc",
                },
              ].map(({ icon: Icon, label, href }) => (
                <li key={label}>
                  <a
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 font-body text-sm opacity-70 hover:opacity-100 transition-opacity"
                    data-ocid="footer.link"
                  >
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div
          className="border-t px-6 py-6 text-center"
          style={{ borderColor: "oklch(0.30 0.04 38)" }}
        >
          <p className="font-body text-xs opacity-50">
            © {new Date().getFullYear()} Bubby&rsquo;s Restaurant · 120 Hudson
            St, TriBeCa, New York · Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(typeof window !== "undefined" ? window.location.hostname : "")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-80 transition-opacity underline"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* ── Floating Cart Bar ────────────────────────────────────────────── */}
      <AnimatePresence>
        {hasCart && (
          <CartBar
            cart={cart}
            onClear={() => setCart({})}
            onViewOrder={scrollToOrder}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
