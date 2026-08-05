import React, { useState } from "react";
import { Bell, ShoppingCart, X } from "lucide-react";

export default function TopBar({ 
  cartCount = 0, 
  onCartClick = () => {},
  onNotificationClick = () => {}
}) {
  const [showNotificationsModal, setShowNotificationsModal] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: "Shipment Update", desc: "Your order is out for delivery today.", time: "10m ago", read: false },
    { id: 2, title: "VIP Tier Reward", desc: "You unlocked a special member reward discount.", time: "2h ago", read: false },
    { id: 3, title: "Price Drop Alert", desc: "An item in your wishlist is now on sale.", time: "1d ago", read: true }
  ]);

  const markAllRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <>
      <div className="flex items-center justify-end gap-4 px-6 py-5 md:px-8 bg-transparent">
        <div className="flex items-center gap-4">
          {/* Notifications Button */}
          <button
            onClick={() => setShowNotificationsModal(true)}
            aria-label="Notifications"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 hover:text-violet-600 shadow-sm shadow-slate-100 border border-slate-100 transition-colors cursor-pointer"
          >
            <Bell size={18} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-semibold text-white animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Cart / Bag Button */}
          <button
            onClick={onCartClick}
            aria-label="Cart"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-white text-slate-500 hover:text-violet-600 shadow-sm shadow-slate-100 border border-slate-100 transition-colors cursor-pointer"
          >
            <ShoppingCart size={18} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-violet-600 text-[10px] font-semibold text-white">
                {cartCount}
              </span>
            )}
          </button>

          {/* User Profile Avatar */}
          <img
            src="https://i.pravatar.cc/80?img=47"
            alt="Sarah Johnson"
            className="h-10 w-10 rounded-full object-cover ring-2 ring-white shadow-sm cursor-pointer hover:scale-105 transition-transform"
            title="Sarah Johnson (VIP Tier 2)"
          />
        </div>
      </div>

      {/* Notifications Modal Popup */}
      {showNotificationsModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setShowNotificationsModal(false)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-violet-600" />
                <h3 className="font-bold text-slate-900 text-base">Account Notifications</h3>
              </div>
              {unreadCount > 0 && (
                <button 
                  onClick={markAllRead}
                  className="text-xs text-violet-600 font-semibold hover:underline cursor-pointer"
                >
                  Mark all as read
                </button>
              )}
            </div>

            <div className="space-y-3 max-h-72 overflow-y-auto">
              {notifications.map((n) => (
                <div 
                  key={n.id} 
                  className={`p-3.5 rounded-2xl border transition-all ${n.read ? 'bg-slate-50/50 border-slate-100 text-slate-600' : 'bg-violet-50/40 border-violet-100 text-slate-900'}`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-bold">{n.title}</span>
                    <span className="text-[10px] text-slate-400">{n.time}</span>
                  </div>
                  <p className="text-xs leading-relaxed">{n.desc}</p>
                </div>
              ))}
            </div>

            <button 
              onClick={() => setShowNotificationsModal(false)}
              className="w-full bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer mt-2"
            >
              Done
            </button>
          </div>
        </div>
      )}
    </>
  );
}