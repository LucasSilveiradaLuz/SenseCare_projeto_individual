 let campos = document.querySelectorAll("form-control")
 let select = document.querySelectorAll("select")
  let url = 'http://localhost:3000/Pacientes';
 

async function carregaDados() {
  // Fazendo uma requisição GET para buscar os funcionários
  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      lista.innerHTML = ""; // Limpar a lista antes de adicionar os dados
      data.forEach((Paciente) => {
        // Criar um <li> para cada funcionário
        const li = document.createElement("li");
     
        // Adicionar o nome e email do funcionário dentro do <li>
        li.innerHTML = `
          <strong>Nome:</strong> <span>${Paciente.Nome}</span><br>
          <strong>CPF_Paciente:</strong> <span>${Paciente.CPF_Paciente}</span><br>
          <strong>Telefone:</strong> <span>${Paciente.telefone}</span><br>
          <strong>Email:</strong> <span>${Paciente.email}</span>
          <strong>nomeMae:</strong> <span>${Paciente.nomeMae}</span>
          <strong>procedimento:</strong> <span>${Paciente.procedimento}</span>
          <strong>HistoricoDoencas:</strong> <span>${Paciente.HistoricoDoencas}</span>
          <strong>Medicacoes:</strong> <span>${Paciente.Medicacoes}</span>
                <strong>Genero:</strong> <span>${Paciente.Genero}</span>
                      <strong>Alergias:</strong> <span>${Paciente.Alergias}</span>
                            <strong>Prioridade:</strong> <span>${Paciente.Prioridade}</span>
                                  <strong>Leito:</strong> <span>${Paciente.Leito}</span>

        `;
      })
    })
  }
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
