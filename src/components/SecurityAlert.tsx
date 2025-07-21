
"use client";

import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export function SecurityAlert() {
  return (
    <Alert className="items-center">
      <div>
        <AlertTitle>Security & Confidentiality</AlertTitle>
        <AlertDescription>
          We adhere to the highest standards. Questions? Contact our Compliance Officer.
        </AlertDescription>
      </div>
      <div className="ml-auto">
        <Button variant="outline" size="sm">
          <Link href="mailto:compliance@yourdomain.com">Report a Concern</Link>
        </Button>
      </div>
    </Alert>
  );
}

