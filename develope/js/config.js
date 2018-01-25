const css = require('../scss/index.scss');
let $appId = $('.align-project').length ? $appId = $('.align-project') : console.error('PODAJ ID APLIKACJI'); // CACHED MAIN MODULE DIV CONTAINER

export const config = {
    $DOM: $appId,
    DOM_CANVAS: $appId.find('[data-canvas]'),
    COLORS: {
        red: '#c1001f',
        white: '#ffffff'
    },
    CANVAS_WIDTH: $appId.find('.align-project__body').width(), // CANVAS WIDTH
    CANVAS_HEIGHT: $appId.find('.align-project__body').height(), // CANVAS HEIGHT
    LOADED_LAYERS: /podloga|granice|meble|background|scianki_dzialowe|okna|cyfry|wymiary|skala|pomieszczenia/, // LAYERS TO LOAD
    HIDDEN_LAYERS: /_lo|okna|h140|h220|wymiary|pomieszczenia|granice/, // LAYERS TO HIDE ON START
    URLS: {
        SVG: $appId[0].dataset.file || console.error('PODAJ SCIEZKE DO PLIKU SVG'), // SVG URL TO LOAD
        ICONS: {
            grab: 'url(/assets/fit-project/grab.cur), auto',
            grabbing: 'url(/assets/fit-project/grabbing.cur), auto',
            zoomIn: 'url(/assets/fit-project/zoom_in.cur), auto',
            zoomOut: 'url(/assets/fit-project/zoom_out.cur), auto'
        }
    }
}