const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 3000;
const uploadDir = path.join(__dirname, 'uploads');

// Konfigurasi multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// upload  file 
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'fail', message: 'Tidak ada file' });
  }
  res.json({ status: 'success', filename: req.file.filename });
});


// Ambil daftar file
app.get('/files', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Gagal membaca folder' });
    res.json(files);
  });
});

// Download file
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  res.download(filePath);
});

app.listen(PORT, () => {
  console.log(`Aplikasi berjalan di host http://localhost:${PORT}`);
});
