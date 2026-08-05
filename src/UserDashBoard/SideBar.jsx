import React from "react";
import {
  ShoppingBag,
  Home,
  ClipboardList,
  Truck,
  Heart,
  User,
  LogOut,
} from "lucide-react";

const NAV_ITEMS = [
  { key: "home", label: "Home", icon: Home },
  { key: "orders", label: "Order History", icon: ClipboardList },
  { key: "track", label: "Track Order", icon: Truck },
  { key: "wishlist", label: "Wishlist", icon: Heart },
  { key: "profile", label: "Profile", icon: User },
];

export default function Sidebar({ active, onNavigate }) {
  return (
    <aside className="hidden md:flex md:w-64 shrink-0 flex-col justify-between bg-white border-r border-slate-100 px-5 py-6">
      <div>
        {/* Logo */}
        <div className="flex items-center gap-3 px-2 mb-10">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-600 text-white">
            <ShoppingBag size={20} />
          </div>
          <div>
            <p className="text-sm font-bold tracking-wide text-slate-900">
              RRVDXB
            </p>
            <p className="text-[11px] text-slate-400">E-Commerce Platform</p>
          </div>
        </div>

        {/* Nav */}
        <nav className="space-y-1">
          {NAV_ITEMS.map(({ key, label, icon: Icon }) => {
            const isActive = active === key;
            return (
              <button
                key={key}
                onClick={() => onNavigate?.(key)}
                className={`flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-colors ${
                  isActive
                    ? "bg-violet-600 text-white shadow-sm shadow-violet-200"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-700"
                }`}
              >
                <Icon size={18} />
                <span className="font-medium">{label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <div className="space-y-4">
        <button className="flex items-center gap-3 px-4 py-2.5 text-sm font-medium text-slate-400 hover:text-slate-600">
          <LogOut size={18} />
          Logout
        </button>

        <div className="rounded-2xl bg-gradient-to-br from-violet-600 to-purple-600 p-5 text-white">
          <p className="text-sm font-semibold">Exclusive Member</p>
          <p className="mt-1 text-xs text-violet-100">
            Get special offers and rewards
          </p>
          <button className="mt-4 w-full rounded-lg bg-white py-2 text-xs font-semibold text-violet-700 hover:bg-violet-50">
            Explore Benefits
          </button>
        </div>
      </div>
    </aside>
  );
}