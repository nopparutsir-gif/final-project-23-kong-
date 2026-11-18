import { Suspense } from "react";
import { connection } from "next/server";
import ApprovalDashboard from "./approvalsView/ApprovalDashboard";
import { IN_UNIT } from "./mock";

// หน้าแรกของงานอนุมัติ แสดงจำนวนงานและรายการที่รอหัวหน้าพิจารณา
export default function ApprovalsPage() {
  return (
    <Suspense fallback={<p className="py-8 text-sm text-ink-2">กำลังโหลดรายการ...</p>}>
      <ApprovalsContent />
    </Suspense>
  );
}

async function ApprovalsContent() {
  // ใช้วันเวลาปัจจุบันเพื่อให้ยอด "เดือนนี้" เปลี่ยนตามเดือนปัจจุบัน
  await connection();
  const currentMonthYear = new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
    month: "short",
    year: "numeric",
    timeZone: "Asia/Bangkok",
  }).format(new Date());
  const countThisMonth = (status: string) =>
    IN_UNIT.filter(
      (request) =>
        request.status === status && request.date.includes(currentMonthYear),
    ).length;

  return (
    <ApprovalDashboard
      approvedThisMonth={countThisMonth("อนุมัติแล้ว")}
      returnedThisMonth={countThisMonth("ไม่อนุมัติ")}
      currentMonthYear={currentMonthYear}
    />
  );
}