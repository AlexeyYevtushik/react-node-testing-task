import { test as base } from '@playwright/test';
import { validUser } from './testData';

type Fixtures = {
  authToken: string;
};

export const test = base.extend<Fixtures>({
  authToken: async ({ request, baseURL }, use) => {
    const resp = await request.post(`${process.env.API_URL || baseURL}/api/login`, {
      data: validUser
    });
    const body = await resp.json();
    await use(body.token);
  }
});

export const expect = test.expect;
