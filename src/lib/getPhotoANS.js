const axios = require('axios');

const apiHost = process.env.API_HOST;
const arcPat = process.env.ARC_ACCESS_TOKEN;

async function getPhotoANS(id) {
  console.log(`Fetching photo ANS for ID ${id}...`);
  try {
    const headers = { Authorization: `Bearer ${arcPat}` };
    const url = `${apiHost}/photo/api/v2/photos/${id}`;
    const ans = await axios.get(
      url,
      {
        headers,
      },
    );
    console.log('Fetch successful');
    return ans.data;
  } catch (err) {
    console.log('Something went wrong getting photo ans', err);
    throw err;
  }
}

module.exports = getPhotoANS;
