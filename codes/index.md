---
layout: default
title: Code projects
---

## Python
{% for post in site.categories.code_python %}
  * {{ post.date | date_to_string}} » [{{ post.title }}]({{ post.url }} "{{ post.title }}")
{% endfor %}

## JavaScript
{% for post in site.categories.code_js %}
  * {{ post.date | date_to_string}} » [{{ post.title }}]({{ post.url }} "{{ post.title }}")
{% endfor %}

## Blender renders
I picked up [Blender](https://www.blender.org/) during my PhD, trying to make nice figures for our manuscripts. It is a really nice piece of software that helps you producing artistic illustrations. For free.
{% include image.html
  img='assets/img/magneto-plasmonic_nanocone.png'
  title='Magneto-plasmonic nanocone'
  caption='A plasmonic gold nanocone with a ferromagnetic tip at resonance excitation experiencing enhanced magneto-optical activities'
%}

## Unity game engine (with C#)
I learned some basic of [Unity](https://unity3d.com/) and made a few simple games. I will figure out how to post them here.

## Others
In addition to the examples above, I have extensive experience in data analysis and programming with [Matlab](https://www.mathworks.com/products/matlab.html), [MathCAD](http://www.ptc.com/engineering-math-software/mathcad), [Mathematica](https://www.wolfram.com/mathematica/), and [Origin](http://www.originlab.com/). I also use [Lumerical](https://www.lumerical.com/tcad-products/fdtd/) and [CST Microwave Studio](https://www.cst.com/products/cstmws) for 3D-electromagnetic simulation. Regarding hardware control, [LabVIEW](http://www.ni.com/labview/) is my main tool for designing and performing instrumental control system.
