(function() {
    function waitForImageLoad(img, callback){
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

    function convertImageToCanvas(image) {
        let canv = document.createElement("canvas");
        image.oncontextmenu = "return false"
        // canv.width = image.offsetWidth * 10;
        // canv.height = image.offsetHeight * 10;
        canv.width = image.naturalWidth;
        canv.height = image.naturalHeight;
        canv.style.width = image.offsetWidth + "px";
        canv.style.height = image.offsetHeight + "px";
        if (image.style.left !== "") {
            canv.style.left = (image.offsetLeft / window.innerWidth * 100) + "%";
            canv.style.position = "absolute";
        }
        if (image.style.top !== "") {
            canv.style.top = (image.offsetTop / window.innerHeight * 100) + "%";
            canv.style.position = "absolute";
        }
        canv.className = image.className;                    
        image.parentElement.appendChild(canv);
        let ctx = canv.getContext("2d");
        ctx.drawImage(image, 0, 0, canv.width, canv.height);
        image.parentElement.removeChild(image)
    }

    const isBot = /bot|googlebot|crawler|spider|robot|crawling/i.test(navigator.userAgent);
    if (!isBot) {
        document.body.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });

        window.onload = (e) => {
            const images = document.querySelectorAll("img");
            const metas = document.head.querySelectorAll("meta[property='og:image']");
            const scripts = document.querySelectorAll("script");
            for (let i = 0; i < images.length; i++) {
                let image = images[i];
                waitForImageLoad(image, convertImageToCanvas);
            }
    
            for(let i=0; i<metas.length; i++){
                const meta = metas[i];
                    meta.parentElement.removeChild(meta);
            }
            for(let i=0; i<scripts.length; i++){
                const script = scripts.item(i);
                if(script.type == "application/ld+json"){
                    script.parentElement.removeChild(script);
                }
            }
    
            HTMLCanvasElement.prototype.toBlob = function () { }
            HTMLCanvasElement.prototype.toDataURL = function () { }
        };
    }
})();
