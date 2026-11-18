import AppShell from "../../../components/tailgrids/AppShell";

// ทุกหน้าในส่วนอนุมัติจะใช้กรอบนี้ร่วมกัน โดยมีเมนูของหัวหน้าหน่วยงานอยู่รอบเนื้อหาหน้า
export default function ApprovalsLayout({
  children,
}: LayoutProps<"/approval">) {
  return <AppShell role="unit">{children}</AppShell>;
}
