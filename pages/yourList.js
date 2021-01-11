const helperElement = require('../helpers/element');
const helperUtil = require('../helpers/utils');
const assert = require('chai').assert;
const pageHome = require('./home');

const pageElementQuery = {
  btnYourLists: '//android.widget.TextView[@text="Your Lists"]',
  btnCreateAList: '//android.view.View[@resource-id="createList"]',
  createAListHeader:
    '//android.view.View[@resource-id="createlist-form-heading"]',
  createAListFieldName:
    '//android.widget.EditText[@resource-id="createlist-list-name-textinput"]',
  btnClearAListConfirm:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View[1]/android.app.Dialog/android.view.View[3]/android.view.View/android.view.View/android.view.View/android.widget.Button',
  yourListItems:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View',
  btnAddAnIdeaToList: '//android.view.View[@resource-id="add-an-idea-to-list"]',

  addAnIdeaToListTitle:
    '//android.widget.TextView[@text="Add an idea to list"]',
  fieldAddAnIdeaToList:
    '//android.widget.EditText[@resource-id="idea-text-input"]',
  btnAddAnIdeaToListConfirm:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[1]/android.app.Dialog/android.view.View[3]/android.view.View/android.view.View/android.view.View/android.view.View[4]/android.widget.Button',
  btnAddAnIdeaToListDone:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[1]/android.app.Dialog/android.view.View[2]',
  yourListOptionItemsItem:
    '//android.widget.ListView[@resource-id="awl-list-items"]/android.view.View[1]',
  yourListOptionItemsItemTitle:
    '//android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.view.View[1]/android.view.View/android.view.View[2]',
  yourListOptionItemsItemMore:
    '//android.view.View[@content-desc="More Options"]',
  yourListOptionItemsItemTopSearchResults:
    '//android.widget.Button[@text="Top Search Results"]',
  yourListOptionItemsItemPriority:
    '//android.view.View[2]/android.view.View[2]/android.view.View[4]/android.view.View[1]',
  btnRemoveyourListOptionItemsItem:
    '//android.view.View[@content-desc="Delete"]/android.widget.TextView',
  yourListOptionItemsItemFieldName:
    '//android.view.View/android.view.View/android.view.View/android.view.View/android.view.View[3]/android.view.View[1]/android.view.View/android.view.View[2]/android.view.View/android.widget.EditText',
  btnDeleteList: '//android.view.View[@resource-id="awl-delete"]',
  confirmDeletePopup:
    '//android.view.View[@resource-id="wl-delete-confirmation-container"]',
  confirmDeletePopupCancel:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[1]/android.app.Dialog/android.view.View[3]/android.view.View/android.view.View/android.view.View/android.view.View[5]/android.view.View/android.widget.Button',
  confirmDeletePopupYes:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[1]/android.app.Dialog/android.view.View[3]/android.view.View/android.view.View/android.view.View/android.view.View[4]/android.view.View/android.widget.Button',
  btnAddCommentQuantityPriority:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View[1]/android.app.Dialog/android.view.View[3]/android.view.View/android.view.View/android.widget.ListView/android.view.View[1]',
  pageAddCommentQuantityPriorityTitle:
    '//android.view.View[@resource-id="cqpHeader"]',
  pageAddCommentQuantityPriorityFieldComment:
    '//android.widget.EditText[@resource-id="cqpComments"]',
  pageAddCommentQuantityPriorityFieldNeeds:
    '//android.widget.EditText[@resource-id="item-requestedQty_"]',
  pageAddCommentQuantityPriorityFieldHas:
    '//android.widget.EditText[@resource-id="item-purchasedQty_"]',
  pageAddCommentQuantityPriorityFieldPriority:
    '/hierarchy/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.FrameLayout/android.support.v4.widget.DrawerLayout/android.widget.RelativeLayout/android.widget.RelativeLayout[2]/android.widget.RelativeLayout/android.widget.FrameLayout/android.widget.LinearLayout/android.widget.ViewAnimator/android.view.ViewGroup/android.widget.FrameLayout/android.widget.FrameLayout/android.widget.RelativeLayout/android.widget.RelativeLayout/android.webkit.WebView/android.webkit.WebView/android.view.View/android.view.View/android.view.View/android.view.View[9]',
  pageAddCommentQuantityPriorityFieldPriorityOptionHigh:
    '//android.view.View[@content-desc="High"]',
  pageAddCommentQuantityPriorityBtnSave:
    '//android.widget.Button[@resource-id="cqpSave"]',
  btnEditIdea: '//android.view.View[@content-desc="Edit idea"]',
  searchItem1Result:
    '//android.view.View[@text="Showing results for item 2 Search instead for Item2"]',
  searchItem1Result2:
    '//android.view.View[@text="Showing results for items 2 Search instead for Item2"]',
  yourListItemBtnMore:
    '//android.view.View[@resource-id="overflow-menu-bottomsheet-trigger"]',
  yourListOptionItems:
    '//android.widget.ListView[@resource-id="awl-list-items"]',
};

