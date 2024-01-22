document.addEventListener("DOMContentLoaded", function() {
    
    const updateButton = document.getElementById('update-button');
    updateButton.addEventListener('click', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      const newPassword = document.getElementById('newPassword').value;
      fetch('/users', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, newPassword })
      }).then(() => {
        alert('Password updated');
        location.reload();
      });
    });
  
    const deleteButton = document.getElementById('delete-button');
    deleteButton.addEventListener('click', function(event) {
      event.preventDefault();
      const username = document.getElementById('username').value;
      fetch('/users', {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username })
      }).then(() => {
        alert('User deleted');
        location.reload();
      });
    });
  });
  
