const path = require('path');
const fs = require('fs');
const solc = require('solc');

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol');
const source = fs.readFileSync(inboxPath, 'utf8');

const input = {
  language: "Solidity",
  sources: {
    // keys should be global names of the source files
    //
    'Inbox.sol': {
      // content means the literal contents of the source file.  Re
      content: source,
    },
  },
  settings: {
    // Enable outputs for all properties of every single contract
    outputSelection: {
      '*': {
        '*': ['*'],
      },
    },
  },
};


module.exports = JSON.parse(solc.compile(JSON.stringify(input))).contracts['Inbox.sol'].Inbox;
console.log(module.exports);
