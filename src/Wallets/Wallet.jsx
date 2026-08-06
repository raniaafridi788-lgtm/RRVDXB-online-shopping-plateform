import React, { useState, useMemo, useEffect, useRef } from "react";
import {
  Wallet,
  Plus,
  X,
  ArrowUpRight,
  ArrowDownRight,
  ShoppingBag,
  ChevronRight,
  ChevronLeft,
  CreditCard,
  Building2,
  CheckCircle2,
  Loader2,
  ShieldCheck,
  Search,
  Trash2,
  Star,
  Gift,
  RefreshCw,
  BadgePercent,
  Download,
  Sparkles,
  Undo2,
} from "lucide-react";
import { BarChart, Bar, XAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

// =====================================================================
// RRVDXB Wallet — account dashboard for the RRVDXB shopping platform
// Palette: near-black slate (#0B0F17), single restrained gold accent
// (#B8923C), cream text, muted emerald for credits. Currency: PKR.
// =====================================================================

const MIN_TOPUP = 1000;
const MAX_TOPUP = 1500000;
const QUICK_AMOUNTS = [5000, 10000, 25000, 50000];

const TABS = [
  { id: "overview", label: "Overview" },
  { id: "cards", label: "Cards & banks" },
  { id: "activity", label: "Activity" },
  { id: "offers", label: "Offers" },
];

const initialCards = [
  { id: "c1", brand: "Visa", last4: "4821", expiry: "09/28", isDefault: true },
  { id: "c2", brand: "Mastercard", last4: "1190", expiry: "02/27", isDefault: false },
];

const BANK_METHOD = { id: "bank", brand: "HBL / Meezan", last4: null, expiry: null, isDefault: false, isBank: true };

const seedTransactions = [
  { id: "t1", type: "topup", label: "Wallet top-up", method: "Visa •••• 4821", date: "3 Aug 2026", amount: 25000 },
  { id: "t2", type: "purchase", label: "Order #RX-8821 · Sneakers", method: null, date: "1 Aug 2026", amount: -17500 },
  { id: "t3", type: "cashback", label: "Cashback · Order #RX-8821", method: null, date: "1 Aug 2026", amount: 875 },
  { id: "t4", type: "purchase", label: "Order #RX-8790 · Home decor", method: null, date: "28 Jul 2026", amount: -6400 },
  { id: "t5", type: "refund", label: "Refund · Order #RX-8655", method: null, date: "24 Jul 2026", amount: 4500 },
  { id: "t6", type: "topup", label: "Wallet top-up", method: "Meezan Bank", date: "20 Jul 2026", amount: 50000 },
  { id: "t7", type: "purchase", label: "Order #RX-8712 · Grooming set", method: null, date: "14 Jul 2026", amount: -4800 },
  { id: "t8", type: "purchase", label: "Order #RX-8590 · Watch strap", method: null, date: "2 Jul 2026", amount: -10750 },
];

const spendHistory = [
  { month: "Mar", value: 31000 },
  { month: "Apr", value: 20500 },
  { month: "May", value: 44500 },
  { month: "Jun", value: 35250 },
  { month: "Jul", value: 22000 },
  { month: "Aug", value: 17500 },
];

const offers = [
  { id: "o1", title: "Add Rs. 25,000, get Rs. 1,250 cashback", detail: "One-time bonus on your next top-up of Rs. 25,000 or more.", amount: 25000, bonusPct: 5 },
  { id: "o2", title: "Add Rs. 50,000, get Rs. 3,000 cashback", detail: "Our best rate — valid for RRVDXB Gold members.", amount: 50000, bonusPct: 6 },
  { id: "o3", title: "First auto-reload bonus", detail: "Turn on auto-reload and get Rs. 750 credited instantly.", amount: 0, bonusPct: 0, isAutoReload: true },
];

const FILTERS = [
  { id: "all", label: "All" },
  { id: "topup", label: "Top-ups" },
  { id: "purchase", label: "Purchases" },
  { id: "refund", label: "Refunds" },
  { id: "cashback", label: "Cashback" },
];

function formatPKR(n, opts = {}) {
  const sign = n < 0 ? "−" : opts.showPlus && n > 0 ? "+" : "";
  return `${sign}Rs. ${Math.abs(n).toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

function txMeta(type) {
  switch (type) {
    case "topup":
      return { icon: ArrowDownRight, color: "#6FBF9A", bg: "bg-[#6FBF9A]/10" };
    case "cashback":
      return { icon: Sparkles, color: "#B8923C", bg: "bg-[#B8923C]/10" };
    case "refund":
      return { icon: Undo2, color: "#6FBF9A", bg: "bg-[#6FBF9A]/10" };
    default:
      return { icon: ShoppingBag, color: "#8A93A6", bg: "bg-[#8A93A6]/10" };
  }
}

function StepDots({ step, total }) {
  return (
    <div className="flex items-center gap-1.5" aria-hidden="true">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all ${
            i === step ? "w-5 bg-[#B8923C]" : i < step ? "w-1.5 bg-[#B8923C]/50" : "w-1.5 bg-[#2A3040]"
          }`}
        />
      ))}
    </div>
  );
}

