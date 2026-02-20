---
title: Need4Speed Frequency Combs need InAs MWIR detectors
subtitle: Photin InAs detectors speed measured
author: "Krzysztof Kłos"
date: "30/01/2026"
output:
  #pdf_document: default
  md_document:
    variant: gfm
    preserve_yaml: TRUE
knit: (function(inputFile, encoding) {
  rmarkdown::render(inputFile, 
  encoding = encoding, 
  output_file=paste0(Sys.Date(), "-", sub(".Rmd", ".md",inputFile)), 
  output_dir = "~/photin/krzyklo.github.io/_posts/") })
  
layout: post

cover-img: ["../assets/img/260130_Need4Speed_GHz/fixture.jpg"]
thumbnail-img: /assets/img/260130_Need4Speed_GHz/fixture.jpg
share-img: /assets/img/260130_Need4Speed_GHz/fixture.jpg
tags: [Frequency Combs, GHz, MWIR, fast detectors, InAs, InAsSbP]
always_allow_html: true
---

The team from Wroclaw University of Technology (Ł.Sterczewski,
G.Gomółka) tested all major commercial extended InGaAs detectors
providers. Just to found out their 1-2.6um range are still too narrow
for their research.. to see, measure and use [frequency
combs](https://www.nist.gov/topics/physics/optical-frequency-combs).  
We were thrilled to provide them custom InAs MWIR detector chips with
small mesa, which they hoped to enable them to resolve GHz waveforms,
and see long span frequency combs in all their beuaty.  
Indeed, they were not disappointed! **!!GHz confirmed!!**  
InAs semiconductor properties are used everywhere, where speed matters.
It could be Hall sensors, it could be HEMT/HBT transistors, it could be
UltraRAM, or MWIR detector.. **in each of this applications inherent
InAs carrier mobility play key role to reach out frequencies not
possible for SWIR materials like Silicon, GaAs, InP or InGaAs.**  
Mid-wave infrared (MWIR) frequency combs are expected to dramatically
improve the precision and sensitivity of molecular spectroscopy and gas
sensing. For high resolution applications, high speed MWIR photodetector
is the key component.  
However, the commercially available high speed MWIR photodetector has
usually only sub-GHz bandwidth due to their large size and
capacitance.  
More info will be published soon.

**If InGaAs and extended InGaAs detectors are not fast for your
research, we are happy to support you with custom InAs/InAsSbP
detectors, that open up frequency combs physics!**

<div class="figure">

<img src="/../assets/img/260130_Need4Speed_GHz/setup.jpg" alt="It could be seen, that reaching GHz require special setup fixture.." width="99%" />
<p class="caption">
It could be seen, that reaching GHz require special setup fixture..
</p>

</div>

<div class="figure">

<img src="/../assets/img/260130_Need4Speed_GHz/fixture.jpg" alt="the smallest circle(mesa) on the chip is our hero of the day" width="99%" />
<p class="caption">
the smallest circle(mesa) on the chip is our hero of the day
</p>

</div>

*Big Thank You! goes to J.Pawluczyk, O.Slezak, and P.Martyniuk who made
those chips from Photin wafers!*
