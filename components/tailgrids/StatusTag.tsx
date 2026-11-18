import { Badge } from "./core/badge";

const STATUS_LABELS: Record<string, string> = {
  "อนุมัติแล้ว": "รอแผนกปลายทาง",
  "ไม่อนุมัติ": "ปฏิเสธ",
  "รอดำเนินการ": "รอแผนกปลายทาง",
};

const STATUS_COLORS: Record<
  string,
  "warning" | "purple" | "gray" | "error" | "blue" | "cyan" | "success"
> = {
  "รออนุมัติ": "warning",
  "ส่งกลับแก้ไข": "purple",
  "รอแผนกปลายทาง": "gray",
  "ปฏิเสธ": "error",
  "กำลังดำเนินการ": "blue",
  "รอตรวจรับ": "cyan",
  "เสร็จสิ้น": "success",
  "เกินกำหนด": "error",
};

export default function StatusTag({ status }: { status: string }) {
  const label = STATUS_LABELS[status] ?? status;

  return (
    <Badge
      color={STATUS_COLORS[label] ?? "gray"}
      className={label === "เกินกำหนด" ? "bg-red-600 text-white" : ""}
    >
      {label}
    </Badge>
  );
}
