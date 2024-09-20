const App = (() => {
    const htmlElement = {
        form : document.querySelector('form'),
        cadena : document.querySelector('#cadena'),
        response : document.querySelector('#response')
    }

    const handlers = {
        onForm(e){
            //e.preventDefault();
            const cadena = htmlElement.cadena.value;
            htmlElement.response.innerHTML = `<span>${cadena.split('').reverse().join('')}</span>`
        }
    }

    const bindEvents = () => {
        htmlElement.form.addEventListener('keydown', handlers.onForm);
        }

    return {
        init(){
            bindEvents();
        },
    };
})();

App.init();