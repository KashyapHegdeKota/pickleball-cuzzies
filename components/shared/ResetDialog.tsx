"use client";

import { AlertTriangle, RotateCcw, X } from "lucide-react";
import { useEffect } from "react";

type ResetDialogProps = {
  isOpen: boolean;
  playerCount: number;
  onClose: () => void;
  onConfirm: () => void;
};

export function ResetDialog({
  isOpen,
  playerCount,
  onClose,
  onConfirm,
}: ResetDialogProps) {
  useEffect(() => {
    if (!isOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] grid place-items-center p-4"
      role="alertdialog"
      aria-modal="true"
      aria-labelledby="reset-title"
      aria-describedby="reset-description"
    >
      <button
        type="button"
        aria-label="Cancel reset"
        onClick={onClose}
        className="absolute inset-0 size-full bg-slate-950/85 backdrop-blur-sm"
      />
      <section className="animate-card-in relative w-full max-w-sm rounded-[2rem] border border-white/10 bg-slate-900 p-5 shadow-[0_28px_100px_rgb(0_0_0/0.65)]">
        <div className="flex items-start gap-3">
          <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-orange-500/12 text-orange-400">
            <AlertTriangle aria-hidden="true" size={22} />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id="reset-title" className="text-xl font-black tracking-tight text-white">
              Reset tournament?
            </h2>
            <p id="reset-description" className="mt-2 text-sm leading-6 text-slate-400">
              This removes all {playerCount} players, scores, standings, match
              history, and bench timing from this device.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close"
            className="grid size-11 shrink-0 place-items-center rounded-xl text-slate-500 hover:bg-white/5 hover:text-white"
          >
            <X aria-hidden="true" size={19} />
          </button>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onClose}
            className="min-h-12 rounded-2xl border border-white/10 bg-white/5 px-4 text-sm font-black text-white"
          >
            Keep playing
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="flex min-h-12 items-center justify-center gap-2 rounded-2xl bg-orange-500 px-4 text-sm font-black text-slate-950"
          >
            <RotateCcw aria-hidden="true" size={17} />
            Reset all
          </button>
        </div>
      </section>
    </div>
  );
}
