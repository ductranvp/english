import filters from "@/mixin/filters";
import methods from "@/mixin/methods";
import Vue from "vue";
import StorageKey from "@/constants/storage-key.constants";
import { getLocalStorage } from "@/utils/app.utils";

export const mixin = {
  filters,
  data() {
    return {
      learnedSentences: getLocalStorage(StorageKey.LEARNED_SENTENCES, []),
      activeSession: getLocalStorage(StorageKey.ACTIVE_SESSION, {}),
      allSessions: getLocalStorage(StorageKey.ALL_SESSIONS, []),
      config: {
        sentencePerLesson: 5,
        sentenceRepeat: 5,
        paddingTime: 0.2 // seconds
      }
    };
  },
  methods
};

Vue.mixin(mixin);
