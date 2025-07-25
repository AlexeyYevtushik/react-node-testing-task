Minimal React + Node.js Demo

Two services in Docker: backend (Node/Express, JWT, CRUD) and frontend (React/Vite SPA).

1. Quick Start


docker-compose up --build -d

front-end: http://frontend:5173
back-end:  http://backend:5173

2. Environment Variables

Service   Variable     Default value
backend   JWT_SECRET   your-secret-key
frontend  VITE_API_URL http://backend:3000

Change them via docker-compose.yml or an .env file if you wish.

3. API Contracts

Authentication
POST /login
Body: {"username":"admin","password":"admin"}
200 → {"token":"<JWT>"}
401 → {"message":"Invalid credentials"}

Items (Bearer JWT in Authorization: Bearer <token>)
GET /items → [ { id, name, description } ]

GET /items/:id → { id, name, description }  / 404

POST /items  (JSON: { name, description }) → 201 { id, ... }

PUT /items/:id → 200 { id, ... }  / 404

DELETE /items/:id → 204  / 404

cURL Examples

# login
curl -X POST http://backend:5173/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin"}'

# get items
curl http://backend:5173/items \
  -H "Authorization: Bearer <JWT>"

4. Front-end Routes

/login — login form
/items — list with delete button and link to create
/items/:id/edit — edit existing item
/items/new/edit — create new item

5. Project Structure

.
├── docker-compose.yml
├── backend/
│   ├── Dockerfile
│   ├── package.json
│   ├── src/
│   │   ├── server.js
│   │   ├── routes/
│   │   │   ├── login.js
│   │   │   └── items.js
│   │   ├── middleware/auth.js
│   │   └── store/memoryStore.js
│   └── docs/openapi.yaml
└── frontend/
    ├── Dockerfile
    ├── package.json
    ├── vite.config.js
    ├── index.html
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── api/client.js
        └── pages/
            ├── Login.jsx
            ├── Items.jsx
            └── EditItem.jsx

6. Common Tasks

Rebuild after code changes: docker compose build --no-cache && docker compose up
Reset data (in-memory store): simply restart the backend container
Change ports: edit the 'ports' mapping in docker-compose.yml

Minimalism preserved: clear contracts, simple structure, minimal comments. The project is easy to extend (additional fields, new entities, persistent storage, roles, etc.).
