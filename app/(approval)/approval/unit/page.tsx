import { Suspense } from "react";
import Link from "next/link";
import CategoryFilter, {
  CATEGORY_OPTIONS,
} from "../../../../components/tailgrids/CategoryFilter";
import CategoryTag from "../../../../components/tailgrids/CategoryTag";
import ProgressControl from "../../../../components/tailgrids/ProgressControl";
import {
  PageHeader,
  Table,
} from "../../../../components/tailgrids/RequestUI";
import StatusTag from "../../../../components/tailgrids/StatusTag";
import { IN_UNIT } from "../mock";

// หน้ารวมคำขอในหน่วยงาน เลือกกรองตามหมวดและสถานะได้
export default function UnitRequestsPage({
  searchParams,
}: PageProps<"/approval/unit">) {
  return (
    // ระหว่างอ่านตัวเลือกกรองจาก URL ให้แสดงข้อความกำลังโหลด
    <Suspense fallback={<p className="py-8 text-sm text-ink-2">กำลังโหลดรายการ...</p>}>
      <UnitRequestsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function UnitRequestsContent({
  searchParams,
}: Pick<PageProps<"/approval/unit">, "searchParams">) {
  // อ่านตัวเลือกกรองจากลิงก์ เพื่อให้กลับมาแล้วเห็นรายการแบบเดิมได้
  const {
    category: categoryParam,
    completion: completionParam,
  } = await searchParams;
  const categoryValues =
    typeof categoryParam === "string"
      ? [categoryParam]
      : categoryParam ?? [];
  const selectedCategories = [
    ...new Set(
      categoryValues.filter((category) => CATEGORY_OPTIONS.includes(category))
    ),
  ];
  const selectedStatus =
    completionParam === "unfinished" || completionParam === "done"
      ? completionParam
      : null;
  // กรองหมวดก่อน แล้วค่อยกรองว่าเสร็จแล้วหรือยังไม่เสร็จ
  const categoryFilteredRequests =
    selectedCategories.length === 0
      ? IN_UNIT
      : IN_UNIT.filter((request) =>
          selectedCategories.includes(request.category)
        );
  const requests = categoryFilteredRequests.filter((request) =>
    selectedStatus === "done"
      ? request.status === "เสร็จสิ้น"
      : selectedStatus === "unfinished"
        ? request.status !== "เสร็จสิ้น"
        : true
  );

  return (
    <>
      <PageHeader
        title="คำขอในฝ่าย"
        sub="คำขอทั้งหมดของหน่วยงานที่คุณดูแล"
        statusFilter={{
          hrefBase: "/approval/unit",
          selectedCategories,
          selectedStatus,
        }}
      />
      <CategoryFilter
        hrefBase="/approval/unit"
        selectedCategories={selectedCategories}
        selectedStatus={selectedStatus}
      />
      <Table
        cols={[
          "เรื่อง",
          "หมวด",
          "ผู้ขอ",
          "ส่งถึง",
          "สถานะ",
          "ความคืบหน้า",
          "อัปเดต",
        ]}
      >
        {requests.map((request) => (
          <tr key={request.id}>
            <td>
              <Link
                // เลือกรายการเพื่อไปหน้ารายละเอียด unit/unitView/page.tsx
                href={`/approval/unit/unitView?id=${encodeURIComponent(request.id)}`}
                className="group block"
              >
                <div className="font-medium group-hover:underline">
                  {request.title}
                </div>
                <div className="mt-1 text-xs text-slate-500 group-hover:text-brand">
                  {request.id}
                </div>
              </Link>
            </td>
            <td>
              <CategoryTag category={request.category} />
            </td>
            <td>{request.by}</td>
            <td>แผนก IT</td>
            <td>
              <StatusTag status={request.status} />
            </td>
            <td>
              <ProgressControl
                requestId={request.id}
                initialProgress={request.progress}
              />
            </td>
            <td>{request.date}</td>
          </tr>
        ))}
      </Table>
    </>
  );
}
