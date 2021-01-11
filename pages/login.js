const helperElement = require('../helpers/element');
const amazonAccount = require('../config').amazonAccount;

const pageElementQuery = {
  btnCloseRegion: '//*[@resource-id="micp-aww-close"]',
  btnSignin1:
    '//*[@resource-id="com.amazon.mShop.android.shopping:id/sign_in_button"]',
  fieldEmail: '//*[@resource-id="ap_email_login"]',
  fieldPassword: '//*[@resource-id="ap_password"]',
  btnContinue: '//*[@resource-id="continue"]',
  btnSignIn2: '//*[@resource-id="signInSubmit"]',
  warningMessage: '//*[@resource-id="auth-warning-message-box"]',
};

/**
 *  Do login
 * @param {Object} client webdriver object
 */
const doLogin = async (client) => {
  await helperElement.waitPage(client, pageElementQuery.btnSignin1);
  await helperElement.clickElement(client, pageElementQuery.btnSignin1);
  await helperElement.waitElement(client, pageElementQuery.fieldEmail);
  await helperElement.waitEnabledElement(client, pageElementQuery.fieldEmail);
  await helperElement.inputElement(
    client,
    pageElementQuery.fieldEmail,
    amazonAccount.email
  );
  await helperElement.clickElement(client, pageElementQuery.btnContinue);
  await helperElement.waitElement(client, pageElementQuery.fieldPassword);
  await helperElement.waitEnabledElement(client, pageElementQuery.fieldPassword);
  await helperElement.inputElement(
    client,
    pageElementQuery.fieldPassword,
    amazonAccount.password
  );
  await helperElement.clickElement(client, pageElementQuery.btnSignIn2);

  const warningMessageElement = await helperElement.getElementWithoutTerminal(
    client,
    pageElementQuery.warningMessage,
    false
  );
  if (warningMessageElement) {
    // the app show capcha, try to re input password again
    await helperElement.inputElement(
      client,
      pageElementQuery.fieldPassword,
      amazonAccount.password
    );
  }
};

module.exports = {
  ...pageElementQuery,
  doLogin,
};
