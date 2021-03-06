<template>
  <v-card :min-height="minimumHeight">
    <v-overlay absolute opacity="1" color="white" :value="overlay">
      <v-list light>
        <v-list-item>
          <v-list-item-avatar>
            <v-img :src="overlayItem.icon_url"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title v-text="overlayItem.name"></v-list-item-title>
            <v-list-item-subtitle>
              x{{ overlayItem.quantity }}
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-text-field
        v-model="quantity"
        light
        label="How many would you like?"
      ></v-text-field>
      <v-btn block color="primary" @click="updateQuantity()">Submit</v-btn>
    </v-overlay>
    <v-card-text>
      <v-row>
        <v-col cols="12">
          <v-list v-if="items" subheader>
            <v-subheader>{{ member }}'s {{ type }}</v-subheader>

            <v-list-item v-for="item in items" :key="item.item_id">
              <v-list-item-avatar>
                <v-img :src="item.icon_url"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title v-text="item.name"></v-list-item-title>
                <v-list-item-subtitle>
                  x{{ item.quantity }}
                </v-list-item-subtitle>
              </v-list-item-content>
              <v-list-item-icon @click="showOverlay(item)">
                <v-tooltip top>
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      v-bind="attrs"
                      v-on="on"
                      :color="'purple accent-4'"
                      text
                      icon
                    >
                      <v-icon>
                        {{
                          type == "wants"
                            ? "mdi-basket-fill"
                            : "mdi-basket-unfill"
                        }}
                      </v-icon>
                    </v-btn>
                  </template>
                  <span v-if="type == 'haves'">Claim {{ item.name }}</span>
                  <span v-else>Fulfill {{ item.name }}</span>
                </v-tooltip>
              </v-list-item-icon>
            </v-list-item>
          </v-list>
          <v-list v-else subheader>
            <v-subheader>{{ member }}'s {{ type }}</v-subheader>
          </v-list>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    overlay: false,
    overlayItem: {},
    quantity: 0
  }),
  props: ["member", "type"],
  methods: {
    updateQuantity() {
      this.$store.dispatch("UPDATE_OTHER_QUANTITY", {
        member: this.member,
        type: this.type,
        item_id: this.overlayItem.item_id,
        icon_url: this.overlayItem.icon_url,
        name: this.overlayItem.name,
        quantity: this.quantity
      });
      this.overlay = false;
    },
    showOverlay(item) {
      this.quantity = item.quantity;
      this.overlayItem = item;
      this.overlay = true;
    }
  },
  computed: {
    items() {
      if (Object.keys(this.$store.state.members).length) {
        return this.$store.state.members[this.member][this.type];
      }
      return null;
    },
    minimumHeight() {
      return "300px";
    }
  }
};
</script>
