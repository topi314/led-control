import colorConvert from 'color-convert'
import Animation from './animation'
module.exports = class Rainbow extends Animation{

    constructor(pixels, config) {
        super()
        let val = 360 / config.leds
        let saturation = 100
        let luminosity = 50
        let hue = val
        for (let i = 0; i < config.leds; i++) {
            pixels.setColor(i, colorConvert.hsl.rgb([hue, saturation, luminosity]))
            hue += val
        }
        pixels.update()
    }
}
