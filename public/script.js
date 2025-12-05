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
      li.className = "list-unstyled mb-3 col-md-4";

      const card = document.createElement("div");
      card.className = "card shadow-sm h-100";
      card.style.cursor = "pointer";
      card.style.backgroundColor = "#30B36B"; // verde tom do seu ícone
      card.style.color = "white";
      card.style.boxShadow = "0 4px 8px rgba(0,0,0,0.2)";

      const cardBody = document.createElement("div");
      cardBody.className = "card-body";

      const cardTitle = document.createElement("h5");
      cardTitle.className = "card-title";
      cardTitle.textContent = p.Nome;

      card.style.width = "500px";   // define largura fixa
card.style.height = "500px";  // define altura fixa

      const cardText = document.createElement("p");
      cardText.className = "card-text";
      cardText.innerHTML = `
        <strong>CPF:</strong> ${p.CPF_Paciente}<br>
        <strong>Telefone:</strong> ${p.telefone}<br>
        <strong>Procedimento:</strong> ${p.procedimento}<br>
        <strong>Prioridade:</strong> ${p.Prioridade}
      `;


     ;
  
      cardBody.appendChild(cardTitle);
      cardBody.appendChild(cardText);
      card.appendChild(cardBody);
      li.appendChild(card);
      lista.appendChild(li);

      card.onclick = () => abrirModalPaciente(p);

          const botaoRemover = document.createElement("button");
    botaoRemover.textContent = "Excluir";
  
    botaoRemover.classList.add("btn")
    botaoRemover.classList.add("btn-dark")

    botaoRemover.addEventListener("click", async () => {
      if (confirm(`Deseja realmente remover ${Pacientes.nome}?`)) {
        const resposta = await fetch(`/Pacientes/${Pacientes.id}`, { method: "DELETE" });
        if (resposta.ok) {
          carregaPaciente()
          console.log("ok");
        } else {
          alert("Erro ao remover usuário!");
        }
      }
    })
        lista.appendChild(li);
        li.appendChild(botaoRemover)
      
    });


    
  } catch (erro) {
    console.error("Erro ao carregar pacientes:", erro);
  }
}

function abrirModalPaciente(paciente) {
  const modal = document.getElementById("modalPaciente");
  const modalConteudo = document.getElementById("modalConteudoPaciente");

  modalConteudo.innerHTML = `
    <h2>${paciente.Nome}</h2>
    <p><strong>CPF:</strong> ${paciente.CPF_Paciente}</p>
    <p><strong>Data de nascimento:</strong> ${paciente.dataNascimento}</p>
    <p><strong>Endereço:</strong> ${paciente.endereco}</p>
    <p><strong>Telefone:</strong> ${paciente.telefone}</p>
    <p><strong>Nome da mãe:</strong> ${paciente.nomeMae}</p>
    <p><strong>Procedimento:</strong> ${paciente.procedimento}</p>
    <p><strong>Histórico de doenças:</strong> ${paciente.HistoricoDoencas}</p>
    <p><strong>Medicações:</strong> ${paciente.Medicacoes}</p>
    <p><strong>Gênero:</strong> ${paciente.Genero}</p>
    <p><strong>Alergias:</strong> ${paciente.Alergias}</p>
    <p><strong>Prioridade:</strong> ${paciente.Prioridade}</p>
  `;

  modal.style.display = "flex";

  // Corrigido: fecha o modal ao clicar fora
  modal.onclick = function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  }
}

document.getElementById("btnFecharModal").addEventListener("click", () => {
  document.getElementById("modalPaciente").style.display = "none";
});

function registrarCuidado() {

    const cuidados = Array.from(
        document.querySelectorAll('#opcoes-cuidado input[type="checkbox"]:checked')
    ).map(c => c.id);

    const registro = {
        cuidados,
        observacoes: document.getElementById("observacoes-cuidado").value,
        data: document.getElementById("data-cuidado").value,
        hora: document.getElementById("hora-cuidado").value
    };

    console.log("Cuidado registrado:", registro);

    alert("Cuidado registrado com sucesso!");
}

document.getElementById("btnSalvarCuidado")
    .addEventListener("click", registrarCuidado);
