
function showDialog() {
  // if ((loginStatus === "idle") || (loginStatus === "finished"))
  document.getElementById('overlay').style.display = 'flex';
  // console.log('here');
}

function closeDialog() {
  document.getElementById('overlay').style.display = 'none';
  location.reload();

}