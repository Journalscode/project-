#  Sharing file local 

### Tujuan Project 
Membuat aplikasi berbasis web yang memungkinkan pengguna mengunggah dan mengunduh file melalui antarmuka browser, dengan server Express.js berjalan di sistem operasi Debian Server (Oracle VM) dan client menggunakan Pop!_OS.

### Konsep dan Cara Kerja 
- Client (Pop Os ) : Mengakses halaman ./public/index.html
dan melakukan download file melalui http.

- server (Debian os) : Menjalankan Aplikasi Express.js  yang menangani upload file, lalu menimpan nya di folder uploads/, dan melayani permintaan download serta daftar file.

### Alur Kerja 
- Client membuka http:<ip-debian>:3000 di browser.


- User memilih file dan menekan tombol Upload.

- Server menyimpan file secara lokal dan merespons sukses.

- Halaman client menampilkan daftar semua file yang tersedia.

- User bisa klik nama file untuk mendownload dari server.


### Teknologi Yang Digunakan
| Komponen     | Teknologi/Library                 |
| ------------ | --------------------------------- |
| Backend      | Node.js, Express.js               |
| Upload File  | `multer` (middleware upload)      |
| Frontend     | HTML, CSS, JavaScript (fetch API) |
| Tampilan     | Static HTML (tanpa EJS)           |
| Deployment   | Server Debian di Oracle VM        |
| Akses Client | Browser di Pop!\_OS               |


