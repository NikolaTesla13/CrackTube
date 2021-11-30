import "./css/styles.scss";
import { get } from "axios";
import Plyr from "plyr";

const playVideo = (id) => {
  document.getElementById("watch").style.display = "";
  document.getElementById("feed").style.display = "none";

  document.getElementById(
    "watch"
  ).innerHTML = `<div id="player" data-plyr-provider="youtube" data-plyr-embed-id="${id}"></div>`;

  const player = new Plyr("#player", {
    autoplay: true,
    youtube: {
      noCookie: true,
      rel: 0,
      showinfo: 0,
      iv_load_policy: 3,
      modestbranding: 1,
    },
    ads: { enabled: false, publisherId: "", tagUrl: "" },
  });
};

const main = async () => {
  document.getElementById("watch").style.display = "none";

  const res = await get("/feed.js");
  const data = await res.data.data;
  for (let i = 0; i < data.length; i++) {
    document.querySelector(`#video-${i}`).innerHTML = `
    <amp-img [src]="video_${i}" width="720" height="404" layout="responsive" src="${data[i].thumbnail}"></amp-img>
    <p>${data[i].title}</p>
    `;
    document.querySelector(`#video-${i}`).addEventListener("click", () => {
      playVideo(data[i].id);
    });
  }

  let handleMousemove = (event) => {
    // if (event.y > (window.innerHeight / 3) * 2) {
    //   window.scroll(0, 200);
    // }
    // if (event.y < (window.innerHeight / 3) * 2) {
    //   window.scroll(0, -200);
    // }
    // console.log(`mouse position: ${event.x}:${event.y}`);
  };

  document.addEventListener("mousemove", handleMousemove);
};

main();
