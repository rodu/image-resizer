const { exec } = require('child_process');

const cli = require('./cli');
const breakpoints = require('./breakpoints');

const imageFile = cli.getFlag('imageFile');

const extension = imageFile.substring(
  imageFile.lastIndexOf('.') + 1,
  imageFile.length
);
const extensionRegExp = new RegExp(`.${extension}$`, 'i');
const fileName = imageFile
  .substring(imageFile.lastIndexOf('/') + 1, imageFile.length);
const getDestFileName = (fileName, size, suffix) => {
  return fileName.replace(
    extensionRegExp,
    '-' + (suffix || `${size}w`) + `.${extension}`
  );
};

const resizeImage = function(size) {
  const destFile = getDestFileName(imageFile, size, this.suffix);

  exec(`convert -resize ${size}x${size} ${imageFile} ${destFile}`);
};
const printImageTag = () => {
  console.log('');
  console.log('<img srcset="');

  breakpoints.forEach((size, index, breakpoints) => {
    const destFile = getDestFileName(fileName, size);
    const terminatorChar = (index === breakpoints.length - 1) ? '"' : ',';

    console.log(`  img/${destFile} ${size}w${terminatorChar}`);
  });

  console.log('  sizes="100vw"');
  console.log(`  src="img/${fileName}" alt="">`);
  console.log('');
};

// Creates the thumbnail image
resizeImage.call({ suffix: 'thumbnail' }, 400);
// Gnereates an image for each breakpoint
breakpoints.forEach(resizeImage, {});
// Writes out the IMG tag with responsive srcset values
printImageTag();
