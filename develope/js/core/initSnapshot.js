import { createSnapshot } from '../utils';
export const initSnapshot = (param) => {
    const { project, layers, app } = param;
    createSnapshot(project, (img) => {
        let snapshot = img;
        app.emit('snapshotReady', { project, layers, snapshot });
    });
}