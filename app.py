import RPi.GPIO as GPIO

import Adafruit_WS2801
import Adafruit_GPIO.SPI as SPI

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

def set_pixels(r, g, b):
    for i in range(pixels.count()):
        pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(r, g, b))

    pixels.show()


def set_pixel(i, r, g, b):
    pixels.set_pixel(i, Adafruit_WS2801.RGB_to_color(r, g, b))
    pixels.show()


class Info(Resource):

    def get(self):
        return "{leds: " + str(LED_COUNT) + "}", 200


class LED(Resource):

    def post(self, i, r, g, b):
        set_pixel(i, r, g, b)
        return 200


class LEDS(Resource):

    def post(self, r, g, b):
        set_pixels(r, g, b)
        return 200


api.add_resource(Info, "/api/info")
api.add_resource(LEDS, "/colors/<int:r>/<int:g>/<int:b>")
api.add_resource(LED, "/color/<int:i>/<int:r>/<int:g>/<int:b>")

app.run(host='0.0.0.0', debug=True)
