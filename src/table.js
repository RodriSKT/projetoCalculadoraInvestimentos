/* <table>
     <thead>
          <tr>
               <th>Mes</th>
               <th>Valor</th>
          </tr>
     </thead>
     <tbody>
          <tr>
               <td>0</td>
               <td>10.000,50</td>
          </tr>
     </tbody>
 </table> */

import { readUsedSize } from "chart.js/helpers";

//  ================================================

function isNonEmptyArray(tableArray) {
     return Array.isArray(tableArray) && tableArray.length > 0
}

export function createTable(tableArray, dataArray, tableId) {
     if(!isNonEmptyArray(tableArray) || !isNonEmptyArray(dataArray) || !tableId) {
          throw new Error("O array deve ter algum conteúdo");
     }
     const tableReference = document.getElementById(tableId);
     if(!tableReference || tableReference.nodeName !== "TABLE") {
          throw new Error("Elemento tabela não encontrado")
     }

     createTableHead(tableReference, tableArray);
     createTableBody(tableReference, dataArray, tableArray);
}

function createTableHead(tableReference, tableArray) {

     function createTheadElement(tableReference) {
          const thead = document.createElement("thead");
          tableReference.appendChild(thead);
          return thead;
     }
     const tableHeadReference = tableReference.querySelector("thead") ?? createTheadElement(tableReference);

     const trow = document.createElement("tr");
     ["bg-blue-900", "text-white", "sticky", "top-0"].forEach((classCss) => trow.classList.add(classCss));
     for(let item of tableArray) {
          const th = `<th class="text-center">${item.columnLabel}</th>`;
          trow.innerHTML += th;
     }
     tableHeadReference.appendChild(trow);
};
function createTableBody(tableReference, dataArray, tableArray) {

     function createTbodyElement(tableReference) {
          const tbody = document.createElement("tbody");
          tableReference.appendChild(tbody);
          return tbody;
     }
     const tableBodyReference = tableReference.querySelector("tbody") ?? createTbodyElement(tableReference);

     for(const [itemIndex, tableItem] of dataArray.entries()) {
          const trowBody = document.createElement("tr");
          if(itemIndex % 2 !== 0) {
               trowBody.classList.add("bg-blue-200");
          }
          for(const itemColumn of tableArray) {
               const formatFunction = itemColumn.format ?? ((num) => num);
               trowBody.innerHTML += `<td class="text-center">${formatFunction(tableItem[itemColumn.valueData])}</td>`;
          }
          tableBodyReference.appendChild(trowBody);
     }
     
};