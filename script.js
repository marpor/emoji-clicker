"use strict";
///////////////////////////////////////////////////////////////////////////////
// Game State Variables

let clicks = 1;        // Emojis produced per click
let autos = 0;         // Autoclickers, each producing `clicks` emojis per interval
let farms = 0;         // Farm output per interval
let efficiency = 1.0;  // Farm output multiplier
let speed = 1.0;       // Scales clicks per second and farm efficency, by making interval happen more often

let total = 0;         // Total number of emojis

// Set up an interval to run the `onInterval` function every second.
// When speed changes, we will update the interval to be 1000/speed (from onUpgradeClick).
let interval = setInterval(onInterval, 1000.);

// Setup event handlers and initial display etc.
setup();

///////////////////////////////////////////////////////////////////////////////
// Event Handler Functions

/**
  Called when the user clicks the Emoji button.
  Increases total by the current per-click amount and updates display.
 */
function onClick(event) {
  total += calculatePerClick();
  updateElements();
}

/**
  Called every game interval (which starts out at 1000ms).
  Increases total by the current per-interval amount and updates display.
 */
function onInterval() {
  total += calculatePerInterval();
  updateElements();
}

/**
  Called when clicking an upgrade button.
  Manages purchase logic and adjusts game state.
 */
function onUpgradeClick(upgrade) {
  // Pay the upgrade cost
  if (upgrade.cost > total)
    return;  // Not enough funds
  total -= upgrade.cost;

  // Increment "owned" count
  upgrade.count++;

  // Increase cost exponentially with the number of upgrades owned
  let cost_factor = Math.pow(1.15, upgrade.count);
  upgrade.cost = Math.round(upgrade.cost * cost_factor);

  // Apply upgrade effects
  if (upgrade.type === "click") {
    clicks += upgrade.value;
  }
  else if (upgrade.type === "auto") {
    autos += upgrade.value;
  }
  else if (upgrade.type === "farm") {
    farms += upgrade.value;
  }
  else if (upgrade.type === "efficiency") {
    efficiency *= upgrade.value;
  }
  else if (upgrade.type === "speed") {
    speed *= upgrade.value;

    // Update the interval if a speed upgrade is purchased
    clearInterval(interval);
    interval = setInterval(onInterval, 1000. / speed);
  }

  updateElements();
}

///////////////////////////////////////////////////////////////////////////////
// Other Game Functions

/**
  Updates display elements such as total funds, per click, and per second rates.
  
  Called on *every* interval since we need to lock/unlock and show upgrades as 
  soon as they can be afforded.
  
  Note: We could be more selective about what to update when, but that would
  add a lot of complexity, and performance is fine for now.
*/
function updateElements() {
  // Update total and stats
  document.getElementById("total").textContent = formatNumber(total);
  document.getElementById("per-click").textContent = formatNumber(calculatePerClick());
  document.getElementById("per-second").textContent = formatNumber(calculatePerInterval() * speed);

  // Update each upgrade display (cost, locked and hidden states)
  for (const upgrade of upgrades) {
    updateUpgrade(upgrade);
  }
}

function updateUpgrade(upgrade) {
  // Show upgrades that are "close" to being unlocked.
  if (upgrade.cost <= (total * 1.25 + 1000)) {
    upgrade.div.classList.remove('hidden');
  }

  // Unlock or lock the upgrades depending on available "total" emoji
  if (upgrade.cost <= total) {
    upgrade.div.classList.remove('locked');
  }
  else {
    upgrade.div.classList.add('locked');
  }

  upgrade.div.querySelector(".count").textContent = formatNumber(upgrade.count);
  upgrade.div.querySelector(".cost").textContent = formatNumber(upgrade.cost);
}

/**
  Calculates emojis generated per click based on upgrades.
*/
function calculatePerClick() {
  return clicks;
}

/**
  Calculates emojis generated per game interval, considering upgrades and efficiency.
 */
function calculatePerInterval() {
  return autos * clicks + farms * efficiency;
}

/**
  Setup event listeners and initial display state
 */
function setup() {
  // Click handlers
  const button = document.querySelector("#game button");
  button.addEventListener("click", onClick);

  // Remember the initial cost of each upgrade, so we can reset it later
  for (const upgrade of upgrades) {
    upgrade.count = 0;
    upgrade.startCost = upgrade.cost;
  }
  
  // Create upgrade nodes from the element with id "TEMPLATE"

  const template = document.getElementById("TEMPLATE");
  template.removeAttribute("id");
  template.remove();

  const upgradesDiv = document.getElementById("upgrades");
  for (const upgrade of upgrades) {
    const node = makeUpgradeElementFromTemplate(template, upgrade);
    upgradesDiv.appendChild(node);
  }

  updateElements();
}

/** 
  Makes a new upgrade element from the template. Used by setup().
*/
function makeUpgradeElementFromTemplate(template, upgrade) {
  // Make a clone of the template for this upgrade
  const clone = template.cloneNode(true);
  clone.classList.add(upgrade.type);

  // All upgrades start out hidden
  clone.classList.add('hidden');

  // Bind click even ton onUpgradeClick
  const button = clone.querySelector("button");
  button.addEventListener("click", () => onUpgradeClick(upgrade));

  // Replace content from template with content from upgrade
  clone.querySelector(".description").textContent = upgrade.description;
  clone.querySelector(".name").textContent = upgrade.name;
  clone.querySelector(".emoji").textContent = upgrade.emoji;

  // Remember the clone with the upgrade, so we can update it as the game runs
  upgrade.div = clone;

  return clone;
}

/**
  Formats number as text.

  Large numbers will be shown without decimals, using *thin spaces* for thousands 
  separators. While not a standard it looks cleaner with *very* large 
  numbers, and allow the number text to break cleanly across multiple lines.

  Small numbers will be shown with decimals, using dot (.) for decimal separator.

  Examples:
    formatNumber(1.0) => "1"
    formatNumber(0.00123456) => "0.00123"
    formatNumber(1.23456) => "1.23"
    formatNumber(123) => "123"
    formatNumber(1234) => "1 234"
    formatNumber(1234567890) => "1 234 567 890"
 */
function formatNumber(number) {
  // For small numbers, use significant digits to control the display. This implicitly 
  // allows fractional digits to the number.
  // For larger numbers, never display fractional digits.
  const options = {};
  options.maximumFractionDigits = 0;
  if (number < 100) {
    options.maximumSignificantDigits = 3;
  }

  // Use Intl.NumberFormat to format the number as in US locale to make 
  // sure we get a number like 1,000.00
  let text = number.toLocaleString('en-US', options);

  // Replace commas with thin spaces.
  text = text.replaceAll(',', ' '); // <- That's a unicode "thin space" character (U+2009)

  return text;
}
