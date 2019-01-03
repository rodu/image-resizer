# Image Resizer

Easily create multiple image sizes to implement responsive images web design.

Use the program to convert an image to a number of different breakpoints that can be specified in a configuration file.

## Setup

The programs requires the [ImageMagick suite](https://www.imagemagick.org/script/index.php) to run.

In Ubuntu, ImageMagick can be installed with: `sudo apt install imagemagick`

Then, run `npm install` to install any additional required dependency.

## Configuration

The only available options at the moment is the specification of a list of desired dimensions to use for the image sizes.

Edit the file `src/breakpoints.json` to change the list of image sizes you'd like to get in output.

## Usage

In the terminal, go to the `src` folder. Then run:

`node image-resizer -i [YOUR IMAGE FILE]`

The program will generate the resized images in the same location as the source image.
