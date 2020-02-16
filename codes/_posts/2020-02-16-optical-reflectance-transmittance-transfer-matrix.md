---
layout: post
title: "Interactive Demo: Optical Reflectance and Transmittance with Transfer-Matrix Method"
date: 2020-02-16
categories: code_python
---

## Introduction

From [Wikipedia](https://en.wikipedia.org/wiki/Transfer-matrix_method_(optics))
> The transfer-matrix method is a method used in optics and acoustics to analyze the propagation of electromagnetic or acoustic waves through a stratified medium. This is for example relevant for the design of anti-reflective coatings and dielectric mirrors.

Here we developed an interactive demo that calculates optical reflectance (**R**) and transmittance (**T**) of a thin film stack based on [*transfer-matrix method*](https://en.wikipedia.org/wiki/Transfer-matrix_method_(optics)).

The demo allows a user to provide information of a thin film stack to get **R** / **T** heatmaps. A user can closely inspect **R** / **T** at different excitation conditions by slicing across wavelength and angle of incidence.

We hope the demo can help students, as well as professionals, to improve their understanding in optical interference of a medium stack, such as [Fabry–Pérot interferometer](https://en.wikipedia.org/wiki/Fabry%E2%80%93P%C3%A9rot_interferometer) and [anti-reflective coating](https://en.wikipedia.org/wiki/Anti-reflective_coating).

Click the binder badge below to launch an interactive demo notebook. <br> [![BinderLauncher](https://mybinder.org/badge_logo.svg)](https://mybinder.org/v2/gh/clumdee/transfer_matrix/master?urlpath=tree/demo_minimal.ipynb)

*The demo is written in Python and hosted using [binder](https://mybinder.org/). A complete source code is available on [GitHub](https://github.com/clumdee/transfer_matrix).*



## Demo
### Example 1: Startup Interface
(![transfer_matrix_startup]({{ site.url }}/assets/img/demo_transfer_matrix/clean_start.png))

### Example 2: R / T Heatmaps based on User's Input
(![transfer_matrix_heatmaps]({{ site.url }}/assets/img/demo_transfer_matrix/heatmaps.png))

### Example 3: Wavelength Slicer
(![transfer_matrix_wavelength_slice]({{ site.url }}/assets/img/demo_transfer_matrix/wavelength_slice.png))
