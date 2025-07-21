
"use client";

import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";

export function FaqAccordion() {
  return (
    <Accordion type="single" collapsible>
      <AccordionItem value="encryption">
        <AccordionTrigger>How is my data encrypted?</AccordionTrigger>
        <AccordionContent>
          We use TLS 1.2+ in transit and AES-256 at rest to protect all patient data and images.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="access">
        <AccordionTrigger>Who can view my X‑rays?</AccordionTrigger>
        <AccordionContent>
          Only authorized radiologists and healthcare providers assigned to your case can access your images.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="sharing">
        <AccordionTrigger>Is my data shared with third parties?</AccordionTrigger>
        <AccordionContent>
          No. We do not share patient images or data outside of our HIPAA/GDPR-compliant partners.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="audit">
        <AccordionTrigger>How long are logs retained?</AccordionTrigger>
        <AccordionContent>
          Audit logs are stored for 90 days and encrypted. Only compliance staff can review them.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="incidents">
        <AccordionTrigger>What happens if there is a security incident?</AccordionTrigger>
        <AccordionContent>
          We follow our incident response plan: detect, notify affected parties, remediate, and report within 72 hours.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
