$ErrorActionPreference = 'Stop'

$projectDirectory = Split-Path -Parent $MyInvocation.MyCommand.Path
$logDirectory = Join-Path $projectDirectory '.local-server'
$stdoutLog = Join-Path $logDirectory 'website.log'
$stderrLog = Join-Path $logDirectory 'website-error.log'
$websiteUrl = 'http://127.0.0.1:3000'

Set-Location $projectDirectory
New-Item -ItemType Directory -Force -Path $logDirectory | Out-Null

$listener = Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue

if (-not $listener) {
    if (-not (Test-Path (Join-Path $projectDirectory 'node_modules'))) {
        npm install
    }

    Start-Process -FilePath 'npm.cmd' `
        -ArgumentList @('run', 'dev', '--', '-H', '0.0.0.0') `
        -WorkingDirectory $projectDirectory `
        -WindowStyle Hidden `
        -RedirectStandardOutput $stdoutLog `
        -RedirectStandardError $stderrLog

    $ready = $false
    for ($attempt = 0; $attempt -lt 30; $attempt++) {
        Start-Sleep -Milliseconds 500
        if (Get-NetTCPConnection -LocalPort 3000 -State Listen -ErrorAction SilentlyContinue) {
            $ready = $true
            break
        }
    }

    if (-not $ready) {
        throw "The website server did not start. Check $stderrLog"
    }
}

Start-Process $websiteUrl
Write-Host "Website running at $websiteUrl"
