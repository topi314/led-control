/* Create new class ES6 Sstyle */
import Animation from "./animation"
module.exports = class Example extends Animation{

    constructor(pixels, config) {
        /* Call super contructor */
        super()

        /* Initalze some variables here */
        let r
        let g
        let b
        
        /* Executes run method each 1000ms */
        super.start(() => {
            r = Math.floor(Math.random() * 256)
            g = Math.floor(Math.random() * 256)
            b = Math.floor(Math.random() * 256)
            pixels.fill(r, g, b)
        }, 1000)
    }
}