/**
 *  Open your list
 * @param {Object} client webdriver object
 */
const openYourList = async (client) => {
  await pageHome.openLeftMenu(client);
  await helperElement.clickElement(client, pageElementQuery.btnYourLists);
};

/**
 *  Get your list element
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 * @param {Boolean} shouldWait should wait for list to display
 */
const getYourListItemElement = async (client, listName, shouldWait = true) => {
  if (shouldWait) {
    await helperElement.waitElement(client, pageElementQuery.yourListItems);
  }
  const yourListItemsElement = await helperElement.getElement(
    client,
    pageElementQuery.yourListItems,
    shouldWait
  );
  const isDisplayed = await yourListItemsElement.isDisplayed();
  if (!isDisplayed) {
    return null;
  }
  const items = await client.$$(pageElementQuery.yourListItems);
  let list1Item = null;
  await Promise.all(
    items.map(async (item) => {
      const titleItem = await helperElement.getElement(
        item,
        '//android.view.View[@resource-id="lv-ov-list-hdr"]/android.view.View[2]/android.view.View',
        false
      );
      const isDisplayed = await titleItem.isDisplayed();
      if (isDisplayed && !list1Item) {
        const text = await titleItem.getText();
        if (text === listName) {
          list1Item = item;
        }
      }
    })
  );

  return list1Item;
};

/**
 *  Create item
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 */
const createItem = async (client, listName = 'List1') => {
  // create List
  await helperElement.waitEnabledElement(
    client,
    pageElementQuery.btnCreateAList
  );
  await helperElement.clickElement(client, pageElementQuery.btnCreateAList);
  // Create a New List will appear.
  await helperElement.waitElement(client, pageElementQuery.createAListHeader);
  await helperElement.inputElement(
    client,
    pageElementQuery.createAListFieldName,
    listName
  );
  await helperElement.clickElement(
    client,
    pageElementQuery.btnClearAListConfirm
  );
  const listItemElement = await getYourListItemElement(client, listName);
  // List item should be created.
  assert.strictEqual(!!listItemElement, true, 'List item is not created.');
};

/**
 *  Open item option
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 */
const openItemOption = async (client, listName) => {
  const listItemElement = await getYourListItemElement(client, listName);
  if (listItemElement) {
    await helperElement.clickElement(
      listItemElement,
      pageElementQuery.yourListItemBtnMore
    );
  }
};

/**
 *  Get your list item ideal element
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 * @param {String} idealName name of ideal
 * @param {Boolean} shouldWait should wait for list to display
 */
const getYourListItemIdealElement = async (
  client,
  listName,
  idealName,
  shouldWait = true
) => {
  const listItemContainerElement = await getYourListItemElement(
    client,
    listName,
    shouldWait
  );
  let list1Item = null;
  if (listItemContainerElement) {
    const item = await listItemContainerElement.$(
      pageElementQuery.yourListOptionItemsItem
    );

    let isDisplayed = await item.isDisplayed();
    if (!isDisplayed) {
      return null;
    }

    const titleItem = await helperElement.getElement(
      item,
      pageElementQuery.yourListOptionItemsItemTitle,
      false
    );
    isDisplayed = await titleItem.isDisplayed();
    if (isDisplayed) {
      const text = await titleItem.getText();
      if (text === idealName) {
        list1Item = item;
      }
    }
  }

  return list1Item;
};

