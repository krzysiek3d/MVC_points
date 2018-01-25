export const incBtnModule = (param) => {
    let { step, scale, startScale, maxScale, $incBtn } = param,
    localScale = startScale,
        getZoom = (value) => {
            localScale = value;
        },
        incZoom = () => {
            let value = (localScale + step).toFixed(2) * 1;
            if (value <= maxScale) {
                scale.emit('changed', value);
            }
        };
    scale.on('changed', getZoom);
    $incBtn.on('click', incZoom);
}