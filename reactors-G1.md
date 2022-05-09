---
title: Aixtron Planetary 
author: "Krzysztof Kłos"
#date: "07/04/2022"
output:
  md_document:
    variant: gfm
    preserve_yaml: TRUE
knit: (function(inputFile, encoding) {
  rmarkdown::render(inputFile, 
  encoding = encoding, 
  output_file=paste0(Sys.Date(), "-", sub(".Rmd", ".md",inputFile)), 
  output_dir = "~/photin/krzyklo.github.io") })
  
layout: page

cover-img: ["assets/img/G1/G1_cntrl.JPG", "assets/img/G1/G1_GB_cntrl.JPG","assets/img/G1/G1_side.JPG"]
thumbnail-img: /assets/img/G1/G1_GB_cntrl.JPG
share-img: /assets/img/path.jpg
tags: [MOCVD, Aixtron, reactor]
always_allow_html: true
---

MOCVD Planetary Reactor G1 15" x 2" and 8" x 3"

This reactor was built for US company “Bandgap”, and then used by SST,
who was put it on CAE for sale.

Configuration:

|     | 1   | 2   | 3   | 4     | 5   | 6     | 7   | 8   |
|-----|:----|:----|:----|:------|:----|:------|:----|:----|
| Hyd | As1 | As2 | Ph1 | Si2H6 | HCl | Spare |     |     |
| MO  | Ga1 | Ga2 | In1 | In2   | Al1 | Al2   | Mg  | Zn  |

Temperature range: Up to 850°C  
Recently used for AlInGaP LEDs  
Gases used: Arsine, Phosphine, DiSi2H6, HCL  
Windows based operating system: Upgraded from OS9

<img src="/assets/img/G1/G1_cntrl.JPG" width="1704" />

**Inquiries for growth of 2” wafers on GaSb, GaAs, and InP could be sent
to kk{sign}photin.eu.**

*!!Thank you dr Chen for all!!*
