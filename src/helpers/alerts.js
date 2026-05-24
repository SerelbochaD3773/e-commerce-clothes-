import Swal from 'sweetalert2'

export function questionAlert() {
  Swal.fire({
  title: "Estas seguro de enviar el mensaje?",
  text: "Puedes arreglarlo antes de enviarlo!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si, enviarlo!"
}).then((result) => {
  if (result.isConfirmed) Swal.fire({
    title: "Enviado!",
    text: "El mensaje fue enviado correctamente.",
    icon: "success"
  });
});
}


export function errorAlert(title, message) {
   let timerInterval;
  Swal.fire({
  title:title,
  html: message,
  timer: 2000,
  timerProgressBar: true,
  didOpen: () => {
    Swal.showLoading();
    const timer = Swal.getPopup().querySelector("b");
    timerInterval = setInterval(() => {
      timer.textContent = `${Swal.getTimerLeft()}`;
    }, 100);
  },
  willClose: () => {
    clearInterval(timerInterval);
  }
});
}



