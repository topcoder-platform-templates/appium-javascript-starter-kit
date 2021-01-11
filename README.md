# Appium WebdriverIO Client

## Setup

- Must have NodeJS and NPM installed (https://nodejs.org/en/): version 12+
- Install dependencies by running `npm install`
- Must have appium: version 1.17.1-1 or later

## Start Appium:

- Please download and open [appium](https://github.com/appium/appium-desktop/releases/tag/v1.18.0-2) then click `Start Server` to start the appium server.

## Running Tests

- To run all of the tests, run `npm test`

## Configuration

- All configurations are in `config/index.js`.
- Please make sure to update your device info (`platformVersion` and `deviceName`) in `config/index.js`.
- You can get the device name by running:

```
adb devices
```

## Test cases:

- All test cases are in `test`

## Demo video:

- https://drive.google.com/file/d/1b-KoNJPqaWKddlmd5-lXhH2FXlE-FZRQ/view?usp=sharing
- You will see a black screen for login page because the amazon app doesn't allow to record login screen for security reason.

 