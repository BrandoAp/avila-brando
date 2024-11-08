const App = (() => {
  const htmlElements = {
    generatedButton: document.querySelector("#add-button"),
    ascSortedButton: document.querySelector("#asc-button-sorted"),
    descSortedButton: document.querySelector("#desc-button-sorted"),
    listNumber: document.querySelector("#list-numbers"),
  };

  let numbers = [];

  const handles = {
    onClickButtonGenerated(e) {
      let randomNumber = Math.floor(Math.random() * 99) + 1;
      if (!numbers.includes(randomNumber)) {
        numbers.push(randomNumber);
      } else {
        alert("El numero " + randomNumber + " ya fue generado");
      }
      displayNumber();
    },
    onClickButtonAsc(e) {
      numbers.sort((a, b) => a - b);
      displayNumber();
    },
    onClickButtonDesc(e) {
      numbers.sort((a, b) => b - a);
      displayNumber();
    },
  };

  const displayNumber = () => {
    const numberList = htmlElements.listNumber;
    numberList.innerHTML = "";

    numbers.forEach((num) => {
      const li = document.createElement("li");
      li.textContent = num.toString().padStart(2, "0");
      numberList.appendChild(li);
    });
  };

  const bindEvent = () => {
    htmlElements.generatedButton.addEventListener(
      "click",
      handles.onClickButtonGenerated
    );
    htmlElements.ascSortedButton.addEventListener(
      "click",
      handles.onClickButtonAsc
    );
    htmlElements.descSortedButton.addEventListener(
      "click",
      handles.onClickButtonDesc
    );
  };

  return {
    init() {
      bindEvent();
    },
  };
})();

App.init();
