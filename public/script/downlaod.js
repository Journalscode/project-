// script.js
async function loadFiles() {
  const res = await fetch('/files');
  const files = await res.json();
  const fileList = document.getElementById('fileList');
  fileList.innerHTML = '';

  files.forEach(file => {
    const li = document.createElement('li');
    li.innerHTML = `<a href="/download.html?file=${file}">${file}</a>`;
    fileList.appendChild(li);
  });
}
