"use client";
interface Props {
    label: string
}


import { Checkbox } from "@/components/ui/checkbox";

export function CheckboxDemo({ label }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
