---
title: Random
layout: base_random
description: Random events that compose a journey
category: random
canonical_url: /random/
---

<div class="flex items-center gap-3 mb-6">
  <h2 class="text-2xl font-semibold text-ink m-0">Drunkard's walk</h2>
  <a href="{{ site.url }}/static/etc/ChatdanaiLumdee_202307.pdf" class="btn-modern" target="_blank" rel="noopener noreferrer">CV</a>
</div>

<div class="divide-y divide-gray-200 border border-gray-200 rounded-lg overflow-hidden bg-white">
  <details open class="group">
    <summary>2020 &mdash; present</summary>
    <div class="px-4 pb-4 text-meta">To be filled &hellip;</div>
  </details>
  <details class="group">
    <summary>2018 &mdash; 2020 <!-- Learn-Unlearn-Relearn --></summary>
    <div class="px-4 pb-4 text-meta">To be filled &hellip;</div>
  </details>
  <details class="group">
    <summary>2016 &mdash; 2018 <!-- Exploring Europe --></summary>
    <div class="px-4 pb-4 text-meta">To be filled &hellip;</div>
  </details>
  <details class="group">
    <summary>2010 &mdash; 2016 <!-- Hello America --></summary>
    <div class="px-4 pb-4 text-meta">To be filled &hellip;</div>
  </details>
  <details class="group">
    <summary>2006 &mdash; 2010 <!-- Hello Bangkok --></summary>
    <div class="px-4 pb-4 text-meta">To be filled &hellip;</div>
  </details>
  <details class="group">
    <summary>1988 &mdash; 2006 <!-- Growing up --></summary>
    <div class="px-4 pb-4 text-meta">To be filled &hellip;</div>
  </details>
</div>

<hr class="my-10 border-gray-200">

<h2 class="text-2xl font-semibold text-ink mb-4">Drunkard's walk in 2D <span class="text-base font-normal text-meta">(adapted from <a href="https://bl.ocks.org/EmilienDupont/4da87ba851221f4ce150d798196da421">here</a>)</span></h2>

<div id="random2d" class="bg-gray-100 rounded-md my-4 min-h-[300px]"></div>
{% include script_drunkard2D.html %}

<hr class="my-10 border-gray-200">

<h2 class="text-2xl font-semibold text-ink mb-6">So random &hellip;</h2>

{% include category_list.html category="random" %}
