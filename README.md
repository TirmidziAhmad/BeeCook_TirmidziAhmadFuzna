# BeeCook

BeeCook is a recipe discovery and recipe management web application built with Next.js. It lets users browse recipes by category, open recipe detail pages, and manage recipe data through create, edit, delete, and image upload flows.

Link: 
https://bee-cook-tirmidzi-ahmad-fuzna.vercel.app/

<img width="1883" height="1106" alt="image" src="https://github.com/user-attachments/assets/07ad0ae9-5bc8-44ab-9148-9ddafee49fe4" />


The app consumes an external REST API provided for the Gbee Glow Indonesia frontend developer pretest.

## Tech Stack

- Next.js 16 with App Router
- React 19
- TypeScript
- Tailwind CSS 4
- Lucide React icons
- shadcn/base-ui style primitives

## Features

- Landing page with category discovery
- Recipe listing page with category filter, search query support, and pagination state
- Recipe detail page with hero image, category, cooking duration, description, nutrition, ingredients, and cooking steps
- Recipe management page
- Create and edit recipe form
- Delete recipe action
- Recipe image upload with drag-and-drop preview
- Remote images from Google Drive file IDs

## Project Structure

```text
src/
  app/
    page.tsx                 Home page
    resep/page.tsx           Recipe listing page
    resep/[id]/page.tsx      Recipe detail page
    kelola/page.tsx          Recipe management page
    kelola/tambah/page.tsx   Create recipe page
    kelola/[id]/edit/page.tsx Edit recipe page
  components/
    recipe-form-page.tsx
    recipe-management-table.tsx
    site-header.tsx
    site-footer.tsx
    ui/
  lib/
    api/
      config.ts              API base URL and fetch helper
      menu.ts                Menu API service
      category.ts            Category API service
      welcome.ts             Welcome API service
  types/
    api.ts                   API request and response types
public/
  images/                    Static visual assets
  icons/                     Static icons
api.md                       Postman-style API reference
```

## Data Fetching

BeeCook uses a hybrid data-fetching approach:

- Public read pages fetch data server-side through Next.js Server Components.
- Admin form interactions and mutations run client-side from Client Components.

Server-side examples:

- `src/app/page.tsx` fetches categories for the home page.
- `src/app/resep/page.tsx` fetches categories and paginated menus.
- `src/app/resep/[id]/page.tsx` fetches recipe detail data.
- `src/app/kelola/page.tsx` fetches the initial management table data.

Client-side examples:

- `src/components/recipe-form-page.tsx` loads categories and existing recipe data with `useEffect`.
- `src/components/recipe-form-page.tsx` creates and updates menus.
- `src/components/recipe-management-table.tsx` deletes menus and uploads images.

The app does not define internal Next.js API routes or a local database layer. It communicates directly with the external API.

## API

The API base URL is defined in `src/lib/api/config.ts`:

```ts
export const API_BASE_URL = "https://frontend-api.gbeeglow.id";
```

Main endpoints used by the app:

| Method | Endpoint | Purpose |
| --- | --- | --- |
| `GET` | `/category` | Get categories |
| `PUT` | `/category/upload/:id` | Upload category image |
| `GET` | `/menu` | Get menus with optional `page`, `limit`, `search`, and `category_id` query params |
| `GET` | `/menu/find/:id` | Get menu by ID |
| `GET` | `/menu/detail/:slug` | Get menu detail by slug |
| `POST` | `/menu` | Create menu |
| `PATCH` | `/menu/update/:id` | Update menu |
| `DELETE` | `/menu/delete/:id` | Delete menu |
| `PUT` | `/menu/upload/:id` | Upload menu image |
| `GET` | `/welcome` | Get welcome response |

See `api.md` for the full exported API collection.

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open the app:

```text
http://localhost:3000
```

## Available Scripts

```bash
npm run dev
```

Starts the local development server.

```bash
npm run build
```

Builds the app for production.

```bash
npm run start
```

Starts the production server after a successful build.

```bash
npm run lint
```

Runs ESLint.

## Routes

| Route | Description |
| --- | --- |
| `/` | Home page |
| `/resep` | Recipe listing page |
| `/resep?category_id=:id` | Filtered recipe listing |
| `/resep/:id-or-slug` | Recipe detail page |
| `/kelola` | Recipe management page |
| `/kelola/tambah` | Create recipe page |
| `/kelola/:id/edit` | Edit recipe page |

## Image Handling

Menu and category images are resolved from Google Drive file IDs:

```ts
getImageUrl(fileId) => `https://drive.google.com/uc?id=${fileId}`
```

Allowed remote image hosts are configured in `next.config.ts`:

- `frontend-api.gbeeglow.id`
- `drive.google.com`
- `lh3.googleusercontent.com`

## Development Notes

- This project currently uses a hardcoded API base URL instead of environment variables.
- Mutating operations are called from the browser, so any production use should review API security, authentication, and CORS behavior.
- Some API response fields are still typed loosely in the codebase and can be tightened as the API contract stabilizes.
