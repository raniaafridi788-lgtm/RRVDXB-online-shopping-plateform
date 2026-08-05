import React, { useState } from "react";
import { ClipboardList, Heart, Wallet, Award, Gift, X, Check, Plus, Trash2, ShieldCheck, Settings as SettingsIcon } from "lucide-react";

const TABS = ["Personal Info", "Addresses", "Payment Methods", "Security", "Settings"];

const INITIAL_ACTIVITY = [
  { text: "Your order #RRVDXB1256 has been shipped.", date: "May 17, 2024", color: "bg-violet-500" },
  { text: "You added Apple Watch Series 9 to wishlist.", date: "May 16, 2024", color: "bg-emerald-500" },
  { text: "You updated your shipping address.", date: "May 15, 2024", color: "bg-emerald-500" },
];

export default function Profile() {
  const [activeTab, setActiveTab] = useState("Personal Info");
  const [isEditing, setIsEditing] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  const [showAddressModal, setShowAddressModal] = useState(false);
  const [showCardModal, setShowCardModal] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  // Personal Info Form State
  const [formData, setFormData] = useState({
    fullName: "Sarah Johnson",
    email: "sarah.johnson@email.com",
    phone: "+1 (555) 123-4567",
    dob: "12 May, 1995",
    gender: "Female",
  });

  // Security State
  const [securityData, setSecurityData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    twoFactor: true,
  });

  // Settings State
  const [settingsData, setSettingsData] = useState({
    promoEmails: true,
    smsNotifications: true,
    profileVisibility: "Public",
    darkMode: false,
  });

  // Dynamic Lists State
  const [addresses, setAddresses] = useState([
    { id: 1, name: "Sarah Johnson", street: "123 Maple Street, Apt 4B", city: "New York, NY 10001", isDefault: true },
  ]);

  const [cards, setCards] = useState([
    { id: 1, type: "Visa", last4: "4242", expiry: "09/26" },
  ]);

  const [newAddress, setNewAddress] = useState({ street: "", city: "" });
  const [newCard, setNewCard] = useState({ number: "", expiry: "" });

  const showToast = (msg) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(""), 3000);
  };

  const handleSaveProfile = () => {
    setIsEditing(false);
    showToast("Personal information updated successfully!");
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    if (!securityData.currentPassword || !securityData.newPassword) {
      showToast("Please fill in all password fields.");
      return;
    }
    if (securityData.newPassword !== securityData.confirmPassword) {
      showToast("New passwords do not match!");
      return;
    }
    showToast("Password updated successfully!");
    setSecurityData({ currentPassword: "", newPassword: "", confirmPassword: "", twoFactor: securityData.twoFactor });
  };

  const handleAddAddress = (e) => {
    e.preventDefault();
    if (!newAddress.street || !newAddress.city) return;
    setAddresses([...addresses, { id: Date.now(), name: formData.fullName, ...newAddress, isDefault: addresses.length === 0 }]);
    setNewAddress({ street: "", city: "" });
    setShowAddressModal(false);
    showToast("Address added successfully!");
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    if (!newCard.number) return;
    const last4 = newCard.number.slice(-4) || "1234";
    setCards([...cards, { id: Date.now(), type: "Mastercard", last4, expiry: newCard.expiry || "12/28" }]);
    setNewCard({ number: "", expiry: "" });
    setShowCardModal(false);
    showToast("Payment method added successfully!");
  };

  return (
    <div className="flex-1 overflow-y-auto relative">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-xl bg-slate-900 px-4 py-3 text-xs font-semibold text-white shadow-lg animate-in fade-in slide-in-from-bottom-5">
          <Check size={14} className="text-emerald-400" />
          {toastMessage}
        </div>
      )}

      <div className="px-6 py-6 md:px-8">
        <h1 className="mb-6 text-xl font-bold text-slate-900">My Profile</h1>

        {/* Header card */}
        <div className="flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-sm shadow-slate-100 sm:flex-row sm:items-center">
          <img
            src="https://i.pravatar.cc/120?img=47"
            alt={formData.fullName}
            className="h-16 w-16 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center gap-2">
              <h2 className="text-base font-bold text-slate-900">{formData.fullName}</h2>
              <span className="rounded-full bg-violet-100 px-3 py-0.5 text-xs font-medium text-violet-600">
                Premium Member
              </span>
            </div>
            <p className="text-xs text-slate-400">Member since Jan 2024</p>
          </div>
          <button
            onClick={() => {
              if (activeTab !== "Personal Info") setActiveTab("Personal Info");
              if (isEditing) {
                handleSaveProfile();
              } else {
                setIsEditing(true);
              }
            }}
            className={`rounded-lg px-5 py-2 text-sm font-semibold transition-colors cursor-pointer ${
              isEditing ? "bg-emerald-600 text-white hover:bg-emerald-700" : "bg-violet-600 text-white hover:bg-violet-700"
            }`}
          >
            {isEditing ? "Save Changes" : "Edit Profile"}
          </button>
        </div>

        {/* Tabs */}
        <div className="mt-6 flex gap-2 overflow-x-auto border-b border-slate-100 pb-px">
          {TABS.map((t) => (
            <button
              key={t}
              onClick={() => setActiveTab(t)}
              className={`whitespace-nowrap border-b-2 px-3 py-2.5 text-sm font-medium transition-colors cursor-pointer ${
                activeTab === t
                  ? "border-violet-600 text-violet-600"
                  : "border-transparent text-slate-400 hover:text-slate-600"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Main Content Area based on Tab */}
          <div className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-100 lg:col-span-2">
            
            {/* PERSONAL INFO TAB */}
            {activeTab === "Personal Info" && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-bold text-slate-900">Personal Information</h3>
                  {isEditing && (
                    <button 
                      onClick={handleSaveProfile}
                      className="text-xs font-semibold bg-emerald-600 text-white px-3 py-1.5 rounded-lg hover:bg-emerald-700 transition-colors cursor-pointer"
                    >
                      Save Info
                    </button>
                  )}
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <Field label="Full Name" value={formData.fullName} disabled={!isEditing} onChange={(e) => setFormData({...formData, fullName: e.target.value})} />
                  <Field label="Email Address" value={formData.email} disabled={!isEditing} onChange={(e) => setFormData({...formData, email: e.target.value})} />
                  <Field label="Phone Number" value={formData.phone} disabled={!isEditing} onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                  <Field label="Date of Birth" value={formData.dob} disabled={!isEditing} onChange={(e) => setFormData({...formData, dob: e.target.value})} />
                  <div className="sm:col-span-2">
                    <label className="mb-1 block text-xs font-medium text-slate-500">Gender</label>
                    <select 
                      disabled={!isEditing}
                      value={formData.gender}
                      onChange={(e) => setFormData({...formData, gender: e.target.value})}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-slate-50"
                    >
                      <option>Female</option>
                      <option>Male</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {/* ADDRESSES TAB */}
            {activeTab === "Addresses" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Saved Addresses</h3>
                  <button onClick={() => setShowAddressModal(true)} className="text-xs font-semibold text-violet-600 hover:underline cursor-pointer flex items-center gap-1">
                    <Plus size={14} /> Add New Address
                  </button>
                </div>
                {addresses.map((addr) => (
                  <div key={addr.id} className="rounded-xl border border-slate-100 p-4 bg-slate-50/50 flex justify-between items-start">
                    <div>
                      {addr.isDefault && <span className="inline-block px-2 py-0.5 rounded bg-violet-100 text-violet-700 text-[10px] font-bold mb-1">DEFAULT</span>}
                      <p className="text-sm font-semibold text-slate-800">{addr.name}</p>
                      <p className="text-xs text-slate-500 mt-0.5">{addr.street}</p>
                      <p className="text-xs text-slate-500">{addr.city}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      {!addr.isDefault && (
                        <button onClick={() => { setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === addr.id }))); showToast("Default address updated."); }} className="text-[11px] text-violet-600 hover:underline cursor-pointer font-medium">
                          Set Default
                        </button>
                      )}
                      <button onClick={() => { setAddresses(addresses.filter(a => a.id !== addr.id)); showToast("Address removed."); }} className="text-rose-500 hover:text-rose-700 cursor-pointer">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* PAYMENT METHODS TAB */}
            {activeTab === "Payment Methods" && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900">Saved Cards</h3>
                  <button onClick={() => setShowCardModal(true)} className="text-xs font-semibold text-violet-600 hover:underline cursor-pointer flex items-center gap-1">
                    <Plus size={14} /> Add Payment Method
                  </button>
                </div>
                {cards.map((card) => (
                  <div key={card.id} className="rounded-xl border border-slate-100 p-4 bg-slate-50/50 flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-12 rounded bg-slate-800 flex items-center justify-center text-[10px] font-bold text-white tracking-widest">
                        {card.type.toUpperCase()}
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-slate-800">{card.type} ending in •••• {card.last4}</p>
                        <p className="text-[11px] text-slate-400">Expires {card.expiry}</p>
                      </div>
                    </div>
                    <button onClick={() => { setCards(cards.filter(c => c.id !== card.id)); showToast("Card removed."); }} className="text-xs text-rose-500 hover:underline cursor-pointer font-medium">
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* SECURITY TAB */}
            {activeTab === "Security" && (
              <form onSubmit={handleUpdatePassword} className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <ShieldCheck size={16} className="text-violet-600" /> Password & Security
                </h3>
                <div className="space-y-3">
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-500">Current Password</label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••" 
                      value={securityData.currentPassword}
                      onChange={(e) => setSecurityData({...securityData, currentPassword: e.target.value})}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500" 
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-500">New Password</label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••" 
                      value={securityData.newPassword}
                      onChange={(e) => setSecurityData({...securityData, newPassword: e.target.value})}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500" 
                    />
                  </div>
                  <div>
                    <label className="mb-1 block text-xs font-medium text-slate-500">Confirm New Password</label>
                    <input 
                      type="password" 
                      required
                      placeholder="••••••••" 
                      value={securityData.confirmPassword}
                      onChange={(e) => setSecurityData({...securityData, confirmPassword: e.target.value})}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500" 
                    />
                  </div>
                  <div className="pt-2 flex items-center justify-between border-t border-slate-100">
                    <div>
                      <p className="text-xs font-semibold text-slate-800">Two-Factor Authentication (2FA)</p>
                      <p className="text-[11px] text-slate-400">Secure your account with code prompts on login</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={securityData.twoFactor} 
                      onChange={(e) => {
                        setSecurityData({...securityData, twoFactor: e.target.checked});
                        showToast(e.target.checked ? "2FA Enabled" : "2FA Disabled");
                      }}
                      className="h-4 w-4 rounded text-violet-600 focus:ring-violet-500 cursor-pointer"
                    />
                  </div>
                  <button type="submit" className="mt-2 rounded-lg bg-violet-600 px-4 py-2 text-xs font-semibold text-white hover:bg-violet-750 cursor-pointer transition-colors">
                    Update Password
                  </button>
                </div>
              </form>
            )}

            {/* SETTINGS TAB */}
            {activeTab === "Settings" && (
              <div className="space-y-4">
                <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  <SettingsIcon size={16} className="text-violet-600" /> Account Preferences
                </h3>
                <div className="space-y-4 text-xs pt-1">
                  <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-800">Promotional Emails & Discounts</p>
                      <p className="text-[11px] text-slate-400">Receive coupons and personalized product announcements</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settingsData.promoEmails} 
                      onChange={(e) => {
                        setSettingsData({...settingsData, promoEmails: e.target.checked});
                        showToast("Settings preference updated.");
                      }}
                      className="h-4 w-4 rounded text-violet-600 focus:ring-violet-500 cursor-pointer" 
                    />
                  </label>

                  <label className="flex items-center justify-between cursor-pointer p-2 rounded-lg hover:bg-slate-50 transition-colors">
                    <div>
                      <p className="font-semibold text-slate-800">SMS Delivery Notifications</p>
                      <p className="text-[11px] text-slate-400">Get text alerts when out for delivery or shipped</p>
                    </div>
                    <input 
                      type="checkbox" 
                      checked={settingsData.smsNotifications} 
                      onChange={(e) => {
                        setSettingsData({...settingsData, smsNotifications: e.target.checked});
                        showToast("Settings preference updated.");
                      }}
                      className="h-4 w-4 rounded text-violet-600 focus:ring-violet-500 cursor-pointer" 
                    />
                  </label>

                  <div className="p-2 border-t border-slate-100">
                    <label className="block font-semibold text-slate-800 mb-1">Profile Visibility</label>
                    <select 
                      value={settingsData.profileVisibility}
                      onChange={(e) => {
                        setSettingsData({...settingsData, profileVisibility: e.target.value});
                        showToast("Visibility setting saved.");
                      }}
                      className="w-full rounded-lg border border-slate-200 px-3 py-2 text-xs text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500"
                    >
                      <option value="Public">Public (Visible to community reviews)</option>
                      <option value="Private">Private (Hidden)</option>
                    </select>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Account overview */}
          <div className="rounded-2xl bg-white p-6 shadow-sm shadow-slate-100">
            <h3 className="mb-4 text-sm font-bold text-slate-900">Account Overview</h3>
            <div className="space-y-4 text-sm">
              <Overview icon={ClipboardList} label="Total Orders" value="24" />
              <Overview icon={Heart} label="Wishlist Items" value="16" />
              <Overview icon={Wallet} label="Total Spent" value="$2,450" />
              <Overview icon={Award} label="Member Level" value="Premium" />
              <Overview icon={Gift} label="Reward Points" value="320 pts" />
            </div>
          </div>
        </div>

        {/* Recent activity */}
        <div className="mt-6 rounded-2xl bg-white p-6 shadow-sm shadow-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-sm font-bold text-slate-900">Recent Activity</h3>
            <button onClick={() => setShowActivityModal(true)} className="text-xs font-medium text-violet-600 hover:underline cursor-pointer">
              View All
            </button>
          </div>
          <div className="space-y-4">
            {INITIAL_ACTIVITY.map((a, i) => (
              <div key={i} className="flex items-start gap-3 text-sm">
                <span className={`mt-1 h-2 w-2 shrink-0 rounded-full ${a.color}`} />
                <div>
                  <p className="text-slate-700">{a.text}</p>
                  <p className="text-xs text-slate-400">{a.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      {showAddressModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddAddress} className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
            <button type="button" onClick={() => setShowAddressModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-slate-900">Add New Address</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Street Address</label>
                <input type="text" required placeholder="e.g., 456 Broadway St" value={newAddress.street} onChange={(e) => setNewAddress({...newAddress, street: e.target.value})} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">City, State, Zip</label>
                <input type="text" required placeholder="e.g., San Francisco, CA 94107" value={newAddress.city} onChange={(e) => setNewAddress({...newAddress, city: e.target.value})} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
            </div>
            <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-xl text-xs cursor-pointer">
              Save Address
            </button>
          </form>
        </div>
      )}

      {/* Add Card Modal */}
      {showCardModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleAddCard} className="bg-white rounded-3xl max-w-md w-full p-6 relative shadow-2xl space-y-4">
            <button type="button" onClick={() => setShowCardModal(false)} className="absolute top-4 right-4 p-2 rounded-full bg-slate-100 text-slate-600 cursor-pointer">
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-base font-bold text-slate-900">Add Payment Method</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Card Number</label>
                <input type="text" required placeholder="4111 2222 3333 4444" value={newCard.number} onChange={(e) => setNewCard({...newCard, number: e.target.value})} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-500 mb-1">Expiration Date</label>
                <input type="text" required placeholder="MM/YY" value={newCard.expiry} onChange={(e) => setNewCard({...newCard, expiry: e.target.value})} className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-violet-500" />
              </div>
            </div>
            <button type="submit" className="w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-2.5 rounded-xl text-xs cursor-pointer">
              Save Card
            </button>
          </form>
        </div>
      )}
    </div>
  );
}

function Field({ label, value, disabled, onChange }) {
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-slate-500">{label}</label>
      <input
        type="text"
        value={value}
        disabled={disabled}
        onChange={onChange}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-700 focus:outline-none focus:ring-2 focus:ring-violet-500 disabled:bg-slate-50 disabled:text-slate-500 transition-colors"
      />
    </div>
  );
}

function Overview({ icon: Icon, label, value }) {
  return (
    <div className="flex items-center justify-between">
      <span className="flex items-center gap-2 text-slate-500">
        <Icon size={15} className="text-violet-500" />
        {label}
      </span>
      <span className="font-semibold text-slate-800">{value}</span>
    </div>
  );
}