const axios = require('axios');
const fs = require('node:fs');

/**
 * Downloads a photo from the given URL.
 * @param {string} photoUrl
 * @returns {Promise<Buffer>}
 */
async function downloadPhoto(photoUrl) {
  console.log(`Downloading photo ${photoUrl}`);
  try {
    const response = await axios({
      url: photoUrl,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    console.log('Photo download complete');
    return response.data;
  } catch (err) {
    console.log('Something went wrong downloading photo', err);
    throw err;
  }
}

module.exports = downloadPhoto;
