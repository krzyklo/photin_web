---
title: Quasi-planar InGaAsSb p-B-n photodiodes for spectroscopic sensing
subtitle: Publication with Lancaster University and ams-OSRAM.
author: "Krzysztof Kłos"
date: "17/04/2023"
#link-citations: true
#bibliography: "../assets/img/230417_Quasi-Planar-Photodiodes/Bibliography.bib"
#csl: "../assets/img/230417_Quasi-Planar-Photodiodes/ieee-with-url.csl"
output:
  md_document:
    variant: gfm
    preserve_yaml: TRUE
knit: (function(inputFile, encoding) {
  rmarkdown::render(inputFile, 
  encoding = encoding, 
  output_file=paste0(Sys.Date(), "-", sub(".Rmd", ".md",inputFile)), 
  output_dir = "~/photin/krzyklo.github.io/_posts/") })
  
layout: post

cover-img: ["/assets/img/230417_Quasi-Planar-Photodiodes/structure.jpeg",
"/assets/img/230111_extended_InGaAs/Brolis_eSWIR_glucose1.png",
"/assets/img/230417_Quasi-Planar-Photodiodes/I-V_graph.jpeg",
"/assets/img/230417_Quasi-Planar-Photodiodes/Comparison.jpeg"
]
thumbnail-img: /assets/img/230417_Quasi-Planar-Photodiodes/structure.jpeg
share-img: /assets/img/230417_Quasi-Planar-Photodiodes/structure.jpeg
tags: [news,InGaAsSb, projects]
always_allow_html: true
---

### Advanced extended SWIR detector development

We are happy to share [open access
publication](https://opg.optica.org/oe/fulltext.cfm?uri=oe-31-9-14358&id=529146)
from our recent work on eSWIR barrier detector development project,
where Photin worked together with [Lancaster
University](https://www.research.lancs.ac.uk/portal/en/publications/quasiplanar-ingaassb-pbn-photodiodes-for-spectroscopic-sensing(1b3baab8-93f9-40f6-b71a-d3d2b48aaf69).html)
and [ams-OSRAM](https://ams-osram.com/) on:

“Quasi-planar InGaAsSb p-B-n photodiodes for spectroscopic sensing”

L. A. Hanks \*<sup>1</sup>, K. Mamic<sup>1</sup> K. Kłos<sup>2</sup> A.
Bainbridge<sup>1</sup> J. Fletcher<sup>1</sup> L. Gilder<sup>1</sup> L.
Tedstone<sup>1</sup> F. J. Castaño<sup>3</sup> and A. R. J.
Marshall<sup>1</sup>

1.  Department of Physics, Lancaster University, Lancaster LA1 4YB,
    United Kingdom  
2.  Photin LLC, 05-080 Klaudyn, Poland  
3.  ams-OSRAM AG, Technology R&D, Tobelbader Strasse 30, 8141
    Premstaetten, Austria  
    \*Corresponding author: Laura Hanks

### Outline

Photin in this project witnessed and contributed to rapid traverse from
\~TRL4 to TRL 8/9 of IR detector development project with state of the
art scientists from Lancaster University and Tier1 manufacturer
[ams-OSRAM](https://ams-osram.com/).

It was pure pleasure to work in such a great team of specialists, which
worked across multiple countries.

<https://doi.org/10.1364/OE.485631>

### Outcome

As far as we know, as the results of this project, it was achieved the
lowest dark currents (and highest detectivity) for eSWIR InGaAsSb
detectors with \~2.2µm cut-off at room temperature published so far.
Comparison with literature\[{% cite
haoExtendedwavelengthInGaAsSbInfrared2018 liHighPerformanceNBn2019
liInvestigationsEliminateBias2020 shafirHighResponsivityInGaAsSb2021 %}
is shown below:
<img src="/../assets/img/230417_Quasi-Planar-Photodiodes/Comparison_ams_read.png.svg" width="100%" />

In the scope of project multiple professional foundries and companies
providing GaSb-based wafers processing were tested.  
The “Quasi-planar” processing scheme developed by Lancaster University
delivered consistently the best outcomes in terms of leakage from all
competition.

### Follow up

<!-- Innoglobo passivation -->

When optimal epitaxy design of layer structures were established with
help of the Crosslight Apsys and Synopsys Sentaurus TCAD tools, then
they were grown and processed for verification.  
The large portion of total dark current come from perimeter leakage
mechanisms. This highlight importance of proper passivation, which will
be subject of
[InnoGlobo2](https://www.photin.eu/2023-02-07-InnoGlobo-MUT-KindLab-project/)
grant with Military University of Technology and KindLab, which should
start in 2023.

### References

<BR>  
{% bibliography –cited %}
