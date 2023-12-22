(function () {

    function waitForImageLoad(img, callback) {
        if (img.naturalWidth && img.naturalHeight) {
            callback(img);
            return;
        }

        const loadListener = () => {
            img.removeEventListener(loadListener, img);
            if (img.naturalWidth && img.naturalHeight) {
                callback(img);
            }
        };
        img.addEventListener("load", loadListener);
    }

    document.addEventListener('contextmenu', event => {
        event.preventDefault();
    });

    function convertImageToCanvas(image) {
        let canv = document.createElement("canvas");
        image.oncontextmenu = "return false"
        canv.width = image.naturalWidth;
        canv.height = image.naturalHeight;
        // Object.assign(canvas.style, window.getComputedStyle(image))
        const styles = window.getComputedStyle(image);
        let cssText = styles.cssText;
        if (!cssText) {
            cssText = Array.from(styles).reduce((str, property) => {
                return `${str}${property}:${styles.getPropertyValue(property)};`;
            }, '');
        }
        canv.style.cssText = cssText;
        image.replaceWith(canv);
        let ctx = canv.getContext("2d");
        ctx.drawImage(image, 0, 0, canv.width, canv.height);
        return {"canvas": canv, "image": image};
    }

    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
    if (!isBot) {
        document.head.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });


        window.onload = (e) => {

            // Normal Script
            const images = document.querySelectorAll("img");
            const metas = document.head.querySelectorAll("meta[property='og:image']");
            const scripts = document.querySelectorAll("script");
            for (let i = 0; i < images.length; i++) {
                let image = images[i];
                waitForImageLoad(image, convertImageToCanvas);
            }

            for (let i = 0; i < metas.length; i++) {
                const meta = metas[i];
                meta.parentElement.removeChild(meta);
            }
            for (let i = 0; i < scripts.length; i++) {
                const script = scripts.item(i);
                if (script.type == "application/ld+json") {
                    script.parentElement.removeChild(script);
                }
            }

            HTMLCanvasElement.prototype.toBlob = function () { }
            HTMLCanvasElement.prototype.toDataURL = function () { }
        };
    }
})();
