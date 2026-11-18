import { Suspense } from "react";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Calendar,
  CheckCircle1,
  Eye,
  Layers2,
  Plus,
} from "@tailgrids/icons";
import {
  Button,
  Card,
  Detail,
  Field,
  PageHeader,
  Progress,
} from "../../../../components/tailgrids/RequestUI";
import CategoryTag from "../../../../components/tailgrids/CategoryTag";
import StatusTag from "../../../../components/tailgrids/StatusTag";
import { TaskAssigneeCombobox } from "./AssignmentControls";
import { CompleteIncomingLink } from "../IncomingDashboard";
import { INCOMING } from "../mock";

// หน้ารายละเอียดสำหรับรับคำขอและวางแผนแบ่งงานให้ทีม จากปุ่มใน incoming/page.tsx
export default function IncomingViewPage({
  searchParams,
}: PageProps<"/incoming/incomingView">) {
  return (
    <Suspense fallback={<p className="py-8 text-sm text-ink-2">กำลังโหลดคำขอ...</p>}>
      <IncomingViewContent searchParams={searchParams} />
    </Suspense>
  );
}

async function IncomingViewContent({
  searchParams,
}: Pick<PageProps<"/incoming/incomingView">, "searchParams">) {
  const { id } = await searchParams;
  const requestId = typeof id === "string" ? id : undefined;
  const request = INCOMING.find((item) => item.id === requestId);

  if (!request) notFound();

  return (
    <>
      <PageHeader title="รายละเอียดคำขอ" back="กลับไปคำขอเข้าแผนก" backHref="/incoming" />
      <Card className="h-fit">
        <div className="flex flex-wrap items-center gap-2">
          <p className="table__id text-xs">{request.id}</p>
          <StatusTag status="รอแผนกปลายทาง" />
          <CategoryTag category={request.category} />
        </div>
        <h2 className="mt-1 font-semibold">{request.title}</h2>
        <Detail
          className="mt-4 !grid-cols-1 sm:!grid-cols-3"
          rows={[
            ["ผู้ขอ", request.requester],
            ["ส่งถึง", request.destination],
            ["วันที่ต้องการ", request.requestedDate],
          ]}
        />
        <p className="mt-4 flex items-center gap-1.5 text-xs text-green-700">
          <CheckCircle1 size={14} className="shrink-0" aria-hidden="true" />
          <span>
            อนุมัติโดย {request.approvedBy} ({request.approverRole}) · {request.approvedDate}
          </span>
        </p>
      </Card>
      <TaskBreakdownCard requestId={request.id} />
    </>
  );
}

const TASK_GROUPS = [
  // งานหลักและงานย่อยตัวอย่างที่แสดงให้แบ่งงาน
  {
    title: "วางแผน",
    subtasks: [
      "รวบรวมความต้องการและกำหนดขอบเขตงาน",
      "จัดทำแผนการดำเนินงานและกำหนดระยะเวลา",
    ],
  },
  {
    title: "พัฒนา",
    subtasks: [
      "พัฒนางานตามแผนที่กำหนด",
      "ตรวจสอบและปรับปรุงผลงาน",
    ],
  },
  {
    title: "ทดสอบ",
    subtasks: ["ทดสอบการทำงานและตรวจสอบผลลัพธ์"],
  },
];

const TEAM_WORKLOAD = [
  { name: "อรุณี แสงทอง", tasks: 3, progress: 60 },
  { name: "ชัยวัฒน์ มีสุข", tasks: 2, progress: 40 },
  { name: "พิมพ์ลดา คงเจริญ", tasks: 4, progress: 80 },
  { name: "ณัฐพล ทองดี", tasks: 1, progress: 20 },
];

function getTodayDateInputValue() {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Bangkok",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(new Date());
  const getPart = (type: "year" | "month" | "day") => {
    const value = parts.find((part) => part.type === type)?.value;
    if (!value) throw new Error(`Missing ${type} in current date.`);
    return value;
  };

  return `${getPart("year")}-${getPart("month")}-${getPart("day")}`;
}

