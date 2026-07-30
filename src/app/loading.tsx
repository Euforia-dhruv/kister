export default function Loading() {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-void">
      <div className="flex flex-col items-center gap-4">
        <div className="w-8 h-8 border border-linen/10 rounded-full animate-spin border-t-ember/40" />
        <span className="font-body text-[0.6rem] font-[300] tracking-[0.2em] text-linen/30 uppercase">
          Loading
        </span>
      </div>
    </div>
  );
}
