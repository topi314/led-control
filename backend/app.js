import express from 'express'
import cors from 'cors'
import fs from 'fs'
import path from 'path'
import colorConvert from 'color-convert'
import bodyParser from 'body-parser'
import pixels from 'rpi-ws2801'
import { spawn } from 'child_process'
import config from './config'


/* Just some Variables we need */
const app = express()
const animationFolder = path.join(__dirname, 'animations')
const animations = []

let lastColor = {
    hue: 100,
    luminosity: 50,
    saturation: 100
}
let state = false


/* Setup Everything */
reset()
init()
app.use(cors())
app.use(bodyParser.json())
process.on('SIGTERM', shutdown)
process.on('SIGINT', shutdown)


/* Endpoints */
app.get('/api/info', (req, res) => {
    log('info request')
    let data = {
        color: lastColor,
        state: state,
        count: config.leds,
        animations: animations
    }
    res.send(JSON.stringify(data))
})

app.post('/api/animation', (req, res) => {
    let animation = req.body.animation
    log(animation)
})

app.post('/api/pixels', (req, res) => {
    lastColor = req.body.color
    state = true
    let rgb = toRGB(req.body.color)
    log(`filling pixels with color [${rgb.r}, ${rgb.g}, ${rgb.b}]...`)
    pixels.fill(rgb.r, rgb.g, rgb.b)
    res.send()
})

app.post('/api/pixel', (req, res) => {
    state = true
    let pixel = req.body.pixel
    let rgb = toRGB(req.body.color)
    log(`filling pixel '${pixel + 1}' with color [${rgb.r}, ${rgb.g}, ${rgb.b}]...`)
    pixels.setColor(pixel, [rgb.r, rgb.g, rgb.b])
    res.send()
})

app.post('/api/state', (req, res) => {
    state = req.body.state
    if(state) {
        log(`turning pixels on`)
        let rgb = toRGB(lastColor)
        pixels.fill(rgb.r, rgb.g, rgb.b)
    }
    else {
        log(`turning pixels off`)
        pixels.clear()
        pixels.update()
    }
    res.send()
})


/* Start Express Server */
const server = app.listen(config.port, () => {
    log(`app listening on port ${config.port}...`)
})


/* Some Functions */
function toRGB(color) {
    let raw = colorConvert.hsl.rgb([
        color.hue,
        color.saturation,
        color.luminosity
    ])
    return { r: raw[0], g: raw[1], b: raw[2]}
}

function log(msg) {
    let now = new Date()

    let hours = intToStr(now.getHours())
    let minutes = intToStr(now.getMinutes())
    let seconds = intToStr(now.getSeconds())
    let date = `[${hours}:${minutes}:${seconds}]`
    console.log(`${date} ${msg}`)
}

function intToStr(value) {
    value++
    return value  > 9 ? `${value}` : `0${value}`
}

function init() {
    try {
        fs.statSync(animationFolder)
    }
    catch(err) {
        if(err.code === 'ENOENT') {
            fs.mkdirSync(animationFolder)
        }
    }
    console.log('searching for animations...')
    fs.readdirSync(animationFolder).forEach(
        (file) => {
            if(file.includes('.js')) {
                console.log(file)
                animations.push(file)
            }
        }
    )
    pixels.connect(config.leds)
}

function shutdown() {
    log('shutting down...')
    server.close()
    reset()
    pixels.disconnect()
}

function reset() {
    spawn('python', ['./reset.py'])
}

