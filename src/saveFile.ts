import * as yargs from 'yargs';
import * as fileService from './services/fileService';

interface Parameters {
  url: string;
  outputFolder: string;
  outputFilename: string;
}

// Check parameters
const { argv } = yargs.options({
  url: {
    type: 'string',
    required: true,
    description: 'URL of the file',
  },
  outputFolder: {
    alias: 'output_folder',
    type: 'string',
    required: true,
    description: 'Target folder',
  },
  outputFilename: {
    alias: 'output_filename',
    type: 'string',
    required: true,
    description: 'Target filename',
  },
});

const { url, outputFolder, outputFilename } = argv as Parameters;

try {
  fileService.downloadAndSaveFile(url, outputFolder, outputFilename);
} catch (error) {
  console.log('Error during the process', error);
  process.exit(0);
}
