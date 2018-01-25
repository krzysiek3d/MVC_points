/* ======= OuterLinesView ======= */
/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
export const outerLinesView = (props) => {
    let { canvas, model, controller } = props;
    let points = controller.getPoints();

    const createLine = (id, startPoint, endPoint) => {
        let line = new fabric.Line([startPoint.left, startPoint.top, endPoint.left, endPoint.top], {
            id,
            type: 'line',
            strokeWidth: 5,
            stroke: 'lime',
            originY: 'center',
            originX: 'center',
            // evented: false,
            hasControls: false,
            hoverCursor: 'ew-resize',
            perPixelTargetFind: true
        });
        return line;
    };
    const addLine = (point) => {
        let { id } = point;
        let points = controller.getPoints();
        let lines = canvas.getObjects('line');
        let oldLine = lines[id - 1] || lines[lines.length - 1];
        let startPoint = point;
        let endpoint = points[id + 1] || points[0];
        let line = createLine(startPoint.id, startPoint, endpoint);
        let zIndex = (canvas._objects.map((obj) => { if (obj.type === 'line') { return obj.id; } }).indexOf(id));

        oldLine.set({ x2: point.left, y2: point.top }).setCoords();

        canvas.insertAt(line, zIndex);
        // // increments indexes of rest lines
        for (let i = (zIndex + 1); canvas._objects.length > i; i++) {
            let obj = canvas._objects[i];
            if (obj.type === 'line') {
                obj.id++;
            }
        }
    };
    const removeLine = (id) => {
        let points = controller.getPoints();
        let lines = canvas.getObjects('line');
        let lineToRemove = lines[id];
        let targetPoint = points[id];
        let lineToMove = lines[id - 1] || lines[lines.length - 1];
        let zIndex = canvas._objects.map((obj) => {
            if (obj.type === 'line') { return obj.id; }
        }).indexOf(id);

        // decrements indexes of rest lines
        for (let i = zIndex; canvas._objects.length > i; i++) {
            let obj = canvas._objects[i];
            if (obj.type === 'line') {
                obj.id--;
            }
        }
        canvas.remove(lineToRemove);
        lineToMove.set({ x2: targetPoint.left, y2: targetPoint.top }).setCoords();
    };
    const updateLinesCoords = (point) => {
        let { id, top, left } = point;
        let lines = canvas.getObjects('line');
        let firstLine = lines[id];
        let secondLine = lines[id - 1] || lines[lines.length - 1];

        firstLine.set({ y1: top, x1: left }).setCoords();
        secondLine.set({ y2: top, x2: left }).setCoords();
    };
    const moveLine = (event) => {
        // TODO
        let { target } = event;
        if (target.type === 'line') {
            let { id, top, left } = target,
            startPoint = {},
                endPoint = {};
            console.log('target: ', target);
        }
    };

    points.map((point, i) => {
        let startPoint = point,
            endPoint = points[i + 1] || points[0],
            line = createLine(startPoint.id, startPoint, endPoint);
        canvas.add(line);
    });

    model.point.on('added', addLine);
    model.point.on('removed', removeLine);
    model.point.on('moving', updateLinesCoords);
    canvas.on('object:moving', moveLine);
};