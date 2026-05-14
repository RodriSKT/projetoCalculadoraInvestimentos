import { createArrayInvestiments } from "./src/calculateModule.js";

const calculateButton = document.getElementById("calculate-button");

function render(event) {
     event.preventDefault();
     const startingAmount = Number(document.getElementById("starting-amount").value);
     const additionalAmounts = Number(document.getElementById("additional-amounts").value);
     const investimentTime = Number(document.getElementById("investiment-time").value);
     const investimentTimePeriod = document.getElementById("investiment-time-period").value;
     const returnRate = Number(document.getElementById("return-rate").value);
     const returnRatePeriod = document.getElementById("return-rate-period").value;

     const investiments = createArrayInvestiments(startingAmount,additionalAmounts,investimentTime,investimentTimePeriod,returnRate,returnRatePeriod);
     console.log(investiments);
}

calculateButton.addEventListener("click", render);