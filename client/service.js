import {post, get} from "./ajax";

export function setText(text) {
  post({
    url: "/api/file",
    data: {text}
  });
}

export function getText() {
  return get({
    url: "/api/file",
  });
}
