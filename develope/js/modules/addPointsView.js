    /* ======= addPointsView ======= */
    /**
     * The View. View presents the model and provides
     * the UI events. The controller is attached to these
     * events to handle the user interraction.
     */
    export const addPointsView = (props) => {
        let { canvas, model, controller } = props;
        let points = controller.getPoints();

        const createPoint = (id) => {
            let circle = new fabric.Circle({
                strokeWidth: 5,
                radius: 12,
                fill: 'lime',
                stroke: '#666'
            });
            let point = new fabric.Group([circle], {
                id,
                width: 42,
                height: 100,
                type: 'addPoint',
                lockMovementY: true,
                lockMovementX: true,
                hasControls: false,
                originY: 'bottom',
                originX: 'center',
                hoverCursor: 'pointer'
            });
            return point;
        };
        const calcPointCoords = (firstPoint, secondPoint) => {
            let top = (firstPoint.top + secondPoint.top) / 2;
            let left = (firstPoint.left + secondPoint.left) / 2;
            let angle = fabric.util.radiansToDegrees(Math.atan2((secondPoint.top - firstPoint.top), (secondPoint.left - firstPoint.left)));
            return { top, left, angle };
        };
        const updatePointsCoords = (point) => {
            let { id } = point;
            let points = controller.getPoints();
            let addPoints = canvas.getObjects('addPoint');
            let firstPoint = points[id - 1] || points[points.length - 1];
            let middlePoint = point;
            let lastPoint = points[id + 1] || points[0];
            let prevAddPoint = addPoints[id];
            let nextAddPoint = addPoints[id + 1] || addPoints[0];

            prevAddPoint.set(calcPointCoords(firstPoint, middlePoint)).setCoords();
            nextAddPoint.set(calcPointCoords(middlePoint, lastPoint)).setCoords();
        };
        const addPoint = (point) => {
            let { id } = point;
            let newAddPoint = createPoint(id);
            let zIndex = canvas._objects.map((obj) => { if (obj.type === 'addPoint') { return obj.id; } }).indexOf(id);

            canvas.insertAt(newAddPoint, zIndex);

            // increments indexes of rest points
            for (let i = (zIndex + 1); canvas._objects.length > i; i++) {
                let obj = canvas._objects[i];
                if (obj.type === 'addPoint') {
                    obj.id++;
                }
            }
            updatePointsCoords(point);
        };
        const removePoint = (id) => {
            let addPoints = canvas.getObjects('addPoint');
            let pointToRemove = addPoints[id];
            let pointToMove = controller.getPoints()[id];
            let zIndex = canvas._objects.map((obj) => { if (obj.type === 'addPoint') { return obj.id; } }).indexOf(id);

            canvas.remove(pointToRemove);
            // decrements indexes of rest points
            for (let i = zIndex; canvas._objects.length > i; i++) {
                let obj = canvas._objects[i];
                if (obj.type === 'addPoint') {
                    obj.id--;
                }
            }
            updatePointsCoords(pointToMove);
        };
        const addPointOnClick = (event) => {
            let { target } = event;
            if (target && target.type === 'addPoint') {
                let { id, top, left } = target;
                controller.addPoint({ id, top, left });
            }
        };

        points.map((point, i) => {
            let firstPoint = points[i - 1] || points[points.length - 1];
            let secondPoint = points[i];
            let addPoint = createPoint(i);
            addPoint.set(calcPointCoords(firstPoint, secondPoint)).setCoords();
            canvas.add(addPoint);
        });
        model.point.on('added', addPoint);
        model.point.on('removed', removePoint);
        model.point.on('moving', updatePointsCoords);
        canvas.on({ 'mouse:down': addPointOnClick });
    }