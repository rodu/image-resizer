const { exec } = require('child_process');

const cli = require('./cli');
const breakpoints = require('./breakpoints');

const imageFile = cli.getFlag('imageFile');
const extension = imageFile.substring(
  imageFile.lastIndexOf('.') + 1,
  imageFile.length
);

const extensionRegExp = new RegExp(`.${extension}$`, 'i');
const resizeImage = function(size) {
  const destFile = imageFile.replace(
    extensionRegExp,
    `-${size}w.${extension}`
  );

  exec(`convert -resize ${size}x${size} ${imageFile} ${destFile}`);
};
const printImageTag = () => {
  console.log('<img srcset="');

  breakpoints.forEach((size) => {
    const destFile = imageFile.replace(
      extensionRegExp,
      `-${size}w.${extension}`
    );

    console.log(`\timg/${destFile} ${size}w,\n`);
  });

  console.log('sizes="100vw"');
  console.log(`src="img/${imageFile}" alt="">`);
};

// Creates the thumbnail image
// resizeImage.call({}, 400);
// breakpoints.forEach(resizeImage);
printImageTag();
