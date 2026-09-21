"use client";

import React, { useMemo } from "react";

export function ActivityCalendar() {
  const months = [
    { name: "Oct", x: 25 },
    { name: "Nov", x: 75 },
    { name: "Dec", x: 137.5 },
    { name: "Jan", x: 187.5 },
    { name: "Feb", x: 237.5 },
    { name: "Mar", x: 287.5 },
    { name: "Apr", x: 350 },
    { name: "May", x: 400 },
    { name: "Jun", x: 462.5 },
    { name: "Jul", x: 512.5 },
    { name: "Aug", x: 562.5 },
    { name: "Sep", x: 625 },
  ];

  const weeks = useMemo(() => {
    const list = [];
    let seed = 77;
    const random = () => {
      seed = (seed * 9301 + 49297) % 233280;
      return seed / 233280;
    };

    const colors = ["#f4f4f5", "#d4d4d8", "#a1a1aa", "#52525b", "#18181b"];

    for (let w = 0; w < 53; w++) {
      const days = [];
      for (let d = 0; d < 7; d++) {
        const val = random();
        let level = 0;
        if (val > 0.88) level = 4;
        else if (val > 0.72) level = 3;
        else if (val > 0.52) level = 2;
        else if (val > 0.3) level = 1;
        days.push(colors[level]);
      }
      list.push(days);
    }
    return list;
  }, []);

  return (
    <section className="max-w-[690px] mx-2 flex justify-center sm:mx-8 md:mx-auto p-3 border-[#d1d1d1] dark:border-[#313131] container-dashed">
      <article
        className="react-activity-calendar"
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
          className="react-activity-calendar__scroll-container"
          style={{ maxWidth: "100%", overflowX: "auto", overflowY: "hidden", paddingTop: "2px" }}
        >
          <svg
            className="react-activity-calendar__calendar text-mutedForeground"
            height="105"
            width="660"
            viewBox="0 0 660 105"
            style={{ display: "block", overflow: "visible" }}
          >
            <g className="react-activity-calendar__legend-month">
              {months.map((m, idx) => (
                <text
                  key={idx}
                  dominantBaseline="hanging"
                  fill="currentColor"
                  x={m.x}
                  y="0"
                >
                  {m.name}
                </text>
              ))}
            </g>

            {weeks.map((week, wIdx) => (
              <g key={wIdx} transform={`translate(${wIdx * 12.5}, 0)`}>
                {week.map((color, dIdx) => (
                  <rect
                    key={dIdx}
                    x="0"
                    y={20 + dIdx * 12.5}
                    width="10"
                    height="10"
                    rx="2"
                    ry="2"
                    fill={color}
                    style={{ stroke: "rgba(0, 0, 0, 0.08)" }}
                  />
                ))}
              </g>
            ))}
          </svg>
        </div>

        <footer
          className="react-activity-calendar__footer text-muted"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px 16px",
            justifyContent: "space-between",
          }}
        >
          <span>729 activities in 2025</span>
          <div
            className="react-activity-calendar__legend-colors"
            style={{ alignItems: "center", display: "flex", gap: "3px" }}
          >
            <span style={{ marginRight: "0.4em" }}>Less</span>
            {["#f4f4f5", "#d4d4d8", "#a1a1aa", "#52525b", "#18181b"].map((c, i) => (
              <svg key={i} height="10" width="10">
                <rect
                  fill={c}
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
