<template>
  <div class="led-control">
    <color-picker
      class="led-control-picker"
      v-bind="color"
      variant="persistent"
      :mouse-scroll="true"
      :step="10"
      @input="onColorChange"
      @change="setColor"
    />
    <div class="led-control-sliders">
      <h2>Sättigung</h2>
      <ui-slider v-model="color.saturation" :interval="10" :step="5" :snapToSteps="true" :showMarker="true" @change="onSaturationChange" />
      <h2>Helligkeit</h2>
      <ui-slider v-model="color.luminosity" :interval="10" :step="5" :snapToSteps="true" :showMarker="true" @change="onLuminosityChange" />
      <h2>An/Aus</h2>
      <ui-switch v-model="on" @change="onStateChange" />
    </div>
    <div class="led-control-animation">
      <ui-select v-model="animation" :options="animations" @input="onAnimationChange" />
    </div>
  </div>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker'
import { UiSwitch, UiSlider, UiSelect } from 'keen-ui'
import 'keen-ui/dist/keen-ui.css'
import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css'

// const host = 'http://light:5000'
const host = 'http://192.168.178.37:5000/api'

export default {
  name: 'led-control',

  components: {
    ColorPicker,
    UiSwitch,
    UiSlider,
    UiSelect
  },

  data () {
    return {
      animation: '',
      animations: [],
      on: true,
      color: {
        hue: 50,
        saturation: 100,
        luminosity: 50
      }
    }
  },

  mounted () {
    this.$http.get(`${host}/info`)
      .then(rawResult => {
        let result = JSON.parse(rawResult.bodyText)
        this.color = result.color
        this.animations = result.animations
      })
  },

  methods: {
    setAnimation () {
      this.$http.post(`${host}/animation`, { animation: this.animation })
    },
    setColor () {
      this.$http.post(`${host}/pixels`, { color: this.color })
    },
    setPixelColor (pixel, rgb) {
      this.$http.post(`${host}/pixels`, { pixel: pixel, color: this.color })
    },
    setState (value) {
      this.$http.post(`${host}/state`, { state: value })
    },

    onAnimationChange (animation) {
      this.animation = animation
      this.setAnimation()
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
      this.color.hue = hue
      this.setColor()
    },
    onStateChange (state) {
      this.setState(state)
    }
  }
}
</script>

<style lang="less" scoped>

/deep/.rcp__palette:before {
  background-color: #2c3e50;
}
/deep/ .ui-switch {
  display: inline-flex;
  align-self: center;
  width: fit-content;
}
.led-control{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  &-picker {
    margin-top: 30px;
  }
  &-sliders {
    width: 80%;
    margin-top: 10px;
  }
  &-animation {
    width: 80%;
    margin-top: 10px;
  }
}
</style>
