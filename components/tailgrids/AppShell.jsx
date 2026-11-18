"use client";

import { useState } from "react";
import Sidebar from "./Sidebar";
import { MENU_GROUPS } from "./navigation";

const USERS = {
  unit: { name: "กรกฎ พัฒนา" },
  dept: { name: "มาลี สุขสันต์" },
};

export default function AppShell({ role, children }) {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      {navOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setNavOpen(false)}
        />
      )}
      <Sidebar
        menuGroups={MENU_GROUPS}
        role={role}
        user={USERS[role]}
        open={navOpen}
        onNavigate={() => setNavOpen(false)}
      />
      <div className="app-main">
        <header className="app-topbar">
          <button
            className="btn btn--outline lg:hidden"
            onClick={() => setNavOpen(true)}
            aria-label="เปิดเมนู"
          >
            เมนู
          </button>
        </header>
        <main className="app-content" onClick={() => navOpen && setNavOpen(false)}>
          {children}
        </main>
      </div>
    </>
  );
}
