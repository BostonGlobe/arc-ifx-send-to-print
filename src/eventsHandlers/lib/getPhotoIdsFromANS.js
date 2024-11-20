const get = require('lodash/get');
const forEach = require('lodash/find');

/**
 * Gets photo IDs from ANS data.
 * @param {object} ansData
 * @returns {string[]}
 */
function getPhotoIdsFromANS(ansData) {
  const result = [];

  const basicPromoItem = get(ansData, 'promo_items.basic');
  if (get(basicPromoItem, 'referent.type') === 'image') {
    // Not using get because I want the script to crash if this doesn't exist.
    result.push(basicPromoItem.referent.id);
  } else if (get(basicPromoItem,'type') === 'image') {
    result.push(basicPromoItem._id);
  }

  forEach(
    ansData.content_elements,
    (element) => {
      if (get(element, 'type') === 'reference' && get(element, 'referent.type') === 'image') {
        result.push(element.referent.id);
      } else if (get(element,'type')==='image') {
        result.push(element._id)
      }
    },
  );

  return result;
}

module.exports = getPhotoIdsFromANS;
