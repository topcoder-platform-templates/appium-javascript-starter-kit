const path = require('path');

const androidCapsWithoutApk = {
  platformName: 'Android',
  platformVersion: '8',
  deviceName: 'ea8d3c35',
  appPackage: 'com.amazon.mShop.android.shopping',
  appActivity: 'com.amazon.mShop.home.HomeActivity',
  automationName: 'UiAutomator2',
  logLevel: 'info',
};

const serverConfig = {
  path: '/wd/hub',
  host: 'localhost',
  port: 4723,
  waitforTimeout: 5000,
};

const androidOptions = Object.assign(
  {
    capabilities: {
      ...androidCapsWithoutApk,
      app: path.resolve('./config/amazon.apk'),
    },
  },
  serverConfig
);

const androidOptionsWithoutApk = Object.assign(
  {
    capabilities: androidCapsWithoutApk,
  },
  serverConfig
);

const amazonAccount = {
  email: 'your@emal.com',
  password: 'Password',
};

const timeout = {
  waitForElement: 30 * 1000,
  waitForElementFast: 5 * 1000,
  waitForLoadingPage: 5 * 60 * 1000, // 5 minutes
};

module.exports = {
  androidOptions,
  androidOptionsWithoutApk,
  amazonAccount,
  timeout,
};
