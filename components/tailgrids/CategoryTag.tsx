import { Badge } from "./core/badge";

const CATEGORY_COLORS: Record<
  string,
  "blue" | "purple" | "error" | "orange" | "gray"
> = {
  "พัฒนาใหม่": "blue",
  "ปรับปรุง": "purple",
  "แก้ bug": "error",
  "แก้ปัญหา": "orange",
};

export default function CategoryTag({ category }: { category: string }) {
  return (
    <Badge
      color={CATEGORY_COLORS[category] ?? "gray"}
      className="rounded-md border border-current"
    >
      {category}
    </Badge>
  );
}
