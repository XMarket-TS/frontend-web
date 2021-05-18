<template>
  <JSCharting :options="options" class="simpleLine"></JSCharting>
</template>

<script>
import JSCharting from "jscharting-vue";
export default {
  components: {
    JSCharting,
  },
  props: ["options"],
  data: () => ({
    
  }),
 
};
</script>

<style>
</style>