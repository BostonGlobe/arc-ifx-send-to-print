const axios = require('axios');

const apiHost = process.env.API_HOST;

// Add in secrets manager
const arcPat = process.env.ARC_ACCESS_TOKEN;

// TODO: Switch to the content API
async function getDraftANS(id) {
  try {
    const headers = { Authorization: `Bearer ${arcPat}` };
    const url = `${apiHost}/draft/v1/story/${id}/revision/draft`;
    const ans = await axios.get(
      url,
      {
        headers,
      },
    );
    return ans.data;
  } catch (err) {
    console.log('Something went wrong getting full ans', err);
    throw err;
  }
}

module.exports = getDraftANS;
