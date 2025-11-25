let CIP = document.getElementById("CIP")
let senha = document.getElementById("senha")
function enviaFormulario() {
  CIP.value;
  senha.value;
  
  let CIPsValidos = ["1234"];
  let senhasValidas = ["000"];
  
  let acessoPermitido = false;
  let i
  for (i = 0; i < CIPsValidos.length; i++) {
    if (CIP.value === CIPsValidos[i] && senha.value === senhasValidas[i]) {
      acessoPermitido = true;
      break;
    }
  }
if(acessoPermitido == true && i === 0){

    alert("Bem Vindo De Volta enfermeiro!");


  window.location.href = "http://127.0.0.1:5500/public/index.html"

     document.getElementById("prioridade").addEventListener("change", function () {
    const campo = document.getElementById("campoNeuro");
    campo.classList.toggle("d-none", this.value !== "neuro");
  });

  document.getElementById("alergias").addEventListener("change", function () {
    const campo = document.getElementById("campoAlergias");
    campo.classList.toggle("d-none", this.value !== "sim");
  });
}
}
const links = document.querySelectorAll('.shortcut-item');
const secoes = document.querySelectorAll('div[id$="-section"]');

links.forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault(); 

    const alvo = link.getAttribute('data-target');

    // Esconde  as seções
    secoes.forEach(section => {
      section.style.display = 'none';
    });

    // Mostra uma seção só 
    const SecaoAlvo = document.getElementById(alvo);
    if (SecaoAlvo) {
      SecaoAlvo.style.display = 'block';
    }

    // Atualiza a barra de navegação
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');
  });
});

