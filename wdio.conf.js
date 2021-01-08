const path = require('path');

exports.config = {
  specs: ['./tests/*.js'],
  // Patterns to exclude.
  exclude: [
    // 'path/to/excluded/files'
  ],
  maxInstances: 40,
  capabilities: [
    {
      platformName: 'Android',
      platformVersion: '8',
      deviceName: 'Android Emulator',
      app: path.resolve('./helpers/ApiDemos-debug.apk'),
      appPackage: 'io.appium.android.apis',
      automationName: 'UiAutomator2',
    },
  ],
  sync: true,
  logLevel: 'error',
  coloredLogs: true,
  screenshotPath: './errorShots/',
  waitforTimeout: 10000,
  connectionRetryTimeout: 90000,
  connectionRetryCount: 3,
  framework: 'mocha',
  reporters: ['dot'],
  reporterOptions: {
    outputDir: './',
  },
  mochaOpts: {
    ui: 'bdd',
  },
};
