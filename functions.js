import fs from "fs";
import { rooms } from "./data.js";

const file = "./reservations.json";


//Membaca data reservasi dari file JSON
const getReservations = () => {
    const data = fs.readFileSync(file);
    return JSON.parse(data);
};

//Menyimpan data reservasi ke file JSON
const saveReservations = (data) => {
    fs.writeFileSync(file, JSON.stringify(data, null, 2));
};


//Membuat kode booking otomatis (contoh: STD01, DLX02)
const generateBookingId = (roomType, reservations) => {
    let prefix = "";
    if (roomType === "Standard Room") {
        prefix = "STD";
    } else if (roomType === "Deluxe Room") {
        prefix = "DLX";
    } else if (roomType === "Suite Room") {
        prefix = "STE";
    }

    let number = reservations.filter((item) => item.roomType === roomType).length + 1;
    let bookingId = `${prefix}${String(number).padStart(2, "0")}`;

    //Kalau kode sudah dipakai, maka nomor akan naik terus sampai dapat kode yang belum terpakai
    while (reservations.some((item) => item.bookingId === bookingId)) {
        number++;
        bookingId = `${prefix}${String(number).padStart(2, "0")}`;
    }

    return bookingId;
};


//READ - Menu 1: menampilkan daftar kamar
export const showRooms = () => {
    console.log(`
==============================
        DAFTAR KAMAR
==============================
    `);

    for (const room of rooms) {
        const { id, type, price, capacity, bed, facilities } = room;

        console.log(`
ID           : ${id}
Nama Kamar   : ${type}
Harga        : Rp${price}/malam
Kapasitas    : ${capacity} orang
Tempat Tidur : ${bed}
Fasilitas    : ${facilities.join(", ")}
------------------------------
        `);
    }
};


//READ - Menu 2: melihat semua reservasi
export const showReservations = () => {
    const reservations = getReservations();

    if (reservations.length === 0) {
        console.log("Belum ada reservasi.");
        return;
    }

    console.log(`
==============================
       DAFTAR RESERVASI
==============================
    `);

    for (const reservation of reservations) {
        const { bookingId, guestName, phone, roomType, night, totalPrice, status } = reservation;

        console.log(`
Kode Booking  : ${bookingId}
Nama          : ${guestName}
Nomor Telepon : ${phone}
Kamar         : ${roomType}
Lama Menginap : ${night} malam
Total Harga   : Rp${totalPrice}
Status        : ${status}
------------------------------
        `);
    }
};


//CREATE - Menu 3: membuat reservasi
export const addReservation = (guestName, phone, roomId, night) => {
    //Validasi input
    if (guestName === "" || phone === "") {
        console.log("Nama tamu dan nomor telepon tidak boleh kosong.");
        return;
    }

    //isNan = is Not a Number
    if (isNaN(phone)) {
        console.log("Nomor telepon harus berupa angka.");
        return;
    }

    if (isNaN(night) || night <= 0 || night % 1 !== 0) {
        console.log("Lama menginap harus berupa angka bulat lebih dari 0.");
        return;
    }

    const room = rooms.find((item) => item.id === roomId);

    if (!room) {
        console.log("Kamar tidak ditemukan.");
        return;
    }

    const reservations = getReservations();
    const bookingId = generateBookingId(room.type, reservations);
    const totalPrice = room.price * night;

    const newReservation = {
        bookingId,
        guestName,
        phone,
        roomId,
        roomType: room.type,
        night,
        totalPrice,
        status: "Booked"
    };

    //Tambah data baru tanpa mengubah array lama
    const updatedReservations = [...reservations, newReservation];
    saveReservations(updatedReservations);

    console.log(`
Reservasi berhasil dibuat.
Kode Booking  : ${bookingId}
Nama          : ${guestName}
Kamar         : ${room.type}
Lama Menginap : ${night} malam
Total Harga   : Rp${totalPrice}
Status        : ${newReservation.status}
    `);
};


//UPDATE - Menu 4: mengubah status reservasi
export const updateReservation = (bookingId, newStatus) => {
    const validStatus = ["Booked", "Checked In", "Checked Out", "Cancelled"];
    const reservations = getReservations();

    const found = reservations.some((item) => item.bookingId === bookingId);

    if (!found) {
        console.log("Reservasi tidak ditemukan.");
        return;
    }

    if (!validStatus.includes(newStatus)) {
        console.log("Status tidak valid.");
        return;
    }

    //Hasilnya disimpan di array baru, jadi array lama tidak berubah
    const updatedReservations = reservations.map((item) =>
        item.bookingId === bookingId ? { ...item, status: newStatus } : item
    );

    saveReservations(updatedReservations);

    console.log(`
        Status reservasi berhasil diperbarui.
        Kode Booking : ${bookingId}
        Status Baru  : ${newStatus}
    `);
};


//DELETE - Menu 5: menghapus reservasi
export const deleteReservation = (bookingId) => {
    const reservations = getReservations();

    const found = reservations.some((item) => item.bookingId === bookingId);

    if (!found) {
        console.log("Reservasi tidak ditemukan.");
        return;
    }

    const updatedReservations = reservations.filter((item) => item.bookingId !== bookingId);
    saveReservations(updatedReservations);

    console.log(`Data reservasi ${bookingId} berhasil dihapus.`);
};


//Menu 6: Ringkasan reservasi
export const reservationSummary = () => {
    const reservations = getReservations();

    const totalReservation = reservations.length;

    const standard = reservations.filter((item) => item.roomType === "Standard Room").length;
    const deluxe = reservations.filter((item) => item.roomType === "Deluxe Room").length;
    const suite = reservations.filter((item) => item.roomType === "Suite Room").length;

    const booked = reservations.filter((item) => item.status === "Booked").length;
    const checkedIn = reservations.filter((item) => item.status === "Checked In").length;
    const checkedOut = reservations.filter((item) => item.status === "Checked Out").length;
    const cancelled = reservations.filter((item) => item.status === "Cancelled").length;

    //Reservasi yang dibatalkan tidak dihitung ke malam dan pendapatan
    const activeReservations = reservations.filter((item) => item.status !== "Cancelled");

    const totalNight = activeReservations.reduce((total, item) => total + item.night, 0);
    const totalIncome = activeReservations.reduce((total, item) => total + item.totalPrice, 0);

    console.log(`
==============================
     RINGKASAN RESERVASI
==============================
        
Total Reservasi : ${totalReservation}

Standard : ${standard}
Deluxe   : ${deluxe}
Suite    : ${suite}

Booked      : ${booked}
Checked In  : ${checkedIn}
Checked Out : ${checkedOut}
Cancelled   : ${cancelled}

Total Malam Dipesan  : ${totalNight}
Estimasi Pendapatan  : Rp${totalIncome}
(tidak termasuk yang dibatalkan)
    `);
};