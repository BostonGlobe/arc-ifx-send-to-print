const axios = require('axios');

const apiHost = process.env.API_HOST;

// Add in secrets manager
const arcPat = process.env.ARC_ACCESS_TOKEN;

async function getContent(id) {
  console.log(`Fetching story content for ${id}`);
  try {
    const headers = { Authorization: `Bearer ${arcPat}` };
    const url = `${apiHost}/content/v4`;
    const ans = await axios.get(
      url,
      {
        params: {
          website: 'bostonglobe',
          _id: id,
          published: 'false',
        },
        headers,
      },
    );
    console.log('Story fetch successful');
    return ans.data;
  } catch (err) {
    console.log('Something went wrong getting full ans', err);
    throw err;
  }
}

module.exports = getContent;
