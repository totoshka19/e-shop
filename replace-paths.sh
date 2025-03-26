#!/bin/bash

# Замена путей в файлах JavaScript и HTML
for file in dist/assets/*.js dist/index.html; do
sed -i 's|^\([^/e-shop]*\)/images/|/e-shop/images/|g' "$file"
done

echo "Пути к изображениям успешно заменены!"
