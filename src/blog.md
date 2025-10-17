---
layout: layouts/base.njk
title: Blog
description: "Daily insights and thoughts on robotics, automation, and innovation"
pagination:
  data: collections.posts
  size: 5
  alias: paginatedPosts
  reverse: true
---

<section class="blog-header">
    <h1>Blog</h1>
    <p class="lead">Daily insights and thoughts on robotics, automation, and innovation</p>
    <div class="blog-actions">
        <a href="/blog/tags/" class="btn btn-outline">Browse by Tags</a>
    </div>
</section>

<section class="blog-posts">
    {% if paginatedPosts.items.length > 0 %}
        {% for post in paginatedPosts.items %}
        <article class="blog-post-preview">
            <header>
                <h2><a href="{{ post.url }}">{{ post.data.title }}</a></h2>
                <div class="blog-meta">
                    <time datetime="{{ post.date }}">{{ post.date | date("MMMM DD, YYYY") }}</time>
                    {% if post.data.tags %}
                    <span class="tags">
                        {% for tag in post.data.tags %}
                        <a href="/blog/tag-pages/{{ tag }}/" class="tag">#{{ tag }}</a>
                        {% endfor %}
                    </span>
                    {% endif %}
                </div>
            </header>
            
            {% if post.data.description %}
            <p class="post-excerpt">{{ post.data.description }}</p>
            {% else %}
            <p class="post-excerpt">{{ post.templateContent | striptags | truncate(150) }}...</p>
            {% endif %}
            
            <footer>
                <a href="{{ post.url }}" class="blog-post-preview">
                    Read More
                </a>
            </footer>
        </article>
        {% endfor %}
    {% else %}
    <div class="no-posts">
        <p>No blog posts yet. Check back soon!</p>
    </div>
    {% endif %}
</section>

{% if pagination.hrefs %}
<nav class="pagination">
    {% if pagination.href.first %}
    <a href="{{ pagination.href.first }}" class="pagination-link">First</a>
    {% endif %}
    
    {% if pagination.href.previous %}
    <a href="{{ pagination.href.previous }}" class="pagination-link">? Previous</a>
    {% endif %}
    
    <span class="pagination-info">
        Page {{ pagination.pageNumber + 1 }} of {{ pagination.hrefs.length }}
    </span>
    
    {% if pagination.href.next %}
    <a href="{{ pagination.href.next }}" class="pagination-link">Next ?</a>
    {% endif %}
    
    {% if pagination.href.last %}
    <a href="{{ pagination.href.last }}" class="pagination-link">Last</a>
    {% endif %}
</nav>
{% endif %}

<style>
.blog-header {
    text-align: center;
    margin-bottom: var(--spacing-3xl);
}

.blog-header h1 {
    font-size: var(--font-size-4xl);
    margin-bottom: var(--spacing-lg);
}

.blog-actions {
    margin-top: var(--spacing-lg);
}

.blog-posts {
    max-width: 800px;
    margin: 0 auto;
}

.blog-post-preview {
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-md);
    padding: var(--spacing-lg);
    margin-bottom: var(--spacing-xl);
    transition: transform var(--transition-normal), box-shadow var(--transition-normal);
}

.blog-post-preview:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-lg);
}

.blog-post-preview h2 {
    font-size: var(--font-size-2xl);
    margin-bottom: var(--spacing-sm);
}

.blog-post-preview h2 a {
    color: var(--color-primary);
    text-decoration: none;
}

.blog-post-preview h2 a:hover {
    color: var(--color-accent);
}

.blog-meta {
    display: flex;
    align-items: center;
    gap: var(--spacing-md);
    margin-bottom: var(--spacing-md);
    color: var(--color-secondary);
    font-size: var(--font-size-sm);
}

.tags {
    display: flex;
    gap: var(--spacing-sm);
}

.tag {
    background-color: var(--color-secondary-light);
    color: var(--color-secondary-dark);
    padding: var(--spacing-xs) var(--spacing-sm);
    border-radius: var(--radius-sm);
    font-size: var(--font-size-xs);
    text-decoration: none;
    transition: background-color var(--transition-fast);
}

.tag:hover {
    background-color: var(--color-secondary);
    color: var(--color-white);
    text-decoration: none;
}

.post-excerpt {
    color: var(--color-primary);
    margin-bottom: var(--spacing-lg);
    line-height: 1.6;
}

.no-posts {
    text-align: center;
    padding: var(--spacing-3xl) 0;
    color: var(--color-secondary);
}

.pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: var(--spacing-md);
    margin-top: var(--spacing-3xl);
    padding: var(--spacing-lg);
    background-color: var(--color-white);
    border-radius: var(--radius-lg);
    box-shadow: var(--shadow-sm);
}

.pagination-link {
    color: var(--color-accent);
    text-decoration: none;
    padding: var(--spacing-sm) var(--spacing-md);
    border-radius: var(--radius-sm);
    transition: all var(--transition-fast);
}

.pagination-link:hover {
    background-color: var(--color-accent);
    color: var(--color-white);
    text-decoration: none;
}

.pagination-info {
    color: var(--color-secondary);
    font-size: var(--font-size-sm);
}

@media (max-width: 768px) {
    .blog-meta {
        flex-direction: column;
        align-items: flex-start;
        gap: var(--spacing-sm);
    }
    
    .pagination {
        flex-wrap: wrap;
        gap: var(--spacing-sm);
    }
}
</style>
