<template>
  <div id="app">
    <h1 class="title">Calendar</h1>
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
      this.date = `${year}-${month + 1}-${day}`
      console.log(this.date)
    }
  }
}
</script>

<style>
* {
  box-sizing: border-box;
}
</style>
