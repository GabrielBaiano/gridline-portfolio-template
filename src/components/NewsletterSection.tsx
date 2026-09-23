"use client";

import React, { useState } from "react";
import { useSound } from "./SoundProvider";

export function NewsletterSection() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { playClick } = useSound();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    playClick();
    setSubscribed(true);
  };

  return (
    <section className="max-w-[690px] mx-2 sm:mx-8 md:mx-auto border-[#d1d1d1] dark:border-[#313131] container-dashed">
      <div className="flex items-center justify-between p-3">
        <h2 className="text-[1.55rem] font-semibold text-title">Newsletter</h2>
      </div>

      <div className="divider-dashed"></div>

      <div className="flex flex-col gap-4 p-4 sm:p-6 bg-striped">
        {subscribed ? (
          <div className="p-3 rounded-lg border border-border bg-background text-sm text-green-600 dark:text-green-400">
            Thanks for subscribing!
          </div>
        ) : (
          <form
            onSubmit={handleSubmit}
            className="flex flex-col items-end sm:items-stretch sm:flex-row gap-3 w-full"
          >
            <label className="sr-only" htmlFor="email">
              Email address
            </label>
            <div className="flex-1 w-full border border-border rounded-lg p-0.5 bg-background">
              <input
                id="email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                required
                className="flex-1 px-2.5 py-[6px] placeholder:select-none rounded-[8px] w-full border border-border bg-background text-foreground focus:outline-none transition-all duration-300 placeholder:text-mutedForeground"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-32 border cursor-pointer rounded-lg border-border p-0.5 group bg-background select-none"
            >
              <div className="flex gap-1 items-center justify-center rounded-[8px] border border-border w-full h-full px-4 py-1.5 sm:py-0 bg-[#555] dark:bg-[#aaa] group-hover:bg-[#222] dark:group-hover:bg-[#f5f5f5] transition duration-300 text-white dark:text-black">
                <span className="text-[0.95rem] font-medium text-white dark:text-black">
                  Subscribe
                </span>
              </div>
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
