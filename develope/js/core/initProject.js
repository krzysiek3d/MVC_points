import { canvas } from "./initCanvas";
import { config } from '../config';
export const initProject = (param) => {
    const { project, layers, app } = param;
    setupProject({
        project: project,
        layers: layers,
        width: config.CANVAS_WIDTH,
        height: config.CANVAS_HEIGHT,
        layersToHide: config.HIDDEN_LAYERS
    });
    canvas.add(project);
    app.emit('projectReady', { project, layers, app });
}
const setupProject = (param) => {
    const { width, height, layersToHide, project, layers } = param,
    // hide given layers
    hideLayers = (layers) => {
            for (const key in layers) {
                if (layers.hasOwnProperty(key)) {
                    if (key.match(layersToHide)) {
                        layers[key].visible = false;
                    }
                }
            }
        },
        // scale project to fit smallest width or height
        scaleToFit = (width, height, project) => {
            if (width > height) {
                project.scaleToHeight(height).setCoords();
            } else {
                project.scaleToWidth(width).setCoords();
            }

        },
        centerProject = (project) => {
            canvas.centerObject(project);
        };

    project.set({
        id: 2,
        type: 'project',
        originX: 'center',
        originY: 'center'
    });

    hideLayers(layers);
    scaleToFit(width, height, project);
    centerProject(project);
}