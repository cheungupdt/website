---
title: Contact & Collaboration
layout: layouts/contact.njk
permalink: /contact/
---

<div class="contact-intro">
  <p>I'm always interested in hearing about new opportunities, collaborations, or just having a conversation about robotics, automation, and technology. Feel free to reach out using the form below or through any of the contact methods listed.</p>
</div>

<div class="contact-content">
  <div class="contact-form-container">
    {% include "components/contact-form.njk" %}
  </div>
  
  <div class="contact-info">
    <h2>Get in Touch</h2>
    <div class="contact-details">
      <div class="contact-item">
        <i class="icon-email"></i>
        <a href="mailto:{{ contact.email }}">{{ contact.email }}</a>
      </div>
      <div class="contact-item">
        <i class="icon-phone"></i>
        <a href="tel:{{ contact.phone }}">{{ contact.phone }}</a>
      </div>
    </div>
    
    <div class="social-links">
      <h3>Connect on Social Media</h3>
      <ul>
        {% for platform, url in contact.social %}
          <li>
            <a href="{{ url }}" class="social-link" aria-label="{{ platform }}">
              <i class="icon-{{ platform }}"></i>
            </a>
          </li>
        {% endfor %}
      </ul>
    </div>
  </div>
</div>

<div class="collaboration-opportunities">
  <h2>Collaboration Opportunities</h2>
  <div class="opportunities-grid">
    {% for opportunity in contact.collaborationOpportunities %}
      {% include "components/collaboration-card.njk" %}
    {% endfor %}
  </div>
</div>