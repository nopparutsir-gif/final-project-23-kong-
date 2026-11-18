import { Suspense } from "react";
import { notFound } from "next/navigation";
import { Eye, FileTextMultiple } from "@tailgrids/icons";
import CategoryTag from "../../../../components/tailgrids/CategoryTag";
import {
  Badge,
  Card,
  Detail,
  PageHeader,
} from "../../../../components/tailgrids/RequestUI";
import { ApprovalDecisionPanel } from "./ApprovalDashboard";
import { PENDING } from "../mock";

// หน้ารายละเอียดที่เปิดจากปุ่ม "พิจารณา" ใน approval/page.tsx
export default function ApprovalsViewPage({
  searchParams,
}: PageProps<"/approval/approvalsView">) {
  return (
    // ระหว่างรออ่านข้อมูลจาก URL ให้แสดงข้อความกำลังโหลด
    <Suspense
      fallback={<p className="py-8 text-sm text-ink-2">กำลังโหลดคำขอ...</p>}
    >
      <ApprovalsViewContent searchParams={searchParams} />
    </Suspense>
  );
}

async function ApprovalsViewContent({
  searchParams,
}: Pick<PageProps<"/approval/approvalsView">, "searchParams">) {
  // อ่านรหัสคำขอจากลิงก์ที่กดมาจากหน้า /approval
  const { id } = await searchParams;
  const requestId = typeof id === "string" ? id : undefined;
  // ใช้รหัสค้นหารายการในข้อมูลตัวอย่าง ถ้าไม่มีรายการนี้ให้แสดงหน้าไม่พบข้อมูล
  const request = PENDING.find((item) => item.id === requestId);

  if (!request) notFound();

  return (
    <>
      <PageHeader
        title="พิจารณาคำขอ"
        sub={request.id}
        back="กลับไปรอการอนุมัติ"
        backHref="/approval"
      />
      <div className="split-layout">
        {/* ฝั่งซ้ายแสดงข้อมูลคำขอ ส่วนฝั่งขวาเป็นปุ่มให้เลือกผลพิจารณา */}
        <Card className="split-layout__wide">
          <div className="mb-5">
            <div className="flex flex-wrap items-center gap-2">
              <p className="table__id">{request.id}</p>
              <CategoryTag category={request.category} />
              <Badge>รออนุมัติ</Badge>
            </div>
            <h2 className="mt-1 text-lg font-semibold">{request.title}</h2>
          </div>
          <Detail
            className="!grid-cols-1 sm:!grid-cols-4"
            rows={[
              ["ผู้ขอ", request.by],
              ["แผนก", request.dept],
              ["วันที่ส่ง", request.date],
              ["วันที่ต้องการ", "ยังไม่ระบุ"],
            ]}
          />
          <div className="mt-5">
            <h3 className="text-base font-semibold">รายละเอียด</h3>
            <p className="mt-1 text-sm text-slate-600">{request.title}</p>
          </div>
          <div className="mt-6">
            <div className="cell-sub">เอกสารแนบ</div>
            <div className="card mt-2 flex items-center justify-between gap-4 px-3 py-2">
              <div className="flex min-w-0 items-center gap-3">
                <FileTextMultiple
                  size={20}
                  className="shrink-0 text-[#4338CA]"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium">ใบเสนอราคา.pdf</p>
                  <p className="cell-sub">245 KB</p>
                </div>
              </div>
              <span className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-[#4338CA]">
                <Eye size={18} aria-hidden="true" />
                เปิดดู
              </span>
            </div>
          </div>
        </Card>
        <ApprovalDecisionPanel requestId={request.id} />
      </div>
    </>
  );
}
