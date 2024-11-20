const path = require('node:path');
const os = require('node:os');
const fs = require('node:fs');

const downloadPhoto = require('./downloadPhoto');

describe('downloadPhoto', () => {
  it('downloads a photo from the given URL', async () => {
    const photoUrl = 'https://yavuzceliker.github.io/sample-images/image-1.jpg';
    const buffer = await downloadPhoto(photoUrl);

    expect(buffer).toMatchSnapshot();
  });
});
