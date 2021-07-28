<template>
  <div id="app">
    <h1 class="title">Calendar</h1>
    <button
      v-if="currentLocale === 'ru'"
      @click="toggleLocale"
      class="button-change-locale"
    >
      En
    </button>
    <button
      v-if="currentLocale === 'en'"
      @click="toggleLocale"
      class="button-change-locale"
    >
      Ru
    </button>
    <input type="text" disabled :value="date">
    <v-calendar
      :date="date"
      :config="config"
      @set-new-date="setNewDate"
    />
  </div>
</template>

<script>
import Calendar from "./components/Calendar"
import Ru from "./locale-configs/ru"
import En from "./locale-configs/en"

export default {
  name: 'App',
  components: {
    'v-calendar': Calendar
  },
  data() {
    return {
      date: '2021-07-28',
      currentLocale: 'ru'
    }
  },
  computed: {
    config() {
      return this.currentLocale === 'en' ? En : Ru
    }
  },
  methods: {
    setNewDate(year, month, day) {
      this.date = `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`
    },
    toggleLocale() {
      this.currentLocale = this.currentLocale === 'en' ? 'ru' : 'en'
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
