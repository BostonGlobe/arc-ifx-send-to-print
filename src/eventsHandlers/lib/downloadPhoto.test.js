const isBuffer = require('lodash/isBuffer');

const downloadPhoto = require('./downloadPhoto');

expect.extend({
  toBeBuffer(received) {
    const pass = isBuffer(received);
    if (pass) {
      return {
        message: () => `Expected value not to be a Buffer`,
        pass: true,
      };
    } else {
      return {
        message: () => `Expected value to be a Buffer`,
        pass: false,
      };
    }
  },
});

describe('downloadPhoto', () => {
  it('downloads a photo from the given URL', async () => {
    const photoUrl = 'https://yavuzceliker.github.io/sample-images/image-1.jpg';
    const buffer = await downloadPhoto(photoUrl);

    expect(buffer).toBeBuffer();
  });
});
