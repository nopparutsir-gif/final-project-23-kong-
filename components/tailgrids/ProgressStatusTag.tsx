"use client";

import { getProgressStatus, useProgress } from "./ProgressControl";
import StatusTag from "./StatusTag";

export default function ProgressStatusTag({
  requestId,
  initialStatus,
  initialProgress,
}: {
  requestId: string;
  initialStatus: string;
  initialProgress: number;
}) {
  const { values } = useProgress();

  return (
    <StatusTag
      status={getProgressStatus(
        initialStatus,
        initialProgress,
        values[requestId]
      )}
    />
  );
}
