---
title: "My Personal Site"
layout: "layout.njk"
---

# Welcome to My Site!

Hello! I'm building my personal site with Eleventy and Markdown.

## Recent Posts

{% for post in collections.posts | reverse | limit(3) %}
- [{{ post.data.title }}]({{ post.url }})
{% endfor %}