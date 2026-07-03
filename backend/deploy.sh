#!/bin/bash

echo "================================="
echo "Starting deployment..."
echo "================================="

cd /var/www/pmnmg

echo "Pulling latest changes..."
git pull origin main

cd backend

echo "Installing Composer packages..."
docker compose exec app composer install --no-dev --optimize-autoloader

echo "Installing Node packages..."
docker compose exec node npm install

echo "Building frontend..."
docker compose exec node npm run build

echo "Running migrations..."
docker compose exec app php artisan migrate --force

echo "Clearing caches..."
docker compose exec app php artisan optimize:clear

echo "Caching configuration..."
docker compose exec app php artisan optimize

echo "Deployment completed successfully!"
