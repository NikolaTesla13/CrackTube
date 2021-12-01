import "./css/styles.scss";
import { get } from "axios";
import Plyr from "plyr";

let player = null;

const playVideo = (id) => {
  document.getElementById("watch").style.display = "";
  document.getElementById("feed").style.display = "none";

  const useYoutube = false;
  if (useYoutube) {
    document.getElementById(
      "watch"
    ).innerHTML = `<iframe width="1920" height="100%" src="https://www.youtube-nocookie.com/embed/${id}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`;
  } else {
    document.getElementById(
      "watch"
    ).innerHTML = `<div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${id}"></div>`;

    player = new Plyr("#player", {
      autoplay: true,
      height: "1080",
      width: "1920",
      playerVars: { autoplay: 1, controls: 1, autohide: 1, wmode: "opaque" },
      youtube: {
        noCookie: true,
        rel: 0,
        showinfo: 0,
        iv_load_policy: 3,
        modestbranding: 1,
        vq: 1080,
        hd: 1,
      },
      quality: {
        default: 1080,
        options: [4320, 2880, 2160, 1440, 1080, 720, 576, 480, 360, 240],
      },
      controls: [
        "play-large",
        "play",
        "progress",
        "current-time",
        "duration",
        "mute",
        "settings",
        "volume",
        "fullscreen",
      ],
      ads: { enabled: false, publisherId: "", tagUrl: "" },
    });

    player.on("progress", (event) => {
      document.querySelector("iframe").width = 1920;
      document.querySelector("iframe").height = 1080;
      document.querySelector("#watch div").style =
        "width: 1920px; height: 1080px;";
    });

    player.on("ready", (event) => {
      player.quality = 1080;
      player.play();
    });
  }
};

const createFeed = (data) => {
  if (player != null) {
    player.stop();
  }
  document.getElementById("watch").innerHTML = "";
  document.getElementById("watch").style.display = "none";
  document.getElementById("feed").style.display = "";
  for (let i = 0; i < data.length; i++) {
    document.querySelector(`#video-${i}`).innerHTML = `
    <amp-img [src]="video_${i}" width="1920" height="1080" layout="responsive" src="${data[i].thumbnail}"></amp-img>
    <p>${data[i].title}</p>
    `;
    document.querySelector(`#video-${i}`).addEventListener("click", () => {
      playVideo(data[i].id);
    });
  }
};

const main = async () => {
  document.getElementById("watch").style.display = "none";

  const res = await get("/feed.js");
  const data = await res.data.data;
  createFeed(data);

  document
    .getElementById("search-btn")
    .addEventListener("click", async (event) => {
      const searchQuery = document.getElementById("search").value;
      const res = await get(
        "https://cracktube.netlify.app/.netlify/functions/hello?query=" +
          searchQuery
      );
      const data = await res.data.data;
      createFeed(data);
    });
};

main();
