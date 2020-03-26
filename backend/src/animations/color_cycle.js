import colorConvert from 'color-convert'
import Animation from './animation'
module.exports = class ColorCylce extends Animation{

    constructor(pixels, config) {
        super()
        let start = new Date()
        let hue = 0
        let saturation = 100
        let luminosity = 50
        super.start(() => {
            let rgb = colorConvert.hsl.rgb([hue, saturation, luminosity])
            pixels.fill(rgb[0], rgb[1], rgb[2])
            hue++
            if(hue > 360) {
                hue = 0
            }
        }, 100)
    }
}