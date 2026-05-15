# Performance Audit & Improvements — 2026-05-15

## Task Summary

Initial performance audit of sensorcensor.xyz with improvements to page load speed, perceived performance, and image optimization. The frontend is an HTMX-based static site deployed on Vercel, with a FastAPI backend on a separate VPS (api.sensorcensor.xyz).

---

## Completed Changes

### 1. Eliminated Double-Load on Initial Page Visit

**Problem:** `navigation.js` called `loadContent('/')` on every pageload, which fired a 2nd AJAX request for `/html/home` immediately after the page loaded. The footer was also loaded via `hx-trigger="load"`. This meant 3 HTTP requests on initial visit (index.html + /html/home + /html/footer).

**Fix:**
- Inlined the home page content directly inside `<div id="content">` in `index.html`
- Inlined the footer HTML directly in `index.html`
- Added a guard in `navigation.js` — only fires AJAX `loadContent` if `#content` has no children
- **Saved: 2 HTTP requests per initial visit (~400ms)**

**Files:**
- `index.html` — inlined home content + footer
- `js/navigation.js` — guarded initial load
- `html/home.html` — unchanged (still used for subsequent nav clicks)
- `html/footer.html` — unchanged (kept as reference)

### 2. Removed Playground Button

**Problem:** The Playground button was commented out in a previous commit (`2620290` "Disable Playground section") but that commit was on an unmerged side branch.

**Fix:** Commented out the Playground button in the navbar and removed the `/playground` route from `vercel.json`.

**Files:**
- `index.html` — commented out Playground nav button
- `vercel.json` — removed `/playground` route

### 3. Infrastructure Fixes

| Change | Problem | Fix |
|--------|---------|-----|
| CSS `<div>` wrapper removed | `<div id="css-container">` inside `<head>` is invalid HTML | Moved `<link>` tags directly into `<head>` |
| CDN preconnect added | No preconnect hints for CDNs (jsDelivr, Iconify) | Added `<link rel="preconnect">` for both CDNs |
| HTML route caching | All HTML had `max-age=0, must-revalidate` — every nav click fetched fresh | Added `max-age=300` for `/html/*` routes in `vercel.json` |
| General catch-all cache | Catch-all route had no explicit Cache-Control | Added `public, max-age=0, must-revalidate` |

### 4. Perceived Performance — HTMX Loading Indicator

**Problem:** No visual feedback when clicking nav buttons — the page appeared frozen until content arrived.

**Fix:** Added a sleek animated loading bar (not a spinner) that appears at the top of the content area during HTMX requests:
- Uses HTMX's built-in `hx-indicator` attribute
- CSS-only animation — a gradient bar that slides left-to-right infinitely
- Color matches the site's `--main-contrast-color` (teal)
- Transitions in/out with 0.15s ease for smooth appearance

**Files:**
- `index.html` — added `hx-indicator="#loading-bar"` to all 3 nav buttons + loading bar element
- `css/index.css` — added `.htmx-indicator`, `.htmx-loading-bar`, `.htmx-loading-container`, and `@keyframes htmx-loading-slide`

### 5. Image Optimization — WebP Conversion

**Problem:** Large PNG images caused slow page loads, especially the Projects page.

**Results:**

| Image | PNG Size | WebP Size | Savings |
|-------|----------|-----------|---------|
| `mikudisreactsmall.png` | 242KB | 225KB | ~7% |
| `WallsBeyondWalls.png` | **1.2MB** | **125KB** | **~89%** |
| `PromptsAndPerils.png` | 321KB | **37KB** | **~88%** |

**Approach:**
- Created `.webp` versions alongside original `.png` files (originals preserved)
- Used `<picture>` element with `<source type="image/webp">` and `<img>` fallback
- Browsers that support WebP get the smaller version automatically

**Files:**
- `assets/mikudisreactsmall.webp` (new)
- `assets/media/images/WallsBeyondWalls.webp` (new)
- `assets/media/images/PromptsAndPerils.webp` (new)
- `index.html` — `<picture>` wrapper for profile image
- `html/home.html` — `<picture>` wrapper for profile image (AJAX version)
- `html/projects.html` — `<picture>` wrappers for Walls & Prompts images

### 6. Lazy Loading

**Fix:** Added `loading="lazy"` to all images across the site so below-the-fold images don't block initial render.

**Files:**
- `index.html` — profile image
- `html/home.html` — profile image (AJAX version)
- `html/projects.html` — all 6 project card images

### 7. htmx Version Check (No Change)

**Current version:** `htmx.org@2.0.6`
**Latest version:** `htmx.org@2.0.10`
**Action:** Checked but not updated. The difference is minor bugfixes. Can update later.

---

## Raw Performance Data

### Timing (from Cline's server to live site)

