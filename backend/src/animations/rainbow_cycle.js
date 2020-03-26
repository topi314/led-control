import colorConvert from 'color-convert'
import Animation from './animation'
module.exports = class RainbowCycle extends Animation{

    constructor(pixels, config) {
        super()
        let val = 360 / config.leds
        let hue = 0
        let saturation = 100
        let luminosity = 50
        super.start(() => {
            hue = val
            for (let i = 0; i < config.leds; i++) {
                pixels.setColor(i, colorConvert.hsl.rgb([hue, saturation, luminosity]))
                hue += val
            }
            pixels.update()
        }, 100)
    }
}
