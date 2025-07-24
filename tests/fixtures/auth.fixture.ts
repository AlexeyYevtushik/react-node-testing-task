import { test as base, expect as pwExpect, request as pwRequest } from '@playwright/test';
import type { APIRequestContext } from '@playwright/test';

const API_BASE = 'http://localhost:3000';
const LOGIN_PATH = '/login';
const ITEMS_PATH = '/items';

type Fixtures = {
  api: APIRequestContext;
  authToken: string;
  itemsPath: string;
};

export const test = base.extend<Fixtures>({
  api: async ({ playwright }, use) => {
    const api = await playwright.request.newContext({
      baseURL: API_BASE,
      extraHTTPHeaders: { 'Content-Type': 'application/json' }
    });
    await use(api);
    await api.dispose();
  },

  authToken: async ({ api }, use) => {
    const resp = await api.post(LOGIN_PATH, { data: { username: 'admin', password: 'admin' } });

    if (!resp.ok()) {
      const txt = await resp.text();
      throw new Error(`Login failed: ${resp.status()} ${resp.statusText()}\n${txt}`);
    }

    const body = await resp.json();
    if (!body?.token) throw new Error(`No token in response: ${JSON.stringify(body)}`);

    await use(body.token);
  },

  itemsPath: async ({}, use) => {
    await use(ITEMS_PATH);
  }
});

export const expect = pwExpect;
