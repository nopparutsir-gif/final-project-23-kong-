type MenuIcon = "clock" | "list" | "inbox";

interface MenuItem {
  key: string;
  label: string;
  icon: MenuIcon;
  href: string;
  activePaths: string[];
}

interface MenuGroup {
  key: string;
  label: string;
  menu: MenuItem[];
}

export const MENU_GROUPS: MenuGroup[] = [
  {
    key: "unit",
    label: "หัวหน้าต้นสังกัด",
    menu: [
      {
        key: "pending",
        label: "รอการอนุมัติ",
        icon: "clock",
        href: "/approval",
        activePaths: ["/approval", "/approval/approvalsView"],
      },
      {
        key: "unit",
        label: "คำขอในฝ่าย",
        icon: "list",
        href: "/approval/unit",
        activePaths: ["/approval/unit", "/approval/unit/unitView"],
      },
    ],
  },
  {
    key: "dept",
    label: "หัวหน้าแผนก",
    menu: [
      {
        key: "incoming",
        label: "คำขอเข้าแผนก",
        icon: "inbox",
        href: "/incoming",
        activePaths: ["/incoming", "/incoming/incomingView", "/incoming/incomingReject"],
      },
      {
        key: "indept",
        label: "คำขอในแผนก",
        icon: "list",
        href: "/incoming/dept",
        activePaths: ["/incoming/dept"],
      },
    ],
  },
];
