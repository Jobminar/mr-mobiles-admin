document.addEventListener("DOMContentLoaded", function () {
    // Fetch data from the API
    fetch('http://localhost:8083/api/get-faq')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        // Assuming the API response is an object with a 'faqs' property
        const faqs = data.faqs; // Access the 'faqs' array

        // Store the data in a variable
        window.faqData = faqs;

        // Display the data in the HTML
        const faqMainElement = document.querySelector('.faq-main');
        if (faqs.length > 0) {
          const faqListHTML = faqs
            .map(faq => 
              `<li>Name: ${faq.name}</li>
               <li>Email: ${faq.email}</li>
               <li>Phone: ${faq.phone}</li>
               <li>Question: ${faq.question}</li>
               <li>Message: ${faq.message ? faq.message : 'N/A'}</li>
               <br>`
            )
            .join('');

          if (faqListHTML) {
            faqMainElement.innerHTML = `<ul>${faqListHTML}</ul>`;
          } else {
            faqMainElement.innerHTML = '<p>No FAQs found.</p>';
          }
        } else {
          faqMainElement.innerHTML = '<p>No FAQs found.</p>';
        }
      })
      .catch(error => {
        console.error('Error fetching FAQs:', error);
      });
  });