/**
 *  Create item ideal
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 * @param {String} itemName name of item
 */
const createItemIdeal = async (
  client,
  listName = 'List1',
  itemName = 'Item1'
) => {
  await openItemOption(client, listName);
  // add ideal to list
  await helperElement.clickElement(client, pageElementQuery.btnAddAnIdeaToList);
  // Add an idea to list window should be display.
  await helperElement.waitElement(
    client,
    pageElementQuery.addAnIdeaToListTitle
  );
  await helperElement.inputElement(
    client,
    pageElementQuery.fieldAddAnIdeaToList,
    itemName
  );
  // tab Add button
  await helperElement.clickElement(
    client,
    pageElementQuery.btnAddAnIdeaToListConfirm
  );
  // tab Done button
  await helperElement.clickElement(
    client,
    pageElementQuery.btnAddAnIdeaToListDone
  );

  const listItemIdealElement = await getYourListItemIdealElement(
    client,
    listName,
    itemName
  );
  // List item ideal should be created.
  assert.strictEqual(
    !!listItemIdealElement,
    true,
    'List item ideal is not created.'
  );
};

/**
 *  Open item delete popup
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 */
const openItemDeletePopup = async (client, listName) => {
  await openItemOption(client, listName);
  // delete list
  await helperElement.clickElement(client, pageElementQuery.btnDeleteList);
  // Delete Confirmation window should be display.
  await helperElement.waitElement(client, pageElementQuery.confirmDeletePopup);
};

/**
 *  Delete item
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 */
const deleteItem = async (client, listName = 'List1') => {
  await openItemDeletePopup(client, listName);
  // Tap on Cancel
  await helperElement.clickElement(
    client,
    pageElementQuery.confirmDeletePopupCancel
  );

  let listItemElement = await getYourListItemElement(client, listName);
  assert.isNotNull(listItemElement, 'List should not delete if click cancel');

  await openItemDeletePopup(client, listName);
  // Tap on Yes
  await helperElement.clickElement(
    client,
    pageElementQuery.confirmDeletePopupYes
  );
  listItemElement = await getYourListItemElement(client, listName, false);
  assert.isNull(listItemElement, 'List should delete if click yes');
};

/**
 *  Open item ideal option
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 * @param {String} itemName name of item
 */
const openItemIdealOption = async (client, listName, itemName) => {
  const listItemIdealElement = await getYourListItemIdealElement(
    client,
    listName,
    itemName
  );
  if (listItemIdealElement) {
    // tab ... menu
    await helperElement.clickElement(
      listItemIdealElement,
      pageElementQuery.yourListOptionItemsItemMore
    );
  }
};

/**
 *  Create item ideal comment
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 * @param {String} itemName name of item
 */
const createItemIdealComment = async (
  client,
  listName = 'List1',
  itemName = 'Item1'
) => {
  let listItemIdealElement = await getYourListItemIdealElement(
    client,
    listName,
    itemName
  );
  if (listItemIdealElement) {
    await openItemIdealOption(client, listName, itemName);
    // tab on add comment, quantity & priority option
    await helperElement.clickElement(
      client,
      pageElementQuery.btnAddCommentQuantityPriority
    );
    // Add comment, quantity & Priority window should be display.
    await helperElement.waitElement(
      client,
      pageElementQuery.pageAddCommentQuantityPriorityTitle
    );
    await helperElement.inputElement(
      client,
      pageElementQuery.pageAddCommentQuantityPriorityFieldComment,
      'Comment1'
    );
    await helperElement.inputElement(
      client,
      pageElementQuery.pageAddCommentQuantityPriorityFieldNeeds,
      '2'
    );
    await helperElement.inputElement(
      client,
      pageElementQuery.pageAddCommentQuantityPriorityFieldHas,
      '1'
    );
    await helperElement.clickElement(
      client,
      pageElementQuery.pageAddCommentQuantityPriorityFieldPriority
    );
    await helperElement.clickElement(
      client,
      pageElementQuery.pageAddCommentQuantityPriorityFieldPriorityOptionHigh
    );
    await helperElement.clickElement(
      client,
      pageElementQuery.pageAddCommentQuantityPriorityBtnSave
    );
    listItemIdealElement = await getYourListItemIdealElement(
      client,
      listName,
      itemName
    );
    // Information should be updated and display on list accordingly.
    const priorityInfoElement = await helperElement.getElement(
      listItemIdealElement,
      pageElementQuery.yourListOptionItemsItemPriority
    );
    const priorityInfo = await priorityInfoElement.getText();
    assert.strictEqual(priorityInfo, 'High', 'Priority should be high');
  }
};

