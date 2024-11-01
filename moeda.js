// Armazena chave e url que foi gerada no site https://app.exchangerate-api.com/
const apiKey = 'c231f1314a9e111663285fc7';
const apiUrl = `https://v6.exchangerate-api.com/v6/${apiKey}/latest/`;

// Função para buscar taxa de câmbio da API
async function getExchangeRate(daMoeda, paraMoeda){
  // Trazendo link da API
    try{
      const response = await fetch(`${apiUrl}${daMoeda}`);
      const data = await responde.json();
      // Retorno do valor da moeda
      if(data.result === 'success'){
        return data.conversion_rates[paraMoeda]; 

      }else{
        throw new Error ('Erro ao buscar a taxa de câmbio');
      }

    }catch(error){
      console.error("Error: ", error);
      return null;
    }
}