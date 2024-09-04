$(document).ready(() => {
  const app = {
    particle: new Particle(),
    token: null,
    deviceId: "0a10aced202194944a059ff8",

    initData: function () {
      this.particle
        .login({
          username: "email",
          password: "password",
        })
        .then(
          (data) => {
            this.token = data.body.access_token;
            this.ledFunction(); // Llamar a ledFunction después de obtener el token
          },
          (err) => {
            console.log("Could not log in.", err);
          }
        );
    },

    getLedState: function () {
      this.particle
        .getVariable({
          deviceId: this.deviceId,
          name: "ledState", // El nombre de la variable en el dispositivo que guarda el estado del LED
          auth: this.token,
        })
        .then(
          (data) => {
            const ledState = data.body.result;
            this.updateToggle(ledState);
            this.ledFunction(); // Inicializar el manejo del toggle después de actualizar su estado
          },
          (err) => {
            console.log("Error getting variable:", err);
          }
        );
    },

    updateToggle: function (ledState) {
      const breaker1 = $("#Breaker1");
      if (ledState === "1") {
        breaker1.prop("open", true); // Abrir el toggle si el LED está encendido
        $("#state1").text("1");
      } else {
        breaker1.prop("open", false); // Cerrar el toggle si el LED está apagado
        $("#state1").text("0");
      }
    },

    ledFunction: function () {
      $("#switch-buttom").on("toggle", (event) => {
        const output = $("#estado");
        const Salida1 = event.target.open ? "1" : "0"; // Si está abierto es "1", sino "0"
        output.text(Salida1); // Mostrar el valor en el output

        this.particle
          .callFunction({
            deviceId: this.deviceId,
            name: "LED",
            argument: Salida1,
            auth: this.token,
          })
          .then(
            (response) => {
              //console.log("Function called successfully:", response);
            },
            (err) => {
              console.error("Failed to call function:", err);
            }
          );
      });
    },
  };

  app.initData();
});