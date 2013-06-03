bludder.js
==========

Simple thing using js and CSS to show images sequentially in a container element.

## Build

    git clone https://github.com/npup/bludder.js.git
    cd bludder.js
    make

CSS and JavaScript dist found in `bludder.js/build`.
Minify process uses uglifyjs (install via npm).


## Usage

First, load `bludder.css` and `bludder.js`.

    // create bludder of 3 images and append to document.body
    var b = bludder(["img1.png", "img2.png", "img3.png"]);

    // create bludder with custom options
    var b2 = bludder(["img1.png", "img2.png", "img3.png"], {
      "container": document.querySelector("#foo") // could send in just id-string "foo" instead
      , "interval": 4000 // milliseconds (default is 5000)
      , "width": "250px" // CSS style string, default is "400px"
      , "height": "250px" // CSS style string, default is "400px"
    });

    // stop bluddering
    b2.stop();

    // resume bluddering
    b2.start();

    // resume bluddering with specific interval (milliseconds)
    b2.start(2500);
