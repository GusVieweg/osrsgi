<template>
  <v-app class="ma-0 pa-0" hide-details>
    <!-- You will eventually replace this with -->
    <!-- a component from the frontend/src -->
    <!-- directory. See                        -->
    <!-- frontend/src/apps/Whatever.vue      -->
    <!-- for an example.                       -->
    <v-container>
      <h1>Want</h1>
      <v-row>
        <v-col cols="4">
          <p>Iron Flogan</p>
          <v-row v-for="count in wantCount" :key="count">
            <v-col cols="12">
              <ItemCard />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-center" cols="12">
              <v-btn elevation="2" small fab dark color="green" @click="wantCount += 1">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <p>Iron Bebop</p>
          <ItemCard />
        </v-col>
        <v-col cols="4">
          <p>KindOfSpooky</p>
          <ItemCard />
        </v-col>
      </v-row>
      <h1>Got</h1>
      <v-row>
        <v-col cols="4">
          <p>Iron Flogan</p>
          <v-row v-for="count in gotCount" :key="count">
            <v-col cols="12">
              <ItemCard />
            </v-col>
          </v-row>
          <v-row>
            <v-col class="d-flex justify-center" cols="12">
              <v-btn elevation="2" small fab dark color="green" @click="gotCount += 1">
                <v-icon>mdi-plus</v-icon>
              </v-btn>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="4">
          <p>Iron Bebop</p>
          <ItemCard />
        </v-col>
        <v-col cols="4">
          <p>KindOfSpooky</p>
          <ItemCard />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
  import ItemCard from "@/components/ItemCard.vue";

  export default {
    data: () => ({
      wantCount: 1,
      gotCount: 1,
    }),
    methods: {},
    components: {
      ItemCard,
    },
  };
</script>
