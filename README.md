# **Projeto de Conversor de moedas simples**

## **Objetivo**
### Este projeto é uma versão aprimorada do projeto anterior, ele é um conversor de moeda desenvolvido em HTML, CSS e JavaScript. Ele utiliza uma API de taxa de câmbio para buscar e converter valores de uma moeda para outra.

## **Preview**
![Preview](/img/conversor-api.gif)

## **Funcionalidades**
### Este conversor de moedas permite calcular valores entre diferentes moedas com taxas de câmbio atualizadas, exibindo o resultado instantaneamente. Com uma interface simples, basta inserir o valor, selecionar as moedas, e ver a conversão.

## **Estrutura do código**

``const apiKey:`` Define a chave de autenticação para acessar a API de taxas de câmbio. Essa chave permite a comunicação segura e autoriza o uso da API.

``const apiURL:`` Cria a URL base para acessar a API, inserindo a chave da API no endereço. Esta URL busca as taxas de câmbio mais recentes para uma moeda de origem, válida por um mês a partir da criação.

- ``Exemplo:``
```js
const apiKey = 'e525988e1697fd6f84538bee'; // chave da API
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`; // válido por um mês
```
---------------------------------------------------------------------------------------------------------------
``Função para buscar a taxa de câmbio da API":`` Esta função assíncrona, getExchangeRate(moeda1, moeda2), busca a taxa de câmbio da API para converter de moeda1 (moeda de origem) para moeda2 (moeda de destino), fazendo a requisição fetch à API e converte a resposta em JSON, depois retorna a taxa de conversão de moeda2 se a resposta for bem-sucedida; caso contrário, lança um erro.

- ``Exemplo:``
```js
async function getExchangeRate(moeda1, moeda2) {
  try {
    const response = await fetch(`${apiURL}${moeda1}`);
    const data = await response.json();

    if (data.result === 'success') {
      return data.conversion_rates[moeda2];
    } else {
      throw new Error('Erro ao buscar a taxa de câmbio');
    }
  } catch (error) {
    console.error("Erro: ", error);
    return null;
  }
}
```
---------------------------------------------------------------------------------------------------------------

``Função para buscar a taxa de câmbio da API:`` Adiciona um evento ao formulário que, ao ser submetido, executa a conversão de moeda sem recarregar a página que lê o valor a ser convertido e as moedas selecionadas de origem e destino calculando o valor convertido multiplicando o valor pelo exchangeRate e exibe o resultado no campo conversao. Caso não consiga obter a taxa de conversão, exibe um alerta de erro.

- ``Exemplo:``
```js
document.getElementById('currency-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const valor = parseFloat(document.getElementById('valor').value);
  const moeda1 = document.getElementById('moeda1').value;
  const moeda2 = document.getElementById('moeda2').value;

  const exchangeRate = await getExchangeRate(moeda1, moeda2);

  if (exchangeRate) {
    const convertedValue = valor * exchangeRate;
    const conversao = document.getElementById('conversao');
    conversao.textContent = `Resultado: ${convertedValue.toFixed(2)} ${moeda2}`;
  } else {
    alert('Erro ao buscar a cotação. Tente novamente');
  }
});
```

``Função para limpar o campo de resultado e o campo de valor:`` Define a função clearResult() que limpa o campo de resultado da conversão (conversao) e redefine o valor inserido pelo usuário, preparando para uma nova conversão.

``Escutador de evento para o botão "Limpar:`` Associa a função clearResult ao botão "Limpar", permitindo que o usuário apague o conteúdo dos campos ao clicar nesse botão.

``Exemplo:``
```js
// Função para limpar o campo de resultado e o campo de valor
function clearResult() {
  document.getElementById('conversao').textContent = '';
  document.getElementById('valor').value = '';
}

// Escutador de evento para o botão "Limpar"
document.getElementById('limpar').addEventListener('click', clearResult);
```

## **Autores**
*``Deivid Marques``*

## **Tecnologias Utilizadas**
HTML5<br>
CSS3<br>
JS