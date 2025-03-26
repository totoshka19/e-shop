#!/bin/bash

# Замена путей в файлах JavaScript
for file in dist/assets/*.js; do
sed -i 's|/images/|/e-shop/images/|g' "$file"
done

echo "Пути к изображениям успешно заменены!"
