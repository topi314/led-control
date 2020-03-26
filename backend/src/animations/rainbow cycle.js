import colorConvert from 'color-convert'
import Animation from './animation'
module.exports = class RainbowCycle extends Animation{

    constructor(pixels, config) {
        super()
        let val = 360 / config.pixels
        let hue = 0
        let saturation = 100
        let luminosity = 50
        super.start(() => {
            hue = val
            for (let i = 0; i < config.pixels; i++) {
                let rgb = colorConvert.hsl.rgb([hue, saturation, luminosity])
                pixels.setColor(i, rgb)
                hue += val
            }
        }, 100)
    }
}
