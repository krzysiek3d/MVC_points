import { Subject, calcDistance } from '../utils';
import { pointsView } from './pointsView';
import { addPointsView } from './addPointsView';
import { outerLinesView } from './outerLinesView';
import { removePointsView } from './removePointsView';
export const planeModule = (props) => {
    let { canvas } = props;
    /* ======= Model ======= */
    /**
     * The Model. Model stores items and notifies
     * observers about changes.
     */
    let model = {
        MAX_POINTS: 100,
        MIN_POINTS: 4,
        point: new Subject(),
        points: [],
        init() {
            model.point.on('added', this.sortPoints);
            model.point.on('removed', this.sortPoints);
            model.point.on('moving', this.updatePointCoords);
            controller.addPoint({ id: 0, top: 100, left: 100 });
            controller.addPoint({ id: 1, top: 100, left: 800 });
            controller.addPoint({ id: 2, top: 800, left: 800 });
            controller.addPoint({ id: 3, top: 800, left: 100 });
        },
        sortPoints() {
            for (let i = 0; model.points.length > i; i++) {
                model.points[i].id = i;
            }
            console.log('MODEL sorted...', model.points);
        },
        updatePointCoords(point) {
            model.points[point.id] = point;
        }
    };
    /* ======= Controller ======= */
    /**
     * The Controller. Controller responds to user actions and
     * invokes changes on the model.
     */
    const controller = {
        init() {
            model.init();
            outerLinesView({ canvas, model, controller });
            // removePointsView({ canvas, model, controller });
            addPointsView({ canvas, model, controller });
            pointsView({ canvas, model, controller });
        },
        getPoints() {
            return model.points;
        },
        addPoint(point) {
            if (model.points.length < model.MAX_POINTS) {
                model.points.splice(point.id, 0, point);
                model.point.emit('added', point);
            }
        },
        removePoint(index) {
            if (model.points.length > model.MIN_POINTS) {
                model.points.splice(index, 1);
                model.point.emit('removed', index);
            }
        },
        updatePointCoords(point) {
            model.point.emit('moving', point);
        }
    };
    window.controller = controller;
    window.ctx = canvas;
    controller.init();
}