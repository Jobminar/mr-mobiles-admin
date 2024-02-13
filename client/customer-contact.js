document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the API
    fetch('http://localhost:8083/api/get-contact-messages')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the API response is an object with a 'contactMessages' property
        const contactMessages = data.contactMessages; // Access the 'contactMessages' array

        // Store the data in a variable
        window.contactData = contactMessages;

        // Display the data in the HTML
        const contactMainElement = document.querySelector('.contact-main');
        if (contactMessages.length > 0) {
          const contactListHTML = contactMessages
            .map(contact => 
              `<li>Name: ${contact.name}</li>
               <li>Email: ${contact.email}</li>
               <li>Phone: ${contact.phone_number}</li>
               <li>Subject: ${contact.msg_subject}</li>
               <li>Message: ${contact.message}</li>
               <br>`
            )
            .join('');

          if (contactListHTML) {
            contactMainElement.innerHTML = `<ul>${contactListHTML}</ul>`;
          } else {
            contactMainElement.innerHTML = '<p>No contact messages found.</p>';
          }
        } else {
          contactMainElement.innerHTML = '<p>No contact messages found.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching contact messages:', error);
      });
  });
