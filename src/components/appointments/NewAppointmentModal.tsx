// components/appointments/NewAppointmentModal.tsx
import { motion, AnimatePresence } from "framer-motion";
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogFooter 
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { X } from "lucide-react";

interface NewAppointmentModalProps {
  open: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export function NewAppointmentModal({ 
  open, 
  onClose, 
  onSubmit 
}: NewAppointmentModalProps) {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would collect form data here
    onSubmit({
      doctor: "Dr. Example",
      date: "2023-05-01",
      time: "14:00",
      type: "Checkup",
      notes: "Sample appointment"
    });
  };

  return (
    <AnimatePresence>
      {open && (
        <Dialog open={open} onOpenChange={onClose}>
          <DialogContent className="sm:max-w-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              <DialogHeader>
                <DialogTitle className="flex justify-between items-center">
                  <span>Schedule New Appointment</span>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={onClose}
                    className="rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleSubmit} className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="doctor" className="text-right">
                    Doctor
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select a doctor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="dr1">Dr. Mensah</SelectItem>
                      <SelectItem value="dr2">Dr. Johnson</SelectItem>
                      <SelectItem value="dr3">Dr. Williams</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="date" className="text-right">
                    Date
                  </Label>
                  <Input
                    id="date"
                    type="date"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="time" className="text-right">
                    Time
                  </Label>
                  <Input
                    id="time"
                    type="time"
                    className="col-span-3"
                  />
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="type" className="text-right">
                    Type
                  </Label>
                  <Select>
                    <SelectTrigger className="col-span-3">
                      <SelectValue placeholder="Select appointment type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="checkup">Checkup</SelectItem>
                      <SelectItem value="followup">Follow-up</SelectItem>
                      <SelectItem value="consultation">Consultation</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="notes" className="text-right">
                    Notes
                  </Label>
                  <Textarea 
                    id="notes" 
                    className="col-span-3" 
                    placeholder="Any special instructions or concerns"
                  />
                </div>
                
                <DialogFooter>
                  <Button type="submit" className="w-full">
                    Schedule Appointment
                  </Button>
                </DialogFooter>
              </form>
            </motion.div>
          </DialogContent>
        </Dialog>
      )}
    </AnimatePresence>
  );
}