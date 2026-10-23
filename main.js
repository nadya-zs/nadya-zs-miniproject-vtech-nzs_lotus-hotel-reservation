import readline from "readline";

import {
    showRooms,
    addReservation,
    showReservations,
    updateReservation,
    deleteReservation,
    reservationSummary
} from "./functions.js";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});


//Menampilkan menu utama
//Sambutan (hanya tampil sekali di awal)
const showWelcome = () => {
    console.log(`
==============================
  LOTUS HOTEL RESERVATION 🪷
==============================

Halo, Admin!
Selamat datang di Sistem Manajemen Reservasi Lotus Hotel.
Silakan pilih menu untuk mengelola data reservasi.`);
};

//Daftar menu (tampil setiap kali sebelum "Pilih menu")
const showMenu = () => {
    console.log(`
==============================
1. Lihat Daftar Kamar
2. Lihat Semua Reservasi
3. Tambah Reservasi
4. Ubah Status Reservasi
5. Hapus Reservasi
6. Ringkasan Reservasi
0. Keluar
==============================`);
};


//Menjalankan menu
const askMenu = () => {
    showMenu();
    rl.question("\nPilih menu : ", (choice) => {
        switch (choice) {

            case "1":
                showRooms();
                askMenu();
                break;

            case "2":
                showReservations();
                askMenu();
                break;

            case "3":
                rl.question("Nama Tamu : ", (guestName) => {
                    rl.question("Nomor Telepon : ", (phone) => {
                        showRooms();
                        rl.question("Pilih ID Kamar : ", (roomId) => {
                            rl.question("Lama Menginap (malam) : ", (night) => {
                                addReservation(guestName, phone, Number(roomId), Number(night));
                                askMenu();
                            });
                        });
                    });
                });
                break;

            case "4":
                rl.question("Masukkan Kode Booking : ", (inputId) => {
                    const bookingId = inputId.trim().toUpperCase();

                    console.log(`
Pilih Status:
1. Booked
2. Checked In
3. Checked Out
4. Cancelled
                    `);
                    
                    rl.question("Pilih status : ", (statusChoice) => {
                        let status = "";

                        switch (statusChoice) {
                            case "1":
                                status = "Booked";
                                break;
                            case "2":
                                status = "Checked In";
                                break;
                            case "3":
                                status = "Checked Out";
                                break;
                            case "4":
                                status = "Cancelled";
                                break;
                            default:
                                console.log("Pilihan status tidak tersedia.");
                                askMenu();
                                return;
                        }

                        updateReservation(bookingId, status);
                        askMenu();
                    });
                });
                break;

            case "5":
                rl.question("Masukkan Kode Booking yang ingin dihapus : ", (inputId) => {
                    deleteReservation(inputId.trim().toUpperCase());
                    askMenu();
                });
                break;

            case "6":
                reservationSummary();
                askMenu();
                break;

            case "0":
                console.log("Keluar dari sistem. Terima kasih!");
                rl.close();
                break;

            default:
                console.log("Pilihan menu tidak tersedia.");
                askMenu();
                break;
        }
    });
};


//Jalankan program
showWelcome();
askMenu();