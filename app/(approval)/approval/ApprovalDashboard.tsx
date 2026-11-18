"use client";

import { useState, useSyncExternalStore, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Check } from "@tailgrids/icons";
import { Checkbox } from "@/components/tailgrids/core/checkbox";
import { Label } from "@/components/tailgrids/core/label";
import CategoryTag from "../../../components/tailgrids/CategoryTag";
import {
  Badge,
  Button,
  Card,
  Field,
  PageHeader,
} from "../../../components/tailgrids/RequestUI";
import LinkButton from "../../../components/tailgrids/LinkButton";
import { PENDING } from "./mock";

type ApprovalDecision = {
  result: "ok" | "no";
  decidedAt: string;
  comment?: string;
};

const EMPTY_DECISIONS: Record<string, ApprovalDecision> = {};
// เก็บผลระหว่างเปลี่ยนหน้า แต่รีเฟรชแล้วเริ่มใหม่
let decisions: Record<string, ApprovalDecision> = EMPTY_DECISIONS;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getDecisions() {
  return decisions;
}

function getServerDecisions() {
  return EMPTY_DECISIONS;
}

function useApprovalDecisions() {
  return useSyncExternalStore(subscribe, getDecisions, getServerDecisions);
}

function saveDecision(requestId: string, decision: ApprovalDecision) {
  decisions = { ...decisions, [requestId]: decision };
  listeners.forEach((listener) => listener());
}

