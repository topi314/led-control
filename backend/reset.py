import RPi.GPIO as GPIO

import Adafruit_WS2801
import Adafruit_GPIO.SPI as SPI

LED_COUNT = 90
SPI_PORT = 0
SPI_DEVICE = 0
pixels = Adafruit_WS2801.WS2801Pixels(LED_COUNT, spi=SPI.SpiDev(SPI_PORT, SPI_DEVICE), gpio=GPIO)

pixels.clear()
pixels.show()

