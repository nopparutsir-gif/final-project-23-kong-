"use client";

import Link from "next/link";
import CategoryTag from "../../../../components/tailgrids/CategoryTag";
import ProgressControl, {
  getProgressStatus,
  useProgress,
} from "../../../../components/tailgrids/ProgressControl";
import { Table } from "../../../../components/tailgrids/RequestUI";
import StatusTag from "../../../../components/tailgrids/StatusTag";
import type { UnitRequest } from "../mock";

export default function UnitRequestsTable({
  requests,
  selectedCategories,
  selectedStatus,
}: {
  requests: UnitRequest[];
  selectedCategories: string[];
  selectedStatus: "unfinished" | "done" | null;
}) {
  const { values } = useProgress();
  const visibleRequests = requests.filter((request) => {
    if (
      selectedCategories.length > 0 &&
      !selectedCategories.includes(request.category)
    ) {
      return false;
    }

    const status = getProgressStatus(
      request.status,
      request.progress,
      values[request.id]
    );
    return selectedStatus === "done"
      ? status === "เสร็จสิ้น"
      : selectedStatus === "unfinished"
        ? status !== "เสร็จสิ้น"
        : true;
  });

  return (
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
      {visibleRequests.map((request) => (
        <tr key={request.id}>
          <td>
            <Link
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
            <StatusTag
              status={getProgressStatus(
                request.status,
                request.progress,
                values[request.id]
              )}
            />
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
  );
}
