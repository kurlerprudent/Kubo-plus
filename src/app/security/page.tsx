

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { SecurityAlert } from "@/components/SecurityAlert";
import { FaqAccordion } from "@/components/Faq";
import Link from "next/link";
import { Download } from "lucide-react";

export default function SecurityPage() {
  return (
    <main className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100 p-6">
      {/* Hero Section */}
      <section className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl font-extrabold mb-2">Security &amp; Confidentiality</h1>
        <p className="text-lg text-gray-600 dark:text-gray-300">
          How we protect your patients’ data with industry-standard practices.
        </p>
      </section>

      {/* Alert Banner */}
      <div className="max-w-4xl mx-auto mb-8">
        <SecurityAlert />
      </div>

      {/* Two-Column Layout */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Narrative */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Data Encryption</CardTitle>
            </CardHeader>
            <CardContent>
              We enforce TLS 1.2+ for all in-transit data and AES-256 encryption at rest, ensuring your X-rays and reports are always secure.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Access Controls</CardTitle>
            </CardHeader>
            <CardContent>
              Role-based access, mandatory multi-factor authentication (MFA), and automatic session timeouts keep unauthorized users out.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Audit Logging</CardTitle>
            </CardHeader>
            <CardContent>
              We log all logins, data exports, and report generations. Logs are retained securely for 90 days to support audits and investigations.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Data Minimization</CardTitle>
            </CardHeader>
            <CardContent>
              Only the data necessary for diagnostic and treatment workflows is collected and retained according to our strict retention policy.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Third-Party Compliance</CardTitle>
            </CardHeader>
            <CardContent>
              Our cloud and AI providers are HIPAA and GDPR compliant, holding SOC 2 Type II and ISO 27001 certifications.
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Incident Response</CardTitle>
            </CardHeader>
            <CardContent>
              We maintain a 24/7 monitoring and incident response team. Detected issues are escalated immediately and resolved within defined SLAs.
            </CardContent>
          </Card>
        </div>

        {/* Right Interactive FAQ */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <FaqAccordion />
          <div className="mt-6">
            <Button
              asChild
              className="flex items-center gap-2"
            >
              <a href="/security-policy.pdf" download>
                <Download className="w-5 h-5" />
                Download Full Security Policy
              </a>
            </Button>
          </div>
        </div>
      </div>

      {/* Back Link */}
      <div className="max-w-4xl mx-auto mt-12 text-center">
        <Link href="/">← Back to Home</Link>
      </div>
    </main>
  );
}

