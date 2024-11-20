const getDraftANS = require('./getDraftANS');

describe('getDraftANS', () => {
  it('fetches the draft ANS from the Draft API', async () => {
    // This does require that the photo not be modified on Arc, but it'll do for now. I don't feel
    // like mocking Axios at the moment.
    const result = await getDraftANS('VPQMNJPIRNGKHF5GISP5UVLMNA');

    expect(result).toMatchSnapshot();
  });
});
