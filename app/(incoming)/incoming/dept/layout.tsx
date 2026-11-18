import { ProgressProvider } from "../../../../components/tailgrids/ProgressControl";

export default function DepartmentLayout({
  children,
}: LayoutProps<"/incoming/dept">) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
