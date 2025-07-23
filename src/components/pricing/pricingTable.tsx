// components/pricing/PricingTable.tsx

"use client";
import { Table } from "@/components/ui/table"; // Assuming a table component exists

interface Plan {
  id: string;
  title: string;
  priceMonthly: number;
  priceAnnual: number;
  features: string[];
}

interface PricingTableProps {
  plans: Plan[];
  annual: boolean;
}

export default function PricingTable({ plans, annual }: PricingTableProps) {
  const headers = ["Feature", ...plans.map((p) => p.title)];
  const rows = Array.from(
    new Set(plans.flatMap((p) => p.features))
  ).map((feature) => [
    feature,
    ...plans.map((p) => (p.features.includes(feature) ? "✔️" : "—"))
  ]);

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-[#121826] rounded-2xl">
        <thead>
          <tr>
            {headers.map((h, idx) => (
              <th key={idx} className="px-4 py-3 text-left text-sm text-[#94a3b8]">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, idx) => (
            <tr key={idx} className="border-t border-[#1e293b]">
              {row.map((cell, cidx) => (
                <td key={cidx} className="px-4 py-3 text-sm text-white">
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
