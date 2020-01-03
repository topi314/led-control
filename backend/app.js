import express from 'express'
import cors from 'cors'
import colorConvert from 'color-convert'
import bodyParser from 'body-parser'
import pixels from 'rpi-ws2801'

const app = express()
const port = 5000
const leds = 90
let lastColor = {
    hue: 100,
    luminosity: 50,
    saturation: 100
}
let state = false


pixels.connect(leds)
pixels.clear();
pixels.update()

app.use(cors())
app.use(bodyParser.json())

/* Endpoints */
app.get('/api/info', (req, res) => {
    let data = {
        status: 200,
        color: lastColor,
        state: state,
        count: leds
    }
    res.send(JSON.stringify(data))
})

app.post('/api/pixels', (req, res) => {
    lastColor = req.body.color
    state = true
    let rgb = toRGB(req.body.color)
    console.log(`filling pixels with color [${rgb.r}, ${rgb.g}, ${rgb.b}]...`)
    pixels.fill(rgb.r, rgb.g, rgb.b)
    res.send()
})

app.get('/api/pixel', (req, res) => {
    state = true
    let pixel = req.body.pixel
    let rgb = toRGB(req.body.color)
    console.log(`filling pixel '${pixel + 1}' with color [${rgb.r}, ${rgb.g}, ${rgb.b}]...`)
    pixels.setColor(pixel, [rgb.r, rgb.g, rgb.b])
    res.send()
})

app.get('/api/state', (req, res) => {
    state = req.body.state
    if(state) {
        console.log(`turning pixels on`)
        let rgb = toRGB(req.body.color)
        pixels.fill(rgb.r, rgb.g, rgb.b)
    }
    else {
        console.log(`turning pixels off`)
        pixels.clear()
        pixels.update()
    }
    res.send()
})

function toRGB(color) {
    let raw = colorConvert.hsl.rgb(
        color.hue,
        color.saturation,
        color.luminosity
    )
    return { r: raw[0], g: raw[1], b: raw[2]}
}

app.listen(port, () => {
    console.log(`app listening on port ${port}...`)
})
