const JSZip = require('jszip');
const sort = require('lodash/sortBy')

const createZipFile = require('./createZipFile');
const getContent = require('./getContent');

describe('zipIntegrations', () => {
  it('creates a proper zip file for main test article', async () => {
    const contentAns = await getContent('VPQMNJPIRNGKHF5GISP5UVLMNA');
    const zipFile = await createZipFile(contentAns);

    const zip = new JSZip();
    await zip.loadAsync(zipFile);
    const fileNames = Object.keys(zip.files);

    expect(sort(fileNames)).toEqual(sort([
      'VPQMNJPIRNGKHF5GISP5UVLMNA.json',
      'PUWLWI4TH5EMNPZSVZPLLJT5D4.json',
      'PUWLWI4TH5EMNPZSVZPLLJT5D4.jpg',
      'GKBJZ5MUYNDNJAWY53G5H7LLGM.json',
      'GKBJZ5MUYNDNJAWY53G5H7LLGM.jpg',
    ]));
  });

  it('creates a proper zip file for no-inline-image test article', async () => {
    const contentAns = await getContent('HQKUSCNGOJAIXHLLCRVON6DE3I');
    const zipFile = await createZipFile(contentAns);

    const zip = new JSZip();
    await zip.loadAsync(zipFile);
    const fileNames = Object.keys(zip.files);

    expect(sort(fileNames)).toEqual(sort([
      'HQKUSCNGOJAIXHLLCRVON6DE3I.json',
      'PUWLWI4TH5EMNPZSVZPLLJT5D4.json',
      'PUWLWI4TH5EMNPZSVZPLLJT5D4.jpg',
    ]));
  });

  it('creates a proper zip file for no-image test article', async () => {
    const contentAns = await getContent('JPE6WID3YBAHXD6C3S5Q2ZOSXY');
    const zipFile = await createZipFile(contentAns);

    const zip = new JSZip();
    await zip.loadAsync(zipFile);
    const fileNames = Object.keys(zip.files);

    expect(sort(fileNames)).toEqual(sort([
      'JPE6WID3YBAHXD6C3S5Q2ZOSXY.json',
    ]));
  });
});
