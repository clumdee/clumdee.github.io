---
title: Random
layout: base_random
description: Random events that compose a journey
category: random
canonical_url: /random/
---

##### Drunkard's walk <a href="{{ site.url }}/static/etc/ChatdanaiLumdee_202307.pdf" class="btn btn-sm btn-success">CV</a>

<div class="accordion" id="accordionExample">
  <div class="card">
    <div class="card-header" id="headingSix">
      <h5 class="mb-0">
        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapseSix" aria-expanded="true" aria-controls="collapseSix">
          2020 - present:
        </button>
      </h5>
    </div>
    <div id="collapseSix" class="collapse" aria-labelledby="headingSix" data-parent="#accordionExample">
      <div class="card-body">
        To be filled ...
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingFive">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFive" aria-expanded="false" aria-controls="collapseFive">
          2018 - 2020: 
          <!-- Learn-Unlearn-Relearn -->
        </button>
      </h5>
    </div>
    <div id="collapseFive" class="collapse" aria-labelledby="headingFive" data-parent="#accordionExample">
      <div class="card-body">
        To be filled ...
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingFour">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
          2016 - 2018: 
          <!-- Exploring Europe -->
        </button>
      </h5>
    </div>
    <div id="collapseFour" class="collapse" aria-labelledby="headingFour" data-parent="#accordionExample">
      <div class="card-body">
        To be filled ...
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingThree">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
          2010 - 2016: 
          <!-- Hello America -->
        </button>
      </h5>
    </div>
    <div id="collapseThree" class="collapse" aria-labelledby="headingThree" data-parent="#accordionExample">
      <div class="card-body">
        To be filled ...
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingTwo">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
          2006 - 2010: 
          <!-- Hello Bangkok -->
        </button>
      </h5>
    </div>
    <div id="collapseTwo" class="collapse" aria-labelledby="headingTwo" data-parent="#accordionExample">
      <div class="card-body">
        To be filled ...
      </div>
    </div>
  </div>
  <div class="card">
    <div class="card-header" id="headingOne">
      <h5 class="mb-0">
        <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
          1988 - 2006: 
          <!-- Growing up -->
        </button>
      </h5>
    </div>
    <div id="collapseOne" class="collapse" aria-labelledby="headingOne" data-parent="#accordionExample">
      <div class="card-body">
        To be filled ...
      </div>
    </div>
  </div>
</div>

---

##### Drunkard's walk in 2D (adapted from [here](https://bl.ocks.org/EmilienDupont/4da87ba851221f4ce150d798196da421))

<div id="random2d" class="bg-secondary my-4"></div>
{% include script_drunkard2D.html %}

---

##### So random ...
{% for post in site.categories.random %}
  * {{ post.date | date_to_string}} » [{{ post.title }}]({{ post.url }} "{{ post.title }}")
{% endfor %}
