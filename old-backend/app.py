import RPi.GPIO as GPIO

import Adafruit_WS2801
import Adafruit_GPIO.SPI as SPI

import json

from flask import Flask, jsonify
from flask_restful import Api, Resource, reqparse, request
from flask_cors import CORS

LED_COUNT = 90
SPI_PORT = 0
SPI_DEVICE = 0
pixels = Adafruit_WS2801.WS2801Pixels(LED_COUNT, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE), gpio=GPIO)

pixels.clear()
pixels.show()

app = Flask(__name__)
api = Api(app)
CORS(app)

save

lastR = 255
lastG = 255
lastB = 0
on = False


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


class Info(Resource):

    def get(self):
        data = {}
        data['count'] = LED_COUNT
        data['on'] = on
        data['r'] = lastR
        data['g'] = lastG
        data['b'] = lastB
        return json.dumps(data), 200


class Pixels(Resource):

    def post(self, r, g, b):
        set_pixels(r, g, b)
        return "ok", 200


class Pixel(Resource):

    def post(self, i, r, g, b):
        set_pixel(i, r, g, b)
        return "ok", 200


class State(Resource):

    def post(self, state):
        if state == "on":
            state(True)
        else:
            state(False)
        return "ok", 200

api.add_resource(Info, "/info")
api.add_resource(Pixels, "/pixels/<int:r>/<int:g>/<int:b>")
api.add_resource(Pixel, "/pixel/<int:i>/<int:r>/<int:g>/<int:b>")
api.add_resource(State, "/state/<state>")
app.run(host='0.0.0.0', debug=True)

class RainBowEffect:

    def __init__(self):


    def run():
        
