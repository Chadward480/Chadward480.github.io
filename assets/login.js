(function () {
  var VALID_EMAIL = 'demo@test.com';
  var VALID_PASSWORD = 'Demo123!';

  function showErrors(msgs) {
    var box = document.querySelector('div.error-list');
    box.innerHTML = '';
    msgs.forEach(function (m) {
      var p = document.createElement('p');
      p.className = 'alert-error';
      p.textContent = m;
      box.appendChild(p);
    });
  }

  document.querySelector('form.login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    var email = document.querySelector('input.email-input').value.trim();
    var password = document.querySelector('input.password-input').value;
    var msgs = [];

    if (!email) msgs.push('Email is required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) msgs.push('Enter a valid email address');
    if (!password) msgs.push('Password is required');

    if (msgs.length) { showErrors(msgs); return; }

    if (email !== VALID_EMAIL || password !== VALID_PASSWORD) {
      showErrors(['Invalid email or password']);
      return;
    }

    var btn = document.querySelector('button.submit-btn');
    btn.disabled = true;
    btn.textContent = 'Signing in...';
    setTimeout(function () { window.location.href = 'dashboard.html'; }, 1200);
  });
})();
