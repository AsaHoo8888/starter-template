# Next.js + Directus + PostgreSQL Starter

Reusable starter for building local CMS-driven websites and syncing them to GitHub.

## Stack

- Next.js App Router
- Directus CMS
- PostgreSQL
- Docker Compose

## Start A New Project

Use this repository as a GitHub template, or clone it and rename the folder.

```bash
git clone https://github.com/AsaHoo8888/starter-template.git my-new-site
cd my-new-site
cp .env.example .env.local
npm install
docker compose up -d
npm run dev
```

Open:

- Website: `http://localhost:3000`
- Directus: `http://localhost:8055`

Default Directus login comes from `.env.local`:

```txt
DIRECTUS_ADMIN_EMAIL=admin@example.com
DIRECTUS_ADMIN_PASSWORD=change-me
```

Change these values before using the project seriously.

## Per Project Setup

For each new website, update:

- `PROJECT_SLUG` in `.env.local`
- `package.json` name
- `app/layout.jsx` metadata
- Website content and styling
- Directus collections and roles
- GitHub remote repository

## Suggested Directus Collections

Create these manually in Directus when needed:

### `homepage`

- `eyebrow` string
- `title` string
- `description` text
- `cta_label` string
- `cta_href` string

### `contact_inquiries`

- `full_name` string
- `email` string
- `phone` string
- `company` string
- `message` text
- `source_page` string

If using API routes to write to Directus, create a static token in Directus and set:

```txt
DIRECTUS_STATIC_TOKEN=your-token
```

## Common Commands

```bash
npm run dev
npm run build
docker compose up -d
docker compose down
```

## GitHub Sync

```bash
git add .
git commit -m "Initial website"
git remote set-url origin git@github.com:AsaHoo8888/your-repo.git
git push -u origin main
```

## Hostinger VPS Docker Manager

Use this Docker Compose URL in Hostinger Docker Manager:

```txt
https://raw.githubusercontent.com/AsaHoo8888/starter-template/main/deploy/hostinger-compose.yml
```

Before using it for a real public site, edit `deploy/hostinger-compose.yml` and
replace:

- `change-this-postgres-password`
- `replace-with-a-long-random-key`
- `replace-with-a-long-random-secret`
- `admin@example.com`
- `change-this-admin-password`
- `2.25.185.14` with your VPS IP or domain

The Hostinger project runs three services:

- `postgres`: internal PostgreSQL database
- `directus`: CMS on port `8055`
- `nextjs`: website on port `3000`

After local changes, push to GitHub and redeploy/restart the Hostinger project so
the `nextjs` container pulls the latest code.
