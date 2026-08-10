import React, { useState } from "react";
import Sidebar from "./UserDashBoard/SideBar";
import Home from "./UserDashBoard/Home";
import OrderHistory from "./UserDashBoard/OrderHistory";
import TrackOrder from "./UserDashBoard/TrackOrder";
import Wishlist from "./UserDashBoard/Wishlist";
import Profile from "./UserDashBoard/Profile";
import Wallet from "./Wallets/Wallet";

const PAGES = {
  home: Home,
  orders: OrderHistory,
  track: TrackOrder,
  wishlist: Wishlist,
  profile: Profile,
};

export default function App() {
  const [active, setActive] = useState("home");
  const Page = PAGES[active];

  return (
    <div className="flex h-screen w-full bg-slate-50 font-sans">
      <Sidebar active={active} onNavigate={setActive} />
      <Page />
    </div>
    // <Wallet />

  );
}
