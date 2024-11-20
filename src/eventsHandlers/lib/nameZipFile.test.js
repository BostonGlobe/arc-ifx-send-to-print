const nameZipFile = require('./nameZipFile');

describe('nameZipFile', () => {
  it('names a zip file based on the timestamp and story ID', () => {
    const storyId = 'storyId12345';
    const result = nameZipFile(storyId);
    expect(result).toMatch(/^\d*_storyId12345.zip$/);
  });
});
