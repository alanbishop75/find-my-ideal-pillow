const PILLOW_PROPERTY = "sc-domain:findyouridealpillow.com";
const DISALLOWED_PROPERTY_TERMS = ["golf", "coffee", "mattress", "solar"];

function assertPillowProperty(property) {
  if (property !== PILLOW_PROPERTY || DISALLOWED_PROPERTY_TERMS.some((term) => property.toLowerCase().includes(term))) {
    throw new Error(`Refusing non-Pillow Search Console property: ${property}`);
  }
  return property;
}

function classifyAction(action) {
  const allowed = ["Implement now", "Prepare for approval", "Investigate now", "Verify now", "Monitor", "Protect", "Reject"];
  if (!allowed.includes(action)) throw new Error(`Unsupported Pillow SEO action: ${action}`);
  return action;
}

module.exports = { PILLOW_PROPERTY, assertPillowProperty, classifyAction };