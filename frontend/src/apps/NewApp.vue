<template>
  <v-app class="ma-0 pa-0" hide-details>
    <!-- You will eventually replace this with -->
    <!-- a component from the frontend/src -->
    <!-- directory. See                        -->
    <!-- frontend/src/apps/Whatever.vue      -->
    <!-- for an example.                       -->
    <v-container>
      <v-text-field v-model="newCurrentUser"></v-text-field>
      <v-btn @click="setCurrentUser">Submit</v-btn>
      <h1>Want</h1>
      <v-row>
        <v-col cols="4">
          <p>{{ currentUser }}</p>
          <v-row>
            <v-col cols="12">
              <ItemInput type="wants" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <CurrentUserItemDisplay type="wants" />
            </v-col>
          </v-row>
        </v-col>
        <v-col v-for="otherMember in otherMembers" :key="otherMember" cols="4">
          <p>{{ otherMember }}</p>
          <ItemDisplay type="wants" :member="otherMember" />
        </v-col>
      </v-row>
      <h1>Have</h1>
      <v-row>
        <v-col cols="4">
          <p>{{ currentUser }}</p>
          <v-row>
            <v-col cols="12">
              <ItemInput type="haves" />
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12">
              <CurrentUserItemDisplay type="haves" />
            </v-col>
          </v-row>
        </v-col>
        <v-col v-for="otherMember in otherMembers" :key="otherMember" cols="4">
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
import CurrentUserItemDisplay from "@/components/CurrentUserItemDisplay.vue";

export default {
  data: () => ({
    newCurrentUser: ""
  }),
  computed: {
    otherMembers() {
      return this.$store.getters.otherMembers;
    },
    currentUser() {
      return this.$store.state.currentUser;
    }
  },
  async mounted() {
    let items = await this.$http.get(`/GIM/get/${this.currentUser}/`);
    this.$store.commit("setMembers", items.data.members);
    this.$store.commit("setItems", {
      wants: items.data.wants,
      haves: items.data.haves
    });
  },
  methods: {
    async setCurrentUser() {
      console.log(this.newCurrentUser);
      this.$store.commit("setCurrentUser", this.newCurrentUser);
      let items = await this.$http.get(`/GIM/get/${this.currentUser}/`);
      this.$store.commit("setMembers", items.data.members);
      this.$store.commit("setItems", {
        wants: items.data.wants,
        haves: items.data.haves
      });
    }
  },
  components: {
    CurrentUserItemDisplay,
    ItemInput,
    ItemDisplay
  }
};
</script>
