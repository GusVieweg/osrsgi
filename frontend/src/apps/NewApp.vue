<template>
  <v-app class="ma-0 pa-0" hide-details>
    <!-- You will eventually replace this with -->
    <!-- a component from the frontend/src -->
    <!-- directory. See                        -->
    <!-- frontend/src/apps/Whatever.vue      -->
    <!-- for an example.                       -->
    <p>This is my Vue app!</p>
    <v-sheet :color="color" elevation="1" height="100" width="100"></v-sheet>
  </v-app>
</template>
<script>
  export default {
    data: () => ({
      color: "#123456",
    }),
  };
</script>
