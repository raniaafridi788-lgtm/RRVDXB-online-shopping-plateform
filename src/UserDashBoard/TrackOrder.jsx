import React, { useState } from "react";
import { Package, PackageCheck, Truck, Home as HomeIcon, MapPin, MessageSquare, Send, X, RefreshCw, CheckCircle2 } from "lucide-react";

const INITIAL_STEPS = [
  { label: "Order Placed", date: "May 16", icon: Package, done: true },
  { label: "Packed", date: "May 16", icon: PackageCheck, done: true },
  { label: "Shipped", date: "May 17", icon: Truck, done: true },
  { label: "Out for Delivery", date: "May 20", icon: MapPin, done: false },
  { label: "Delivered", date: "May 20", icon: HomeIcon, done: false },
];

export default function TrackOrder() {
  const [steps, setSteps] = useState(INITIAL_STEPS);
  const [locationText, setLocationText] = useState("In Transit near TCS Express Logistics Hub");
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showAllUpdates, setShowAllUpdates] = useState(false);
  const [chatMessage, setChatMessage] = useState("");
  const [toast, setToast] = useState("");

  const [chatLog, setChatLog] = useState([
    { sender: "support", text: "Hello! How can we assist with order #RRVDXB1256 today?", time: "10:32 AM" }
  ]);

  const showNotification = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(""), 3000);
  };

  const handleRefreshLocation = () => {
    setIsRefreshing(true);
    showNotification("Connecting to TCS live GPS feed...");
    setTimeout(() => {
      setLocationText("Out for local delivery in Islamabad, Pakistan");
      setIsRefreshing(false);
      showNotification("Live location successfully updated!");
    }, 1200);
  };

  const toggleStepDone = (index) => {
    setSteps(prev => prev.map((s, i) => i === index ? { ...s, done: !s.done } : s));
    showNotification("Milestone status updated!");
  };

  const handleSimulateComplete = () => {
    setSteps(prev => prev.map(s => ({ ...s, done: true })));
    showNotification("Simulated: Order fully delivered successfully!");
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    if (!chatMessage.trim()) return;
    const msg = chatMessage;
    setChatLog(prev => [...prev, { sender: "user", text: msg, time: "Just now" }]);
    setChatMessage("");
    setTimeout(() => {
      setChatLog(prev => [...prev, { sender: "support", text: "Thanks! Our logistics agent has received your query.", time: "Just now" }]);
    }, 1000);
  };

  return (
    <div className="flex-1 overflow-y-auto bg-slate-50/30 relative">
      
      {/* TOAST ALERT */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-4 py-2.5 rounded-xl shadow-2xl flex items-center gap-2.5 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{toast}</span>
        </div>
      )}

      <div className="px-6 py-6 md:px-8 max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-slate-900">Track Order</h1>
            <button 
              type="button"
              onClick={handleSimulateComplete}
              className="text-[11px] bg-emerald-100 hover:bg-emerald-200 text-emerald-700 px-2.5 py-1 rounded-full font-semibold transition-colors cursor-pointer flex items-center gap-1"
            >
              <RefreshCw size={11} /> Simulate Delivery
            </button>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-100 border border-slate-100">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <div className="flex items-center gap-3">
                <h2 className="text-base font-bold text-slate-900">Order #RRVDXB1256</h2>
                <span className="rounded-full bg-emerald-100 px-3 py-1 text-xs font-medium text-emerald-600">
                  In Transit
                </span>
              </div>
              <p className="mt-1 text-xs text-slate-400">May 16, 2024</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-slate-400">Expected Delivery</p>
              <p className="text-sm font-semibold text-slate-800">20 May, 2024</p>
            </div>
          </div>

          <div className="mt-5 flex items-center gap-4 border-t border-slate-50 pt-5">
            <img
              src="https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=120&q=80"
              alt="Nike Air Max 270"
              className="h-16 w-16 rounded-xl object-cover bg-slate-100"
            />
            <div className="flex-1">
              <p className="text-sm font-semibold text-slate-800">Nike Air Max 270</p>
              <p className="text-xs text-slate-400">Black / White</p>
              <p className="text-xs text-slate-400">Size: 9 | Qty: 1</p>
            </div>
            <button 
              type="button"
              onClick={() => setShowHelpModal(true)}
              className="rounded-lg bg-violet-50 hover:bg-violet-100 px-4 py-2 text-xs font-semibold text-violet-600 cursor-pointer transition-colors"
            >
              Need Help?
            </button>
          </div>

          {/* Interactive Progress */}
          <div className="mt-8">
            <p className="text-[11px] font-semibold text-slate-400 mb-3 uppercase tracking-wider">Click any step icon to toggle status:</p>
            <div className="flex items-start justify-between px-2 overflow-x-auto pb-2">
              {steps.map((s, i) => {
                const Icon = s.icon;
                return (
                  <React.Fragment key={s.label}>
                    <div className="flex flex-col items-center gap-2 text-center shrink-0">
                      <button
                        type="button"
                        onClick={() => toggleStepDone(i)}
                        title="Click to toggle status"
                        className={`flex h-10 w-10 items-center justify-center rounded-full transition-transform hover:scale-110 cursor-pointer shadow-sm ${
                          s.done ? "bg-violet-600 text-white" : "bg-slate-100 text-slate-300"
                        }`}
                      >
                        <Icon size={16} />
                      </button>
                      <p className={`text-xs font-medium max-w-[80px] ${s.done ? "text-slate-700 font-semibold" : "text-slate-400"}`}>
                        {s.label}
                      </p>
                      <p className="text-[10px] text-slate-400">{s.date}</p>
                    </div>
                    {i < steps.length - 1 && (
                      <div className={`mt-5 h-0.5 w-12 sm:flex-1 ${s.done ? "bg-violet-600" : "bg-slate-100"}`} />
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-2">
          <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-100 border border-slate-100">
            <h3 className="mb-3 text-sm font-bold text-slate-900">Shipping Details</h3>
            <dl className="space-y-3 text-sm">
              <div className="flex justify-between pb-2 border-b border-slate-50">
                <dt className="text-slate-400 text-xs">Courier</dt>
                <dd className="font-medium text-slate-700 text-xs">TCS Express</dd>
              </div>
              <div className="flex justify-between pb-2 border-b border-slate-50">
                <dt className="text-slate-400 text-xs">Tracking Number</dt>
                <dd className="font-mono text-violet-600 text-xs bg-violet-50 px-2 py-0.5 rounded">TCS1234567890</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-slate-400 text-xs">Shipping Address</dt>
                <dd className="text-right font-medium text-slate-700 text-xs">
                  House 42, Street 12, Sector F-7/2,<br />Islamabad, Pakistan
                </dd>
              </div>
            </dl>
          </div>

          {/* Live Tracking Map Box */}
          <div className="rounded-2xl bg-white p-5 shadow-sm shadow-slate-100 border border-slate-100 flex flex-col">
            <h3 className="mb-3 text-sm font-bold text-slate-900">Live Tracking</h3>
            <div className="flex-1 min-h-[140px] flex flex-col items-center justify-center rounded-xl bg-slate-900 text-center p-4 relative overflow-hidden">
              <div className="relative z-10 space-y-1.5">
                <p className="text-xs font-semibold text-white">
                  {isRefreshing ? "Fetching GPS coordinates..." : locationText}
                </p>
                <button 
                  type="button"
                  onClick={handleRefreshLocation}
                  disabled={isRefreshing}
                  className="mt-2 bg-violet-600 hover:bg-violet-700 text-white px-3.5 py-1.5 rounded-lg text-[11px] font-semibold cursor-pointer disabled:opacity-50 transition-colors shadow-sm"
                >
                  {isRefreshing ? "Refreshing..." : "Refresh Location"}
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-5 shadow-sm shadow-slate-100 border border-slate-100">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Order Updates</h3>
            <button 
              type="button"
              onClick={() => setShowAllUpdates(!showAllUpdates)} 
              className="text-xs font-medium text-violet-600 hover:underline cursor-pointer"
            >
              {showAllUpdates ? "Show Less" : "View All"}
            </button>
          </div>
          <div className="space-y-3 text-sm">
            <div className="flex items-start gap-3">
              <span className="mt-1 h-2 w-2 rounded-full bg-emerald-500 shrink-0" />
              <div>
                <p className="text-slate-700 text-xs font-medium">Your order has been shipped via TCS Express.</p>
                <p className="text-[10px] text-slate-400">May 17, 2024 - 10:30 AM</p>
              </div>
            </div>
            {showAllUpdates && (
              <div className="space-y-3 pt-2 border-t border-slate-50 animate-in fade-in duration-200">
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-violet-500 shrink-0" />
                  <div>
                    <p className="text-slate-700 text-xs font-medium">Package securely packed and labeled.</p>
                    <p className="text-[10px] text-slate-400">May 16, 2024 - 04:15 PM</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <span className="mt-1 h-2 w-2 rounded-full bg-violet-500 shrink-0" />
                  <div>
                    <p className="text-slate-700 text-xs font-medium">Order successfully placed.</p>
                    <p className="text-[10px] text-slate-400">May 16, 2024 - 11:00 AM</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* HELP / SUPPORT MODAL */}
      {showHelpModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl flex flex-col h-[460px] animate-in fade-in zoom-in duration-200">
            <button 
              type="button" 
              onClick={() => setShowHelpModal(false)} 
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="font-bold text-sm pb-3 border-b border-slate-100 flex items-center gap-2">
              <MessageSquare size={16} className="text-violet-600" /> Live Support Chat
            </h3>
            <div className="flex-1 overflow-y-auto py-3 space-y-3 pr-2">
              {chatLog.map((c, i) => (
                <div key={i} className={`flex flex-col ${c.sender === 'user' ? 'items-end' : 'items-start'}`}>
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-xs ${c.sender === 'user' ? 'bg-violet-600 text-white rounded-br-none' : 'bg-slate-100 text-slate-800 rounded-bl-none'}`}>
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
                placeholder="Ask support about your delivery..."
                className="flex-1 rounded-xl border border-slate-200 px-3 py-2 text-xs focus:outline-none focus:ring-2 focus:ring-violet-500"
              />
              <button type="submit" className="bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-xl cursor-pointer transition-colors">
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}