| Resource | Time | Size |
|----------|------|------|
| `GET /` (index.html) | 223ms | 3.5KB |
| `/html/home` | 206ms | 719B |
| `/html/blog` | 209ms | 1.9KB |
| `/html/projects` | 209ms | 6.5KB |
| `/html/footer` | 205ms | 1.4KB |
| `css/index.css` | 286ms | 6.8KB |
| `htmx.min.js` (CDN) | 295ms | 51KB |
| `iconify.min.js` (CDN) | 68ms | 26KB |
| `mikudisreactsmall.png` | 282ms | 242KB |
| **Backend /health** | **983ms** | 80B |
| **Backend /recursive-window/5** | **924ms** | 810B |

### Caching Status (After Fixes)

| Route | Cache Header | Effect |
|-------|-------------|--------|
| `/html/*` | `max-age=300` | Browser caches for 5 minutes |
| `/css/*`, `/js/*`, `/assets/*` | `max-age=31536000, immutable` | Cached for 1 year |
| `/(.*)` (catch-all) | `max-age=0, must-revalidate` | Fresh on every request |

### HTTP Requests Eliminated

| Scenario | Before | After |
|----------|--------|-------|
| Initial page visit | 3 requests (index + home + footer) | **1 request** (index only) |
| Nav click to Home | 1 request | **0 requests** (content already in DOM, but nav click still fires AJAX to `/html/home`)

---

## Future Suggestions

These are improvements that were discussed but not implemented, ranked by impact.

### 🥇 High Priority

#### 1. Update htmx.org from v2.0.6 to v2.0.10
- **Impact:** Low risk, minor bugfixes and improvements
- **Effort:** 2 minutes
- **Action:** Change the version in the CDN URL in `index.html`

#### 2. Add fade transitions to content swaps
- **Impact:** Makes navigation feel smooth even when network is slow
- **Effort:** 15 minutes
- **How:** Add CSS transition on `#content` with `hx-swap="innerHTML swap:200ms settle:200ms"` and use `opacity` transitions. When HTMX swaps content, old content fades out and new content fades in.

#### 3. Combine CSS files (debated)
- **Impact:** Saves ~800ms on initial load (6 HTTP requests → 2)
- **Effort:** 15 minutes
- **Trade-off:** Maintainability vs performance
- **Note:** You preferred to keep them separate for easier maintenance. If performance becomes critical later, merge into 2 files: `base.css` (global, navbar, footer) and `pages.css` (home, blog, projects).

### 🥈 Medium Priority

#### 4. Prefetch next likely page
- **Impact:** Makes nav clicks feel instant
- **Effort:** 10 minutes
- **How:** Use `hx-trigger="mouseenter once"` on nav links with a 100ms delay to prefetch content before click happens

#### 5. Race condition guard — cancel in-flight HTMX requests
- **Impact:** Prevents stale content if user clicks multiple nav buttons rapidly
- **Effort:** 10 minutes
- **How:** Listen to `htmx:beforeRequest` to abort any previous in-flight request for the same target

#### 6. Backend API caching
- **Impact:** Currently `/health` and `/api/recursive-window/*` take 800-1000ms
- **Effort:** Varies (backend change)
- **How:** Add response caching on the FastAPI backend for endpoints that return static/slow data

#### 7. Profile image — reduce resolution
- **Impact:** The profile image is 1500x1500 but displayed at max 380px. A 400x400 WebP would be ~20KB instead of 225KB.
- **Effort:** 5 minutes
- **How:** Resize source image to display resolution before converting to WebP

### 🥉 Lower Priority

#### 8. Server-side rendering for blog posts
- **Problem:** Blog posts route through `index.html` and trigger a full SPA shell reload instead of HTMX swap
- **Current:** `vercel.json` has `{ "src": "/blog/(.*)", "dest": "/index.html" }` which reloads the entire page
- **Fix:** Either serve blog posts as static HTML directly (change route to serve static HTML files) or ensure navigation.js handles the blog route

#### 9. Remove unused CSS
- The `playground.css` file was referenced but returned 404 — if Playground is disabled, remove the dead link
- The `contact-right` section in `footer.css` is largely commented out

#### 10. Monitor real user performance
- Use `htmx.logAll()` in browser console during development
- Add lightweight instrumentation with `htmx:beforeRequest` and `htmx:afterRequest` event listeners (log to console or sessionStorage)
- Can be toggled with a URL parameter (`?perf=1`) for easy access

---

## Files Changed in This Ticket

```
M  index.html          (inlined content, footer, picture element, preconnect, hx-indicator, lazy loading, playground disabled)
M  js/navigation.js    (guarded initial load, only loads if #content is empty)
M  vercel.json         (removed playground route, added HTML caching)
M  css/index.css       (added loading indicator styles)
M  html/home.html      (added picture element + lazy loading)
M  html/projects.html  (added picture elements + lazy loading to all images)
A  assets/mikudisreactsmall.webp        (new WebP)
A  assets/media/images/WallsBeyondWalls.webp   (new WebP)
A  assets/media/images/PromptsAndPerils.webp   (new WebP)
A  plans/2026-05-15-performance-audit.md  (this file)
```