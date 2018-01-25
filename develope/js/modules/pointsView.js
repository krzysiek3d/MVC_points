/* ======= PointsView ======= */
/**
 * The View. View presents the model and provides
 * the UI events. The controller is attached to these
 * events to handle the user interraction.
 */
export const pointsView = (props) => {
    let { canvas, model, controller } = props;
    let points = controller.getPoints();

    const createPoint = (props) => {
        let { id, top, left } = props;
        let point = new fabric.Circle({
            id,
            top,
            left,
            type: 'point',
            strokeWidth: 5,
            radius: 12,
            fill: '#fff',
            stroke: '#666',
            originY: 'center',
            originX: 'center',
            hasControls: false,
            hoverCursor: 'pointer'
        });
        return point;
    };
    const addPoint = (point) => {
        let { id } = point;
        let newPoint = createPoint(point);
        let zIndex = canvas._objects.map((obj) => { if (obj.type === 'point') { return obj.id; } }).indexOf(id);

        canvas.insertAt(newPoint, zIndex);
        // increments indexes of rest points
        for (let i = (zIndex + 1); canvas._objects.length > i; i++) {
            let obj = canvas._objects[i];
            if (obj.type === 'point') {
                obj.id++;
            }
        }
    };
    const removePoint = (id) => {
        let pointToRemove = canvas.getObjects('point')[id];
        let zIndex = canvas._objects.map((obj) => { if (obj.type === 'point') { return obj.id; } }).indexOf(id);
        // decrements indexes of rest points
        for (let i = zIndex; canvas._objects.length > i; i++) {
            let obj = canvas._objects[i];
            if (obj.type === 'point') {
                obj.id--;
            }
        }
        canvas.remove(pointToRemove);
    };
    const movePoint = (event) => {
        let { target } = event;
        if (target.type === 'point') {
            let { id, top, left } = target;
            controller.updatePointCoords({ id, top, left });
        }
    };

    points.map((point) => {
        let p = createPoint(point);
        canvas.add(p);
    });

    model.point.on('added', addPoint);
    model.point.on('removed', removePoint);
    canvas.on('object:moving', movePoint);
}