---
layout: default
title: Blog entries
---

<!-- Do not indent more than 4 spaces, otherwise Markdown will interpret the line as a block code  -->
## Blog entries

<!-- ## All blogs -->
<!-- {% for post in site.posts %}
  * {{ post.date | date_to_string}} » [{{ post.title }}]({{ post.url }} "{{ post.title }}")
{% endfor %} -->


<!-- List posts with a certain category e.g. 'blog' -->
<!-- ## By categories -->
{% for post in site.categories.blog %}
  * {{ post.date | date_to_string}} » [{{ post.title }}]({{ post.url }} "{{ post.title }}")
{% endfor %}
