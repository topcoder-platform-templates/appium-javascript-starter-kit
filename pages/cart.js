const helperElement = require('../helpers/element');
const helperUtils = require('../helpers/utils');
const pageSearch = require('./search');
const assert = require('chai').assert;

const pageElementQuery = {
  searchFilterFirstResult:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[4]',
  btnAddToCart: '//*[@resource-id="add-to-cart-button"]',
  cartItem: '//*[@resource-id="sc-active-cart"]',
  activecartItemTitle:
    '//android.view.View[1]/android.view.View[1]/android.view.View[2]/android.view.View[1]/android.view.View[3]/android.view.View/android.widget.TextView',
  txtCartCount:
    '//android.widget.TextView[@resource-id="com.amazon.mShop.android.shopping:id/chrome_action_bar_cart_count"]',
  btnCart:
    '//android.widget.ImageView[@resource-id="com.amazon.mShop.android.shopping:id/chrome_action_bar_cart_image"]',
  fieldDetailQuantity: '//*[@resource-id="mobileQuantityDropDown"]',
  fieldDetailQuantityClickable:
    '//*[@resource-id="mobileQuantityDropDown"]/../android.view.View[2]',
  fieldQuantityOption2: '//android.view.View[@content-desc="2"]',
  btnDeleteCart: '//android.widget.Button[@text="Delete"]',
};

/**
 *  Scroll to see the add to cart buttom
 * @param {Object} client webdriver object
 */
const scrollToSeeTheAddToCart = async (client) => {
  const btnAddToCart = await helperElement.getElementWithoutTerminal(
    client,
    pageElementQuery.btnAddToCart
  );
  let isEnabled = false;
  if (btnAddToCart) {
    isEnabled = await btnAddToCart.isEnabled();
  }
  if (!isEnabled) {
    await helperUtils.scrollUp(client);
    return await scrollToSeeTheAddToCart(client);
  }
  return btnAddToCart;
};

/**
 *  Scroll to see the delete cart buttom
 * @param {Object} client webdriver object
 */
const scrollToSeeTheBtnDeleteCard = async (client) => {
  const btnDeleteCart = await helperElement.getElementWithoutTerminal(
    client,
    pageElementQuery.btnDeleteCart
  );
  let isEnabled = false;
  if (btnDeleteCart) {
    isEnabled = await btnDeleteCart.isEnabled();
  }
  if (!isEnabled) {
    await helperUtils.scrollUp(client);
    await scrollToSeeTheBtnDeleteCard(client);
  }
};

/**
 * Get quantity field
 * @param {Object} client webdriver object
 */
const getQuantityField = async (client) => {
  // Select Item Quantity  : 2
  const fieldDetailQuantity = await helperElement.getElementWithoutTerminal(
    client,
    pageElementQuery.fieldDetailQuantity
  );
  if (!fieldDetailQuantity) {
    return null;
  }
  return await helperElement.getElementWithoutTerminal(
    client,
    pageElementQuery.fieldDetailQuantityClickable
  );
};

/**
 *  Add product to cart
 * @param {Object} client webdriver object
 */
const addProductToCart = async (client) => {
  const searchFilterFirstResult = await helperElement.getElementWithoutTerminal(
    client,
    pageElementQuery.searchFilterFirstResult
  );
  if (!searchFilterFirstResult) {
    // some time the app reload at this point
    // add this code to make sure it search item again
    await pageSearch.searchItems(client);
  }
  await helperElement.clickElement(
    client,
    pageElementQuery.searchFilterFirstResult
  );

  const btnAddToCart = await scrollToSeeTheAddToCart(client);

  // Select Item Quantity  : 2
  const fieldDetailQuantity = await getQuantityField(client);
  if (fieldDetailQuantity) {
    await fieldDetailQuantity.click();
    // Select Item Quantity  : 2
    await helperElement.clickElement(
      client,
      pageElementQuery.fieldQuantityOption2
    );
  }

  await helperElement.waitEnabledElement(client, pageElementQuery.btnAddToCart);
  await helperElement.clickElement(client, pageElementQuery.btnAddToCart);
  // Item should be added on cart.
  await helperElement.waitElement(client, pageElementQuery.txtCartCount);
};

/**
 *  Remove product in cart
 * @param {Object} client webdriver object
 */
const removeProductInCart = async (client) => {
  // open cart
  const openCart = async () => {
    await helperElement.waitPage(client, pageElementQuery.txtCartCount);
    await helperElement.clickElement(client, pageElementQuery.txtCartCount);
  };
  // open cart
  const openEmptyCart = async () => {
    await helperElement.clickElement(client, pageElementQuery.btnCart);
  };
  await openCart();
  let activecartItemTitleElement = await helperElement.getElementWithoutTerminal(
    client,
    pageElementQuery.activecartItemTitle
  );
  if (!activecartItemTitleElement) {
    await openCart();
  }
  await scrollToSeeTheBtnDeleteCard(client);

  // Tap on Delete icon.
  await helperElement.clickElement(client, pageElementQuery.btnDeleteCart);
  // reload cart again
  await openEmptyCart();
  // Item should be deleted from cart.
  activecartItemTitleElement = await helperElement.getElementWithoutTerminal(
    client,
    pageElementQuery.activecartItemTitle
  );
  let activecartItemTitle = '';
  if (activecartItemTitleElement) {
    activecartItemTitle = await activecartItemTitleElement.getText();
  }
  if (!activecartItemTitle) {
    activecartItemTitle = null;
  }

  // Item should be deleted.
  assert.isNull(activecartItemTitle, 'Delete fail');
};

module.exports = {
  addProductToCart,
  removeProductInCart,
};
