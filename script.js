// Typing Effect
const textArray = [ "Developer", "Designer", "Creator",  ];
let i = 0;
let j = 0;
let currentText = "";
let isDeleting = false;

function typeEffect() {
  currentText = textArray[i];

  if (!isDeleting) {
    document.getElementById("typing").textContent = currentText.slice(0, j++);
    if (j > currentText.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1000); 
      return;
    }
  } else {
    document.getElementById("typing").textContent = currentText.slice(0, j--);
    if (j < 0) {
      isDeleting = false;
      i = (i + 1) % textArray.length; 
    }
  }
  setTimeout(typeEffect, 150);
}
typeEffect();
// Smooth Scroll Navigation
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener("click", function(e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth"
    });
  });
});

//progress bar
  const progressBars = document.querySelectorAll('.progress');

  const animateBars = () => {
    progressBars.forEach(bar => {
      const targetWidth = bar.getAttribute('data-width');
      bar.style.width = targetWidth;
    });
  };

  const aboutSection = document.querySelector('#about');

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateBars();
        observer.unobserve(aboutSection); 
      }
    });
  }, { threshold: 0.5 });

  observer.observe(aboutSection);

// Contact Form Submission
document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('contact-form');
  const messageDiv = document.getElementById('form-message');

  if (!form || !messageDiv) {
    console.warn('Contact form or message div not found.');
    return;
  }

  const showMessage = (text, type = 'success', autoHide = true) => {
    messageDiv.textContent = text;
    messageDiv.classList.remove('success', 'error');
    messageDiv.classList.add(type, 'visible');

    if (autoHide) {
      setTimeout(() => {
        messageDiv.classList.remove('visible', 'success', 'error');
        messageDiv.textContent = '';
      }, 5000); 
    }
  };

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // show immediate feedback (sending...)
    showMessage('Sending…', ''); 

    const data = new FormData(form);

    try {
      const resp = await fetch(form.action, {
        method: form.method,
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (resp.ok) {
        showMessage('✅ Your message has been delivered. Thank you!', 'success', true);
        form.reset();
      } else {
        
        const json = await resp.json().catch(() => null);
        if (json && json.errors) {
          const msgs = json.errors.map(e => e.message).join('; ');
          showMessage('❌ ' + msgs, 'error', true);
        } else {
          showMessage('❌ Oops — something went wrong. Please try again.', 'error', true);
        }
      }
    } catch (err) {
      console.error('Form submit error:', err);
      showMessage('❌ Network error. Please check your connection and try again.', 'error', true);
    }
  });
});

// hamburger
const menuToggle = document.getElementById('menu-toggle');
const sidebar = document.getElementById('sidebar');

menuToggle.addEventListener('click', () => {
  sidebar.classList.toggle('active');
});

// Close sidebar when u click any sidebar link 
const sidebarLinks = document.querySelectorAll('.sidebar a');
sidebarLinks.forEach(link => {
  link.addEventListener('click', () => {
    sidebar.classList.remove('active');
  });
});

// Close sidebar when u clicking anywhere 
document.addEventListener('click', (e) => {
  if (
    sidebar.classList.contains('active') &&      
    !sidebar.contains(e.target) &&              
    !menuToggle.contains(e.target)              
  ) {
    sidebar.classList.remove('active');
  }
});
  // copyright year
  document.getElementById('footer-year').textContent = new Date().getFullYear();

  // back-to-top behavior
  document.getElementById('back-to-top').addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
