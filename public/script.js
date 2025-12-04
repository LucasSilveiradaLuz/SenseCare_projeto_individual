
// const CIP = document.getElementById("CIP");
// const senha = document.getElementById("senha");

// function enviaFormulario() {

//   const CIPsValidos = ["1234"];
//   const senhasValidas = ["000"];

//   const acessoPermitido =
//     CIPsValidos.includes(CIP.value) &&
//     senhasValidas[CIPsValidos.indexOf(CIP.value)] === senha.value;

//   if (acessoPermitido) {
//     alert("Bem-vindo de volta, enfermeiro!");

//     window.location.href = "http://127.0.0.1:5500/public/index.html";
//   }
// }


const links = document.querySelectorAll('.shortcut-item');
const secoes = document.querySelectorAll('div[id$="-section"]');


links.forEach(link => {
  link.addEventListener('click', e => {

    e.preventDefault(); // Evita que o link atualize a página

    const alvo = link.getAttribute('data-target'); // Define 'alvo' aqui!


    secoes.forEach(section => { // Oculta todas as seções
      section.style.display = 'none';
    });


    const secaoAlvo = document.getElementById(alvo);
    if (secaoAlvo) {
      secaoAlvo.style.display = 'block'; // Mostra a seção desejada

     
      if (alvo === 'pacientes-section') {
        carregaPaciente();
      }
    }


    if (alvo === "inicio-section") { // Lógica para o fundo
      document.body.classList.add("fundo-inicial");
    } else {
      document.body.classList.remove("fundo-inicial");
    }


    links.forEach(l => l.classList.remove("active"));
    link.classList.add("active");
  });
});


const url = "http://localhost:3000/Pacientes";

document.getElementById("btnEnviar")
  .addEventListener("click", cadastrarPaciente);

async function cadastrarPaciente() {
  const dados = {
    CPF_Paciente: document.getElementById("CPF_Paciente").value,
    Nome: document.getElementById("Nome").value,
    dataNascimento: document.getElementById("dataNascimento").value,
    endereco: document.getElementById("endereco").value,
    telefone: document.getElementById("telefone").value,
    nomeMae: document.getElementById("nomeMae").value,
    procedimento: document.getElementById("procedimento").value,
    HistoricoDoencas: document.getElementById("HistoricoDoencas").value,
    Medicacoes: document.getElementById("Medicacoes").value,
    Genero: document.querySelector('select[name="Genero"]').value,
    Alergias: document.querySelector('select[name="Alergias"]').value,
    Prioridade: document.querySelector('select[name="Prioridade"]').value
  };

  try {
    const resposta = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(dados)
    });

    const resultado = await resposta.json();
    alert(resultado.message || "Paciente cadastrado com sucesso!");
    // Se tiver um <form id="formCadastro">, reseta ele:
    document.getElementById("formCadastro")?.reset();
  } catch (erro) {
    console.error("Erro ao cadastrar paciente:", erro);
    alert("Ocorreu um erro ao cadastrar o paciente.");
  }
  console.log(dados)
}

async function carregaPaciente() {

  try {
    const response = await fetch(url);
    const data = await response.json();

    const lista = document.getElementById("lista");
    lista.innerHTML = "";

    data.forEach(p => {
      const li = document.createElement("li");
      li.innerHTML = `
        <strong>Nome:</strong> ${p.Nome}<br>
        <strong>CPF:</strong> ${p.CPF_Paciente}<br>
        <strong>Telefone:</strong> ${p.telefone}<br>
        <strong>Nome da mãe:</strong> ${p.nomeMae}<br>
        <strong>Procedimento:</strong> ${p.procedimento}<br>
        <strong>Histórico de doenças:</strong> ${p.HistoricoDoencas}<br>
        <strong>Medicações:</strong> ${p.Medicacoes}<br>
        <strong>Gênero:</strong> ${p.Genero}<br>
        <strong>Alergias:</strong> ${p.Alergias}<br>
        <strong>Prioridade:</strong> ${p.Prioridade}<br>
      `;
      lista.appendChild(li);
    });
    

  } catch (erro) {
    console.error("Erro ao carregar pacientes:", erro);
  }
}



