export const loadObjectsFromSvg = (param, callback) => {
    let { url, layersToLoad } = param;
    fabric.loadSVGFromURL(url, groupSVGObjects);

    function groupSVGObjects(objects, options) {
        let svgLayers = [],
            layers = {},
            groupSVGArrays = (array) => {
                let id = array.id;
                // check if array id matches from config list
                if (id.match(layersToLoad)) {
                    // if table dont exists - create new one
                    if (svgLayers[id] === undefined) {
                        svgLayers[id] = [];
                    }
                    // add next svg arrays to existing table id
                    svgLayers[id].push(array);
                    // convert svg arrays to fabric.js object and to array layers
                    layers[id] = fabric.util.groupSVGElements(svgLayers[id], options);
                }
            };
        objects.map(groupSVGArrays);

        let group = [],
            project;
        // add objects to array to add later to canvas group
        for (let key in layers) {
            if (layers.hasOwnProperty(key)) {
                group.push(layers[key]);
            }
        }
        project = new fabric.Group(group);
        callback(project, layers);
    }
}