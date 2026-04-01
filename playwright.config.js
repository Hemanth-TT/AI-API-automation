// playwright.config.js
const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  timeout: 30000,

reporter: [ ['list'] , ['allure-playwright'] ] 
});