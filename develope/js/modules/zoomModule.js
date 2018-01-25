import { sliderModule } from './sliderModule';
import { incBtnModule } from './incBtnModule';
import { decBtnModule } from './decBtnModule';
import { scrollModule } from './scrollModule';
export const zoomModule = (param) => {
    let { step, scale, project, snapshot, canvas, $wrapper, $slider, $incBtn, $decBtn, zoomIn, zoomOut } = param;

    const init = (value) => {
            let startScale = value,
                minScale = (startScale - step),
                maxScale = ((startScale + (step * 20)) - step);

            sliderModule({ step, scale, startScale, minScale, maxScale, $slider });
            incBtnModule({ step, scale, startScale, maxScale, $incBtn });
            decBtnModule({ step, scale, startScale, minScale, $decBtn });
            scrollModule({ step, scale, startScale, minScale, maxScale, canvas, $wrapper, zoomIn, zoomOut });

            scale.off('changed', init);
        },
        prepareScale = () => {
            project.visible = false;
            snapshot.visible = true;
        },
        snapshotScale = (value) => {
            snapshot.scale(value);
            canvas.renderAll();
        },
        projectScale = (value) => {
            project.scale(value);
            snapshot.visible = false;
            project.visible = true;
            canvas.renderAll();
        };

    project.on('modified', () => {
        snapshot.set({
            top: project.top,
            left: project.left,
            angle: project.angle,
        }).setCoords();
    });

    scale.on('changed', init);
    scale.on('prepareScale', prepareScale);
    scale.on('snapshotScale', snapshotScale);
    scale.on('changed', projectScale);
}