const helperElement = require('../helpers/element');
const helperUtil = require('../helpers/utils');
const assert = require('chai').assert;
const remSep = require('string-remove-thousand-separators');
const pageHome = require('./home');

const pageElementQuery = {
  btnSearch: '//android.widget.ImageView[@content-desc="Search"]',
  fieldSearch:
    '//android.widget.EditText[@resource-id="com.amazon.mShop.android.shopping:id/rs_search_src_text"]',
  searchWindow:
    '//*[@resource-id="com.amazon.mShop.android.shopping:id/iss_search_suggestions_list_view"]',
  searchResult: '//*[@resource-id="search"]',
  searchNoResult:
    '//android.view.View[@text="No results for Kusumkhola. Try checking your spelling or use more general terms"]',
  searchFilterContainer:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[1]/android.view.View',
  searchFilterPrice: '//*[@resource-id="priceRefinements"]',
  searchFilterPrice100AndAbove: '//*[@content-desc="$1000 & Above"]',
  searchFilterFirstResult:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[4]',
  searchFilterResultPrices:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View[4]/android.view.View[4]/android.widget.TextView',
};

/**
 *  Search items
 * @param {Object} client webdriver object
 * @param {String} searchItem search key
 */
const searchItems = async (client, searchItem = 'Dell') => {
  await helperElement.waitPage(client, pageHome.btnMenu);
  const fieldSearch = await helperElement.getElementWithoutTerminal(
    client,
    pageElementQuery.fieldSearch
  );
  if (!fieldSearch) {
    // if the search doesn't show you need to click search
    // button first
    const btnSearch = await helperElement.getElementWithoutTerminal(
      client,
      pageElementQuery.btnSearch
    );
    if (btnSearch) {
      await helperElement.clickElement(client, pageElementQuery.btnSearch);
    }
  }
  await helperElement.clickElement(client, pageElementQuery.fieldSearch);
  await helperElement.inputElement(
    client,
    pageElementQuery.fieldSearch,
    searchItem
  );
  // Search window should display
  await helperElement.waitElement(client, pageElementQuery.searchWindow);
  await helperUtil.enterKeyboard(client);
  // sometimes the app auto reload page at this point
  // 10s waiting to avoid break the current flow
  await helperUtil.sleep(10000);

  const searchResult = await helperElement.getElementWithoutTerminal(
    client,
    pageElementQuery.searchResult
  );
  if (!searchResult) {
    await searchItems(client, searchItem);
  }
};

/**
 *  Should show no search result
 * @param {Object} client webdriver object
 */
const shouldShowNoSearchResult = async (client) => {
  // User should get message "No Results for Kusumkhola"
  await helperElement.waitElement(client, pageElementQuery.searchNoResult);
};

/**
 *  Filter items
 * @param {Object} client webdriver object
 */
const filterItems = async (client) => {
  let firstResultPrice = 0;
  let firstResultPriceRaw;
  try {
    // some time the app reload at this point
    // add this to try catch will prevent terminal
    // scroll to price filter
    const searchFilterContainer = await helperElement.getElementWithoutTerminal(
      client,
      pageElementQuery.searchFilterContainer
    );
    if (searchFilterContainer) {
      await searchFilterContainer.touchAction([
        'press',
        { action: 'moveTo', x: 100, y: 0 },
        'release',
      ]);
    }
    await helperElement.clickElement(
      client,
      pageElementQuery.searchFilterPrice
    );
    await helperElement.clickElement(
      client,
      pageElementQuery.searchFilterPrice100AndAbove
    );

    await helperElement.waitElement(
      client,
      pageElementQuery.searchFilterFirstResult
    );
    const firstResultPriceElements = await helperElement.getElements(
      client,
      pageElementQuery.searchFilterResultPrices
    );

    await Promise.all(
      firstResultPriceElements.map(async (firstResultPriceElement) => {
        const text = await firstResultPriceElement.getText();
        if (text[0] === '$' && !firstResultPrice) {
          firstResultPrice = text;
          firstResultPriceRaw = firstResultPrice;
          firstResultPrice = firstResultPrice.substring(1);
          firstResultPrice = parseFloat(remSep(firstResultPrice));
        }
      })
    );

  } catch (error) {
    console.log('Filter with error', error);
    await searchItems(client);
    await filterItems(client);
  }
  // Price should be >= 1000
  assert.isAtLeast(
    firstResultPrice,
    1000,
    'Price should not be < 1000. It is ' + firstResultPriceRaw + ' now.'
  );
};

module.exports = {
  searchItems,
  shouldShowNoSearchResult,
  filterItems,
};
