"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import { Progress } from "./core/progress";

type ProgressContextValue = {
  values: Record<string, number>;
  advanceProgress: (requestId: string, initialProgress: number) => void;
};

const ProgressContext = createContext<ProgressContextValue | null>(null);
const getNextProgress = (currentProgress: number) =>
  currentProgress >= 100 ? 0 : Math.min(currentProgress + 20, 100);

export const getProgressStatus = (
  initialStatus: string,
  initialProgress: number,
  currentProgress?: number
) => {
  if (currentProgress === undefined) return initialStatus;
  if (currentProgress >= 100) return "เสร็จสิ้น";
  return initialProgress >= 100 ? "กำลังดำเนินการ" : initialStatus;
};

export function ProgressProvider({ children }: { children: ReactNode }) {
  const [values, setValues] = useState<Record<string, number>>({});
  const advanceProgress = (requestId: string, initialProgress: number) => {
    setValues((currentValues) => ({
      ...currentValues,
      [requestId]: getNextProgress(
        currentValues[requestId] ?? initialProgress
      ),
    }));
  };

  return (
    <ProgressContext.Provider value={{ values, advanceProgress }}>
      {children}
    </ProgressContext.Provider>
  );
}

export function useProgress() {
  const progressContext = useContext(ProgressContext);

  if (!progressContext) {
    throw new Error("useProgress must be used inside ProgressProvider.");
  }

  return progressContext;
}

export default function ProgressControl({
  requestId,
  initialProgress,
}: {
  requestId?: string;
  initialProgress: number;
}) {
  const progressContext = useContext(ProgressContext);
  const [localProgress, setLocalProgress] = useState(initialProgress);

  if (requestId && !progressContext) {
    throw new Error("ProgressControl must be rendered inside ProgressProvider.");
  }

  const progress =
    requestId && progressContext
      ? progressContext.values[requestId] ?? initialProgress
      : localProgress;
  const isComplete = progress >= 100;
  const updateProgress = () => {
    if (requestId && progressContext) {
      progressContext.advanceProgress(requestId, initialProgress);
      return;
    }

    setLocalProgress(getNextProgress);
  };

  return (
    <div className="flex items-center gap-3">
      <div
        role="button"
        tabIndex={0}
        aria-label={
          isComplete
            ? `คลิกเพื่อเริ่มความคืบหน้าใหม่จาก 0 เปอร์เซ็นต์ ปัจจุบัน ${progress}%`
            : `คลิกเพื่อเพิ่มความคืบหน้าทีละ 20 เปอร์เซ็นต์ ปัจจุบัน ${progress}%`
        }
        onClick={updateProgress}
        onKeyDown={(event) => {
          if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            updateProgress();
          }
        }}
        className="w-36 cursor-pointer rounded focus-visible:outline-2 focus-visible:outline-brand"
      >
        <Progress
          progress={progress}
          barColor={isComplete ? "#16a34a" : "#4338CA"}
          className="w-full"
        />
      </div>
      <span className="text-sm font-medium">{progress}%</span>
    </div>
  );
}
