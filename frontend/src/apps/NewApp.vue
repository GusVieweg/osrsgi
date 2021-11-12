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
          <v-row>
            <v-col cols="12">
              <ItemInput type="wants" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ItemDisplay type="wants" member="self" />
            </v-col>
          </v-row>
        </v-col>
        <v-col v-for="otherMember in otherMembers" :key="otherMember" cols="2">
          <p>{{ otherMember }}</p>
          <ItemDisplay type="wants" :member="otherMember" />
        </v-col>
      </v-row>
      <h1>Have</h1>
      <v-row>
        <v-col cols="4">
          <p>Iron Flogan</p>
          <v-row>
            <v-col cols="12">
              <ItemInput type="haves" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <ItemDisplay type="haves" member="self" />
            </v-col>
          </v-row>
        </v-col>
        <v-col v-for="otherMember in otherMembers" :key="otherMember" cols="2">
          <p>{{ otherMember }}</p>
          <ItemDisplay type="haves" :member="otherMember" />
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>
<script>
import ItemInput from "@/components/ItemInput.vue";
import ItemDisplay from "@/components/ItemDisplay.vue";

export default {
  data: () => ({
    wantCount: 1,
    gotCount: 1
  }),
  computed: {
    otherMembers() {
      console.log(this.$store.getters.otherMembers);
      return this.$store.getters.otherMembers;
    }
  },
  async mounted() {
    let items = await this.$http.get("/GIM/get/");
    console.log(items.data);
    this.$store.commit("setItems", {
      wants: items.data.wants,
      haves: items.data.haves
    });
  },
  components: {
    ItemInput,
    ItemDisplay
  }
};
</script>
