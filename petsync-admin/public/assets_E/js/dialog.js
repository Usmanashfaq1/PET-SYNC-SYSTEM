
function showDialog() {
  document.getElementById('overlay').style.display = 'flex';
}


function closeDialog() {
  document.getElementById('overlay').style.display = 'none';
  location.reload();

}


function showDialog_new_page() {
  document.getElementById('overlay').style.display = 'flex';
}


function closeDialog_new_page() {
  document.getElementById('overlay').style.display = 'none';
  setTimeout(() => {
    window.location.href = '/edit_product';
}, 500);   
}


function showDialog_donot_reload() {
  document.getElementById('overlay').style.display = 'flex';
}


function closeDialog_donot_reload() {
  document.getElementById('overlay').style.display = 'none';  
}