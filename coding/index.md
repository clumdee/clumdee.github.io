---
title: Coding
layout: base_coding
description: Coding, programming, data science projects
category: coding
canonical_url: /coding/
---

{% for post in site.categories.coding %}
  * {{ post.date | date_to_string}} » [{{ post.title }}]({{ post.url }} "{{ post.title }}")
{% endfor %}