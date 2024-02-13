document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the API
    fetch('http://localhost:8083/api/get-all-users')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the API response is an array of subscribers
        const users = data.users; // Access the 'users' array

        // Store the data in a variable
        window.subscribersData = users;

        // Display the data in the HTML
        const subMainElement = document.querySelector('.sub-main');
        if (users.length > 0) {
          const userListHTML = users
            .filter(user => user.role === 'user') // Filter only users with role 'user'
            .map(user => `<li>Email: ${user.email}</li> <li>Role: ${user.role}</li> </br>` )
            .join('');

          if (userListHTML) {
            subMainElement.innerHTML = `<ul>${userListHTML}</ul>`;
          } else {
            subMainElement.innerHTML = '<p>No subscribers found with role "user".</p>';
          }
        } else {
          subMainElement.innerHTML = '<p>No subscribers found.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching subscribers:', error);
      });
  });
