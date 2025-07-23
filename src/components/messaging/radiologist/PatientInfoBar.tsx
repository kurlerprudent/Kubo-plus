// components/messaging/radiologist/PatientInfoBar.tsx
import { Button } from "@/components/ui/button";
import { PatientInfo } from "../types";
import { colors } from "../types";

interface PatientInfoBarProps {
  patientInfo: PatientInfo;
}

export default function PatientInfoBar({ patientInfo }: PatientInfoBarProps) {
  return (
    <div 
      className="p-3 border-b flex items-center justify-between text-xs"
      style={{ backgroundColor: colors.background3 }}
    >
      <div className="flex items-center gap-4">
        <span style={{ color: colors.textColorSecondary }}>
          <span style={{ color: colors.textColor, fontWeight: 500 }}>Age:</span> {patientInfo.age}
        </span>
        <span style={{ color: colors.textColorSecondary }}>
          <span style={{ color: colors.textColor, fontWeight: 500 }}>Gender:</span> {patientInfo.gender}
        </span>
        <span style={{ color: colors.textColorSecondary }}>
          <span style={{ color: colors.textColor, fontWeight: 500 }}>Last Visit:</span> {patientInfo.lastAppointment}
        </span>
        {patientInfo.nextAppointment && (
          <span style={{ color: colors.textColorSecondary }}>
            <span style={{ color: colors.textColor, fontWeight: 500 }}>Next Visit:</span> {patientInfo.nextAppointment}
          </span>
        )}
      </div>
      <Button 
        size="sm" 
        className="rounded-full"
        style={{ 
          backgroundColor: colors.primaryBtn,
          color: colors.textColor
        }}
      >
        View Records
      </Button>
    </div>
  );
}