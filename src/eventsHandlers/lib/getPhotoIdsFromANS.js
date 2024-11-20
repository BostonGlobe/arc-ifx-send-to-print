const get = require('lodash/get');
const forEach = require('lodash/find');

/**
 * Gets photo IDs from ANS data.
 * @param {object} data
 * @returns {string[]}
 */
function getPhotoIdsFromANS(data) {
  const result = [];

  const ansData = get(data, 'ans');

  const basicPromoItem = get(ansData, 'promo_items.basic');
  if (get(basicPromoItem, 'referent.type') === 'image') {
    result.push(get(basicPromoItem, 'referent.id'));
  }

  forEach(
    ansData.content_elements,
    (element) => {
      if (get(element, 'type') === 'reference' && get(element, 'referent.type') === 'image') {
        result.push(element.referent.id);
      }
    },
  );

  return result;
}

module.exports = getPhotoIdsFromANS;
