import { release } from "./release.mjs";

function releaseURL(value) {
  if (typeof value !== "string" || !value.trim()) return null;
  try {
    const url = new URL(value, document.baseURI);
    return url.origin === location.origin || url.protocol === "https:" ? url : null;
  } catch {
    return null;
  }
}

const dmglink = releaseURL(release?.dmg);
if (release?.version && dmglink && dmglink.pathname.toLowerCase().endsWith(".dmg")) {
  const download = document.querySelector("#download-link");
  download.href = dmglink.href;
  download.download = "";
  download.hidden = false;

  const channel = release.preview ? "开发预览版" : "正式版";
  document.querySelector("#release-status").textContent = `${release.version} · ${channel}`;
  document.querySelector("#preview-note").hidden = !release.preview;
  document.querySelector("#preview-layout").hidden = !release.preview;

  const notes = releaseURL(release.notes);
  if (notes) {
    const github = document.querySelector("#github-link");
    github.href = notes.href;
    github.hidden = false;
  }
}
