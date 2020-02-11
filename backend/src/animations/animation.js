/* Import ws2801 library and our config file */
import pixels from 'rpi-ws2801'
import config from '../../config'

/********************************
 * Make Connection to LED-Stripe 
 * Initalze Variables here
 ********************************/
pixels.connect(config.leds)
let r = 0
let g = 0
let b = 0

/* Execute run Method each 1000ms */
setInterval(run, 1000)

/* Run Method (executed each frame) */
function run() {
    r = Math.floor(Math.random() * 256)
    g = Math.floor(Math.random() * 256)
    b = Math.floor(Math.random() * 256)
    pixels.fill(r, g, b)
}