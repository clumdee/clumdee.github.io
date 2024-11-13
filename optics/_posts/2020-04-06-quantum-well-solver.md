---
layout: post
title: "Interactive Demo: Quantum Well Solver using Finite Difference Calculation"
date: 2020-04-06
category: optics
---

<div class="my-4 text-center">
  <img class="w-75" src="{{ site.url }}/optics/img/demo_qw_solver/cover.png">
</div>

## Introduction

We developed an interactive demo that calculates solutions of 1-D [Schrödinger equation](https://en.wikipedia.org/wiki/Schr%C3%B6dinger_equation). These solutions represent energy states and electron wavefunctions of a 1-D quantum confinement structure, such as a [quantum well (QW)](https://en.wikipedia.org/wiki/Quantum_well). The calculation is based on [*finite difference method*](https://en.wikipedia.org/wiki/Finite_difference_method).

The demo allows a user to define essential parameters of a QW to solve. For example, width and energy levels of the conduction band of materials. Once solved, available energy states and electron wavefunctions of a QW are presented in an interactive format.

We hope the demo can help students, as well as professionals, to improve their understanding of quantum confinement effects.

---

## Demo

Click below to launch an interactive demo notebook on [binder](https://mybinder.org/).  
*The demo is written in Python. Source code is available on [GitHub](https://github.com/clumdee/quantum_well_solver).*  
<a class="btn btn-success text-white" href="https://mybinder.org/v2/gh/clumdee/quantum_well_solver/main?labpath=QW_solver.ipynb">Launch Binder</a>

*Core part of the code came from this [class project](https://clumdee.github.io/talks/talks-pdf/2010-05-XX_ClassProject_NumerModelRectQD.pdf).
For those with technical interests, we used this [paper](https://github.com/clumdee/quantum_well_solver/blob/master/1990_JAP_Schrodinger-Poisson.pdf) as a reference.*

--- 

### Demo Snapshots
#### Example 1: Startup Interface
{% include image.html
  img='optics/img/demo_qw_solver/0_init.png'
  title='QW_solver_init'
  caption='Demo interface at startup.'
%}

---

#### Example 2: Define Parameters and Solve States of QW
{% include image.html
  img='optics/img/demo_qw_solver/1_solver.png'
  title='QW_solver'
  caption='Example of solving interface.'
%}

---

#### Example 3: Visualize Wavefunction
{% include image.html
  img='optics/img/demo_qw_solver/2_wavefunction.png'
  title='QW_wavefunction'
  caption='Select an energy state and visualize wavefunction.'
%}
