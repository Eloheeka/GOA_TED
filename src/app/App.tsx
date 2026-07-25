import { useState } from "react";
import {
  Search, ShoppingBag, ChevronLeft, ChevronRight, X, Plus, Minus,
  LayoutDashboard, Package, ShoppingCart, Archive, AlertCircle,
  Instagram, Check, Trash2, Edit2, ArrowRight, Bell,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

type View = "home" | "shop" | "product" | "cart" | "checkout" | "confirmation" | "admin" | "collection";

interface Product {
  id: string;
  name: string;
  price: number;
  collectionId: string;
  description: string;
  material: string;
  colors: { name: string; hex: string }[];
  sizes: string[];
  stock: number;
  images: [string, string, string];
  isNew?: boolean;
  published: boolean;
}

interface Collection {
  id: string;
  name: string;
  image: string;
  tagline: string;
}

interface CartItem {
  product: Product;
  color: { name: string; hex: string };
  size: string;
  quantity: number;
}

// ── Data ──────────────────────────────────────────────────────────────────────

const COLLECTIONS: Collection[] = [
  { id: "essentials", name: "GOATED Essentials", image: "https://images.unsplash.com/photo-1551232864-3f0890e580d9?w=900&h=1100&fit=crop&auto=format", tagline: "The foundation." },
  { id: "summer", name: "Summer Collection", image: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=900&h=1100&fit=crop&auto=format", tagline: "Light. Easy. Effortless." },
  { id: "oversized", name: "Oversized Collection", image: "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=900&h=1100&fit=crop&auto=format", tagline: "Volume as language." },
  { id: "limited", name: "Limited Drop", image: "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&h=1100&fit=crop&auto=format", tagline: "Rare by design." },
  { id: "streetwear", name: "Streetwear Series", image: "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=900&h=1100&fit=crop&auto=format", tagline: "Worn on the ground." },
];

const PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "Classic Logo Tee",
    price: 45,
    collectionId: "essentials",
    description: "The foundation of any wardrobe. Cut from premium combed cotton with a relaxed silhouette that drapes perfectly on the body. Finished with a tonal GOATED mark at the chest.",
    material: "100% Combed Cotton, 200gsm. Pre-washed for a lived-in feel.",
    colors: [{ name: "Jet Black", hex: "#0a0a0a" }, { name: "White", hex: "#f5f5f5" }, { name: "Charcoal", hex: "#4a4a4a" }, { name: "Sand", hex: "#c8b89a" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 24,
    images: [
      "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&auto=format",
    ],
    isNew: true,
    published: true,
  },
  {
    id: "p2",
    name: "Essential Hoodie",
    price: 95,
    collectionId: "essentials",
    description: "Heavyweight French terry with a clean, unbroken silhouette. Dropped shoulders, kangaroo pocket, and a structured hood that holds its shape.",
    material: "80% Cotton, 20% Polyester, 380gsm French Terry.",
    colors: [{ name: "Jet Black", hex: "#0a0a0a" }, { name: "Concrete", hex: "#7a7a7a" }, { name: "Cream", hex: "#f0ebe2" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 12,
    images: [
      "https://images.unsplash.com/photo-1556821840-3a63f8a79d37?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=1000&fit=crop&auto=format",
    ],
    isNew: true,
    published: true,
  },
  {
    id: "p3",
    name: "Wide Leg Cargo",
    price: 120,
    collectionId: "streetwear",
    description: "Utility silhouette with an editorial finish. Six functional cargo pockets, wide-leg cut with a tapered hem.",
    material: "100% Ripstop Cotton, 210gsm. Stone-washed finish.",
    colors: [{ name: "Jet Black", hex: "#0a0a0a" }, { name: "Olive", hex: "#6b6b47" }, { name: "Khaki", hex: "#b5a68a" }],
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    images: [
      "https://images.unsplash.com/photo-1506629082955-511b1aa562c8?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1617137968427-85924c800a22?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1000&fit=crop&auto=format",
    ],
    published: true,
  },
  {
    id: "p4",
    name: "Oversized Linen Shirt",
    price: 85,
    collectionId: "oversized",
    description: "Proportions that command attention. Washed linen in a boxy, elongated fit with dropped sleeves and an open-collar design.",
    material: "100% European Linen, enzyme-washed for softness.",
    colors: [{ name: "White", hex: "#f5f5f5" }, { name: "Sand", hex: "#c8b89a" }, { name: "Charcoal", hex: "#4a4a4a" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 16,
    images: [
      "https://images.unsplash.com/photo-1516762689617-e1cffcef479d?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&auto=format",
    ],
    isNew: true,
    published: true,
  },
  {
    id: "p5",
    name: "Summer Linen Set",
    price: 155,
    collectionId: "summer",
    description: "Matched linen co-ord designed for heat. The shirt and trouser share the same lightweight fabric — wear together or separate.",
    material: "100% Stonewashed Linen. Shirt + trouser set.",
    colors: [{ name: "Natural", hex: "#d4c9b0" }, { name: "Sky", hex: "#9ab8c8" }, { name: "White", hex: "#f5f5f5" }],
    sizes: ["S", "M", "L", "XL"],
    stock: 6,
    images: [
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&auto=format",
    ],
    published: true,
  },
  {
    id: "p6",
    name: "Varsity Jacket",
    price: 210,
    collectionId: "limited",
    description: "One-time drop. Premium wool body with leather sleeves, ribbed trims, and custom GOATED chenille script. When it's gone, it's gone.",
    material: "80% Wool body, 20% Genuine Leather sleeves. Quilted satin lining.",
    colors: [{ name: "Black / Black", hex: "#0a0a0a" }, { name: "Black / Caramel", hex: "#8B6914" }],
    sizes: ["S", "M", "L", "XL"],
    stock: 3,
    images: [
      "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=1000&fit=crop&auto=format",
      "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&h=1000&fit=crop&auto=format",
    ],
    isNew: true,
    published: true,
  },
];

const REVENUE_DATA = [
  { month: "Jan", revenue: 4200 },
  { month: "Feb", revenue: 6100 },
  { month: "Mar", revenue: 5800 },
  { month: "Apr", revenue: 7400 },
  { month: "May", revenue: 9200 },
  { month: "Jun", revenue: 8100 },
  { month: "Jul", revenue: 11300 },
];

function formatPrice(n: number) {
  return `$${n.toFixed(0)}`;
}

type StockStatus = "in-stock" | "remaining-few" | "low" | "sold-out";

function getStockInfo(stock: number): { status: StockStatus; label: string } {
  if (stock === 0) return { status: "sold-out", label: "Sold Out" };
  if (stock <= 5)  return { status: "low", label: `Only ${stock} Left` };
  if (stock <= 10) return { status: "remaining-few", label: "Remaining Few" };
  return { status: "in-stock", label: "In Stock" };
}

function StockBadge({ stock, className = "" }: { stock: number; className?: string }) {
  const { status, label } = getStockInfo(stock);
  const styles: Record<StockStatus, string> = {
    "in-stock":       "bg-green-500/10 text-green-400 border-green-500/20",
    "remaining-few":  "bg-orange-500/10 text-orange-400 border-orange-500/20",
    "low":            "bg-red-500/10 text-red-400 border-red-500/20",
    "sold-out":       "bg-white/5 text-[#e8e4de]/30 border-white/10",
  };
  return (
    <span className={`inline-flex items-center gap-1 px-2 py-0.5 border font-['Inter'] text-[10px] tracking-wide ${styles[status]} ${className}`}>
      <span className={`w-1.5 h-1.5 rounded-full ${
        status === "in-stock" ? "bg-green-400" :
        status === "remaining-few" ? "bg-orange-400" :
        status === "low" ? "bg-red-400" : "bg-white/20"
      }`} />
      {label}
    </span>
  );
}

// ── Image Carousel ─────────────────────────────────────────────────────────────

function ImageCarousel({ images, alt }: { images: string[]; alt: string }) {
  const [idx, setIdx] = useState(0);
  const prev = () => setIdx((i) => (i === 0 ? images.length - 1 : i - 1));
  const next = () => setIdx((i) => (i === images.length - 1 ? 0 : i + 1));
  return (
    <div className="relative w-full aspect-[4/5] bg-[#1a1a1a] overflow-hidden group">
      {images.map((src, i) => (
        <img key={i} src={src} alt={`${alt} view ${i + 1}`}
          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500"
          style={{ opacity: i === idx ? 1 : 0 }} />
      ))}
      <button onClick={(e) => { e.stopPropagation(); prev(); }}
        className="absolute left-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white/80 hover:text-white">
        <ChevronLeft size={16} />
      </button>
      <button onClick={(e) => { e.stopPropagation(); next(); }}
        className="absolute right-3 top-1/2 -translate-y-1/2 w-8 h-8 bg-black/70 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 text-white/80 hover:text-white">
        <ChevronRight size={16} />
      </button>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
        {images.map((_, i) => (
          <button key={i} onClick={(e) => { e.stopPropagation(); setIdx(i); }}
            className="w-1.5 h-1.5 rounded-full transition-colors duration-200"
            style={{ background: i === idx ? "#e8e4de" : "rgba(232,228,222,0.3)" }} />
        ))}
      </div>
    </div>
  );
}

// ── Nav ───────────────────────────────────────────────────────────────────────

function Nav({ setView, cartCount, searchOpen, setSearchOpen }: {
  setView: (v: View) => void; cartCount: number;
  searchOpen: boolean; setSearchOpen: (v: boolean) => void;
}) {
  const [searchVal, setSearchVal] = useState("");
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-[#0e0e0e]/95 backdrop-blur-sm border-b border-white/[0.06]">
      <nav className="max-w-[1400px] mx-auto px-8 h-16 flex items-center justify-between">
        <button onClick={() => setView("home")}
          className="font-['Playfair_Display'] text-xl font-semibold tracking-[0.18em] uppercase text-[#e8e4de] hover:text-[#c8b89a] transition-colors">
          GOATED
        </button>
        <div className="hidden md:flex items-center gap-8">
          {["Collections", "Latest Drops", "Shop"].map((label) => (
            <button key={label}
              onClick={() => setView(label === "Collections" ? "collection" : "shop")}
              className="font-['Inter'] text-sm text-[#e8e4de]/60 hover:text-[#e8e4de] transition-colors tracking-wide">
              {label}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-5">
          {searchOpen ? (
            <div className="flex items-center gap-2 border-b border-white/20 pb-0.5">
              <input autoFocus value={searchVal} onChange={(e) => setSearchVal(e.target.value)}
                placeholder="Search…"
                className="text-sm w-36 outline-none bg-transparent font-['Inter'] text-[#e8e4de] placeholder:text-white/20" />
              <button onClick={() => { setSearchOpen(false); setSearchVal(""); }} className="text-white/40 hover:text-white/80 transition-colors">
                <X size={14} />
              </button>
            </div>
          ) : (
            <button onClick={() => setSearchOpen(true)} className="text-[#e8e4de]/60 hover:text-[#e8e4de] transition-colors">
              <Search size={18} strokeWidth={1.5} />
            </button>
          )}
          <button onClick={() => setView("cart")} className="relative text-[#e8e4de]/60 hover:text-[#e8e4de] transition-colors">
            <ShoppingBag size={18} strokeWidth={1.5} />
            {cartCount > 0 && (
              <span className="absolute -top-1.5 -right-1.5 w-4 h-4 bg-[#c8b89a] text-[#0e0e0e] text-[10px] font-['Inter'] font-medium flex items-center justify-center rounded-full">
                {cartCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}

// ── Product Card ──────────────────────────────────────────────────────────────

function ProductCard({ product, onSelect, onQuickAdd }: {
  product: Product; onSelect: () => void; onQuickAdd: () => void;
}) {
  const soldOut = product.stock === 0;
  return (
    <div className={`group ${soldOut ? "cursor-default" : "cursor-pointer"}`} onClick={soldOut ? undefined : onSelect}>
      <div className="relative overflow-hidden">
        <div className={soldOut ? "opacity-50" : ""}>
          <ImageCarousel images={product.images} alt={product.name} />
        </div>
        {product.isNew && !soldOut && (
          <span className="absolute top-3 left-3 bg-[#c8b89a] text-[#0e0e0e] text-[10px] font-['Inter'] font-medium tracking-widest px-2 py-1 uppercase">
            New
          </span>
        )}
        <div className="absolute top-3 right-3">
          <StockBadge stock={product.stock} />
        </div>
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-['Playfair_Display'] text-base font-medium leading-snug text-[#e8e4de]">{product.name}</h3>
          <span className="font-['Inter'] text-sm text-[#e8e4de]/50 shrink-0">{formatPrice(product.price)}</span>
        </div>
        <div className="flex gap-1.5">
          {product.colors.map((c) => (
            <span key={c.hex} title={c.name}
              className="w-3.5 h-3.5 rounded-full border border-white/10 shrink-0"
              style={{ background: c.hex }} />
          ))}
        </div>
        {soldOut ? (
          <button disabled
            className="w-full mt-2 py-2.5 text-[11px] font-['Inter'] tracking-widest uppercase border border-white/5 text-[#e8e4de]/20 cursor-not-allowed opacity-0 group-hover:opacity-100">
            Sold Out
          </button>
        ) : (
          <button onClick={(e) => { e.stopPropagation(); onQuickAdd(); }}
            className="w-full mt-2 py-2.5 text-[11px] font-['Inter'] tracking-widest uppercase border border-white/10 text-[#e8e4de]/60 hover:bg-[#e8e4de] hover:text-[#0e0e0e] hover:border-transparent transition-colors duration-200 opacity-0 group-hover:opacity-100">
            Quick Add
          </button>
        )}
      </div>
    </div>
  );
}

// ── Home View ─────────────────────────────────────────────────────────────────

function HomeView({ setView, setSelectedProduct, products, collections, onQuickAdd }: {
  setView: (v: View) => void;
  setSelectedProduct: (p: Product) => void;
  products: Product[];
  collections: Collection[];
  onQuickAdd: (p: Product) => void;
}) {
  return (
    <div>
      {/* Hero — full screen wordmark */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0e0e0e]">
        {/* Subtle grain texture via radial gradient */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #fff 1px, transparent 0)", backgroundSize: "32px 32px" }} />

        <h1 className="font-['Playfair_Display'] font-semibold text-[#e8e4de] select-none leading-none text-center"
          style={{ fontSize: "clamp(72px, 18vw, 260px)", letterSpacing: "-0.02em" }}>
          GOATED
        </h1>

        <div className="absolute bottom-12 left-0 right-0 flex items-center justify-between px-8 md:px-16">
          <p className="font-['Inter'] text-[#e8e4de]/25 text-xs tracking-[0.4em] uppercase">Premium Clothing</p>
          <button onClick={() => setView("shop")}
            className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/40 hover:text-[#e8e4de] transition-colors flex items-center gap-2">
            Shop Now <ArrowRight size={12} />
          </button>
          <p className="font-['Inter'] text-[#e8e4de]/25 text-xs tracking-[0.4em] uppercase">SS 2025</p>
        </div>
      </section>

      {/* Latest Drops */}
      <section className="max-w-[1400px] mx-auto px-8 py-24">
        <div className="flex items-baseline justify-between mb-12">
          <h2 className="font-['Playfair_Display'] text-3xl font-medium text-[#e8e4de]">Latest Drops</h2>
          <button onClick={() => setView("shop")}
            className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/30 hover:text-[#e8e4de] transition-colors flex items-center gap-1.5">
            View All <ArrowRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {products.filter((p) => p.isNew).slice(0, 4).map((p) => (
            <ProductCard key={p.id} product={p}
              onSelect={() => { setSelectedProduct(p); setView("product"); }}
              onQuickAdd={() => onQuickAdd(p)} />
          ))}
        </div>
      </section>

      {/* Collections */}
      <section className="bg-[#0a0a0a] py-24">
        <div className="max-w-[1400px] mx-auto px-8">
          <h2 className="font-['Playfair_Display'] text-3xl font-medium text-[#e8e4de] mb-12">Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3">
            {collections.map((col, i) => (
              <button key={col.id} onClick={() => setView("collection")}
                className={`group relative overflow-hidden text-left ${i === 0 ? "md:col-span-2 md:row-span-2" : ""}`}>
                <div className={`relative ${i === 0 ? "aspect-[3/4]" : "aspect-square"} bg-[#1a1a1a]`}>
                  <img src={col.image} alt={col.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-70" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-5">
                    <p className="font-['Inter'] text-white/40 text-[10px] tracking-widest uppercase mb-1">{col.tagline}</p>
                    <h3 className="font-['Playfair_Display'] text-white font-medium leading-tight">{col.name}</h3>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}

// ── Shop View ─────────────────────────────────────────────────────────────────

function ShopView({ setView, setSelectedProduct, products, onQuickAdd }: {
  setView: (v: View) => void; setSelectedProduct: (p: Product) => void;
  products: Product[]; onQuickAdd: (p: Product) => void;
}) {
  const [activeFilter, setActiveFilter] = useState("All");
  const filterNames = ["All", ...Array.from(new Set(products.map((p) => {
    return COLLECTIONS.find((c) => c.id === p.collectionId)?.name ?? p.collectionId;
  })))];
  const filtered = activeFilter === "All" ? products :
    products.filter((p) => COLLECTIONS.find((c) => c.id === p.collectionId)?.name === activeFilter);

  return (
    <div className="max-w-[1400px] mx-auto px-8 pt-32 pb-24">
      <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <p className="font-['Inter'] text-xs tracking-[0.3em] uppercase text-[#e8e4de]/25 mb-2">Browse</p>
          <h1 className="font-['Playfair_Display'] text-4xl font-medium text-[#e8e4de]">All Products</h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          {filterNames.map((f) => (
            <button key={f} onClick={() => setActiveFilter(f)}
              className={`font-['Inter'] text-[11px] tracking-widest uppercase px-4 py-2 border transition-colors ${
                activeFilter === f
                  ? "bg-[#e8e4de] text-[#0e0e0e] border-[#e8e4de]"
                  : "border-white/10 text-[#e8e4de]/40 hover:border-white/30 hover:text-[#e8e4de]/70"
              }`}>
              {f}
            </button>
          ))}
        </div>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-8">
        {filtered.map((p) => (
          <ProductCard key={p.id} product={p}
            onSelect={() => { setSelectedProduct(p); setView("product"); }}
            onQuickAdd={() => onQuickAdd(p)} />
        ))}
      </div>
    </div>
  );
}

// ── Collections View ──────────────────────────────────────────────────────────

function CollectionView({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="max-w-[1400px] mx-auto px-8 pt-32 pb-24">
      <div className="mb-12">
        <p className="font-['Inter'] text-xs tracking-[0.3em] uppercase text-[#e8e4de]/25 mb-2">Explore</p>
        <h1 className="font-['Playfair_Display'] text-4xl font-medium text-[#e8e4de]">Collections</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {COLLECTIONS.map((col) => (
          <button key={col.id} onClick={() => setView("shop")}
            className="group relative overflow-hidden aspect-[3/4] bg-[#1a1a1a] text-left">
            <img src={col.image} alt={col.name}
              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 group-hover:opacity-70" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <p className="font-['Inter'] text-white/40 text-[10px] tracking-widest uppercase mb-2">{col.tagline}</p>
              <h3 className="font-['Playfair_Display'] text-white text-2xl font-medium mb-4">{col.name}</h3>
              <span className="font-['Inter'] text-white/50 text-[11px] tracking-widest uppercase border-b border-white/20 pb-0.5">
                Browse Collection
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Product View ──────────────────────────────────────────────────────────────

function ProductView({ product, setView, addToCart }: {
  product: Product; setView: (v: View) => void; addToCart: (item: CartItem) => void;
}) {
  const [mainImg, setMainImg] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [selectedSize, setSelectedSize] = useState("");
  const [qty, setQty] = useState(1);
  const collection = COLLECTIONS.find((c) => c.id === product.collectionId);

  const handleAdd = () => {
    if (!selectedSize) return;
    addToCart({ product, color: selectedColor, size: selectedSize, quantity: qty });
    setView("cart");
  };

  return (
    <div className="max-w-[1400px] mx-auto px-8 pt-28 pb-24">
      <button onClick={() => setView("shop")}
        className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/30 hover:text-[#e8e4de] transition-colors flex items-center gap-2 mb-10">
        <ChevronLeft size={12} /> Back
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
        {/* Images */}
        <div className="space-y-3">
          <div className="aspect-[4/5] bg-[#1a1a1a] overflow-hidden">
            <img src={product.images[mainImg]} alt={product.name}
              className="w-full h-full object-cover transition-opacity duration-300" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setMainImg(i)}
                className={`aspect-[4/5] bg-[#1a1a1a] overflow-hidden border-2 transition-colors ${
                  mainImg === i ? "border-[#c8b89a]" : "border-transparent opacity-50 hover:opacity-80"
                }`}>
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
          <div className="grid grid-cols-3 gap-3 pt-1">
            {["Front View", "Back View", "On Model"].map((label) => (
              <p key={label} className="font-['Inter'] text-[10px] text-[#e8e4de]/20 tracking-wide text-center">{label}</p>
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="md:pt-4">
          {collection && (
            <p className="font-['Inter'] text-[10px] tracking-[0.3em] uppercase text-[#c8b89a]/70 mb-3">{collection.name}</p>
          )}
          <h1 className="font-['Playfair_Display'] text-4xl font-medium text-[#e8e4de] mb-2">{product.name}</h1>
          <p className="font-['Inter'] text-2xl text-[#e8e4de]/70 mb-8">{formatPrice(product.price)}</p>
          <p className="font-['Inter'] text-sm text-[#e8e4de]/50 leading-relaxed mb-8">{product.description}</p>

          {/* Color */}
          <div className="mb-6">
            <p className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/30 mb-3">
              Color — <span className="text-[#e8e4de]/70">{selectedColor.name}</span>
            </p>
            <div className="flex gap-2.5">
              {product.colors.map((c) => (
                <button key={c.hex} onClick={() => setSelectedColor(c)} title={c.name}
                  className={`w-7 h-7 rounded-full border-2 transition-all ${
                    selectedColor.hex === c.hex ? "border-[#c8b89a] scale-110" : "border-transparent"
                  }`}
                  style={{ background: c.hex, boxShadow: "0 0 0 1px rgba(255,255,255,0.1)" }} />
              ))}
            </div>
          </div>

          {/* Size */}
          <div className="mb-6">
            <p className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/30 mb-3">Size</p>
            <div className="flex gap-2 flex-wrap">
              {product.sizes.map((s) => (
                <button key={s} onClick={() => setSelectedSize(s)}
                  className={`w-12 h-10 font-['Inter'] text-xs tracking-wide border transition-colors ${
                    selectedSize === s
                      ? "bg-[#e8e4de] text-[#0e0e0e] border-[#e8e4de]"
                      : "border-white/10 text-[#e8e4de]/50 hover:border-white/30"
                  }`}>{s}</button>
              ))}
            </div>
            {!selectedSize && <p className="font-['Inter'] text-xs text-[#e8e4de]/20 mt-2">Select a size to continue</p>}
          </div>

          {/* Quantity */}
          <div className="mb-8">
            <p className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/30 mb-3">Quantity</p>
            <div className="flex items-center">
              <button onClick={() => setQty(Math.max(1, qty - 1))}
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#e8e4de]/50 hover:text-[#e8e4de] hover:border-white/20 transition-colors">
                <Minus size={12} />
              </button>
              <span className="w-12 h-10 border-t border-b border-white/10 flex items-center justify-center font-['Inter'] text-sm text-[#e8e4de]">{qty}</span>
              <button onClick={() => setQty(Math.min(product.stock, qty + 1))}
                className="w-10 h-10 border border-white/10 flex items-center justify-center text-[#e8e4de]/50 hover:text-[#e8e4de] hover:border-white/20 transition-colors">
                <Plus size={12} />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-4 mb-8">
            <StockBadge stock={product.stock} />
            <span className="font-['Inter'] text-xs text-[#e8e4de]/25">Free delivery over $100 · 3–5 business days</span>
          </div>

          <div className="space-y-3">
            {product.stock === 0 ? (
              <button className="w-full py-4 border border-white/10 text-[#e8e4de]/40 font-['Inter'] text-xs tracking-widest uppercase flex items-center justify-center gap-2 hover:border-[#c8b89a]/40 hover:text-[#c8b89a] transition-colors">
                <Bell size={13} /> Notify Me
              </button>
            ) : (
              <>
                <button onClick={handleAdd} disabled={!selectedSize}
                  className="w-full py-4 bg-[#e8e4de] text-[#0e0e0e] font-['Inter'] text-xs tracking-widest uppercase hover:bg-[#c8b89a] transition-colors disabled:opacity-20">
                  Add to Cart
                </button>
                <button onClick={handleAdd} disabled={!selectedSize}
                  className="w-full py-4 border border-white/10 text-[#e8e4de]/60 font-['Inter'] text-xs tracking-widest uppercase hover:bg-[#e8e4de] hover:text-[#0e0e0e] hover:border-transparent transition-colors disabled:opacity-20">
                  Order Now
                </button>
              </>
            )}
          </div>

          <div className="mt-10 pt-8 border-t border-white/[0.06]">
            <p className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/25 mb-2">Material</p>
            <p className="font-['Inter'] text-sm text-[#e8e4de]/40">{product.material}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// ── Cart View ─────────────────────────────────────────────────────────────────

function CartView({ cart, setView, updateQty, removeItem }: {
  cart: CartItem[]; setView: (v: View) => void;
  updateQty: (idx: number, qty: number) => void; removeItem: (idx: number) => void;
}) {
  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const delivery = total >= 100 ? 0 : 8;

  if (cart.length === 0) return (
    <div className="max-w-[1400px] mx-auto px-8 pt-36 pb-24 text-center">
      <p className="font-['Playfair_Display'] text-3xl font-medium text-[#e8e4de] mb-4">Your bag is empty.</p>
      <p className="font-['Inter'] text-sm text-[#e8e4de]/30 mb-8">Discover the collection.</p>
      <button onClick={() => setView("shop")}
        className="font-['Inter'] text-xs tracking-widest uppercase bg-[#e8e4de] text-[#0e0e0e] px-8 py-3.5 hover:bg-[#c8b89a] transition-colors">
        Shop Now
      </button>
    </div>
  );

  return (
    <div className="max-w-[900px] mx-auto px-8 pt-32 pb-24">
      <h1 className="font-['Playfair_Display'] text-3xl font-medium text-[#e8e4de] mb-12">Your Bag</h1>
      <div className="space-y-6 mb-12">
        {cart.map((item, idx) => (
          <div key={idx} className="flex gap-5 pb-6 border-b border-white/[0.06]">
            <div className="w-24 h-28 bg-[#1a1a1a] shrink-0 overflow-hidden">
              <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between gap-2">
                <h3 className="font-['Playfair_Display'] font-medium text-[#e8e4de]">{item.product.name}</h3>
                <p className="font-['Inter'] text-sm text-[#e8e4de] shrink-0">{formatPrice(item.product.price * item.quantity)}</p>
              </div>
              <div className="flex gap-4 mt-1.5 font-['Inter'] text-xs text-[#e8e4de]/30">
                <span className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-white/10 inline-block" style={{ background: item.color.hex }} />
                  {item.color.name}
                </span>
                <span>Size {item.size}</span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center">
                  <button onClick={() => updateQty(idx, item.quantity - 1)}
                    className="w-8 h-8 border border-white/10 flex items-center justify-center text-[#e8e4de]/40 hover:text-[#e8e4de] transition-colors">
                    <Minus size={10} />
                  </button>
                  <span className="w-8 h-8 border-t border-b border-white/10 flex items-center justify-center font-['Inter'] text-xs text-[#e8e4de]">{item.quantity}</span>
                  <button onClick={() => updateQty(idx, item.quantity + 1)}
                    className="w-8 h-8 border border-white/10 flex items-center justify-center text-[#e8e4de]/40 hover:text-[#e8e4de] transition-colors">
                    <Plus size={10} />
                  </button>
                </div>
                <button onClick={() => removeItem(idx)} className="text-[#e8e4de]/20 hover:text-red-400 transition-colors">
                  <Trash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="space-y-1.5">
          <div className="flex justify-between gap-16 font-['Inter'] text-xs text-[#e8e4de]/30">
            <span>Subtotal</span><span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between font-['Inter'] text-xs text-[#e8e4de]/30">
            <span>Delivery</span><span>{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
          </div>
          <div className="flex justify-between font-['Inter'] font-medium text-sm text-[#e8e4de] pt-2 border-t border-white/[0.06] mt-2">
            <span>Total</span><span>{formatPrice(total + delivery)}</span>
          </div>
        </div>
        <div className="flex flex-col gap-3 min-w-[220px]">
          <button onClick={() => setView("checkout")}
            className="w-full py-4 bg-[#e8e4de] text-[#0e0e0e] font-['Inter'] text-xs tracking-widest uppercase hover:bg-[#c8b89a] transition-colors">
            Proceed to Payment
          </button>
          <button onClick={() => setView("shop")}
            className="w-full py-3 border border-white/10 text-[#e8e4de]/40 font-['Inter'] text-xs tracking-widest uppercase hover:border-white/20 hover:text-[#e8e4de]/70 transition-colors">
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}

// ── Checkout View ─────────────────────────────────────────────────────────────

function CheckoutView({ cart, setView, clearCart }: {
  cart: CartItem[]; setView: (v: View) => void; clearCart: () => void;
}) {
  const [form, setForm] = useState({ name: "", phone: "", email: "", address: "", payment: "visa" });
  const total = cart.reduce((s, i) => s + i.product.price * i.quantity, 0);
  const delivery = total >= 100 ? 0 : 8;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    clearCart();
    setView("confirmation");
  };

  const paymentMethods = [
    { id: "visa", label: "Visa" },
    { id: "mastercard", label: "Mastercard" },
    { id: "mtn", label: "MTN Mobile Money" },
  ];

  const inputCls = "w-full border border-white/10 bg-[#1a1a1a] px-4 py-3 font-['Inter'] text-sm text-[#e8e4de] focus:outline-none focus:border-[#c8b89a] transition-colors placeholder:text-[#e8e4de]/15";

  return (
    <div className="max-w-[1000px] mx-auto px-8 pt-32 pb-24">
      <button onClick={() => setView("cart")}
        className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/25 hover:text-[#e8e4de] transition-colors flex items-center gap-2 mb-10">
        <ChevronLeft size={12} /> Back to Bag
      </button>
      <h1 className="font-['Playfair_Display'] text-3xl font-medium text-[#e8e4de] mb-12">Checkout</h1>

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-[1fr_340px] gap-12">
        <div className="space-y-8">
          <div>
            <h2 className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/25 mb-5">Contact</h2>
            <div className="space-y-3">
              {[
                { field: "name", label: "Full Name", type: "text", required: true },
                { field: "phone", label: "Phone Number", type: "tel", required: true },
                { field: "email", label: "Email Address (optional)", type: "email", required: false },
              ].map(({ field, label, type, required }) => (
                <div key={field}>
                  <label className="font-['Inter'] text-xs text-[#e8e4de]/30 block mb-1.5">{label}</label>
                  <input type={type} required={required}
                    value={form[field as keyof typeof form]}
                    onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                    className={inputCls} />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/25 mb-5">Delivery</h2>
            <div>
              <label className="font-['Inter'] text-xs text-[#e8e4de]/30 block mb-1.5">Delivery Address</label>
              <textarea required value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
                rows={3} className={`${inputCls} resize-none`} />
            </div>
          </div>

          <div>
            <h2 className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/25 mb-5">Payment</h2>
            <div className="space-y-2">
              {paymentMethods.map((pm) => (
                <label key={pm.id}
                  className={`flex items-center gap-3 p-4 border cursor-pointer transition-colors ${
                    form.payment === pm.id ? "border-[#c8b89a]/50 bg-[#c8b89a]/5" : "border-white/10 hover:border-white/20"
                  }`}>
                  <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center transition-colors ${
                    form.payment === pm.id ? "border-[#c8b89a]" : "border-white/20"
                  }`}>
                    {form.payment === pm.id && <div className="w-2 h-2 rounded-full bg-[#c8b89a]" />}
                  </div>
                  <input type="radio" name="payment" value={pm.id} checked={form.payment === pm.id}
                    onChange={() => setForm({ ...form, payment: pm.id })} className="sr-only" />
                  <span className="font-['Inter'] text-sm text-[#e8e4de]">{pm.label}</span>
                  {pm.id === "mtn" && <span className="ml-auto font-['Inter'] text-[10px] text-[#e8e4de]/25 tracking-wide">Rwanda</span>}
                </label>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-[#161616] border border-white/[0.06] p-6 sticky top-24">
            <h2 className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/25 mb-6">Order Summary</h2>
            <div className="space-y-4 mb-6">
              {cart.map((item, i) => (
                <div key={i} className="flex gap-3">
                  <div className="w-14 h-16 bg-[#1a1a1a] shrink-0 overflow-hidden">
                    <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-['Playfair_Display'] text-sm font-medium text-[#e8e4de] leading-tight">{item.product.name}</p>
                    <p className="font-['Inter'] text-xs text-[#e8e4de]/30 mt-0.5">{item.color.name} · {item.size} · ×{item.quantity}</p>
                    <p className="font-['Inter'] text-sm text-[#e8e4de] mt-1">{formatPrice(item.product.price * item.quantity)}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-white/[0.06] pt-4 space-y-2">
              <div className="flex justify-between font-['Inter'] text-xs text-[#e8e4de]/30">
                <span>Subtotal</span><span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between font-['Inter'] text-xs text-[#e8e4de]/30">
                <span>Delivery</span><span>{delivery === 0 ? "Free" : formatPrice(delivery)}</span>
              </div>
              <div className="flex justify-between font-['Inter'] font-medium text-sm text-[#e8e4de] pt-2 border-t border-white/[0.06]">
                <span>Total</span><span>{formatPrice(total + delivery)}</span>
              </div>
            </div>
            <button type="submit"
              className="w-full mt-6 py-4 bg-[#e8e4de] text-[#0e0e0e] font-['Inter'] text-xs tracking-widest uppercase hover:bg-[#c8b89a] transition-colors">
              Place Order
            </button>
            <div className="flex items-center justify-center gap-1.5 mt-4">
              <div className="w-1.5 h-1.5 bg-green-500/70 rounded-full" />
              <p className="font-['Inter'] text-[10px] text-[#e8e4de]/20">Secure & encrypted</p>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

// ── Confirmation ──────────────────────────────────────────────────────────────

function ConfirmationView({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="max-w-[600px] mx-auto px-8 pt-40 pb-24 text-center">
      <div className="w-14 h-14 border border-[#c8b89a]/40 flex items-center justify-center mx-auto mb-8">
        <Check size={22} strokeWidth={1.5} className="text-[#c8b89a]" />
      </div>
      <h1 className="font-['Playfair_Display'] text-4xl font-medium text-[#e8e4de] mb-4">Order Confirmed</h1>
      <p className="font-['Inter'] text-sm text-[#e8e4de]/40 leading-relaxed mb-2">
        Thank you. A confirmation will be sent to you shortly.
      </p>
      <p className="font-['Inter'] text-sm text-[#e8e4de]/25 mb-10">Estimated delivery: 3–5 business days.</p>
      <button onClick={() => setView("shop")}
        className="font-['Inter'] text-xs tracking-widest uppercase bg-[#e8e4de] text-[#0e0e0e] px-8 py-3.5 hover:bg-[#c8b89a] transition-colors">
        Continue Shopping
      </button>
    </div>
  );
}

// ── Admin ─────────────────────────────────────────────────────────────────────

function AdminView({ products, setView, onStockChange }: {
  products: Product[]; setView: (v: View) => void;
  onStockChange: (id: string, stock: number) => void;
}) {
  const [adminTab, setAdminTab] = useState<"dashboard" | "products" | "orders" | "inventory">("dashboard");
  const [editProducts, setEditProducts] = useState(products.map((p) => ({ ...p })));

  // Keep editProducts in sync when parent stock changes (e.g. after a purchase)
  const mergedProducts = editProducts.map((ep) => {
    const live = products.find((p) => p.id === ep.id);
    return live ? { ...ep, stock: live.stock } : ep;
  });

  const togglePublish = (id: string) =>
    setEditProducts((prev) => prev.map((p) => p.id === id ? { ...p, published: !p.published } : p));

  const adjustStock = (id: string, delta: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    const next = Math.max(0, product.stock + delta);
    onStockChange(id, next);
  };

  const setStockDirect = (id: string, val: string) => {
    const n = parseInt(val);
    if (!isNaN(n) && n >= 0) onStockChange(id, n);
  };

  const lowStock = mergedProducts.filter((p) => p.stock <= 10 && p.stock > 0);
  const soldOut  = mergedProducts.filter((p) => p.stock === 0);

  const ORDERS = [
    { id: "#GD-1042", customer: "Kwame Osei", product: "Classic Logo Tee", status: "Shipped", amount: 45, date: "Jul 11, 2025" },
    { id: "#GD-1041", customer: "Amara Diallo", product: "Essential Hoodie", status: "Processing", amount: 95, date: "Jul 11, 2025" },
    { id: "#GD-1040", customer: "Fatoumata Bah", product: "Summer Linen Set", status: "Delivered", amount: 155, date: "Jul 10, 2025" },
    { id: "#GD-1039", customer: "Emmanuel Nkosi", product: "Wide Leg Cargo", status: "Delivered", amount: 120, date: "Jul 9, 2025" },
    { id: "#GD-1038", customer: "Aisha Kamara", product: "Varsity Jacket", status: "Shipped", amount: 210, date: "Jul 8, 2025" },
  ];

  const statusStyle: Record<string, string> = {
    Shipped: "bg-blue-500/10 text-blue-300",
    Processing: "bg-amber-500/10 text-amber-300",
    Delivered: "bg-green-500/10 text-green-300",
  };

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "products", label: "Products", icon: Package },
    { id: "orders", label: "Orders", icon: ShoppingCart },
    { id: "inventory", label: "Inventory", icon: Archive },
  ];

  return (
    <div className="min-h-screen bg-[#0a0a0a]">
      <div className="flex">
        <aside className="w-56 shrink-0 border-r border-white/[0.06] bg-[#0e0e0e] fixed top-0 left-0 bottom-0 z-40">
          <div className="p-6 border-b border-white/[0.06] mt-6">
            <p className="font-['Playfair_Display'] text-base font-medium text-[#e8e4de] tracking-widest">GOATED</p>
            <p className="font-['Inter'] text-[10px] text-[#e8e4de]/25 tracking-widest uppercase mt-0.5">Admin Portal</p>
          </div>
          <nav className="p-3 mt-2">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button key={id} onClick={() => setAdminTab(id as any)}
                className={`w-full flex items-center gap-3 px-3 py-2.5 font-['Inter'] text-sm transition-colors mb-0.5 ${
                  adminTab === id
                    ? "bg-[#e8e4de] text-[#0e0e0e]"
                    : "text-[#e8e4de]/30 hover:text-[#e8e4de]/70 hover:bg-white/[0.04]"
                }`}>
                <Icon size={15} /> {label}
              </button>
            ))}
          </nav>
          <div className="absolute bottom-6 left-0 right-0 px-6">
            <button onClick={() => setView("home")}
              className="w-full font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/20 hover:text-[#e8e4de]/50 transition-colors">
              ← Back to Site
            </button>
          </div>
        </aside>

        <main className="ml-56 flex-1 p-8 pt-12 min-h-screen">
          {adminTab === "dashboard" && (
            <div>
              <h1 className="font-['Playfair_Display'] text-3xl font-medium text-[#e8e4de] mb-8">Dashboard</h1>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8">
                {[
                  { label: "Total Products", value: mergedProducts.length, sub: `${mergedProducts.filter((p) => p.published).length} published` },
                  { label: "Active Orders", value: 12, sub: "3 pending shipment" },
                  { label: "Revenue (Jul)", value: "$11,300", sub: "+23% vs last month" },
                  { label: "Low Stock", value: lowStock.length + soldOut.length, sub: soldOut.length > 0 ? `${soldOut.length} sold out` : "Needs restocking", alert: true },
                ].map(({ label, value, sub, alert }) => (
                  <div key={label} className="bg-[#161616] border border-white/[0.06] p-5">
                    <p className="font-['Inter'] text-xs text-[#e8e4de]/25 tracking-widest uppercase mb-2">{label}</p>
                    <p className={`font-['Playfair_Display'] text-3xl font-medium ${alert && (lowStock.length + soldOut.length) > 0 ? "text-amber-400" : "text-[#e8e4de]"}`}>{value}</p>
                    <p className="font-['Inter'] text-xs text-[#e8e4de]/25 mt-1">{sub}</p>
                  </div>
                ))}
              </div>
              <div className="bg-[#161616] border border-white/[0.06] p-6 mb-5">
                <h2 className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/25 mb-6">Revenue — 2025</h2>
                <ResponsiveContainer width="100%" height={180}>
                  <BarChart data={REVENUE_DATA} barSize={26}>
                    <XAxis dataKey="month" axisLine={false} tickLine={false}
                      tick={{ fontFamily: "Inter", fontSize: 11, fill: "rgba(232,228,222,0.25)" }} />
                    <YAxis hide />
                    <Tooltip
                      cursor={{ fill: "rgba(255,255,255,0.04)" }}
                      formatter={(v: number) => [`$${v.toLocaleString()}`, "Revenue"]}
                      contentStyle={{ fontFamily: "Inter", fontSize: 12, background: "#1e1e1e", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 0, color: "#e8e4de" }} />
                    <Bar dataKey="revenue" fill="#c8b89a" radius={[2, 2, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div className="bg-[#161616] border border-white/[0.06]">
                <div className="p-5 border-b border-white/[0.06]">
                  <h2 className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/25">Recent Orders</h2>
                </div>
                {ORDERS.slice(0, 4).map((order) => (
                  <div key={order.id} className="flex items-center gap-4 px-5 py-3.5 border-b border-white/[0.04] last:border-0">
                    <p className="font-['Inter'] text-xs text-[#e8e4de]/25 w-20 shrink-0">{order.id}</p>
                    <p className="font-['Inter'] text-sm text-[#e8e4de] flex-1">{order.customer}</p>
                    <p className="font-['Inter'] text-xs text-[#e8e4de]/30 hidden md:block">{order.product}</p>
                    <span className={`font-['Inter'] text-[10px] tracking-wide px-2.5 py-1 ${statusStyle[order.status]}`}>{order.status}</span>
                    <p className="font-['Inter'] text-sm text-[#e8e4de] w-14 text-right shrink-0">{formatPrice(order.amount)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminTab === "products" && (
            <div>
              <div className="flex items-center justify-between mb-8">
                <h1 className="font-['Playfair_Display'] text-3xl font-medium text-[#e8e4de]">Products</h1>
                <button className="font-['Inter'] text-xs tracking-widest uppercase bg-[#e8e4de] text-[#0e0e0e] px-5 py-2.5 hover:bg-[#c8b89a] transition-colors flex items-center gap-2">
                  <Plus size={13} /> Add Product
                </button>
              </div>
              <div className="bg-[#161616] border border-white/[0.06]">
                {mergedProducts.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 px-5 py-4 border-b border-white/[0.04] last:border-0">
                    <div className="w-14 h-16 bg-[#1a1a1a] shrink-0 overflow-hidden">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Playfair_Display'] text-sm font-medium text-[#e8e4de]">{p.name}</p>
                      <p className="font-['Inter'] text-xs text-[#e8e4de]/25 mt-0.5">
                        {COLLECTIONS.find((c) => c.id === p.collectionId)?.name}
                      </p>
                    </div>
                    <StockBadge stock={p.stock} />
                    <p className="font-['Inter'] text-sm text-[#e8e4de] w-16 text-right shrink-0">{formatPrice(p.price)}</p>
                    <button onClick={() => togglePublish(p.id)}
                      className={`font-['Inter'] text-[10px] tracking-wide px-2.5 py-1 transition-colors w-16 text-center ${
                        p.published ? "bg-green-500/10 text-green-400" : "bg-white/5 text-[#e8e4de]/30"
                      }`}>
                      {p.published ? "Live" : "Hidden"}
                    </button>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button className="p-1.5 hover:bg-white/5 transition-colors text-[#e8e4de]/25 hover:text-[#e8e4de]/70">
                        <Edit2 size={13} />
                      </button>
                      <button className="p-1.5 hover:bg-red-500/10 transition-colors text-[#e8e4de]/25 hover:text-red-400">
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminTab === "orders" && (
            <div>
              <h1 className="font-['Playfair_Display'] text-3xl font-medium text-[#e8e4de] mb-8">Orders</h1>
              <div className="bg-[#161616] border border-white/[0.06]">
                <div className="grid grid-cols-[100px_1fr_1fr_110px_70px_90px] gap-4 px-5 py-3 border-b border-white/[0.06]">
                  {["Order", "Customer", "Product", "Status", "Amount", "Date"].map((h) => (
                    <p key={h} className="font-['Inter'] text-[10px] tracking-widest uppercase text-[#e8e4de]/25">{h}</p>
                  ))}
                </div>
                {ORDERS.map((order) => (
                  <div key={order.id} className="grid grid-cols-[100px_1fr_1fr_110px_70px_90px] gap-4 items-center px-5 py-3.5 border-b border-white/[0.04] last:border-0">
                    <p className="font-['Inter'] text-xs text-[#e8e4de]/25">{order.id}</p>
                    <p className="font-['Inter'] text-sm text-[#e8e4de]">{order.customer}</p>
                    <p className="font-['Inter'] text-sm text-[#e8e4de]/40">{order.product}</p>
                    <span className={`font-['Inter'] text-[10px] tracking-wide px-2.5 py-1 w-fit ${statusStyle[order.status]}`}>{order.status}</span>
                    <p className="font-['Inter'] text-sm text-[#e8e4de]">{formatPrice(order.amount)}</p>
                    <p className="font-['Inter'] text-xs text-[#e8e4de]/25">{order.date}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {adminTab === "inventory" && (
            <div>
              <h1 className="font-['Playfair_Display'] text-3xl font-medium text-[#e8e4de] mb-8">Inventory</h1>

              {soldOut.length > 0 && (
                <div className="bg-red-500/5 border border-red-500/20 p-4 flex items-start gap-3 mb-3">
                  <AlertCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-['Inter'] text-sm font-medium text-red-300">Sold out</p>
                    <p className="font-['Inter'] text-xs text-red-400/60 mt-0.5">{soldOut.map((p) => p.name).join(", ")}</p>
                  </div>
                </div>
              )}
              {lowStock.length > 0 && (
                <div className="bg-amber-500/5 border border-amber-500/20 p-4 flex items-start gap-3 mb-6">
                  <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                  <div>
                    <p className="font-['Inter'] text-sm font-medium text-amber-300">Low stock alert</p>
                    <p className="font-['Inter'] text-xs text-amber-400/60 mt-0.5">{lowStock.map((p) => p.name).join(", ")}</p>
                  </div>
                </div>
              )}

              <div className="bg-[#161616] border border-white/[0.06]">
                <div className="grid grid-cols-[1fr_120px_160px_120px] gap-4 px-5 py-3 border-b border-white/[0.06]">
                  {["Product", "Status", "Stock", "Adjust"].map((h) => (
                    <p key={h} className="font-['Inter'] text-[10px] tracking-widest uppercase text-[#e8e4de]/25">{h}</p>
                  ))}
                </div>
                {mergedProducts.map((p) => (
                  <div key={p.id} className="grid grid-cols-[1fr_120px_160px_120px] gap-4 items-center px-5 py-4 border-b border-white/[0.04] last:border-0">
                    <div>
                      <p className="font-['Playfair_Display'] text-sm text-[#e8e4de]">{p.name}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="w-20 h-1 bg-white/10 overflow-hidden">
                          <div className="h-full transition-all duration-300"
                            style={{
                              width: `${Math.min(100, (p.stock / 30) * 100)}%`,
                              background: p.stock === 0 ? "#6a6a6a" : p.stock <= 5 ? "#f87171" : p.stock <= 10 ? "#fbbf24" : "#86efac",
                            }} />
                        </div>
                      </div>
                    </div>

                    <StockBadge stock={p.stock} />

                    {/* Editable number */}
                    <div className="flex items-center gap-1">
                      <input
                        type="number" min={0}
                        value={p.stock}
                        onChange={(e) => setStockDirect(p.id, e.target.value)}
                        className="w-16 bg-[#1a1a1a] border border-white/10 px-2 py-1.5 font-['Inter'] text-sm text-[#e8e4de] focus:outline-none focus:border-[#c8b89a] transition-colors text-center" />
                      <span className="font-['Inter'] text-xs text-[#e8e4de]/25">units</span>
                    </div>

                    {/* ± buttons */}
                    <div className="flex items-center gap-1">
                      <button onClick={() => adjustStock(p.id, -1)} disabled={p.stock === 0}
                        className="w-7 h-7 border border-white/10 flex items-center justify-center text-[#e8e4de]/40 hover:text-[#e8e4de] hover:border-white/25 disabled:opacity-20 transition-colors">
                        <Minus size={10} />
                      </button>
                      <button onClick={() => adjustStock(p.id, 1)}
                        className="w-7 h-7 border border-white/10 flex items-center justify-center text-[#e8e4de]/40 hover:text-[#e8e4de] hover:border-white/25 transition-colors">
                        <Plus size={10} />
                      </button>
                      <button onClick={() => adjustStock(p.id, 10)}
                        className="font-['Inter'] text-[10px] text-[#e8e4de]/25 hover:text-[#c8b89a] transition-colors px-1">
                        +10
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

// ── Footer ────────────────────────────────────────────────────────────────────

function Footer() {
  return (
    <footer className="border-t border-white/[0.06] py-16">
      <div className="max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          <div>
            <p className="font-['Playfair_Display'] text-lg font-medium tracking-widest text-[#e8e4de] mb-4">GOATED</p>
            <p className="font-['Inter'] text-xs text-[#e8e4de]/25 leading-relaxed">Premium clothing, designed to last.</p>
          </div>
          {[
            { title: "Shop", links: ["New Arrivals", "Collections", "All Products"] },
            { title: "Help", links: ["Shipping Info", "Returns", "Contact Us"] },
            { title: "Follow", links: ["Instagram", "TikTok"] },
          ].map(({ title, links }) => (
            <div key={title}>
              <p className="font-['Inter'] text-[10px] tracking-widest uppercase text-[#e8e4de]/25 mb-4">{title}</p>
              <ul className="space-y-2">
                {links.map((l) => (
                  <li key={l}>
                    <a href="#" className="font-['Inter'] text-sm text-[#e8e4de]/35 hover:text-[#e8e4de] transition-colors">{l}</a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between pt-8 border-t border-white/[0.06] gap-4">
          <p className="font-['Inter'] text-xs text-[#e8e4de]/15">© 2025 GOATED. All rights reserved.</p>
          <div className="flex gap-5">
            <a href="#" className="text-[#e8e4de]/20 hover:text-[#e8e4de] transition-colors"><Instagram size={16} /></a>
            <a href="#" className="font-['Inter'] text-xs text-[#e8e4de]/20 hover:text-[#e8e4de] transition-colors">TikTok</a>
          </div>
        </div>
      </div>
    </footer>
  );
}

// ── Quick Add Modal ───────────────────────────────────────────────────────────

function QuickAddModal({ product, onClose, onAdd }: {
  product: Product; onClose: () => void; onAdd: (item: CartItem) => void;
}) {
  const [color, setColor] = useState(product.colors[0]);
  const [size, setSize] = useState("");

  const handleAdd = () => {
    if (!size) return;
    onAdd({ product, color, size, quantity: 1 });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end md:items-center justify-center">
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" onClick={onClose} />
      <div className="relative bg-[#161616] border border-white/[0.08] w-full max-w-md p-8 mx-0 md:mx-4">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="font-['Playfair_Display'] font-medium text-lg text-[#e8e4de]">{product.name}</h3>
            <p className="font-['Inter'] text-sm text-[#e8e4de]/40 mt-1">{formatPrice(product.price)}</p>
          </div>
          <button onClick={onClose} className="text-[#e8e4de]/20 hover:text-[#e8e4de]/60 transition-colors"><X size={18} /></button>
        </div>
        <div className="mb-5">
          <p className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/25 mb-3">Color</p>
          <div className="flex gap-2.5">
            {product.colors.map((c) => (
              <button key={c.hex} onClick={() => setColor(c)} title={c.name}
                className={`w-7 h-7 rounded-full border-2 transition-all ${color.hex === c.hex ? "border-[#c8b89a] scale-110" : "border-transparent"}`}
                style={{ background: c.hex, boxShadow: "0 0 0 1px rgba(255,255,255,0.1)" }} />
            ))}
          </div>
        </div>
        <div className="mb-8">
          <p className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/25 mb-3">Size</p>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((s) => (
              <button key={s} onClick={() => setSize(s)}
                className={`w-12 h-9 font-['Inter'] text-xs border transition-colors ${
                  size === s ? "bg-[#e8e4de] text-[#0e0e0e] border-[#e8e4de]" : "border-white/10 text-[#e8e4de]/40 hover:border-white/25"
                }`}>{s}</button>
            ))}
          </div>
        </div>
        <button onClick={handleAdd} disabled={!size}
          className="w-full py-3.5 bg-[#e8e4de] text-[#0e0e0e] font-['Inter'] text-xs tracking-widest uppercase hover:bg-[#c8b89a] transition-colors disabled:opacity-20">
          Add to Cart
        </button>
      </div>
    </div>
  );
}

// ── App ───────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] = useState<View>("home");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const [quickAddProduct, setQuickAddProduct] = useState<Product | null>(null);

  // Lifted stock map — single source of truth across storefront + admin
  const [stockMap, setStockMap] = useState<Record<string, number>>(
    () => Object.fromEntries(PRODUCTS.map((p) => [p.id, p.stock]))
  );

  // Enrich products with live stock
  const liveProducts = PRODUCTS.map((p) => ({ ...p, stock: stockMap[p.id] ?? p.stock }));

  // Live selected product (keeps detail page in sync after stock changes)
  const liveSelected = selectedProduct
    ? liveProducts.find((p) => p.id === selectedProduct.id) ?? selectedProduct
    : null;

  const setViewAndScroll = (v: View) => {
    setView(v);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const addToCart = (item: CartItem) => {
    setCart((prev) => {
      const existing = prev.findIndex(
        (i) => i.product.id === item.product.id && i.color.hex === item.color.hex && i.size === item.size
      );
      if (existing >= 0) {
        const next = [...prev];
        next[existing] = { ...next[existing], quantity: next[existing].quantity + item.quantity };
        return next;
      }
      return [...prev, item];
    });
  };

  // Deduct stock when order is placed
  const clearCartAndDeductStock = () => {
    setStockMap((prev) => {
      const next = { ...prev };
      cart.forEach((item) => {
        next[item.product.id] = Math.max(0, (next[item.product.id] ?? 0) - item.quantity);
      });
      return next;
    });
    setCart([]);
  };

  const handleStockChange = (id: string, stock: number) =>
    setStockMap((prev) => ({ ...prev, [id]: stock }));

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const isAdmin = view === "admin";

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
      {!isAdmin && (
        <Nav setView={setViewAndScroll} cartCount={cartCount}
          searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      )}

      {view === "home" && (
        <HomeView setView={setViewAndScroll} setSelectedProduct={setSelectedProduct}
          products={liveProducts} collections={COLLECTIONS}
          onQuickAdd={(p) => setQuickAddProduct(p)} />
      )}
      {view === "shop" && (
        <ShopView setView={setViewAndScroll} setSelectedProduct={setSelectedProduct}
          products={liveProducts} onQuickAdd={(p) => setQuickAddProduct(p)} />
      )}
      {view === "collection" && <CollectionView setView={setViewAndScroll} />}
      {view === "product" && liveSelected && (
        <ProductView product={liveSelected} setView={setViewAndScroll} addToCart={addToCart} />
      )}
      {view === "cart" && (
        <CartView cart={cart} setView={setViewAndScroll} updateQty={(idx, qty) => {
          if (qty <= 0) setCart((p) => p.filter((_, i) => i !== idx));
          else setCart((p) => p.map((item, i) => i === idx ? { ...item, quantity: qty } : item));
        }} removeItem={(i) => setCart((p) => p.filter((_, j) => j !== i))} />
      )}
      {view === "checkout" && (
        <CheckoutView cart={cart} setView={setViewAndScroll} clearCart={clearCartAndDeductStock} />
      )}
      {view === "confirmation" && <ConfirmationView setView={setViewAndScroll} />}
      {view === "admin" && (
        <AdminView products={liveProducts} setView={setViewAndScroll} onStockChange={handleStockChange} />
      )}

      {!isAdmin && (
        <button onClick={() => setViewAndScroll("admin")}
          className="fixed bottom-6 right-6 w-9 h-9 bg-white/5 hover:bg-white/10 flex items-center justify-center transition-colors border border-white/[0.06]"
          title="Admin Portal">
          <LayoutDashboard size={14} className="text-[#e8e4de]/20" />
        </button>
      )}

      {quickAddProduct && (
        <QuickAddModal product={quickAddProduct} onClose={() => setQuickAddProduct(null)}
          onAdd={(item) => { addToCart(item); }} />
      )}
    </div>
  );
}
