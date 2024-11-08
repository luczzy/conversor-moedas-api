const apiKey = 'e525988e1697fd6f84538bee'; // chave da API
const apiURL = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`; // válido por um mês

// Função para buscar a taxa de câmbio da API
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
    console.error("Error: ", error);
    return null;
  }
}

// Escutador para o botão "Converter"
document.getElementById('currency-form').addEventListener('submit', async function (event) {
  event.preventDefault();

  const valor = parseFloat(document.getElementById('valor').value);
  const moeda1 = document.getElementById('moeda1').value;
  const moeda2 = document.getElementById('moeda2').value;

  const ExchangeRate = await getExchangeRate(moeda1, moeda2);

  if (ExchangeRate) {
    const convertedValue = valor * ExchangeRate;
    const conversao = document.getElementById('conversao');
    conversao.textContent = `Resultado: ${convertedValue.toFixed(2)} ${moeda2}`;
  } else {
    alert('Erro ao buscar a cotação. Tente novamente');
  }
});

// Função para limpar o campo de resultado e o campo de valor
function clearResult() {
  document.getElementById('conversao').textContent = '';
  document.getElementById('valor').value = '';
}


