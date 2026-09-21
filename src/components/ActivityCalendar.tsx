"use client";

import React, { useMemo } from "react";
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
  const data = rawContributions as {
    totalContributions: number;
    weeks: WeekData[];
  };

  const { months, weeks } = useMemo(() => {
    const weeksList = data.weeks || [];
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const monthLabels: { name: string; x: number }[] = [];

    let lastMonth = -1;
    weeksList.forEach((week, wIdx) => {
      const firstDay = week.days[0];
      if (firstDay && firstDay.date) {
        const m = new Date(firstDay.date + "T00:00:00").getMonth();
        if (m !== lastMonth) {
          lastMonth = m;
          monthLabels.push({
            name: monthNames[m],
            x: wIdx * 12.5,
          });
        }
      }
    });

    return { months: monthLabels, weeks: weeksList };
  }, [data]);

  return (
    <section className="max-w-[690px] mx-2 flex justify-center sm:mx-8 md:mx-auto p-3 border-[#d1d1d1] dark:border-[#313131] container-dashed">
      <article
        className="react-activity-calendar w-full select-none"
        style={{
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "8px",
          fontSize: "12px",
        }}
      >
        <div
          className="react-activity-calendar__scroll-container"
          style={{ maxWidth: "100%", overflowX: "auto", overflowY: "hidden", paddingTop: "2px" }}
        >
          <svg
            className="react-activity-calendar__calendar text-mutedForeground"
            height="115"
            width={Math.max(660, weeks.length * 12.5 + 20)}
            viewBox={`0 0 ${Math.max(660, weeks.length * 12.5 + 20)} 115`}
            style={{ display: "block", overflow: "visible" }}
          >
            {/* Months Header */}
            <g className="react-activity-calendar__legend-month">
              {months.map((m, idx) => (
                <text
                  key={idx}
                  dominantBaseline="hanging"
                  fill="currentColor"
                  fontSize="10"
                  x={m.x}
                  y="0"
                >
                  {m.name}
                </text>
              ))}
            </g>

            {/* Weeks & Days */}
            {weeks.map((week, wIdx) => (
              <g key={wIdx} transform={`translate(${wIdx * 12.5}, 0)`}>
                {week.days.map((day, dIdx) => (
                  <rect
                    key={dIdx}
                    x="0"
                    y={18 + day.weekday * 12.5}
                    width="10"
                    height="10"
                    rx="2"
                    ry="2"
                    fill={`var(--cal-l${day.level})`}
                    style={{ stroke: "rgba(0, 0, 0, 0.06)" }}
                    className="transition-opacity duration-150 hover:opacity-80"
                  >
                    <title>{`${day.count} contributions on ${day.date}`}</title>
                  </rect>
                ))}
              </g>
            ))}
          </svg>
        </div>

        {/* Footer with Real Contribution Count and Legend */}
        <footer
          className="react-activity-calendar__footer text-mutedForeground text-xs pt-1"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px 16px",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span className="font-medium text-foreground">
            {data.totalContributions ? data.totalContributions.toLocaleString() : "1,530"}{" "}
            activities in the last year
          </span>

          <div
            className="react-activity-calendar__legend-colors"
            style={{ alignItems: "center", display: "flex", gap: "3px" }}
          >
            <span style={{ marginRight: "0.4em" }}>Less</span>
            {[0, 1, 2, 3, 4].map((level) => (
              <svg key={level} height="10" width="10">
                <rect
                  fill={`var(--cal-l${level})`}
                  height="10"
                  width="10"
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
