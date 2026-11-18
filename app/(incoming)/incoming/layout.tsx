import AppShell from "../../../components/tailgrids/AppShell";

// ทุกหน้าในส่วนรับคำขอเข้าแผนกจะใช้กรอบนี้ร่วมกัน โดยมีเมนูของผู้ใช้แผนกอยู่รอบเนื้อหาหน้า
export default function IncomingLayout({
  children,
}: LayoutProps<"/incoming">) {
  return <AppShell role="dept">{children}</AppShell>;
}
