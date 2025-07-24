// tests/playwright.config.ts   (или ../playwright.config.ts, но тогда поправь пути)
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './',                  
  timeout: 30_000,
  expect: { timeout: 5_000 },
  reporter: [['list'], ['html', { open: 'never' }]],
  use: {
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure'
  },
  projects: [
    // --- API ---
    {
      name: 'api',
      testMatch: /api\/.*\.spec\.ts$/       
    },

    // --- UI ---
    {
      name: 'chromium',
      testMatch: /ui\/.*\.spec\.ts$/,       // tests/ui/**
      use: { ...devices['Desktop Chrome'], baseURL: 'http://frontend:5173' },
   
    },
    // {
    //   name: 'firefox',
    //   testMatch: /ui\/.*\.spec\.ts$/,
    //   testIgnore: /api\//,
    //   use: { ...devices['Desktop Firefox'], baseURL: 'http://frontend:5173' },
    //   dependencies: ['api']
    // },
    // {
    //   name: 'webkit',
    //   testMatch: /ui\/.*\.spec\.ts$/,
    //   testIgnore: /api\//,
    //   use: { ...devices['Desktop Safari'], baseURL: 'http://frontend:5173' },
    //   dependencies: ['api']
    // }
  ]
});
