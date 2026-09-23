import React from "react";
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
        // Skip first month if it has fewer than 2 weeks to avoid cramped label collision (e.g. Sep/Oct)
        if (wIdx >= 2 || weeksList.length <= 10) {
          months.push({
            name: monthNames[m],
            x: wIdx * 13,
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
  const weeks = weeksList;
  const totalGridWidth = Math.max(weeks.length * 13 - 3, 686);

  return (
    <section className="max-w-[690px] mx-2 flex justify-center sm:mx-8 md:mx-auto p-3 sm:p-3.5 border-[#d1d1d1] dark:border-[#313131] container-dashed">
      <article
        className="react-activity-calendar select-none w-full"
        style={{
          width: "max-content",
          maxWidth: "100%",
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          fontSize: "12px",
        }}
      >
        <div
          className="react-activity-calendar__scroll-container no-scrollbar touch-pan-x"
          style={{
            maxWidth: "100%",
            overflowX: "auto",
            overflowY: "hidden",
            padding: "1px 0",
            WebkitOverflowScrolling: "touch",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          <svg
            className="react-activity-calendar__calendar text-mutedForeground"
            height="116"
            width={totalGridWidth}
            viewBox={`0 0 ${totalGridWidth} 116`}
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
                  y="2"
                  className="font-normal select-none"
                >
                  {m.name}
                </text>
              ))}
            </g>

            {/* Weeks & Days: integer 13px stride (10px cell + 3px gap) for razor-sharp rendering */}
            {weeks.map((week, wIdx) => (
              <g key={wIdx} transform={`translate(${wIdx * 13}, 0)`}>
                {week.days.map((day, dIdx) => (
                  <rect
                    key={dIdx}
                    x="0"
                    y={22 + day.weekday * 13}
                    width="10"
                    height="10"
                    rx="2"
                    ry="2"
                    fill={`var(--cal-l${day.level})`}
                    className="transition-opacity duration-150 hover:opacity-80"
                  >
                    <title>{`${day.count} contributions on ${day.date}`}</title>
                  </rect>
                ))}
              </g>
            ))}
          </svg>
        </div>

        {/* Footer with Contribution Count and Legend */}
        <footer
          className="react-activity-calendar__footer text-mutedForeground text-xs"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "4px 16px",
            whiteSpace: "nowrap",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div className="react-activity-calendar__count font-normal text-mutedForeground text-[11.5px] sm:text-xs">
            {yearTotal.toLocaleString()} activities in {currentYear}
          </div>

          <div
            className="react-activity-calendar__legend-colors"
            style={{ marginLeft: "auto", alignItems: "center", display: "flex", gap: "3px" }}
          >
            <span style={{ marginRight: "0.3em" }} className="text-[11px] sm:text-xs text-mutedForeground">
              Less
            </span>
            {[0, 1, 2, 3, 4].map((level) => (
              <svg key={level} height="10" width="10">
                <rect
                  fill={`var(--cal-l${level})`}
                  height="10"
                  width="10"
                  rx="2"
                  ry="2"
                />
              </svg>
            ))}
            <span style={{ marginLeft: "0.3em" }} className="text-[11px] sm:text-xs text-mutedForeground">
              More
            </span>
          </div>
        </footer>
      </article>
    </section>
  );
}
