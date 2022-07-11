const btnPersonas = document.querySelector("#btnPersonas");
console.log(btnPersonas);
const inputPersonas = document.querySelector("#inputPersonas");
const listaDePersonas = document.querySelector("#listadoPersonas");
const gastoTotaldiv = document.querySelector("#gastoTotal");

let personas = [];

let gastos = [];

btnPersonas.addEventListener("click", () => {
  let personaAgregada = inputPersonas.value;
  personas.push(personaAgregada);
  console.log(personas);
  inputPersonas.value = "";
  crearListado();
});

const crearListado = () => {
  listaDePersonas.innerHTML = "";
  personas.forEach((persona) => {
    const listado = document.createElement("div");
    listado.classList.add("listado");
    listado.innerHTML = `${persona} <input data-id="${persona}" id="gasto" type="text" placeholder="gasto" />
               <button  data-id="${persona}" id="btnGasto">+</button> `;
    listaDePersonas.append(listado);
  });

  const btnGasto = document.querySelectorAll("#btnGasto");
  btnGasto.forEach((btn) => {
    btn.addEventListener("click", () => {
      let gasto = btn.previousElementSibling.value;
      let persona = { persona: btn.dataset.id, gasto: gasto };
      gastos.push(persona);
      console.log(gastos);
      gastoTotaldiv.innerHTML = "";
      individualFinal.innerHTML = "";
      CalculoGastoFinal();
    });
  });
};

let CalculoGastoFinal = () => {
  let suma = 0;
  gastos.forEach((gasto) => {
    suma += parseInt(gasto.gasto);
  });
  let participantes = personas.length;
  let gastoFinal = suma / participantes;
  console.log(gastoFinal);

  const totalGasto = document.createElement("div");
  totalGasto.classList.add("totalGasto");
  totalGasto.innerHTML = `Gasto total: ${suma}`;
  totalGasto.innerHTML += `  Gasto p/p es: ${Math.round(gastoFinal)}`;
  gastoTotaldiv.append(totalGasto);

  gastos.forEach((gasto) => {
    let persona = gasto.persona;
    let gastoPersona = gasto.gasto;
    let individual = gastoFinal - gastoPersona;
    let personaGasto = `${persona} <br> puso ${gastoPersona} debe ${Math.round(
      individual
    )} <br>`;
    console.log(personaGasto);
    const individualFinal = document.getElementById("individualFinal");
    const individualGasto = document.createElement("div");
    individualGasto.classList.add("individualGasto");
    individualGasto.innerHTML = personaGasto + "<br>";
    individualFinal.append(individualGasto);
  });
};
