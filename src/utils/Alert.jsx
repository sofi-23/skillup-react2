import Swal from 'sweetalert2';

export const swal = () => {
    Swal.fire({
        title: "Wrong credentials",
        text: "Please try again",
        confirmationText: "OK",
        width: "400px",
        timer: 10000,
        timerProgressBar: true,

    })
};
