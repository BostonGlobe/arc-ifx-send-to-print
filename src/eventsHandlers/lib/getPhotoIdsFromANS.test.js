const getPhotoIdsFromANS = require('./getPhotoIdsFromANS');
const testData = require('./test_data/storyAns.json')

describe('getPhotoIdsFromANS', () => {
  it('gets all photos from the test data', () => {
    const photoIds = getPhotoIdsFromANS(testData);
    expect(photoIds).toEqual([
      "PUWLWI4TH5EMNPZSVZPLLJT5D4",
      "GKBJZ5MUYNDNJAWY53G5H7LLGM",
    ]);
  })
});
