const pact = require('@pact-foundation/pact-node');
const config = require('./src/environments/env-publish');
const opts = {
  pactFilesOrDirs: [require('path').join(__dirname, 'pacts')],
  consumerVersion: require('./package.json').version,
  pactBroker: 'https://cobiro.pact.dius.com.au',
  pactBrokerToken: config.PACT_BROKER_TOKEN
};

pact.publishPacts(opts).then(function () {
  console.log('Pacts published!');
});
