import Reveal from "reveal.js";
import Notes from "reveal.js/plugin/notes";
import "reveal.js/reveal.css";
import "./styles.css";

const frame = document.querySelector<HTMLIFrameElement>("#demo-frame");
const reloadButton = document.querySelector<HTMLButtonElement>("#reload-demo");

function injectV1() {
  const doc = frame?.contentDocument;
  if (!doc || doc.querySelector("[data-vertec-helper-v1-loader]")) return;

  const script = doc.createElement("script");
  script.src = "/prototypes/v1/vertec-helper.user.js";
  script.dataset.vertecHelperV1Loader = "true";
  doc.head.append(script);
}

const deck = new Reveal({
  hash: true,
  controls: true,
  progress: false,
  slideNumber: "c/t",
  width: 1600,
  height: 900,
  margin: 0,
  center: false,
  transition: "none",
  backgroundTransition: "none",
  plugins: [Notes],
});

deck.initialize();

frame?.addEventListener("load", injectV1);
if (frame?.contentDocument?.readyState && frame.contentDocument.readyState !== "loading") {
  injectV1();
}
reloadButton?.addEventListener("click", () => {
  if (frame) {
    frame.src = "/fixtures/vertec-workshop-copy.html";
  }
});
