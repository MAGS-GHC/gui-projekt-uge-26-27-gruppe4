function loginUser(event) {
  event.preventDefault();

  const email = document.getElementById('loginEmail').value;
  const password = document.getElementById('loginPassword').value;

  const loginData = {
    email,
    password
  };

  console.log(loginData);

  fetch('https://gui-projekt-uge-26-27-gruppe4-pxy7m5opzq-lz.a.run.app/usersVFF/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(loginData)
  })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      console.log(data.message);
      console.log('Login Response:', data);

      if (data.message === 'Login successful') {
        fetch('https://gui-projekt-uge-26-27-gruppe4-pxy7m5opzq-lz.a.run.app/usersVFF')
          .then(response => response.json())
          .then(users => {
            const user = users.find(user => user.email === email);
            if (user) {
              // Save the logged-in user in local storage
              localStorage.setItem('loggedInUser', JSON.stringify(user));
              window.location.href = 'menu';
            } else {
              console.error('User not found in the database');
            }
          })
          .catch(error => {
            console.error('Error:', error);
          });
      }
    })
    .catch(error => {
      console.error('Error logging in:', error);
    });
}