export default function ApprovalDashboard({
  approvedThisMonth,
  returnedThisMonth,
  currentMonthYear,
}: {
  approvedThisMonth: number;
  returnedThisMonth: number;
  currentMonthYear: string;
}) {
  const decisions = useApprovalDecisions();
  const pendingRequests = PENDING.filter(
    (request) => !decisions[request.id],
  );
  const formatMonthYear = (date: string) =>
    new Intl.DateTimeFormat("th-TH-u-ca-buddhist", {
      month: "short",
      year: "numeric",
      timeZone: "Asia/Bangkok",
    }).format(new Date(date));
  const currentMonthDecisions = Object.values(decisions).filter(
    (decision) => formatMonthYear(decision.decidedAt) === currentMonthYear,
  );
  const summaries = [
    {
      label: "รออนุมัติ",
      count: pendingRequests.length,
      color: "bg-amber-500",
    },
    {
      label: "อนุมัติเดือนนี้",
      count:
        approvedThisMonth +
        currentMonthDecisions.filter((decision) => decision.result === "ok")
          .length,
      color: "bg-green-500",
    },
    {
      label: "ส่งกลับเดือนนี้",
      count:
        returnedThisMonth +
        currentMonthDecisions.filter((decision) => decision.result === "no")
          .length,
      color: "bg-[#3730A3]",
    },
  ];

  return (
    <>
      <PageHeader title="รอการอนุมัติ" sub="คำขอที่กำลังรอพิจารณาจากคุณ" />
      {/* ตัวเลขสรุปคำนวณจากรายการตัวอย่างใน mock.ts */}
      <dl className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {summaries.map((summary) => (
          <Card key={summary.label} className="!min-w-0">
            <dt className="flex items-center gap-2 text-sm text-slate-500">
              <span
                className={`size-2 rounded-full ${summary.color}`}
                aria-hidden="true"
              />
              {summary.label}
            </dt>
            <dd className="mt-1 text-3xl font-semibold text-slate-900">
              {summary.count}
            </dd>
          </Card>
        ))}
      </dl>
      <div className="space-y-4">
        {pendingRequests.length === 0 ? (
          <Card className="text-center text-sm text-slate-600">
            ไม่มีคำขอรออนุมัติ
          </Card>
        ) : (
          pendingRequests.map((request) => (
            <Card key={request.id} pad={false} className="p-3 sm:p-4">
              <div className="flex items-center gap-3">
                <div className="flex min-w-0 flex-1 items-center gap-3">
                  <span className="avatar" aria-hidden="true">
                    {request.by.slice(0, 1)}
                  </span>
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <p className="table__id text-xs">{request.id}</p>
                      <CategoryTag category={request.category} />
                    </div>
                    <h2 className="mt-1 truncate text-sm font-semibold">
                      {request.title}
                    </h2>
                  </div>
                </div>
                {/* เปิดหน้ารายละเอียดเพื่อพิจารณาคำขอนี้ */}
                <LinkButton
                  href={`/approval/approvalsView?id=${encodeURIComponent(request.id)}`}
                  className="inline-flex shrink-0 items-center gap-1 px-3 py-2 text-sm"
                >
                  พิจารณา
                </LinkButton>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}

export function ApprovalDecisionPanel({
  requestId,
}: {
  requestId: string;
}) {
  const router = useRouter();
  const decisions = useApprovalDecisions();
  const decision = decisions[requestId];
  const [isReturning, setIsReturning] = useState(false);
  const [comment, setComment] = useState("");

  const approveRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveDecision(requestId, {
      result: "ok",
      decidedAt: new Date().toISOString(),
    });
  };

  const returnRequest = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    saveDecision(requestId, {
      result: "no",
      comment,
      decidedAt: new Date().toISOString(),
    });
  };

  return (
    <Card className="h-fit">
      {decision ? (
        <div className="text-center">
          <Badge>
            {decision.result === "ok"
              ? "อนุมัติและส่งต่อแผนก IT"
              : "ส่งกลับให้แก้ไข"}
          </Badge>
          <p className="mt-3 text-sm">บันทึกผลการพิจารณาแล้ว</p>
          {decision.result === "no" && decision.comment && (
            <p className="mt-3 rounded-lg bg-slate-50 p-3 text-left text-sm">
              <span className="font-medium">รายละเอียดที่ส่งกลับ: </span>
              {decision.comment}
            </p>
          )}
          <Button
            type="button"
            variant="outline"
            block
            className="mt-4"
            onPress={() => router.push("/approval")}
          >
            กลับไปรายการ
          </Button>
        </div>
      ) : isReturning ? (
        <form onSubmit={returnRequest} className="space-y-4">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <h3 className="font-semibold">ระบุข้อความที่ต้องการให้แก้ไข</h3>
            <button
              type="button"
              onClick={() => setIsReturning(false)}
              className="text-sm font-medium text-brand underline underline-offset-4 hover:text-brand-strong"
            >
              ย้อนกลับ
            </button>
          </div>
          <Field label="รายละเอียดที่ต้องแก้ไข">
            <textarea
              value={comment}
              onChange={(event) => setComment(event.target.value)}
              rows={4}
              className="input"
              placeholder="ระบุเหตุผลหรือรายละเอียดที่ต้องแก้ไข"
              required
            />
          </Field>
          <Button type="submit" variant="danger" block>
            <ArrowLeft size={18} aria-hidden="true" />
            ยืนยันส่งกลับให้แก้ไข
          </Button>
        </form>
      ) : (
        <div className="space-y-4">
          <form onSubmit={approveRequest} className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-semibold">
                การพิจารณาของหัวหน้าต้นสังกัด
              </h3>
              <fieldset className="space-y-3">
                <legend className="mb-2 text-xs text-slate-500">
                  ด่าน 1 จาก 2 ไม่ต้องขอผู้บริหารอนุมัติ
                </legend>
                <h3 className="font-semibold">ตรวจก่อนอนุมัติ</h3>
                <div className="flex items-start gap-3 rounded-lg border border-line p-3">
                  <Checkbox
                    id="confirmDetails"
                    name="confirmDetails"
                    required
                    size="md"
                    className="mt-1"
                  />
                  <Label htmlFor="confirmDetails">
                    รายละเอียดตรงกับที่คุยกันไว้
                  </Label>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-line p-3">
                  <Checkbox
                    id="confirmDepartment"
                    name="confirmDepartment"
                    required
                    size="md"
                    className="mt-1"
                  />
                  <Label htmlFor="confirmDepartment">
                    ส่งถึงแผนกที่ถูกต้อง (แผนก IT)
                  </Label>
                </div>
                <div className="flex items-start gap-3 rounded-lg border border-line p-3">
                  <Checkbox
                    id="confirmAttachments"
                    name="confirmAttachments"
                    required
                    size="md"
                    className="mt-1"
                  />
                  <Label htmlFor="confirmAttachments">
                    แนบไฟล์ที่จำเป็นครบ
                  </Label>
                </div>
              </fieldset>
            </div>
            <Button type="submit" variant="success" block>
              <Check size={18} aria-hidden="true" />
              อนุมัติและส่งต่อแผนก IT
            </Button>
          </form>
          <Button
            type="button"
            variant="danger"
            block
            onPress={() => setIsReturning(true)}
          >
            <ArrowLeft size={18} aria-hidden="true" />
            ส่งกลับให้แก้ไข
          </Button>
        </div>
      )}
    </Card>
  );
}
