export const sliderModule = (param) => {
    let { step, scale, minScale, maxScale, $slider } = param;
    const updateSlider = (startScale) => {
        $slider[0].valueAsNumber = startScale;
    };

    // SET START ZOOM FOR SLIDER
    $slider[0].step = step;
    $slider[0].min = minScale;
    $slider[0].max = maxScale;

    scale.on('changed', updateSlider);
    scale.on('snapshotScale', updateSlider);

    $slider.on('touchstart mousedown', function() {
        scale.emit('prepareScale');
        $slider.on('touchmove mousemove', function(event) {
            scale.emit('snapshotScale', event.target.valueAsNumber);
        });
    });
    $slider.on('touchend mouseup', function(event) {
        scale.emit('changed', event.target.valueAsNumber);
        $slider.off('touchmove mousemove');
    });
}