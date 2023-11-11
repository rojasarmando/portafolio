import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AlertMessageService {

  constructor() {}

  success(message: string) {
    Swal.fire({
      title: `<strong> ${message} </strong>`,
      icon: 'success',
      showCloseButton: true,
      focusConfirm: true,
      confirmButtonColor: 'var(--color-blue)',
      confirmButtonText: '<i class="fa fa-thumbs-up"></i> Great!',
      confirmButtonAriaLabel: 'Thumbs up, great!'
    });
  }

  error(message: string) {
    Swal.fire({
      title: `<strong> ${message} </strong>`,
      icon: 'error',
      showCloseButton: true,
      focusConfirm: true,
      confirmButtonColor: 'var(--color-blue)',
      confirmButtonText: 'Ok'
    });
  }
}
