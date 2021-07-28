<template>
  <div id="app">
    <h1 class="title">Calendar</h1>
    <input type="text" disabled :value="date">
    <v-calendar
      :date="date"
      @set-new-date="setNewDate"
    />
  </div>
</template>

<script>
import Calendar from "./components/Calendar"

export default {
  name: 'App',
  components: {
    'v-calendar': Calendar
  },
  data() {
    return {
      date: '2021-07-28'
    }
  },
  methods: {
    setNewDate(year, month, day) {
      this.date = `${year}-${('0' + (month + 1)).slice(-2)}-${('0' + day).slice(-2)}`
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
