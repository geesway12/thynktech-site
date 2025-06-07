// footer.js – shared footer component for all ThynkTech PWAs
// -----------------------------------------------------------------------------
// Place logo variants in the same directory as this script OR adjust paths.
//   • logo-light.png  (white text for dark backgrounds)   ← we’ll use `logo1.png`
//   • logo-dark.png   (black/colored text for light bg)   ← we’ll use `lgoo2.png`
// -----------------------------------------------------------------------------
// Usage:  <script type="module" src="/assets/footer.js"></script>
//         (include on every page, ideally right before </body>)
// -----------------------------------------------------------------------------

export function injectFooter({
  lightLogo = 'logo1.png',
  darkLogo  = 'lgoo2.png',
  phone     = '+233 26 960 9634',
} = {}) {
  // Build footer element
  const footer = document.createElement('footer');
  footer.className = 'footer mt-auto py-3 bg-black text-center text-white';

  footer.innerHTML = `
    <div class="container d-flex flex-column flex-md-row align-items-center justify-content-center gap-2">
      <img src="${lightLogo}" alt="ThynkTech logo" height="38" class="footer-logo-light">
      <img src="${darkLogo}"  alt="ThynkTech logo" height="38" class="footer-logo-dark d-none">
      <span class="fw-semibold">${phone} © ${new Date().getFullYear()}</span>
    </div>`;

  document.body.appendChild(footer);

  // ---------------------------------------------------------
  // Theme‑aware logo swap: show light logo on dark theme, and
  // dark logo on light theme. Uses matchMedia.
  // ---------------------------------------------------------
  const mql = window.matchMedia('(prefers-color-scheme: dark)');
  const updateLogo = () => {
    const darkImg  = footer.querySelector('.footer-logo-dark');
    const lightImg = footer.querySelector('.footer-logo-light');
    if (mql.matches) {          // user/browser in DARK mode → show LIGHT logo
      lightImg.classList.remove('d-none');
      darkImg.classList.add('d-none');
    } else {                    // LIGHT mode → show DARK logo
      darkImg.classList.remove('d-none');
      lightImg.classList.add('d-none');
    }
  };
  updateLogo();
  mql.addEventListener('change', updateLogo);
}

// Auto inject when DOM ready
if (!window._thynkFooterInjected) {
  window._thynkFooterInjected = true;
  document.addEventListener('DOMContentLoaded', () => injectFooter());
}
