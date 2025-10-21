class Chatbot {
  constructor() {
    this.isOpen = false;
    this.isTyping = false;
    this.conversationHistory = [];
    this.n8nWebhookUrl = 'https://your-n8n-instance.com/webhook/chatbot'; // Replace with your n8n webhook
    
    this.init();
  }
  
  init() {
    this.setupEventListeners();
    this.loadConversationHistory();
  }
  
  setupEventListeners() {
    const toggle = document.getElementById('chatbot-toggle');
    const close = document.getElementById('chatbot-close');
    const send = document.getElementById('chatbot-send');
    const input = document.getElementById('chatbot-input');
    const suggestions = document.querySelectorAll('.suggestion-btn');
    
    // Toggle chat window
    toggle.addEventListener('click', () => {
      this.toggleChat();
    });
    
    // Close chat window
    close.addEventListener('click', () => {
      this.closeChat();
    });
    
    // Send message
    send.addEventListener('click', () => {
      this.sendMessage();
    });
    
    // Enter key to send
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        this.sendMessage();
      }
    });
    
    // Suggestion buttons
    suggestions.forEach(btn => {
      btn.addEventListener('click', () => {
        const suggestion = btn.getAttribute('data-suggestion');
        input.value = suggestion;
        this.sendMessage();
      });
    });
    
    // Minimize on escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.isOpen) {
        this.closeChat();
      }
    });
  }
  
  toggleChat() {
    if (this.isOpen) {
      this.closeChat();
    } else {
      this.openChat();
    }
  }
  
  openChat() {
    const container = document.getElementById('chatbot-container');
    const window = document.getElementById('chatbot-window');
    
    container.classList.add('open');
    window.classList.add('open');
    this.isOpen = true;
    
    // Clear badge
    this.clearBadge();
    
    // Focus input
    setTimeout(() => {
      document.getElementById('chatbot-input').focus();
    }, 300);
  }
  
  closeChat() {
    const container = document.getElementById('chatbot-container');
    const window = document.getElementById('chatbot-window');
    
    container.classList.remove('open');
    window.classList.remove('open');
    this.isOpen = false;
  }
  
  async sendMessage() {
    const input = document.getElementById('chatbot-input');
    const message = input.value.trim();
    
    if (!message || this.isTyping) return;
    
    // Add user message
    this.addMessage(message, 'user');
    
    // Clear input
    input.value = '';
    
    // Show typing indicator
    this.showTypingIndicator();
    
    try {
      // Send to n8n workflow
      const response = await this.sendToN8N(message);
      
      // Hide typing indicator
      this.hideTypingIndicator();
      
      // Add bot response
      this.addMessage(response.message, 'bot', response.actions);
      
      // Save to history
      this.saveConversationHistory();
      
    } catch (error) {
      console.error('Error sending message:', error);
      this.hideTypingIndicator();
      this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
    }
  }
  
  async sendToN8N(message) {
    const payload = {
      message: message,
      conversationHistory: this.conversationHistory.slice(-5), // Send last 5 messages for context
      timestamp: new Date().toISOString(),
      sessionId: this.getSessionId()
    };
    
    const response = await fetch(this.n8nWebhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  }
  
  addMessage(message, sender, actions = []) {
    const messagesContainer = document.getElementById('chatbot-messages');
    const messageElement = document.createElement('div');
    messageElement.className = `message ${sender}-message`;
    
    const avatar = document.createElement('div');
    avatar.className = 'message-avatar';
    avatar.innerHTML = sender === 'bot' ? '<i class="icon-robot"></i>' : '<i class="icon-user"></i>';
    
    const content = document.createElement('div');
    content.className = 'message-content';
    
    // Parse markdown-like syntax
    const formattedMessage = this.formatMessage(message);
    content.innerHTML = formattedMessage;
    
    // Add actions if provided
    if (actions && actions.length > 0) {
      const actionsContainer = document.createElement('div');
      actionsContainer.className = 'message-actions';
      
      actions.forEach(action => {
        const actionBtn = document.createElement('button');
        actionBtn.className = 'action-btn';
        actionBtn.textContent = action.label;
        actionBtn.addEventListener('click', () => {
          this.handleAction(action);
        });
        actionsContainer.appendChild(actionBtn);
      });
      
      content.appendChild(actionsContainer);
    }
    
    messageElement.appendChild(avatar);
    messageElement.appendChild(content);
    messagesContainer.appendChild(messageElement);
    
    // Scroll to bottom
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
    
    // Add to history
    this.conversationHistory.push({
      message: message,
      sender: sender,
      timestamp: new Date().toISOString()
    });
    
    // Show badge if chat is closed
    if (!this.isOpen && sender === 'bot') {
      this.showBadge();
    }
  }
  
  formatMessage(message) {
    // Simple markdown-like formatting
    return message
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      .replace(/`(.*?)`/g, '<code>$1</code>')
      .replace(/\n/g, '<br>');
  }
  
  handleAction(action) {
    switch (action.type) {
      case 'link':
        window.open(action.url, '_blank');
        break;
      case 'email':
        window.location.href = `mailto:${action.email}`;
        break;
      case 'suggestion':
        document.getElementById('chatbot-input').value = action.text;
        this.sendMessage();
        break;
      default:
        console.log('Unknown action type:', action.type);
    }
  }
  
  showTypingIndicator() {
    this.isTyping = true;
    document.getElementById('typing-indicator').style.display = 'flex';
    
    // Scroll to bottom
    const messagesContainer = document.getElementById('chatbot-messages');
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
  
  hideTypingIndicator() {
    this.isTyping = false;
    document.getElementById('typing-indicator').style.display = 'none';
  }
  
  showBadge() {
    const badge = document.getElementById('chat-badge');
    badge.textContent = '1';
    badge.style.display = 'flex';
  }
  
  clearBadge() {
    const badge = document.getElementById('chat-badge');
    badge.textContent = '';
    badge.style.display = 'none';
  }
  
  getSessionId() {
    let sessionId = localStorage.getItem('chatbot_session_id');
    if (!sessionId) {
      sessionId = 'session_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
      localStorage.setItem('chatbot_session_id', sessionId);
    }
    return sessionId;
  }
  
  saveConversationHistory() {
    try {
      localStorage.setItem('chatbot_history', JSON.stringify(this.conversationHistory));
    } catch (e) {
      console.error('Error saving conversation history:', e);
    }
  }
  
  loadConversationHistory() {
    try {
      const history = localStorage.getItem('chatbot_history');
      if (history) {
        this.conversationHistory = JSON.parse(history);
      }
    } catch (e) {
      console.error('Error loading conversation history:', e);
    }
  }
}

// Initialize chatbot when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new Chatbot();
});