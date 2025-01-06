Get-ChildItem dist/assets/*.js | ForEach-Object {
  (Get-Content $_.FullName) -replace '/images/', '/e-shop/images/' | Set-Content $_.FullName
}
Write-Host "Пути к изображениям успешно заменены!"
