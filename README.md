# 📸 Unsplash Gallery

A photo gallery application built with React, powered by the Unsplash API.

**Author:** Tornike Khutsishvili

---

## 🚀 Tech Stack

| Category     | Technology              |
| ------------ | ----------------------- |
| Framework    | React 19 + Vite 8       |
| Language     | TypeScript 6            |
| Styling      | Tailwind CSS v4         |
| Routing      | React Router v7         |
| Server State | TanStack React Query v5 |
| Client State | Redux Toolkit v2        |
| HTTP Client  | Axios v1                |

---

## ✅ Features

| Feature                                           | Status |
| ------------------------------------------------- | ------ |
| Photo feed from Unsplash API                      | ✅     |
| Max 20 photos per page                            | ✅     |
| Real-time search on keystroke                     | ✅     |
| Debounced search — no request on every keystroke | ✅     |
| Click photo → Modal with full details & EXIF     | ✅     |
| Infinite Scroll (IntersectionObserver)            | ✅     |
| React Query caching — search, pagination, detail | ✅     |
| Dark / Light mode (Redux)                         | ✅     |
| Full TypeScript coverage                          | ✅     |
| SOLID principles + composable components          | ✅     |

---

## 🔑 Getting an Unsplash API Key

1. Go to [unsplash.com/developers](https://unsplash.com/developers)
2. Create a new Application
3. Copy your **Access Key**

---

## ⚙️ Getting Started

```bash
# 1. Clone the repository
git clone https://github.com/your-username/unsplash-gallery.git
cd unsplash-gallery

# 2. Install dependencies
npm install

# 3. Set up environment variables
cp .env.example .env
# Open .env and add your Unsplash Access Key:
# VITE_UNSPLASH_ACCESS_KEY=your_key_here

# 4. Start the dev server
npm run dev
```

App runs at **http://localhost:5173**

---

## 🧠 Technical Decisions

### Debounced Search (450ms)

The `useDebounce` hook delays the search query by 450ms after the user stops typing, so no network request is fired on every keystroke.

```ts
const debouncedValue = useDebounce(value, 450);
useEffect(() => { onSearch(debouncedValue); }, [debouncedValue]);
```

### Infinite Scroll

An `IntersectionObserver` watches a sentinel `div` at the bottom of the list. As soon as it enters the viewport, `fetchNextPage()` is called automatically.

```ts
new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) onIntersect();
}, { rootMargin: '200px' });
```

### Caching Strategy

React Query caches every request using a centralised `queryKeys` factory. Re-searching the same keyword or re-opening the same photo never fires a second network request.

```ts
queryKeys.photos.search('red', 1)  // → ['photos', 'search', 'red', 1]
queryKeys.photos.detail('abc123')  // → ['photos', 'detail', 'abc123']
```

* **staleTime: 5 min** — editorial feed and search results
* **staleTime: 10 min** — individual photo details (modal)
* Pagination pages are also cached — `page` is part of the query key

### Dark / Light Mode (Redux)

Theme state lives in Redux and is persisted to `localStorage`. On page reload, the saved preference is restored automatically.

```ts
setTheme(state, action) {
  state.mode = action.payload;
  localStorage.setItem('theme', state.mode);
}
```

### SOLID Principles

* **S** — Each hook and component has a single responsibility (`photoService`, `queryKeys`, `usePhotos` are fully separate)
* **O** — `PhotoGrid` is open for extension via props without modifying the component itself
* **L** — `usePhotos` and `useSearchPhotos` are interchangeable — same return interface
* **I** — Props interfaces are minimal and focused
* **D** — `PhotoGrid` has no knowledge of `photoService`; data is injected by the parent

---

## 📦 Scripts

```bash
npm run dev       # Start dev server
npm run build     # Production build
npm run preview   # Preview production build
npm run lint      # Run ESLint
```
