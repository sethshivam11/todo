"use client";
interface Props {
  label: string;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
  uniqueId: string
}

import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";

export function CheckboxDemo({ label, setShowPassword, uniqueId }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id={uniqueId}
        defaultChecked={false}
        onClick={() => setShowPassword((prev) => !prev)}
      />
      <label
        htmlFor={uniqueId}
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 select-none"
      >
        {label}
      </label>
    </div>
  );
}
