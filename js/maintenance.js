document.addEventListener('DOMContentLoaded', () => {

    // Set Footer Year
    const yearEl = document.getElementById('year');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // Handle Contact Form with Formspree
    const form = document.getElementById('urgentForm');
    const msgDiv = document.getElementById('formFeedback');

    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            // Get values
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();

            if (!name || !email || !message) {
                showFeedback('Please fill out all fields.', false);
                return;
            }

            const btn = form.querySelector('button');
            const originalText = btn.textContent;
            btn.textContent = 'Sending...';
            btn.disabled = true;

            try {
                const response = await fetch("https://formspree.io/f/xvgelplq", {
                    method: "POST",
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        name: name,
                        email: email,
                        message: message
                    })
                });

                if (response.ok) {
                    showFeedback('Message sent successfully! I will reply shortly.', true);
                    form.reset();
                    btn.textContent = 'Sent';
                } else {
                    const data = await response.json();
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        showFeedback(data.errors.map(error => error.message).join(", "), false);
                    } else {
                        showFeedback('Oops! There was a problem submitting your form', false);
                    }
                    btn.textContent = 'Retry';
                }
            } catch (error) {
                showFeedback('Network error. Please try again later.', false);
                btn.textContent = 'Retry';
            } finally {
                setTimeout(() => {
                    if (btn.textContent === 'Sent') {
                        btn.textContent = originalText;
                        btn.disabled = false;
                    } else if (btn.textContent === 'Retry') {
                        btn.disabled = false;
                    }
                }, 3000);
            }
        });
    }

    function showFeedback(text, isSuccess) {
        if (!msgDiv) return;
        msgDiv.textContent = text;
        msgDiv.style.color = isSuccess ? '#4ade80' : '#f87171';

        setTimeout(() => {
            msgDiv.textContent = '';
        }, 5000);
    }
});
