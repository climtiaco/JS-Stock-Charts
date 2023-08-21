function main() {

    const timeChartCanvas = document.querySelector('#time-chart');
    const highestPriceChartCanvas = document.querySelector('#highest-price-chart');
    const averagePriceChartCanvas = document.querySelector('#average-price-chart');

    // let response = await fetch('https://api.twelvedata.com/time_series?symbol=GME,MSFT,DIS,BNTX&interval=1day&apikey=4d9080ecd9e346fcb0c11ced028103e3');
    // let result = await response.json();
    // const stockList = document.getElementById('root');
    // console.log (result)

    // let GME = result.GME
    // let MSFT = result.MSFT
    // let DIS = result.DIS
    // let BTNX = result.BTNX

    // const stocks = [GME, MSFT, DIS, BTNX];
            // This would be the long way to handle creating this array. You can make it so the array itself creates it's own individual variables.
            // This is called "Destructuring"
    // const [GME, MSFT, DIS, BTNX] = result

    //Use this code below if you're making a lot of updates to code with a minute timeframe, because twelvedata only allows 8 fetch requests per minute. 
    const { GME, MSFT, DIS, BNTX } = mockData;
    console.log(mockData)

    const stocks = [GME, MSFT, DIS, BNTX];

    console.log(stocks[0].values)

    stocks.forEach(stock => stock.values.reverse())

    new Chart(timeChartCanvas.getContext('2d'), {
      type: 'line',
      data: {
        labels: stocks[0].values.map(value => value.datetime),
        datasets: stocks.map(stock => ({
            label:stock.meta.symbol,
            data: stock.values.map(value => parseFloat(value.high)),
            backgroundColor:getColor(stock.meta.symbol),
            borderColor: getColor(stock.meta.symbol),
        }))
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    new Chart(highestPriceChartCanvas.getContext("2d"), {
      type: "bar",
      data: {
        labels: stocks.map((stock) => stock.meta.symbol),
        datasets: [
          {
            label: "Highest",
            backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
            borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
            data: stocks.map((stock) => findHighest(stock.values)),
          },
        ],
      },
    });

    new Chart(averagePriceChartCanvas.getContext("2d"), {
      type: "pie",
      data: {
        labels: stocks.map((stock) => stock.meta.symbol),
        datasets: [
          {
            label: "Average",
            backgroundColor: stocks.map((stock) => getColor(stock.meta.symbol)),
            borderColor: stocks.map((stock) => getColor(stock.meta.symbol)),
            data: stocks.map((stock) => calculateAverage(stock.values)),
          },
        ],
      },
    });


};

function getColor(stock){
    if(stock === "GME"){
        return 'rgba(61, 161, 61, 0.7)'
    }
    if(stock === "MSFT"){
        return 'rgba(209, 4, 25, 0.7)'
    }
    if(stock === "DIS"){
        return 'rgba(18, 4, 209, 0.7)'
    }
    if(stock === "BNTX"){
        return 'rgba(166, 43, 158, 0.7)'
    }
};

function findHighest(values) {
	let highest = 0;
	values.forEach((value) => {
		if (parseFloat(value.high) > highest) {
			highest = value.high;
		}
	});
	return highest;
};

function calculateAverage(values) {
	let total = 0;
	values.forEach((value) => {
		total += parseFloat(value.high);
	});
	return total / values.length;
}


main()