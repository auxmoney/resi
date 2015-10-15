"use strict";

// Flag if browser supports webP
var knowsWebP = (function () {
    var canvas = document.createElement("canvas");
    return (canvas.toDataURL && canvas.toDataURL("image/webp").indexOf("data:image/webp") === 0);
})();

/**
 * RESI - responsive Image JS
 * works for: Safari, Chrome, Firefox, IE8+
 * handles: jpg, png, gif, webp
 *
 * @param  {array} imageArray   array with images given, like:
 *                              ['image_large.webp', '800px', 'image_large.jpg', '800px', 'image_small.jpg', 0]
 * @param  {string} uID         unique ID to catch image
 */
function responsiveImageJS(imageArray, uID) {
    var logoElement = document.getElementById(uID);

    /**
     * Choose the best matching image & consider webP, if supported
     * "fuzzy" shifts the breakpoints. Higher = bester use of bandwidth / Lower = priorize higher image quality
     */
    function chooseImage() {
        var i = 0,
            path = "",
            breakpoint = 0,
            fuzzy = 0.80,               // value to shift the breakpoint
            imagePairs = imageArray.length,
            windowWidth = window.innerWidth * (window.devicePixelRatio || 1);

        // get the best matching image
        for (i = 0; i < imagePairs; i += 2) {
            breakpoint = parseInt(imageArray[i + 1], 10);
            if (windowWidth >= breakpoint * fuzzy) {
                path = imageArray[i];
                // if webP found and supported pick it, otherwise continue searching
                if (path.indexOf("webp") === -1 || knowsWebP) {
                    break;
                }
            }
        }
        if (logoElement.src.indexOf(path) === -1) { // set new path only if it differs
            logoElement.setAttribute("src", path);
        }
    }

    window.addEventListener("resize", chooseImage, true);
    chooseImage();
}
