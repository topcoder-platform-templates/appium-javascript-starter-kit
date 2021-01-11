const config = require('../config');

/**
 * Click to element
 * @param {Object} client webdriver object
 * @param {String} element query string
 */
const clickElement = async (client, element) => {
  const elementRef = await client.$(element);
  await elementRef.waitForDisplayed(config.timeout.waitForElement);
  await elementRef.click();
};

/**
 * Get element object
 * @param {Object} client webdriver object
 * @param {String} element query string
 * @param {Boolean} waitForDisplay should wait until display element
 */
const getElement = async (client, element, waitForDisplay = true) => {
  const elementRef = await client.$(element);
  if (waitForDisplay) {
    await elementRef.waitForDisplayed(config.timeout.waitForElement);
  }
  return elementRef;
};

/**
 * Get element object
 * @param {Object} client webdriver object
 * @param {String} element query string
 */
const getElements = async (client, element) => {
  const elementRefs = await client.$$(element);
  return elementRefs;
};

/**
 * Get element without terminal the test
 * @param {Object} client webdriver object
 * @param {String} element query string
 */
const getElementWithoutTerminal = async (client, element) => {
  const elementRef = await client.$(element);
  try {
    await elementRef.waitForDisplayed(config.timeout.waitForElementFast);
  } catch (error) {
    return null;
  }

  return elementRef;
};

/**
 * Wait for element to display
 * @param {Object} client webdriver object
 * @param {String} element query string
 * @param {Boolean} reverse reverse the display check
 */
const waitElement = async (client, element, reverse = false) => {
  const elementRef = await client.$(element);
  await elementRef.waitForDisplayed(config.timeout.waitForElement, reverse);
};

/**
 * Wait for enabled element
 * @param {Object} client webdriver object
 * @param {String} element query string
 * @param {Boolean} reverse reverse the display check
 */
const waitEnabledElement = async (client, element, reverse = false) => {
  const elementRef = await client.$(element);
  await elementRef.waitForEnabled(config.timeout.waitForElement, reverse);
};

/**
 * Wait for display page
 * @param {Object} client webdriver object
 * @param {String} element query string
 */
const waitPage = async (client, element) => {
  const elementRef = await client.$(element);
  await elementRef.waitForDisplayed(config.timeout.waitForLoadingPage);
};

/**
 * Input the text field
 * @param {Object} client webdriver object
 * @param {String} element query string
 * @param {String} value value need to input
 */
const inputElement = async (client, element, value) => {
  const elementRef = await client.$(element);
  await elementRef.waitForDisplayed(config.timeout.waitForElement);
  await elementRef.addValue(value);
};

module.exports = {
  clickElement,
  inputElement,
  waitElement,
  waitPage,
  getElement,
  getElements,
  getElementWithoutTerminal,
  waitEnabledElement,
};
