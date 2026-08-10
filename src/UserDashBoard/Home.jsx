import React, { useState } from "react";
import { 
  ShoppingBag, 
  Truck, 
  Heart, 
  Wallet, 
  Star, 
  Search, 
  SlidersHorizontal, 
  ArrowRight, 
  CheckCircle2, 
  RefreshCw, 
  TrendingUp, 
  ShieldCheck, 
  Clock, 
  ExternalLink,
  X,
  Plus,
  Minus,
  Trash2,
  Package,
  PackageCheck,
  Home as HomeIcon,
  MapPin,
  MessageSquare,
  Send,
  Bell,
  Sparkles,
  ChevronDown
} from "lucide-react";
import image from "../assets/image1.jpg"


// ==========================================
// CENTRAL SHARED DATA & CONSTANTS (PAKISTAN / PKR)
// ==========================================
const ACCOUNT_METRICS = [
  { id: "orders", icon: ShoppingBag, label: "Total Orders", value: "24", subtext: "+3 this month", cta: "View history", color: "bg-violet-50 text-violet-600 border-violet-100" },
  { id: "transit", icon: Truck, label: "In Transit", value: "3", subtext: "Arriving by Friday", cta: "Track shipments", color: "bg-emerald-50 text-emerald-600 border-emerald-100" },
  { id: "wishlist", icon: Heart, label: "Wishlist Items", value: "16", subtext: "2 items on sale", cta: "View wishlist", color: "bg-rose-50 text-rose-500 border-rose-100" },
  { id: "spent", icon: Wallet, label: "Total Spent", value: "Rs. 32,500", subtext: "VIP Tier 2 Status", cta: "View breakdown", color: "bg-blue-50 text-blue-600 border-blue-100" },
];

