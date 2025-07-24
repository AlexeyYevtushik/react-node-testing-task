# Test Plan / Strategy

## 1. Scope
We test a small web app composed of:
- **React UI**: authentication flow and CRUD operations on “items”.
- **Node.js API**: `/login`, `/items` (GET/POST/PUT/DELETE).
Both positive and negative scenarios are included.

## 2. Coverage

### UI (Functional)
- Login with valid credentials → redirect to dashboard/items list, user greeting.
- Login with invalid credentials → visible error message, no redirect.
- Create a new item (form interaction, success toast/row appears).
- Edit an existing item (inline/modal form, updated values persist).
- Delete an item (confirmation dialog, row disappears).
- Assertions on data presence after each action.
- *(Bonus)* Visual regression snapshots for key screens.

### API
- **POST `/login`**: success returns token; invalid creds → 401 + error body.
- **GET `/items`**: returns array (empty or populated).
- **POST `/items`**: 201 + created object; negative cases (missing fields, no token).
- **PUT `/items/:id`**: 200 + updated object; negative cases (invalid id/body).
- **DELETE `/items/:id`**: 204 on success; 404 for unknown id; 401 when unauthorized.

## 3. Tooling & Rationale
- **Playwright (@playwright/test)**: unified UI + API testing, fast parallel runs, built‑in trace/screenshot/video for debugging.
- **TypeScript**: static typing, better DX.
- *(Optional)* GitHub Actions for CI, report artifacts upload.
- *(Optional)* Coverage tools (nyc/istanbul) for backend unit tests; visual snapshots with `expect(page).toHaveScreenshot()`.

## 4. How to Run Tests
docker build -t tests . 
docker run tests