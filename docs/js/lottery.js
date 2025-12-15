/**
 * Lottery / Slot Machine Logic
 * - Allows UNLIMITED spins per user for fun
 * - Simulates a 1 in 50 win probability
 */

class LotteryMachine {
  constructor() {
    this.isSpinning = false;
    this.winProbability = 0.02; // 1 in 50 chance (2%)
    
    // DOM Elements
    this.spinBtn = document.getElementById('spin-btn');
    this.spinsRemainingEl = document.getElementById('spins-remaining');
    this.statusMsg = document.getElementById('status-message');
    this.reels = [
      document.getElementById('reel-1'),
      document.getElementById('reel-2'),
      document.getElementById('reel-3')
    ];
    this.prizeModal = document.getElementById('prize-modal');
    this.closePrizeBtn = document.getElementById('close-prize-modal');
    
    console.log('LotteryMachine initialized. Close button found:', !!this.closePrizeBtn);
    
    this.init();
  }

  init() {
    this.setupListeners();
  }

  setupListeners() {
    if (this.spinBtn) {
      this.spinBtn.addEventListener('click', () => this.spin());
    }
    
    if (this.closePrizeBtn) {
      this.closePrizeBtn.addEventListener('click', (e) => {
        e.preventDefault(); // Prevent any default behavior
        console.log('Close button clicked. Redirecting...');
        if (this.prizeModal) this.prizeModal.classList.add('hidden');
        window.location.href = 'shop.html';
      });
    } else {
      console.error('Close prize button not found in DOM');
    }
  }

  async spin() {
    if (this.isSpinning) return;
    
    this.isSpinning = true;
    this.statusMsg.textContent = 'Spinning...';
    this.statusMsg.className = 'text-xl font-bold text-yellow-400 h-8'; // Reset class
    
    // Determine outcome
    const isWinner = Math.random() < this.winProbability;
    
    // Animation
    const symbols = ['🍒', '🍋', '🍇', '🍉', '💎', '🔔', '7️⃣'];
    const duration = 2000; // 2s spin
    const interval = 80;
    
    const spinInterval = setInterval(() => {
      this.reels.forEach(reel => {
        const randomSymbol = symbols[Math.floor(Math.random() * symbols.length)];
        reel.textContent = randomSymbol;
        reel.style.transform = `translateY(${Math.random() * 10 - 5}px)`;
      });
    }, interval);

    // Stop
    setTimeout(() => {
      clearInterval(spinInterval);
      
      if (isWinner) {
        this.setReels(['7️⃣', '7️⃣', '7️⃣']); // Jackpot symbols
        this.handleWin();
      } else {
        // Set losing combination
        let s1 = symbols[Math.floor(Math.random() * symbols.length)];
        let s2 = symbols[Math.floor(Math.random() * symbols.length)];
        let s3 = symbols[Math.floor(Math.random() * symbols.length)];
        
        while (s1 === s2 && s2 === s3) {
           s3 = symbols[Math.floor(Math.random() * symbols.length)];
        }
        
        this.setReels([s1, s2, s3]);
        this.handleLoss();
      }
      
      this.isSpinning = false;
      
    }, duration);
  }

  setReels(symbols) {
    this.reels.forEach((reel, index) => {
      reel.textContent = symbols[index];
      reel.style.transform = 'translateY(0)';
    });
  }

  handleWin() {
    this.statusMsg.textContent = 'JACKPOT!';
    this.statusMsg.classList.remove('text-yellow-400');
    this.statusMsg.classList.add('text-green-400', 'animate-pulse');
    setTimeout(() => {
      if (this.prizeModal) this.prizeModal.classList.remove('hidden');
      this.fireConfetti();
    }, 500);
  }

  handleLoss() {
    this.statusMsg.textContent = 'So close! Try again.';
    this.statusMsg.classList.remove('text-yellow-400');
    this.statusMsg.classList.add('text-gray-400');
  }

  fireConfetti() {
    const colors = ['#ef4444', '#eab308', '#ffffff'];
    for (let i = 0; i < 100; i++) {
      const el = document.createElement('div');
      el.style.position = 'fixed';
      el.style.left = Math.random() * 100 + 'vw';
      el.style.top = '-10px';
      el.style.width = '10px';
      el.style.height = '10px';
      el.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
      el.style.zIndex = '100';
      el.style.pointerEvents = 'none'; // Critical: prevent blocking clicks
      el.style.transform = `rotate(${Math.random() * 360}deg)`;
      
      document.body.appendChild(el);
      
      const animation = el.animate([
        { top: '-10px', opacity: 1 },
        { top: '100vh', opacity: 0, transform: `rotate(${Math.random() * 720}deg)` }
      ], {
        duration: Math.random() * 2000 + 1500,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
      });
      
      animation.onfinish = () => el.remove();
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new LotteryMachine();
});
