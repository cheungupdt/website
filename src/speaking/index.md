---
title: Speaking Engagements
layout: ../_includes/layouts/base.njk
description: Conference presentations and speaking engagements
---

# Speaking Engagements

Welcome to my speaking engagements showcase. Here you'll find a collection of my conference presentations, workshops, and public speaking events.

## Featured Speaking Engagements

<div class="speaking-grid">
  {% for engagement in collections.speaking | reverse %}
    {% include "../_includes/components/speaking-card.njk" %}
  {% endfor %}
</div>