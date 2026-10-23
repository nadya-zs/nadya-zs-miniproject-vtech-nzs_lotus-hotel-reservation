# Judul Proyek: Sistem Manajemen Reservasi Lotus Hotel 🪷

## Gambaran Umum atau Penjelasan Program
Sistem Manajemen Reservasi Lotus Hotel adalah sistem berbasis command line interface (CLI) yang dibuat dari atau untuk sisi admin. Program ini dapat mengelola data reservasi hotel dengan CRUD.

Data reservasi disimpan dalam bentuk array of objects di dalam file `reservations.json` sebagai database sementara. Program ini juga terdapat informasi mengenai daftar kamar, dapat menambah, mengubah, dan menghapus data reservasi, dan bisa melihat ringkasan seluruh reservasi yang ada.

## Fitur Program
- Menampilkan daftar kamar hotel.
- Menampilkan seluruh data reservasi.
- Menambahkan data reservasi baru.
- Mengubah status reservasi menjadi booked, checked in, checked out, atau cancelled.
- Menghapus data reservasi berdasarkan kode booking.
- Menampilkan ringkasan data reservasi.
- Menghitung total harga reservasi secara otomatis berdasarkan harga kamar dan lama menginap.
- Membuat kode booking otomatis sesuai jenis kamar.
- Menyimpan data reservasi ke file reservations.json.
- Memvalidasi input untuk mencegah kesalahan pengisian data.

## Cara Menjalankan Program (How to Run)
1. Menginstall Visual Studio Code dan Node.js terlebih dahulu pada masing-masing device.
2. Download folder atau semua file project ini ke masing-masing device.
3. Buka terminal dan pastikan sudah masuk ke folder project.
4. Pastikan file `package.json` menggunakan "type": "module"
5. Jalankan program menggunakan perintah node main.js.
6. Jika sudah semua, maka program sudah siap untuk dijalankan dan dapat dicek masing-masing menunya.

## Cara Menggunakan Program
1. Jalankan Cara Menjalankan Program terlebih dahulu.
2. Pilih menu 1-6 sesuai operasi yang diinginkan.
3. Ikuti instruksi yang muncul di terminal.
4. Pilih 0 untuk keluar dari program.


## Struktur Project
```
miniproject-vtech-nzs/

├── data.js
├── functions.js
├── main.js
├── reservations.json
├── package.json
└── README.md
```

Keterangan:
- `data.js`             = berisi data tetap mengenai jenis kamar hotel.
- `functions.js`        = berisi fungsi-fungsi CRUD dan fungsi pendukung program ini.
- `main.js`             = menjadi program utama yang menampilkan menu, menerima input dari pengguna, dan memanggil
                          function yang diperlukan (CLI).
- `reservations.json`   = menyimpan data reservasi sebagai database sementara.
- `package.json`        = mengatur konfigurasi project dan penggunaan ES module.
- `README.md`           = menjelaskan informasi dan cara menggunakan program.

## Format Data
Data reservasi disimpan dalam bentuk array of objects.

Contoh data:
```
[
  {
    bookingId: "DLX01",
    guestName: "Nadya",
    phone: "081234567890",
    roomId: 2,
    roomType: "Deluxe Room",
    night: 3,
    totalPrice: 2100000,
    status: "Booked"
  }
]
```

Keterangan:
Format: Key = Keterangan
- `bookingId`   = Kode booking yang dibuat secara otomatis.
- `guestName`   = Nama tamu.
- `phone`       = Nomor telepon tamu 
- `roomId`      = ID kamar yang dipilih 
- `roomType`    = Jenis kamar 
- `night`       = Lama menginap (malam) 
- `totalPrice`  = Total biaya reservasi
- `status`      = Status reservasi

## Penjelasan Function CRUD
1. CREATE
```
    a. `addReservation()`
        Menambahkan data reservasi baru ke dalam `reservations.json`. Fungsi ini juga dapat menghitung total harga berdasarkan harga kamar dan lama menginap, dan membuat kode booking secara otomatis.
```

2. READ
```
    a. `showRooms()`
        Menampilkan daftar kamar hotel beserta informasi harga, kapasitas, jenis tempat tidur, dan fasilitas yang tersedia di setiap kamar.
    
    b. `showReservations()`
        Menampilkan seluruh data reservasi yang telah tersimpan. Jika tidak ada data, maka program akan menampilkan "Belum ada reservasi".
```

3. UPDATE
```
    a. `updateReservation()`
        Mengubah status reservasi berdasarkan kode booking menjadi booked, checked in, checked out, atau cancelled.
```

4. DELETE
```
    a. `deleteReservation()`
        Menghapus data reservasi berdasarkan kode booking yang dipilih.
```

## Fitur Tambahan
1. `reservationSummary()`
    Menampilkan ringkasan data reservasi seperti jumlah reservasi, jumlah kamar berdasarkan tipe, status reservasi, total malam menginap, dan estimasi pendapatan.   

## Author
- Nama          : Nadya Zahra Salsabila
- Tema Project  : Sistem Manajemen Reservasi Hotel
- Kelas         : Trial Study Club Backend Basic KSM Android UPNVJ 2026
- Mentor        : Nadia Jasmine Aulia