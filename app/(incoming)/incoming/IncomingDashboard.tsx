"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import {
  ArrowBothDirectionHorizontal2,
  Check,
  CheckCircle1,
  Layers2,
} from "@tailgrids/icons";
import { Card, PageHeader } from "../../../components/tailgrids/RequestUI";
import LinkButton from "../../../components/tailgrids/LinkButton";
import CategoryTag from "../../../components/tailgrids/CategoryTag";
import { INCOMING, IN_DEPT } from "./mock";

const EMPTY_COMPLETED_IDS: ReadonlySet<string> = new Set();
let completedIds: ReadonlySet<string> = EMPTY_COMPLETED_IDS;
const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getCompletedIds() {
  return completedIds;
}

function getServerCompletedIds() {
  return EMPTY_COMPLETED_IDS;
}

export function markIncomingDone(requestId: string) {
  if (completedIds.has(requestId)) return;

  const nextCompletedIds = new Set(completedIds);
  nextCompletedIds.add(requestId);
  completedIds = nextCompletedIds;
  listeners.forEach((listener) => listener());
}

export function CompleteIncomingLink({
  requestId,
}: {
  requestId: string;
}) {
  return (
    <Link
      href="/incoming"
      onClick={() => markIncomingDone(requestId)}
      className="inline-flex w-full items-center justify-center gap-3 rounded-lg bg-[#4338CA] px-4 py-2.5 font-medium text-white transition hover:bg-[#3730A3] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#4338CA]"
    >
      <Check size={18} aria-hidden="true" />
      ยืนยันรับงานและมอบหมาย
    </Link>
  );
}

export default function IncomingDashboard() {
  const completed = useSyncExternalStore(
    subscribe,
    getCompletedIds,
    getServerCompletedIds,
  );
  const pendingRequests = INCOMING.filter(
    (request) => !completed.has(request.id),
  );
  const summaries = [
    {
      label: "รอพิจารณา",
      count: pendingRequests.length,
      color: "bg-amber-500",
    },
    {
      label: "กำลังดำเนินการ",
      count: IN_DEPT.filter(
        (request) => request.status === "กำลังดำเนินการ",
      ).length,
      color: "bg-blue-500",
    },
    {
      label: "เกินกำหนด",
      count: IN_DEPT.filter((request) => request.status === "เกินกำหนด").length,
      color: "bg-red-500",
    },
  ];

  return (
    <>
      <PageHeader
        title="คำขอเข้าแผนก"
        sub="คำขอที่อนุมัติแล้วและรอแตกงานให้ทีม"
      />
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
            ไม่มีคำขอที่รอดำเนินการ
          </Card>
        ) : (
          pendingRequests.map((request) => (
            <Card key={request.id}>
              <div className="mb-3 flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="table__id text-xs">{request.id}</p>
                    <CategoryTag category={request.category} />
                  </div>
                  <h2 className="mt-1 font-semibold">{request.title}</h2>
                  <p className="mt-1 flex items-center gap-1.5 text-xs text-green-700">
                    <CheckCircle1
                      size={14}
                      className="shrink-0"
                      aria-hidden="true"
                    />
                    <span>
                      อนุมัติโดย {request.approvedBy} ({request.approverRole}) ·{" "}
                      {request.approvedDate}
                    </span>
                  </p>
                </div>
              </div>
              <div className="mt-4 flex flex-wrap gap-3">
                {/* เปิดรายละเอียดเพื่อรับงานและแบ่งงานย่อยให้ทีม */}
                <LinkButton
                  href={`/incoming/incomingView?id=${encodeURIComponent(request.id)}`}
                >
                  <Layers2 size={18} aria-hidden="true" />
                  รับงานและแบ่งงาน
                </LinkButton>
                {/* เปิดหน้าส่งต่อแผนกอื่นหรือปฏิเสธคำขอ */}
                <LinkButton
                  href={`/incoming/incomingReject?id=${encodeURIComponent(request.id)}`}
                  variant="outline"
                >
                  <ArrowBothDirectionHorizontal2
                    size={18}
                    aria-hidden="true"
                  />
                  ส่งต่อ / ปฏิเสธ
                </LinkButton>
              </div>
            </Card>
          ))
        )}
      </div>
    </>
  );
}
