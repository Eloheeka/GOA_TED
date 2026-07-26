import { useState } from "react";
import {
  Search, ShoppingBag, ChevronLeft, ChevronRight, X, Plus, Minus,
  LayoutDashboard, Package, ShoppingCart, Archive, AlertCircle,
  Instagram, Check, Trash2, Edit2, Bell,
} from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";

type View = "home" | "shop" | "product" | "cart" | "checkout" | "confirmation" | "admin";

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

// ── Auth ──────────────────────────────────────────────────────────────────────

const ALLOWED_USERS: { email: string; password: string; name: string }[] = [
  { email: "ishimwesamuel183@gmail.com", password: "goated@2026", name: "Samuel" },
];

// ── Data ──────────────────────────────────────────────────────────────────────

const COLLECTIONS: Collection[] = [
  { id: "essentials", name: "GOATED Essentials", image: "/images/GOA BABY TEE black png.png", tagline: "The foundation." },
];

// Sidebar category labels → product id mapping
const CATEGORY_PRODUCTS: { label: string; productId: string }[] = [
  { label: "GOA BABY TEE black", productId: "p1" },
  { label: "GOA BABY TEE white", productId: "p2" },
  { label: "GOA GUA B.L.S",      productId: "p3" },
  { label: "GOA GUA H",          productId: "p4" },
  { label: "GOA GUA LS",         productId: "p5" },
  { label: "GOA.PFYH",           productId: "p6" },
  { label: "POLO",               productId: "p7" },
  { label: "STRIPED TEE",        productId: "p8" },
];

