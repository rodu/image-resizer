const path = require('path');
const { exec } = require('child_process');

const cli = require('./cli');
const breakpoints = require('./breakpoints');

const imageFile = path.join(__dirname, cli.getFlag('imageFile'));

breakpoints.forEach((res) => {
  const dest = imageFile.replace(/.jpg$/, `-${res}w.jpg`);

  console.log(`generating ${dest}`);
  exec(`convert -resize ${res}x${res} ${imageFile} ${dest}`);
});
