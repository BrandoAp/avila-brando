const App = (() => {
    const htmlElements = {
        nombreInput: document.getElementById('nombre'),
        colorInput: document.getElementById('color'),
        agregarButton: document.getElementById('agregar'),
        candidatosTable: document.getElementById('candidatos-table').getElementsByTagName('tbody')[0],
        barChart: document.getElementById('bar-chart'),
        bar: document.getElementById('bar')
    };

    const candidatos = [];

    const handles = {
        onAddCandidate(e) {
            e.preventDefault();

            const nombre = htmlElements.nombreInput.value.trim();
            const color = htmlElements.colorInput.value;
            if (!nombre || !color) return;

            const existingCandidate = candidatos.find(c => c.nombre === nombre);
            if (existingCandidate) {
                existingCandidate.puntos++;
            } else {
                const newCandidate = { nombre, color, puntos: 0};
                candidatos.push(newCandidate);
                this.renderCandidate(newCandidate);
            }

            this.updateBarChart();
            this.resetForm();
        },

        renderCandidate(candidate) {
            const row = htmlElements.candidatosTable.insertRow();
            row.innerHTML = `
                <td>${candidate.nombre}</td>
                <td>${candidate.puntos}</td>
                <td style="background-color: ${candidate.color};"></td>
                <td>
                    <button class="votar-btn" data-nombre="${candidate.nombre}">Votar</button>
                    <button class="eliminar-btn" data-nombre="${candidate.nombre}">Eliminar</button>
                </td>
            `;

            row.querySelector('.votar-btn').addEventListener('click', () => {
                candidate.puntos++;
                this.updateBarChart();
                this.renderTable();
            });

            row.querySelector('.eliminar-btn').addEventListener('click', () => {
                const index = candidatos.indexOf(candidate);
                if (index !== -1) {
                    candidatos.splice(index, 1);
                    this.updateBarChart();
                    this.renderTable();
                }
            });
        },

        renderTable() {
            htmlElements.candidatosTable.innerHTML = '';
            candidatos.forEach(candidate => this.renderCandidate(candidate));
        },

        updateBarChart() {
            htmlElements.bar.innerHTML = ''; // Limpiar la barra antes de volver a dibujar

            const totalVotes = candidatos.reduce((sum, c) => sum + c.puntos, 0);
            let offset = 0; // Inicializa un offset para la posición de los segmentos

            candidatos.forEach(candidate => {
                const segment = document.createElement('div');
                const percentage = totalVotes ? (candidate.puntos / totalVotes) * 100 : 0; // Evitar dividir por cero
                segment.style.width = percentage + '%';
                segment.style.height = '100%';
                segment.style.backgroundColor = candidate.color;
                segment.style.position = 'absolute';
                segment.style.left = offset + '%'; // Ajustar la posición a la izquierda
                segment.style.transition = 'width 0.3s, left 0.3s'; // Suavizar el cambio de ancho y posición
                htmlElements.bar.appendChild(segment);
                offset += percentage; // Actualizar el offset para el próximo segmento
            });
        },

        resetForm() {
            htmlElements.nombreInput.value = '';
            htmlElements.colorInput.value = '';
        }
    };

    const bindEvents = () => {
        htmlElements.agregarButton.addEventListener('click', handles.onAddCandidate.bind(handles));
    };

    return {
        init() {
            bindEvents();
        }
    };
})();

App.init();