function TaskBreakdownCard({ requestId }: { requestId: string }) {
  const minDate = getTodayDateInputValue();
  return (
    <div className="mt-4 grid items-start gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(18rem,1fr)]">
      <Card className="min-w-0">
        <h2 className="mb-1 font-semibold">แตกงานเป็นงานหลักและงานย่อย</h2>
        <div className="space-y-4">
          {TASK_GROUPS.map((task) => (
            <Card
              key={task.title}
              className="border border-slate-200 bg-slate-50 p-4"
            >
              <div className="flex items-center justify-between gap-3">
                <h3 className="flex items-center gap-2 font-semibold text-slate-800">
                  <Layers2 size={18} className="text-[#4338CA]" aria-hidden="true" />
                  งานหลัก: {task.title}
                </h3>
                <span className="inline-flex shrink-0 items-center gap-1 text-xs text-[#4338CA]">
                  <Eye size={16} aria-hidden="true" />
                  ผู้ขอเห็น
                </span>
              </div>

              <div className="space-y-3">
                {task.subtasks.map((subtask, index) => (
                  <div
                    key={subtask}
                    className="grid gap-3 rounded-lg border border-slate-200 bg-white p-3 md:grid-cols-3"
                  >
                    <div className="min-w-0">
                      <p className="field__label">งานย่อย {index + 1}</p>
                      <p className="text-sm text-slate-700">{subtask}</p>
                    </div>
                    <Field label="ผู้รับผิดชอบงาน">
                      <TaskAssigneeCombobox assignmentId={subtask} />
                    </Field>
                    <Field label="กำหนดเสร็จ">
                      <div className="relative">
                        <Calendar
                          size={16}
                          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-500"
                          aria-hidden="true"
                        />
                        <input
                          type="date"
                          className="input pl-10"
                          min={minDate}
                          aria-label={`กำหนดเสร็จ งานย่อย ${index + 1}`}
                        />
                      </div>
                    </Field>
                  </div>
                ))}
              </div>

              <Button
                variant="ghost"
                disabled
                className="self-start text-sm"
              >
                <Plus size={16} aria-hidden="true" />
                เพิ่มงานย่อย
              </Button>
            </Card>
          ))}
        </div>
        <Button
          variant="outline"
          disabled
          className="self-start gap-4 border border-black text-black disabled:!border-black disabled:!bg-white disabled:!text-black"
        >
          <Plus size={16} aria-hidden="true" />
          เพิ่มงานหลัก
        </Button>
      </Card>

      <aside className="space-y-4">
        <Card>
          <h2 className="font-semibold">ภาระงานของทีมตอนนี้</h2>
          <div className="space-y-4">
            {TEAM_WORKLOAD.map((member) => (
              <div key={member.name}>
                <div className="mb-2 flex items-center justify-between gap-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <span className="avatar shrink-0" aria-hidden="true">
                      {member.name.slice(0, 1)}
                    </span>
                    <span className="truncate text-sm font-medium text-slate-800">
                      {member.name}
                    </span>
                  </div>
                  <span className="shrink-0 text-xs text-slate-500">
                    {member.tasks} งาน
                  </span>
                </div>
                <Progress value={member.progress} />
              </div>
            ))}
          </div>
        </Card>

        <Card className="flex flex-col gap-2">
          <div className="flex flex-col gap-2">
            {/* ยืนยันรับงานแล้วกลับไปหน้ารายการ ซึ่งจะซ่อนคำขอนี้ชั่วคราว */}
            <CompleteIncomingLink requestId={requestId} />
            <Link
              href="/incoming"
              className="inline-flex w-full items-center justify-center gap-3 rounded-lg border border-black bg-white px-4 py-2.5 font-medium text-black transition hover:bg-slate-50 focus:outline-none focus-visible:ring-2 focus-visible:ring-slate-500"
            >
              ยกเลิก
            </Link>
          </div>
        </Card>
      </aside>
    </div>
  );
}
