import { Suspense } from "react";
import CategoryFilter, {
  CATEGORY_OPTIONS,
} from "../../../../components/tailgrids/CategoryFilter";
import { PageHeader } from "../../../../components/tailgrids/RequestUI";
import { IN_DEPT } from "../mock";
import DepartmentRequestsTable from "./DepartmentRequestsTable";

// หน้ารวมงานที่อยู่ในความดูแลของแผนก เลือกดูตามหมวดและสถานะได้
export default function DepartmentRequestsPage({
  searchParams,
}: PageProps<"/incoming/dept">) {
  return (
    // แสดงข้อความระหว่างอ่านตัวเลือกกรองที่อยู่ใน URL
    <Suspense fallback={<p className="py-8 text-sm text-ink-2">กำลังโหลดรายการ...</p>}>
      <DepartmentRequestsContent searchParams={searchParams} />
    </Suspense>
  );
}

async function DepartmentRequestsContent({
  searchParams,
}: Pick<PageProps<"/incoming/dept">, "searchParams">) {
  // อ่านตัวกรองจาก URL เพื่อให้การเลือกหมวด/สถานะอยู่ในลิงก์
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
        title="คำขอในแผนก"
        sub="งานทั้งหมดที่อยู่ในความดูแลของแผนก"
        statusFilter={{
          hrefBase: "/incoming/dept",
          selectedCategories,
          selectedStatus,
        }}
      />
      <CategoryFilter
        hrefBase="/incoming/dept"
        selectedCategories={selectedCategories}
        selectedStatus={selectedStatus}
      />
      <DepartmentRequestsTable
        requests={IN_DEPT}
        selectedCategories={selectedCategories}
        selectedStatus={selectedStatus}
      />
    </>
  );
}
