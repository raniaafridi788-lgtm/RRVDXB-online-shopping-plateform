import React, { useState } from "react";
import { Search, ChevronLeft, ChevronRight, X, Truck, CheckCircle2, Eye, Download } from "lucide-react";

const TABS = ["All", "Delivered", "Shipping", "Processing", "Cancelled", "Returned"];

const INITIAL_ORDERS = [
  // --- Page 1 ---
  { id: "#RRVDXB1256", date: "May 16, 2024", product: "Casual Canvas Sneakers", amount: "Rs. 3,500.00", status: "Delivered", statusColor: "bg-emerald-100 text-emerald-600", img: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=100&q=80", trackingCode: "TRK-984210", courier: "FedEx Express" },
  { id: "#RRVDXB1255", date: "May 15, 2024", product: "Basic Smart Fitness Band", amount: "Rs. 4,500.00", status: "Shipping", statusColor: "bg-blue-100 text-blue-600", img: "https://images.unsplash.com/photo-1579586337278-3befd40fd17a?w=100&q=80", trackingCode: "TRK-983102", courier: "DHL Priority" },
  { id: "#RRVDXB1254", date: "May 14, 2024", product: "Minimalist Sling Bag", amount: "Rs. 2,800.00", status: "Delivered", statusColor: "bg-emerald-100 text-emerald-600", img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&q=80", trackingCode: "TRK-981044", courier: "UPS Ground" },
  { id: "#RRVDXB1253", date: "May 12, 2024", product: "Classic UV Sun Shades", amount: "Rs. 1,500.00", status: "Processing", statusColor: "bg-amber-100 text-amber-600", img: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&q=80", trackingCode: "TRK-979822", courier: "USPS Priority" },
  // --- Page 2 ---
  { id: "#RRVDXB1252", date: "May 10, 2024", product: "Pocket Body Mist", amount: "Rs. 1,200.00", status: "Cancelled", statusColor: "bg-rose-100 text-rose-500", img: "https://images.unsplash.com/photo-1541643600914-78b084683601?w=100&q=80", trackingCode: "N/A", courier: "N/A" },
  { id: "#RRVDXB1251", date: "May 08, 2024", product: "Wired Bass Earphones", amount: "Rs. 1,900.00", status: "Returned", statusColor: "bg-purple-100 text-purple-600", img: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=100&q=80", trackingCode: "TRK-975510", courier: "FedEx Express" },
  { id: "#RRVDXB1250", date: "May 07, 2024", product: "RGB Membrane Keyboard", amount: "Rs. 3,200.00", status: "Delivered", statusColor: "bg-emerald-100 text-emerald-600", img: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=100&q=80", trackingCode: "TRK-972100", courier: "UPS Ground" },
  { id: "#RRVDXB1249", date: "May 05, 2024", product: "Anti-Slip Yoga Mat", amount: "Rs. 1,800.00", status: "Delivered", statusColor: "bg-emerald-100 text-emerald-600", img: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=100&q=80", trackingCode: "TRK-970112", courier: "USPS Priority" },
  // --- Page 3 ---
  { id: "#RRVDXB1248", date: "Apr 29, 2024", product: "Mini Food Chopper", amount: "Rs. 2,500.00", status: "Shipping", statusColor: "bg-blue-100 text-blue-600", img: "https://images.unsplash.com/photo-1556911220-e15b29be8c8f?w=100&q=80", trackingCode: "TRK-968501", courier: "FedEx Express" },
  { id: "#RRVDXB1247", date: "Apr 25, 2024", product: "Steel Water Tumbler", amount: "Rs. 1,400.00", status: "Delivered", statusColor: "bg-emerald-100 text-emerald-600", img: "https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=100&q=80", trackingCode: "TRK-965412", courier: "USPS Priority" },
  // --- Page 4 ---
  { id: "#RRVDXB1246", date: "Apr 20, 2024", product: "Pocket Notebook Set", amount: "Rs. 850.00", status: "Delivered", statusColor: "bg-emerald-100 text-emerald-600", img: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=100&q=80", trackingCode: "TRK-961023", courier: "DHL Priority" },
  // --- Page 5 ---
  { id: "#RRVDXB1245", date: "Apr 15, 2024", product: "Compact Mini Power Bank", amount: "Rs. 2,200.00", status: "Delivered", statusColor: "bg-emerald-100 text-emerald-600", img: "https://images.unsplash.com/photo-1609592424097-d5d36e2f1837?w=100&q=80", trackingCode: "TRK-959821", courier: "UPS Ground" }
];

const ITEMS_PER_PAGE = 4;

export default function OrderHistory() {
  const [tab, setTab] = useState("All");
  const [page, setPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("All Orders");
  
  // Interactive Modal States
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalType, setModalType] = useState(null); // 'details' or 'track'
  const [notification, setNotification] = useState("");

  const triggerNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(""), 3500);
  };

  // 1. Filter Orders based on Tab and Search
  const filteredOrders = INITIAL_ORDERS.filter((order) => {
    const matchesTab = tab === "All" || order.status === tab;
    const matchesSearch = 
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
      order.product.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTab && matchesSearch;
  });

  // 2. Pagination Calculations
  const totalPages = Math.ceil(filteredOrders.length / ITEMS_PER_PAGE) || 1;
  const startIndex = (page - 1) * ITEMS_PER_PAGE;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="flex-1 overflow-y-auto relative bg-slate-50/30">
      
      {/* Floating Notification Toast */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-900 text-white px-5 py-3 rounded-2xl shadow-2xl flex items-center gap-3 border border-slate-800 text-xs font-semibold animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
          <span>{notification}</span>
        </div>
      )}

      <div className="px-6 py-6 md:px-8">
        <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-xl font-bold text-slate-900">Order History</h1>
            <p className="text-xs text-slate-400 mt-0.5">Manage and track all customer orders and invoices</p>
          </div>
          
          <div className="flex flex-1 items-center gap-3 sm:justify-end">
            {/* Functional Search Bar */}
            <div className="relative flex-1 max-w-xs">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setPage(1); // Reset to page 1 on search
                }}
                placeholder="Search by order ID or product..."
                className="w-full rounded-full border border-slate-200 bg-white py-2 pl-9 pr-8 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500 shadow-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setPage(1); }}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-slate-600 font-bold"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Functional Date Filter Dropdown */}
            <select 
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="rounded-full border border-slate-200 bg-white px-4 py-2 text-sm text-slate-600 focus:outline-none shadow-sm cursor-pointer"
            >
              <option>All Orders</option>
              <option>This Month</option>
              <option>This Year</option>
            </select>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-5 flex flex-wrap gap-2">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => { setTab(t); setPage(1); }}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-colors cursor-pointer ${
                tab === t
                  ? "bg-violet-600 text-white shadow-sm"
                  : "bg-white text-slate-500 hover:bg-slate-100 border border-slate-100"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Table */}
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm shadow-slate-100 border border-slate-100">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 text-xs uppercase tracking-wide text-slate-400 bg-slate-50/50">
                <th className="px-5 py-4 font-medium">Order ID</th>
                <th className="px-5 py-4 font-medium">Date</th>
                <th className="px-5 py-4 font-medium">Products</th>
                <th className="px-5 py-4 font-medium">Amount</th>
                <th className="px-5 py-4 font-medium">Status</th>
                <th className="px-5 py-4 font-medium">Action</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center py-12 text-slate-400 text-xs">
                    No orders found matching your criteria.
                  </td>
                </tr>
              ) : (
                paginatedOrders.map((o) => (
                  <tr key={o.id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/40 transition-colors">
                    <td className="px-5 py-4 font-semibold text-slate-800">{o.id}</td>
                    <td className="px-5 py-4 text-slate-500 text-xs">{o.date}</td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={o.img} alt={o.product} className="h-9 w-9 rounded-lg object-cover bg-slate-100 shrink-0" />
                        <span className="text-slate-700 font-medium text-xs">{o.product}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-slate-700 font-semibold text-xs">{o.amount}</td>
                    <td className="px-5 py-4">
                      <span className={`rounded-full px-3 py-1 text-xs font-medium ${o.statusColor}`}>
                        {o.status}
                      </span>
                    </td>
                    <td className="px-5 py-4">
                      <button 
                        onClick={() => {
                          setSelectedOrder(o);
                          setModalType(o.status === "Shipping" || o.status === "Delivered" ? "track" : "details");
                        }}
                        className="text-xs font-semibold text-violet-600 hover:underline cursor-pointer flex items-center gap-1"
                      >
                        {o.status === "Shipping" ? <><Truck size={13} /> Track Order</> : <><Eye size={13} /> View Details</>}
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Fully Functional Pagination Component */}
        {totalPages > 1 && (
          <div className="mt-6 flex items-center justify-center gap-1.5">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page === 1}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                page === 1 ? "text-slate-200 cursor-not-allowed" : "text-slate-400 hover:bg-white border border-transparent hover:border-slate-200 cursor-pointer"
              }`}
            >
              <ChevronLeft size={16} />
            </button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button
                key={n}
                onClick={() => setPage(n)}
                className={`flex h-8 w-8 items-center justify-center rounded-full text-sm font-medium transition-all cursor-pointer ${
                  page === n ? "bg-violet-600 text-white shadow-sm" : "text-slate-500 hover:bg-white border border-transparent hover:border-slate-200"
                }`}
              >
                {n}
              </button>
            ))}

            <button
              onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
              disabled={page === totalPages}
              className={`flex h-8 w-8 items-center justify-center rounded-full transition-all ${
                page === totalPages ? "text-slate-200 cursor-not-allowed" : "text-slate-400 hover:bg-white border border-transparent hover:border-slate-200 cursor-pointer"
              }`}
            >
              <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      {/* --- INTERACTIVE MODAL POPUP (TRACK / DETAILS) --- */}
      {selectedOrder && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4 animate-in fade-in zoom-in duration-200">
            <button 
              onClick={() => setSelectedOrder(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-3 pb-3 border-b border-slate-100">
              <img src={selectedOrder.img} alt={selectedOrder.product} className="w-12 h-12 rounded-xl object-cover bg-slate-100 shrink-0" />
              <div>
                <h3 className="font-bold text-slate-900 text-sm">{selectedOrder.product}</h3>
                <p className="text-xs text-slate-400">Order ID: <span className="font-semibold text-slate-700">{selectedOrder.id}</span></p>
              </div>
            </div>

            {modalType === 'track' ? (
              <div className="space-y-3 text-xs">
                <div className="p-3.5 bg-blue-50/60 border border-blue-100 rounded-2xl space-y-1">
                  <p className="font-bold text-blue-900 flex items-center gap-1.5"><Truck size={14} /> Live Courier Status</p>
                  <p className="text-blue-700">Carrier: <strong>{selectedOrder.courier}</strong></p>
                  <p className="text-blue-600 font-mono text-[11px]">Tracking: {selectedOrder.trackingCode}</p>
                </div>
                <div className="space-y-2 pt-2">
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                    <span>Package picked up by courier facility</span>
                  </div>
                  <div className="flex items-center gap-2 text-slate-700">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    <span>In transit to local distribution center</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-3 text-xs text-slate-600">
                <div className="grid grid-cols-2 gap-2 bg-slate-50 p-3 rounded-xl border border-slate-100">
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Order Date</p>
                    <p className="font-bold text-slate-800">{selectedOrder.date}</p>
                  </div>
                  <div>
                    <p className="text-[10px] text-slate-400 uppercase font-semibold">Total Amount</p>
                    <p className="font-bold text-slate-800">{selectedOrder.amount}</p>
                  </div>
                </div>
                <p className="leading-relaxed">
                  This transaction is fully protected under the RRVDXB Buyer Protection Policy. Invoices and receipts can be downloaded instantly.
                </p>
              </div>
            )}

            <div className="flex items-center gap-2 pt-2">
              <button 
                onClick={() => {
                  triggerNotification(`Invoice for ${selectedOrder.id} downloaded successfully!`);
                  setSelectedOrder(null);
                }}
                className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer flex items-center justify-center gap-1.5 shadow-sm"
              >
                <Download size={13} /> Download Invoice
              </button>
              <button 
                onClick={() => setSelectedOrder(null)}
                className="px-4 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold py-2.5 rounded-xl text-xs transition-colors cursor-pointer"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}