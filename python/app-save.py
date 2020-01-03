import RPi.GPIO as GPIO

import Adafruit_WS2801
import Adafruit_GPIO.SPI as SPI

import json

from flask import Flask
from flask_cors import CORS

LED_COUNT = 90
SPI_PORT = 0
SPI_DEVICE = 0
lastR = 255
lastG = 255
lastB = 0
on = False

pixels = Adafruit_WS2801.WS2801Pixels(LED_COUNT, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE), gpio=GPIO)
app = Flask(__name__)
CORS(app)

pixels.clear()
pixels.show()

def set_pixels(r, g, b):
    global on
    global lastR
    global lastG
    global lastB
    on = True
    lastR = r
    lastG = g
    lastB = b
    for i in range(pixels.count()):
        pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(r, g, b))

    pixels.show()

def set_pixel(i, r, g, b):
    global on
    global pixels
    on = True
    pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(r, g, b))
    pixels.show()

def state(state):
    global on
    if state:
        set_pixels(lastR, lastG, lastB)
    else:
        on = False
        pixels.clear()
        pixels.show()


@app.route("/info", methods=['GET', 'POST'])
def info():
    data = {}
    data['count'] = LED_COUNT
    data['on'] = on
    data['r'] = lastR
    data['g'] = lastG
    data['b'] = lastB
    return json.dumps(data), 200

@app.route("/pixel/<int:i>/<int:r>/<int:g>/<int:b>", methods=['GET', 'POST'])
def pixel(i, r, g, b):
    set_pixel(i, r, g, b)
    return "ok", 200

@app.route("/pixels/<int:r>/<int:g>/<int:b>", methods=['GET', 'POST'])
def pixels(r, g, b):
    set_pixels(r, g, b)
    return "ok", 200

@app.route("/state/<state>", methods=['GET', 'POST'])
def state(state):
    if state == "on":
        state(True)
    else:
        state(False)
    return "ok", 200

if __name__ == "__main__":
    app.run(host='0.0.0.0', debug=True)
