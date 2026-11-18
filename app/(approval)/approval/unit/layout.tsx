import { ProgressProvider } from "../../../../components/tailgrids/ProgressControl";

// หน้านี้เก็บค่าความคืบหน้าร่วมกันระหว่างหน้ารวมคำขอกับหน้ารายละเอียดในส่วน unit
export default function UnitLayout({ children }: LayoutProps<"/approval/unit">) {
  return <ProgressProvider>{children}</ProgressProvider>;
}
