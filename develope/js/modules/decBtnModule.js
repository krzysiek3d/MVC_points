export const decBtnModule = (param) => {
    let { step, scale, startScale, minScale, $decBtn } = param,
    localScale = startScale,
        getZoom = (data) => {
            localScale = data;
        },
        decZoom = () => {
            let value = (localScale - step).toFixed(2) * 1;
            if (value >= minScale) {
                scale.emit('changed', value);
            }
        };
    scale.on('changed', getZoom);
    $decBtn.on('click', decZoom);
}