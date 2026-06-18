import Reveal from "reveal.js";
import Notes from "reveal.js/plugin/notes";
import "reveal.js/reveal.css";
import "./styles.css";

const frame = document.querySelector<HTMLIFrameElement>("#demo-frame");
const reloadButton = document.querySelector<HTMLButtonElement>("#reload-demo");
const baseUrl = import.meta.env.BASE_URL;

function fromBase(path: string) {
  return `${baseUrl}${path.replace(/^\/+/, "")}`;
}

function installDeckChromeReset() {
  document.getElementById("deck-chrome-reset")?.remove();

  const style = document.createElement("style");
  style.id = "deck-chrome-reset";
  style.textContent = `
    html,
    body,
    .reveal-viewport,
    .reveal {
      background: #ffffff !important;
      overflow: hidden !important;
    }

    .reveal .slides section {
      background-repeat: no-repeat !important;
      box-shadow: none !important;
    }

    .reveal .backgrounds,
    .reveal .slide-background,
    .reveal .slide-background-content {
      background: none !important;
      display: none !important;
      height: 0 !important;
      opacity: 0 !important;
      pointer-events: none !important;
      visibility: hidden !important;
    }

    .deck-number,
    .reveal .slide-number,
    .reveal .slide-number-a,
    .reveal .slide-number-delimiter,
    .reveal .slide-number-b,
    .reveal .progress,
    .reveal .controls {
      display: none !important;
    }

    .reveal::before,
    .reveal::after,
    .reveal .slides::before,
    .reveal .slides::after,
    .reveal .slides section::after {
      content: none !important;
      display: none !important;
    }
  `;
  document.head.append(style);
}

function injectV1() {
  const doc = frame?.contentDocument;
  if (!doc || doc.querySelector("[data-vertec-helper-v1-loader]")) return;

  const script = doc.createElement("script");
  script.src = fromBase("prototypes/v1/vertec-helper.user.js");
  script.dataset.vertecHelperV1Loader = "true";
  doc.head.append(script);
}

const deck = new Reveal({
  hash: true,
  controls: false,
  progress: false,
  slideNumber: false,
  width: 1600,
  height: 900,
  margin: 0.035,
  center: false,
  transition: "none",
  backgroundTransition: "none",
  plugins: [Notes],
});

installDeckChromeReset();
deck.initialize();

if (!window.location.hash || window.location.hash === "#/3" || window.location.hash === "#/8") {
  window.history.replaceState(null, "", "#/6");
  deck.slide(6);
}

frame?.addEventListener("load", injectV1);
if (frame?.contentDocument?.readyState && frame.contentDocument.readyState !== "loading") {
  injectV1();
}
reloadButton?.addEventListener("click", () => {
  if (frame) {
    const freshFixture = new URL(fromBase("fixtures/vertec-workshop-copy.html"), window.location.href);
    freshFixture.searchParams.set("reload", String(Date.now()));
    frame.src = freshFixture.toString();
  }
});
