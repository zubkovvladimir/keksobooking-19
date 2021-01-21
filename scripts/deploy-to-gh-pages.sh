#!/bin/bash

# Exit with nonzero exit code if anything fails.
set -e

git config user.name "Evgeniy Khaberev"
git config user.email "ehaberev@yandex.ru"

echo "Start to deploy..."

git checkout --orphan gh-pages
ls -l

git --work-tree add .
git --work-tree commit -m "Deploy to GitHub Pages"
git push -f origin HEAD:gh-pages

git checkout -f master
git branch -D gh-pages

echo "Successfully deployed"
