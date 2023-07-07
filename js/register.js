document.getElementById('registerForm').addEventListener('submit', registerUser);
const errorMSG = document.getElementById('errorMessage');



function registerUser(event) {
    event.preventDefault();
  
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const number = document.getElementById('number').value;
    const password = document.getElementById('password').value;
  
    const userData = {
      name,
      email,
      number,
      password
    };
  
    console.log(userData)
  
      fetch('https://helloworld-pxy7m5opzq-lz.a.run.app/usersVFF/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      })
        .then(response => response.json())
        .then(data => {
          console.log(data.message);
          if (data.message === 'User registered successfully') {
            alert('User was created. You will be redirected in 2 seconds.');                
            setTimeout(() => {
              window.location.href = '../menu/index.html';
            }, 2000);
          }
          if (data.message === 'Email already exists') {
            errorMSG.innerHTML = `<p>Email already exists. Click <a href="../">here</a> to log in.</p>`;
          }            
        })
        .catch(error => {
          console.error('Error:', error);
        });
      
  }