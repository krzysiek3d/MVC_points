import { canvas } from './core/initCanvas'; // MAIN CANVAS OBJECT TO DRAW ON
//Subject - a super-basic Javascript (observer) pattern
export class Subject {
    /** @lends Subject.prototype */
    constructor() {
        this.events = []
    }
    /**
     * Adds new observer to Subject on specyfic event
     * @param {String} eventName Name of event
     * @param {Function} fn The callback that handles the response and grabs data as argument
     */
    on(eventName, fn) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    }
    /**
     * Removes observer from Subject on specyfic event
     * @param {String} eventName Name of event
     * @param {Function} fn The callback that handles the response and grabs data as argument
     */
    off(eventName, fn) {
        if (this.events[eventName]) {
            for (let i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            }
        }
    }
    /**
     * Changes data on specyfic event
     * @param {String} eventName Name of event
     * @param {any} data Any type of data
     */
    emit(eventName, data) {
        if (this.events[eventName]) {
            this.events[eventName].forEach((fn) => {
                fn(data);
            })
        }
    }
}

export const calcDistance = (x1, y1, x2, y2) => {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2)).toFixed(2) * 1;
}

export const createSnapshot = (obj, callback) => {
    obj.cloneAsImage(function(img) {
        img.set({
            type: 'snapshot',
            top: obj.top,
            left: obj.left,
            width: obj.width,
            height: obj.height,
            scaleY: obj.scaleY,
            scaleX: obj.scaleX,
            angle: obj.angle,
            originY: 'center',
            originX: 'center',
            visible: false
        }).setCoords();
        canvas.add(img);
        if (typeof callback === 'function') {
            callback(img);
        }
    });
}
export const updateSnapshot = (obj) => {
    canvas.remove(canvas.getObjects('snapshot')[0]);
    createSnapshot(obj);
}