---
title: Achievements
layout: ../_includes/layouts/base.njk
description: Professional achievements and certifications
---

# Achievements

Welcome to my achievements showcase. Here you'll find a collection of my professional accomplishments, certifications, and recognitions across various domains.

## Featured Achievements

<div class="achievements-grid">
  {% for achievement in collections.achievements | reverse %}
    {% include "../_includes/components/achievement-card.njk" %}
  {% endfor %}
</div>