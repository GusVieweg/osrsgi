<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="8">
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
            return-object
          ></v-autocomplete>
        </v-col>
        <v-col cols="4">
          <v-text-field label="Regular"></v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-btn block dark color="green">Save</v-btn>
        </v-col>
        <v-col cols="4">
          <v-btn block dark color="red">Delete</v-btn>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
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
            this.items = res.data.items;
          })
          .catch(err => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      },
    },
    computed: {},
    watch: {
      search(val) {
        if (!val) return;
        if (this.isLoading) return;
        if (val == this.model.name) return;

        this.isLoading = true;

        this.debounce(this.lookupItem(val), 500);
      },
    },
  };
</script>
