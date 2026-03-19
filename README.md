# Arborize Netlify + Decap CMS Starter

This package keeps the current Arborize static site structure and adds a lightweight CMS layer for Netlify.

## What is editable right now
- Global settings
  - business name
  - phone
  - email
  - top bar location
  - top bar hours
  - footer tagline
  - service area line
- Homepage hero
  - badge
  - headline
  - subhead
  - body copy
  - primary CTA
  - secondary CTA
  - hero micro trust items
  - hero card title
  - hero card service summaries
  - hero card CTA

## Files added
- `/admin/index.html`
- `/admin/config.yml`
- `/data/site-settings.json`
- `/data/homepage.json`
- `/netlify.toml`

## How to use
1. Upload this folder to a GitHub repo.
2. Connect the repo to Netlify.
3. In Netlify, enable Identity.
4. In Netlify, enable Git Gateway.
5. Invite yourself as a user under Identity.
6. Go to `/admin` and log in.
7. Edit the JSON-backed content in Decap CMS.

## Notes
- The rest of the site still works as static HTML.
- This is the right first test before making services, testimonials, FAQ and contact content editable.
- `robots.txt` currently disallows all crawling, while `robots-live.txt` allows crawling and points to a sitemap. Use the right one when the site goes live.
