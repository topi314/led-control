<template>
  <div class="led-control">
    <color-picker class="led-control-picker" v-bind="color" variant="persistent" :mouse-scroll="true" @input="onColorChange" @change="setColor"></color-picker>
    <div class="led-control-sliders">
      <h2>Saturation</h2>
      <vue-slider v-model="color.saturation" :interval="10" @change="onSaturationChange"></vue-slider>
      <h2>Luminosity</h2>
      <vue-slider v-model="color.luminosity" :interval="10" @change="onLuminosityChange"></vue-slider>
    </div>
  </div>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker'
import Convert from 'color-convert'
import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/default.css'

export default {
  name: 'led-control',

  components: {
    ColorPicker,
    VueSlider
  },

  data () {
    return {
      color: {
        hue: 50,
        saturation: 100,
        luminosity: 50
      }
    }
  },

  methods: {
    setColor () {
      let rgb = Convert.hsl.rgb([this.color.hue, this.color.saturation, this.color.luminosity])
      this.$http.post(`http://192.168.178.37:5000/colors/${rgb[0]}/${rgb[1]}/${rgb[2]}`)
    },
    onSaturationChange (saturation) {
      this.color.saturation = saturation
      this.setColor()
    },

    onLuminosityChange (luminosity) {
      this.color.luminosity = luminosity
      this.setColor()
    },
    onColorChange (hue) {
      if (hue === this.color.hue || Math.abs(this.color.hue - hue) < 5) {
        return
      }
      this.color.hue = hue
      this.setColor()
    }
  }
}
</script>

<style scoped>
@import '~@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css';

/deep/ .rcp__palette:before {
  background-color: #2c3e50;
}
.led-control-picker {
  margin: auto;
  margin-top: 30px;
}
.led-control-sliders {
  width: 80%;
  margin: auto;
  margin-top: 10px;
}
</style>
