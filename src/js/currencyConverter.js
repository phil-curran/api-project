export default class CurrencyExchange {
  static populateCurrencySelection() {
    fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/codes`)
      .then((response) => {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .then((response) => {
        const currencyOptions = response.supported_codes;
        const convertFrom = document.getElementById("convertFromOptions");
        const convertTo = document.getElementById("convertToOptions");
        currencyOptions.forEach((currency) => {
          const option = document.createElement("option");
          option.value = currency[0];
          option.textContent = currency[0] + " - " + currency[1];
          convertFrom.appendChild(option);
          convertTo.appendChild(option.cloneNode(true));
        });
      })
      .catch(function (error) {
        return error;
      });
  }

  static convertCurrency(convertFrom, convertTo) {
    return fetch(`https://v6.exchangerate-api.com/v6/${process.env.API_KEY}/pair/${convertFrom}/${convertTo}
    `)
      .then(function (response) {
        if (!response.ok) {
          throw Error(response.statusText);
        }
        return response.json();
      })
      .catch(function (error) {
        return error;
      });
  }
}
