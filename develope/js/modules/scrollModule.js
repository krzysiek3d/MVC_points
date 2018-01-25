export const scrollModule = (param) => {
    let { step, scale, startScale, minScale, maxScale, canvas, $wrapper, zoomIn, zoomOut } = param,
    readyToScale = true,
        localScale = startScale,
        getZoom = (value) => {
            localScale = value;
        },
        addScroll = (el, fn) => {
            // cross browser scroll
            if (el.addEventListener) {
                el.addEventListener('mousewheel', fn, false); // IE9, Chrome, Safari, Opera
                el.addEventListener('DOMMouseScroll', fn, false); // Firefox
            } else {
                el.attachEvent('onmousewheel', fn); // IE 6/7/8
            }
        },
        scrollHandler = (event) => {
            const evt = window.event || event;
            event.preventDefault();
            zoom({ evt, step, scale, minScale, maxScale, canvas, $wrapper, zoomIn, zoomOut });
            return false;
        },
        zoom = (param) => {
            // cross-browser wheel => returns delta, scroll down = -1, scroll up = 1
            let { evt, step, scale, minScale, maxScale, canvas, $wrapper } = param,
            delta = Math.max(-1, Math.min(1, (evt.wheelDelta || -evt.detail)));

            localScale = (localScale + (delta * step)).toFixed(2) * 1;

            if (localScale < minScale) {
                localScale = minScale;
            }
            if (localScale > maxScale) {
                localScale = maxScale;
            }

            if (localScale > minScale && localScale < maxScale) {
                if (readyToScale) {
                    scale.emit('prepareScale');
                    readyToScale = false;
                }
                if ($wrapper.data('scrollTimeout')) {
                    clearTimeout($wrapper.data('scrollTimeout'));
                    scale.emit('snapshotScale', localScale);
                }
                $wrapper.data('scrollTimeout', setTimeout(function() {
                    scale.emit('changed', localScale);
                    readyToScale = true;
                }, 40));

                // apply cursor icon if scroll up or down
                if (delta > 0) {
                    canvas.setCursor(zoomIn);
                } else {
                    canvas.setCursor(zoomOut);
                }
            }
        };
    scale.on('changed', getZoom);
    addScroll($wrapper[0], scrollHandler);
}