import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-peminjaman',
  templateUrl: './peminjaman.page.html',
  styleUrls: ['./peminjaman.page.scss'],
})
export class PeminjamanPage implements OnInit {

  constructor(public _apiService: ApiService, private modal:ModalController, private router: Router) { }
  dataPeminjaman: any = [];
  modal_tambah = false;
  id: any;
  barang: any;
  status: any;
  ngOnInit() {
    this.getPeminjaman();
    }
    getPeminjaman() {
    this._apiService.tampil('tampil.php').subscribe({
    next: (res: any) => {
    console.log('sukses', res);
    this.dataPeminjaman = res;
    },
    error: (err: any) => {
    console.log(err);
    },
    })
    }
      reset_model() {
      this.id = null;
      this.barang = '';
      this.status = '';
      }
      open_modal_tambah(isOpen: boolean) {
        this.modal_tambah = isOpen;
        this.reset_model();
        this.modal_tambah = true;
        this.modal_edit = false;
        }
      cancel() {
      this.modal.dismiss();
      this.modal_tambah = false;
      this.reset_model();
      }
      tambahPeminjaman() {
        if (this.barang != '' && this.status != '') {
        let data = {
        barang: this.barang,
        status: this.status,
        }
        this._apiService.tambah(data, '/tambah.php')
        .subscribe({
        next: (hasil: any) => {
        this.reset_model();
        console.log('berhasil tambah peminjaman');
        this.getPeminjaman();
        this.modal_tambah = false;
        this.modal.dismiss();
        },
        error: (err: any) => {
        console.log('gagal tambah peminjaman');
        }
        })
        } else {
        console.log('gagal tambah peminjaman karena masih ada data yg kosong');
        }
        }
      hapusPeminjaman(id: any) {
          this._apiService.hapus(id,
          '/hapus.php?id=').subscribe({
          next: (res: any) => {
          console.log('sukses', res);
          this.getPeminjaman();
          console.log('berhasil hapus data');
          },
          error: (error: any) => {
          console.log('gagal');
          }
          })
          }
      ambilPeminjaman(id: any) {
            this._apiService.lihat(id,
            '/lihat.php?id=').subscribe({
            next: (hasil: any) => {
            console.log('sukses', hasil);
            let peminjaman = hasil;
            this.id = peminjaman.id;
            this.barang = peminjaman.barang;
            this.status = peminjaman.status;
            },
            error: (error: any) => {
            console.log('gagal ambil data');
            }
            })
            }
            modal_edit = false;
      open_modal_edit(isOpen: boolean, idget: any) {
              this.modal_edit = isOpen;
              this.id = idget;
              console.log(this.id);
              this.ambilPeminjaman(this.id);
              this.modal_tambah = false;
              this.modal_edit = true;
              }
              editPeminjaman() {
                let data = {
                id: this.id,
                barang: this.barang,
                status: this.status
                }
                this._apiService.edit(data, '/edit.php')
                .subscribe({
                next: (hasil: any) => {
                console.log(hasil);
                this.reset_model();
                this.getPeminjaman();
                console.log('berhasil edit Peminjaman');
                this.modal_edit = false;
                this.modal.dismiss();
                },
                error: (err: any) => {
                console.log('gagal edit Peminjaman');
                }
                })
                }
                goToLoginPage() {
                  this.router.navigate(['/login']);
                }
}
