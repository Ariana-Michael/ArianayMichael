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

const params = new URLSearchParams(window.location.search);
const id = params.get("inv");

const urlQR = "https://ariana-michael.github.io/Checkin/?inv=" + id;

// 🔥 GENERAR QR COMO IMAGEN (FORMA CORRECTA)
const contenedor = document.getElementById("qrInvitado");
contenedor.innerHTML = "";

new QRCode(contenedor, {
  text: urlQR,
  width: 150,
  height: 150
});

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

async function obtenerInvitado(id){

const url = "https://script.google.com/macros/s/AKfycbwOMQdjOy9Sa2AwWFbUznqti9u9Pac_qHn-zzZeeJOc9oXlPWV7DEKeHrukbTFalxGZ/exec?inv=" + id + "&tipo=consulta";

const res = await fetch(url);
const data = await res.json();

return data;

}

async function cargarInvitado(){

const params = new URLSearchParams(window.location.search);
const id = params.get("inv");

if(!id) return;

const data = await obtenerInvitado(id);

document.getElementById("nombreInvitado").innerText = data.nombre;
document.getElementById("pasesInvitado").innerText = data.pases;

}

window.addEventListener("load", cargarInvitado);
//Fin segunda seccion pases automaticos

// 🔓 Desbloquear audio en móviles
let audioHabilitado = false;

document.addEventListener("click", () => {
  if (!audioHabilitado) {
    const sonido = document.getElementById("zeldaChest");
    sonido.play().then(() => {
      sonido.pause();
      sonido.currentTime = 0;
      audioHabilitado = true;
    }).catch(() => {});
  }
}, { once: true });

// ===== EASTER EGG TRIFUERZA =====

document.addEventListener("DOMContentLoaded", () => {

  const trifuerzas = document.querySelectorAll(".trifuerza-easter.clickable");
  const sonido = document.getElementById("zeldaChest");

  let encontradas = 0;

  trifuerzas.forEach(tri => {
    tri.addEventListener("click", () => {

      if (!tri.classList.contains("activa")) {
        tri.classList.add("activa");
        encontradas++;
      }

if (encontradas === 3) {

  const music = document.getElementById("bgMusic");

  // 🔇 baja volumen música fondo (opcional pero PRO)
  music.volume = 0.2;

  sonido.currentTime = 0;

  sonido.play().then(() => {
    console.log("Sonido reproducido correctamente");
  }).catch((e) => {
    console.log("Error audio:", e);
  });
      

        setTimeout(() => {
          trifuerzas.forEach(t => t.classList.remove("activa"));
          encontradas = 0;
        }, 4000);
      }

    });
  });

});