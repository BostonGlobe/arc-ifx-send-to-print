const axios = require('axios');

const apiHost = process.env.API_HOST;

// Add in secrets manager
const arcPat = process.env.ARC_ACCESS_TOKEN;

export default async function getDraftANS(id) {
  try {
    const headers = { Authorization: `Bearer ${arcPat}` };
    const ans = await axios.get(`${apiHost}/draft/v1/story/${id}/revision/draft`, {
      headers,
    });
    return ans.data.ans;
  } catch (err) {
    console.log('Something went wrong getting full ans', err);
    throw err;
  }
}
