<template>
  <div id="app">
    <h1 class="title">Calendar</h1>
    <v-calendar/>
  </div>
</template>

<script>
import Calendar from "./components/Calendar"

export default {
  name: 'App',
  components: {
    'v-calendar': Calendar
  }
}
</script>

<style>

</style>
