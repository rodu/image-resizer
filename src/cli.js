const program = require('commander');

const cliConfig = program
  .version('0.0.1')
  .description('Image Resizer')
  .option(
    '-i, --image-file [string]',
    'The image to resize.'
  );

let programFlags;

const cli = {
  parse(argv) {
    programFlags = cliConfig.parse(argv);
  },

  getAllFlags() {
    return programFlags;
  },

  getFlag(flagName) {
    if (programFlags && programFlags.hasOwnProperty(flagName)) {
      return programFlags[flagName];
    }
    else {
      throw new Error(`Flag ${flagName} is not recognised!`);
    }
  }
};

// On startup we run the parse method to read the invocation arguments from CLI
cli.parse(process.argv);

module.exports = cli;
