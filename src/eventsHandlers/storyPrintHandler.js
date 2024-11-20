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

const getDraftANS = require('./lib/getDraftANS');
const formatPrintData = require('./lib/formatPrintData');

const buildRequest = async (event) => {
  const draftAns = await getDraftANS(event.body.story_id);
  if (draftAns) {
    const printSuccess = formatPrintData(draftAns);
  }
};

const storyPrintHandler = async (event) => {
  await buildRequest(event);
};

module.exports = storyPrintHandler;
