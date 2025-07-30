# Test Plan – Docker‑only Execution

| Version | Date | Author |
|---------|------|--------|
| 1.1 | 2025‑07‑25 | QA Candidate Alexey Yevtushik|

## 1. Scope
Smoke + regression for login and item CRUD in UI & API.

## 2. Approach
Single **Playwright** suite is executed via the `tester`
service in *docker‑compose*. Same command runs on CI.

## 3. Coverage

| Scenario                 | Path               |
|--------------------------|--------------------|
| Login valid / invalid    | `login.spec.ts`    |
| Item create / blank      | `items-crud.spec`  |
| Edit, delete, 404        | `items-crud.spec`  |
| Raw API happy / sad      | `api/items.spec`   |

## 4. Tooling
| Layer | Tool                    | Reason              |
|-------|-------------------------|---------------------|
| UI    | Playwright (@playwright)| fast, auto‑wait     |
| API   | Playwright request      | same runner         |
| CI    | GitHub Actions + Compose| mirrors prod stack  |

## 5. Execution

Root repository folder: docker compose up --build --force-recreate

CI: automatic on **push**, **PR**, or **workflow_dispatch**.

## 6. Pass / Fail
* all specs green  
* statement coverage ≥ 80 %  
* exit code 0 from tester container

## 7. Risks & Constraints
* State lost between runs (RAM store).  
* Single‑thread tests – no concurrency races measured.

## 8. Out of Scope
Visual regression
