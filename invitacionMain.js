const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

let countDown = new Date('May 30, 2026 19:00:00').getTime(),
    x = setInterval(function() {

      let now = new Date().getTime(),
          distance = countDown - now;

      document.getElementById('dias').innerText = Math.floor(distance / (day)),
        document.getElementById('horas').innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById('minutos').innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById('segundos').innerText = Math.floor((distance % (minute)) / second);

    }, second)



    // Animación al hacer scroll
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
    }
  });
}, {
  threshold: 0.2
});

document.querySelectorAll(".seccion").forEach(section => {
  observer.observe(section);
});

function entrar() {
  document.getElementById("intro").style.opacity = "0";
  setTimeout(() => {
    document.getElementById("intro").style.display = "none";
  }, 1500);
}

const music = document.getElementById("bgMusic");
const btn = document.getElementById("musicBtn");

btn.addEventListener("click", () => {
  if (music.paused) {
    music.play();
    btn.style.background = "#B6D0E2";
  } else {
    music.pause();
    btn.style.background = "rgba(0,0,0,0.6)";
  }
});


document.addEventListener("click", function activarMusica() {
  const music = document.getElementById("bgMusic");
  music.muted = false;
  music.play();
  document.removeEventListener("click", activarMusica);
});

//Inicio section carrusel
const track = document.querySelector(".carousel-track");
const slides = document.querySelectorAll(".carousel img");
const dotsContainer = document.querySelector(".carousel-dots");

let index = 0;
let interval;

// Crear puntitos
slides.forEach((_, i) => {
  const dot = document.createElement("span");
  if (i === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    index = i;
    updateCarousel();
    resetAutoSlide();
  });
  dotsContainer.appendChild(dot);
});

function updateCarousel() {
  track.style.transform = `translateX(-${index * 100}%)`;
  document.querySelectorAll(".carousel-dots span")
    .forEach(dot => dot.classList.remove("active"));
  dotsContainer.children[index].classList.add("active");
}

function autoSlide() {
  index = (index + 1) % slides.length;
  updateCarousel();
}

function resetAutoSlide() {
  clearInterval(interval);
  interval = setInterval(autoSlide, 4000);
}

interval = setInterval(autoSlide, 4000);
//Fin section carrusel

//Inicio seccion pases
function mostrarPase(){
  const modal = document.getElementById("paseModal");
  modal.style.display="flex";

  setTimeout(()=>{
    modal.classList.add("show");
  },50);
}

function cerrarPase(){
  const modal = document.getElementById("paseModal");
  modal.classList.remove("show");

  setTimeout(()=>{
    modal.style.display="none";
  },300);
}
//Fin seccion pases


//Segunda seccion pases automaticos
const invitados = {
  michael: {
    nombre: "Michael López",
    mesa: "8",
    pases: "2"
  },
  ana: {
    nombre: "Ana Torres",
    mesa: "4",
    pases: "3"
  }
};

function cargarInvitado() {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("inv");

  if(invitados[id]){

    document.getElementById("nombreInvitado").innerText = invitados[id].nombre;
    document.getElementById("mesaInvitado").innerText = invitados[id].mesa;
    document.getElementById("pasesInvitado").innerText = invitados[id].pases;

    document.getElementById("qrInvitado").src =
    "https://chart.googleapis.com/chart?chs=200x200&cht=qr&chl=https://https://ariana-michael.github.io/ArianayMichael//checkin.html?inv=" + id;

  }

}

window.addEventListener("load", cargarInvitado);
//Fin segunda seccion pases automaticos