import { Suspense } from "react";
import CategoryFilter, {
  CATEGORY_OPTIONS,
} from "../../../../components/tailgrids/CategoryFilter";
import CategoryTag from "../../../../components/tailgrids/CategoryTag";
import ProgressControl from "../../../../components/tailgrids/ProgressControl";
import { PageHeader, Table } from "../../../../components/tailgrids/RequestUI";
import StatusTag from "../../../../components/tailgrids/StatusTag";
import { IN_DEPT } from "../mock";

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
  // แสดงเฉพาะงานที่ตรงกับตัวกรองที่เลือก
  const categoryFilteredRequests =
    selectedCategories.length === 0
      ? IN_DEPT
      : IN_DEPT.filter((request) =>
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
      <Table
        cols={[
          "เรื่อง",
          "หมวด",
          "ผู้ขอ",
          "สถานะ",
          "ความคืบหน้า",
          "อัปเดต",
        ]}
      >
        {requests.map((request) => (
          <tr key={request.id}>
            <td>
              <div className="font-medium">{request.title}</div>
              <div className="mt-1 text-xs text-slate-500">
                {request.id}
              </div>
            </td>
            <td>
              <CategoryTag category={request.category} />
            </td>
            <td>{request.owner}</td>
            <td>
              <StatusTag status={request.status} />
            </td>
            <td>
              <ProgressControl initialProgress={request.progress} />
            </td>
            <td>{request.date}</td>
          </tr>
        ))}
      </Table>
    </>
  );
}
