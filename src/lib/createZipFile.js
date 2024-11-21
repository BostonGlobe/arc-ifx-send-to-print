const JSZip = require('jszip')
const map = require('lodash/map');
const getPhotoIdsFromANS = require('./getPhotoIdsFromANS');
const getPhotoANS = require('./getPhotoANS');
const path = require('node:path');
const downloadPhoto = require('./downloadPhoto');

async function createZipFile(ans) {
  console.log('Creating zip file')
  // Create the ZIP file.
  const zipFile = new JSZip();
  const storyId = ans._id;

  // Add the ANS to the ZIP file.
  zipFile.file(`${storyId}.json`, JSON.stringify(ans));

  console.log('Added story data to zip file');

  const photoIds = getPhotoIdsFromANS(ans);
  await Promise.all(
    map(photoIds, async (photoId) => {
      const ansData = await getPhotoANS(photoId);
      zipFile.file(`${photoId}.json`, JSON.stringify(ansData));

      const photoBuffer = await downloadPhoto(ansData.url);
      zipFile.file(`${photoId}${path.extname(ansData.url)}`, photoBuffer);

      console.log(`Added photo ${photoId} to zip file`);
    })
  );

  console.log('Generating zip file data');

  return await zipFile.generateAsync({ type: 'nodebuffer' });
}

module.exports = createZipFile;
