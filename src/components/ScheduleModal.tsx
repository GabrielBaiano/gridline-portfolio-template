"use client";

import React, { useState } from "react";
import { useSound } from "./SoundProvider";

interface ScheduleModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ScheduleModal({ isOpen, onClose }: ScheduleModalProps) {
  const { playClick, playChime } = useSound();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("");
  const [date, setDate] = useState("");
  const [timeSlot, setTimeSlot] = useState("14:00");
  const [honeypot, setHoneypot] = useState(""); // Anti-bot trap
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [resultMessage, setResultMessage] = useState("");
  const [meetUrl, setMeetUrl] = useState("");

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    playClick();
    setStatus("loading");
    setResultMessage("");

    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, topic, date, timeSlot, honeypot }),
      });

      const data = await res.json();

      if (!res.ok) {
        setStatus("error");
        setResultMessage(data.error || "Failed to schedule meeting.");
        return;
      }

      setStatus("success");
      setMeetUrl(data.meetUrl || "");
      setResultMessage(data.isMock ? "Demo Mode: Scheduled with simulated Google Meet." : "Meeting scheduled successfully! Invite sent.");
      playChime();
    } catch {
      setStatus("error");
      setResultMessage("Network error. Please try again.");
    }
  };

  // Get tomorrow's date string as minimum date for scheduling
  const today = new Date();
  today.setDate(today.getDate() + 1);
  const minDate = today.toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="relative w-full max-w-[480px] rounded-xl border border-border bg-background p-5 sm:p-6 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-border">
          <div className="flex items-center gap-2">
            <svg
              className="text-[#9c9c9c] dark:text-[#5c5c5c]"
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M8 2v4" />
              <path d="M16 2v4" />
              <rect width="18" height="18" x="3" y="4" rx="2" />
              <path d="M3 10h18" />
            </svg>
            <h3 className="text-base font-bold text-title">Schedule a Google Meet</h3>
          </div>

          <button
            type="button"
            onClick={() => {
              playClick();
              onClose();
            }}
            className="rounded-lg p-1 text-mutedForeground hover:bg-mutedBackground hover:text-foreground transition-colors cursor-pointer"
            aria-label="Close dialog"
          >
            ✕
          </button>
        </div>

        {status === "success" ? (
          <div className="pt-5 flex flex-col gap-3 text-center items-center">
            <div className="size-10 rounded-full bg-green-500/10 text-green-500 flex items-center justify-center text-lg font-bold">
              ✓
            </div>
            <p className="text-sm font-medium text-foreground">{resultMessage}</p>
            {meetUrl && (
              <a
                href={meetUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg border border-border bg-mutedBackground text-xs font-mono text-title hover:border-foreground/40 transition-colors"
              >
                <span>Google Meet:</span>
                <span className="underline truncate max-w-[240px]">{meetUrl}</span>
              </a>
            )}
            <button
              type="button"
              onClick={onClose}
              className="mt-4 px-4 py-1.5 rounded-lg bg-foreground text-background text-xs font-medium cursor-pointer hover:opacity-90 transition-opacity"
            >
              Done
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="pt-4 flex flex-col gap-3.5">
            {/* Anti-Spam Honeypot field (hidden from visual users) */}
            <div className="hidden" aria-hidden="true">
              <label htmlFor="company_website_input">Leave blank</label>
              <input
                id="company_website_input"
                type="text"
                value={honeypot}
                onChange={(e) => setHoneypot(e.target.value)}
                tabIndex={-1}
                autoComplete="off"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-mutedForeground" htmlFor="schedule_name">
                Your Name *
              </label>
              <input
                id="schedule_name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Alex"
                className="px-2.5 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-mutedForeground" htmlFor="schedule_email">
                Your Email *
              </label>
              <input
                id="schedule_email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="alex@example.com"
                className="px-2.5 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-mutedForeground" htmlFor="schedule_date">
                  Date *
                </label>
                <input
                  id="schedule_date"
                  type="date"
                  required
                  min={minDate}
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="px-2 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label className="text-xs font-medium text-mutedForeground" htmlFor="schedule_time">
                  Time (BRT) *
                </label>
                <select
                  id="schedule_time"
                  value={timeSlot}
                  onChange={(e) => setTimeSlot(e.target.value)}
                  className="px-2 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors cursor-pointer"
                >
                  <option value="10:00">10:00 AM</option>
                  <option value="11:00">11:00 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="15:00">03:00 PM</option>
                  <option value="16:00">04:00 PM</option>
                  <option value="17:00">05:00 PM</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-xs font-medium text-mutedForeground" htmlFor="schedule_topic">
                Topic / Notes
              </label>
              <input
                id="schedule_topic"
                type="text"
                value={topic}
                onChange={(e) => setTopic(e.target.value)}
                placeholder="Frontend architecture, consulting, etc."
                className="px-2.5 py-1.5 rounded-lg border border-border bg-background text-sm text-foreground focus:outline-none focus:border-foreground/50 transition-colors"
              />
            </div>

            {status === "error" && (
              <p className="text-xs text-red-500 font-medium">{resultMessage}</p>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="mt-2 w-full py-2 px-3 rounded-lg border border-border bg-foreground text-background text-xs font-semibold hover:opacity-90 disabled:opacity-50 transition-all cursor-pointer select-none"
            >
              {status === "loading" ? "Scheduling Meet..." : "Confirm & Generate Meet Link"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