// PDF Statement Generator using jsPDF via CDN
function downloadPdfStatement(transactions, currentBalance) {
  const generate = () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Header styling
    doc.setFillColor(11, 15, 23); // #0B0F17
    doc.rect(0, 0, 210, 40, "F");

    doc.setTextColor(184, 146, 60); // #B8923C Gold
    doc.setFont("helvetica", "bold");
    doc.setFontSize(14);
    doc.text("RRVDXB", 14, 18);

    doc.setTextColor(237, 235, 228);
    doc.setFontSize(18);
    doc.text("Account Statement", 14, 28);

    doc.setFontSize(10);
    doc.setTextColor(138, 147, 166);
    doc.text(`Generated: ${new Date().toLocaleDateString()}`, 155, 18);
    doc.text(`Current Balance: Rs. ${currentBalance.toLocaleString()}`, 148, 28);

    // Table Columns & Rows
    let y = 55;
    doc.setTextColor(11, 15, 23);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Date", 14, y);
    doc.text("Description", 45, y);
    doc.text("Method", 130, y);
    doc.text("Amount (PKR)", 170, y, { align: "right" });

    doc.setDrawColor(200, 200, 200);
    doc.line(14, y + 2, 196, y + 2);

    doc.setFont("helvetica", "normal");
    y += 10;

    transactions.forEach((t, i) => {
      if (y > 280) {
        doc.addPage();
        y = 20;
      }
      doc.setTextColor(60, 60, 60);
      doc.text(t.date, 14, y);
      
      // Truncate long descriptions if needed
      const label = t.label.length > 42 ? t.label.substring(0, 39) + "..." : t.label;
      doc.text(label, 45, y);
      doc.text(t.method || "Wallet", 130, y);

      const amtStr = `${t.amount > 0 ? "+" : ""}Rs. ${Math.abs(t.amount).toLocaleString()}`;
      doc.setTextColor(t.amount > 0 ? 30 : 180, t.amount > 0 ? 130 : 30, t.amount > 0 ? 80 : 30);
      doc.text(amtStr, 196, y, { align: "right" });

      y += 8;
    });

    doc.save(`RRVDXB_Statement_${new Date().toISOString().slice(0, 10)}.pdf`);
  };

  if (window.jspdf) {
    generate();
  } else {
    const script = document.createElement("script");
    script.src = "https://cdnjs.cloudflare.com/ajax/libs/jspdf/2.5.1/jspdf.umd.min.js";
    script.onload = generate;
    document.body.appendChild(script);
  }
}

