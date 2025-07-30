# Todo Demo – **CI‑first** Edition

Tiny full‑stack app (React + Express) built to **showcase automated QA**.  
All tests run **inside Docker** and in GitHub Actions with one click.

---

## ① Run Locally (Docker Compose, < 2 min)

docker compose up --build --force-recreate

## ② CI / CD

A ready‑made workflow **.github/workflows/ci.yml** triggers on:

* `push` (any branch)  
* `pull_request`  
* manual **Run workflow** button

The job simply re‑uses the compose file:

```yaml
- run: docker compose up --build --exit-code-from tester
```

✅  If *tester* exits with code 0 the build passes; HTML & coverage
reports are uploaded as artifacts.

---

## ③ Repo Map (excerpt)

```
/
├── docker-compose.yml          # api, web, tester
├── backend/                    # Express  📦
├── frontend/                   # React    💻
└── tests/                      # Playwright
    ├── auth.fixture.ts
    ├── login.spec.ts
    ├── items-crud.spec.ts
    └── api/items.spec.ts
```

---

## ④ Assumptions & Trade‑offs

* In‑memory DB keeps compose light.  
* Chromium‑only to minimise image size.  

---

Happy shipping!
