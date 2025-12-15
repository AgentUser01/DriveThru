/**
 * Age Verification Gate
 * Ensures compliance with Canadian age-restricted product laws
 */

class AgeGate {
  constructor() {
    this.storageKey = 'drivethru_age_verified';
    this.requiredAge = 18;
    this.modalShown = false; // Prevent multiple shows
    this.init();
  }

  init() {
    // Check if user has already verified their age
    if (!this.isVerified() && !this.modalShown) {
      this.showModal();
      this.modalShown = true;
    }
  }

  isVerified() {
    try {
      const verified = localStorage.getItem(this.storageKey);
      if (!verified) return false;

      // Check if verification is still valid (expires after 30 days)
      const verificationData = JSON.parse(verified);
      const thirtyDaysAgo = Date.now() - (30 * 24 * 60 * 60 * 1000);
      return verificationData.timestamp > thirtyDaysAgo;
    } catch (error) {
      console.error('Error checking age verification:', error);
      return false;
    }
  }

  showModal() {
    // Double-check we haven't already shown it
    if (this.modalShown) return;
    
    const modal = document.getElementById('age-gate-modal');
    if (modal) {
      modal.classList.remove('hidden');
      document.body.style.overflow = 'hidden';
      
      // Set focus to modal for accessibility
      modal.setAttribute('aria-hidden', 'false');
      const firstFocusable = modal.querySelector('button, input, select');
      if (firstFocusable) {
        setTimeout(() => firstFocusable.focus(), 100);
      }
      this.modalShown = true;
    }
  }

  hideModal() {
    const modal = document.getElementById('age-gate-modal');
    if (modal) {
      modal.classList.add('hidden');
      document.body.style.overflow = '';
      modal.setAttribute('aria-hidden', 'true');
    }
  }

  handleVerification(isOfAge) {
    if (isOfAge) {
      // Store verification with timestamp
      try {
        localStorage.setItem(this.storageKey, JSON.stringify({
          verified: true,
          timestamp: Date.now()
        }));
        console.log('Age verification saved successfully');
        this.hideModal();
        return true;
      } catch (error) {
        console.error('Error saving age verification:', error);
        alert('Unable to save verification. Please check browser settings.');
        return false;
      }
    } else {
      this.showDeniedMessage();
      return false;
    }
  }

  showDeniedMessage() {
    const errorMsg = document.getElementById('age-gate-error');
    if (errorMsg) {
      errorMsg.classList.remove('hidden');
      errorMsg.setAttribute('role', 'alert');
    }
  }

  redirectUnderage() {
    // Redirect to a "Sorry, you must be 18+" page
    window.location.href = 'about:blank';
  }
}

// Initialize age gate when DOM is loaded - only once
let ageGateInstance = null;

document.addEventListener('DOMContentLoaded', () => {
  // Prevent multiple initializations
  if (ageGateInstance) return;
  
  ageGateInstance = new AgeGate();
  
  // Handle "Yes, I'm 18+" button
  const confirmBtn = document.getElementById('age-gate-confirm');
  if (confirmBtn) {
    confirmBtn.addEventListener('click', () => {
      console.log('Age confirmed');
      ageGateInstance.handleVerification(true);
    }, { once: true }); // Only fire once
  }
  
  // Handle "No, I'm under 18" button
  const declineBtn = document.getElementById('age-gate-decline');
  if (declineBtn) {
    declineBtn.addEventListener('click', () => {
      console.log('Age declined');
      if (!ageGateInstance.handleVerification(false)) {
        setTimeout(() => {
          ageGateInstance.redirectUnderage();
        }, 3000);
      }
    }, { once: true }); // Only fire once
  }
});

