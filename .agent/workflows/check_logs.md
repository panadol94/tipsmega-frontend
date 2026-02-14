---
description: Check deployment logs from the Downloads folder
---

# Check Deployment Logs

This workflow checks the latest Coolify deployment log files from the Downloads folder.

// turbo-all

1. **List all deployment log files (sorted by latest)**

    ```powershell
    Get-ChildItem -Path "C:\Users\Acer\Downloads" -Filter "deployment-*" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object Name, LastWriteTime, @{N='SizeKB';E={[math]::Round($_.Length/1024,1)}} | Format-Table -AutoSize
    ```

2. **Show the last 50 lines of the most recent deployment log**

    ```powershell
    $latest = Get-ChildItem -Path "C:\Users\Acer\Downloads" -Filter "deployment-*" -ErrorAction SilentlyContinue | Sort-Object LastWriteTime -Descending | Select-Object -First 1; if ($latest) { Write-Host "`n=== $($latest.Name) ===" -ForegroundColor Cyan; Write-Host "Last Modified: $($latest.LastWriteTime)" -ForegroundColor Yellow; Write-Host ""; Get-Content $latest.FullName -Tail 50 } else { Write-Host "No deployment log files found in Downloads" -ForegroundColor Red }
    ```
