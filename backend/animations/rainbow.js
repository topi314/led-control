import pixels from 'rpi-ws2801'
import colorConvert from 'color-convert'
import config from '../config'

/* Init things */
pixels.connect(config.leds)
let hue = 0
let saturation = 100
let luminosity = 50
setInterval(run, 50)

/* Run Method (Maybe setTimeout is better?) */
function run() {
    let rgb = colorConvert.hsl.rgb([hue, saturation, luminosity])
    pixels.fill(rgb[0], rgb[1], rgb[2], )
    hue++
    if(hue > 360) {
        hue = 0
    }
}
