
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
// ... [O seu código que antecede este bloco] ...

const links = document.querySelectorAll('.shortcut-item');
const secoes = document.querySelectorAll('div[id$="-section"]');

links.forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault(); 

        const alvo = link.getAttribute('data-target');

        // 1. Esconde as seções
        secoes.forEach(section => {
            section.style.display = 'none';
        });

        // 2. MOSTRA A SEÇÃO E CONTROLA O FUNDO DO BODY
        const SecaoAlvo = document.getElementById(alvo);
        if (SecaoAlvo) {
            SecaoAlvo.style.display = 'block'; 

            // VERIFICAÇÃO CHAVE para o fundo:
            if (alvo === 'inicio-section') {
                // Adiciona a imagem de fundo SOMENTE na página inicial
                document.body.classList.add('fundo-inicial');
            } else {
                // Remove a imagem de fundo nas outras páginas
                document.body.classList.remove('fundo-inicial');
            }
        }

        // 3. Atualiza a barra de navegação
        links.forEach(l => l.classList.remove('active'));
        link.classList.add('active');
    });
});
