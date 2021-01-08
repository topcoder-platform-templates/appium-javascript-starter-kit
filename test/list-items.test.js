const webdriverio = require('webdriverio');
const androidOptions = require('../config').androidOptions;
const androidOptionsWithoutApk = require('../config').androidOptionsWithoutApk;
const pageLogin = require('../pages/login');
const pageYourList = require('../pages/yourList');
const pageHome = require('../pages/home');
const pageSearch = require('../pages/search');
const pageCart = require('../pages/cart');
const helperElement = require('../helpers/element');
const assert = require('chai').assert;

describe('Verify amazon shoping app work', () => {
  let client;
  let numberOfBeforeEach = 0;
  const reloadApp = async () => {
    await client.deleteSession();
    client = await webdriverio.remote(androidOptionsWithoutApk);
  };

  beforeEach(async function () {
    numberOfBeforeEach += 1;
    if (numberOfBeforeEach === 1) {
      client = await webdriverio.remote(androidOptions);
    } else {
      client = await webdriverio.remote(androidOptionsWithoutApk);
    }
    if (!client) {
      return assert.isNull(client, 'Can not connect to appium or device');
    }
    try {
      await helperElement.waitPage(client, pageLogin.btnCloseRegion);
    } catch (error) {
      await reloadApp();
    }
    // close select region popup
    await helperElement.clickElement(client, pageLogin.btnCloseRegion);
    await pageLogin.doLogin(client);
  });

  afterEach(async function () {
    await pageHome.doLogout(client);
    return await client.deleteSession();
  });

  it('should create the list', async function () {
    await pageYourList.openYourList(client);
    await pageYourList.createItem(client);
  });

  it('should add item(Idea) on the List', async function () {
    await pageYourList.openYourList(client);
    await pageYourList.createItemIdeal(client);
  });

  it('should add comment on item', async function () {
    await pageYourList.openYourList(client);
    await pageYourList.createItemIdealComment(client);
  });

  it('should update item', async function () {
    await pageYourList.openYourList(client);
    await pageYourList.updateItemIdeal(client);
  });

  it('should search by item', async function () {
    await pageYourList.openYourList(client);
    await pageYourList.searchByItemIdeal(client);
  });

  it('should delete item', async function () {
    await pageYourList.openYourList(client);
    await pageYourList.deleteItemIdeal(client);
  });

  it('should delete list', async function () {
    await pageYourList.openYourList(client);
    await pageYourList.deleteItem(client);
  });

  it('should search the item', async function () {
    await pageSearch.searchItems(client);
    await pageSearch.filterItems(client);
  });

  it('should add product in cart', async function () {
    await pageSearch.searchItems(client);
    await pageCart.addProductToCart(client);
  });

  it('should delete the item from cart', async function () {
    await pageCart.removeProductInCart(client);
  });

  it('should get valid message for invalid search item', async function () {
    await pageSearch.searchItems(client, 'Kusumkhola');
    await pageSearch.shouldShowNoSearchResult(client);
  });
});
