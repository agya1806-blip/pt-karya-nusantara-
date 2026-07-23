export default function RootLoading() {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-white"
      role="status"
      aria-label="Loading"
    >
      <div className="flex flex-col items-center gap-4">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-neutral-200 border-t-neutral-900" />
        <span className="text-sm font-medium tracking-widest text-neutral-400 uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}
