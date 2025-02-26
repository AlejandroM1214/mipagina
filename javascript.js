document.addEventListener("DOMContentLoaded", function() {
    let miGrafico; // Variable para almacenar la gráfica

    document.getElementById("formulario").addEventListener("submit", function(event) {
        event.preventDefault();
        
        let consumoEnergia = parseFloat(document.getElementById("energia").value);
        let consumoAgua = parseFloat(document.getElementById("agua").value);

        if (isNaN(consumoEnergia) || isNaN(consumoAgua) || consumoEnergia < 0 || consumoAgua < 0) {
            alert("Por favor, ingresa valores válidos para el consumo de energía y agua.");
            return;
        }

        // Factores de ahorro estimados para cada producto
        let productos = [
            { nombre: "💨 Turbina eólica", ahorroEnergia: 0.25 },
            { nombre: "⚡ Cargador eólico", ahorroEnergia: 0.06 },
            { nombre: "🌞 Paneles solares", ahorroEnergia: 0.50 },
            { nombre: "🔋 Cargador solar", ahorroEnergia: 0.05 },
            { nombre: "🌊 Microturbina hidráulica", ahorroEnergia: 0.30 },
            { nombre: "🔌 Generador hidroeléctrico", ahorroEnergia: 0.15 },
            { nombre: "🔥 Estufa de pellets", ahorroEnergia: 0.40 },
            { nombre: "♻️ Digestor biogás", ahorroEnergia: 0.35 },
            { nombre: "🚰 Aireadores de grifos", ahorroAgua: 0.28 }
        ];

        let resultadoHTML = `<h2>Resultados</h2>`;
        let etiquetas = [];
        let datosEnergia = [];
        let datosAgua = [];

        productos.forEach(producto => {
            if (producto.ahorroEnergia) {
                let ahorro = consumoEnergia * producto.ahorroEnergia;
                resultadoHTML += `<p>⚡ Usando <strong>${producto.nombre}</strong> podrías ahorrar aproximadamente <strong>${ahorro.toFixed(2)} kWh</strong> al mes.</p>`;
                etiquetas.push(producto.nombre);
                datosEnergia.push(ahorro);
                datosAgua.push(0);
            }
            if (producto.ahorroAgua) {
                let ahorro = consumoAgua * producto.ahorroAgua;
                resultadoHTML += `<p>🚰 Usando <strong>${producto.nombre}</strong> podrías ahorrar aproximadamente <strong>${ahorro.toFixed(2)} litros</strong> de agua al mes.</p>`;
                etiquetas.push(producto.nombre);
                datosEnergia.push(0);
                datosAgua.push(ahorro);
            }
        });

        document.getElementById("resultado").innerHTML = resultadoHTML;

        // Crear o actualizar el gráfico
        let ctx = document.getElementById("graficoAhorro").getContext("2d");

        if (miGrafico) {
            miGrafico.destroy(); // Eliminar gráfico anterior si existe
        }

        miGrafico = new Chart(ctx, {
            type: "bar",
            data: {
                labels: etiquetas,
                datasets: [
                    {
                        label: "Ahorro de Energía (kWh)",
                        backgroundColor: "rgba(39, 225, 43, 0.7)",
                        borderColor: "rgba(0,0,0,0)",
                        borderWidth: 1,
                        data: datosEnergia
                    },
                    {
                        label: "Ahorro de Agua (litros)",
                        backgroundColor: "rgba(75, 192, 192, 0.7)",
                        borderColor: "rgba(0,0,0,0)",
                        borderWidth: 1,
                        data: datosAgua
                    }
                ]
            },
            options: {
                responsive: true,
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });
    });
});