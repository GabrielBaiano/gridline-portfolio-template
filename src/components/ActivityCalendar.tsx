"use client";

import React, { useEffect, useRef } from "react";
import rawContributions from "@/data/contributions.json";

interface DayData {
  date: string;
  count: number;
  weekday: number;
  level: number;
}

interface WeekData {
  days: DayData[];
}

export function ActivityCalendar() {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    el.scrollLeft = el.scrollWidth;
    const rafId = requestAnimationFrame(() => {
      el.scrollLeft = el.scrollWidth;
    });

    return () => cancelAnimationFrame(rafId);
  }, []);
  const data = rawContributions as {
    totalContributions: number;
    yearContributions?: number;
    currentYear?: number;
    weeks: WeekData[];
  };

  const weeksList = data.weeks || [];
  const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const months: { name: string; x: number }[] = [];

  let lastMonth = -1;
  weeksList.forEach((week, wIdx) => {
    const firstDay = week.days[0];
    if (firstDay && firstDay.date) {
      const m = new Date(firstDay.date + "T00:00:00").getMonth();
      if (m !== lastMonth) {
        if (weeksList.length - wIdx >= 3) {
          months.push({
            name: monthNames[m],
            x: wIdx * 12.5,
          });
        }
        lastMonth = m;
      }
    }
  });

  let detectedYear = new Date().getFullYear();
  for (let i = weeksList.length - 1; i >= 0; i--) {
    const days = weeksList[i]?.days || [];
    for (let j = days.length - 1; j >= 0; j--) {
      if (days[j]?.date) {
        detectedYear = new Date(days[j].date + "T00:00:00").getFullYear();
        break;
      }
    }
    if (detectedYear) break;
  }

  const currentYear = data.currentYear || detectedYear;
  const yearPrefix = `${currentYear}-`;
  let count = 0;
  weeksList.forEach((w) => {
    w.days.forEach((d) => {
      if (d.date && d.date.startsWith(yearPrefix)) {
        count += d.count;
      }
    });
  });

  const yearTotal = data.yearContributions ?? count;
  const totalGridWidth = weeksList.length > 0 ? (weeksList.length - 1) * 12.5 + 10 : 660;

  return (
    <section className="max-w-[690px] mx-2 flex justify-center sm:mx-8 md:mx-auto p-3 border-[#d1d1d1] dark:border-[#313131] container-dashed">
      <article
        className="react-activity-calendar select-none"
        style={{
          width: "max-content",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "12px",
        }}
      >
        <div
          ref={scrollRef}
          className="react-activity-calendar__scroll-container no-scrollbar touch-pan-x"
          style={{
            maxWidth: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            paddingTop: "2px",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <svg
            className="react-activity-calendar__calendar"
            height="105"
            width={totalGridWidth}
            viewBox={`0 0 ${totalGridWidth} 105`}
            style={{ display: "block", overflow: "visible" }}
          >
            {/* Months Header */}
            <g className="react-activity-calendar__legend-month">
              {months.map((m, idx) => (
                <text
                  key={idx}
                  x={m.x}
                  y="0"
                  dominantBaseline="hanging"
                  fill="currentColor"
                >
                  {m.name}
                </text>
              ))}
            </g>

            {/* Weeks & Days: exact 12.5 stride (10px cell + 2.5px gap) matching react-activity-calendar */}
            {weeksList.map((week, wIdx) => (
              <g key={wIdx} transform={`translate(${wIdx * 12.5}, 0)`}>
                {week.days.map((day, dIdx) => (
                  <rect
                    key={dIdx}
                    x="0"
                    y={20 + day.weekday * 12.5}
                    width="10"
                    height="10"
                    rx="2"
                    ry="2"
                    fill={`var(--cal-l${day.level})`}
                    data-date={day.date}
                    data-level={day.level}
                    style={{ stroke: "rgba(0, 0, 0, 0.08)" }}
                    className="transition-opacity duration-150 hover:opacity-80"
                  >
                    <title>{`${day.count} activities on ${day.date}`}</title>
                  </rect>
                ))}
              </g>
            ))}
          </svg>
        </div>

        {/* Footer with Activity Count and Legend */}
        <footer
          className="react-activity-calendar__footer"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px 16px",
            whiteSpace: "nowrap",
          }}
        >
          <div className="react-activity-calendar__count">
            {yearTotal.toLocaleString()} activities in {currentYear}
          </div>

          <div
            className="react-activity-calendar__legend-colors"
            style={{
              marginLeft: "auto",
              display: "flex",
              alignItems: "center",
              gap: "3px",
            }}
          >
            <span style={{ marginRight: "0.4em" }}>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <svg key={level} width="10" height="10">
                <rect
                  width="10"
                  height="10"
                  fill={`var(--cal-l${level})`}
                  rx="2"
                  ry="2"
                  style={{ stroke: "rgba(0, 0, 0, 0.08)" }}
                />
              </svg>
            ))}
            <span style={{ marginLeft: "0.4em" }}>More</span>
          </div>
        </footer>
      </article>
    </section>
  );
}