/**
 *  Update item ideal
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 * @param {String} itemName name of item
 * @param {String} newItemName new item name
 */
const updateItemIdeal = async (
  client,
  listName = 'List1',
  itemName = 'Item1',
  newItemName = 'Item2'
) => {
  const listItemIdealElement = await getYourListItemIdealElement(
    client,
    listName,
    itemName
  );
  if (listItemIdealElement) {
    await openItemIdealOption(client, listName, itemName);
    // tab on edit ideal option
    await helperElement.clickElement(client, pageElementQuery.btnEditIdea);
    await helperElement.waitEnabledElement(
      client,
      pageElementQuery.yourListOptionItemsItemFieldName
    );
    await helperElement.inputElement(
      listItemIdealElement,
      pageElementQuery.yourListOptionItemsItemFieldName,
      newItemName
    );
    helperUtil.enterKeyboard(client);
    helperElement.waitElement(
      listItemIdealElement,
      pageElementQuery.yourListOptionItemsItemFieldName,
      true
    );

    const titleItemRef = await helperElement.getElement(
      listItemIdealElement,
      pageElementQuery.yourListOptionItemsItemTitle
    );
    const titleItem = await titleItemRef.getText();

    // Item should be updated.
    assert.strictEqual(titleItem, newItemName, 'Update Fail');
  }
};

/**
 *  Search by item ideal
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 * @param {String} itemName name of item
 */
const searchByItemIdeal = async (
  client,
  listName = 'List1',
  itemName = 'Item2'
) => {
  const listItemIdealElement = await getYourListItemIdealElement(
    client,
    listName,
    itemName
  );
  if (listItemIdealElement) {
    await helperElement.clickElement(
      listItemIdealElement,
      pageElementQuery.yourListOptionItemsItemTopSearchResults
    );

    const searchItem1Result1 = helperElement.getElementWithoutTerminal(
      client,
      pageElementQuery.searchItem1Result
    );

    const searchItem1Result2 = helperElement.getElementWithoutTerminal(
      client,
      pageElementQuery.searchItem1Result2
    );
    if (!searchItem1Result1 && !searchItem1Result2) {
      await openYourList(client);
      await searchByItemIdeal(client);
    }
  }
};

/**
 *  Delete item ideal
 * @param {Object} client webdriver object
 * @param {String} listName name of list
 * @param {String} itemName name of item
 */
const deleteItemIdeal = async (
  client,
  listName = 'List1',
  itemName = 'Item2'
) => {
  const listItemIdealElement = await getYourListItemIdealElement(
    client,
    listName,
    itemName
  );
  if (listItemIdealElement) {
    await openItemIdealOption(client, listName, itemName);
    // tab on edit ideal option
    await helperElement.clickElement(
      client,
      pageElementQuery.btnRemoveyourListOptionItemsItem
    );

    const listItemIdealElementAfterRemove = await getYourListItemIdealElement(
      client,
      listName,
      itemName,
      false
    );
    // Item should be deleted.
    assert.isNull(listItemIdealElementAfterRemove, 'Delete fail');
  }
};

module.exports = {
  openYourList,
  createItem,
  createItemIdeal,
  deleteItem,
  createItemIdealComment,
  updateItemIdeal,
  searchByItemIdeal,
  deleteItemIdeal,
};
