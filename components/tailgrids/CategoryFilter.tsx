import Link from "next/link";

export const CATEGORY_OPTIONS = [
  "พัฒนาใหม่",
  "ปรับปรุง",
  "แก้ bug",
  "แก้ปัญหา",
];

const CATEGORY_FILTER_COLORS: Record<string, string> = {
  "พัฒนาใหม่": "border-badge-blue-text text-badge-blue-text",
  "ปรับปรุง": "border-badge-purple-text text-badge-purple-text",
  "แก้ bug": "border-badge-error-text text-badge-error-text",
  "แก้ปัญหา": "border-badge-orange-text text-badge-orange-text",
};

export default function CategoryFilter({
  hrefBase,
  selectedCategories,
  selectedStatus,
}: {
  hrefBase: string;
  selectedCategories: string[];
  selectedStatus?: "unfinished" | "done" | null;
}) {
  const categoryHref = (categories: string[]) => {
    const params = new URLSearchParams();
    categories.forEach((category) => params.append("category", category));
    if (selectedStatus) params.set("completion", selectedStatus);
    const query = params.toString();
    return query ? `${hrefBase}?${query}` : hrefBase;
  };

  return (
    <div className="mb-4 flex flex-wrap items-center gap-2">
      <span className="mr-1 text-sm font-medium text-slate-600">หมวด :</span>
      <Link
        href={categoryHref([])}
        aria-current={selectedCategories.length === 0 ? "page" : undefined}
        className={`rounded-full border bg-transparent px-3 py-1.5 text-sm text-brand transition ${
          selectedCategories.length === 0
            ? "border-brand font-semibold ring-1 ring-current"
            : "border-brand hover:bg-brand/5"
        }`}
      >
        ทั้งหมด
      </Link>
      {CATEGORY_OPTIONS.map((category) => {
        const isSelected = selectedCategories.includes(category);
        const nextSelected = isSelected
          ? selectedCategories.filter((selected) => selected !== category)
          : [...selectedCategories, category];

        return (
          <Link
            key={category}
            href={categoryHref(nextSelected)}
            aria-current={isSelected ? "page" : undefined}
            className={`rounded-full border bg-transparent px-3 py-1.5 text-sm transition ${
              CATEGORY_FILTER_COLORS[category]
            } ${
              isSelected
                ? "font-semibold ring-1 ring-current"
                : "hover:bg-slate-50"
            }`}
          >
            {category}
          </Link>
        );
      })}
    </div>
  );
}
