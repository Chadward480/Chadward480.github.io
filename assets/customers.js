(function () {
  var customers = [
    { name: 'Ada Lovelace', email: 'ada@example.com', company: 'Analytical Engines Ltd', status: 'Active' },
    { name: 'Grace Hopper', email: 'grace@example.com', company: 'Navy Systems', status: 'Active' },
    { name: 'Alan Turing', email: 'alan@example.com', company: 'Bletchley Works', status: 'Inactive' },
    { name: 'Margaret Hamilton', email: 'margaret@example.com', company: 'Apollo Software', status: 'Active' },
    { name: 'Donald Knuth', email: 'donald@example.com', company: 'TeX Labs', status: 'Inactive' }
  ];
  var editingName = null;

  function showErrors(box, msgs) {
    box.innerHTML = '';
    msgs.forEach(function (m) {
      var p = document.createElement('p');
      p.className = 'alert-error';
      p.textContent = m;
      box.appendChild(p);
    });
  }

  function renderTable(list) {
    var body = document.querySelector('table.customer-table tbody');
    body.innerHTML = '';
    document.querySelector('div.no-results').hidden = list.length > 0;
    list.forEach(function (c) {
      var tr = document.createElement('tr');
      tr.className = 'customer-row';
      tr.innerHTML =
        '<td class="cell-name"></td>' +
        '<td class="cell-email"></td>' +
        '<td class="cell-company"></td>' +
        '<td class="cell-status"><span class="badge badge-' + c.status.toLowerCase() + '">' + c.status + '</span></td>' +
        '<td class="cell-actions">' +
          '<button class="btn btn-edit" type="button">Edit</button> ' +
          '<button class="btn btn-delete" type="button">Delete</button>' +
        '</td>';
      tr.querySelector('.cell-name').textContent = c.name;
      tr.querySelector('.cell-email').textContent = c.email;
      tr.querySelector('.cell-company').textContent = c.company;
      tr.querySelector('.btn-edit').addEventListener('click', function () { openEdit(c); });
      tr.querySelector('.btn-delete').addEventListener('click', function () { openDelete(c); });
      body.appendChild(tr);
    });
  }

  function render() {
    var term = document.querySelector('input.search-input').value.trim().toLowerCase();
    var filtered = customers.filter(function (c) {
      return !term || c.name.toLowerCase().indexOf(term) !== -1 || c.email.toLowerCase().indexOf(term) !== -1;
    });
    renderTable(filtered);
  }

  document.querySelector('input.search-input').addEventListener('input', render);

  var addForm = document.querySelector('form.add-form');
  var addBtn = document.querySelector('button.btn-primary:not(.edit-save)');
  addBtn.addEventListener('click', function () { addForm.hidden = !addForm.hidden; });
  addForm.querySelector('.btn-cancel').addEventListener('click', function () { addForm.hidden = true; });

  addForm.addEventListener('submit', function (e) {
    e.preventDefault();
    var name = addForm.querySelector('.name-input').value.trim();
    var email = addForm.querySelector('.email-input').value.trim();
    var company = addForm.querySelector('.company-input').value.trim();
    var msgs = [];
    if (!name) msgs.push('Name is required');
    if (!email) msgs.push('Email is required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) msgs.push('Enter a valid email address');
    if (name && customers.some(function (c) { return c.name.toLowerCase() === name.toLowerCase(); })) {
      msgs.push('A customer with this name already exists');
    }
    if (msgs.length) { showErrors(addForm.querySelector('.form-errors'), msgs); return; }
    customers.push({ name: name, email: email, company: company, status: 'Active' });
    addForm.reset();
    addForm.querySelector('.form-errors').innerHTML = '';
    addForm.hidden = true;
    render();
  });

  var editPanel = document.querySelector('section.edit-panel');
  function openEdit(c) {
    editingName = c.name;
    editPanel.hidden = false;
    editPanel.querySelector('h3').textContent = 'Edit customer: ' + c.name;
    editPanel.querySelector('.name-input').value = c.name;
    editPanel.querySelector('.email-input').value = c.email;
    editPanel.querySelector('.company-input').value = c.company;
    editPanel.querySelector('.form-errors').innerHTML = '';
    window.scrollTo(0, 0);
  }
  editPanel.querySelector('.edit-cancel').addEventListener('click', function () { editPanel.hidden = true; });
  editPanel.querySelector('.edit-save').addEventListener('click', function () {
    var name = editPanel.querySelector('.name-input').value.trim();
    var email = editPanel.querySelector('.email-input').value.trim();
    var company = editPanel.querySelector('.company-input').value.trim();
    var msgs = [];
    if (!name) msgs.push('Name is required');
    if (!email) msgs.push('Email is required');
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) msgs.push('Enter a valid email address');
    if (msgs.length) { showErrors(editPanel.querySelector('.form-errors'), msgs); return; }
    var c = customers.find(function (x) { return x.name === editingName; });
    c.name = name; c.email = email; c.company = company;
    editingName = null;
    editPanel.hidden = true;
    render();
  });

  var modal = document.querySelector('div.modal-overlay');
  function openDelete(c) {
    modal.querySelector('.modal-name').textContent = c.name;
    modal.hidden = false;
  }
  modal.querySelector('.modal-cancel').addEventListener('click', function () { modal.hidden = true; });
  modal.querySelector('.modal-confirm').addEventListener('click', function () {
    var name = modal.querySelector('.modal-name').textContent;
    customers = customers.filter(function (x) { return x.name !== name; });
    modal.hidden = true;
    render();
  });

  render();
})();
