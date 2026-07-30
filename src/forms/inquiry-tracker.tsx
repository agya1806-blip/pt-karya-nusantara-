"use client";

import { useState } from "react";
import { Search, Package, Clock, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

type InquiryStatus = "received" | "reviewing" | "responded" | "completed";

interface InquiryStatusInfo {
  status: InquiryStatus;
  date: string;
  message: string;
}

const statusFlow: { status: InquiryStatus; icon: typeof Clock; label: string }[] = [
  { status: "received", icon: Package, label: "Received" },
  { status: "reviewing", icon: Clock, label: "Under Review" },
  { status: "responded", icon: CheckCircle, label: "Responded" },
  { status: "completed", icon: CheckCircle, label: "Completed" },
];

export function InquiryTracker() {
  const [inquiryId, setInquiryId] = useState("");
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    if (inquiryId.trim()) setSearched(true);
  };

  return (
    <div className="w-full max-w-lg mx-auto">
      <div className="flex items-center gap-3 mb-8">
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-500/10 text-brand-600">
          <Package className="h-5 w-5" />
        </span>
        <div>
          <h3 className="text-heading-sm font-medium text-text-primary">Track Your Inquiry</h3>
          <p className="text-body-sm text-text-secondary">Enter your inquiry ID to check the status.</p>
        </div>
      </div>

      <div className="flex gap-3">
        <div className="flex-1">
          <Input
            value={inquiryId}
            onChange={(e) => setInquiryId(e.target.value)}
            placeholder="e.g. INV-2024-001"
            onKeyDown={(e) => e.key === "Enter" && handleSearch()}
          />
        </div>
        <Button variant="primary" onClick={handleSearch} disabled={!inquiryId.trim()}>
          <Search className="h-4 w-4 mr-2" /> Track
        </Button>
      </div>

      {searched && (
        <div className="mt-8 rounded-2xl border border-border-light bg-surface-secondary p-8">
          {inquiryId.toLowerCase() === "demo" ? (
            <>
              <div className="flex items-center justify-between mb-6">
                <span className="text-body-sm font-medium text-text-primary">{inquiryId}</span>
                <span className="rounded-full bg-brand-500/10 px-3 py-1 text-caption text-brand-600 font-medium">
                  Under Review
                </span>
              </div>
              <div className="space-y-0">
                {statusFlow.map((step, i) => {
                  const isActive = i <= 2;
                  const isComplete = i < 2;
                  const Icon = step.icon;
                  return (
                    <div key={step.status} className="flex items-start gap-4 pb-6 last:pb-0 relative">
                      {i < statusFlow.length - 1 && (
                        <div className={cn(
                          "absolute left-4 top-8 w-px h-full",
                          isComplete ? "bg-brand-500" : "bg-border-light",
                        )} />
                      )}
                      <span className={cn(
                        "flex h-8 w-8 items-center justify-center rounded-full relative z-10",
                        isActive ? "bg-brand-500 text-white" : "bg-surface border border-border-light text-text-tertiary",
                      )}>
                        <Icon className="h-4 w-4" />
                      </span>
                      <div className="flex-1 pt-1">
                        <p className={cn(
                          "text-body-sm font-medium",
                          isActive ? "text-text-primary" : "text-text-tertiary",
                        )}>
                          {step.label}
                        </p>
                        <p className="text-body-xs text-text-muted mt-0.5">
                          {i === 0 && "Submitted on 15 Jan 2025"}
                          {i === 1 && "Being reviewed by our team"}
                          {i === 2 && "Awaiting your response"}
                          {i === 3 && "Pending"}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="text-center py-6">
              <AlertCircle className="h-8 w-8 mx-auto text-text-tertiary mb-3" />
              <p className="text-body-sm text-text-secondary">No inquiry found with ID &ldquo;{inquiryId}&rdquo;</p>
              <p className="text-body-xs text-text-muted mt-1">Please check your ID or contact our team.</p>
              <button
                onClick={() => { setSearched(false); setInquiryId("demo"); }}
                className="mt-4 text-body-xs text-brand-600 hover:text-brand-500 underline"
              >
                Try demo ID: demo
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}