# 🧁 My Bakery 

A cozy, aesthetic baking website built with **React + Vite + Tailwind CSS + Supabase**.

---

## 🗂️ Project Structure

```
my-bakery/
├── index.html
├── vite.config.js
├── tailwind.config.js
├── postcss.config.js
├── package.json
├── .env.example
└── src/
    ├── main.jsx
    ├── App.jsx
    ├── index.css
    ├── lib/
    │   ├── supabase.js        ← All Supabase calls
    │   ├── AuthContext.jsx    ← Auth state provider
    │   └── sampleData.js      ← Demo recipes + category config
    ├── components/
    │   ├── Navbar.jsx
    │   ├── Footer.jsx
    │   ├── RecipeCard.jsx
    │   ├── CategoryGrid.jsx
    │   └── Toast.jsx
    └── pages/
        ├── LoginPage.jsx
        ├── HomePage.jsx
        ├── CategoriesPage.jsx
        ├── RecipesPage.jsx
        ├── RecipeDetailPage.jsx
        ├── UploadPage.jsx
        ├── MyRecipesPage.jsx
        └── ContactPage.jsx
```

---

## 🚀 Quick Start (Frontend Only — Demo Mode)

```bash
# 1. Install dependencies
npm install

# 2. Copy env file
cp .env.example .env

# 3. Run dev server
npm run dev
```

The app runs in **demo mode** with sample recipes — no Supabase needed to see the UI.

---

## 🔧 Supabase Setup (Full Backend)

### Step 1 — Create a Supabase project
Go to https://supabase.com → New Project → note your **Project URL** and **anon key**.

### Step 2 — Run this SQL in your Supabase SQL editor

```sql
-- Recipes table
create table recipes (
  id            uuid primary key default gen_random_uuid(),
  title         text not null,
  category      text,
  description   text,
  image_url     text,
  ingredients   text[],
  instructions  text[],
  time_minutes  int,
  difficulty    text,
  user_id       uuid references auth.users(id) on delete cascade,
  created_at    timestamptz default now()
);

-- Row Level Security
alter table recipes enable row level security;

create policy "Anyone can read recipes"
  on recipes for select using (true);

create policy "Authenticated users can insert"
  on recipes for insert
  with check (auth.uid() = user_id);

create policy "Owners can update"
  on recipes for update
  using (auth.uid() = user_id);

create policy "Owners can delete"
  on recipes for delete
  using (auth.uid() = user_id);
```

### Step 3 — Create Storage bucket

In Supabase Dashboard → Storage → New Bucket:
- Name: `recipe-images`
- Public: ✅ Yes

Add this policy to the bucket:
```sql
create policy "Public read images"
  on storage.objects for select using (bucket_id = 'recipe-images');

create policy "Auth users upload images"
  on storage.objects for insert
  with check (bucket_id = 'recipe-images' and auth.role() = 'authenticated');
```

### Step 4 — Enable Auth providers

In Supabase Dashboard → Authentication → Providers:
- **Email**: Enable ✅
- **Google**: Enable ✅ (requires Google OAuth credentials from console.cloud.google.com)

For Google OAuth, set the redirect URL in Google Console to:
```
https://your-project-id.supabase.co/auth/v1/callback
```

### Step 5 — Set environment variables

Edit your `.env` file:
```
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

### Step 6 — Connect the live data

In each page, the Supabase calls are commented out with instructions. To go live:

**RecipesPage.jsx** — replace sample data:
```js
// Replace:
setRecipes(SAMPLE_RECIPES)
// With:
fetchAllRecipes().then(setRecipes)
```

**MyRecipesPage.jsx**:
```js
fetchMyRecipes(user.id).then(setRecipes)
```

**UploadPage.jsx** — uncomment the Supabase block:
```js
let image_url = null
if (imageFile) {
  image_url = await uploadRecipeImage(imageFile, user.id)
}
await insertRecipe({ ...form, ingredients, instructions, image_url, user_id: user.id })
```

**MyRecipesPage.jsx** — delete & update:
```js
await deleteRecipe(id)          // on delete
await updateRecipe(id, updates) // on edit save
```

---

## 🎨 Color Palette

| Name        | Hex       |
|-------------|-----------|
| Brown       | `#6B4F3A` |
| Dark Brown  | `#4A3528` |
| Cream       | `#F5E6D3` |
| Light Cream | `#FDF6EE` |
| Sage Green  | `#A8C686` |
| Blush Pink  | `#F7C8C8` |

---

## 📦 Build for Production

```bash
npm run build
npm run preview
```

Deploy the `dist/` folder to **Vercel**, **Netlify**, or any static host.

For Vercel, set the environment variables in Project Settings → Environment Variables.

---

## 🧁 Features

- ✅ Google + Email/Password auth (Supabase Auth)
- ✅ Cozy bakery storefront login page with awning
- ✅ Sticky navbar with red striped awning decoration
- ✅ Hero section with floating bakery icons
- ✅ Animated category icons (bounce on hover)
- ✅ Recipe grid with search + category filter
- ✅ Recipe detail with interactive ingredient checkboxes
- ✅ Step-by-step instructions
- ✅ Upload form with dynamic ingredient/step inputs
- ✅ Image upload (Supabase Storage)
- ✅ My Recipes with edit + delete
- ✅ Contact page with FAQ
- ✅ Fully responsive (mobile + desktop)
- ✅ Smooth fade-in animations
- ✅ Toast notifications
