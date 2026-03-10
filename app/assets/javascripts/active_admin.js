// Active Admin with Turbo compatibility
// This file handles delete confirmations since jQuery UJS doesn't work with Turbo

document.addEventListener('DOMContentLoaded', function() {
  // Handle delete links with data-method="delete"
  document.addEventListener('click', function(event) {
    const link = event.target.closest('a[data-method="delete"]');
    if (!link) return;

    event.preventDefault();
    event.stopPropagation();

    const message = link.getAttribute('data-confirm') || 'Are you sure?';

    if (confirm(message)) {
      // Create a form and submit it as DELETE
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = link.href;
      form.style.display = 'none';

      // Add CSRF token
      const csrfToken = document.querySelector('meta[name="csrf-token"]');
      if (csrfToken) {
        const csrfInput = document.createElement('input');
        csrfInput.type = 'hidden';
        csrfInput.name = 'authenticity_token';
        csrfInput.value = csrfToken.content;
        form.appendChild(csrfInput);
      }

      // Add _method hidden field for DELETE
      const methodInput = document.createElement('input');
      methodInput.type = 'hidden';
      methodInput.name = '_method';
      methodInput.value = 'delete';
      form.appendChild(methodInput);

      document.body.appendChild(form);
      form.submit();
    }
  }, true);
});
