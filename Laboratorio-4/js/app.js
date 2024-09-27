const App = (({ reverseString }) => {
  const htmlElement = {
    form: document.querySelector("form"),
    response: document.querySelector("#response"),
    colorSelect: document.querySelector("#color"),
  };

  const handlers = {
    onForm(e) {
      //e.preventDefault();
      htmlElement.response.textContent = reverseString(e.target.value);
    },
    onColorChange() {
      htmlElement.response.classList.remove(
        "color-black",
        "color-blue",
        "color-gray"
      );

      const selectedColor = htmlElement.colorSelect.value;
      if (selectedColor === "black") {
        htmlElement.response.classList.add("color-black");
      } else if (selectedColor === "blue") {
        htmlElement.response.classList.add("color-blue");
      } else if (selectedColor === "gray") {
        htmlElement.response.classList.add("color-gray");
      }
    },
  };

  const bindEvents = () => {
    htmlElement.form.elements.cadena.addEventListener(
      "keydown",
      handlers.onForm
    );
    htmlElement.colorSelect.addEventListener('change', handlers.onColorChange);
  };

  return {
    init() {
      bindEvents();
    },
  };
})(window.Utils);

App.init();