export default function WalletApp() {
  const [loading, setLoading] = useState(true);
  const [balance, setBalance] = useState(107275.0);
  const [transactions, setTransactions] = useState(seedTransactions);
  const [cards, setCards] = useState(initialCards);
  const [activeTab, setActiveTab] = useState("overview");
  const [toast, setToast] = useState(null);

  // activity tab
  const [filter, setFilter] = useState("all");
  const [query, setQuery] = useState("");

  // auto-reload
  const [autoReload, setAutoReload] = useState(false);
  const [autoReloadThreshold, setAutoReloadThreshold] = useState(5000);
  const [autoReloadAmount, setAutoReloadAmount] = useState(25000);

  // gift card
  const [giftCode, setGiftCode] = useState("");
  const [giftError, setGiftError] = useState("");
  const [giftRedeeming, setGiftRedeeming] = useState(false);

  // add card modal
  const [addCardOpen, setAddCardOpen] = useState(false);
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardCvv, setCardCvv] = useState("");
  const [cardErrors, setCardErrors] = useState({});

  // add-money modal
  const [modalOpen, setModalOpen] = useState(false);
  const [step, setStep] = useState(0);
  const [amount, setAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [methodId, setMethodId] = useState(initialCards[0].id);
  const [submitting, setSubmitting] = useState(false);
  const [appliedOffer, setAppliedOffer] = useState(null);
  const inputRef = useRef(null);

  const allMethods = useMemo(() => [...cards, BANK_METHOD], [cards]);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 700);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (modalOpen && step === 0) {
      const t = setTimeout(() => inputRef.current?.focus(), 50);
      return () => clearTimeout(t);
    }
  }, [modalOpen, step]);

  const numericAmount = useMemo(() => parseFloat(amount), [amount]);
  const isValidAmount =
    amount.trim() !== "" && !isNaN(numericAmount) && numericAmount >= MIN_TOPUP && numericAmount <= MAX_TOPUP;
  const selectedMethod = allMethods.find((m) => m.id === methodId) || allMethods[0];

  const filteredTransactions = useMemo(() => {
    return transactions
      .filter((tx) => (filter === "all" ? true : tx.type === filter))
      .filter((tx) => tx.label.toLowerCase().includes(query.trim().toLowerCase()));
  }, [transactions, filter, query]);

  const monthSpent = useMemo(
    () =>
      transactions
        .filter((t) => t.type === "purchase" && (t.date.startsWith("1") || t.date.startsWith("2") || t.date.startsWith("3")))
        .reduce((s, t) => s + Math.abs(t.amount), 0),
    [transactions]
  );

  const cashbackTotal = useMemo(
    () => transactions.filter((t) => t.type === "cashback").reduce((s, t) => s + t.amount, 0),
    [transactions]
  );

  function pushTransaction(tx) {
    setTransactions((t) => [{ id: `t-${Date.now()}-${Math.random().toString(16).slice(2)}`, ...tx }, ...t]);
  }

  function showToast(msg) {
    setToast(msg);
    setTimeout(() => setToast(null), 3200);
  }

  function openModal(prefillAmount, offer) {
    setStep(0);
    setAmount(prefillAmount ? String(prefillAmount) : "");
    setAmountError("");
    setMethodId(cards[0]?.id || BANK_METHOD.id);
    setAppliedOffer(offer || null);
    setModalOpen(true);
  }

  function closeModal() {
    setModalOpen(false);
    setSubmitting(false);
  }

  function handleAmountChange(e) {
    const val = e.target.value;
    if (val === "" || /^\d{0,8}(\.\d{0,2})?$/.test(val)) {
      setAmount(val);
      setAmountError("");
    }
  }

  function validateAndContinue() {
    if (amount.trim() === "") return setAmountError("Enter an amount to continue.");
    if (numericAmount < MIN_TOPUP) return setAmountError(`Minimum top-up is ${formatPKR(MIN_TOPUP)}.`);
    if (numericAmount > MAX_TOPUP) return setAmountError(`Maximum top-up is ${formatPKR(MAX_TOPUP)} per transaction.`);
    if (appliedOffer && appliedOffer.amount && numericAmount < appliedOffer.amount) {
      return setAmountError(`This offer needs a top-up of at least ${formatPKR(appliedOffer.amount)}.`);
    }
    setAmountError("");
    setStep(1);
  }

  function handleConfirm() {
    setSubmitting(true);
    setTimeout(() => {
      const bonus = appliedOffer && appliedOffer.bonusPct ? Math.round(numericAmount * (appliedOffer.bonusPct / 100) * 100) / 100 : 0;
      setBalance((b) => Math.round((b + numericAmount + bonus) * 100) / 100);
      pushTransaction({
        type: "topup",
        label: "Wallet top-up",
        method: selectedMethod.isBank ? selectedMethod.brand : `${selectedMethod.brand} •••• ${selectedMethod.last4}`,
        date: "Today",
        amount: numericAmount,
      });
      if (bonus > 0) {
        pushTransaction({ type: "cashback", label: `Cashback · ${appliedOffer.title}`, method: null, date: "Today", amount: bonus });
      }
      setSubmitting(false);
      setStep(2);
    }, 1100);
  }

  function finishFlow() {
    setModalOpen(false);
    showToast(`${formatPKR(numericAmount)} added to your wallet`);
    setAppliedOffer(null);
  }

  function openAddCard() {
    setCardName("");
    setCardNumber("");
    setCardExpiry("");
    setCardCvv("");
    setCardErrors({});
    setAddCardOpen(true);
  }

  function formatCardNumber(v) {
    return v
      .replace(/\D/g, "")
      .slice(0, 16)
      .replace(/(.{4})/g, "$1 ")
      .trim();
  }

  function formatExpiry(v) {
    const digits = v.replace(/\D/g, "").slice(0, 4);
    if (digits.length <= 2) return digits;
    return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  }

  function detectBrand(number) {
    const clean = number.replace(/\s/g, "");
    if (clean.startsWith("4")) return "Visa";
    if (/^5[1-5]/.test(clean)) return "Mastercard";
    return "Card";
  }

  function submitAddCard() {
    const digits = cardNumber.replace(/\s/g, "");
    const errs = {};
    if (cardName.trim().length < 3) errs.cardName = "Enter the name on the card.";
    if (digits.length !== 16) errs.cardNumber = "Card number must be 16 digits.";
    if (!/^\d{2}\/\d{2}$/.test(cardExpiry)) errs.cardExpiry = "Use MM/YY format.";
    if (cardCvv.length < 3) errs.cardCvv = "CVV must be 3 digits.";
    setCardErrors(errs);
    if (Object.keys(errs).length > 0) return;

    const newCard = {
      id: `c-${Date.now()}`,
      brand: detectBrand(digits),
      last4: digits.slice(-4),
      expiry: cardExpiry,
      isDefault: cards.length === 0,
    };
    setCards((c) => [...c, newCard]);
    setAddCardOpen(false);
    showToast(`${newCard.brand} •••• ${newCard.last4} added`);
  }

  function removeCard(id) {
    setCards((c) => {
      const next = c.filter((card) => card.id !== id);
      if (next.length && !next.some((c2) => c2.isDefault)) next[0].isDefault = true;
      return next;
    });
  }

  function makeDefault(id) {
    setCards((c) => c.map((card) => ({ ...card, isDefault: card.id === id })));
  }

  function redeemGiftCard() {
    const code = giftCode.trim().toUpperCase();
    if (code.length < 6) {
      setGiftError("Enter a valid gift card code.");
      return;
    }
    setGiftError("");
    setGiftRedeeming(true);
    setTimeout(() => {
      const value = 2500 + (code.charCodeAt(0) % 5) * 1000;
      setBalance((b) => Math.round((b + value) * 100) / 100);
      pushTransaction({ type: "topup", label: `Gift card redeemed · ${code}`, method: "Gift card", date: "Today", amount: value });
      setGiftRedeeming(false);
      setGiftCode("");
      showToast(`${formatPKR(value)} gift card redeemed`);
    }, 900);
  }

  function claimOffer(offer) {
    if (offer.isAutoReload) {
      setAutoReload(true);
      setBalance((b) => Math.round((b + 750) * 100) / 100);
      pushTransaction({ type: "cashback", label: "Cashback · Auto-reload activated", method: null, date: "Today", amount: 750 });
      showToast("Auto-reload turned on · Rs. 750 credited");
      return;
    }
    openModal(offer.amount, offer);
    setActiveTab("overview");
  }

  return (
    <div className="min-h-screen bg-[#0B0F17] text-[#EDEBE4] antialiased">
      <div className="max-w-md mx-auto p-4 sm:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-5 px-1">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-[#B8923C] font-semibold uppercase">RRVDXB</p>
            <h1 className="text-xl font-semibold text-[#EDEBE4] mt-0.5">My Wallet</h1>
          </div>
          <div className="w-10 h-10 rounded-full bg-[#141925] border border-[#242B3A] flex items-center justify-center">
            <Wallet className="w-4 h-4 text-[#B8923C]" />
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-[#111621] border border-[#242B3A] rounded-xl p-1 mb-5">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id)}
              className={`flex-1 text-xs font-medium py-2 rounded-lg transition-colors ${
                activeTab === t.id ? "bg-[#B8923C] text-[#14100A]" : "text-[#8A93A6] hover:text-[#EDEBE4]"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {loading ? (
          <BalanceSkeleton />
        ) : (
          <>
            {activeTab === "overview" && (
              <OverviewTab
                balance={balance}
                cashbackTotal={cashbackTotal}
                monthSpent={monthSpent}
                transactions={transactions}
                autoReload={autoReload}
                onOpenModal={() => openModal()}
                onGoTab={setActiveTab}
              />
            )}

            {activeTab === "cards" && (
              <CardsTab
                cards={cards}
                onAddCard={openAddCard}
                onRemove={removeCard}
                onMakeDefault={makeDefault}
                autoReload={autoReload}
                setAutoReload={setAutoReload}
                autoReloadThreshold={autoReloadThreshold}
                setAutoReloadThreshold={setAutoReloadThreshold}
                autoReloadAmount={autoReloadAmount}
                setAutoReloadAmount={setAutoReloadAmount}
              />
            )}

            {activeTab === "activity" && (
              <ActivityTab
                filter={filter}
                setFilter={setFilter}
                query={query}
                setQuery={setQuery}
                filteredTransactions={filteredTransactions}
              />
            )}

            {activeTab === "offers" && (
              <OffersTab offers={offers} onClaim={claimOffer} giftCode={giftCode} setGiftCode={setGiftCode} giftError={giftError} giftRedeeming={giftRedeeming} onRedeem={redeemGiftCard} />
            )}
          </>
        )}
      </div>

      {/* Add Money Modal */}
      {modalOpen && (
        <AddMoneyModal
          step={step}
          setStep={setStep}
          amount={amount}
          amountError={amountError}
          handleAmountChange={handleAmountChange}
          validateAndContinue={validateAndContinue}
          numericAmount={numericAmount}
          balance={balance}
          allMethods={allMethods}
          methodId={methodId}
          setMethodId={setMethodId}
          selectedMethod={selectedMethod}
          submitting={submitting}
          handleConfirm={handleConfirm}
          finishFlow={finishFlow}
          closeModal={closeModal}
          inputRef={inputRef}
          appliedOffer={appliedOffer}
        />
      )}

      {/* Add Card Modal */}
      {addCardOpen && (
        <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setAddCardOpen(false)}>
          <div className="w-full sm:max-w-sm bg-[#0F141F] border border-[#242B3A] rounded-t-2xl sm:rounded-2xl p-6 relative" onClick={(e) => e.stopPropagation()}>
            <button
              onClick={() => setAddCardOpen(false)}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#141925] border border-[#242B3A] flex items-center justify-center text-[#8A93A6] hover:text-[#EDEBE4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8923C]"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
            <h3 className="text-lg font-semibold text-[#EDEBE4] mb-5">Add a card</h3>

            <FormField label="Name on card" error={cardErrors.cardName}>
              <input
                value={cardName}
                onChange={(e) => setCardName(e.target.value)}
                placeholder="Full name"
                className="w-full bg-transparent outline-none text-sm text-[#EDEBE4] placeholder:text-[#3D4353]"
              />
            </FormField>

            <FormField label="Card number" error={cardErrors.cardNumber}>
              <input
                value={cardNumber}
                onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                placeholder="0000 0000 0000 0000"
                inputMode="numeric"
                className="w-full bg-transparent outline-none text-sm tabular-nums text-[#EDEBE4] placeholder:text-[#3D4353]"
              />
            </FormField>

            <div className="flex gap-3">
              <FormField label="Expiry" error={cardErrors.cardExpiry} className="flex-1">
                <input
                  value={cardExpiry}
                  onChange={(e) => setCardExpiry(formatExpiry(e.target.value))}
                  placeholder="MM/YY"
                  inputMode="numeric"
                  className="w-full bg-transparent outline-none text-sm tabular-nums text-[#EDEBE4] placeholder:text-[#3D4353]"
                />
              </FormField>
              <FormField label="CVV" error={cardErrors.cardCvv} className="flex-1">
                <input
                  value={cardCvv}
                  onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, "").slice(0, 3))}
                  placeholder="•••"
                  inputMode="numeric"
                  type="password"
                  className="w-full bg-transparent outline-none text-sm tabular-nums text-[#EDEBE4] placeholder:text-[#3D4353]"
                />
              </FormField>
            </div>

            <button
              onClick={submitAddCard}
              className="w-full mt-4 bg-[#B8923C] hover:bg-[#C9A24E] text-[#14100A] font-semibold text-sm py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EDEBE4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F141F]"
            >
              Save card
            </button>
            <p className="text-[11px] text-[#4E5568] flex items-center gap-1.5 justify-center mt-3">
              <ShieldCheck className="w-3.5 h-3.5" /> Encrypted and PCI-DSS compliant
            </p>
          </div>
        </div>
      )}

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-[#141925] border border-[#B8923C]/40 text-[#EDEBE4] text-sm px-4 py-3 rounded-xl shadow-lg flex items-center gap-2 z-50 max-w-[90vw]">
          <CheckCircle2 className="w-4 h-4 text-[#6FBF9A] shrink-0" />
          <span className="truncate">{toast}</span>
        </div>
      )}
    </div>
  );
}

// ============================== Overview ==============================

function OverviewTab({ balance, cashbackTotal, monthSpent, transactions, autoReload, onOpenModal, onGoTab }) {
  const recent = transactions.slice(0, 4);
  return (
    <>
      <div className="relative overflow-hidden rounded-2xl p-6 mb-5 border border-[#242B3A] bg-[#111621]">
        <div className="flex items-center justify-between mb-5">
          <p className="text-[11px] uppercase tracking-[0.2em] text-[#8A93A6]">Available balance</p>
          <span className="flex items-center gap-1 text-[10px] text-[#6FBF9A] bg-[#6FBF9A]/10 px-2 py-1 rounded-full">
            <ShieldCheck className="w-3 h-3" /> Verified
          </span>
        </div>

        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-4xl font-semibold tabular-nums text-[#F7F5EE]">
            {balance.toLocaleString("en-PK", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
          <span className="text-sm text-[#B8923C] font-medium tracking-wide">PKR</span>
        </div>
        <p className="text-xs text-[#6B7385] mb-5">
          {autoReload ? "Auto-reload is on" : "Linked to your RRVDXB account"}
        </p>

        <div className="grid grid-cols-2 gap-3">
          <button
            onClick={onOpenModal}
            className="flex items-center justify-center gap-2 bg-[#B8923C] hover:bg-[#C9A24E] active:bg-[#A67F30] text-[#14100A] font-semibold text-sm py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EDEBE4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#111621]"
          >
            <Plus className="w-4 h-4" strokeWidth={2.5} />
            Add money
          </button>
          <button
            onClick={() => onGoTab("offers")}
            className="flex items-center justify-center gap-2 bg-transparent border border-[#3A3020] hover:border-[#B8923C] text-[#B8923C] font-semibold text-sm py-3 rounded-xl transition-colors"
          >
            <BadgePercent className="w-4 h-4" />
            Offers
          </button>
        </div>
      </div>

      {/* Spend insight */}
      <div className="rounded-xl bg-[#111621] border border-[#242B3A] p-4 mb-5">
        <div className="flex items-center justify-between mb-3">
          <p className="text-[11px] uppercase tracking-wider text-[#6B7385]">Spending, last 6 months</p>
          <button
            onClick={() => downloadPdfStatement(transactions, balance)}
            className="text-[11px] text-[#B8923C] flex items-center gap-1 hover:underline cursor-pointer"
          >
            <Download className="w-3 h-3" /> Statement PDF
          </button>
        </div>
        <div className="h-28">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={spendHistory} barCategoryGap={18}>
              <XAxis
                dataKey="month"
                axisLine={false}
                tickLine={false}
                tick={{ fill: "#6B7385", fontSize: 11 }}
              />
              <Tooltip
                cursor={{ fill: "rgba(184,146,60,0.08)" }}
                contentStyle={{ background: "#141925", border: "1px solid #242B3A", borderRadius: 8, fontSize: 12 }}
                labelStyle={{ color: "#8A93A6" }}
                itemStyle={{ color: "#EDEBE4" }}
                formatter={(v) => [formatPKR(v), "Spent"]}
              />
              <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                {spendHistory.map((entry, i) => (
                  <Cell key={i} fill={i === spendHistory.length - 1 ? "#B8923C" : "#3A3F52"} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Quick stats */}
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="rounded-xl bg-[#111621] border border-[#242B3A] p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#6B7385] mb-1">This month</p>
          <p className="text-sm font-semibold text-[#EDEBE4]">{formatPKR(monthSpent)} spent</p>
        </div>
        <div className="rounded-xl bg-[#111621] border border-[#242B3A] p-4">
          <p className="text-[10px] uppercase tracking-wider text-[#6B7385] mb-1">Cashback earned</p>
          <p className="text-sm font-semibold text-[#B8923C]">{formatPKR(cashbackTotal)}</p>
        </div>
      </div>

      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-semibold text-[#EDEBE4]">Recent activity</h2>
        <button onClick={() => onGoTab("activity")} className="text-xs text-[#B8923C] flex items-center gap-0.5 hover:underline">
          View all <ChevronRight className="w-3 h-3" />
        </button>
      </div>
      <TransactionList items={recent} />
    </>
  );
}

// ============================== Cards & banks ==============================

function CardsTab({ cards, onAddCard, onRemove, onMakeDefault, autoReload, setAutoReload, autoReloadThreshold, setAutoReloadThreshold, autoReloadAmount, setAutoReloadAmount }) {
  return (
    <>
      <div className="flex items-center justify-between mb-3 px-1">
        <h2 className="text-sm font-semibold text-[#EDEBE4]">Saved payment methods</h2>
        <button onClick={onAddCard} className="text-xs text-[#B8923C] flex items-center gap-1 hover:underline">
          <Plus className="w-3 h-3" /> Add card
        </button>
      </div>

      {cards.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-[#242B3A] rounded-xl mb-5">
          <p className="text-sm text-[#6B7385]">No cards saved yet.</p>
        </div>
      ) : (
        <ul className="space-y-2 mb-5">
          {cards.map((c) => (
            <li key={c.id} className="flex items-center gap-3 bg-[#111621] border border-[#242B3A] rounded-xl px-4 py-3">
              <div className="w-9 h-9 rounded-full bg-[#0F141F] border border-[#242B3A] flex items-center justify-center shrink-0">
                <CreditCard className="w-4 h-4 text-[#B8923C]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm text-[#EDEBE4] flex items-center gap-2">
                  {c.brand} •••• {c.last4}
                  {c.isDefault && (
                    <span className="text-[10px] text-[#B8923C] bg-[#B8923C]/10 px-1.5 py-0.5 rounded-full flex items-center gap-0.5">
                      <Star className="w-2.5 h-2.5 fill-current" /> Default
                    </span>
                  )}
                </p>
                <p className="text-xs text-[#6B7385]">Expires {c.expiry}</p>
              </div>
              {!c.isDefault && (
                <button
                  onClick={() => onMakeDefault(c.id)}
                  className="text-[11px] text-[#8A93A6] hover:text-[#B8923C] px-2 py-1 shrink-0"
                >
                  Set default
                </button>
              )}
              <button
                onClick={() => onRemove(c.id)}
                aria-label={`Remove ${c.brand} ending ${c.last4}`}
                className="w-8 h-8 rounded-full flex items-center justify-center text-[#6B7385] hover:text-[#D9695B] hover:bg-[#D9695B]/10 shrink-0"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Auto reload */}
      <div className="rounded-xl bg-[#111621] border border-[#242B3A] p-4">
        <div className="flex items-center justify-between mb-1">
          <div className="flex items-center gap-2">
            <RefreshCw className="w-4 h-4 text-[#B8923C]" />
            <p className="text-sm font-semibold text-[#EDEBE4]">Auto-reload</p>
          </div>
          <button
            onClick={() => setAutoReload((v) => !v)}
            role="switch"
            aria-checked={autoReload}
            className={`w-10 h-6 rounded-full relative transition-colors ${autoReload ? "bg-[#B8923C]" : "bg-[#242B3A]"}`}
          >
            <span
              className={`absolute top-0.5 w-5 h-5 rounded-full bg-[#0B0F17] transition-transform ${
                autoReload ? "translate-x-4.5 left-0.5" : "left-0.5"
              }`}
              style={{ transform: autoReload ? "translateX(18px)" : "translateX(0)" }}
            />
          </button>
        </div>
        <p className="text-xs text-[#6B7385] mb-3">Automatically top up when your balance runs low.</p>

        {autoReload && (
          <div className="grid grid-cols-2 gap-3 pt-2 border-t border-[#242B3A]">
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#6B7385] mb-1 mt-3">When below</label>
              <div className="flex items-center bg-[#141925] border border-[#242B3A] rounded-lg px-3 py-2">
                <span className="text-xs text-[#B8923C] mr-1">PKR</span>
                <input
                  type="number"
                  value={autoReloadThreshold}
                  onChange={(e) => setAutoReloadThreshold(Number(e.target.value))}
                  className="bg-transparent outline-none text-sm text-[#EDEBE4] w-full tabular-nums"
                />
              </div>
            </div>
            <div>
              <label className="block text-[10px] uppercase tracking-wider text-[#6B7385] mb-1 mt-3">Reload with</label>
              <div className="flex items-center bg-[#141925] border border-[#242B3A] rounded-lg px-3 py-2">
                <span className="text-xs text-[#B8923C] mr-1">PKR</span>
                <input
                  type="number"
                  value={autoReloadAmount}
                  onChange={(e) => setAutoReloadAmount(Number(e.target.value))}
                  className="bg-transparent outline-none text-sm text-[#EDEBE4] w-full tabular-nums"
                />
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

// ============================== Activity ==============================

function ActivityTab({ filter, setFilter, query, setQuery, filteredTransactions }) {
  return (
    <>
      <div className="flex items-center bg-[#111621] border border-[#242B3A] rounded-xl px-3 py-2.5 mb-3 focus-within:border-[#B8923C] transition-colors">
        <Search className="w-4 h-4 text-[#6B7385] mr-2 shrink-0" />
        <input
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search transactions"
          className="bg-transparent outline-none text-sm text-[#EDEBE4] placeholder:text-[#4E5568] w-full"
        />
      </div>

      <div className="flex gap-2 mb-4 overflow-x-auto pb-1 -mx-1 px-1">
        {FILTERS.map((f) => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-medium border transition-colors ${
              filter === f.id
                ? "bg-[#B8923C] text-[#14100A] border-[#B8923C]"
                : "bg-transparent text-[#8A93A6] border-[#242B3A] hover:border-[#3A4157]"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filteredTransactions.length === 0 ? (
        <div className="text-center py-10 border border-dashed border-[#242B3A] rounded-xl">
          <p className="text-sm text-[#6B7385]">No transactions match your search.</p>
        </div>
      ) : (
        <TransactionList items={filteredTransactions} showMethod />
      )}
    </>
  );
}

function TransactionList({ items, showMethod }) {
  return (
    <ul className="space-y-2">
      {items.map((tx) => {
        const { icon: Icon, color, bg } = txMeta(tx.type);
        return (
          <li key={tx.id} className="flex items-center gap-3 bg-[#111621] border border-[#242B3A] rounded-xl px-4 py-3">
            <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${bg}`}>
              <Icon className="w-4 h-4" style={{ color }} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm text-[#EDEBE4] truncate">{tx.label}</p>
              <p className="text-xs text-[#6B7385]">
                {tx.date}
                {showMethod && tx.method ? ` · ${tx.method}` : ""}
              </p>
            </div>
            <span className={`text-sm font-semibold tabular-nums shrink-0 ${tx.amount > 0 ? "text-[#6FBF9A]" : "text-[#EDEBE4]"}`}>
              {formatPKR(tx.amount, { showPlus: true })}
            </span>
          </li>
        );
      })}
    </ul>
  );
}

