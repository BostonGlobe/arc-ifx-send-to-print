/*
*****
This example code can be used as a starting point for integrating with an external print service.
When the event is recieved from Composer, it contains a story ID.
Using this ID, get the full ANS from Draft API, then format the data as needed
and send it off to the print service.
Since all services differ, this example code does not include formatting,
but provides a way for you to quickly get up and running.
*****
*/

const getContent = require('./lib/getContent');
const createZipFile = require('./lib/createZipFile');
const nameZipFile = require('./lib/nameZipFile');

const buildRequest = async (event) => {
  const draftAns = await getContent(event.body.story_id);
  if (draftAns) {
    const zipBuffer = await createZipFile(draftAns);
    const fileName = nameZipFile(draftAns._id);
  }
};

const storyPrintHandler = async (event) => {
  await buildRequest(event);
};

module.exports = storyPrintHandler;
