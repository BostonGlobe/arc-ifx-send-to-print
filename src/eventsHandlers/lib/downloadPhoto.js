const axios = require('axios');
const fs = require('node:fs');

/**
 * Downloads a photo from the given URL.
 * @param {string} photoUrl
 * @param {string} destination
 * @returns {Promise<void>}
 */
async function downloadPhoto(photoUrl, destination) {
  try {
    const response = await axios({
      url: photoUrl,
      method: 'GET',
      responseType: 'stream',
    });

    const writeStream = fs.createWriteStream(destination);

    response.data.pipe(writeStream);

    return new Promise((resolve, reject) => {
      writeStream.on('finish', resolve);
      writeStream.on('error', reject);
    });
  } catch (err) {
    console.log('Something went wrong downloading photo', err);
    throw err;
  }
}

module.exports = downloadPhoto;
