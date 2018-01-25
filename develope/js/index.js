/**
 * @name Fit-project
 * @version 1.0
 * @author Krzysztof Kacik <krzysiek3d@gmail.com>
 * @description Js app used for suit projects on custom plain.
 * It depends on:
 * - fabric.js 1.7.11 and not newer version
 * - jquery 3.2.1
 */

import { fabric } from 'fabric';
import { config } from './config';
import { Subject, updateSnapshot } from './utils';
import { canvas } from './core/initCanvas'; // MAIN CANVAS OBJECT TO DRAW ON
import { loadObjectsFromSvg } from './core/loadObjectsFromSvg';
import { initProject } from './core/initProject';
import { initSnapshot } from './core/initSnapshot';
import { zoomModule } from './modules/zoomModule';
import { planeModule } from './modules/planeModule';

planeModule({
    top: 50,
    left: 50,
    width: 500,
    height: 500,
    canvas
});

// /* ======= App Core ======= */
// const app = new Subject(), // APP MAIN PROJECT OBJECT TO BE OBSERVED BY CORE LOAD
//     ajax = new Subject(), // APP MAIN AJAX OBJECT TO OBSERVE WHEN INIT APP
//     scale = new Subject(), // APP MAIN SCALE OBJECT TO OBSERVE
//     points = new Subject(), // APP POINTS FOR SURFACE DRAWING
//     mirror = new Subject(), // APP MIRROR STATE TO BE OBSERVED BY MODULES
//     /* ======= App Sandbox ======= */
//     initApp = (param) => {
//         const { project, layers, snapshot } = param;
//         // MODULES ONLY KNOWS ABOUT THIS OBJECTS, CORE APP OBJECTS ARE NOT AVAILABLE
//         loadModules({ scale, mirror, canvas, project, layers, snapshot, config });
//         // init APP EVENTS FOR MODULES TO LISTEN
//         scale.emit('changed', project.scaleX);
//         mirror.emit('changed', false);
//     },
//     /* ======= App Sandbox ======= */
//     /* ======= App Modules ======= */
//     loadModules = (param) => {
//         const { scale, mirror, canvas, project, layers, snapshot, config } = param;
//         // app.emit('projectUpdated', project);
//         zoomModule({
//             step: 0.2,
//             scale,
//             canvas,
//             project,
//             snapshot,
//             $wrapper: config.$DOM,
//             $slider: config.$DOM.find('[data-zoomslider]'),
//             $incBtn: config.$DOM.find('[data-zoominc]'),
//             $decBtn: config.$DOM.find('[data-zoomdec]'),
//             zoomIn: config.URLS.ICONS.zoomIn,
//             zoomOut: config.URLS.ICONS.zoomOut
//         });
//         planeModule({
//             top: 50,
//             left: 50,
//             width: 500,
//             height: 500,
//             canvas
//         });
//     };
// /* ======= App Modules ======= */
// /* ======= App Core ======= */

// /* ======= App Core ======= */
// ajax.on('svgLoaded', initProject);
// app.on('projectReady', initSnapshot);
// app.on('snapshotReady', initApp);
// app.on('projectUpdated', updateSnapshot);
// /* ======= App Core ======= */

// /* ======= App Init ======= */
// loadObjectsFromSvg({
//     url: config.URLS.SVG,
//     layersToLoad: config.LOADED_LAYERS
// }, (project, layers) => {
//     ajax.emit('svgLoaded', { project, layers, app });
// });
// /* ======= App Init ======= */