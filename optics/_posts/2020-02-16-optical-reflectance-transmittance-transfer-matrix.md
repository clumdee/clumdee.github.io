---
layout: post
title: "Interactive Demo: Optical Reflectance and Transmittance with Transfer-Matrix Method"
date: 2020-02-16
category: optics
---

<div class="my-4 text-center">
  <img class="w-75" src="{{ site.url }}/optics/img/demo_transfer_matrix/cover.png">
</div>

## Introduction

We developed an interactive demo that calculates optical reflectance (**R**) and transmittance (**T**) of a thin film stack based on [*transfer-matrix method*](https://en.wikipedia.org/wiki/Transfer-matrix_method_(optics)).

The demo allows a user to provide information of a thin film stack to get **R** / **T** heatmaps. A user can closely inspect **R** / **T** at different excitation conditions by slicing across wavelength and angle of incidence.

We hope the demo can help students, as well as professionals, to improve their understanding in optical interference of a medium stack, such as [Fabry–Pérot interferometer](https://en.wikipedia.org/wiki/Fabry%E2%80%93P%C3%A9rot_interferometer) and [anti-reflective coating](https://en.wikipedia.org/wiki/Anti-reflective_coating).

---

## Demo

Click below to launch an interactive demo notebook on [binder](https://mybinder.org/).  
*The demo is written in Python. Source code is available on [GitHub](https://github.com/clumdee/transfer_matrix).*  
<a class="btn btn-success text-white" href="https://mybinder.org/v2/gh/clumdee/transfer_matrix/master?urlpath=tree/demo_minimal.ipynb">Launch Binder</a>

--- 

### Demo Snapshots
#### Example 1: Startup Interface
<!-- ![transfer_matrix_startup]({{ site.url }}/assets/img/demo_transfer_matrix/clean_start.png) -->
{% include image.html
  img='optics/img/demo_transfer_matrix/clean_start.png'
  title='transfer_matrix_startup'
  caption='Demo interface at startup.'
%}

---

#### Example 2: R / T Heatmaps based on User's Input
<!-- ![transfer_matrix_heatmaps]({{ site.url }}/assets/img/demo_transfer_matrix/heatmaps.png) -->
{% include image.html
  img='optics/img/demo_transfer_matrix/heatmaps.png'
  title='transfer_matrix_heatmaps'
  caption='R / T Heatmaps of a thin film stack as user specified.'
%}

---

#### Example 3: Wavelength Slicer
<!-- ![transfer_matrix_wavelength_slice]({{ site.url }}/assets/img/demo_transfer_matrix/wavelength_slice.png) -->
{% include image.html
  img='optics/img/demo_transfer_matrix/wavelength_slice.png'
  title='transfer_matrix_wavelength_slice'
  caption='R / T across angle of incidence at a selected wavelength.'
%}
