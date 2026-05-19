import { createArrayInvestiments, investimentArray } from "./src/calculateModule.js";
import { validateInputs } from "./src/validateInputs.js";
import Chart from 'chart.js/auto';

// botões
const calculateButton = document.getElementById("calculate-button");
const cleanButton = document.getElementById("clean-button");
// gráficos
const resultsChart = document.getElementById("results-chart");
const progressionChart = document.getElementById("progression-chart");

let chart1 = {};
let chart2 = {};
     
function convertToMoney(moneyValue) {
return moneyValue.toFixed(2);
}

function render(event) {
     event.preventDefault();
     if(document.querySelector(".error")) {
          alert("Campos com dados errados")
          return;
     }

     removeChart();

     // inputs
     const startingAmount = Number(document.getElementById("starting-amount").value.replace(",","."));
     const additionalAmounts = Number(document.getElementById("additional-amounts").value.replace(",","."));
     const investimentTime = Number(document.getElementById("investiment-time").value);
     const investimentTimePeriod = document.getElementById("investiment-time-period").value;
     const returnRate = Number(document.getElementById("return-rate").value.replace(",","."));
     const returnRatePeriod = document.getElementById("return-rate-period").value;
     const tax = Number(document.getElementById("tax").value.replace(",","."));

     const investiments = createArrayInvestiments(startingAmount,additionalAmounts,investimentTime,investimentTimePeriod,returnRate,returnRatePeriod);
     const finalInvestimentObject = investimentArray[investimentArray.length - 1];
    
     // criação dos gráficos
    chart1 = new Chart(resultsChart, {
  type: 'doughnut',
  data: {
  labels: [
    'Total investido',
    'Rendimentos',
    'Imposto'
  ],
  datasets: [{
    label: 'Resultados',
    data: [convertToMoney(finalInvestimentObject.investedAmount), convertToMoney((finalInvestimentObject.totalReturn * (1 - tax/100))), convertToMoney(finalInvestimentObject.totalReturn * (tax/100))],
    backgroundColor: [
      'rgb(128, 99, 255)',
      'rgb(54, 162, 235)',
      'rgb(255, 205, 86)'
    ],
    hoverOffset: 4
  }]
}
});

 chart2 = new Chart(progressionChart, {
  type: 'bar',
  data: {
labels: investiments.map(investimentObject => investimentObject.mouth),
datasets: [
     {
          label: "total investido",
          data: investiments.map(investimentObject => convertToMoney(investimentObject.investedAmount)),
          backgroundColor: 'rgb(128, 99, 255)'
     },
     {
          label: "rendimentos",
          data: investiments.map(investimentObject => convertToMoney(investimentObject.mouthReturn)),
          backgroundColor: 'rgb(99, 255, 229)'
     }
],
  }, options: {
     responsive: true,
    scales: {
      x: {
        stacked: true
      },
      y: {
        stacked: true
      }
    }
  },
});


}

function isObjectEmpty(obg) {
     return Object.keys(obg).length === 0;
}

function removeChart() {
     if(!isObjectEmpty(chart1) && !isObjectEmpty(chart2)) {
          chart1.destroy();
          chart2.destroy();
     }
}

function cleanInputs() {
     document.getElementById("starting-amount").value = "";
     document.getElementById("additional-amounts").value = "";
     document.getElementById("investiment-time").value = "";
     document.getElementById("return-rate").value = "";
     document.getElementById("tax").value = "";

     removeChart();

     const errorContainers = document.querySelectorAll(".error");
     for(let errorContain of errorContainers) {
          errorContain.classList.remove("error");
          errorContain.parentElement.querySelector("p").remove();

     }
}

calculateButton.addEventListener("click", render);
cleanButton.addEventListener("click", cleanInputs)