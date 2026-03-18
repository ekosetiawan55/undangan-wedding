document.addEventListener("DOMContentLoaded", function () {

  const flap = document.getElementById("flap");
  const letter = document.getElementById("letter");
  const envelope = document.getElementById("envelope");
  const content = document.getElementById("content");

  function openInvitation() {
    // buka flap
    flap.style.transform = "rotateX(180deg)";

    // surat keluar
    setTimeout(() => {
      letter.classList.add("open");
    }, 500);

    // tampilkan konten
    setTimeout(() => {
      envelope.style.display = "none";
      content.style.display = "block";
    }, 2000);
  }

  flap.addEventListener("click", openInvitation);
  flap.addEventListener("touchstart", openInvitation);

  /* Nama tamu */
  const params = new URLSearchParams(window.location.search);
  const name = params.get("to");
  if (name) {
    document.getElementById("guestName").innerText = name;
  }

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

  /* Hujan bunga */
  function createPetal() {
    const petal = document.createElement("div");
    petal.classList.add("petal");

    petal.style.left = Math.random() * window.innerWidth + "px";
    petal.style.animationDuration = (3 + Math.random() * 5) + "s";

    document.getElementById("petals").appendChild(petal);

    setTimeout(() => petal.remove(), 8000);
  }

  setInterval(createPetal, 300);

});
