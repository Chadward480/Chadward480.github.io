(function () {
  var invoices = [
    { number: 'INV-1001', customer: 'Ada Lovelace', amount: 2450, due: '2026-09-15', status: 'Open' },
    { number: 'INV-1002', customer: 'Grace Hopper', amount: 830, due: '2026-08-10', status: 'Open' },
    { number: 'INV-1003', customer: 'Alan Turing', amount: 15900, due: '2026-10-01', status: 'Open' },
    { number: 'INV-1004', customer: 'Margaret Hamilton', amount: 620, due: '2025-01-05', status: 'Overdue' }
  ];
  var current = null;

  function todayStr() { return new Date().toISOString().split('T')[0]; }

  function showErrors(box, msgs) {
    box.innerHTML = '';
    msgs.forEach(function (m) {
      var p = document.createElement('p');
      p.className = 'alert-error';
      p.textContent = m;
      box.appendChild(p);
    });
  }

  function renderList() {
    document.querySelector('section.list-view').hidden = false;
    document.querySelector('section.detail-view').hidden = true;
    var body = document.querySelector('table.invoice-table tbody');
    body.innerHTML = '';
    invoices.forEach(function (inv) {
      var tr = document.createElement('tr');
      tr.className = 'invoice-row';
      tr.innerHTML =
        '<td class="cell-number"></td><td class="cell-customer"></td><td class="cell-amount"></td>' +
        '<td class="cell-due"></td>' +
        '<td class="cell-status"><span class="badge badge-' + inv.status.toLowerCase() + '">' + inv.status + '</span></td>' +
        '<td class="cell-actions"><button class="btn btn-view" type="button">View</button></td>';
      tr.querySelector('.cell-number').textContent = inv.number;
      tr.querySelector('.cell-customer').textContent = inv.customer;
      tr.querySelector('.cell-amount').textContent = '$' + inv.amount;
      tr.querySelector('.cell-due').textContent = inv.due;
      tr.querySelector('.btn-view').addEventListener('click', function () { openDetail(inv); });
      body.appendChild(tr);
    });
  }

  function openDetail(inv) {
    current = inv;
    document.querySelector('section.list-view').hidden = true;
    document.querySelector('section.detail-view').hidden = false;
    document.querySelector('span.detail-number').textContent = inv.number;
    document.querySelector('span.detail-customer').textContent = inv.customer;
    document.querySelector('input.amount-input').value = inv.amount;
    document.querySelector('input.due-date-input').value = inv.due;
    document.querySelector('div.pay-errors').innerHTML = '';
    document.querySelector('div.pay-success').hidden = true;
  }

  document.querySelector('button.btn-back').addEventListener('click', renderList);

  document.querySelector('button.pay-btn').addEventListener('click', function () {
    var amt = parseFloat(document.querySelector('input.amount-input').value);
    var due = document.querySelector('input.due-date-input').value;
    var box = document.querySelector('div.pay-errors');
    var msgs = [];
    if (isNaN(amt) || amt <= 0) msgs.push('Amount must be greater than zero');
    else if (amt > 10000) msgs.push('Amount exceeds the maximum allowed (10000)');
    if (!due) msgs.push('Due date is required');
    else if (due < todayStr()) msgs.push('Due date must be in the future');
    if (msgs.length) { showErrors(box, msgs); return; }

    var btn = document.querySelector('button.pay-btn');
    btn.disabled = true;
    btn.textContent = 'Processing...';
    setTimeout(function () {
      current.status = 'Paid';
      current.amount = amt;
      current.due = due;
      btn.disabled = false;
      btn.textContent = 'Pay invoice';
      var success = document.querySelector('div.pay-success');
      success.textContent = 'Payment of $' + amt + ' for ' + current.number + ' processed successfully.';
      success.hidden = false;
    }, 1500);
  });

  renderList();
})();
