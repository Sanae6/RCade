async function init() {
  const versions = await window.rcade.getVersions();
  const el = document.getElementById('versions');
  if (el) {
    el.textContent = `Electron ${versions.electron} | Chrome ${versions.chrome} | Node ${versions.node}`;
  }
}

init().catch(console.error);
