// Initialize EmailJS with your Public Key
(function() {
  // Replace with your actual EmailJS Public Key
  emailjs.init("SO55_xKnTenkgRzt2");
})();

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.querySelector('.submit-btn');
  const statusDiv = document.getElementById('form-status');
  
  contactForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show loading state
      submitBtn.disabled = true;
      statusDiv.style.display = 'none';
      
      // Get form data
      const formData = new FormData(this);
      const templateParams = {
          from_name: formData.get('name'),
          from_email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message')
      };
      
      // Validate form data
      if (!templateParams.from_name || !templateParams.from_email || 
          !templateParams.subject || !templateParams.message) {
          showError("Please fill in all fields");
          return;
      }
      
      // Send email using EmailJS
      // Replace with your actual Service ID and Template ID
      emailjs.send('service_gmail_portfolio', 'template_t8fakfz', templateParams)
          .then(function(response) {
              showSuccess("Message sent successfully!");
              contactForm.reset();
          }, function(error) {
              console.error("EmailJS failed:", error);
              showError("Failed to send message. Please try again later or email me directly at ahmed.tamer.dev@gmail.com");
          })
          .finally(function() {
              resetButton();
          });
  });
  
  function showError(message) {
      statusDiv.innerHTML = `<div class="error-message">❌ ${message}</div>`;
      statusDiv.style.display = 'block';
      resetButton();
      
      setTimeout(() => {
          statusDiv.style.display = 'none';
      }, 5000);
  }
  
  function showSuccess(message) {
      statusDiv.innerHTML = `<div class="success-message">✅ ${message}</div>`;
      statusDiv.style.display = 'block';
      
      setTimeout(() => {
          statusDiv.style.display = 'none';
      }, 5000);
  }
  
  function resetButton() {
      submitBtn.disabled = false;
  }
});