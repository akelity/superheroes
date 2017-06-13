'use strict';

const functions = require('firebase-functions');
const mkdirp = require('mkdirp-promise');
const gcs = require('@google-cloud/storage')();
const spawn = require('child-process-promise').spawn;
const LOCAL_TMP_FOLDER = '/tmp/';


const THUMB_MAX_HEIGHT = 200;
const THUMB_MAX_WIDTH = 200;
const THUMB_PREFIX = 'thumb_';


exports.generateThumbnail = functions.storage.object().onChange(event => {
  const filePath = event.data.name;
  const filePathSplit = filePath.split('/');
  const fileName = filePathSplit.pop();
  const fileDir = filePathSplit.join('/') + (filePathSplit.length > 0 ? '/' : '');
  const thumbFilePath = `${fileDir}${THUMB_PREFIX}${fileName}`;
  const tempLocalDir = `${LOCAL_TMP_FOLDER}${fileDir}`;
  const tempLocalFile = `${tempLocalDir}${fileName}`;
  const tempLocalThumbFile = `${LOCAL_TMP_FOLDER}${thumbFilePath}`;

  if (!event.data.contentType.startsWith('image/')) {
    console.log('This is not an image.');
    return;
  }

  if (fileName.startsWith(THUMB_PREFIX)) {
    console.log('Already a Thumbnail.');
    return;
  }

  if (event.data.resourceState === 'not_exists') {
    console.log('This is a deletion event.');
    return;
  }

  return mkdirp(tempLocalDir).then(() => {
    // Download file from bucket.
    const bucket = gcs.bucket(event.data.bucket);
    return bucket.file(filePath).download({
      destination: tempLocalFile
    }).then(() => {
      console.log('The file has been downloaded to', tempLocalFile);
      // Generate a thumbnail using ImageMagick.
      return spawn('convert', [tempLocalFile, '-thumbnail', `${THUMB_MAX_WIDTH}x${THUMB_MAX_HEIGHT}>`, tempLocalThumbFile]).then(() => {
        console.log('Thumbnail created at', tempLocalThumbFile);
        // Uploading the Thumbnail.
        return bucket.upload(tempLocalThumbFile, {
          destination: thumbFilePath
        }).then(() => {
          console.log('Thumbnail uploaded to Storage at', thumbFilePath);
        });
      });
    });
  });
});