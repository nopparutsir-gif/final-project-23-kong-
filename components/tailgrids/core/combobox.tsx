"use client";

import type { ReactNode } from "react";
import {
  Button as AriaButton,
  ComboBox as AriaComboBox,
  Group as AriaGroup,
  Input as AriaInput,
  ListBox as AriaListBox,
  ListBoxItem as AriaListBoxItem,
  Popover as AriaPopover,
  type ComboBoxProps,
  type GroupProps,
  type InputProps,
  type ListBoxItemProps,
  type ListBoxProps,
  type PopoverProps,
} from "react-aria-components";
import { ChevronDown } from "@tailgrids/icons";

export function Combobox(props: Omit<ComboBoxProps<string>, "className">) {
  return <AriaComboBox {...props} className="w-full" />;
}

export function ComboboxInputWrapper(
  props: Omit<GroupProps, "className">,
) {
  return (
    <AriaGroup
      {...props}
      className="flex w-full items-center rounded-lg border border-slate-300 bg-white focus-within:border-indigo-500 focus-within:ring-2 focus-within:ring-indigo-500/20"
    />
  );
}

export function ComboboxInput(props: Omit<InputProps, "className">) {
  return (
    <AriaInput
      {...props}
      className="min-w-0 flex-1 rounded-lg border-0 bg-transparent px-3 py-2.5 text-sm text-slate-900 outline-none placeholder:text-slate-400 focus:ring-0"
    />
  );
}

export function ComboboxTrigger() {
  return (
    <AriaButton
      aria-label="แสดงตัวเลือก"
      className="mr-1 inline-flex size-8 items-center justify-center rounded-md text-slate-500 outline-none hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-indigo-500"
    >
      <ChevronDown size={16} aria-hidden="true" />
    </AriaButton>
  );
}

export function ComboboxContent(props: Omit<PopoverProps, "className">) {
  return (
    <AriaPopover
      {...props}
      className="z-50 w-[var(--trigger-width)] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg"
    />
  );
}

export function ComboboxList({
  ...props
}: Omit<ListBoxProps<string>, "className" | "renderEmptyState"> & {
  emptyMessage?: string;
}) {
  const { emptyMessage = "No results found", ...listProps } = props;

  return (
    <AriaListBox
      {...listProps}
      className="max-h-56 overflow-y-auto p-1 outline-none"
      renderEmptyState={() => <ComboboxEmpty>{emptyMessage}</ComboboxEmpty>}
    />
  );
}

export function ComboboxItem(props: Omit<ListBoxItemProps<string>, "className">) {
  return (
    <AriaListBoxItem
      {...props}
      className="cursor-pointer rounded-md px-3 py-2 text-sm text-slate-700 outline-none data-[focused]:bg-indigo-50 data-[selected]:bg-indigo-100"
    />
  );
}

export function ComboboxEmpty({ children }: { children: ReactNode }) {
  return (
    <div className="px-3 py-2 text-sm text-slate-500" aria-live="polite">
      {children}
    </div>
  );
}
