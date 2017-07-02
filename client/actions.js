import store from "./store";
import {setText, getText} from "./service"

export function onChange(text) {
  store.update({
    type: "RECEIVE_TEXT",
    data: text
  });

  setText(text);
}

export function poll() {
  getText()
    .then(({text}) => {
      store.update({
        type: "RECEIVE_TEXT",
        data: text
      });
      setTimeout(poll, 1000);
    });
}
