import fs from "fs";
import path from "path";
import { execSync } from "child_process";

const USERNAME = "GabrielBaiano";
const OUTPUT_FILE = path.join(process.cwd(), "src/data/contributions.json");

const QUERY = `
query($userName: String!) {
  user(login: $userName) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks {
          contributionDays {
            contributionCount
            date
            weekday
          }
        }
      }
    }
  }
}
`;

async function fetchWithToken(token) {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      "User-Agent": "GitHub-Contributions-Fetcher",
    },
    body: JSON.stringify({ query: QUERY, variables: { userName: USERNAME } }),
  });
  if (!res.ok) {
    throw new Error(`GitHub API error: ${res.status} ${res.statusText}`);
  }
  return res.json();
}

function fetchWithGhCli() {
  const output = execSync(
    `gh api graphql -f query='${QUERY.replace(/\n/g, " ")}' -F userName=${USERNAME}`,
    { encoding: "utf-8" }
  );
  return JSON.parse(output);
}

function calculateLevel(count) {
  if (count === 0) return 0;
  if (count <= 2) return 1;
  if (count <= 6) return 2;
  if (count <= 12) return 3;
  return 4;
}

async function main() {
  console.log(`Fetching GitHub contributions for ${USERNAME}...`);
  let data;
  const token = process.env.GITHUB_TOKEN || process.env.GH_TOKEN;

  if (token) {
    console.log("Using GITHUB_TOKEN from environment...");
    data = await fetchWithToken(token);
  } else {
    console.log("No GITHUB_TOKEN found, attempting gh CLI...");
    try {
      data = fetchWithGhCli();
    } catch (err) {
      console.error("gh CLI failed, reading existing contributions:", err.message);
      return;
    }
  }

  const calendar = data?.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    console.error("No contribution calendar data received:", JSON.stringify(data));
    process.exit(1);
  }

  const processed = {
    username: USERNAME,
    totalContributions: calendar.totalContributions,
    updatedAt: new Date().toISOString(),
    weeks: calendar.weeks.map((week) => ({
      days: week.contributionDays.map((day) => ({
        date: day.date,
        count: day.contributionCount,
        weekday: day.weekday,
        level: calculateLevel(day.contributionCount),
      })),
    })),
  };

  fs.mkdirSync(path.dirname(OUTPUT_FILE), { recursive: true });
  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(processed, null, 2), "utf-8");
  console.log(`Saved ${processed.totalContributions} contributions across ${processed.weeks.length} weeks to ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
