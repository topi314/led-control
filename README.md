# led-control

Change the color of your WS2801 LED Stripes via a webinterface

## Run Project
Install necessary packages node, npm, python3 & pip if needed
```
$ apt install node && npm && python3 && python3-pip && screen
```
### Run Frontend
Install node_modules
```
$ npm install
```
Change the host in [line 40](https://github.com/TopiSenpai/led-control/blob/1ad962def427a7839dab18e95aa8d5a5554c1299/src/components/LedControl.vue#L40) to your local host address

Build Project
```
$ npm run build
```
Install Static Webserver(serve) for Production Mode
```
$ npm install -g serve
```
Run Frontend in Production Mode on Port 80with screen
```
$ screen -S frontend serve -s dist -l 80
$ CTRL+A D
```

### Connect your WS2801 LED Stripe(4-Pin)
Connnect GND to a GND Pin
Connect V+ to 5V (External Power Adapter if possible DV510A)
Connect CI to GPIO Pin 10
Connect DI to GPIO Pin 09
According to this image(Raspberry Pi 3 Model B)
![Raspberry Pi 3 Model B GPIO Header](https://www.element14.com/community/docs/DOC-73950/l/raspberry-pi-3-model-b-gpio-40-pin-block-pinout)

### Run Backend
Run Python Backend(yes in Development Mode because I'm to stupid to set it up for Production Mode)
Install necessary packages
```
$ pip install -U flask-cors
$ pip install flask
$ pip install flask_restful
$ pip intsall adafruit-ws2801
```
Run app.py on default Port 5000 with screen
```
$ screen -S backend python app.py
$ CTRL+A D
```

Connect to your host defined earlier
You should see something like this:
![Webinterface](https://i.ibb.co/8zcPqLB/image.png)

## Have fun with it and feel free to make it better!
