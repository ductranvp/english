import filters from "@/mixin/filters";
import methods from "@/mixin/methods";
import Vue from "vue";
import StorageKey from "@/constants/storage-key.constants";
import { getLocalStorage } from "@/utils/app.utils";

export const mixin = {
  filters,
  data() {
    // eslint-disable-next-line no-unused-vars
    const exampleSession = {
      id: null,
      type: null, // LEARN, REVIEW
      date: null,
      sentences: []
    };
    return {
      learnedSentences: getLocalStorage(StorageKey.LEARNED_SENTENCES, []),
      activeSession: getLocalStorage(StorageKey.ACTIVE_SESSION, {}),
      allSessions: getLocalStorage(StorageKey.ALL_SESSIONS, [])
    };
  },
  methods
};

Vue.mixin(mixin);
