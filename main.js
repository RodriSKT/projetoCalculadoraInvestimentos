
import { createArrayInvestiments, investimentArray } from "./src/calculateModule.js";
import { validateInputs } from "./src/validateInputs.js";
import Chart from 'chart.js/auto';
import { createTable} from "./src/table.js";

// botões
const calculateButton = document.getElementById("calculate-button");
const cleanButton = document.getElementById("clean-button");
// gráficos
const resultsChart = document.getElementById("results-chart");
const progressionChart = document.getElementById("progression-chart");

let chart1 = {};
let chart2 = {};

const tableArray = [
     {columnLabel: "Mês", valueData: "month"},
     {columnLabel: "Total Investido", valueData: "investedAmount", format: (num) => convertToMoney(num)},
     {columnLabel: "Rendimento Mensal", valueData: "mouthReturn", format: (num) => convertToMoney(num)},
     {columnLabel: "Rendimento Total", valueData: "totalReturn", format: (num) => convertToMoney(num)},
     {columnLabel: "Quantia Total", valueData: "totalAmount", format: (num) => convertToMoney(num)},
]
     
function convertToMoney(moneyValue) {
return moneyValue.toLocaleString("pt-br", {style:"currency", currency: "BRL"});
}
function convertToMoneyChart(money) {
return Number(money.toFixed(2));
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
    console.log(investiments)
     const finalInvestimentObject = investimentArray[investimentArray.length - 1];
    
     createTable(tableArray, investiments, "investiment-table");
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
    data: [convertToMoneyChart(finalInvestimentObject.investedAmount), convertToMoneyChart((finalInvestimentObject.totalReturn * (1 - tax/100))), convertToMoneyChart(finalInvestimentObject.totalReturn * (tax/100))],
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
labels: investiments.map(investimentObject => investimentObject.month),
datasets: [
     {
          label: "total investido",
          data: investiments.map(investimentObject => convertToMoneyChart(investimentObject.investedAmount)),
          backgroundColor: 'rgb(128, 99, 255)'
     },
     {
          label: "rendimentos",
          data: investiments.map(investimentObject => convertToMoneyChart(investimentObject.mouthReturn)),
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

const mainElem = document.querySelector("main");
const carousselElem = document.getElementById("caroussel");
const previousBtnElem = document.getElementById("previous-btn");
const nextBtnElem = document.getElementById("next-btn");

previousBtnElem.addEventListener("click", () => {
     carousselElem.scrollLeft -= mainElem.clientWidth;
});

nextBtnElem.addEventListener("click", () => {
     carousselElem.scrollLeft += mainElem.clientWidth;
})

calculateButton.addEventListener("click", render);
cleanButton.addEventListener("click", cleanInputs)