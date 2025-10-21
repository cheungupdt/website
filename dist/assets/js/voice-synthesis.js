class VoiceSynthesis {
  constructor() {
    this.synth = window.speechSynthesis;
    this.voices = [];
    this.currentUtterance = null;
    this.isSpeaking = false;
    this.isPaused = false;
    
    this.init();
  }
  
  init() {
    // Load voices
    this.loadVoices();
    
    // Set up event listeners
    this.setupEventListeners();
    
    // Update voices when they change
    if (speechSynthesis.onvoiceschanged !== undefined) {
      speechSynthesis.onvoiceschanged = () => this.loadVoices();
    }
    
    // Initialize voice synthesis if not supported
    if (!('speechSynthesis' in window)) {
      this.updateStatus('Speech synthesis not supported in your browser', 'error');
      const speakBtn = document.getElementById('speak-btn');
      if (speakBtn) speakBtn.disabled = true;
    }
  }
  
  loadVoices() {
    this.voices = this.synth.getVoices();
    const voiceSelect = document.getElementById('voice-select');
    
    if (!voiceSelect) return;
    
    // Clear existing options
    voiceSelect.innerHTML = '<option value="">Default</option>';
    
    // Add voice options
    this.voices.forEach((voice, index) => {
      const option = document.createElement('option');
      option.value = index;
      option.textContent = `${voice.name} (${voice.lang})`;
      voiceSelect.appendChild(option);
    });
  }
  
    // Update the setupEventListeners function in voice-synthesis.js
    setupEventListeners() {
    const speakBtn = document.getElementById('speak-btn');
    const pauseBtn = document.getElementById('pause-btn');
    const stopBtn = document.getElementById('stop-btn');
    const downloadBtn = document.getElementById('download-btn');
    const textInput = document.getElementById('voice-text');
    const rateInput = document.getElementById('voice-rate');
    const pitchInput = document.getElementById('voice-pitch');
    const rateValue = document.getElementById('rate-value');
    const pitchValue = document.getElementById('pitch-value');
    
    // Speak button
    if (speakBtn) {
        speakBtn.addEventListener('click', () => {
        if (this.isPaused) {
            this.synth.resume();
            this.isPaused = false;
            this.updateStatus('Speaking...', 'speaking');
        } else {
            this.speak();
        }
        }.bind(this));
    }
  
    
    // Pause button
    if (pauseBtn) {
      pauseBtn.addEventListener('click', () => {
        if (this.isSpeaking && !this.isPaused) {
          this.synth.pause();
          this.isPaused = true;
          this.updateStatus('Paused', 'paused');
        }
      });
    }
    
    // Stop button
    if (stopBtn) {
      stopBtn.addEventListener('click', () => {
        this.stop();
      });
    }
    
    // Download button
    if (downloadBtn) {
      downloadBtn.addEventListener('click', () => {
        this.downloadAudio();
      });
    }
    
    // Rate slider
    if (rateInput && rateValue) {
      rateInput.addEventListener('input', (e) => {
        rateValue.textContent = e.target.value;
      });
    }
    
    // Pitch slider
    if (pitchInput && pitchValue) {
      pitchInput.addEventListener('input', (e) => {
        pitchValue.textContent = e.target.value;
      });
    }
    
    // Text input - enable/disable speak button
    if (textInput) {
      textInput.addEventListener('input', (e) => {
        if (speakBtn) speakBtn.disabled = !e.target.value.trim();
      });
      
      // Initial state
      speakBtn.disabled = !textInput.value.trim();
    }
  }
  
  speak() {
    const text = document.getElementById('voice-text').value.trim();
    if (!text) return;
    
    // Stop any current speech
    this.stop();
    
    // Create utterance
    this.currentUtterance = new SpeechSynthesisUtterance(text);
    
    // Set voice
    const voiceSelect = document.getElementById('voice-select');
    if (voiceSelect && voiceSelect.value) {
      this.currentUtterance.voice = this.voices[voiceSelect.value];
    }
    
    // Set rate and pitch
    const rateInput = document.getElementById('voice-rate');
    const pitchInput = document.getElementById('voice-pitch');
    
    if (rateInput) {
      this.currentUtterance.rate = parseFloat(rateInput.value);
    }
    
    if (pitchInput) {
      this.currentUtterance.pitch = parseFloat(pitchInput.value);
    }
    
    // Set up event handlers
    this.currentUtterance.onstart = () => {
      this.isSpeaking = true;
      this.isPaused = false;
      this.updateStatus('Speaking...', 'speaking');
      this.startVisualization();
    };
    
    this.currentUtterance.onend = () => {
      this.isSpeaking = false;
      this.isPaused = false;
      this.updateStatus('Ready', 'ready');
      this.stopVisualization();
    };
    
    this.currentUtterance.onerror = (event) => {
      this.updateStatus(`Error: ${event.error}`, 'error');
      this.stopVisualization();
    };
    
    this.currentUtterance.onpause = () => {
      this.isPaused = true;
      this.updateStatus('Paused', 'paused');
    };
    
    this.currentUtterance.onresume = () => {
      this.isPaused = false;
      this.updateStatus('Speaking...', 'speaking');
    };
    
    // Start speaking
    this.synth.speak(this.currentUtterance);
  }
  
  stop() {
    this.synth.cancel();
    this.isSpeaking = false;
    this.isPaused = false;
    this.updateStatus('Ready', 'ready');
    this.stopVisualization();
  }
  
  updateStatus(message, status) {
    const statusElement = document.getElementById('voice-status');
    if (!statusElement) return;
    
    statusElement.textContent = message;
    statusElement.className = `status-indicator ${status}`;
  }
  
  startVisualization() {
    const canvas = document.getElementById('voice-visualizer');
    if (!canvas) return;
    
    const canvasCtx = canvas.getContext('2d');
    let animationId;
    
    const draw = () => {
      if (!this.isSpeaking) {
        cancelAnimationFrame(animationId);
        return;
      }
      
      animationId = requestAnimationFrame(draw);
      
      canvasCtx.fillStyle = 'rgb(240, 240, 240)';
      canvasCtx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw simple waveform
      canvasCtx.strokeStyle = 'rgb(66, 153, 225)';
      canvasCtx.lineWidth = 2;
      canvasCtx.beginPath();
      
      const width = canvas.width;
      const height = canvas.height;
      const amplitude = height / 4;
      
      for (let x = 0; x < width; x++) {
        const y = height / 2 + amplitude * Math.sin(x * 0.05 + Date.now() * 0.002);
        if (x === 0) {
          canvasCtx.moveTo(x, y);
        } else {
          canvasCtx.lineTo(x, y);
        }
      }
      
      canvasCtx.stroke();
    };
    
    draw();
  }
  
  stopVisualization() {
    const canvas = document.getElementById('voice-visualizer');
    if (!canvas) return;
    
    const canvasCtx = canvas.getContext('2d');
    canvasCtx.clearRect(0, 0, canvas.width, canvas.height);
  }
  
  downloadAudio() {
    // This is a placeholder - actual download would require
    // server-side processing or a library like MediaRecorder API
    const text = document.getElementById('voice-text').value;
    const blob = new Blob([text], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'voice-text.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    this.updateStatus('Text downloaded (audio download requires server)', 'info');
  }
}

// Initialize voice synthesis when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Only initialize if voice synthesis elements exist
  if (document.getElementById('voice-text')) {
    new VoiceSynthesis();
  }
});