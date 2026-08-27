(function () {
  var CURRENT = 'Demo123!';
  var toastTimer = null;

  function showToast(msg) {
    var toast = document.querySelector('div.toast');
    toast.textContent = msg;
    toast.hidden = false;
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toast.hidden = true; }, 3000);
  }

  document.querySelector('button.save-btn').addEventListener('click', function () {
    var box = document.querySelector('div.password-errors');
    box.innerHTML = '';
    var cur = document.querySelector('input.current-pw').value;
    var next = document.querySelector('input.new-pw').value;
    var confirm = document.querySelector('input.confirm-pw').value;
    var msgs = [];
    if (!cur) msgs.push('Current password is required');
    else if (cur !== CURRENT) msgs.push('Current password is incorrect');
    if (!next) msgs.push('New password is required');
    else {
      if (next.length < 8) msgs.push('New password must be at least 8 characters');
      if (!/[0-9]/.test(next)) msgs.push('New password must contain at least one number');
      if (next === cur) msgs.push('New password must differ from the current password');
    }
    if (confirm !== next) msgs.push('Passwords do not match');
    if (msgs.length) {
      msgs.forEach(function (m) {
        var p = document.createElement('p');
        p.className = 'alert-error';
        p.textContent = m;
        box.appendChild(p);
      });
      return;
    }
    document.querySelectorAll('input.current-pw, input.new-pw, input.confirm-pw').forEach(function (i) { i.value = ''; });
    showToast('Password updated successfully');
  });
})();
