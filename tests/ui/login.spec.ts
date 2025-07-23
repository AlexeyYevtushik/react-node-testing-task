import { test, expect } from '@playwright/test';
import { validUser, invalidUser } from '../fixtures/testData';

test.describe('Login flow', () => {
    test('invalid login shows error', async ({ page }) => {
    await page.goto('/');
    await page.locator("//input[@testid='input-username']").pressSequentially(invalidUser.username);
    await page.locator("//input[@testid='input-password']").pressSequentially(invalidUser.password);
    await page.locator("//button[@type='submit']").click();

    await expect(page.getByText ('Invalid credentials')).toBeVisible();
    await expect(page).toHaveURL('/login');
  });
  
    test('valid login redirects to dashboard', async ({ page }) => {
    await page.goto('/');
    await page.locator("//input[@testid='input-username']").pressSequentially(validUser.username);
    await page.locator("//input[@testid='input-password']").pressSequentially(validUser.password);
    await page.locator("//button[@type='submit']").click();
    await page.waitForLoadState('networkidle');
    await expect(page).toHaveURL('/items');
  });

});
