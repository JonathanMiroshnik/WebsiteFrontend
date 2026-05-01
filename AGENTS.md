# AGENTS.md - Frontend Development Guide

## Local Development

### Starting the Server

```bash
cd WebsiteFrontend
python3 -m http.server 8080
```

Then open http://localhost:8080 in your browser.

### Restarting the Server

```bash
# Find the running server process
ps aux | grep "http.server"

# Kill it (replace PID with the actual process ID)
kill <PID>

# Start it again
python3 -m http.server 8080
```

Or kill by port:
```bash
kill $(lsof -t -i:8080)
python3 -m http.server 8080
```

## Architecture

### Frontend (Vercel - www.sensorcensor.xyz)
- Static HTMX site deployed on Vercel
- All HTML/CSS/JS files are served statically
- Navigation uses HTMX `hx-get` for client-side routing

### Backend (VPS - api.sensorcensor.xyz)
- Python FastAPI server
- Serves blog post HTML files and API endpoints
- All API calls use absolute URLs: `https://api.sensorcensor.xyz/...`

### Cross-Origin Configuration
In `index.html`, HTMX is configured to allow cross-origin requests:
```html
<script>
  htmx.config.selfRequestsOnly = false;
</script>
```

This is required because the frontend (www.sensorcensor.xyz) and backend (api.sensorcensor.xyz) are on different domains.

## Key Files

| File | Purpose |
|------|---------|
| `index.html` | Main entry point, navbar, HTMX config |
| `html/blog.html` | Blog listing page with post links |
| `html/playground.html` | API demo page (health check, recursive window) |
| `html/blog/*.html` | Individual blog post content |
| `js/navigation.js` | Client-side routing and active nav state |
| `vercel.json` | Vercel deployment routes and headers |

## API Endpoints (on api.sensorcensor.xyz)

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Backend health check |
| `/api/page/blog/{post_id}` | GET | Serve a blog post HTML |
| `/api/recursive-window/{n}` | GET | Recursive window demo |
| `/api/generate-css` | POST | AI-powered CSS generation |

## Deployment

The frontend auto-deploys to Vercel when changes are pushed to the main branch.
