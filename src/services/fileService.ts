import fs = require('fs');
import axios from 'axios';

/**
 * Create a directory if it doesn't exist
 * @param outputFolder Path of the directory
 */
export const createDirectory = (outputFolder: string) => {
  fs.mkdir(outputFolder, { recursive: true }, (error) => {
    if (error) {
      console.error('Error while creating target folder');
      throw error;
    }
  });
};

/**
 * Download and save the file
 * @param url Url of the file de download
 * @param outputFolder Path of the directory
 * @param outputFilename Filename for saving the file
 */
export const downloadAndSaveFile = (url: string, outputFolder: string, outputFilename: string) => {
  axios({
    method: 'get',
    url,
    responseType: 'stream',
  })
    .then((response) => {
      // Create the directory to save the file
      createDirectory(outputFolder);
      // Save the file
      try {
        response.data.pipe(fs.createWriteStream(`${outputFolder}\\${outputFilename}`));
      } catch (error) {
        console.log('Error while saving the file', error);
        throw error;
      }
    })
    .catch((error) => {
      console.log('Error while downloading the file, response code :', error.message);
      throw error;
    });
};
