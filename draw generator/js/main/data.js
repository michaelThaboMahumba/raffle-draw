// Define the getUserData function
export function getUserData() {
    // Retrieve and return data from localStorage 
    const storedData = localStorage.getItem('tickets');
    return storedData ? JSON.parse(storedData) : [];
  }
  // Array to mimic a database where we'll store entered tickets
  let tickets = [];

  // Function to display tickets in the table
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

  // Function to save the entered data
  function saveData(code, name) {
    tickets.push({ code, name });
    localStorage.setItem('tickets', JSON.stringify(tickets));
  }

  // Function to handle saving the entered data and displaying it in the table
  function saveDataAndDisplay() {
    const codeValue = document.getElementById('code').value.trim();
    const nameValue = document.getElementById('name').value.trim();

    if (codeValue !== '' && nameValue !== '') {
      saveData(codeValue, nameValue);
      displayTickets();
      document.getElementById('code').value = '';
      document.getElementById('name').value = '';

      const modal = new bootstrap.Modal(document.getElementById('modalCenter'));
      modal.hide();
    } else {
      alert('Please enter both code and name.');
    }
  }
  // Function to validate code input
function validateCode() {
    const codeInput = document.getElementById('code');
    const codeError = document.getElementById('codeError');
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    const codeValue = codeInput.value.trim();
  
    if (codeValue.length > 4) {
      codeInput.classList.add('is-invalid'); // Apply Bootstrap's 'is-invalid' class
      codeError.style.display = 'block'; // Show the error message
      saveChangesBtn.disabled = true; // Disable the "Save changes" button
      return false; // Return false to indicate validation failure
    } else {
      codeInput.classList.remove('is-invalid');
      codeError.style.display = 'none';
      saveChangesBtn.disabled = false; // Enable the "Save changes" button
      return true; // Return true to indicate validation success
    }
  }
  








  
  // Event listener for the Save changes button
  document.querySelector('#modalCenter button.btn-primary').addEventListener('click', saveDataAndDisplay);

  // On page load, check if there are saved tickets in localStorage
  if (localStorage.getItem('tickets')) {
    tickets = JSON.parse(localStorage.getItem('tickets'));
    displayTickets();
  }


  // Function to delete a ticket
function deleteTicket(index) {
    if (confirm('Are you sure you want to delete this ticket?')) {
      tickets.splice(index, 1);
      localStorage.setItem('tickets', JSON.stringify(tickets));
      displayTickets();
    }
  }
  
  // Function to populate the modal with ticket data for editing
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
  
  // Event listener for editing or deleting a ticket
  document.querySelector('tbody').addEventListener('click', function(event) {
    if (event.target.classList.contains('edit_ticket')) {
      const index = event.target.closest('tr').rowIndex - 1;
      editTicket(index);
    } else if (event.target.classList.contains('delete_ticket')) {
      const index = event.target.closest('tr').rowIndex - 1;
      deleteTicket(index);
    }
  });
  
  // Function to update changes when editing a ticket
  function updateTicket(index, code, name) {
    tickets[index] = { code, name };
    localStorage.setItem('tickets', JSON.stringify(tickets));
    displayTickets();
  
    const saveChangesBtn = document.getElementById('saveChangesBtn');
    saveChangesBtn.textContent = 'Save changes';
    saveChangesBtn.dataset.index = '';
  }
  
  // Event listener for the Save changes/Update changes button in the modal
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