const INITIAL_PRODUCTS: Product[] = [
  {
    id: "p1",
    name: "GOA BABY TEE Black",
    price: 45,
    collectionId: "essentials",
    description: "Clean and minimal baby tee in jet black. A staple cut with a tight, cropped fit and subtle GOATED branding.",
    material: "100% Combed Cotton, 180gsm.",
    colors: [{ name: "Jet Black", hex: "#0a0a0a" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 20,
    images: [
      "/images/GOA BABY TEE black png.png",
      "/images/baby_tee_black.JPG",
      "/images/GOA BABY TEE black png.png",
    ],
    isNew: true,
    published: true,
  },
  {
    id: "p2",
    name: "GOA BABY TEE White",
    price: 45,
    collectionId: "essentials",
    description: "The same sharp baby tee silhouette in crisp white. Pairs with everything.",
    material: "100% Combed Cotton, 180gsm.",
    colors: [{ name: "White", hex: "#f5f5f5" }],
    sizes: ["XS", "S", "M", "L", "XL"],
    stock: 18,
    images: [
      "/images/GOA BABY TEE WHITE PNG.png",
      "/images/GOA BABY TEE WHITE PNG.png",
      "/images/GOA BABY TEE WHITE PNG.png",
    ],
    isNew: true,
    published: true,
  },
  {
    id: "p3",
    name: "GOA GUA B.L.S",
    price: 75,
    collectionId: "essentials",
    description: "Long sleeve essential from the Guatemala collection. Relaxed fit with dropped shoulders.",
    material: "100% Cotton, 220gsm.",
    colors: [{ name: "Black", hex: "#0a0a0a" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 14,
    images: [
      "/images/GOA GUA B.LS.png",
      "/images/bls.jpg",
      "/images/bls2.jpg",
    ],
    published: true,
  },
  {
    id: "p4",
    name: "GOA GUA H",
    price: 95,
    collectionId: "essentials",
    description: "Guatemala collection hoodie. Heavyweight construction with a clean front and structured hood.",
    material: "80% Cotton, 20% Polyester, 380gsm.",
    colors: [{ name: "Black", hex: "#0a0a0a" }],
    sizes: ["S", "M", "L", "XL", "XXL"],
    stock: 10,
    images: [
      "/images/GOA GUA H.png",
      "/images/GUA_h (1).jpg",
      "/images/GUA_h1.JPG",
    ],
    isNew: true,
    published: true,
  },
  {
    id: "p5",
    name: "GOA GUA LS",
    price: 70,
    collectionId: "essentials",
    description: "Long sleeve tee from the Guatemala series. Minimal, versatile, essential.",
    material: "100% Cotton, 200gsm.",
    colors: [{ name: "Black", hex: "#0a0a0a" }],
    sizes: ["S", "M", "L", "XL"],
    stock: 16,
    images: [
      "/images/GOA GUA LS.png",
      "/images/ls.jpg",
      "/images/ls1.jpg",
    ],
    published: true,
  },
  {
    id: "p6",
    name: "GOA.PFYH Tee",
    price: 55,
    collectionId: "essentials",
    description: "Printed for your head. Statement tee with bold front graphics from the GOATED archive.",
    material: "100% Cotton, 200gsm.",
    colors: [{ name: "White", hex: "#f5f5f5" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 12,
    images: [
      "/images/GOA.PFYH TEE png.png",
      "/images/pfyh.jpg",
      "/images/pfyh2.jpg",
    ],
    isNew: true,
    published: true,
  },
  {
    id: "p7",
    name: "Polo",
    price: 65,
    collectionId: "essentials",
    description: "Classic polo with a modern GOATED fit. Clean collar, subtle branding, built to last.",
    material: "100% Piqué Cotton, 220gsm.",
    colors: [{ name: "Black", hex: "#0a0a0a" }],
    sizes: ["S", "M", "L", "XL"],
    stock: 8,
    images: [
      "/images/POLO.png",
      "/images/polo.jpg",
      "/images/polo1.jpg",
    ],
    published: true,
  },
  {
    id: "p8",
    name: "Striped Tee",
    price: 50,
    collectionId: "essentials",
    description: "Heritage stripe pattern reinterpreted through the GOATED lens. Relaxed fit, midweight fabric.",
    material: "100% Cotton, 200gsm.",
    colors: [{ name: "Multi", hex: "#6b6b6b" }],
    sizes: ["XS", "S", "M", "L", "XL", "XXL"],
    stock: 22,
    images: [
      "/images/STRIPED TEE.png",
      "/images/stripped_tee.JPG",
      "/images/stripped_tee1.JPG",
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
        {false && product.isNew && !soldOut && (
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

// ── Product Grid ──────────────────────────────────────────────────────────────

function ShopLayout({ products, setView, setSelectedProduct, onQuickAdd }: {
  products: Product[];
  setView: (v: View) => void;
  setSelectedProduct: (p: Product) => void;
  onQuickAdd: (p: Product) => void;
}) {
  const [activeId, setActiveId] = useState<string | null>(null);

  const published = products.filter((p) => p.published);
  // When a category is selected, show only that product; otherwise show all
  const displayed = activeId ? published.filter((p) => p.id === activeId) : published;

  return (
    <section className="bg-[#0e0e0e] min-h-screen">
      <div className="max-w-[1400px] mx-auto flex">
        {/* Sidebar */}
        <aside className="w-48 shrink-0 py-12 pr-4 border-r border-white/[0.06] sticky top-16 self-start h-[calc(100vh-4rem)] overflow-y-auto">
          <button
            onClick={() => setActiveId(null)}
            className={`w-full text-left font-['Inter'] text-[11px] tracking-widest uppercase py-1.5 px-3 mb-3 transition-colors ${
              activeId === null ? "text-[#c8b89a]" : "text-[#e8e4de]/35 hover:text-[#e8e4de]/70"
            }`}
          >
            ALL
          </button>
          <div className="h-px bg-white/[0.06] mb-3" />
          <nav className="flex flex-col gap-0.5">
            {CATEGORY_PRODUCTS.map((cat) => (
              <button
                key={cat.productId}
                onClick={() => setActiveId(cat.productId)}
                className={`text-left font-['Inter'] text-[11px] tracking-widest uppercase py-1.5 px-3 transition-colors ${
                  activeId === cat.productId
                    ? "text-[#c8b89a]"
                    : "text-[#e8e4de]/35 hover:text-[#e8e4de]/70"
                }`}
              >
                {cat.label}
              </button>
            ))}
          </nav>
        </aside>

        {/* Grid */}
        <div className="flex-1 px-10 py-12">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-12">
            {displayed.map((p) => (
              <HomeCatalogCard
                key={p.id}
                product={p}
                onSelect={() => { setSelectedProduct(p); setView("product"); }}
                onQuickAdd={() => onQuickAdd(p)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Product card styled like the reference image: clean product photo, name + price below
function HomeCatalogCard({ product, onSelect, onQuickAdd }: {
  product: Product; onSelect: () => void; onQuickAdd: () => void;
}) {
  const soldOut = product.stock === 0;
  return (
    <div
      className={`group ${soldOut ? "cursor-default" : "cursor-pointer"}`}
      onClick={soldOut ? undefined : onSelect}
    >
      {/* Image */}
      <div className="relative bg-[#141414] aspect-[4/5] overflow-hidden">
        <img
          src={product.images[0]}
          alt={product.name}
          className={`w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105 ${soldOut ? "opacity-40" : ""}`}
        />
        {false && product.isNew && !soldOut && (
          <span className="absolute top-3 left-3 bg-[#c8b89a] text-[#0e0e0e] text-[10px] font-['Inter'] font-semibold tracking-widest px-2 py-0.5 uppercase">
            New
          </span>
        )}
        {!soldOut && (
          <button
            onClick={(e) => { e.stopPropagation(); onQuickAdd(); }}
            className="absolute bottom-0 left-0 right-0 py-2.5 bg-black/80 font-['Inter'] text-[10px] tracking-widest uppercase text-[#e8e4de]/70 hover:text-[#e8e4de] hover:bg-black transition-colors translate-y-full group-hover:translate-y-0 duration-200"
          >
            Quick Add
          </button>
        )}
      </div>

      {/* Info */}
      <div className="mt-3 space-y-0.5 px-0.5">
        <p className="font-['Inter'] text-[11px] tracking-[0.12em] uppercase text-[#e8e4de] leading-snug">
          {product.name}
        </p>
        <p className="font-['Inter'] text-[11px] text-[#e8e4de]/50">
          £{product.price.toFixed(2)}
        </p>
      </div>
    </div>
  );
}

// ── Home View ─────────────────────────────────────────────────────────────────

function HomeView({ setView, setSelectedProduct, products, onQuickAdd }: {
  setView: (v: View) => void;
  setSelectedProduct: (p: Product) => void;
  products: Product[];
  onQuickAdd: (p: Product) => void;
}) {
  const marqueeText = "NEW DROP · SS 2026 · GOA GUATEMALA · LIMITED EDITION · SHOP NOW · NEW DROP · SS 2026 · GOA GUATEMALA · LIMITED EDITION · SHOP NOW · ";

  return (
    <div>
      {/* ── Hero — full screen video ── */}
      <section className="h-screen flex flex-col items-center justify-center relative overflow-hidden bg-[#0e0e0e]">
        {/* Video background */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          src="/videos/rough-draft.mp4"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/45" />

        {/* GOATED wordmark */}
        <h1
          className="relative z-10 text-white select-none leading-none text-center"
          style={{
            fontFamily: "'Canterbury', serif",
            fontSize: "clamp(64px, 14vw, 220px)",
            fontWeight: "normal",
            letterSpacing: "0.04em",
            textShadow: "0 2px 60px rgba(0,0,0,0.6)",
          }}
        >
          GUATEMALA
        </h1>

        {/* SS 2026 sub-label */}
        <p
          className="relative z-10 mt-4 select-none tracking-[0.45em] uppercase"
          style={{
            fontFamily: "'Inter', sans-serif",
            fontSize: "clamp(12px, 2vw, 22px)",
            color: "#c8b89a",
            letterSpacing: "0.45em",
          }}
        >
          SS 2026
        </p>
      </section>

      {/* ── Marquee / Ticker ── */}
      <div className="bg-[#c8b89a] overflow-hidden py-2.5 select-none">
        <div
          className="flex whitespace-nowrap"
          style={{
            animation: "marquee 28s linear infinite",
          }}
        >
          {/* Duplicate text so the scroll is seamless */}
          <span className="font-['Inter'] text-[11px] tracking-[0.25em] uppercase text-[#0e0e0e] font-semibold px-8">
            {marqueeText}{marqueeText}
          </span>
          <span className="font-['Inter'] text-[11px] tracking-[0.25em] uppercase text-[#0e0e0e] font-semibold px-8">
            {marqueeText}{marqueeText}
          </span>
        </div>
      </div>

      {/* ── Shop Layout — sidebar + product grid ── */}
      <ShopLayout
        products={products}
        setView={setView}
        setSelectedProduct={setSelectedProduct}
        onQuickAdd={onQuickAdd}
      />

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
              className="w-full h-full object-contain p-6 transition-opacity duration-300" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {product.images.map((img, i) => (
              <button key={i} onClick={() => setMainImg(i)}
                className={`aspect-[4/5] bg-[#1a1a1a] overflow-hidden border-2 transition-colors ${
                  mainImg === i ? "border-[#c8b89a]" : "border-transparent opacity-50 hover:opacity-80"
                }`}>
                <img src={img} alt={`View ${i + 1}`} className="w-full h-full object-contain p-2" />
              </button>
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

// ── Admin Login ───────────────────────────────────────────────────────────────

function AdminLogin({ onSuccess }: { onSuccess: (name: string) => void }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      const user = ALLOWED_USERS.find(
        (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      if (user) {
        onSuccess(user.name);
      } else {
        setError("Invalid email or password.");
      }
      setLoading(false);
    }, 400);
  };

  const inputCls =
    "w-full border border-white/10 bg-[#1a1a1a] px-4 py-3 font-['Inter'] text-sm text-[#e8e4de] focus:outline-none focus:border-[#c8b89a] transition-colors placeholder:text-[#e8e4de]/15";

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center px-4">
      <div className="w-full max-w-sm">
        <div className="mb-10 text-center">
          <p className="font-['Playfair_Display'] text-2xl font-medium text-[#e8e4de] tracking-widest mb-1">GOATED</p>
          <p className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/25">Admin Portal</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-3">
          <div>
            <label className="font-['Inter'] text-xs text-[#e8e4de]/30 block mb-1.5">Email</label>
            <input
              type="email" required autoFocus
              value={email} onChange={(e) => setEmail(e.target.value)}
              className={inputCls} placeholder="admin@goated.com"
            />
          </div>
          <div>
            <label className="font-['Inter'] text-xs text-[#e8e4de]/30 block mb-1.5">Password</label>
            <input
              type="password" required
              value={password} onChange={(e) => setPassword(e.target.value)}
              className={inputCls} placeholder="••••••••"
            />
          </div>
          {error && (
            <p className="font-['Inter'] text-xs text-red-400 pt-1">{error}</p>
          )}
          <button
            type="submit" disabled={loading}
            className="w-full mt-2 py-3.5 bg-[#e8e4de] text-[#0e0e0e] font-['Inter'] text-xs tracking-widest uppercase hover:bg-[#c8b89a] transition-colors disabled:opacity-40"
          >
            {loading ? "Signing in…" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
}

// ── Admin ─────────────────────────────────────────────────────────────────────

function AdminView({ products, setView, onStockChange, onAddProduct, onDeleteProduct, onTogglePublish, adminName, onLogout }: {
  products: Product[];
  setView: (v: View) => void;
  onStockChange: (id: string, stock: number) => void;
  onAddProduct: (p: Product) => void;
  onDeleteProduct: (id: string) => void;
  onTogglePublish: (id: string) => void;
  adminName: string;
  onLogout: () => void;
}) {
  const [adminTab, setAdminTab] = useState<"dashboard" | "products" | "orders" | "inventory">("dashboard");
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);

  // ── Add / Edit form state ──
  const blankForm = {
    name: "", price: "", description: "", material: "",
    sizes: "S, M, L, XL", colors: "Black:#0a0a0a",
    image: "", stock: "10", published: true,
  };
  const [form, setForm] = useState(blankForm);

  const openAddForm = () => { setForm(blankForm); setEditingProduct(null); setShowAddForm(true); };
  const openEditForm = (p: Product) => {
    setForm({
      name: p.name, price: String(p.price), description: p.description,
      material: p.material,
      sizes: p.sizes.join(", "),
      colors: p.colors.map((c) => `${c.name}:${c.hex}`).join(", "),
      image: p.images[0], stock: String(p.stock), published: p.published,
    });
    setEditingProduct(p);
    setShowAddForm(true);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedColors = form.colors.split(",").map((s) => {
      const [name, hex] = s.trim().split(":");
      return { name: name?.trim() || "Default", hex: hex?.trim() || "#000000" };
    }).filter((c) => c.name);
    const parsedSizes = form.sizes.split(",").map((s) => s.trim()).filter(Boolean);
    const img = form.image.trim() || "/images/GOA BABY TEE black png.png";
    const newProduct: Product = {
      id: editingProduct ? editingProduct.id : `p${Date.now()}`,
      name: form.name,
      price: parseFloat(form.price) || 0,
      collectionId: "essentials",
      description: form.description,
      material: form.material,
      colors: parsedColors.length ? parsedColors : [{ name: "Default", hex: "#0a0a0a" }],
      sizes: parsedSizes.length ? parsedSizes : ["S", "M", "L", "XL"],
      stock: parseInt(form.stock) || 0,
      images: [img, img, img],
      isNew: true,
      published: form.published,
    };
    onAddProduct(newProduct);
    setShowAddForm(false);
    setEditingProduct(null);
  };

  const mergedProducts = products;

  const adjustStock = (id: string, delta: number) => {
    const product = products.find((p) => p.id === id);
    if (!product) return;
    onStockChange(id, Math.max(0, product.stock + delta));
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
          <div className="absolute bottom-6 left-0 right-0 px-4 space-y-2">
            <div className="px-2 pb-2 border-b border-white/[0.06]">
              <p className="font-['Inter'] text-[10px] text-[#e8e4de]/25 tracking-wide">Signed in as</p>
              <p className="font-['Inter'] text-xs text-[#e8e4de]/50 mt-0.5 truncate">{adminName}</p>
            </div>
            <button onClick={() => setView("home")}
              className="w-full font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/20 hover:text-[#e8e4de]/50 transition-colors text-left px-2 py-1">
              ← Back to Site
            </button>
            <button onClick={onLogout}
              className="w-full font-['Inter'] text-xs tracking-widest uppercase text-red-400/40 hover:text-red-400/70 transition-colors text-left px-2 py-1">
              Sign Out
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
                <button onClick={openAddForm}
                  className="font-['Inter'] text-xs tracking-widest uppercase bg-[#e8e4de] text-[#0e0e0e] px-5 py-2.5 hover:bg-[#c8b89a] transition-colors flex items-center gap-2">
                  <Plus size={13} /> Add Product
                </button>
              </div>

              {/* Add / Edit form */}
              {showAddForm && (
                <div className="bg-[#161616] border border-white/[0.08] p-6 mb-6">
                  <div className="flex items-center justify-between mb-5">
                    <h2 className="font-['Inter'] text-xs tracking-widest uppercase text-[#e8e4de]/40">
                      {editingProduct ? "Edit Product" : "New Product"}
                    </h2>
                    <button onClick={() => setShowAddForm(false)} className="text-[#e8e4de]/20 hover:text-[#e8e4de]/60 transition-colors">
                      <X size={16} />
                    </button>
                  </div>
                  <form onSubmit={handleFormSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {[
                      { field: "name", label: "Product Name", required: true },
                      { field: "price", label: "Price ($)", required: true },
                      { field: "stock", label: "Initial Stock", required: true },
                      { field: "image", label: "Image URL or /images/filename.png", required: false },
                      { field: "sizes", label: 'Sizes (comma-separated, e.g. "S, M, L")', required: true },
                      { field: "colors", label: 'Colors (Name:hex, e.g. "Black:#0a0a0a, White:#f5f5f5")', required: true },
                    ].map(({ field, label, required }) => (
                      <div key={field} className={field === "image" || field === "sizes" || field === "colors" ? "md:col-span-2" : ""}>
                        <label className="font-['Inter'] text-xs text-[#e8e4de]/30 block mb-1.5">{label}</label>
                        <input
                          type="text" required={required}
                          value={form[field as keyof typeof form] as string}
                          onChange={(e) => setForm({ ...form, [field]: e.target.value })}
                          className="w-full border border-white/10 bg-[#1a1a1a] px-3 py-2.5 font-['Inter'] text-sm text-[#e8e4de] focus:outline-none focus:border-[#c8b89a] transition-colors"
                        />
                      </div>
                    ))}
                    <div className="md:col-span-2">
                      <label className="font-['Inter'] text-xs text-[#e8e4de]/30 block mb-1.5">Description</label>
                      <textarea
                        rows={2} required
                        value={form.description}
                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                        className="w-full border border-white/10 bg-[#1a1a1a] px-3 py-2.5 font-['Inter'] text-sm text-[#e8e4de] focus:outline-none focus:border-[#c8b89a] transition-colors resize-none"
                      />
                    </div>
                    <div className="md:col-span-2">
                      <label className="font-['Inter'] text-xs text-[#e8e4de]/30 block mb-1.5">Material</label>
                      <input
                        type="text"
                        value={form.material}
                        onChange={(e) => setForm({ ...form, material: e.target.value })}
                        className="w-full border border-white/10 bg-[#1a1a1a] px-3 py-2.5 font-['Inter'] text-sm text-[#e8e4de] focus:outline-none focus:border-[#c8b89a] transition-colors"
                      />
                    </div>
                    <div className="md:col-span-2 flex items-center gap-3">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input type="checkbox" checked={form.published}
                          onChange={(e) => setForm({ ...form, published: e.target.checked })}
                          className="w-4 h-4 accent-[#c8b89a]" />
                        <span className="font-['Inter'] text-xs text-[#e8e4de]/40 tracking-wide">Publish immediately</span>
                      </label>
                    </div>
                    <div className="md:col-span-2 flex gap-3 pt-2">
                      <button type="submit"
                        className="px-6 py-2.5 bg-[#e8e4de] text-[#0e0e0e] font-['Inter'] text-xs tracking-widest uppercase hover:bg-[#c8b89a] transition-colors">
                        {editingProduct ? "Save Changes" : "Add Product"}
                      </button>
                      <button type="button" onClick={() => setShowAddForm(false)}
                        className="px-6 py-2.5 border border-white/10 text-[#e8e4de]/40 font-['Inter'] text-xs tracking-widest uppercase hover:border-white/20 transition-colors">
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              )}

              <div className="bg-[#161616] border border-white/[0.06]">
                {mergedProducts.length === 0 && (
                  <div className="px-5 py-10 text-center">
                    <p className="font-['Inter'] text-sm text-[#e8e4de]/25">No products yet. Add one above.</p>
                  </div>
                )}
                {mergedProducts.map((p) => (
                  <div key={p.id} className="flex items-center gap-4 px-5 py-4 border-b border-white/[0.04] last:border-0">
                    <div className="w-14 h-16 bg-[#1a1a1a] shrink-0 overflow-hidden">
                      <img src={p.images[0]} alt={p.name} className="w-full h-full object-contain p-1" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-['Inter'] text-sm font-medium text-[#e8e4de]">{p.name}</p>
                      <p className="font-['Inter'] text-xs text-[#e8e4de]/25 mt-0.5">
                        {COLLECTIONS.find((c) => c.id === p.collectionId)?.name}
                      </p>
                    </div>
                    <StockBadge stock={p.stock} />
                    <p className="font-['Inter'] text-sm text-[#e8e4de] w-16 text-right shrink-0">{formatPrice(p.price)}</p>
                    <button onClick={() => onTogglePublish(p.id)}
                      className={`font-['Inter'] text-[10px] tracking-wide px-2.5 py-1 transition-colors w-16 text-center ${
                        p.published ? "bg-green-500/10 text-green-400" : "bg-white/5 text-[#e8e4de]/30"
                      }`}>
                      {p.published ? "Live" : "Hidden"}
                    </button>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <button onClick={() => openEditForm(p)} className="p-1.5 hover:bg-white/5 transition-colors text-[#e8e4de]/25 hover:text-[#e8e4de]/70">
                        <Edit2 size={13} />
                      </button>
                      <button onClick={() => onDeleteProduct(p.id)} className="p-1.5 hover:bg-red-500/10 transition-colors text-[#e8e4de]/25 hover:text-red-400">
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
    <footer className="border-t border-white/[0.06] py-6">
      <div className="max-w-[1400px] mx-auto px-8 flex items-center justify-center gap-6">
        <p className="font-['Inter'] text-xs text-[#e8e4de]/15">© 2026 GOATED. All rights reserved.</p>
        <a
          href="https://www.instagram.com/goa_ted.tm?utm_source=ig_web_button_share_sheet&igsh=ZDNlZDc0MzIxNw=="
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#e8e4de]/30 hover:text-[#e8e4de] transition-colors"
        >
          <Instagram size={16} />
        </a>
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

  // ── Auth ──
  const [adminUser, setAdminUser] = useState<string | null>(null);

  // ── Product state (fully managed) ──
  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);

  // Lifted stock map — single source of truth across storefront + admin
  const [stockMap, setStockMap] = useState<Record<string, number>>(
    () => Object.fromEntries(INITIAL_PRODUCTS.map((p) => [p.id, p.stock]))
  );

  // Enrich products with live stock
  const liveProducts = products.map((p) => ({ ...p, stock: stockMap[p.id] ?? p.stock }));

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

  // Add or update product
  const handleAddProduct = (p: Product) => {
    setProducts((prev) => {
      const idx = prev.findIndex((x) => x.id === p.id);
      if (idx >= 0) {
        const next = [...prev];
        next[idx] = p;
        return next;
      }
      return [...prev, p];
    });
    setStockMap((prev) => ({ ...prev, [p.id]: p.stock }));
  };

  const handleDeleteProduct = (id: string) => {
    setProducts((prev) => prev.filter((p) => p.id !== id));
    setStockMap((prev) => { const next = { ...prev }; delete next[id]; return next; });
  };

  const handleTogglePublish = (id: string) =>
    setProducts((prev) => prev.map((p) => p.id === id ? { ...p, published: !p.published } : p));

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);
  const isAdmin = view === "admin";

  // If trying to access admin but not authenticated, show login
  if (isAdmin && !adminUser) {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <AdminLogin onSuccess={(name) => setAdminUser(name)} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground" style={{ fontFamily: "Inter, sans-serif" }}>
      {!isAdmin && (
        <Nav setView={setViewAndScroll} cartCount={cartCount}
          searchOpen={searchOpen} setSearchOpen={setSearchOpen} />
      )}

      {view === "home" && (
        <HomeView setView={setViewAndScroll} setSelectedProduct={setSelectedProduct}
          products={liveProducts}
          onQuickAdd={(p) => setQuickAddProduct(p)} />
      )}
      {view === "shop" && (
        <ShopView setView={setViewAndScroll} setSelectedProduct={setSelectedProduct}
          products={liveProducts} onQuickAdd={(p) => setQuickAddProduct(p)} />
      )}
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
      {view === "admin" && adminUser && (
        <AdminView
          products={liveProducts}
          setView={setViewAndScroll}
          onStockChange={handleStockChange}
          onAddProduct={handleAddProduct}
          onDeleteProduct={handleDeleteProduct}
          onTogglePublish={handleTogglePublish}
          adminName={adminUser}
          onLogout={() => { setAdminUser(null); setViewAndScroll("home"); }}
        />
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
