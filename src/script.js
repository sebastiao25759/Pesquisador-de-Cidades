const url = 'https://servicodados.ibge.gov.br/api/v1/localidades/distritos';

fetch(url)
  .then(response => response.json())
  .then(data => {
    const div = document.createElement('div');
    div.className = 'container';
    document.body.appendChild(div);

    const input = document.createElement('input');
    input.type = 'text';
    input.placeholder = 'Digite o nome do distrito';
    div.appendChild(input);

    const button = document.createElement('button');
    button.textContent = 'Buscar';
    div.appendChild(button);

    const resultadoDiv = document.createElement('div');
    resultadoDiv.className = 'resultado';
    div.appendChild(resultadoDiv);

    button.addEventListener('click', () => {
        const nomeDistrito = input.value.trim().toLowerCase();
        const distrito = data.find(d => d.nome.toLowerCase() === nomeDistrito);

        resultadoDiv.innerHTML = ''; // Limpa resultados anteriores

        if (distrito) {
            const nome = document.createElement('h2');
            nome.textContent = `Nome: ${distrito.nome}`;

            const estado = document.createElement('p');
            estado.textContent = `Estado: ${distrito.municipio.microrregiao.mesorregiao.UF.nome}`;

            const regiao = document.createElement('p');
            regiao.textContent = `Região: ${distrito.municipio.microrregiao.mesorregiao.UF.regiao.nome}`;

            resultadoDiv.appendChild(nome);
            resultadoDiv.appendChild(estado);
            resultadoDiv.appendChild(regiao);
        } else {
            resultadoDiv.textContent = 'Distrito não encontrado.';
        }
    });
  })
  .catch(error => console.error('Erro ao buscar os dados:', error));
