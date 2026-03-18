function openInvitation() {
  document.getElementById("cover").style.display = "none";
  document.getElementById("content").style.display = "block";
}

const eventDate = new Date("Oct 10, 2026 10:00:00").getTime();

setInterval(function () {
  const now = new Date().getTime();
  const distance = eventDate - now;

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  document.getElementById("countdown").innerHTML = days + " hari lagi";
}, 1000);

// Ambil nama tamu dari URL ?to=Nama
const params = new URLSearchParams(window.location.search);
const name = params.get("to");

if (name) {
  document.getElementById("guestName").innerText = name;
}