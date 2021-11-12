<template>
  <v-card>
    <v-card-text>
      <v-row>
        <v-col cols="9">
          <v-autocomplete
            v-model="model"
            :items="items"
            :loading="isLoading"
            :search-input.sync="search"
            light
            item-text="name"
            item-value="id"
            label="OSRS Items"
            placeholder="Start typing to Search"
            return-object
            chips
            @change="itemSelected()"
          >
            <template v-slot:selection="data">
              <v-chip v-bind="data.attrs">
                <v-avatar left>
                  <v-img :src="data.item.icon_url"></v-img>
                </v-avatar>
                {{ data.item.name }}
              </v-chip>
            </template>
            <template v-slot:item="data">
              <template>
                <v-list-item-avatar>
                  <img :src="data.item.icon_url" />
                </v-list-item-avatar>
                <v-list-item-content>
                  <v-list-item-title
                    v-html="data.item.name"
                  ></v-list-item-title>
                </v-list-item-content>
              </template>
            </template>
          </v-autocomplete>
        </v-col>
        <v-col cols="3">
          <v-text-field
            v-model="quantity"
            height="42px"
            label="Quantity"
          ></v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-btn color="primary" text @click="submit">Submit</v-btn>
    </v-card-actions>
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
    quantity: 0
  }),
  props: ["type"],
  methods: {
    itemSelected() {
      this.search = "";
      document.activeElement.blur();
    },
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
        .post("/GIM/item-lookup/", {
          search: val
        })
        .then(res => {
          this.items = res.data.items;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => (this.isLoading = false));
    },
    submit() {
      let action = "";
      if (this.type == "wants") {
        action = "ADD_WANT";
      } else {
        action = "ADD_HAVE";
      }
      this.$store.dispatch(action, {
        item_id: this.model.id,
        quantity: this.quantity,
        icon_url: this.model.icon_url,
        name: this.model.name
      });
      this.quantity = null;
      this.model = null;
    }
  },
  computed: {
    currentMemberWants() {
      return this.$store.state.currentMember.wants;
    }
  },
  watch: {
    search(val) {
      if (!val) return;
      if (this.isLoading) return;
      if (this.model && val == this.model.name) return;

      this.isLoading = true;

      this.debounce(this.lookupItem(val), 500);
    }
  }
};
</script>
