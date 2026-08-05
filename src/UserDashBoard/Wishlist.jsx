import React, { useState, useMemo } from "react";
import { Search, Star, Heart, Grid3x3, List, X, ShoppingBag } from "lucide-react";
import TopBar from "./TopBar";

const INITIAL_WISHLIST = [
  { id: 1, name: "Michael Kors Bag", price: 350.00, priceFormatted: "$350.00", rating: "4.8", stock: true, img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&q=80", dateAdded: 4 },
  { id: 2, name: "Apple Watch Series 9", price: 399.00, priceFormatted: "$399.00", rating: "4.9", stock: true, img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=300&q=80", dateAdded: 3 },
  { id: 3, name: "Nike Air Max 270", price: 160.00, priceFormatted: "$160.00", rating: "4.7", stock: true, img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=300&q=80", dateAdded: 2 },
  { id: 4, name: "Ray-Ban Sunglasses", price: 155.00, priceFormatted: "$155.00", rating: "4.6", stock: true, img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80", dateAdded: 1 },
];

const RELATED_PRODUCTS = [
  { id: 101, name: "Minimalist Leather Backpack", price: "$120.00", img: "https://images.unsplash.com/photo-1600185365483-26d7a4cc7519?w=200&q=80" },
  { id: 102, name: "Dior Sauvage Parfum", price: "$140.00", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=200&q=80" },
  { id: 103, name: "Sony Wireless Headphones", price: "$299.00", img: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&q=80" },
  { id: 104, name: "Classic Tote Handbag", price: "$250.00", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=200&q=80" },
  { id: 105, name: "Casual Everyday Sneakers", price: "$95.00", img: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=200&q=80" },
  { id: 106, name: "Gold Chronograph Watch", price: "$210.00", img: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200&q=80" },
  { id: 107, name: "Fujifilm Instax Mini", price: "$79.99", img: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&q=80" },
];

export default function Wishlist() {
  const [wishlistItems, setWishlistItems] = useState(INITIAL_WISHLIST);
  const [cartCount, setCartCount] = useState(2);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("recently-added");
  const [viewMode, setViewMode] = useState("grid");
  const [likedRelated, setLikedRelated] = useState({});
  const [showAllModal, setShowAllModal] = useState(false);

  const handleRemoveFromWishlist = (id) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  const handleAddToCart = (item) => {
    setCartCount((prev) => prev + 1);
  };

  const toggleRelatedLike = (index) => {
    setLikedRelated((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const filteredAndSortedItems = useMemo(() => {
    let result = wishlistItems.filter((item) =>
      item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (sortBy === "price-low") {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === "price-high") {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === "recently-added") {
      result.sort((a, b) => b.dateAdded - a.dateAdded);
    }

    return result;
  }, [wishlistItems, searchQuery, sortBy]);

  return (
    <div className="flex-1 overflow-y-auto">
      <TopBar cartCount={cartCount} />

      <div className="px-6 pb-10 md:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <h1 className="text-xl font-bold text-slate-900">
            My Wishlist ({wishlistItems.length} Items)
          </h1>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search in wishlist..."
                className="rounded-full border border-slate-200 bg-white py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 focus:outline-none"
            >
              <option value="recently-added">Sort by: Recently Added</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>

            <div className="hidden items-center gap-1 rounded-full border border-slate-200 bg-white p-1 sm:flex">
              <button
                onClick={() => setViewMode("grid")}
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  viewMode === "grid" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <Grid3x3 size={14} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex h-7 w-7 items-center justify-center rounded-full transition-colors ${
                  viewMode === "list" ? "bg-violet-600 text-white" : "text-slate-400 hover:text-slate-600"
                }`}
              >
                <List size={14} />
              </button>
            </div>
          </div>
        </div>

        {filteredAndSortedItems.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-2xl bg-white py-16 shadow-sm">
            <Heart size={48} className="text-slate-300 mb-3" />
            <p className="text-base font-semibold text-slate-700">No items found</p>
            <p className="text-xs text-slate-400 mt-1">Try adjusting your search query.</p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4"
                : "flex flex-col gap-3"
            }
          >
            {filteredAndSortedItems.map((item) => (
              <div
                key={item.id}
                className={`rounded-2xl bg-white p-4 shadow-sm shadow-slate-100 transition-all ${
                  viewMode === "list" ? "flex items-center justify-between gap-4" : ""
                }`}
              >
                <div className={`relative ${viewMode === "list" ? "w-24 shrink-0" : ""}`}>
                  <img
                    src={item.img}
                    alt={item.name}
                    className={`w-full rounded-xl object-cover ${
                      viewMode === "list" ? "h-20" : "h-36"
                    }`}
                  />
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    title="Remove from wishlist"
                    className="absolute right-2 top-2 flex h-8 w-8 items-center justify-center rounded-full bg-white text-rose-500 shadow transition-transform hover:scale-105 cursor-pointer"
                  >
                    <Heart size={14} fill="currentColor" />
                  </button>
                </div>

                <div className={viewMode === "list" ? "flex-1" : "mt-3"}>
                  <p className="text-sm font-semibold text-slate-800">{item.name}</p>
                  <div className={`mt-1 flex items-center ${viewMode === "list" ? "gap-4" : "justify-between"}`}>
                    <span className="text-sm font-bold text-slate-900">{item.priceFormatted}</span>
                    <span className="flex items-center gap-1 text-xs text-amber-500">
                      <Star size={12} fill="currentColor" /> {item.rating}
                    </span>
                  </div>
                  {item.stock && (
                    <p className="mt-1 flex items-center gap-1 text-xs text-emerald-600">
                      <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> In Stock
                    </p>
                  )}
                </div>

                <div className={viewMode === "list" ? "shrink-0" : "mt-3"}>
                  <button
                    onClick={() => handleAddToCart(item)}
                    className={`rounded-lg bg-violet-600 font-semibold text-white hover:bg-violet-700 transition-colors cursor-pointer ${
                      viewMode === "list" ? "px-4 py-2 text-xs" : "w-full py-2 text-xs"
                    }`}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* You May Also Like Section */}
        <div className="mt-8 flex items-center justify-between">
          <h2 className="text-sm font-bold text-slate-900">You May Also Like</h2>
          <button 
            onClick={() => setShowAllModal(true)} 
            className="text-xs font-medium text-violet-600 hover:underline cursor-pointer"
          >
            View All
          </button>
        </div>
        <div className="mt-4 grid grid-cols-3 gap-4 sm:grid-cols-5">
          {RELATED_PRODUCTS.slice(0, 5).map((product, i) => {
            const isLiked = likedRelated[i];
            return (
              <div key={product.id} className="relative overflow-hidden rounded-xl bg-white shadow-sm p-2 flex flex-col justify-between">
                <div>
                  <div className="relative">
                    <img src={product.img} alt={product.name} className="h-28 w-full object-cover rounded-lg" />
                    <button
                      onClick={() => toggleRelatedLike(i)}
                      className={`absolute right-2 top-2 flex h-7 w-7 items-center justify-center rounded-full transition-colors cursor-pointer ${
                        isLiked ? "bg-white text-rose-500" : "bg-white/90 text-slate-400 hover:text-rose-500"
                      }`}
                    >
                      <Heart size={12} fill={isLiked ? "currentColor" : "none"} />
                    </button>
                  </div>
                  <p className="text-xs font-medium text-slate-800 mt-2 truncate">{product.name}</p>
                </div>
                <div className="mt-1 flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-900">{product.price}</span>
                  <button 
                    onClick={() => setCartCount(c => c + 1)}
                    className="p-1 rounded bg-violet-50 text-violet-600 hover:bg-violet-100 transition-colors cursor-pointer"
                    title="Add to bag"
                  >
                    <ShoppingBag size={12} />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* View All Recommended Products Modal */}
      {showAllModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-2xl w-full p-6 relative shadow-2xl space-y-4 max-h-[85vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowAllModal(false)} 
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <h3 className="text-base font-bold text-slate-900">Recommended For You</h3>
            <p className="text-xs text-slate-500">Explore the complete catalog of curated products tailored to your preferences.</p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 pt-2">
              {RELATED_PRODUCTS.map((product) => (
                <div key={product.id} className="border border-slate-100 rounded-2xl p-3 bg-slate-50/50 flex flex-col justify-between">
                  <div>
                    <img src={product.img} alt={product.name} className="h-32 w-full object-cover rounded-xl mb-2" />
                    <p className="text-xs font-semibold text-slate-800">{product.name}</p>
                  </div>
                  <div className="mt-3 flex items-center justify-between pt-2 border-t border-slate-100">
                    <span className="text-xs font-bold text-slate-900">{product.price}</span>
                    <button 
                      onClick={() => {
                        setCartCount(c => c + 1);
                      }}
                      className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowAllModal(false)}
              className="w-full bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs cursor-pointer transition-colors mt-4"
            >
              Close Window
            </button>
          </div>
        </div>
      )}
    </div>
  );
}