const INITIAL_ORDERS = [
  { id: "#RRVDXB1256", name: "Casual Canvas Sneakers", category: "Footwear", price: "Rs. 3,500", date: "May 16, 2026", trackingCode: "TRK-984210", status: "Shipping", statusColor: "bg-blue-50 text-blue-600 border-blue-200/60", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80", courier: "TCS Express" },
  { id: "#RRVDXB1257", name: "Basic Smart Fitness Band", category: "Electronics", price: "Rs. 4,500", date: "May 15, 2026", trackingCode: "TRK-983102", status: "Shipped", statusColor: "bg-blue-50 text-blue-600 border-blue-200/60", img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&q=80", courier: "Leopards Courier" },
  { id: "#RRVDXB1258", name: "Wired Bass Earphones", category: "Electronics", price: "Rs. 1,900", date: "May 10, 2026", trackingCode: "TRK-980455", status: "Delivered", statusColor: "bg-emerald-50 text-emerald-600 border-emerald-200/60", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80", courier: "M&P Courier" },
  { id: "#RRVDXB1259", name: "RGB Membrane Keyboard", category: "Computing", price: "Rs. 3,200", date: "May 02, 2026", trackingCode: "TRK-975124", status: "Processing", statusColor: "bg-amber-50 text-amber-600 border-amber-200/60", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&q=80", courier: "Blue Ex" },
];

const EXPANDED_CATALOG = [
  { id: 1, name: "Minimalist Sling Bag", category: "Accessories", price: 2800.00, originalPrice: 3500.00, rating: "4.8", reviews: "142", badge: "Best Seller", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=80" },
  { id: 2, name: "Classic UV Sun Shades", category: "Accessories", price: 1500.00, originalPrice: 2000.00, rating: "4.6", reviews: "98", badge: "Trending", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80" },
  { id: 3, name: "Pocket Body Mist (100ml)", category: "Fragrance", price: 1200.00, originalPrice: 1600.00, rating: "4.7", reviews: "310", badge: "Popular", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=300&q=80" },
  { id: 4, name: "Casual Canvas Sneakers", category: "Footwear", price: 3500.00, originalPrice: 4200.00, rating: "4.9", reviews: "524", badge: "Limited Edition", img: "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=300&q=80" },
  { id: 5, name: "Minimalist Leather Watch", category: "Accessories", price: 2500.00, originalPrice: 3200.00, rating: "4.5", reviews: "76", badge: "Sale", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=300&q=80" },
  { id: 6, name: "Wired Bass Earphones", category: "Electronics", price: 1900.00, originalPrice: 2500.00, rating: "4.8", reviews: "215", badge: "Top Rated", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=300&q=80" },
  { id: 7, name: "Mini Food Chopper", category: "Electronics", price: 2500.00, originalPrice: 3100.00, rating: "4.7", reviews: "180", badge: "Bundle Deal", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=300&q=80" },
  { id: 8, name: "Pocket Notebook Set", category: "Accessories", price: 850.00, originalPrice: 1100.00, rating: "4.9", reviews: "89", badge: "Exclusive", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=300&q=80" }
];

const QUICK_ACTIONS = [
  { label: "Track Active Shipments", icon: Truck, action: "tracking" },
  { label: "Manage Saved Wishlist", icon: Heart, action: "wishlist" },
  { label: "Download Annual Tax Report", icon: Wallet, action: "report" },
  { label: "Contact Dedicated VIP Support", icon: ShieldCheck, action: "support" }
];

// ==========================================
// ROOT APP CONTAINER
// ==========================================
export default function DashboardApp() {

  const [toast, setToast] = useState("");
  const [cartItems, setCartItems] = useState([
    { ...EXPANDED_CATALOG[0], quantity: 1 },
    { ...EXPANDED_CATALOG[1], quantity: 1 }
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Global popup modal states
  const [activeModalType, setActiveModalType] = useState(null); 
  const [trackingModalOrder, setTrackingModalOrder] = useState(null); 
  const [isSimpleOrdersModalOpen, setIsSimpleOrdersModalOpen] = useState(false); 

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3500);
  };

  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <div className="flex flex-col h-screen bg-[#F8FAFC] font-sans text-slate-800 antialiased select-none">
      
      {/* GLOBAL TOAST NOTIFICATION */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800 text-xs font-semibold animate-in fade-in slide-in-from-bottom-4 duration-300">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      {/* TOPBAR COMPONENT */}
      <TopBar 
        cartCount={totalCartCount} 
        onCartClick={() => setIsCartOpen(true)}
      />

      {/* HOME VIEW CONTAINER */}
      <Home 
        showToast={showToast}
        cartItems={cartItems}
        setCartItems={setCartItems}
        setActiveModalType={setActiveModalType}
        setTrackingModalOrder={setTrackingModalOrder}
        onOpenSimpleOrders={() => setIsSimpleOrdersModalOpen(true)}
      />

      {/* CART SLIDER / MODAL */}
      {isCartOpen && (
        <ShoppingCartModal 
          cartItems={cartItems}
          setCartItems={setCartItems}
          onClose={() => setIsCartOpen(false)}
          showToast={showToast}
        />
      )}

      {/* SIMPLE TOTAL ORDERS MODAL POPUP */}
      {isSimpleOrdersModalOpen && (
        <SimpleTotalOrdersModal 
          onClose={() => setIsSimpleOrdersModalOpen(false)} 
          showToast={showToast}
        />
      )}

      {/* TRACKING MODAL POPUP */}
      {trackingModalOrder && (
        <TrackOrderModal 
          order={trackingModalOrder} 
          onClose={() => setTrackingModalOrder(null)} 
          showToast={showToast} 
        />
      )}

      {/* GLOBAL QUICK ACTION MODALS (Wishlist, Reports, Support) */}
      {activeModalType && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200 border border-slate-100">
            <button onClick={() => setActiveModalType(null)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"><X className="w-4 h-4 text-slate-500" /></button>

            {activeModalType === 'wishlist' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-rose-50 text-rose-500 rounded-2xl"><Heart className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Saved Wishlist Items</h3>
                    <p className="text-xs text-slate-500">16 items secured &bull; 2 on price drop</p>
                  </div>
                </div>
                <div className="p-4 bg-slate-50 rounded-2xl text-center text-xs text-slate-600 border border-slate-100 font-medium">Wishlist inventory synchronization is fully updated.</div>
              </>
            )}

            {activeModalType === 'report' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-blue-50 text-blue-600 rounded-2xl"><Wallet className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">Annual Budget Statement</h3>
                    <p className="text-xs text-slate-500">Verified institutional expenditure records</p>
                  </div>
                </div>
                <button onClick={() => { showToast("Budget statement downloaded successfully!"); setActiveModalType(null); }} className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-3 rounded-2xl text-xs mt-2 cursor-pointer shadow-md transition-all">
                  Download Verified PDF Statement
                </button>
              </>
            )}

            {activeModalType === 'support' && (
              <>
                <div className="flex items-center gap-3">
                  <div className="p-3 bg-violet-50 text-violet-600 rounded-2xl"><ShieldCheck className="w-5 h-5" /></div>
                  <div>
                    <h3 className="text-base font-bold text-slate-900">VIP Concierge Support</h3>
                    <p className="text-xs text-slate-500">24/7 dedicated account assistance</p>
                  </div>
                </div>
                <div className="p-4 bg-violet-50/50 rounded-2xl text-xs text-violet-900 space-y-1.5 border border-violet-100">
                  <p className="font-bold flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-violet-600" /> Assigned Manager: Rania Afridi</p>
                  <p className="text-violet-700">Direct Priority Line: +92 (300) 555-RRVD</p>
                </div>
              </>
            )}

            <button onClick={() => setActiveModalType(null)} className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-2xl text-xs cursor-pointer transition-colors">
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// TOPBAR COMPONENT
// ==========================================
function TopBar({ cartCount, onCartClick }) {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Shipment Update", desc: "Order #RRVDXB1257 is out for delivery today in Peshawar.", time: "10m ago", read: false },
    { id: 2, title: "VIP Reward", desc: "You unlocked a 20% budget discount code: RRVDXB20", time: "2h ago", read: false },
  ]);

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <header className="flex items-center justify-between px-6 py-4 md:px-10 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shrink-0 z-20 shadow-xs">
        
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-tr from-violet-600 to-indigo-600 text-white shadow-md shadow-violet-500/20 font-black text-sm tracking-wider">
            R
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-slate-400 tracking-wide uppercase">Workspace</span>
              <span className="text-slate-300">/</span>
              <span className="text-[11px] font-bold text-violet-600 tracking-wide uppercase">Dashboard</span>
            </div>
            <h1 className="text-sm font-bold text-slate-900 tracking-tight">
              Affordable Overview
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setShowNotifications(true)}
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 hover:text-violet-600 hover:bg-violet-50/50 border border-slate-200/60 transition-all cursor-pointer group shadow-2xs"
          >
            <Bell size={18} className="group-hover:rotate-12 transition-transform" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-black text-white shadow-md animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          <button
            type="button"
            onClick={onCartClick}
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-2xl bg-slate-50 text-slate-500 hover:text-violet-600 hover:bg-violet-50/50 border border-slate-200/60 transition-all cursor-pointer group shadow-2xs"
          >
            <ShoppingBag size={18} className="group-hover:-translate-y-0.5 transition-transform" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[9px] font-black text-white shadow-md">
                {cartCount}
              </span>
            )}
          </button>

          <div className="h-6 w-px bg-slate-200/80 mx-1 hidden sm:block"></div>

          <div className="flex items-center gap-3 pl-1 pr-2 py-1.5 rounded-2xl bg-slate-50/80 hover:bg-slate-100/80 border border-slate-200/60 transition-all cursor-pointer group">
            <div className="relative">
              <img
                src={image}
                alt=""
                className="h-9 w-9 rounded-xl object-cover ring-2 ring-white shadow-sm"
              />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-emerald-500 ring-2 ring-white"></span>
            </div>
            <div className="hidden sm:block text-left pr-1">
              <p className="text-xs font-bold text-slate-900 leading-tight group-hover:text-violet-600 transition-colors">Tania</p>
              <p className="text-[10px] text-violet-600 font-semibold tracking-wide leading-tight">VIP Tier 2 Member</p>
            </div>
          </div>
        </div>
      </header>

      {showNotifications && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200 border border-slate-100">
            <button type="button" onClick={() => setShowNotifications(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors">
              <X className="w-4 h-4" />
            </button>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2.5">
                <div className="p-2 bg-violet-50 text-violet-600 rounded-xl"><Bell size={18} /></div>
                <h3 className="font-bold text-slate-900 text-base">Account Notifications</h3>
              </div>
              <button 
                type="button"
                onClick={() => setNotifications(prev => prev.map(n => ({ ...n, read: true })))} 
                className="text-xs text-violet-600 font-semibold hover:underline cursor-pointer"
              >
                Mark all read
              </button>
            </div>
            <div className="space-y-3 max-h-72 overflow-y-auto">
              {notifications.map(n => (
                <div key={n.id} className={`p-4 rounded-2xl border transition-all ${n.read ? 'bg-slate-50/50 border-slate-100 text-slate-600' : 'bg-violet-50/40 border-violet-100/80 text-slate-900 shadow-2xs'}`}>
                  <div className="flex justify-between text-xs font-bold mb-1">
                    <span>{n.title}</span>
                    <span className="text-[10px] text-slate-400 font-normal">{n.time}</span>
                  </div>
                  <p className="text-xs leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>
            <button type="button" onClick={() => setShowNotifications(false)} className="w-full bg-slate-900 hover:bg-slate-800 text-white py-3 rounded-2xl text-xs font-semibold cursor-pointer shadow-md transition-all">
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}

// ==========================================
// HOME VIEW COMPONENT
// ==========================================
function Home({ showToast, cartItems, setCartItems, setActiveModalType, setTrackingModalOrder, onOpenSimpleOrders }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [showAllOrders, setShowAllOrders] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const categories = ["All", "Accessories", "Electronics", "Footwear", "Fragrance", "Computing"];

  const filteredCatalog = EXPANDED_CATALOG.filter((item) => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "All" || item.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const displayedOrders = showAllOrders ? INITIAL_ORDERS : INITIAL_ORDERS.slice(0, 2);

  const handleAction = (ctaText) => {
    if (ctaText.includes("history") || ctaText.includes("View history")) {
      onOpenSimpleOrders();
    } else if (ctaText.includes("Track") || ctaText.includes("shipments")) {
      setTrackingModalOrder(INITIAL_ORDERS[0]);
    } else if (ctaText.includes("wishlist")) {
      setActiveModalType("wishlist");
    } else if (ctaText.includes("breakdown") || ctaText.includes("Tax")) {
      setActiveModalType("report");
    } else if (ctaText.includes("Support")) {
      setActiveModalType("support");
    } else {
      showToast(`Executed: ${ctaText}`);
    }
  };

  const handleQuickActionClick = (label) => {
    if (label.includes("Track Active")) {
      setTrackingModalOrder(INITIAL_ORDERS[0]);
    } else if (label.includes("Wishlist")) {
      setActiveModalType("wishlist");
    } else if (label.includes("Tax")) {
      setActiveModalType("report");
    } else if (label.includes("Support")) {
      setActiveModalType("support");
    }
  };

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    showToast(`Promo code '${code}' copied to clipboard successfully!`);
  };

  const addToCart = (product) => {
    setCartItems(prev => {
      const existing = prev.find(item => item.id === product.id);
      if (existing) {
        return prev.map(item => item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    showToast(`Added "${product.name}" to your bag!`);
    setSelectedProduct(null);
  };

  return (
    <div className="flex-1 overflow-y-auto relative p-6 md:p-10 space-y-6">
      
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-slate-900 via-indigo-950 to-slate-900 px-8 py-10 text-white shadow-2xl border border-slate-800/80">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-semibold tracking-wide">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span> Budget Friendly Picks (Pakistan)
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-violet-500/20 border border-violet-500/30 text-violet-300 text-[11px] font-semibold tracking-wide">
              <Sparkles className="w-3 h-3 text-violet-400" /> VIP Tier 2 Member
            </span>
          </div>
          
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight text-white">
            Welcome back
          </h1>
          
          <p className="text-sm text-slate-300 leading-relaxed font-normal">
            Your account is fully optimized. You have <strong className="text-white font-semibold">3 active shipments</strong> in transit, <strong className="text-white font-semibold">16 items</strong> secured in your wishlist, and affordable daily deals unlocked.
          </p>
          
          <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-300 border-t border-slate-800/80">
            <div className="flex items-center gap-2">
              <Clock className="w-3.5 h-3.5 text-indigo-400" />
              <span>Last login: Today, 02:26 PM</span>
            </div>
            <div className="w-px h-3 bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Two-Factor Auth Active</span>
            </div>
            <div className="w-px h-3 bg-slate-700 hidden sm:block"></div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-3.5 h-3.5 text-blue-400" />
              <span>Rewards: <strong className="text-white">1,420 pts</strong></span>
            </div>
          </div>
        </div>

        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=600&q=80"
          alt="Dashboard Cover"
          className="pointer-events-none absolute right-0 top-0 bottom-0 hidden h-full w-96 object-cover object-top opacity-20 mix-blend-overlay lg:block"
        />
      </div>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {ACCOUNT_METRICS.map(({ id, icon: Icon, label, value, subtext, cta, color }) => (
          <div key={id} className="rounded-3xl bg-white p-6 border border-slate-200/60 shadow-xs flex flex-col justify-between hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 group">
            <div>
              <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${color} shadow-2xs group-hover:scale-105 transition-transform`}>
                <Icon size={20} />
              </div>
              <p className="mt-4 text-xs text-slate-400 font-semibold uppercase tracking-wider">{label}</p>
              <div className="flex items-baseline gap-2 mt-1">
                <p className="text-2xl lg:text-3xl font-extrabold text-slate-900">{value}</p>
                <span className="text-[11px] text-slate-500 font-medium">{subtext}</span>
              </div>
            </div>
            <button 
              onClick={() => handleAction(cta)}
              className="mt-5 text-xs font-bold text-violet-600 hover:text-violet-700 text-left flex items-center gap-1.5 group/btn cursor-pointer pt-3 border-t border-slate-50"
            >
              {cta} <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
            </button>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        
        <div className="lg:col-span-5 rounded-3xl bg-white p-6 border border-slate-200/60 shadow-xs flex flex-col justify-between space-y-4">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Recent Transactions</h2>
                <p className="text-[11px] text-slate-400">Live order status and budget records</p>
              </div>
              <button 
                onClick={() => setShowAllOrders(!showAllOrders)}
                className="text-xs font-bold text-violet-600 hover:underline cursor-pointer bg-violet-50 px-3 py-1.5 rounded-xl transition-colors"
              >
                {showAllOrders ? "Show Less" : "View All"}
              </button>
            </div>

            <div className="space-y-3.5">
              {displayedOrders.map((o) => (
                <div key={o.id} className="p-4 border border-slate-100 rounded-2xl bg-slate-50/50 hover:bg-white hover:shadow-md transition-all space-y-3 group">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-900">{o.id}</span>
                      <span className="text-[10px] bg-white text-slate-600 font-bold px-2.5 py-0.5 rounded-lg border border-slate-200/60 shadow-2xs">
                        {o.category}
                      </span>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-[10px] font-bold border ${o.statusColor}`}>
                      {o.status}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <div>
                      <p className="font-bold text-slate-900">{o.name}</p>
                      <p className="text-[11px] text-slate-400 mt-0.5">{o.date} &bull; Tracking: <span className="font-mono text-slate-600">{o.trackingCode}</span></p>
                    </div>
                    <span className="font-extrabold text-slate-900 text-xs sm:text-sm">{o.price}</span>
                  </div>

                  <div className="pt-2.5 border-t border-slate-200/60 flex justify-end">
                    <button
                      onClick={() => setTrackingModalOrder(o)}
                      className="text-[11px] font-bold text-violet-600 hover:text-violet-700 cursor-pointer flex items-center gap-1.5 bg-white px-3 py-1.5 rounded-xl border border-violet-100 shadow-2xs group-hover:bg-violet-600 group-hover:text-white transition-all"
                    >
                      <Truck size={12} /> Quick Track 
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button 
            onClick={onOpenSimpleOrders}
            className="w-full py-3 bg-slate-50 hover:bg-slate-100/80 text-slate-700 text-xs font-bold rounded-2xl transition-all text-center cursor-pointer border border-slate-200/60 shadow-2xs"
          >
            View Total Orders Summary 
          </button>
        </div>

        <div className="lg:col-span-7 rounded-3xl bg-white p-6 border border-slate-200/60 shadow-xs flex flex-col justify-between space-y-4">
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h2 className="text-sm font-bold text-slate-900 tracking-tight">Affordable Recommendations</h2>
                <p className="text-[11px] text-slate-400">Click any product to view details or add to bag</p>
              </div>

              <div className="relative w-full sm:w-60">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search catalog..."
                  className="w-full pl-10 pr-3 py-2 bg-slate-50/80 rounded-2xl border border-slate-200/60 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 focus:bg-white transition-all"
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold cursor-pointer">✕</button>
                )}
              </div>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              <SlidersHorizontal className="w-4 h-4 text-slate-400 shrink-0 mr-0.5" />
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-2xl text-xs font-semibold shrink-0 transition-all cursor-pointer shadow-2xs ${
                    selectedCategory === cat ? "bg-violet-600 text-white shadow-md shadow-violet-500/25" : "bg-slate-50 text-slate-600 hover:bg-slate-100 border border-slate-200/60"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {filteredCatalog.length === 0 ? (
            <div className="text-center py-16 bg-slate-50/50 rounded-2xl border border-dashed border-slate-200">
              <p className="text-xs text-slate-500 font-semibold">No budget items matching your filters.</p>
              <button onClick={() => { setSearchQuery(""); setSelectedCategory("All"); }} className="mt-2 text-xs text-violet-600 font-bold hover:underline cursor-pointer">
                Clear search and filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {filteredCatalog.map((p) => (
                <div 
                  key={p.id} 
                  onClick={() => setSelectedProduct(p)}
                  className="group border border-slate-200/60 rounded-2xl p-3 text-center flex flex-col justify-between bg-white hover:border-violet-200 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 cursor-pointer"
                >
                  <div>
                    <div className="h-32 w-full bg-slate-100 rounded-xl overflow-hidden mb-2.5 relative">
                      <img src={p.img} alt={p.name} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <span className="absolute top-2 left-2 bg-slate-900/80 backdrop-blur-md text-[9px] font-bold px-2 py-0.5 rounded-lg text-white shadow-xs">
                        {p.badge}
                      </span>
                    </div>
                    <p className="text-xs font-bold text-slate-900 truncate text-left group-hover:text-violet-600 transition-colors">{p.name}</p>
                  </div>

                  <div className="mt-2.5 pt-2.5 border-t border-slate-100 text-[11px]">
                    <div className="flex items-center justify-between">
                      <span className="font-extrabold text-slate-900">Rs. {p.price.toLocaleString()}</span>
                      {p.originalPrice !== p.price && (
                        <span className="text-[10px] text-slate-400 line-through">Rs. {p.originalPrice.toLocaleString()}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between mt-1 text-[10px]">
                      <span className="text-amber-500 flex items-center gap-0.5 font-bold">
                        <Star size={10} fill="currentColor" /> {p.rating}
                      </span>
                      <span className="text-slate-400 font-medium">({p.reviews})</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="bg-white rounded-3xl p-6 border border-slate-200/60 shadow-xs">
        <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400 mb-4">Quick Account Actions</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {QUICK_ACTIONS.map(({ label, icon: Icon }, idx) => (
            <button
              key={idx}
              onClick={() => handleQuickActionClick(label)}
              className="flex items-center justify-between p-3.5 rounded-2xl border border-slate-200/60 bg-slate-50/50 hover:bg-white hover:border-violet-200 hover:shadow-md transition-all text-left group cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <div className="p-2.5 bg-white rounded-xl shadow-2xs text-violet-600 border border-slate-100 group-hover:bg-violet-600 group-hover:text-white transition-colors">
                  <Icon className="w-4 h-4" />
                </div>
                <span className="text-xs font-bold text-slate-800">{label}</span>
              </div>
              <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:translate-x-1 group-hover:text-violet-600 transition-all" />
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-indigo-600 via-violet-600 to-purple-700 p-8 text-white shadow-xl">
          <div className="space-y-3">
            <span className="inline-block text-[10px] uppercase font-black tracking-wider bg-white/20 backdrop-blur-md px-3 py-1 rounded-lg">Budget Campaign</span>
            <p className="text-2xl font-black tracking-tight">Everyday Value Collection</p>
            <p className="text-xs text-violet-100 leading-relaxed font-medium">Enjoy affordable pricing across select everyday accessories, fashion, and electronics.</p>
            <button onClick={() => showToast("Redirecting to Everyday Value Campaign...")} className="mt-2 rounded-2xl bg-white px-5 py-2.5 text-xs font-bold text-violet-700 hover:bg-violet-50 transition-all cursor-pointer shadow-lg flex items-center gap-2">
              Explore Collection <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between rounded-3xl bg-gradient-to-r from-amber-50 via-orange-50 to-amber-100/50 border border-orange-200/60 p-8 shadow-xl">
          <div className="space-y-3">
            <span className="inline-block text-[10px] uppercase font-black tracking-wider bg-orange-200 text-orange-900 px-3 py-1 rounded-lg shadow-2xs">Exclusive VIP Perk</span>
            <p className="text-2xl font-black text-orange-950 tracking-tight">20% Off Next Transaction</p>
            <p className="text-xs text-orange-800 leading-relaxed font-medium">Apply code at checkout to claim your budget reward: <strong className="font-mono bg-white px-2.5 py-1 rounded-xl border border-orange-200 text-orange-900 font-extrabold shadow-2xs">RRVDXB20</strong></p>
            <button onClick={() => handleCopyCode("RRVDXB20")} className="mt-2 rounded-2xl bg-slate-900 px-5 py-2.5 text-xs font-bold text-white hover:bg-slate-800 transition-all cursor-pointer shadow-lg flex items-center gap-2">
              <RefreshCw className="w-3.5 h-3.5" /> Copy Promo Code
            </button>
          </div>
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200 border border-slate-100">
            <button onClick={() => setSelectedProduct(null)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"><X className="w-4 h-4" /></button>

            <div className="flex gap-6 items-center">
              <img src={selectedProduct.img} alt={selectedProduct.name} className="w-36 h-36 rounded-2xl object-cover bg-slate-100 shrink-0 shadow-md" />
              <div className="space-y-2">
                <span className="text-[10px] font-bold uppercase tracking-wider bg-violet-100 text-violet-700 px-3 py-1 rounded-lg">{selectedProduct.category}</span>
                <h3 className="font-bold text-slate-900 text-lg leading-tight">{selectedProduct.name}</h3>
                <div className="flex items-center gap-2">
                  <span className="text-xl font-extrabold text-slate-900">Rs. {selectedProduct.price.toLocaleString()}</span>
                  {selectedProduct.originalPrice !== selectedProduct.price && (
                    <span className="text-xs text-slate-400 line-through font-semibold">Rs. {selectedProduct.originalPrice.toLocaleString()}</span>
                  )}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-amber-500 font-bold">
                  <Star size={13} fill="currentColor" /> {selectedProduct.rating} <span className="text-slate-400 font-normal">({selectedProduct.reviews} reviews)</span>
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 mt-5 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-200/60 font-medium">
              Affordable item backed by RRVDXB Verified Guarantee. Fast delivery across Pakistan included with VIP Tier 2 membership.
            </p>

            <div className="mt-6 flex items-center gap-3">
              <button onClick={() => addToCart(selectedProduct)} className="flex-1 bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-2xl text-xs transition-all shadow-xl shadow-violet-500/25 cursor-pointer flex items-center justify-center gap-2">
                <ShoppingBag className="w-4 h-4" /> Add to Shopping Bag
              </button>
              <button onClick={() => { showToast(`Added ${selectedProduct.name} to Wishlist!`); setSelectedProduct(null); }} className="p-3.5 border border-slate-200 rounded-2xl text-slate-700 hover:bg-slate-50 transition-colors cursor-pointer shadow-2xs">
                <Heart className="w-4 h-4 text-rose-500" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// SIMPLE TOTAL ORDERS POPUP MODAL
// ==========================================
function SimpleTotalOrdersModal({ onClose, showToast }) {
  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-sm w-full p-6 relative shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200 text-center border border-slate-100">
        <button 
          type="button" 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-violet-50 text-violet-600 border border-violet-100 shadow-2xs">
          <ShoppingBag size={24} />
        </div>

        <div>
          <h3 className="text-base font-bold text-slate-900">Total Orders Summary</h3>
          <p className="text-xs text-slate-500 mt-1 font-medium">You have placed a total of <strong className="text-slate-800">24 orders</strong> on your account this year.</p>
        </div>

        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-200/60 text-left space-y-2.5 text-xs">
          <div className="flex justify-between font-medium"><span className="text-slate-500">Delivered Orders:</span><span className="font-bold text-slate-800">21</span></div>
          <div className="flex justify-between font-medium"><span className="text-slate-500">Active Shipments:</span><span className="font-bold text-emerald-600">3</span></div>
          <div className="flex justify-between font-medium"><span className="text-slate-500">Average Fulfillment:</span><span className="font-bold text-slate-800">1.8 Days</span></div>
        </div>

        <button 
          type="button"
          onClick={() => { showToast("Orders summary downloaded successfully!"); onClose(); }}
          className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3 rounded-2xl text-xs cursor-pointer shadow-lg shadow-violet-500/20 transition-all"
        >
          Download Summary Report
        </button>
      </div>
    </div>
  );
}

// ==========================================
// TRACK ORDER MODAL POPUP COMPONENT (PAKISTAN ADDRESS)
// ==========================================
function TrackOrderModal({ order, onClose, showToast }) {
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [chatLog, setChatLog] = useState([
    { sender: "support", text: `Hello Rania! How can we assist with shipment ${order.id} today?`, time: "10:32 AM" }
  ]);

  const [steps, setSteps] = useState([
    { label: "Order Placed", date: "May 16", icon: Package, done: true },
    { label: "Packed", date: "May 16", icon: PackageCheck, done: true },
    { label: "Shipped", date: "May 17", icon: Truck, done: true },
    { label: "Out for Delivery", date: "May 20", icon: MapPin, done: false },
    { label: "Delivered", date: "May 20", icon: HomeIcon, done: false },
  ]);

  const [locationText, setLocationText] = useState(`In Transit near ${order.courier} Hub`);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const handleRefreshLocation = () => {
    setIsRefreshing(true);
    showToast("Connecting to live GPS feed...");
    setTimeout(() => {
      setLocationText("Out for local delivery in Peshawar, KPK");
      setIsRefreshing(false);
      showToast("Live location successfully updated!");
    }, 1200);
  };

  const toggleStepDone = (index) => {
    setSteps(prev => prev.map((s, i) => i === index ? { ...s, done: !s.done } : s));
    showToast("Updated timeline milestone stage.");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const msg = chatMessage;
    setChatLog(prev => [...prev, { sender: "user", text: msg, time: "Just now" }]);
    setChatMessage("");
    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: "support", text: "Thanks! Our logistics agent has received your query and will update the courier notes.", time: "Just now" }]);
    }, 1000);
  };

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 md:p-8 relative shadow-2xl space-y-6 animate-in fade-in zoom-in duration-200 max-h-[90vh] overflow-y-auto border border-slate-100">
        <button 
          type="button" 
          onClick={onClose} 
          className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        <div className="flex items-center justify-between pr-8">
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-base font-bold text-slate-900">Order {order.id}</h2>
              <span className={`rounded-full px-3 py-1 text-xs font-bold border ${order.statusColor}`}>{order.status}</span>
            </div>
            <p className="mt-1 text-xs text-slate-400 font-medium">Placed on {order.date}</p>
          </div>
          <button 
            type="button"
            onClick={() => {
              setSteps(prev => prev.map(s => ({ ...s, done: true })));
              showToast("Simulated: Order fully delivered successfully!");
            }}
            className="text-[11px] bg-violet-50 hover:bg-violet-100 text-violet-700 px-3.5 py-2 rounded-xl font-bold transition-all cursor-pointer flex items-center gap-1.5 border border-violet-100"
          >
            <RefreshCw size={12} /> Simulate Delivery
          </button>
        </div>

        <div className="flex items-center gap-4 bg-slate-50 p-4 rounded-2xl border border-slate-200/60">
          <img src={order.img} alt="" className="h-14 w-14 rounded-xl object-cover bg-slate-100 shadow-2xs" />
          <div className="flex-1">
            <p className="text-sm font-bold text-slate-900">{order.name}</p>
            <p className="text-xs text-slate-400 font-medium">{order.category} • Price: <strong className="text-slate-700">{order.price}</strong></p>
          </div>
          <button 
            type="button"
            onClick={() => setShowHelpModal(true)}
            className="rounded-xl bg-violet-600 hover:bg-violet-700 text-white px-4 py-2.5 text-xs font-bold cursor-pointer shadow-md shadow-violet-500/20 transition-all"
          >
            Contact Support
          </button>
        </div>

        <div>
          <p className="text-[11px] font-extrabold text-slate-400 mb-3 uppercase tracking-wider">Click any step icon below to toggle status:</p>
          <div className="flex items-start justify-between px-2 overflow-x-auto pb-2">
            {steps.map((s, i, arr) => {
              const Icon = s.icon;
              return (
                <React.Fragment key={s.label}>
                  <div className="flex flex-col items-center gap-2 text-center shrink-0">
                    <button
                      type="button"
                      onClick={() => toggleStepDone(i)}
                      title="Click to toggle status"
                      className={`flex h-10 w-10 items-center justify-center rounded-2xl transition-all hover:scale-110 cursor-pointer shadow-md ${s.done ? 'bg-violet-600 text-white shadow-violet-500/25' : 'bg-slate-100 text-slate-400 border border-slate-200'}`}
                    >
                      <Icon size={16} />
                    </button>
                    <p className={`text-[11px] font-bold max-w-[75px] ${s.done ? 'text-slate-900' : 'text-slate-400'}`}>{s.label}</p>
                    <p className="text-[10px] text-slate-400 font-medium">{s.date}</p>
                  </div>
                  {i < arr.length - 1 && <div className={`mt-5 h-1 w-8 sm:flex-1 rounded-full ${s.done ? 'bg-violet-600' : 'bg-slate-100'}`} />}
                </React.Fragment>
              );
            })}
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-2xl bg-slate-50 p-4 border border-slate-200/60">
            <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-wider text-slate-400">Shipping Details</h3>
            <dl className="space-y-2 text-xs font-medium">
              <div className="flex justify-between pb-1.5 border-b border-slate-200/60"><dt className="text-slate-400">Courier</dt><dd className="font-bold text-slate-800">{order.courier}</dd></div>
              <div className="flex justify-between pb-1.5 border-b border-slate-200/60"><dt className="text-slate-400">Tracking Code</dt><dd className="font-mono font-bold text-violet-600">{order.trackingCode}</dd></div>
              <div className="flex justify-between"><dt className="text-slate-400">Destination</dt><dd className="text-right text-slate-800 font-bold">University Road, Peshawar, KPK</dd></div>
            </dl>
          </div>

          <div className="rounded-2xl bg-slate-900 p-4 text-white flex flex-col justify-between shadow-lg">
            <h3 className="text-xs font-extrabold uppercase tracking-wider text-slate-400">Live GPS Status</h3>
            <div className="text-center py-2 space-y-2">
              <p className="text-xs font-bold text-white">
                {isRefreshing ? "Fetching coordinates..." : locationText}
              </p>
              <button 
                type="button"
                onClick={handleRefreshLocation}
                disabled={isRefreshing}
                className="bg-violet-600 hover:bg-violet-700 text-white px-3.5 py-1.5 rounded-xl text-[10px] font-bold cursor-pointer disabled:opacity-50 transition-all shadow-md"
              >
                {isRefreshing ? "Refreshing..." : "Refresh Location"}
              </button>
            </div>
          </div>
        </div>

        <button 
          type="button"
          onClick={onClose}
          className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold py-3 rounded-2xl text-xs cursor-pointer transition-colors"
        >
          Close Tracking Window
        </button>
      </div>

      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl flex flex-col h-[420px] border border-slate-100">
            <button type="button" onClick={() => setShowHelpModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 cursor-pointer"><X className="w-4 h-4" /></button>
            <h3 className="font-bold text-sm pb-3 border-b border-slate-100 flex items-center gap-2">
              <MessageSquare size={16} className="text-violet-600" /> Logistics Support Chat
            </h3>
            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-2">
              {chatLog.map((c, i) => (
                <div key={i} className={`flex flex-col ${c.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs font-medium ${c.sender === 'user' ? 'bg-violet-600 text-white rounded-br-none shadow-md' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
                    {c.text}
                  </div>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="pt-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={chatMessage}
                onChange={(e) => setChatMessage(e.target.value)}
                placeholder="Ask support..."
                className="flex-1 rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-medium focus:outline-none focus:ring-2 focus:ring-violet-500 bg-slate-50"
              />
              <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white p-2.5 rounded-2xl cursor-pointer shadow-md transition-all"><Send size={15} /></button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

// ==========================================
// SHOPPING CART SLIDER / MODAL
// ==========================================
function ShoppingCartModal({ cartItems, setCartItems, onClose, showToast }) {
  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : null;
      }
      return item;
    }).filter(Boolean));
  };

  const removeItem = (id) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
    showToast("Item removed from bag");
  };

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-md flex justify-end">
      <div className="bg-white max-w-md w-full h-full p-6 md:p-8 shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        <div>
          <div className="flex items-center justify-between pb-4 border-b border-slate-100">
            <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2.5">
              <div className="p-2 bg-violet-50 text-violet-600 rounded-xl"><ShoppingBag size={18} /></div> Your Shopping Bag
            </h3>
            <button type="button" onClick={onClose} className="p-2 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer transition-colors"><X className="w-4 h-4" /></button>
          </div>

          <div className="py-4 space-y-3.5 max-h-[62vh] overflow-y-auto pr-1">
            {cartItems.length === 0 ? (
              <p className="text-center py-20 text-slate-400 text-xs font-semibold">Your shopping bag is empty.</p>
            ) : (
              cartItems.map(item => (
                <div key={item.id} className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/60 shadow-2xs">
                  <img src={item.img} alt="" className="w-14 h-14 rounded-xl object-cover shadow-2xs" />
                  <div className="flex-1">
                    <p className="text-xs font-bold text-slate-900">{item.name}</p>
                    <p className="text-xs text-violet-600 font-extrabold mt-0.5">Rs. {item.price.toLocaleString()}</p>
                  </div>
                  <div className="flex items-center gap-2 bg-white px-2.5 py-1.5 rounded-xl border border-slate-200/80 shadow-2xs">
                    <button type="button" onClick={() => updateQty(item.id, -1)} className="text-slate-400 hover:text-slate-700 cursor-pointer"><Minus size={12} /></button>
                    <span className="text-xs font-bold">{item.quantity}</span>
                    <button type="button" onClick={() => updateQty(item.id, 1)} className="text-slate-400 hover:text-slate-700 cursor-pointer"><Plus size={12} /></button>
                  </div>
                  <button type="button" onClick={() => removeItem(item.id)} className="text-rose-400 hover:text-rose-600 p-1.5 cursor-pointer"><Trash2 size={15} /></button>
                </div>
              ))
            )}
          </div>
        </div>

        {cartItems.length > 0 && (
          <div className="pt-4 border-t border-slate-100 space-y-4">
            <div className="flex justify-between text-sm font-extrabold">
              <span className="text-slate-500">Subtotal</span>
              <span className="text-violet-600 text-base">Rs. {subtotal.toLocaleString()}</span>
            </div>
            <button 
              type="button"
              onClick={() => { showToast("Proceeding to secure checkout (Pakistan)..."); onClose(); }}
              className="w-full bg-violet-600 hover:bg-violet-700 text-white font-bold py-3.5 rounded-2xl text-xs cursor-pointer shadow-xl shadow-violet-500/25 transition-all"
            >
              Proceed to Secure Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}