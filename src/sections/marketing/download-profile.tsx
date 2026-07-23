"use client";

import { cn } from "@/lib/utils";
import { Fade } from "@/components/animation/Fade";
import { Button } from "@/components/ui/Button";
import { Download } from "lucide-react";

interface DownloadProfileProps {
  title: string;
  description?: string;
  fileUrl: string;
  className?: string;
}

export function DownloadProfile({
  title,
  description,
  fileUrl,
  className,
}: DownloadProfileProps) {
  return (
    <section className={cn("bg-surface-muted py-24", className)}>
      <div className="container-site">
        <Fade direction="up" className="mx-auto max-w-2xl text-center">
          <h2 className="text-display font-light tracking-tight text-text">
            {title}
          </h2>
          {description && (
            <p className="mt-4 text-body-lg text-text-secondary leading-relaxed">
              {description}
            </p>
          )}
          <div className="mt-8">
            <a
              href={fileUrl}
              download
              className="inline-flex"
            >
              <Button
                variant="primary"
                size="xl"
                className="gap-3"
              >
                <Download size={18} />
                Download Profile
              </Button>
            </a>
          </div>
        </Fade>
      </div>
    </section>
  );
}
