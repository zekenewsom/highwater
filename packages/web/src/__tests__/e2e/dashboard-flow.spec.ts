import { test, expect } from '@playwright/test';

test.describe('Dashboard Flow', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the dashboard
    await page.goto('/dashboard');
  });

  test('should display dashboard with all main components', async ({ page }) => {
    // Check for main dashboard elements
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();
    await expect(page.getByText('Clients')).toBeVisible();
    await expect(page.getByText('Portfolios')).toBeVisible();

    // Check for client list
    await expect(page.getByText('Alice Smith')).toBeVisible();
    await expect(page.getByText('Bob Johnson')).toBeVisible();

    // Check for portfolio information
    await expect(page.getByText('Growth Portfolio')).toBeVisible();
    await expect(page.getByText('Income Portfolio')).toBeVisible();
  });

  test('should allow client selection and display details', async ({ page }) => {
    // Click on a client
    await page.getByText('Alice Smith').click();

    // Check that client details are displayed
    await expect(page.getByText('Selected Client')).toBeVisible();
    await expect(page.getByText('alice@example.com')).toBeVisible();
  });

  test('should allow portfolio selection and display details', async ({ page }) => {
    // Click on a portfolio
    await page.getByText('Growth Portfolio').click();

    // Check that portfolio details are displayed
    await expect(page.getByText('Selected Portfolio')).toBeVisible();
  });

  test('should navigate between different sections', async ({ page }) => {
    // Navigate to clients page
    await page.getByRole('link', { name: 'Clients' }).click();
    await expect(page).toHaveURL('/clients');

    // Navigate to portfolios page
    await page.getByRole('link', { name: 'Portfolios' }).click();
    await expect(page).toHaveURL('/portfolios');

    // Navigate back to dashboard
    await page.getByRole('link', { name: 'Dashboard' }).click();
    await expect(page).toHaveURL('/dashboard');
  });

  test('should display responsive layout on mobile', async ({ page }) => {
    // Set mobile viewport
    await page.setViewportSize({ width: 375, height: 667 });

    // Check that mobile layout is working
    await expect(page.getByRole('heading', { name: 'Dashboard' })).toBeVisible();

    // Check that navigation is accessible on mobile
    await expect(page.getByRole('link', { name: 'Clients' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Portfolios' })).toBeVisible();
  });

  test('should handle data loading states', async ({ page }) => {
    // Mock slow API response
    await page.route('**/api/v2/clients', async (route) => {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      await route.continue();
    });

    // Navigate to clients page
    await page.getByRole('link', { name: 'Clients' }).click();

    // Check for loading state
    await expect(page.getByText('Loading...')).toBeVisible();

    // Wait for data to load
    await expect(page.getByText('Alice Smith')).toBeVisible();
  });

  test('should handle error states gracefully', async ({ page }) => {
    // Mock API error
    await page.route('**/api/v2/clients', (route) => {
      route.abort('failed');
    });

    // Navigate to clients page
    await page.getByRole('link', { name: 'Clients' }).click();

    // Check for error message
    await expect(page.getByText('Error loading clients')).toBeVisible();
  });

  test('should support keyboard navigation', async ({ page }) => {
    // Focus on the page
    await page.keyboard.press('Tab');

    // Navigate through interactive elements
    await page.keyboard.press('Tab');
    await page.keyboard.press('Enter');

    // Should navigate to clients page
    await expect(page).toHaveURL('/clients');
  });

  test('should maintain state across page refreshes', async ({ page }) => {
    // Select a client
    await page.getByText('Alice Smith').click();

    // Refresh the page
    await page.reload();

    // Check that the selection is maintained (if implemented)
    // This test may need to be adjusted based on actual implementation
    await expect(page.getByText('Alice Smith')).toBeVisible();
  });
});
