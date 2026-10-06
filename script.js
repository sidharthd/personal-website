/**
 * Sidharth Devaraj Portfolio — Interactive Controller
 * - Theme Switcher (Light / Dark) with local storage persistence
 * - OS prefers-color-scheme synchronization
 * - Dynamic copyright year
 */

(function () {
  'use strict';

  const THEME_STORAGE_KEY = 'theme';
  const themeToggleBtn = document.getElementById('theme-toggle');
  const currentYearSpan = document.getElementById('current-year');
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

  /**
   * Determine the current active theme
   * @returns {'light' | 'dark'}
   */
  function getCurrentTheme() {
    const explicitTheme = document.documentElement.getAttribute('data-theme');
    if (explicitTheme === 'light' || explicitTheme === 'dark') {
      return explicitTheme;
    }
    return mediaQuery.matches ? 'dark' : 'light';
  }

  /**
   * Update accessible label on theme toggle button
   * @param {'light' | 'dark'} activeTheme
   */
  function updateToggleLabel(activeTheme) {
    if (!themeToggleBtn) return;
    const nextTheme = activeTheme === 'dark' ? 'light' : 'dark';
    themeToggleBtn.setAttribute(
      'aria-label',
      `Switch to ${nextTheme} theme (currently ${activeTheme} mode)`
    );
  }

  /**
   * Apply a specific theme
   * @param {'light' | 'dark'} theme
   * @param {boolean} persist
   */
  function setTheme(theme, persist = false) {
    document.documentElement.setAttribute('data-theme', theme);
    if (persist) {
      try {
        localStorage.setItem(THEME_STORAGE_KEY, theme);
      } catch (e) {
        // Handle private browsing or storage quota issues gracefully
      }
    }
    updateToggleLabel(theme);
  }

  /**
   * Toggle between light and dark themes
   */
  function toggleTheme() {
    const current = getCurrentTheme();
    const next = current === 'dark' ? 'light' : 'dark';
    setTheme(next, true);
  }

  // Bind toggle click listener
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', toggleTheme);
    // Initial label setup
    updateToggleLabel(getCurrentTheme());
  }

  // React to OS theme changes if user has not explicitly chosen a preference
  if (mediaQuery.addEventListener) {
    mediaQuery.addEventListener('change', (e) => {
      try {
        const userSavedTheme = localStorage.getItem(THEME_STORAGE_KEY);
        if (!userSavedTheme) {
          const systemTheme = e.matches ? 'dark' : 'light';
          setTheme(systemTheme, false);
        }
      } catch (err) {}
    });
  }

  // Set dynamic current year in footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }
})();
