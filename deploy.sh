#!/bin/bash

set -e

PROJECT_DIR="$HOME/artur-dasha-love.ru"
PUBLIC_DIR="$PROJECT_DIR/public_html"
REPO_URL="https://github.com/ArturUshakov/wedding-2026.git"
REPO_DIR="$PROJECT_DIR/repo-temp"

echo "Папка проекта: $PROJECT_DIR"
echo "Папка сайта: $PUBLIC_DIR"

cd "$PROJECT_DIR"

if [ ! -d "$PUBLIC_DIR" ]; then
    echo "Ошибка: папка public_html не найдена: $PUBLIC_DIR"
    exit 1
fi

if [ "$PWD" = "$PUBLIC_DIR" ]; then
    echo "Ошибка: скрипт нельзя запускать из public_html"
    exit 1
fi

rm -rf "$REPO_DIR"

echo "Клонируем репозиторий..."
git clone "$REPO_URL" "$REPO_DIR"

echo "Очищаем public_html, кроме cgi-bin..."
find "$PUBLIC_DIR" -mindepth 1 \
    ! -name 'cgi-bin' \
    ! -path "$PUBLIC_DIR/cgi-bin/*" \
    -exec rm -rf {} +

echo "Копируем файлы сайта..."
cp -r "$REPO_DIR"/* "$PUBLIC_DIR/"

find "$REPO_DIR" -mindepth 1 -maxdepth 1 -name ".*" \
    ! -name ".git" \
    ! -name "." \
    ! -name ".." \
    -exec cp -r {} "$PUBLIC_DIR/" \;

rm -rf "$REPO_DIR"

if [ ! -f "$PUBLIC_DIR/index.html" ]; then
    echo "Ошибка: index.html не найден в public_html"
    echo "Проверь структуру репозитория."
    exit 1
fi

echo "Готово."
ls -la "$PUBLIC_DIR"