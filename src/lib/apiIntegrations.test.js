const getContent = require('./getContent');
const getPhotoIdsFromANS = require('./getPhotoIdsFromANS');

describe('API integration tests', () => {
  it('pulls two photos from main test story', async () => {
    const content = await getContent('VPQMNJPIRNGKHF5GISP5UVLMNA');
    const photoIds = getPhotoIdsFromANS(content);

    expect(photoIds).toEqual([
      'PUWLWI4TH5EMNPZSVZPLLJT5D4',
      'GKBJZ5MUYNDNJAWY53G5H7LLGM',
    ]);
  });

  it('pulls one photo from test story without inline image', async () => {
    const content = await getContent('HQKUSCNGOJAIXHLLCRVON6DE3I');
    const photoIds = getPhotoIdsFromANS(content);

    expect(photoIds).toEqual([
      'PUWLWI4TH5EMNPZSVZPLLJT5D4',
    ]);
  });

  it('pulls zero photos from test story without images', async () => {
    const content = await getContent('JPE6WID3YBAHXD6C3S5Q2ZOSXY');
    const photoIds = getPhotoIdsFromANS(content);

    expect(photoIds).toEqual([]);
  });
});
