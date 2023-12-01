import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage {
  username!: string;
  password!: string;

  constructor(private router: Router) {}

  login() {
    // Implementasi logika login di sini
    // Contoh sederhana: jika username dan password adalah 'admin', arahkan ke halaman lain
    if (this.username === 'admin' && this.password === 'admin') {
      this.router.navigate(['/peminjaman']); // Ganti '/home' dengan rute halaman yang sesuai
    } else {
      // Tampilkan pesan kesalahan atau logika lainnya
    }
  }


}