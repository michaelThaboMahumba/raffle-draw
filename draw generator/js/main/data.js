// Define the getUserData function
export function getUserData() {
	const storedData = localStorage.getItem('tickets');
	return storedData ? JSON.parse(storedData) : [];
}
let tickets = [];

function displayTickets() {
	const tableBody = document.querySelector('tbody');
	tableBody.innerHTML = '';
	tickets.forEach((ticket, index) => {
		const newRow = document.createElement('tr');
		newRow.innerHTML = `
        <td class="text-center">${index + 1}</td>
        <td>${ticket.code}</td>
        <td>${ticket.name}</td>
        <td class="text-center">
          <div class="btn-group btn-group-sm">
            <button class="btn btn-outline-primary rounded-0 btn-sm edit_ticket" type="button"><i class="fa-solid fa-edit"></i></button>
            <button class="btn btn-outline-danger rounded-0 btn-sm delete_ticket"  type="button"><i class="fa-solid fa-trash"></i></button>
          </div>
        </td>
      `;
		tableBody.appendChild(newRow);
	});
}

function saveData(code, name) {
	tickets.push({
		code,
		name
	});
	localStorage.setItem('tickets', JSON.stringify(tickets));
}

function hideModal() {
	const modal = new bootstrap.Modal(document.getElementById('modalCenter'));
	modal.hide();
}

function saveDataAndDisplay() {
	const codeValue = document.getElementById('code').value.trim();
	const nameValue = document.getElementById('name').value.trim();
	if (codeValue !== '' && nameValue !== '') {
		saveData(codeValue, nameValue);
		displayTickets();
		document.getElementById('code').value = '';
		document.getElementById('name').value = '';
		hideModal();
	} else {
		const message = document.getElementById('msg');
		message.innerHTML = '<p></p>';
	}
}

function validateCode() {
	const codeInput = document.getElementById('code');
	const codeError = document.getElementById('codeError');
	const saveChangesBtn = document.getElementById('saveChangesBtn');
	const codeValue = codeInput.value.trim();
	if (codeValue.length !== 4) {
		codeInput.classList.add('is-invalid');
		codeError.style.display = 'block';
		saveChangesBtn.disabled = true;
		return false;
	} else {
		codeInput.classList.remove('is-invalid');
		codeError.style.display = 'none';
		return true;
	}
}

function validateName() {
	const nameInput = document.getElementById('name');
	const nameError = document.getElementById('nameError');
	const nameValue = nameInput.value.trim();
	const nameRegex = /^[A-Z][a-zA-Z]*$/;
	if (!nameRegex.test(nameValue)) {
		nameInput.classList.add('is-invalid');
		nameError.style.display = 'block';
		return false;
	} else {
		nameInput.classList.remove('is-invalid');
		nameError.style.display = 'none';
		return true;
	}
}

function validateAndSave() {
	const isCodeValid = validateCode();
	const isNameValid = validateName();
	if (isCodeValid && isNameValid) {
		saveDataAndDisplay();
	} else {
		alert('Please enter a valid code (exactly 4 digits) and a name starting with a capital letter.');
	}
}
document.getElementById('code').addEventListener('input', validateCode);
document.getElementById('name').addEventListener('input', validateName);
document.querySelector('#modalCenter button.btn-primary').addEventListener('click', validateAndSave);
if (localStorage.getItem('tickets')) {
	tickets = JSON.parse(localStorage.getItem('tickets'));
	displayTickets();
}

function enableSaveButton() {
	const codeValue = document.getElementById('code').value.trim();
	const nameValue = document.getElementById('name').value.trim();
	const saveChangesBtn = document.getElementById('saveChangesBtn');
	const isCodeValid = codeValue.length === 4;
	const isNameValid = /^[A-Z][a-zA-Z]*$/.test(nameValue);
	saveChangesBtn.disabled = !(isCodeValid && isNameValid);
}
document.getElementById('code').addEventListener('input', function() {
	enableSaveButton();
});
document.getElementById('name').addEventListener('input', function() {
	enableSaveButton();
});
document.querySelector('#modalCenter button.btn-primary').addEventListener('click', validateAndSave);

function deleteTicket(index) {
	if (confirm('Are you sure you want to delete this ticket?')) {
		tickets.splice(index, 1);
		localStorage.setItem('tickets', JSON.stringify(tickets));
		displayTickets();
	}
}

function editTicket(index) {
	const ticket = tickets[index];
	const codeInput = document.getElementById('code');
	const nameInput = document.getElementById('name');
	codeInput.value = ticket.code;
	nameInput.value = ticket.name;
	const saveChangesBtn = document.getElementById('saveChangesBtn');
	saveChangesBtn.textContent = 'Update changes';
	saveChangesBtn.dataset.index = index;
	const modal = new bootstrap.Modal(document.getElementById('modalCenter'));
	modal.show();
}
document.querySelector('tbody').addEventListener('click', function(event) {
	if (event.target.classList.contains('edit_ticket')) {
		const index = event.target.closest('tr').rowIndex - 1;
		editTicket(index);
	} else if (event.target.classList.contains('delete_ticket')) {
		const index = event.target.closest('tr').rowIndex - 1;
		deleteTicket(index);
	}
});

function updateTicket(index, code, name) {
	tickets[index] = {
		code,
		name
	};
	localStorage.setItem('tickets', JSON.stringify(tickets));
	displayTickets();
	const saveChangesBtn = document.getElementById('saveChangesBtn');
	saveChangesBtn.textContent = 'Save changes';
	saveChangesBtn.dataset.index = '';
}
document.getElementById('saveChangesBtn').addEventListener('click', function() {
	const codeValue = document.getElementById('code').value.trim();
	const nameValue = document.getElementById('name').value.trim();
	const index = parseInt(this.dataset.index);
	if (index !== undefined && !isNaN(index)) {
		updateTicket(index, codeValue, nameValue);
	} else {
		saveDataAndDisplay();
	}
});