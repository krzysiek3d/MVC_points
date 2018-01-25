    /* ======= removePointsView ======= */
    /**
     * The View. View presents the model and provides
     * the UI events. The controller is attached to these
     * events to handle the user interraction.
     */
    export const removePointsView = (props) => {
        let { canvas, model, controller } = props;
        let points = controller.getPoints();

        const createPoint = (id) => {
            let circle = new fabric.Circle({
                strokeWidth: 5,
                radius: 12,
                fill: 'red',
                stroke: '#666'
            });
            let point = new fabric.Group([circle], {
                id,
                width: 42,
                height: 100,
                type: 'removePoint',
                // lockMovementY: true,
                // lockMovementX: true,
                // hasControls: false,
                originY: 'bottom',
                originX: 'center',
                hoverCursor: 'pointer'
            });
            return point;
        };
        const calcPointCoords = (p1, p0, p2) => {
            // p1 prev point, p0 is center, p2 next point
            let { top, left } = p0;
            let vector1 = { top: (p0.top - p1.top), left: (p0.left - p1.left) };
            let vector2 = { top: (p0.top - p2.top), left: (p0.left - p2.left) };
            let angle = Math.atan2(vector1.top, vector1.left) - Math.atan2(vector2.top, vector2.left);
            angle < 0 ? angle += 2 * Math.PI : 0;
            angle = angle * (180 / Math.PI);

            console.log('angle: ', angle);

            return { top, left, angle };
        };
        const updatePointsCoords = (point) => {
            let { id } = point;
            let points = controller.getPoints();
            let firstPoint = points[id - 1] || points[points.length - 1];
            let middlePoint = point;
            let lastPoint = points[id + 1] || points[0];
            let removePoint = canvas.getObjects('removePoint')[id];

            removePoint.set(calcPointCoords(firstPoint, middlePoint, lastPoint)).setCoords();
            // nextRemovePoint.set(calcPointCoords(middlePoint, lastPoint)).setCoords();

        };
        const addPoint = (point) => {
            let { id } = point;
            let newAddPoint = createPoint(id);
            let zIndex = canvas._objects.map((obj) => { if (obj.type === 'removePoint') { return obj.id; } }).indexOf(id);

            canvas.insertAt(newAddPoint, zIndex);

            // increments indexes of rest points
            for (let i = (zIndex + 1); canvas._objects.length > i; i++) {
                let obj = canvas._objects[i];
                if (obj.type === 'removePoint') {
                    obj.id++;
                }
            }
            updatePointsCoords(point);
        };
        const removePoint = (id) => {
            let addPoints = canvas.getObjects('removePoint');
            let pointToRemove = addPoints[id];
            let pointToMove = controller.getPoints()[id];
            let zIndex = canvas._objects.map((obj) => { if (obj.type === 'removePoint') { return obj.id; } }).indexOf(id);

            canvas.remove(pointToRemove);
            // decrements indexes of rest points
            for (let i = zIndex; canvas._objects.length > i; i++) {
                let obj = canvas._objects[i];
                if (obj.type === 'removePoint') {
                    obj.id--;
                }
            }
            updatePointsCoords(pointToMove);
        };
        const addPointOnClick = (event) => {
            let { target } = event;
            if (target && target.type === 'removePoint') {
                let { id, top, left } = target;
                controller.addPoint({ id, top, left });
            }
        };

        points.map((point, i, points) => {
            let firstPoint = points[i - 1] || points[points.length - 1];
            let middlePoint = point;
            let lastPont = points[i + 1] || points[0];
            let addPoint = createPoint(i);
            addPoint.set(calcPointCoords(firstPoint, middlePoint, lastPont)).setCoords();
            canvas.add(addPoint);
        });
        // model.point.on('added', addPoint);
        // model.point.on('removed', removePoint);
        model.point.on('moving', updatePointsCoords);
        // canvas.on({ 'mouse:down': addPointOnClick });
    }