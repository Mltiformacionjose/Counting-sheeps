/**
 * countSheeps
 * Recibe una lista de booleans donde:
 *   true  -> oveja
 *   false -> lobo
 *
 * Devuelve:
 *   - "There are X sheep in total" si hay al menos una oveja
 *   - "UPS!!! Wolfs eaten Sheeps" si no queda ninguna oveja
 */
function countSheeps(list) {
  const sheepCount = list.filter(function (animal) {
    return animal === true;
  }).length;

  if (sheepCount === 0) {
    return "UPS!!! Wolfs eaten Sheeps";
  }

  return "There are " + sheepCount + " sheep in total";
}

 
 
 
const list1 = [
  true, true, true, false, true, true, true, true, true, false,
  true, false, true, false, false, true, true, true, true, true,
  false, false, true, true
];

const list2 = [false, false, false];

 
console.log("Test 1 -> " + countSheeps(list1));
console.log("Test 2 -> " + countSheeps(list2));

 
 
 
const field = document.getElementById("field");
const resultBox = document.getElementById("resultBox");

let moveIntervals = []; 

function clearField() {
 
  moveIntervals.forEach(function (id) {
    clearInterval(id);
  });
  moveIntervals = [];

 
  const existing = field.querySelectorAll(".animal");
  existing.forEach(function (el) {
    el.remove();
  });
}

function randomPosition() {
  const fieldWidth = field.clientWidth;
  const fieldHeight = field.clientHeight;

 
  const maxLeft = fieldWidth - 40;
  const maxTop = fieldHeight - 60;

  return {
    left: Math.floor(Math.random() * maxLeft),
    top: Math.floor(Math.random() * maxTop) + 10
  };
}

function moveAnimalRandomly(el) {
  const pos = randomPosition();
  const prevLeft = parseFloat(el.style.left) || 0;

 
  if (pos.left < prevLeft) {
    el.classList.add("flip");
  } else {
    el.classList.remove("flip");
  }

  el.style.left = pos.left + "px";
  el.style.top = pos.top + "px";
}

function renderField(list) {
  clearField();

  list.forEach(function (isSheep, index) {
    const el = document.createElement("div");
    el.classList.add("animal", isSheep ? "sheep" : "wolf");
    el.textContent = isSheep ? "🐑" : "🐺";

    const pos = randomPosition();
    el.style.left = pos.left + "px";
    el.style.top = pos.top + "px";

    field.appendChild(el);

 
    setTimeout(function () {
      el.classList.add("appear");
    }, index * 90);

 
    const intervalId = setInterval(function () {
      moveAnimalRandomly(el);
    }, 1800 + Math.random() * 1200); 

    moveIntervals.push(intervalId);
  });
}

function showResult(list) {
  const output = countSheeps(list);
  const isWarning = output.indexOf("UPS") === 0;

  resultBox.textContent = output;
  resultBox.classList.remove("ok", "warn");
  resultBox.classList.add(isWarning ? "warn" : "ok");
}

function runTest(list) {
  renderField(list);

 
  const totalDelay = list.length * 90 + 400;
  setTimeout(function () {
    showResult(list);
  }, totalDelay);
}

document.getElementById("btnTest1").addEventListener("click", function () {
  runTest(list1);
});

document.getElementById("btnTest2").addEventListener("click", function () {
  runTest(list2);
});