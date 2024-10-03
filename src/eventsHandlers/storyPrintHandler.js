const axios = require('axios');

const apiHost = process.env.API_HOST;

// Add in secrets manager
const arcPat = process.env.ARC_ACCESS_TOKEN;

const storyPrintHandler = async (event) => {
  await buildRequest(event);
}

const buildRequest = async (event) => {
  const draftAns = await getDraftANS(event.body.story_id); 
  if (draftAns) {
    const printSuccess = formatPrintData(draftAns);
  }
}

const getDraftANS = async (id) => {
  try {
    const headers = { "Authorization": `Bearer ${arcPat}` };
    const ans = await axios.get(`${apiHost}/draft/v1/story/${id}/revision/draft`, {
      headers: headers
    });
    return ans.data.ans;
  } catch (err) {
    console.log("Something went wrong getting full ans", err);
  }
};

const formatPrintData = async (ans) => {
  console.log('ans.....');
  console.log(JSON.stringify(ans));
  // format print data here
  // send off to print service -- make sure to use awaits and to handle failures properly  
}

module.exports = storyPrintHandler;