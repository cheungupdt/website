---
title: Collaboration Opportunities
layout: layouts/contact.njk
permalink: /contact/collaboration/
---

<div class="collaboration-header">
  <h1>Collaboration Opportunities</h1>
  <p>I'm open to various forms of collaboration in the fields of robotics, automation, and technology. Below are some of the areas where I can contribute my expertise.</p>
</div>

<div class="collaboration-details">
  {% for opportunity in contact.collaborationOpportunities %}
    <div class="collaboration-detail">
      <div class="detail-icon">
        <i class="icon-{{ opportunity.icon }}"></i>
      </div>
      <div class="detail-content">
        <h2>{{ opportunity.title }}</h2>
        <p>{{ opportunity.description }}</p>
        <div class="detail-tags">
          {% for tag in opportunity.tags %}
            <span class="tag">{{ tag }}</span>
          {% endfor %}
        </div>
      </div>
    </div>
  {% endfor %}
</div>

<div class="collaboration-form">
  <h2>Interested in Collaborating?</h2>
  <p>Fill out the form below with details about your project or idea, and I'll get back to you as soon as possible.</p>
  
  {% include "components/contact-form.njk" %}
</div>