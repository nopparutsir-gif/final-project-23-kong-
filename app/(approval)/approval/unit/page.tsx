import { Suspense } from "react";
import CategoryFilter, {
  CATEGORY_OPTIONS,
} from "../../../../components/tailgrids/CategoryFilter";
import { PageHeader } from "../../../../components/tailgrids/RequestUI";
import { IN_UNIT } from "../mock";
import UnitRequestsTable from "./UnitRequestsTable";

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
      <UnitRequestsTable
        requests={IN_UNIT}
        selectedCategories={selectedCategories}
        selectedStatus={selectedStatus}
      />
    </>
  );
}
