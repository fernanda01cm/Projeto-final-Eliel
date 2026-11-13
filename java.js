
const btnTema = document.getElementById("btn-tema");
const raiz = document.documentElement;

function aplicarTema(tema) {
  if (tema === "escuro") {
    raiz.setAttribute("data-tema", "escuro");
    btnTema.textContent = "☀️";
  } else {
    raiz.removeAttribute("data-tema");
    btnTema.textContent = "🌙";
  }
}

let temaSalvo = null;
try { temaSalvo = localStorage.getItem("tema"); } catch (e) {}
aplicarTema(temaSalvo || (window.matchMedia("(prefers-color-scheme: dark)").matches ? "escuro" : "claro"));

btnTema.addEventListener("click", () => {
  const novo = raiz.getAttribute("data-tema") === "escuro" ? "claro" : "escuro";
  aplicarTema(novo);
  try { localStorage.setItem("tema", novo); } catch (e) {}
});


const btnMenu = document.getElementById("btn-menu");
const menu = document.getElementById("menu");

btnMenu.addEventListener("click", () => menu.classList.toggle("aberto"));
menu.querySelectorAll("a").forEach(link =>
  link.addEventListener("click", () => menu.classList.remove("aberto"))
);

const frases = ["estudante universitária", "futura profissional de TI", "curiosa por tecnologia"];
const alvo = document.getElementById("digitando");
let fraseAtual = 0;
let letraAtual = 0;
let apagando = false;

function digitar() {
  const frase = frases[fraseAtual];
  alvo.textContent = frase.substring(0, letraAtual);

  if (!apagando && letraAtual < frase.length) {
    letraAtual++;
    setTimeout(digitar, 90);
  } else if (!apagando) {
    apagando = true;
    setTimeout(digitar, 1400);
  } else if (letraAtual > 0) {
    letraAtual--;
    setTimeout(digitar, 45);
  } else {
    apagando = false;
    fraseAtual = (fraseAtual + 1) % frases.length;
    setTimeout(digitar, 300);
  }
}
digitar();

const observador = new IntersectionObserver((entradas) => {
  entradas.forEach(entrada => {
    if (!entrada.isIntersecting) return;
    entrada.target.classList.add("visivel");
    entrada.target.querySelectorAll(".barra-fill").forEach(barra => {
      barra.style.width = barra.dataset.valor + "%";
    });
    observador.unobserve(entrada.target);
  });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observador.observe(el));

const foto = document.getElementById("foto");
foto.addEventListener("error", () => {
  foto.src = "data:image/svg+xml;utf8," + encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="340" height="340">
       <rect width="100%" height="100%" fill="#4f46e5"/>
       <text x="50%" y="54%" font-size="120" fill="white" text-anchor="middle"
             dominant-baseline="middle" font-family="Arial">SN</text>
     </svg>`
  );
}, { once: true });


const EMAIL_DESTINO = "seuemail@exemplo.com"; // troque pelo seu e-mail

const form = document.getElementById("form-contato");
const aviso = document.getElementById("form-aviso");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const nome = document.getElementById("nome").value.trim();
  const email = document.getElementById("email").value.trim();
  const mensagem = document.getElementById("mensagem").value.trim();

  aviso.classList.remove("ok");

  if (!nome || !email || !mensagem) {
    aviso.textContent = "Preencha todos os campos.";
    return;
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    aviso.textContent = "Digite um e-mail válido.";
    return;
  }

  const assunto = encodeURIComponent("Contato pelo site - " + nome);
  const corpo = encodeURIComponent(mensagem + "\n\nDe: " + nome + " (" + email + ")");
  window.location.href = `mailto:${EMAIL_DESTINO}?subject=${assunto}&body=${corpo}`;

  aviso.textContent = "Abrindo seu aplicativo de e-mail...";
  aviso.classList.add("ok");
  form.reset();
});

document.getElementById("ano").textContent = new Date().getFullYear();