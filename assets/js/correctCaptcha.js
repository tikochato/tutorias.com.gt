window.onload = function () {
  document.getElementById("submitForm").setAttribute('disabled', 'true');
}

function correctCaptcha() {
  document.getElementById("submitForm").removeAttribute('disabled');
}