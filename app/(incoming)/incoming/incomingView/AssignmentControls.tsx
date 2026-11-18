"use client";

import { createContext, useContext, useState, type ReactNode } from "react";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxInputWrapper,
  ComboboxItem,
  ComboboxList,
  ComboboxTrigger,
} from "../../../../components/tailgrids/core/combobox";
import { TEAM } from "../mock";

type TaskAssignmentContextValue = {
  assignees: Record<string, string>;
  hasAssignee: boolean;
  setAssignee: (assignmentId: string, assignee: string) => void;
};

const TaskAssignmentContext =
  createContext<TaskAssignmentContextValue | null>(null);

export function TaskAssignmentProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [assignees, setAssignees] = useState<Record<string, string>>({});
  const setAssignee = (assignmentId: string, assignee: string) => {
    setAssignees((current) => ({ ...current, [assignmentId]: assignee }));
  };

  return (
    <TaskAssignmentContext.Provider
      value={{
        assignees,
        hasAssignee: Object.values(assignees).some(Boolean),
        setAssignee,
      }}
    >
      {children}
    </TaskAssignmentContext.Provider>
  );
}

export function useTaskAssignments() {
  const context = useContext(TaskAssignmentContext);

  if (!context) {
    throw new Error("Task assignment controls must be inside their provider.");
  }

  return context;
}

export function TaskAssigneeCombobox({
  assignmentId,
}: {
  assignmentId: string;
}) {
  const { assignees, setAssignee } = useTaskAssignments();

  return (
    <Combobox
      selectedKey={assignees[assignmentId] ?? null}
      onSelectionChange={(key) =>
        setAssignee(assignmentId, key === null ? "" : String(key))
      }
    >
      <ComboboxInputWrapper>
        <ComboboxInput placeholder="เลือกผู้รับผิดชอบงาน" />
        <ComboboxTrigger />
      </ComboboxInputWrapper>
      <ComboboxContent>
        <ComboboxList emptyMessage="ไม่พบสมาชิกในทีม">
          {TEAM.map((member) => (
            <ComboboxItem key={member} id={member}>
              {member}
            </ComboboxItem>
          ))}
        </ComboboxList>
      </ComboboxContent>
    </Combobox>
  );
}
