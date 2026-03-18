function openInvitation() {
  const flap = document.querySelector(".flap");
  flap.style.transform = "rotateX(180deg)";

  setTimeout(() => {
    document.getElementById("envelope").style.display = "none";
    document.getElementById("content").style.display = "block";
  }, 1000);
}

/* Countdown */
const eventDate = new Date("Oct 10, 2026 10:00:00").getTime();

setInterval(function () {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("countdown").innerHTML = days + " hari lagi";
}, 1000);

/* Nama tamu dari URL */
const params = new URLSearchParams(window.location.search);
const name = params.get("to");

if (name) {
  document.getElementById("guestName").innerText = name;
}

/* Hujan bunga */
function createPetal() {
  const petal = document.createElement("div");
  petal.classList.add("petal");

  petal.style.left = Math.random() * window.innerWidth + "px";
  petal.style.animationDuration = (3 + Math.random() * 5) + "s";

  document.getElementById("petals").appendChild(petal);

  setTimeout(() => {
    petal.remove();
  }, 8000);
}

setInterval(createPetal, 300);
