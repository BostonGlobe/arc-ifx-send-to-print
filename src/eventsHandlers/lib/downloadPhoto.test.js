const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs');

const downloadPhoto = require('./downloadPhoto');

describe('downloadPhoto', () => {
  it('downloads a photo from the given URL', async () => {
    const photoUrl = 'https://yavuzceliker.github.io/sample-images/image-1.jpg';
    const tempFile = path.join(
      os.tmpdir(),
      new Date().getTime().toString(),
      'downloadPhoto.test.jpg',
    );

    await downloadPhoto(photoUrl, tempFile);

    const photoExists = fs.existsSync(tempFile);
    expect(photoExists).toBe(true);

    // Clean up the file.
    fs.unlinkSync(tempFile);
  });
});
