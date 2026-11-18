import { TaskAssignmentProvider } from "./AssignmentControls";

export default function IncomingViewLayout({
  children,
}: LayoutProps<"/incoming/incomingView">) {
  return <TaskAssignmentProvider>{children}</TaskAssignmentProvider>;
}
