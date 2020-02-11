<template>
  <div class="led-control">
    <color-picker
      class="led-control-picker"
      :class="{ state: !state}"
      v-bind="color"
      variant="persistent"
      :mouse-scroll="true"
      :step="10"
      @input="onColorChange"
      @change="onStateChange"
    />
    <div class="led-control-sliders">
      <div class="led-control-sliders-container">
        <h2>Sättigung</h2>
        <ui-slider v-model="color.saturation" :interval="10" :step="5" :snapToSteps="true" @change="onSaturationChange" />
      </div>
      <div class="led-control-sliders-container">
        <h2>Helligkeit</h2>
        <ui-slider v-model="color.luminosity" :interval="10" :step="5" :snapToSteps="true" @change="onLuminosityChange" />
      </div>
    </div>
    <div class="led-control-animation">
      <multiselect v-model="animation" :options="animations" :searchable="false" @input="onAnimationChange" />
    </div>
  </div>
</template>

<script>
import ColorPicker from '@radial-color-picker/vue-color-picker'
import { UiSlider } from 'keen-ui'
import Multiselect from 'vue-multiselect'
import 'keen-ui/dist/keen-ui.css'
import 'vue-multiselect/dist/vue-multiselect.min.css'
import '@radial-color-picker/vue-color-picker/dist/vue-color-picker.min.css'

// const host = 'http://light:5000'
const host = 'http://192.168.178.37:5000/api'

export default {
  name: 'led-control',

  components: {
    ColorPicker,
    UiSlider,
    Multiselect
  },

  data () {
    return {
      ready: false,
      animation: '',
      animations: [],
      state: true,
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
        this.state = result.state
        this.$nextTick(() => {
          this.ready = true
        })
      })
  },

  methods: {
    setAnimation () {
      this.$http.post(`${host}/animation`, { animation: this.animation })
    },
    setColor () {
      this.$http.post(`${host}/pixels`, { color: this.color })
      this.state = !this.state
    },
    setPixelColor (pixel, rgb) {
      this.$http.post(`${host}/pixels`, { pixel: pixel, color: this.color })
      this.state = !this.state
    },
    setState () {
      this.$http.post(`${host}/state`, { state: this.state })
    },

    onAnimationChange (animation) {
      this.animation = animation
      if (this.ready) {
        this.setAnimation()
      }
    },
    onSaturationChange (saturation) {
      this.color.saturation = saturation
      if (this.ready) {
        this.setColor()
      }
    },
    onLuminosityChange (luminosity) {
      this.color.luminosity = luminosity
      if (this.ready) {
        this.setColor()
      }
    },
    onColorChange (hue) {
      this.color.hue = hue
      if (this.ready) {
        this.setColor()
      }
    },
    onStateChange () {
      this.state = !this.state
      if (this.ready) {
        this.setState()
      }
    }
  }
}
</script>

<style lang="less" scoped>

/deep/ .multiselect__tags {
  background-color: transparent;
}

/deep/ .multiselect__single {
  background-color: transparent;
  color: white;
}

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
    margin-top: 10px;
    &.state /deep/ .rcp__well{
      background-color: #2c3e50!important;
    }
  }
  &-sliders {
    display: flex;
    flex-direction: column;
    margin-top: 5px;
    width: 80%;
    &-container {
      display: flex;
      width: 100%;
      & .ui-slider {
        margin-left: 12px;
        flex-grow: 1;
      }
    }
  }
  &-animation {
    width: 80%;
    margin-top: 10px;
  }
}
</style>
