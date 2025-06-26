import { test, expect } from '@playwright/test';

test.describe('Visual Regression Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Set consistent viewport for visual testing
    await page.setViewportSize({ width: 1280, height: 720 });
  });

  test('dashboard should match visual baseline', async ({ page }) => {
    await page.goto('/dashboard');

    // Wait for content to load
    await page.waitForSelector('text=Dashboard');

    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('dashboard.png');
  });

  test('clients page should match visual baseline', async ({ page }) => {
    await page.goto('/clients');

    // Wait for content to load
    await page.waitForSelector('text=Clients');

    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('clients.png');
  });

  test('portfolios page should match visual baseline', async ({ page }) => {
    await page.goto('/portfolios');

    // Wait for content to load
    await page.waitForSelector('text=Portfolios');

    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('portfolios.png');
  });

  test('client onboarding form should match visual baseline', async ({ page }) => {
    await page.goto('/clients');

    // Open onboarding form (assuming there's a button to open it)
    await page.click('text=Add Client');

    // Wait for form to appear
    await page.waitForSelector('text=Client Onboarding');

    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('client-onboarding.png');
  });

  test('mobile layout should match visual baseline', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    await page.goto('/dashboard');

    // Wait for content to load
    await page.waitForSelector('text=Dashboard');

    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('dashboard-mobile.png');
  });

  test('tablet layout should match visual baseline', async ({ page }) => {
    // Set tablet viewport
    await page.setViewportSize({ width: 768, height: 1024 });

    await page.goto('/dashboard');

    // Wait for content to load
    await page.waitForSelector('text=Dashboard');

    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('dashboard-tablet.png');
  });

  test('dark mode should match visual baseline', async ({ page }) => {
    await page.goto('/dashboard');

    // Wait for content to load
    await page.waitForSelector('text=Dashboard');

    // Toggle dark mode (assuming there's a dark mode toggle)
    await page.click('[data-testid="dark-mode-toggle"]');

    // Wait for theme change
    await page.waitForTimeout(500);

    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('dashboard-dark-mode.png');
  });

  test('loading states should match visual baseline', async ({ page }) => {
    // Mock slow API response
    await page.route('**/api/v2/clients', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      await route.continue();
    });

    await page.goto('/clients');

    // Wait for loading state to appear
    await page.waitForSelector('text=Loading...');

    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('clients-loading.png');
  });

  test('error states should match visual baseline', async ({ page }) => {
    // Mock API error
    await page.route('**/api/v2/clients', (route) => {
      route.abort('failed');
    });

    await page.goto('/clients');

    // Wait for error state to appear
    await page.waitForSelector('text=Error loading clients');

    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('clients-error.png');
  });

  test('empty states should match visual baseline', async ({ page }) => {
    // Mock empty response
    await page.route('**/api/v2/clients', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ data: [] }),
      });
    });

    await page.goto('/clients');

    // Wait for empty state to appear
    await page.waitForSelector('text=No clients found');

    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('clients-empty.png');
  });

  test('form validation states should match visual baseline', async ({ page }) => {
    await page.goto('/clients');

    // Open onboarding form
    await page.click('text=Add Client');
    await page.waitForSelector('text=Client Onboarding');

    // Try to submit without filling required fields
    await page.click('text=Next');

    // Wait for validation errors to appear
    await page.waitForSelector('text=Please complete all required fields');

    // Take screenshot and compare with baseline
    await expect(page).toHaveScreenshot('form-validation-errors.png');
  });
});
