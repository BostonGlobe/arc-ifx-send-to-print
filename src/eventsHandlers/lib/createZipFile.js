const JSZip = require('jszip')
const map = require('lodash/map');
const getPhotoIdsFromANS = require('./getPhotoIdsFromANS');
const getPhotoANS = require('./getPhotoANS');
const path = require('node:path');
const downloadPhoto = require('./downloadPhoto');

async function createZipFile(storyId, ans) {
  // Create the ZIP file.
  const zipFile = new JSZip();

  // Add the ANS to the ZIP file.
  zipFile.file(`${storyId}.json`, JSON.stringify(ans));

  const photoIds = getPhotoIdsFromANS(ans);
  await Promise.all(
    map(photoIds, async (id) => {
      const ansData = await getPhotoANS(id);
      zipFile.file(`${id}.json`, JSON.stringify(ansData));

      const photoBuffer = await downloadPhoto(ansData.url);
      zipFile.file(`${id}${path.extname(ansData.url)}`, photoBuffer);
    })
  );

  return zipFile.generateAsync({ type: 'nodebuffer' });
}

module.exports = createZipFile;
