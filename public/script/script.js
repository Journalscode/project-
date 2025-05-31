document.getElementById('uploadForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const fileInput = this.querySelector('input[type="file"]');
  const formData = new FormData();
  formData.append('file', fileInput.files[0]);

  const res = await fetch('/upload', {
    method: 'POST',
    body: formData
  });

  const data = await res.json();

  if (data.status === 'success') {
    // Akan Redirect ke halaman download
    window.location.href = `/download.html?file=${encodeURIComponent(data.filename)}`;
  } else {
    alert('Upload gagal!');
  }
});
