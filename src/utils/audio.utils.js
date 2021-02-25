// eslint-disable-next-line no-unused-vars
import Crunker from "./crunker";
// eslint-disable-next-line no-unused-vars
import { Message } from "element-ui";
import { Speed } from "@/constants/app.constants";

function preparedBuffer(crunker, buffers, padTime = 0, repeatCount = 5) {
  const newBuffers = [];
  for (let i = 0; i < buffers.length; i++) {
    const newItem = crunker.padAudio(buffers[i], buffers[i].duration, padTime);
    newBuffers.push(...Array(repeatCount).fill(newItem));
  }
  return newBuffers;
}

async function getConcatenatedAudioFiles(fileIds, speed, padTime, repeatCount) {
  let crunker = new Crunker();

  const filePaths = [];
  fileIds.forEach(id => {
    if (speed === Speed.NORMAL) {
      filePaths.push(require("@/assets/audio/" + id + "_normal.wav"));
    } else {
      filePaths.push(require("@/assets/audio/" + id + "_slow.wav"));
    }
  });

  try {
    const buffers = await crunker.fetchAudio(...filePaths);
    const concatenated = await crunker.concatAudio(
      preparedBuffer(crunker, buffers, padTime, repeatCount)
    );
    const exported = await crunker.export(concatenated, "audio/mp3");
    return exported.url;
  } catch (e) {
    Message.error("Đã có lỗi xảy ra!");
  }
}

const AudioUtils = {
  getConcatenatedAudioFiles
};

export default AudioUtils;
