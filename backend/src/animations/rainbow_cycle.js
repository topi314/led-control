import colorConvert from 'color-convert'
import Animation from './animation'
module.exports = class RainbowCycle extends Animation{

    constructor(pixels, config) {
        super()
        let val = 360 / config.leds
        let index = 0
        let hue = 0
        let saturation = 100
        let luminosity = 50
        super.start(() => {
            hue = val * index
            for (let i = 0; i < config.leds; i++) {
                pixels.setColor(i, colorConvert.hsl.rgb([hue, saturation, luminosity]))
                hue += val
                if(hue > 360) {
		    hue = 0
		}
            }
            index++
            if(index > config.leds) {
		index = 0
	    }
	    pixels.update()
        }, 100)
    }
}