// ============================== Offers ==============================

function OffersTab({ offers, onClaim, giftCode, setGiftCode, giftError, giftRedeeming, onRedeem }) {
  return (
    <>
      <div className="space-y-3 mb-6">
        {offers.map((o) => (
          <div key={o.id} className="rounded-xl bg-[#111621] border border-[#242B3A] p-4">
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-full bg-[#B8923C]/10 flex items-center justify-center shrink-0">
                <BadgePercent className="w-4 h-4 text-[#B8923C]" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-sm font-semibold text-[#EDEBE4]">{o.title}</p>
                <p className="text-xs text-[#6B7385] mt-0.5">{o.detail}</p>
              </div>
            </div>
            <button
              onClick={() => onClaim(o)}
              className="w-full mt-3 text-xs font-semibold text-[#B8923C] border border-[#3A3020] hover:border-[#B8923C] rounded-lg py-2 transition-colors"
            >
              {o.isAutoReload ? "Turn on auto-reload" : "Use this offer"}
            </button>
          </div>
        ))}
      </div>

      <div className="rounded-xl bg-[#111621] border border-[#242B3A] p-4">
        <div className="flex items-center gap-2 mb-1">
          <Gift className="w-4 h-4 text-[#B8923C]" />
          <p className="text-sm font-semibold text-[#EDEBE4]">Redeem a gift card</p>
        </div>
        <p className="text-xs text-[#6B7385] mb-3">Enter the code from your RRVDXB gift card to add funds instantly.</p>
        <div className={`flex items-center bg-[#141925] border rounded-lg px-3 py-2.5 mb-2 ${giftError ? "border-[#D9695B]" : "border-[#242B3A] focus-within:border-[#B8923C]"}`}>
          <input
            value={giftCode}
            onChange={(e) => setGiftCode(e.target.value.toUpperCase())}
            placeholder="e.g. RRVDXB-XXXX-XXXX"
            className="bg-transparent outline-none text-sm text-[#EDEBE4] placeholder:text-[#4E5568] w-full tracking-wide"
          />
        </div>
        {giftError && <p className="text-xs text-[#D9695B] mb-2">{giftError}</p>}
        <button
          onClick={onRedeem}
          disabled={giftRedeeming}
          className="w-full flex items-center justify-center gap-2 bg-[#B8923C] hover:bg-[#C9A24E] disabled:opacity-70 text-[#14100A] font-semibold text-sm py-2.5 rounded-lg transition-colors"
        >
          {giftRedeeming ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" /> Redeeming…
            </>
          ) : (
            "Redeem code"
          )}
        </button>
      </div>
    </>
  );
}

// ============================== Add Money Modal ==============================

function AddMoneyModal({
  step,
  setStep,
  amount,
  amountError,
  handleAmountChange,
  validateAndContinue,
  numericAmount,
  balance,
  allMethods,
  methodId,
  setMethodId,
  selectedMethod,
  submitting,
  handleConfirm,
  finishFlow,
  closeModal,
  inputRef,
  appliedOffer,
}) {
  function handleModalKeyDown(e) {
    if (e.key === "Escape" && step !== 2) closeModal();
  }

  const bonus = appliedOffer && appliedOffer.bonusPct ? Math.round(numericAmount * (appliedOffer.bonusPct / 100) * 100) / 100 : 0;

  return (
    <div
      className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/60 backdrop-blur-sm"
      onClick={step !== 2 ? closeModal : undefined}
      onKeyDown={handleModalKeyDown}
      role="dialog"
      aria-modal="true"
      aria-labelledby="addmoney-title"
    >
      <div
        className="w-full sm:max-w-sm bg-[#0F141F] border border-[#242B3A] rounded-t-2xl sm:rounded-2xl p-6 relative"
        onClick={(e) => e.stopPropagation()}
      >
        {step !== 2 && (
          <button
            onClick={closeModal}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#141925] border border-[#242B3A] flex items-center justify-center text-[#8A93A6] hover:text-[#EDEBE4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8923C]"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>
        )}
        {step === 1 && (
          <button
            onClick={() => setStep(0)}
            className="absolute top-4 left-4 w-8 h-8 rounded-full bg-[#141925] border border-[#242B3A] flex items-center justify-center text-[#8A93A6] hover:text-[#EDEBE4] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8923C]"
            aria-label="Back"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
        )}

        {step === 0 && (
          <>
            <h3 id="addmoney-title" className="text-lg font-semibold text-[#EDEBE4] mb-1">
              Add money
            </h3>
            <p className="text-xs text-[#6B7385] mb-5">Current balance: {formatPKR(balance)}</p>

            {appliedOffer && (
              <div className="flex items-center gap-2 bg-[#B8923C]/10 border border-[#B8923C]/30 rounded-lg px-3 py-2 mb-4">
                <Sparkles className="w-3.5 h-3.5 text-[#B8923C] shrink-0" />
                <p className="text-xs text-[#B8923C]">{appliedOffer.title}</p>
              </div>
            )}

            <label htmlFor="topup-amount" className="block text-[11px] uppercase tracking-wider text-[#8A93A6] mb-2">
              Amount (PKR)
            </label>
            <div
              className={`flex items-center bg-[#141925] border rounded-xl px-4 py-3 mb-2 transition-colors ${
                amountError ? "border-[#D9695B]" : "border-[#242B3A] focus-within:border-[#B8923C]"
              }`}
            >
              <span className="text-[#B8923C] text-sm font-medium mr-2">PKR</span>
              <input
                id="topup-amount"
                ref={inputRef}
                type="text"
                inputMode="decimal"
                value={amount}
                onChange={handleAmountChange}
                onKeyDown={(e) => e.key === "Enter" && validateAndContinue()}
                placeholder="0.00"
                aria-invalid={!!amountError}
                aria-describedby={amountError ? "amount-error" : undefined}
                className="bg-transparent outline-none text-[#EDEBE4] text-lg font-semibold tabular-nums w-full placeholder:text-[#3D4353]"
              />
            </div>
            {amountError ? (
              <p id="amount-error" className="text-xs text-[#D9695B] mb-2">
                {amountError}
              </p>
            ) : (
              <p className="text-xs text-[#4E5568] mb-2">
                Min {formatPKR(MIN_TOPUP)} · Max {formatPKR(MAX_TOPUP)}
              </p>
            )}

            <div className="flex flex-wrap gap-2 mb-6 mt-3">
              {QUICK_AMOUNTS.map((val) => (
                <button
                  key={val}
                  onClick={() => handleAmountChange({ target: { value: String(val) } })}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-medium border transition-colors ${
                    String(val) === amount
                      ? "bg-[#B8923C] text-[#14100A] border-[#B8923C]"
                      : "bg-transparent text-[#B8923C] border-[#3A3020] hover:border-[#B8923C]"
                  }`}
                >
                  +{val.toLocaleString()}
                </button>
              ))}
            </div>

            <button
              onClick={validateAndContinue}
              className="w-full flex items-center justify-center gap-2 bg-[#B8923C] hover:bg-[#C9A24E] text-[#14100A] font-semibold text-sm py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EDEBE4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F141F]"
            >
              Continue
            </button>
          </>
        )}

        {step === 1 && (
          <>
            <h3 className="text-lg font-semibold text-[#EDEBE4] mb-1 text-center sm:text-left">Payment method</h3>
            <p className="text-xs text-[#6B7385] mb-5 text-center sm:text-left">
              Adding {formatPKR(numericAmount)} to your wallet
              {bonus > 0 && <span className="text-[#B8923C]"> · +{formatPKR(bonus)} cashback</span>}
            </p>

            <div className="space-y-2 mb-6" role="radiogroup" aria-label="Payment method">
              {allMethods.map((m) => {
                const selected = m.id === methodId;
                return (
                  <button
                    key={m.id}
                    role="radio"
                    aria-checked={selected}
                    onClick={() => setMethodId(m.id)}
                    className={`w-full flex items-center gap-3 rounded-xl border px-4 py-3 text-left transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#B8923C] ${
                      selected ? "border-[#B8923C] bg-[#B8923C]/[0.06]" : "border-[#242B3A] bg-[#141925] hover:border-[#3A4157]"
                    }`}
                  >
                    <div className="w-9 h-9 rounded-full bg-[#0F141F] border border-[#242B3A] flex items-center justify-center shrink-0">
                      {m.isBank ? <Building2 className="w-4 h-4 text-[#B8923C]" /> : <CreditCard className="w-4 h-4 text-[#B8923C]" />}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm text-[#EDEBE4]">{m.isBank ? m.brand : `${m.brand} •••• ${m.last4}`}</p>
                      <p className="text-xs text-[#6B7385]">{m.isBank ? "Direct bank transfer" : `Expires ${m.expiry}`}</p>
                    </div>
                    <div className={`w-4 h-4 rounded-full border shrink-0 flex items-center justify-center ${selected ? "border-[#B8923C]" : "border-[#3A4157]"}`}>
                      {selected && <div className="w-2 h-2 rounded-full bg-[#B8923C]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <button
              onClick={handleConfirm}
              disabled={submitting}
              className="w-full flex items-center justify-center gap-2 bg-[#B8923C] hover:bg-[#C9A24E] disabled:opacity-70 text-[#14100A] font-semibold text-sm py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EDEBE4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F141F]"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" /> Processing…
                </>
              ) : (
                <>
                  <ArrowUpRight className="w-4 h-4" strokeWidth={2.5} /> Confirm {formatPKR(numericAmount)}
                </>
              )}
            </button>
          </>
        )}

        {step === 2 && (
          <div className="text-center py-2">
            <div className="w-14 h-14 rounded-full bg-[#6FBF9A]/10 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-7 h-7 text-[#6FBF9A]" />
            </div>
            <h3 className="text-lg font-semibold text-[#EDEBE4] mb-1">Top-up successful</h3>
            <p className="text-sm text-[#6B7385] mb-6">
              {formatPKR(numericAmount)} was added via {selectedMethod.isBank ? selectedMethod.brand : `${selectedMethod.brand} •••• ${selectedMethod.last4}`}
            </p>

            <div className="rounded-xl bg-[#141925] border border-[#242B3A] p-4 mb-6 text-left">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6B7385]">Amount</span>
                <span className="text-[#EDEBE4] font-medium tabular-nums">{formatPKR(numericAmount)}</span>
              </div>
              {bonus > 0 && (
                <div className="flex justify-between text-sm mb-2">
                  <span className="text-[#6B7385]">Cashback bonus</span>
                  <span className="text-[#B8923C] font-medium tabular-nums">+{formatPKR(bonus)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm mb-2">
                <span className="text-[#6B7385]">Method</span>
                <span className="text-[#EDEBE4] font-medium">
                  {selectedMethod.isBank ? selectedMethod.brand : `${selectedMethod.brand} •••• ${selectedMethod.last4}`}
                </span>
              </div>
              <div className="h-px bg-[#242B3A] my-2" />
              <div className="flex justify-between text-sm">
                <span className="text-[#6B7385]">New balance</span>
                <span className="text-[#B8923C] font-semibold tabular-nums">{formatPKR(balance)}</span>
              </div>
            </div>

            <button
              onClick={finishFlow}
              className="w-full bg-[#B8923C] hover:bg-[#C9A24E] text-[#14100A] font-semibold text-sm py-3 rounded-xl transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#EDEBE4] focus-visible:ring-offset-2 focus-visible:ring-offset-[#0F141F]"
            >
              Done
            </button>
          </div>
        )}

        {step !== 2 && (
          <div className="flex justify-center mt-6">
            <StepDots step={step} total={2} />
          </div>
        )}
      </div>
    </div>
  );
}

// ============================== Shared bits ==============================

function FormField({ label, error, children, className = "" }) {
  return (
    <div className={`mb-4 ${className}`}>
      <label className="block text-[11px] uppercase tracking-wider text-[#8A93A6] mb-2">{label}</label>
      <div className={`bg-[#141925] border rounded-xl px-4 py-3 transition-colors ${error ? "border-[#D9695B]" : "border-[#242B3A] focus-within:border-[#B8923C]"}`}>
        {children}
      </div>
      {error && <p className="text-xs text-[#D9695B] mt-1">{error}</p>}
    </div>
  );
}

function BalanceSkeleton() {
  return (
    <div className="animate-pulse">
      <div className="rounded-2xl p-6 mb-5 border border-[#242B3A] bg-[#111621]">
        <div className="h-3 w-28 bg-[#242B3A] rounded mb-5" />
        <div className="h-9 w-40 bg-[#242B3A] rounded mb-2" />
        <div className="h-3 w-36 bg-[#242B3A] rounded mb-6" />
        <div className="h-11 w-full bg-[#242B3A] rounded-xl" />
      </div>
      <div className="grid grid-cols-2 gap-3 mb-6">
        <div className="h-16 rounded-xl bg-[#111621] border border-[#242B3A]" />
        <div className="h-16 rounded-xl bg-[#111621] border border-[#242B3A]" />
      </div>
      <div className="h-4 w-28 bg-[#242B3A] rounded mb-3" />
      <div className="space-y-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="h-14 rounded-xl bg-[#111621] border border-[#242B3A]" />
        ))}
      </div>
    </div>
  );
}