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
    currentUser: "gus",
    members: {}
  },
  getters: {
    otherMembers: state => {
      let allMembers = Object.keys(state.members).sort();
      return allMembers.filter(i => i !== state.currentUser);
    },
    currentUserInfo: state => {
      return state.members[state.currentUser];
    }
  },
  mutations: {
    setCurrentUser(state, user) {
      state.currentUser = user;
    },
    setMembers(state, members) {
      members.forEach(member => {
        Vue.set(state.members, member, { wants: [], haves: [] });
      });
    },
    addWant(state, want) {
      state.members[state.currentUser].wants.push(want);
    },
    addHave(state, have) {
      state.members[state.currentUser].haves.push(have);
    },
    setItems(state, payload) {
      payload.wants.forEach(want => {
        state.members[want.username].wants.push(want);
      });

      payload.haves.forEach(have => {
        state.members[have.username].haves.push(have);
      });
    },
    removeItem(state, payload) {
      let placeholder = state.members[state.currentUser][payload.type];
      state.members[state.currentUser][payload.type] = [];
      this.$_.remove(placeholder, {
        item_id: payload.item_id
      });
      state.members[state.currentUser][payload.type] = placeholder;
    },
    updateQuantity(state, payload) {
      let placeholder = state.members[payload.member][payload.type];
      state.members[payload.member][payload.type] = [];
      let item = this.$_.find(placeholder, {
        item_id: payload.item_id
      });
      if (item && payload.quantity > 0) {
        item.quantity = payload.quantity;
        state.members[payload.member][payload.type] = placeholder;
      }
    },
    updateOtherQuantity(state, payload) {
      let wh = payload[payload.type.substring(0, 4)][0];
      let placeholder = state.members[payload.member][payload.type];
      state.members[payload.member][payload.type] = [];
      let item = this.$_.find(placeholder, {
        item_id: wh.item_id
      });
      item.quantity = wh.quantity;
      state.members[payload.member][payload.type] = placeholder;
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
      let resp = await this.$http.post(`/GIM/remove/${payload.type}/`, {
        item_id: payload.item_id,
        member: payload.member,
        quantity: payload.quantity
      });
      if (resp.status == 200) {
        context.commit("removeItem", payload);
      }
    },
    async UPDATE_QUANTITY(context, payload) {
      let resp = await this.$http.post(`/GIM/update/${payload.type}/`, {
        item_id: payload.item_id,
        member: payload.member,
        quantity: payload.quantity
      });
      if (resp.status == 200) {
        context.commit("updateQuantity", payload);
      }
    },
    async UPDATE_OTHER_QUANTITY(context, payload) {
      let wh = await this.$http.post(`/GIM/transact/${payload.type}/`, {
        member: payload.member,
        icon_url: payload.icon_url,
        item_id: payload.item_id,
        name: payload.name,
        quantity: parseInt(payload.quantity)
      });
      wh.data["member"] = payload.member;
      wh.data["type"] = payload.type;
      context.commit("updateOtherQuantity", wh.data);
      console.log(wh.data);
      context.commit("updateSelfQuantity", {
        type: wh.data.type == "wants" ? "haves" : "wants",
        item_id: payload.item_id,
        quantity: wh.data[wh.data.type == "wants" ? "have" : "want"][0].quantity
      });
    }
  }
});

store.$http = $axios;
store.$_ = _;

export default store;
