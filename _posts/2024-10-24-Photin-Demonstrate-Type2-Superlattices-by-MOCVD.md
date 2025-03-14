---
title: "Photin demonstrate Type 2 InAs/InAsSb Superlattice (T2SLs) materials from MOCVD"
author: "Krzysztof Klos"
date: "24/10/2024"
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

cover-img: /assets/img/241003_MOCVD_T2SL/InAs-InAsSb_T2SLs.png
thumbnail-img: /assets/img/241003_MOCVD_T2SL/SLS_XRD.png
share-img: /assets/img/241003_MOCVD_T2SL/SLS_XRD.png
tags: [news, T2SL]
always_allow_html: true
---

In recent 10 years, they are the one of the most researched material
concept for infrared (in particular solar cells and detectors). Aimed to
de-throne HgCdTe, material which still reign as the one with the best
properties for IR detectors, except …the manufacturability. Type II
Superlattices(T2SLs) made from InAs/InAsSb are actively developed in USA
[JPL
NASA](https://spie.org/defense-commercial-sensing/presentation/Applications-of-T2SL-barrier-infrared-detectors-in-Earth-observational-instruments/13030-2#_=_%5D,%20(Germany)%5Bhttps://publica.fraunhofer.de/~%20/details%5D,%20(UK)%5Bhttps://www.sciencedirect.com/science/article/pii/S0022024822003426),
[Israel](https://scdusa-ir.com/articles/type-ii-superlattice-infrared-detector-technology-at-scd/),
[China](https://opg.optica.org/oe/fulltext.cfm?uri=oe-30-21-38208&id=507573),
Poland included (VIGO + IMIF)! Though, like most of players in worldwide
(except UK), VIGO Photonics-MUT laboratory and Łukasiewicz IMIF use MBE
technology to grow InAs/InAsSb and InAs/GaSb Type 2 superlattices for
infrared detectors. MBE is usually selected for antimonides+arsenides,
though it is rather R&D technology, industrially more relevant is MOCVD
due to lower costs.  
Photin decided to grow a few T2SLs structures, just to showcase
possibilities, and to test lines feeding MOCVD reactor with metalorganic
precursors (In, As and Sb), as T2SLs are also great technique to test
growth rates of InAs and InAsSb. To gauge T2SLs, single HR XRD
measurement is sufficient.

<figure>
<img src="{{site.url}}/assets/img/241003_MOCVD_T2SL/SLS_XRD.png" alt="Fig. 1. HR XRD measurement of T2SL structure, 20 periods"/>
<figcaption>
Fig. 1. HR XRD measurement of T2SL structure, 20 periods, 27.7nm InAs,
3.08nm InAsSb 12% Sb
</figcaption>
</figure>

In future we might, continue this research topic, as separate project,
however it is clear landmark demonstration of our capabilities in area
of MOCVD technology. 12 years ago, PhD thesis of our CEO, lay foundation
for growth of HgCdTe detectors by VIGO/MUT laboratory. T2SLs are 3rd
generation materials of XXI century with multiude of applications, and
we were first in Poland to demonstrate MOCVD growth of InAs/InAsSb T2SLs
materials!  
For now, we will continue ramping up and exploring the capabilities of
our MOCVD systems, tuning growth and doping of wide range of
antimonides, which are needed for InnoGlobo2 project and our customers.
Though no doubt, we will return to T2SLs sooner than later.
