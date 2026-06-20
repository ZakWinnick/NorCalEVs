---
layout: page
title: "Gallery"
description: "Photos from NorCal EVs events and meetups"
page_class: "gallery-page"
---

<section class="gallery-section">
    <div class="gallery-grid">
        {% for album in site.data.galleries %}
        {% assign album_url = album.url | default: '#' %}
        <a class="gallery-card{% if album_url == '#' %} gallery-card-soon{% endif %}" href="{{ album_url }}"{% if album.url %} target="_blank" rel="noopener noreferrer"{% endif %}>
            <div class="gallery-card-media">
                {% if album.cover %}
                <img src="{{ site.baseurl }}/assets/images/galleries/{{ album.cover }}" alt="{{ album.name }}" loading="lazy" decoding="async" />
                {% else %}
                <span class="gallery-card-placeholder" aria-hidden="true"></span>
                {% endif %}
            </div>
            <div class="gallery-card-body">
                <h3>{{ album.name }}</h3>
                <p class="gallery-card-meta">{{ album.location }} &middot; {{ album.date }}</p>
                <span class="gallery-card-link">{% if album_url == '#' %}Photos coming soon{% else %}View Gallery{% endif %}</span>
            </div>
        </a>
        {% endfor %}
    </div>
</section>

<section class="gallery-note">
    <div class="eyebrow">Were You There?</div>
    <h2>Share your event photos.</h2>
    <p>If you captured a good moment at a meetup or drive, send it our way. The best albums are built from the whole community's cameras, not just one.</p>
    <div class="gallery-note-actions">
        <a href="mailto:contact@norcalevs.org" class="btn btn-primary">Send Photos</a>
        <a href="{{ site.baseurl }}/#events" class="btn btn-ghost">See Upcoming Events</a>
    </div>
</section>
