import { expect, test } from '@playwright/test';

test('visits the app root url', async ({ page }) => {
  await page.goto('/');
  await expect(page).toHaveURL(/\/inicio$/);
  await expect(page.getByRole('heading', { name: /¿Qué residuo quieres identificar\?/ })).toBeVisible();
});
