# Image Download Blocker

This JavaScript script prevents image downloads by blocking access through common methods such as right-click "save image as" or downloading with browser extensions.

**How It Works:**

1. This script replaces images with `<canvas>` elements.
   
2. The script blocks `HTMLCanvasElement.prototype.toBlob`, `HTMLCanvasElement.prototype.toDataURL` methods to prevent downloading of the canvas contents.
   
3. The script removes references to image files from HTML page <head> section and from the structured data section.

**How to Use:**


No configuration is necessary, just include the script to your page. For example:

Download the script and add it to your web page using:

Html element `<script>`

`<script src="ImageBlocker.js"></script>`

Or

Add the following line to your script:

html element code
`<script src="https://raw.githubusercontent.com/SjomaNikitin/image-download-blocker/main/ImageBlocker.js"></script>`

**Limitations:**

1. The script doesn't work properly with lazy-loading images yet.

2. User will still be able to download images using developer tools. This won't be fixed anytime soon. Unfortunately, there is no way to prevent user from opening developer tools.

