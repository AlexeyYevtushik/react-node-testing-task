import { test, expect } from '@playwright/test';
import { validUser, newItem } from '../fixtures/testData';

test.describe('Items CRUD (UI)', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await page.locator("//input[@testid='input-username']").fill(validUser.username);
    await page.locator("//input[@testid='input-password']").fill(validUser.password);
    await page.locator("//button[@type='submit']").click();
    await expect(page).toHaveURL('/items');
  });

  test('create item', async ({ page }) => {
    const item = newItem();

    await page.locator('//a').click();
    await page.locator('//input[@testid="input-name"]').fill(item.title);
    await page.locator("//textarea[@testid='input-description']").fill(item.description);
    await page.locator("//button[@type='submit']").click();

    await expect(page.locator('//ul/li').last()).toContainText(item.title);
  });

  test('edit item', async ({ page }) => {
    const updatedTitle = `Updated ${Date.now()}`;
    const lastRow = page.locator('//ul/li').last();

    await lastRow.locator("//button[contains(text(),'Edit')]").click();
    await page.locator("//input[@testid='input-name']").fill(updatedTitle);
    await page.locator("//*[@type='submit']").click();

    await expect(lastRow).toContainText(updatedTitle);
  });

  test('delete item – confirm OK', async ({ page }) => {
  const items = page.locator('ul > li');
  const countBefore = await items.count();
  const last = items.last();
  const title = await last.innerText();

  // Перехватываем confirm и принимаем
  page.once('dialog', dialog => {
    expect(dialog.type()).toBe('confirm');
    expect(dialog.message()).toMatch(/delete this item\?/i);
    dialog.accept(); // нажать "OK"
  });

  await last.getByRole('button', { name: /delete/i }).click();

  // Элемент должен исчезнуть
  await expect(page.getByText(title)).toHaveCount(0);
  await expect(items).toHaveCount(countBefore - 1);
});

test('delete item – cancel', async ({ page }) => {
  const items = page.locator('ul > li');
  const last = items.last();
  const title = await last.innerText();

  // Отклоняем confirm
  page.once('dialog', dialog => {
    dialog.dismiss(); // нажать "Cancel"
  });

  await last.getByRole('button', { name: /delete/i }).click();

  // Элемент остаётся
  await expect(page.getByText(title)).toBeVisible();
});
});
