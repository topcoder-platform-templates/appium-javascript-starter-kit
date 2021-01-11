/**
 * Sleep the test
 * @param {Number} time time to sleep
 */
const sleep = async (time) => {
  await new Promise((r) => setTimeout(r, time));
};

/**
 * Click enter keyboard button
 * @param {Object} client webdriver object
 */
const enterKeyboard = async (client) => {
  await client.pressKeyCode(66);
};

/**
 * Get random integer
 * @param {Number} min min number
 * @param {Number} max max number
 */
const getRndInteger = (min, max) => {
  return Math.floor(Math.random() * (max - min)) + min;
};

/**
 * Scroll up
 * @param {Number} distance distance to scroll
 */
const scrollUp = async (client) => {
  const windowRect = await client.getWindowRect();
  const xPosition = getRndInteger(10, windowRect.width - 10);
  const yPosition = getRndInteger(10, windowRect.height - 10);
  // scroll to remove cart button
  await client.touchAction([
    { action: 'press', x: xPosition, y: yPosition },
    { action: 'moveTo', x: xPosition, y: yPosition - (windowRect.height/4 - 50) },
    'release',
  ]);
};

module.exports = {
  sleep,
  enterKeyboard,
  getRndInteger,
  scrollUp,
};
