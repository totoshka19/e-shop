# Создаем подпапку e-shop
New-Item -ItemType Directory -Path "dist/e-shop" -Force

# Перемещаем все файлы в подпапку e-shop
Get-ChildItem -Path "dist" | Where-Object { $_.Name -ne "e-shop" } | Move-Item -Destination "dist/e-shop"

# Замена путей в файлах JavaScript и HTML
Get-ChildItem -Path "dist/e-shop/assets" -Filter *.js | ForEach-Object {
  (Get-Content $_.FullName) -replace '/images/', '/e-shop/images/' | Set-Content $_.FullName
}

(Get-Content "dist/e-shop/index.html") -replace '/images/', '/e-shop/images/' | Set-Content "dist/e-shop/index.html"

Write-Host "Файлы успешно перемещены в папку e-shop!"
