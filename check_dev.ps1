$ErrorActionPreference = "Stop"

# Check if dev server is running
$port = Get-NetTCPConnection -LocalPort 3000 -ErrorAction SilentlyContinue
if (-not $port) {
    Write-Host "Dev server not running on port 3000"
    exit 1
}

Write-Host "Dev server running on port 3000"

# Fetch HTML
$html = (Invoke-WebRequest -Uri "http://localhost:3000" -UseBasicParsing).Content

# Check for key elements
Write-Host ""
Write-Host "=== Checking rendered HTML ==="
Write-Host "Has '8,360': $($html -match '8,360')"
Write-Host "Has 'Space Mono': $($html -match 'Space Mono')"
Write-Host "Has 'Global Population': $($html -match 'Global Population')"
Write-Host "Has 'Living. Breathing': $($html -match 'Living\. Breathing')"

# Find population number
if ($html -match '8[0-9,]{9,}') {
    Write-Host "Found population: $($Matches[0])"
} else {
    Write-Host "Population number NOT found"
}

Write-Host ""
Write-Host "=== Checking Dashboard.tsx ==="
$dashboardCode = Get-Content "components\Dashboard.tsx" -Raw
Write-Host "Has setPopulation: $($dashboardCode -match 'setPopulation')"
Write-Host "Has populationFormatted: $($dashboardCode -match 'populationFormatted')"
Write-Host "Has Space Mono: $($dashboardCode -match 'Space Mono')"
Write-Host "Has calculateMetric: $($dashboardCode -match 'calculateMetric')"

Write-Host ""
Write-Host "=== Checking messages ==="
$en = Get-Content "messages\en.json" -Raw | ConvertFrom-Json
Write-Host "en hero keys: $($en.dashboard.hero.PSObject.Properties.Name -join ', ')"
$zh = Get-Content "messages\zh.json" -Raw | ConvertFrom-Json
Write-Host "zh hero keys: $($zh.dashboard.hero.PSObject.Properties.Name -join ', ')"

Write-Host ""
Write-Host "=== Done ==="
