#!/bin/bash

# Проходим по всем файлам .js в папке dist/assets
for file in dist/assets/*.js; do
# Заменяем '/images/' на '/e-shop/images/' в содержимом файла
sed -i 's|/images/|/e-shop/images/|g' "$file"
done

echo "Пути к изображениям успешно заменены!"
