Get-ChildItem -Path 'app' -Recurse -Include *.tsx | ForEach-Object {
    $content = Get-Content $_.FullName -Raw
    $original = $content
    $content = $content -replace 'emerald-400', 'red-400'
    $content = $content -replace 'emerald-300', 'red-300'
    $content = $content -replace 'emerald-500', 'red-500'
    $content = $content -replace 'emerald-200', 'red-200'
    $content = $content -replace 'cyan-200', 'red-200'
    $content = $content -replace 'cyan-500', 'red-500'
    $content = $content -replace 'cyan-600', 'red-600'
    $content = $content -replace 'cyan-400', 'red-400'
    $content = $content -replace 'cyan-950', 'red-950'
    $content = $content -replace '#34d399', '#ff6b6b'
    $content = $content -replace '#22d3ee', '#ff6b6b'
    if($content -ne $original) {
        Set-Content $_.FullName -Value $content -NoNewline
        Write-Host ('Updated: ' + $_.Name)
    }
}
