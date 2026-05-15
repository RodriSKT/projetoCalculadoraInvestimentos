import { createArrayInvestiments } from "./src/calculateModule.js";
import { validateInputs } from "./src/validateInputs.js";

     const calculateButton = document.getElementById("calculate-button");
     const cleanButton = document.getElementById("clean-button");
     

function render(event) {
     event.preventDefault();
     if(document.querySelector(".error")) {
          alert("Campos com dados errados")
          return;
     }

     const startingAmount = Number(document.getElementById("starting-amount").value.replace(",","."));
     const additionalAmounts = Number(document.getElementById("additional-amounts").value.replace(",","."));
     const investimentTime = Number(document.getElementById("investiment-time").value);
     const investimentTimePeriod = document.getElementById("investiment-time-period").value;
     const returnRate = Number(document.getElementById("return-rate").value.replace(",","."));
     const returnRatePeriod = document.getElementById("return-rate-period").value;
     const tax = Number(document.getElementById("tax").value.replace(",","."));

     const investiments = createArrayInvestiments(startingAmount,additionalAmounts,investimentTime,investimentTimePeriod,returnRate,returnRatePeriod);
     console.log(investiments);
}

function cleanInputs() {
     document.getElementById("starting-amount").value = "";
     document.getElementById("additional-amounts").value = "";
     document.getElementById("investiment-time").value = "";
     document.getElementById("return-rate").value = "";
     document.getElementById("tax").value = "";

     const errorContainers = document.querySelectorAll(".error");
     for(let errorContain of errorContainers) {
          errorContain.classList.remove("error");
          errorContain.parentElement.querySelector("p").remove();

     }
}

calculateButton.addEventListener("click", render);
cleanButton.addEventListener("click", cleanInputs)