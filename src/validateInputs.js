// formulário
const form = document.getElementById("investiment-form");

export function validateInputs(event) {
     if(event.target.value === "") {
          return;
     }
     const granparentElement = event.target.parentElement.parentElement;
     const parentElement = event.target.parentElement;
     const inputValue = event.target.value.replace(",",".");

     if(!parentElement.classList.contains("error") && (isNaN(inputValue) || inputValue <= 0)) {
          const errorMensage = document.createElement("p");
          errorMensage.classList.add("text-red-500");
          errorMensage.classList.add("text-xs");
          errorMensage.textContent = `Por favor, digite um valor válido e maior que zero`;
          granparentElement.appendChild(errorMensage);
          parentElement.classList.add("error");
     } else if(parentElement.classList.contains("error") && !isNaN(inputValue) && inputValue > 0) {
          parentElement.classList.remove("error");
          granparentElement.querySelector("p").remove();
     }
}

// para cada elemento do formulário, verifique quem tem a tag input e tem o atributo name
for(let formElement of form) {
     if(formElement.tagName === "INPUT" && formElement.hasAttribute("name")) {
          // escute o event de blur, e ao
         formElement.addEventListener("blur", validateInputs);
     }
}