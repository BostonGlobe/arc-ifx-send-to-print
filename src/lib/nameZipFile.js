function nameZipFile(storyId) {
  const timestamp = new Date().getTime();
  return `${timestamp}_${storyId}.zip`;
}

module.exports = nameZipFile;
