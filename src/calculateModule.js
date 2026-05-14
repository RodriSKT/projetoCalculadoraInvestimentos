function transformRateToMouthly(yearlyRate) {
     return yearlyRate ** 1/12
}

// função que recebe os dados de cada um dos inputs e retorna um array de objetos contendo um objeto por período
export function createArrayInvestiments(startingAmount = 0, additionalAmounts = 0, investimentTime = 0, investimentTimePeriod = 'mouthly', returnRate = 0, returnRatePeriod = "mouthly", tax = 0) {


if(!startingAmount || !investimentTime) {
     throw new Error("Investimento inicial e prazo devem ser preenchidos")
}

// converte o perído e a taxa em mensais de acordo com o que foi selecionado no select
const mouthlyReturnRate = returnRatePeriod === "mouthly" ? 1 + returnRate/100 : transformRateToMouthly(1 + returnRate/100);
const mouthlyTimePeriod = investimentTimePeriod === "mouthly" ? investimentTime : investimentTime * 12;


// Objeto inicial que vai entrar no array de projeções
const investimentObject = {
     investedAmount: startingAmount,
     mouthReturn: 0,
     totalReturn: 0,
     mounth: 0,
     totalAmount: startingAmount,
}

const investimentArray = [investimentObject];

// Para cada mês do período informado, o for vai repetir isso.
for(let i = 1; i <= mouthlyTimePeriod; i++) {
     const totalAmount = investimentArray[i - 1].totalAmount * mouthlyReturnRate + additionalAmounts;
     const mouthReturn = investimentArray[i - 1].totalAmount * mouthlyReturnRate;
     const investedAmount = startingAmount + additionalAmounts * i;
     const totalReturn = totalAmount - investedAmount;

     investimentArray.push({
     investedAmount,
     mouthReturn,
     totalReturn,
     mounth: i,
     totalAmount,
     })
}

return investimentArray;

}