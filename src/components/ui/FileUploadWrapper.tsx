"use client";

import { forwardRef, type DragEvent } from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface FileUploadWrapperProps {
  id?: string;
  className?: string;
  onChange?: React.ChangeEvent<HTMLInputElement>;
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  dragDrop?: boolean;
}

export const FileUploadWrapper = forwardRef<HTMLInputElement, FileUploadWrapperProps>(
  ({ id, className, label = "Upload file", accept, multiple, disabled, dragDrop = true, ...rest }, ref) => {
    const inputId = id || "file-upload";
    return (
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor={inputId}
          className={cn(
            "flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-border bg-surface-muted px-6 py-8 transition-colors duration-300 ease-luxury hover:border-neutral-400",
            disabled && "opacity-50 cursor-not-allowed",
            className,
          )}
          onDragOver={(e: DragEvent) => { e.preventDefault(); }}
          onDrop={(e: DragEvent) => {
            if (!dragDrop || disabled) return;
            e.preventDefault();
          }}
        >
          <Upload className="mb-3 h-8 w-8 text-text-muted" aria-hidden="true" />
          <span className="text-sm font-medium text-text">{label}</span>
          <span className="mt-1 text-xs text-text-muted">or drag and drop</span>
        </label>
        <input
          ref={ref}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          {...rest}
        />
      </div>
    );
  },
);
FileUploadWrapper.displayName = "FileUploadWrapper";