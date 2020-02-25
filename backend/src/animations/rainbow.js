import colorConvert from 'color-convert'
import Animation from './animation'
module.exports = class Example extends Animation{

    constructor(pixels, config) {
        super()
        
        super.start(() => {
            let rgb = colorConvert.hsl.rgb([hue, saturation, luminosity])
            pixels.fill(rgb[0], rgb[1], rgb[2], )
            hue++
            if(hue > 360) {
                hue = 0
            }
        }, 1250)
    }
}
