document.addEventListener("DOMContentLoaded", function () {

  window.openInvitation = function () {
    const flap = document.querySelector(".flap");
    flap.style.transform = "rotateX(180deg)";

    setTimeout(() => {
      document.getElementById("envelope").style.display = "none";
      document.getElementById("content").style.display = "block";
    }, 1000);
  };

  /* Countdown */
  const countdownEl = document.getElementById("countdown");
  const eventDate = new Date("Oct 10, 2026 10:00:00").getTime();

  setInterval(function () {
    if (!countdownEl) return;

    const now = new Date().getTime();
    const distance = eventDate - now;

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    countdownEl.innerHTML = days + " hari lagi";
  }, 1000);

  /* Nama tamu */
  const params = new URLSearchParams(window.location.search);
  const name = params.get("to");

  if (name) {
    const guest = document.getElementById("guestName");
    if (guest) guest.innerText = name;
  }

  /* Hujan bunga */
  function createPetal() {
    const container = document.getElementById("petals");
    if (!container) return;

    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * window.innerWidth + "px";
    petal.style.animationDuration = (3 + Math.random() * 5) + "s";

    container.appendChild(petal);

    setTimeout(() => {
      petal.remove();
    }, 8000);
  }

  setInterval(createPetal, 300);

});
