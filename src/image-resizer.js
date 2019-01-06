const path = require('path');
const { exec } = require('child_process');

const cli = require('./cli');
const breakpoints = require('./breakpoints');

const imageFile = cli.getFlag('imageFile');
const extension = imageFile.substring(
  imageFile.lastIndexOf('.') + 1,
  imageFile.length
);

const extensionRegExp = new RegExp(`.${extension}$`, 'i');
breakpoints.forEach((res) => {
  const destFile = imageFile.replace(extensionRegExp, `-${res}w.${extension}`);

  console.log(`generating ${destFile}`);
  exec(`convert -resize ${res}x${res} ${imageFile} ${destFile}`);
});
