"use client";
interface Props {
  label: string;
  showPassword: boolean;
  setShowPassword: Dispatch<SetStateAction<boolean>>;
}

import { Checkbox } from "@/components/ui/checkbox";
import { Dispatch, SetStateAction } from "react";

export function CheckboxDemo({ label, showPassword, setShowPassword }: Props) {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox
        id="terms"
        checked={showPassword}
        onChange={() => setShowPassword(false)}
      />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        {label}
      </label>
    </div>
  );
}
