// components/pricing/ToggleSwitch.tsx

"use client";
import { Switch } from "@headlessui/react";
import { motion } from "framer-motion";

interface ToggleSwitchProps {
  enabled: boolean;
  setEnabled: (val: boolean) => void;
  labelLeft: string;
  labelRight: string;
}

export default function ToggleSwitch({ enabled, setEnabled, labelLeft, labelRight }: ToggleSwitchProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="flex items-center space-x-4"
    >
      <span className={`text-sm font-medium ${!enabled ? 'text-[#10BCE3]' : 'text-[#94a3b8]'}`}>{labelLeft}</span>
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className={`${
          enabled ? 'bg-[#10BCE3]' : 'bg-[#94a3b8]'
        } relative inline-flex items-center h-6 rounded-full w-11 transition-colors`}
      >
        <span
          className={`${
            enabled ? 'translate-x-6' : 'translate-x-1'
          } inline-block w-4 h-4 transform bg-white rounded-full transition-transform`}
        />
      </Switch>
      <span className={`text-sm font-medium ${enabled ? 'text-[#10BCE3]' : 'text-[#94a3b8]'}`}>{labelRight}</span>
    </motion.div>
  );
}