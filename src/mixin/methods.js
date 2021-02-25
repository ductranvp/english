import router from "@/router";
import { setLocalStorage } from "@/utils/app.utils";
import get from "lodash/get";
import set from "lodash/set";
import StorageKey from "@/constants/storage-key.constants";
import { SessionStatus } from "@/constants/learn.constants";
import { Speed } from "@/constants/app.constants";

const learnMethods = {
  clearAllHistory() {
    this.learnedSentences = [];
    this.activeSession = {};
    this.allSessions = [];
    localStorage.clear();
  },
  saveLearnedSentences(sentenceIds) {
    this.learnedSentences = this.learnedSentences.concat(sentenceIds);
    this.learnedSentences = [...new Set(this.learnedSentences)];
    setLocalStorage(StorageKey.LEARNED_SENTENCES, this.learnedSentences);
  },
  createSession(type, sentences) {
    const newSession = {
      id: new Date().getTime(),
      date: new Date(),
      type,
      status: SessionStatus.IN_PROGRESS,
      sentences: sentences.map(item => item.id)
    };
    this.setActiveSession(newSession);
    this.saveSession(newSession);
    return newSession;
  },
  setActiveSession(session) {
    this.activeSession = session;
    setLocalStorage(StorageKey.ACTIVE_SESSION, session);
  },
  clearActiveSession() {
    localStorage.removeItem(StorageKey.ACTIVE_SESSION);
    this.activeSession = {};
  },
  completeSession() {
    if (!this.activeSession.id) return;
    const idx = this.allSessions.findIndex(
      item => item.id === this.activeSession.id
    );
    if (idx !== -1) {
      const temp = this.allSessions[idx];
      temp.status = SessionStatus.COMPLETED;
      this.allSessions.splice(idx, 1, temp);
      this.saveSession();
      this.saveLearnedSentences(temp.sentences);
      this.clearActiveSession();
    }
  },
  saveSession(session) {
    if (session) this.allSessions.push(session);
    setLocalStorage(StorageKey.ALL_SESSIONS, this.allSessions);
  }
};

const routeMethods = {
  pushRouteName(routeName, params, query) {
    router.push({ name: routeName, params, query }).catch(() => {});
  },
  pushRoutePath(routePath, params, query) {
    router.push({ path: routePath, params, query }).catch(() => {});
  },
  replaceRouteName(routeName, params, query) {
    router.replace({ name: routeName, params, query }).catch(() => {});
  },
  replaceRoutePath(routePath, params, query) {
    router.replace({ path: routePath, params, query }).catch(() => {});
  }
};

const lodashMethods = {
  getProp: get,
  setProp: set
};

const methods = {
  ...learnMethods,
  ...routeMethods,
  ...lodashMethods,
  getAudio(fileId, speed) {
    let audio = new Audio(require("../assets/audio/" + fileId + "_normal.wav")); // path to file
    if (speed === Speed.SLOW) {
      audio = new Audio(require("../assets/audio/" + fileId + "_slow.wav"));
    }
    return audio;
  },
  repeatAudio(fileId, speed, times = 1) {
    return new Promise(resolve => {
      if (!fileId) return;
      let count = 0;
      const audio = this.getAudio(fileId, speed);
      playAudio();

      function playAudio() {
        if (count >= times) {
          resolve();
          return;
        }
        audio.addEventListener("ended", playAudio);
        audio.play();
        count++;
      }
    });
  }
};

export default methods;
