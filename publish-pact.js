var pact = require('@pact-foundation/pact-node');
let opts = {
  pactFilesOrDirs: [require('path').join(__dirname, 'pacts')],
  consumerVersion: require('./package.json').version,
  pactBroker: 'https://cobiro.pact.dius.com.au',
  pactBrokerToken: process.env.PACT_BROKER_TOKEN
};

pact.publishPacts(opts).then(function () {
  console.log('Pacts published!');
});
