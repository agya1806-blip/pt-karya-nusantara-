"use client";

import { forwardRef, useRef, type DragEvent, type ChangeEvent } from "react";
import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

interface FileUploadWrapperProps {
  id?: string;
  className?: string;
  onChange?: (files: FileList | null) => void;
  label?: string;
  accept?: string;
  multiple?: boolean;
  disabled?: boolean;
  required?: boolean;
  dragDrop?: boolean;
}

export const FileUploadWrapper = forwardRef<HTMLInputElement, FileUploadWrapperProps>(
  ({ id, className, label = "Upload file", accept, multiple, disabled, dragDrop = true, onChange, ...rest }, ref) => {
    const inputId = id || "file-upload";
    const internalRef = useRef<HTMLInputElement>(null);

    const handleDrop = (e: DragEvent) => {
      if (!dragDrop || disabled) return;
      e.preventDefault();
      const files = e.dataTransfer?.files;
      if (files && files.length > 0) {
        onChange?.(files);
        if (internalRef.current) {
          const dt = new DataTransfer();
          for (const file of files) { dt.items.add(file); }
          internalRef.current.files = dt.files;
        }
      }
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
      onChange?.(e.target.files);
    };

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
          onDrop={handleDrop}
        >
          <Upload className="mb-3 h-8 w-8 text-text-muted" aria-hidden="true" />
          <span className="text-sm font-medium text-text">{label}</span>
          <span className="mt-1 text-xs text-text-muted">or drag and drop</span>
        </label>
        <input
          ref={(node) => {
            internalRef.current = node;
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          id={inputId}
          type="file"
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          className="sr-only"
          onChange={handleChange}
          {...rest}
        />
      </div>
    );
  },
);
FileUploadWrapper.displayName = "FileUploadWrapper";