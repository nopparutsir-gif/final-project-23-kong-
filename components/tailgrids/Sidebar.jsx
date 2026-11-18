// components/Sidebar.jsx — แถบเมนูด้านซ้าย
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  BarChart2,
  BoxArchive1,
  ClockThree,
  FileText,
  FileTextMultiple,
  Plus,
  UserMultiple4,
} from "@tailgrids/icons";
import RoleBadge from "./role-badge";

const ICONS = {
  clock: ClockThree,
  list: FileTextMultiple,
  inbox: BoxArchive1,
  plus: Plus,
  chart: BarChart2,
  users: UserMultiple4,
  doc: FileText,
};
export const Icon = ({ name, size = 18 }) => {
  const IconComponent = ICONS[name];
  return <IconComponent size={size} className="shrink-0" aria-hidden="true" />;
};

export default function Sidebar({ menuGroups, role, onNavigate, user, open }) {
  const pathname = usePathname();

  return (
    <aside className={`sidebar ${open ? "sidebar--open" : ""}`}>
      <div className="sidebar__brand"><span className="sidebar__logo"><Icon name="doc" /></span>ระบบจัดการคำขอ</div>

      <nav className="sidebar__nav">
        {menuGroups.map((group) => (
          <div className="sidebar__group" key={group.key}>
            <h2 className="sidebar__group-title">{group.label}</h2>
            {group.menu.map((m) => (
              <Link
                key={m.key}
                href={m.href}
                onClick={onNavigate}
                className={`nav-item ${m.activePaths.includes(pathname) ? "nav-item--active" : ""}`}
              >
                <Icon name={m.icon} />{m.label}
                {m.count ? <span className="nav-item__count">{m.count}</span> : null}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="sidebar__user">
        <div className="avatar">{user.name[0]}</div>
        <div className="min-w-0">
          <div className="truncate text-sm font-medium text-white">{user.name}</div>
          <RoleBadge role={role === "unit" ? "approver" : "head"} className="mt-1" />
        </div>
      </div>
    </aside>
  );
}
