"use client";

import { Suspense, use, useState } from "react";
import { notFound, useRouter } from "next/navigation";
import { CheckCircle1 } from "@tailgrids/icons";
import { Badge, Button, Card, Detail, Field, PageHeader } from "../../../../components/tailgrids/RequestUI";
import { Checkbox } from "../../../../components/tailgrids/core/checkbox";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxInputWrapper,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "../../../../components/tailgrids/core/combobox";
import CategoryTag from "../../../../components/tailgrids/CategoryTag";
import StatusTag from "../../../../components/tailgrids/StatusTag";
import { markIncomingDone } from "../incomingView/IncomingDashboard";
import { FORWARD_TO, INCOMING } from "../mock";

// หน้าปฏิเสธหรือส่งต่อคำขอ จำตัวเลือกและข้อความที่กรอกไว้ระหว่างใช้งาน
export default function DepartmentRejectPage({
  searchParams,
}: PageProps<"/incoming/incomingReject">) {
  return (
    <Suspense fallback={<p className="py-8 text-sm text-ink-2">กำลังโหลดคำขอ...</p>}>
      <DepartmentRejectContent searchParams={searchParams} />
    </Suspense>
  );
}

function DepartmentRejectContent({
  searchParams,
}: Pick<PageProps<"/incoming/incomingReject">, "searchParams">) {
  // อ่านรหัสจากลิงก์แล้วค้นหารายการในข้อมูลตัวอย่าง
  const { id } = use(searchParams);
  const requestId = typeof id === "string" ? id : undefined;
  const request = INCOMING.find((item) => item.id === requestId);

  if (!request) notFound();

  return (
    <>
      <PageHeader title="ส่งต่อ / ปฏิเสธคำขอ" back="กลับไปคำขอเข้าแผนก" backHref="/incoming" />
      <div className="split-layout">
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
        <ForwardRejectForm
          key={request.id}
          requestId={request.id}
          backHref="/incoming"
        />
      </div>
    </>
  );
}

function ForwardRejectForm({
  requestId,
  backHref,
}: {
  requestId: string;
  backHref: string;
}) {
  const router = useRouter();
  // เก็บตัวเลือก เหตุผล และปลายทางไว้ชั่วคราวระหว่างกรอกฟอร์ม
  const [action, setAction] = useState<"forward" | "reject" | null>(null);
  const [to, setTo] = useState("");
  const [reason, setReason] = useState("");
  const [done, setDone] = useState<"forward" | "reject" | null>(null);
  const canSubmit =
    action === "forward"
      ? Boolean(to)
      : action === "reject"
        ? reason.trim().length > 0
        : false;

  // ปุ่มยืนยันจะกดได้เมื่อเลือกปลายทางหรือพิมพ์เหตุผลครบตามแบบที่เลือก
  // เมื่อยืนยัน รายการจะหายจากหน้ารับคำขอจนกว่าจะรีเฟรชหน้า
  const toggleAction = (nextAction: "forward" | "reject") => {
    setAction((current) => (current === nextAction ? null : nextAction));
  };

  return (
    <Card className="split-layout__wide">
      {/* หลังยืนยัน แสดงผลที่เลือกและปุ่มกลับไปหน้ารายการ */}
      {done ? (
        <div className="py-8 text-center">
          <Badge>{done === "forward" ? "กำลังดำเนินการ" : "ไม่อนุมัติ"}</Badge>
          <p className="mt-3 text-sm">
            {done === "forward" ? `ส่งต่อให้ ${to} แล้ว` : "ปฏิเสธคำขอและแจ้งผู้ขอแล้ว"}
          </p>
          <Button variant="outline" className="mt-4" onPress={() => router.push(backHref)}>
            กลับไปรายการ
          </Button>
        </div>
      ) : (
        // เลือกได้ครั้งละแบบ: ปฏิเสธพร้อมเหตุผล หรือส่งต่อไปแผนกอื่น
        <div className="space-y-4">
          <h2 className="font-semibold">ไม่รับงานนี้</h2>

          <Card className="border border-slate-200 p-4">
            <label htmlFor="reject-with-reason" className="flex cursor-pointer items-center gap-3">
              <Checkbox
                id="reject-with-reason"
                checked={action === "reject"}
                onChange={() => toggleAction("reject")}
              />
              <span className="font-medium">ปฏิเสธพร้อมเหตุผล</span>
            </label>
            <div className="mt-4">
              <Field label="เหตุผล *">
                <textarea
                  rows={4}
                  className="input"
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  placeholder="ระบุเหตุผลที่ไม่สามารถดำเนินการได้"
                  disabled={action !== "reject"}
                  required={action === "reject"}
                />
              </Field>
            </div>
          </Card>

          <Card className="border border-slate-200 p-4">
            <label htmlFor="forward-to-department" className="flex cursor-pointer items-start gap-3">
              <Checkbox
                id="forward-to-department"
                checked={action === "forward"}
                onChange={() => toggleAction("forward")}
              />
              <span className="font-medium">
                ส่งต่อแผนกอื่น (ผู้ขอเลือกแผนกผิด)
              </span>
            </label>
            <div className="mt-4">
              <Field label="ส่งต่อไปที่">
                <Combobox
                  selectedKey={to || null}
                  onSelectionChange={(key) => setTo(key === null ? "" : String(key))}
                  isDisabled={action !== "forward"}
                >
                  <ComboboxInputWrapper>
                    <ComboboxInput placeholder="เลือกแผนกปลายทาง" />
                    <ComboboxTrigger />
                  </ComboboxInputWrapper>
                  <ComboboxContent>
                    <ComboboxList emptyMessage="ไม่พบแผนกปลายทาง">
                      {FORWARD_TO.map((department) => (
                        <ComboboxItem key={department} id={department}>
                          {department}
                        </ComboboxItem>
                      ))}
                    </ComboboxList>
                  </ComboboxContent>
                </Combobox>
              </Field>
            </div>
          </Card>

          <div className="flex justify-end gap-3 pt-1">
            <Button variant="outline" onPress={() => router.push(backHref)}>ยกเลิก</Button>
            <Button
              variant="danger"
              disabled={!canSubmit}
              onPress={() => {
                if (action === "forward" && to) {
                  markIncomingDone(requestId);
                  setDone("forward");
                } else if (action === "reject" && reason.trim()) {
                  markIncomingDone(requestId);
                  setDone("reject");
                }
              }}
            >
              ยืนยัน
            </Button>
          </div>
        </div>
      )}
    </Card>
  );
}
