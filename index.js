const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const archiver = require('archiver');

const app = express();
const PORT = 3000;
const uploadDir = path.join(__dirname, 'uploads');

// Pastikan folder uploads ada
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Konfigurasi multer 
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, uploadDir),
  filename: (req, file, cb) => cb(null, Date.now() + '-' + file.originalname)
});
const upload = multer({ storage });

app.use(express.static('public'));
app.use('/uploads', express.static('uploads'));

// Upload file
app.post('/upload', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ status: 'fail', message: 'Tidak ada file' });
  }
  res.json({ status: 'success', filename: req.file.filename });
});

// List file
app.get('/files', (req, res) => {
  fs.readdir(uploadDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Gagal membaca folder' });
    res.json(files);
  });
});

// Download file
app.get('/download/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File tidak ditemukan' });
  }
  res.download(filePath);
});

// Hapus file
app.delete('/delete/:filename', (req, res) => {
  const filePath = path.join(uploadDir, req.params.filename);
  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File tidak ditemukan' });
  }
  fs.unlink(filePath, (err) => {
    if (err) return res.status(500).json({ error: 'Gagal menghapus file' });
    res.json({ status: 'success', message: 'File dihapus' });
  });
});

// Download semua file sebagai ZIP
app.get('/download-all', (req, res) => {
  res.setHeader('Content-Disposition', 'attachment; filename="all-files.zip"');
  res.setHeader('Content-Type', 'application/zip');

  const archive = archiver('zip', { zlib: { level: 9 } });
  archive.pipe(res);
  archive.directory(uploadDir, false);
  archive.finalize();
});

app.listen(PORT, () => {
  console.log(`Aplikasi berjalan di http://localhost:${PORT}`);
});
