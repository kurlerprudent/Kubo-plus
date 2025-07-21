"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { Loader2 } from "lucide-react";

// Dynamically import DemoViewer without SSR
const DemoViewer = dynamic(
  () => import("@/components/DemoViewer"),
  { 
    ssr: false,
    loading: () => (
      <div className="flex h-[300px] md:h-[500px] items-center justify-center">
        <Loader2 className="h-10 w-10 md:h-12 md:w-12 animate-spin text-blue-500" />
      </div>
    )
  }
);

// Process steps for the header stepper
const processSteps = [
  "Patient Info",
  "Upload X-ray",
  "Generate Report"
];

export default function DemoPage() {
  const [activeStep, setActiveStep] = useState(0);

  return (
    <div className="flex min-h-screen w-full flex-col bg-slate-950 text-white">
      {/* Mobile-optimized header */}
      <div className="sticky top-10 z-10 w-full bg-slate-900 py-4 px-4 shadow-md md:hidden">
        <h1 className="text-xl font-bold tracking-tight text-slate-100">
          System Demo
        </h1>
      </div>
      
      <div className="flex w-full flex-col items-center p-4 md:p-6">
        {/* Page title (desktop) */}
        <h1 className="mb-4 hidden md:mt-20 text-2xl font-bold tracking-tight text-slate-100 md:block md:mb-6 md:text-3xl">
          System Demo
        </h1>
        
        {/* Responsive container */}
        <div className="w-full rounded-xl bg-slate-900 p-4 shadow-xl md:rounded-2xl md:p-6 lg:max-w-6xl">
          {/* Process stepper header - Mobile (vertical) */}
          <div className="mb-6 md:hidden">
            <div className="flex flex-col space-y-6">
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  className="flex items-center"
                >
                  <div className={`
                    relative z-10 mr-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full
                    ${activeStep >= index 
                      ? "bg-blue-600 text-white" 
                      : "bg-slate-700 text-slate-300"}
                  `}>
                    {index + 1}
                  </div>
                  
                  <span className={`
                    text-sm font-medium
                    ${activeStep >= index ? "text-white" : "text-slate-400"}
                  `}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* Process stepper header - Desktop (horizontal) */}
          <div className="mb-6 hidden md:block md:mb-8">
            <div className="flex justify-between">
              {processSteps.map((step, index) => (
                <div 
                  key={index}
                  className={`relative flex flex-col items-center ${
                    index < processSteps.length - 1 ? "flex-1" : ""
                  }`}
                >
                  {/* Step connector */}
                  {index > 0 && (
                    <div className="absolute left-0 right-1/2 top-4 h-0.5 bg-slate-600"></div>
                  )}
                  {index < processSteps.length - 1 && (
                    <div className="absolute left-1/2 right-0 top-4 h-0.5 bg-slate-600"></div>
                  )}
                  
                  {/* Step indicator */}
                  <div className={`
                    relative z-10 mb-2 flex h-8 w-8 items-center justify-center rounded-full
                    ${activeStep >= index 
                      ? "bg-blue-600 text-white" 
                      : "bg-slate-700 text-slate-300"}
                  `}>
                    {index + 1}
                  </div>
                  
                  {/* Step label */}
                  <span className={`
                    text-center text-sm font-medium
                    ${activeStep >= index ? "text-white" : "text-slate-400"}
                  `}>
                    {step}
                  </span>
                </div>
              ))}
            </div>
          </div>
          
          {/* DemoViewer component */}
          <div className="overflow-hidden rounded-lg md:rounded-xl">
            <DemoViewer onStepChange={setActiveStep} />
          </div>
        </div>
      </div>
    </div>
  );
}