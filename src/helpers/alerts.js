import Swal from 'sweetalert2';

export async function questionAlert(title, text) {
    const result = await Swal.fire({
        title: title || "¿Estás seguro?",
        text: text || "Esta acción no se puede deshacer",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#2563eb",
        cancelButtonColor: "#dc2626",
        confirmButtonText: "Sí, confirmar",
        cancelButtonText: "Cancelar"
    })
    return result.isConfirmed
}

export function errorAlert(title, message) {
    let timerInterval
    Swal.fire({
        title,
        html: message,
        timer: 3000,
        timerProgressBar: true,
        icon: "error",
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b")
            timerInterval = setInterval(() => {
                if (timer) timer.textContent = `${Swal.getTimerLeft()}`
            }, 100)
        },
        willClose: () => clearInterval(timerInterval)
    })
}

export function successAlert(title, message) {
    Swal.fire({
        title,
        text: message,
        icon: "success",
        confirmButtonColor: "#2563eb",
        timer: 2000,
        timerProgressBar: true
    })
}

export function redirectAlert(title, message, url, icon) {
    let timerInterval
    Swal.fire({
        title,
        html: message + "<b></b>",
        timer: 2000,
        timerProgressBar: true,
        icon,
        didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b")
            timerInterval = setInterval(() => {
                if (timer) timer.textContent = `${Swal.getTimerLeft()}`
            }, 100)
        },
        willClose: () => {
            clearInterval(timerInterval)
            window.location.href = url
        }
    })
}
