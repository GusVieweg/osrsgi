<template>
  <v-app class="ma-0 pa-0" hide-details>
    <!-- You will eventually replace this with -->
    <!-- a component from the frontend/src -->
    <!-- directory. See                        -->
    <!-- frontend/src/apps/Whatever.vue      -->
    <!-- for an example.                       -->
    <p>This is my Vue app!</p>
    <v-sheet :color="color" elevation="1" height="100" width="100"></v-sheet>
    <v-autocomplete
      v-model="model"
      :items="items"
      :loading="isLoading"
      :search-input.sync="search"
      color="white"
      hide-no-data
      hide-selected
      item-text="name"
      item-value="id"
      label="OSRS Items"
      placeholder="Start typing to Search"
      prepend-icon="mdi-sword"
      return-object
    ></v-autocomplete>
  </v-app>
</template>
<script>
  export default {
    data: () => ({
      color: "#123456",
      model: "",
      isLoading: false,
      search: "",
      items: [],
      timer: null,
    }),
    methods: {
      debounce(func, timeout = 300) {
        return (...args) => {
          clearTimeout(this.timer);
          this.timer = setTimeout(() => {
            func.apply(this, args);
          }, timeout);
        };
      },
      lookupItem(val) {
        this.$http
          .post("djangoApp/item-lookup/", {
            search: val,
          })
          .then(res => {
            // const { count, entries } = res;
            // this.count = count;
            // this.entries = entries;
            this.items = res.data.items;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      },
    },
    computed: {
      // items() {
      //   // return this.entries.map(entry => {
      //   //   const Description =
      //   //     entry.Description.length > this.descriptionLimit
      //   //       ? entry.Description.slice(0, this.descriptionLimit) + "..."
      //   //       : entry.Description;
      //   //   return Object.assign({}, entry, { Description });
      //   // });
      //   return [];
      // },
    },

    watch: {
      search(val) {
        if (!val) return;
        // Items have already been loaded
        // if (this.items.length > 0) return;

        // Items have already been requested
        if (this.isLoading) return;

        this.isLoading = true;

        // Lazily load input items
        this.debounce(this.lookupItem(val), 500);
      },
    },
  };
</script>
