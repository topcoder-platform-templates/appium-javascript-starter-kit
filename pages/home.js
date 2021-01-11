const helperElement = require('../helpers/element');

const pageElementQuery = {
  btnMenu:
    '//*[@resource-id="com.amazon.mShop.android.shopping:id/chrome_action_bar_burger_icon"]',
  btnSignOut: '//*[@text="Sign Out"]',
  btnSignOutConfirm: '//*[@text="SIGN OUT"]',
  leftMenuBtnSetting:
    '//*[@content-desc="Settings button. Double tap for links to change country, sign out, and more."]',
  leftMenuBtnHome: '//android.widget.TextView[@text="Home"]',
  leftMenuList:
    '//*[@resource-id="com.amazon.mShop.android.shopping:id/gno_drawer_list"]',
};

/**
 *  Open left menu
 * @param {Object} client webdriver object
 */
const openLeftMenu = async (client) => {
  await helperElement.waitPage(client, pageElementQuery.btnMenu);
  await helperElement.clickElement(client, pageElementQuery.btnMenu);
  await helperElement.waitElement(client, pageElementQuery.leftMenuBtnHome);
};

/**
 *  Do logout
 * @param {Object} client webdriver object
 */
const doLogout = async (client) => {
  await openLeftMenu(client);

  const elementRef = await client.$(pageElementQuery.leftMenuList);

  await elementRef.touchAction([
    'press',
    { action: 'moveTo', x: 0, y: -200 },
    'release',
  ]);
  await helperElement.clickElement(client, pageElementQuery.leftMenuBtnSetting);
  await helperElement.clickElement(client, pageElementQuery.btnSignOut);
  await helperElement.clickElement(client, pageElementQuery.btnSignOutConfirm);
};

module.exports = {
  ...pageElementQuery,
  doLogout,
  openLeftMenu,
};
