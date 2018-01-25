/**
 * Function inits canvas element
 * @function initCanvas
 * @param {HTMLElement} domCanvas HTML canvas element
 * @param {object} canvas object reference
 */
import { fabric } from 'fabric';
import { config } from '../config';

export const canvas = ((config) => {
    fabric.Object.prototype.noScaleCache = true; //PERFORMANCE HACK for smooth scaling group
    fabric.Object.prototype.objectCaching = true;
    fabric.Object.prototype.hasBorders = false;
    fabric.Object.prototype.hasRotatingPoint = false;
    // change objects default controlls behaviore from scale to rotate
    console.log('fabric: ', fabric);
    // fabric.Canvas.prototype._getActionFromCorner = function(target, corner) {
    //     if (corner) {
    //         return 'rotate';
    //     } else {
    //         return 'drag';
    //     }
    // }

    let canvas = new fabric.Canvas(config.DOM_CANVAS[0], {
        width: config.CANVAS_WIDTH,
        height: config.CANVAS_HEIGHT,
        // moveCursor: config.URLS.ICONS.grab,
        // hoverCursor: config.URLS.ICONS.grab,
        // defaultCursor: config.URLS.ICONS.grab,
        stateful: false, // Boolean, Indicates whether objects' state should be saved
        selection: false,
        objectCaching: true,
        // imageSmoothingEnabled: false,
        skipOffscreen: true,
        // stopContextMenu: true,
        renderOnAddRemove: true, //PERFORMANCE HACK
        enableRetinaScaling: true,
        preserveObjectStacking: true
    });
    let isRendering = false,
        render = null;
    render = canvas.renderAll.bind(canvas);
    canvas.renderAll = function() {
        if (!isRendering) {
            isRendering = true;
            fabric.util.requestAnimFrame(function() {
                render();
                isRendering = false;
            });
        }
    };
    canvas.on('mouse:over', (event) => {
        let { target } = event;
        if (target != null) {
            console.log(target.type + ': ', target.id);
        }
    })
    return canvas;
})(config)