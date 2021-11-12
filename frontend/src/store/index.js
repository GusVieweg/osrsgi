import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import axios from "axios";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "X-CSRFTOKEN";

const $axios = axios.create({ baseURL: process.env.VUE_APP_HOST_URL });

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    self: {
      wants: [],
      haves: []
    },
    otherMembers: {
      KindOfSpooky: {
        wants: [
          {
            item_id: 592,
            quantity: "2000",
            icon_url: "https://osrsbox.com/osrsbox-db/items-icons/592.png",
            name: "Ashes"
          }
        ],
        haves: [
          {
            item_id: 2150,
            quantity: "50",
            icon_url: "https://osrsbox.com/osrsbox-db/items-icons/2150.png",
            name: "Swamp toad"
          }
        ]
      },
      "Iron Bebop": {
        wants: [
          {
            item_id: 2150,
            quantity: "50",
            icon_url: "https://osrsbox.com/osrsbox-db/items-icons/2150.png",
            name: "Swamp toad"
          },
          {
            item_id: 592,
            quantity: "2000",
            icon_url: "https://osrsbox.com/osrsbox-db/items-icons/592.png",
            name: "Ashes"
          }
        ]
      }
    }
  },
  getters: {
    otherMembers: state => {
      return Object.keys(state.otherMembers).sort();
    }
  },
  mutations: {
    addWant(state, want) {
      state.self.wants.push(want);
    },
    addHave(state, have) {
      state.self.haves.push(have);
    },
    setItems(state, payload) {
      state.self["wants"] = payload.wants;
      state.self["haves"] = payload.haves;
    },
    removeItem(state, payload) {
      let placeholder = state.self[payload.type];
      state.self[payload.type] = [];
      this.$_.remove(placeholder, {
        item_id: payload.item_id,
        quantity: payload.quantity
      });
      state.self[payload.type] = placeholder;
    },
    updateSelfQuantity(state, payload) {
      let placeholder = state.self[payload.type];
      state.self[payload.type] = [];
      let item = this.$_.find(placeholder, {
        item_id: payload.item_id,
        quantity: payload.oldQuantity
      });
      item.quantity = payload.newQuantity;
      state.self[payload.type] = placeholder;
    },
    updateOtherMemberQuantity(state, payload) {
      let placeholder = state.otherMembers[payload.member][payload.type];
      state.otherMembers[payload.member][payload.type] = [];
      let item = this.$_.find(placeholder, {
        item_id: payload.item_id,
        quantity: payload.oldQuantity
      });
      item.quantity = payload.newQuantity;
      state.otherMembers[payload.member][payload.type] = placeholder;
    }
  },
  actions: {
    async ADD_WANT(context, want) {
      await this.$http.post("/GIM/add/want/", {
        item_id: want.item_id,
        quantity: want.quantity,
        name: want.name,
        icon_url: want.icon_url
      });
      context.commit("addWant", want);
    },
    async ADD_HAVE(context, have) {
      await this.$http.post("/GIM/add/have/", {
        item_id: have.item_id,
        quantity: have.quantity,
        name: have.name,
        icon_url: have.icon_url
      });
      context.commit("addHave", have);
    },
    async REMOVE(context, payload) {
      await this.$http.post(`/GIM/remove/${payload.type.substring(0, 4)}/`, {
        item_id: payload.item_id,
        quantity: payload.quantity
      });
      context.commit("removeItem", payload);
    },
    async UPDATE_SELF_QUANTITY(context, payload) {
      await this.$http.post(`/GIM/update/${payload.type.substring(0, 4)}/`, {
        item_id: payload.item_id,
        old_quantity: payload.oldQuantity,
        new_quantity: payload.newQuantity
      });
      context.commit("updateSelfQuantity", payload);
    }
  }
});

store.$http = $axios;
store.$_ = _;

export default store;
