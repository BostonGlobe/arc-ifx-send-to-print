const axios = require('axios');

const apiHost = process.env.API_HOST;

// Add in secrets manager
const arcPat = process.env.ARC_ACCESS_TOKEN;

// TODO: Switch to the content API
async function getContent(id) {
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
    return ans.data;
  } catch (err) {
    console.log('Something went wrong getting full ans', err);
    throw err;
  }
}

module.exports = getContent;
