const getContent = require('./getContent');

describe('getContent', () => {
  it('fetches the ANS from the Content API', async () => {
    // This does require that the photo not be modified on Arc, but it'll do for now. I don't feel
    // like mocking Axios at the moment.
    const result = await getContent('VPQMNJPIRNGKHF5GISP5UVLMNA');

    expect(result).toMatchSnapshot();
  });
});
