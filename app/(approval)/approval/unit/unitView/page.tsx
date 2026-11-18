import { Suspense } from "react";
import { notFound } from "next/navigation";
import CategoryTag from "../../../../../components/tailgrids/CategoryTag";
import StatusTag from "../../../../../components/tailgrids/StatusTag";
import {
  Card,
  Detail,
  PageHeader,
} from "../../../../../components/tailgrids/RequestUI";
import ProgressControl from "../../../../../components/tailgrids/ProgressControl";
import { IN_UNIT } from "../../mock";

// หน้าแสดงข้อมูลและความคืบหน้าของคำขอที่เลือกจาก unit/page.tsx
export default function UnitViewPage({
  searchParams,
}: PageProps<"/approval/unit/unitView">) {
  return (
    <Suspense fallback={<p className="py-8 text-sm text-ink-2">กำลังโหลดคำขอ...</p>}>
      <UnitViewContent searchParams={searchParams} />
    </Suspense>
  );
}

async function UnitViewContent({
  searchParams,
}: Pick<PageProps<"/approval/unit/unitView">, "searchParams">) {
  // ใช้รหัสที่แนบมากับลิงก์ค้นหาคำขอ; ถ้าไม่พบก็แสดงหน้าไม่พบข้อมูล
  const { id } = await searchParams;
  const requestId = typeof id === "string" ? id : undefined;
  const request = IN_UNIT.find((item) => item.id === requestId);

  if (!request) notFound();

  return (
    <>
      <PageHeader title="รายละเอียดคำขอ" sub={request.id} back="กลับไปคำขอในฝ่าย" backHref="/approval/unit" />
      <div className="split-layout">
        <Card className="split-layout__wide">
          <div className="mb-5">
            <div className="flex flex-wrap items-center gap-2">
              <p className="table__id">{request.id}</p>
              <CategoryTag category={request.category} />
              <StatusTag status={request.status} />
            </div>
            <h2 className="mt-1 text-lg font-semibold">{request.title}</h2>
          </div>
          <Detail
            className="!grid-cols-1 sm:!grid-cols-4"
            rows={[
              ["ผู้ขอ", request.by],
              ["แผนก", request.dept],
              ["ส่งถึง", "แผนก IT"],
              ["วันที่ส่ง", request.date],
            ]}
          />
          <div className="mt-5">
            <h3 className="text-base font-semibold">รายละเอียด</h3>
            <p className="mt-1 text-sm text-slate-600">{request.title}</p>
          </div>
        </Card>
        <Card className="h-fit">
          <h3 className="font-semibold">ความคืบหน้างาน</h3>
          {/* ใช้ ProgressControl ร่วมกับ unit/layout.tsx; ค่าที่เปลี่ยนยังเป็นข้อมูลชั่วคราวในหน้าเว็บ */}
          <div className="mt-5">
            <ProgressControl
              requestId={request.id}
              initialProgress={request.progress}
            />
          </div>
        </Card>
      </div>
    </>
  );
}
