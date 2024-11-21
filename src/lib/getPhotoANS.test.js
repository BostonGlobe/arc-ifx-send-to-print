const getPhotoANS = require('./getPhotoANS');

describe('getPhotoANS', () => {
  it('fetches the photo ANS from the photo API', async () => {
    const result = await getPhotoANS('PUWLWI4TH5EMNPZSVZPLLJT5D4');

    expect(result._id).toEqual('PUWLWI4TH5EMNPZSVZPLLJT5D4');
  });
});
