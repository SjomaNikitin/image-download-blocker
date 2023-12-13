# Image Download Blocker

This JavaScript script prevents image downloads by blocking access through common methods such as right-click "save image as" or downloading with browser extensions.

**How It Works:**

Converts images to canvas.
Blocks canvas download.
Removes image meta-data.

**How to Use:**

Download the script and add it to your web page using:

html
Copy code
`<script src="ImageBlocker.js"></script>`

Or

Add the following line to your script:

html
Copy code
`<script src="https://raw.githubusercontent.com/SjomaNikitin/image-download-blocker/main/ImageBlocker.js"></script>`

**Deficiencies:**

1. Does not instantly work with lazy-loaded images (loading="lazy").
2. It is possible to download images from the browser inspector.

