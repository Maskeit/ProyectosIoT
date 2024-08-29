$(document).ready(() => {
    const app = {
        TEMP: $('#Temperatura'),
        HUM: $('#Humedad'),
        token: "",
        particle: new Particle(),

        // Inicia sesión en Particle
        login: function () {
            this.particle.login({ username: 'miguelagustin182@gmail.com', password: 'Complex99@' }).then(
                (data) => {
                    this.token = data.body.access_token;
                    this.fetchData(); // Llama a fetchData una vez el login es exitoso
                },
                (err) => {
                    console.log('Could not log in.', err);
                }
            );
        },

        // Función para obtener los datos del sensor
        fetchData: async function () {
            try {
                const tempData = await this.particle.getVariable({
                    deviceId: '24002d001447313036303933',
                    name: 'temp', // Asegúrate de que el nombre de la variable sea correcto
                    auth: this.token
                });

                const humData = await this.particle.getVariable({
                    deviceId: '24002d001447313036303933',
                    name: 'hum', // Asegúrate de que el nombre de la variable sea correcto
                    auth: this.token
                });
                this.TEMP.text(tempData.body.result.toFixed(2));
                this.HUM.text(humData.body.result.toFixed(2));

            } catch (error) {
                console.error('Error fetching data:', error);
            }
        },

        // Inicializa la aplicación
        init: function () {
            this.login();
            setInterval(() => this.fetchData(), 60000); // Llama a fetchData cada 60 segundos
        }
    };

    // Inicializa la aplicación cuando el documento esté listo
    app.init();
});
