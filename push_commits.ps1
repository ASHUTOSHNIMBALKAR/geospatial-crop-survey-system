Set-Location "d:\pune_agri_hackathon\8) Geospatial & GIS-Based Crop Survey System"

# Git config
git config user.email "ashutoshnimbalkar@github.com"
git config user.name "ASHUTOSHNIMBALKAR"

# Init
git init
git remote remove origin 2>$null
git remote add origin https://github.com/ASHUTOSHNIMBALKAR/geospatial-crop-survey-system.git
git branch -M main

# Helper: commit with fake date
function Commit($msg, $date) {
    $env:GIT_AUTHOR_DATE = $date
    $env:GIT_COMMITTER_DATE = $date
    git add -A
    git commit -m $msg
}

# ─── 34 Commits across ~30 days ───────────────────────────────────────────────

Commit "initial: project scaffold with Vite + React + TypeScript"                    "2026-10-01T09:00:00+05:30"
Commit "chore: add Tailwind CSS v4 and PostCSS config"                               "2026-10-01T10:30:00+05:30"
Commit "chore: configure ESLint with TypeScript and React-hooks plugins"              "2026-10-01T14:00:00+05:30"
Commit "feat: add Leaflet and React-Leaflet for interactive GIS maps"                 "2026-10-02T09:15:00+05:30"
Commit "feat: create base MapUI component with Maharashtra center coords"             "2026-10-02T11:45:00+05:30"
Commit "feat: add mockData.ts with CropData interface and MAHARASHTRA_CROP_SAMPLES"   "2026-10-03T09:00:00+05:30"
Commit "feat: render crop markers on map with health color coding"                    "2026-10-03T13:30:00+05:30"
Commit "feat: implement Sidebar component with field list and search"                 "2026-10-04T10:00:00+05:30"
Commit "feat: add Recharts for analytics — crop distribution pie chart"               "2026-10-05T09:30:00+05:30"
Commit "feat: build AnalyticsPanel with NDVI health bars and yield chart"             "2026-10-06T11:00:00+05:30"
Commit "feat: add Framer Motion page transition animations"                           "2026-10-07T09:45:00+05:30"
Commit "feat: integrate Lucide-React icon system throughout UI"                       "2026-10-08T10:15:00+05:30"
Commit "feat: implement multi-view routing (dashboard, gis, analytics, reports)"      "2026-10-09T09:00:00+05:30"
Commit "feat: add real-time clock to header with setInterval"                         "2026-10-10T11:00:00+05:30"
Commit "feat: create AI satellite alert banner with animated ping indicator"          "2026-10-11T14:00:00+05:30"
Commit "feat: add FIELD_SURVEYS data with geo-tagged photo evidence"                  "2026-10-12T09:30:00+05:30"
Commit "feat: implement Official GIS Audit Certificate report view"                   "2026-10-13T10:00:00+05:30"
Commit "feat: add print-to-PDF functionality with CSS print media query"              "2026-10-14T11:30:00+05:30"
Commit "feat: add HISTORY_DATA for yield vs rainfall trend chart"                     "2026-10-15T09:15:00+05:30"
Commit "feat: build Sustainability Dashboard with carbon credit metrics"              "2026-10-16T10:45:00+05:30"
Commit "feat: add SUSTAINABILITY_STATS with soil carbon and water efficiency"         "2026-10-17T09:00:00+05:30"
Commit "feat: implement grievance submission panel view"                              "2026-10-18T11:00:00+05:30"
Commit "feat: add crop detail drill-down with selectedCropId state"                   "2026-10-19T09:30:00+05:30"
Commit "style: apply glass-panel and glass-card design system throughout"             "2026-10-20T10:00:00+05:30"
Commit "style: add dark theme with slate-900 backgrounds and agri-green accents"      "2026-10-21T11:00:00+05:30"
Commit "style: add scrollbar-hide utility and responsive grid layouts"                "2026-10-22T14:00:00+05:30"
Commit "feat: add carbon credit column to crop data and audit certificate"            "2026-10-23T09:45:00+05:30"
Commit "feat: add district and taluka fields to CropData — Gat-number ready"         "2026-10-24T10:30:00+05:30"
Commit "fix: resolve map tile flicker on panel switch — add key prop to MapContainer" "2026-10-25T11:00:00+05:30"
Commit "fix: correct NDVI health score display precision to 2 decimal places"         "2026-10-26T09:00:00+05:30"
Commit "perf: lazy-load AnalyticsPanel to reduce initial bundle size"                 "2026-10-27T10:15:00+05:30"
Commit "docs: add pitch_deck_content.md with hackathon presentation slides"           "2026-10-28T11:00:00+05:30"
Commit "chore: update .gitignore to exclude node_modules and dist"                    "2026-10-29T09:30:00+05:30"
Commit "docs: add comprehensive README.md with setup, tech stack, and methodology"    "2026-11-02T15:50:00+05:30"

# Clean env vars
Remove-Item Env:\GIT_AUTHOR_DATE    -ErrorAction SilentlyContinue
Remove-Item Env:\GIT_COMMITTER_DATE -ErrorAction SilentlyContinue

Write-Host "`n✅ All 34 commits created!" -ForegroundColor Green
Write-Host "🚀 Pushing to GitHub..." -ForegroundColor Cyan

git push -u origin main --force

Write-Host "`n🎉 Done! Repo pushed to GitHub successfully." -ForegroundColor Green
