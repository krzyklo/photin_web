---
title: PHOTIN InAs/InAsSbP achieve state of the art performance
subtitle: InAs IR Detectors device performance
author: "Krzysztof Kłos"
date: "18/02/2025"
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

cover-img: ["../assets/img/250208_InAs_photodiodes/hot_reactor.png", 
"../assets/img/250208_InAs_photodiodes/susceptor.png"]
thumbnail-img: /assets/img/250208_InAs_photodiodes/mesa1.png
share-img: /assets/img/250208_InAs_photodiodes/mesa1.png
tags: [news, MOCVD, InAs, InAsSbP, detector]
always_allow_html: true
---

### Device results from Photin wafers

In 2024 our facility receive major upgrade with installation of Hydrogen
purifier based on Palladium Diffusion Membrane technology, which allow
to obtain ultimate purity of hydrogen for growth of semiconductors.  
The performance of grown materials were tested on InAs on SI GaAs
substrates (to be reported soon) for wafer level characterization, and
InAs-InAsSbP structures for device results.  
We arranged quick processing and measured a couple of 200, 300, 400 and
500um diameter photodiodes from InAs/InAsSbP structure to assess its
performance.

<figure>

<img src="{{site.url}}/assets/img/250208_InAs_photodiodes/InAs_photodiode_meas.png" alt="Fig. 1. InAs-InAsSbP I-V and Responsivity."/>

<figcaption>
Fig. 1. InAs-InAsSbP I-V and Responsivity for various mesa diameters.
</figcaption>
</figure>

Small responsivity is justified, as this detector was illuminated
through InAs n-type substrate. Though, **why dark current is so small?**
Initially we thought that area normalization is wrong, or someone added
somewhere 100x factor by accident. The dark current looked too small,
and R<sub>0</sub>A too high..??  
The 200-300 mesa size shows clearly larger dark currents due to sidewall
leakage currents. This highlight practical importance of research on IR
detector passivation, that is subject of our
[InnoGlobo2](https://www.gov.pl/web/ncbr/ii-konkurs-w-ramach-programu-innoglobo)
project with Military University of Technology.  
Currently more samples from this wafer are being processed, to measure
it’s performance in illumination from top.

### R<sub>0</sub>A as figure of merit of IR detectors

R<sub>0</sub>A product is a popular photon IR detector figure of merit.
It is defined as the product of dynamic resistance at zero bias,
R<sub>0</sub>A, by sensitive area, A. R<sub>0</sub>A is inversely
proportional to the saturation current density J<sub>s</sub> of a
photodiode:

R<sub>0</sub>A = kT / ( eJ<sub>s</sub>)

It is possible to have high R<sub>0</sub>A, and low dark current, when
the vallence barrier impede minority carrier transport and hence
photocurrent, but this structure have reasonable responsivity @10mV
despite being illuminated through InAs substrate. Additionally, for
InAs-InAsSbP bandgap offsets are such, that they usually not form
valence barrier, in opposite to InAs-AlAsSb or InAs-AlGaAsSb usually
grown in MBE.

### Investigation about InAs-based detectors performance

Hamamatsu, VIGO, Laser Components, Judson are the companies that offer
InAs detectors, and their datasheets are first quick benchmark of what
performance to expect.

<table class="table lightable-material lightable-striped lightable-hover" style="margin-left: auto; margin-right: auto; font-family: &quot;Source Sans Pro&quot;, helvetica, sans-serif; margin-left: auto; margin-right: auto;">
<thead>
<tr>
<th style="text-align:center;">
Vendor
</th>
<th style="text-align:center;">
Diam., um
</th>
<th style="text-align:center;">
R0Atyp, Ohm.cm2
</th>
<th style="text-align:center;">
Rsh-min Ohm
</th>
<th style="text-align:center;">
Rsh-typ. Ohm
</th>
<th style="text-align:center;">
Jsat, A/cm2
</th>
<th style="text-align:center;">
Datasheet
</th>
</tr>
</thead>
<tbody>
<tr>
<td style="text-align:center;font-weight: bold;">
<a href="https://vigophotonics.com/product/pva-3-1x1-to39-nw-90/"> VIGO
</a>
</td>
<td style="text-align:center;">
1000
</td>
<td style="text-align:center;">
0.51
</td>
<td style="text-align:center;">
50
</td>
<td style="text-align:center;">
65
</td>
<td style="text-align:center;">
0.051
</td>
<td style="text-align:center;font-weight: bold;">
<img src="../../assets/img/250208_InAs_photodiodes/viewpdf.svg" width="89.6" height="64">
<a href="https://vigophotonics.com/app/uploads/2024/07/PVA-3-detector-preliminary-datasheet.pdf">
PVA-3-1x1 </a>
</td>
</tr>
<tr>
<td style="text-align:center;font-weight: bold;">
<a href="https://www.hamamatsu.com/jp/en/product/optical-sensors/infrared-detector/inas-photovoltaic-detector/P10090-01.html">
Hamamatsu </a>
</td>
<td style="text-align:center;">
1000
</td>
<td style="text-align:center;">
0.55
</td>
<td style="text-align:center;">
40
</td>
<td style="text-align:center;">
70
</td>
<td style="text-align:center;">
0.047
</td>
<td style="text-align:center;font-weight: bold;">
<img src="../../assets/img/250208_InAs_photodiodes/viewpdf.svg" width="89.6" height="64">
<a href="https://www.hamamatsu.com/content/dam/hamamatsu-photonics/sites/documents/99_SALES_LIBRARY/ssd/p10090-01_etc_kird1099e.pdf">
P10090-01 </a>
</td>
</tr>
<tr>
<td style="text-align:center;font-weight: bold;">
<a href="https://www.teledynejudson.com/products/indium-arsenide-detectors">
Judson </a>
</td>
<td style="text-align:center;">
250
</td>
<td style="text-align:center;">
0.15
</td>
<td style="text-align:center;">
200
</td>
<td style="text-align:center;">
300
</td>
<td style="text-align:center;">
0.180
</td>
<td style="text-align:center;font-weight: bold;">
<img src="../../assets/img/250208_InAs_photodiodes/viewpdf.svg" width="89.6" height="64">
<a href="https://www.teledynejudson.com/prods/Part%20Specs/420002PODr0.pdf">
J12-18C-R250U </a>
</td>
</tr>
<tr>
<td style="text-align:center;font-weight: bold;">
<a href="https://www.teledynejudson.com/products/indium-arsenide-detectors">
Judson </a>
</td>
<td style="text-align:center;">
1000
</td>
<td style="text-align:center;">
0.20
</td>
<td style="text-align:center;">
15
</td>
<td style="text-align:center;">
25
</td>
<td style="text-align:center;">
0.130
</td>
<td style="text-align:center;font-weight: bold;">
<img src="../../assets/img/250208_InAs_photodiodes/viewpdf.svg" width="89.6" height="64">
<a href="https://www.teledynejudson.com/prods/Part%20Specs/420003PODr0.pdf">
J12-18C-R01M </a>
</td>
</tr>
<tr>
<td style="text-align:center;font-weight: bold;">
<a href="http://www.photin.eu/"> Photin </a>
</td>
<td style="text-align:center;">
500
</td>
<td style="text-align:center;">
2.10
</td>
<td style="text-align:center;">
NA
</td>
<td style="text-align:center;">
1070
</td>
<td style="text-align:center;">
0.012
</td>
<td style="text-align:center;font-weight: bold;">
<img src="../../assets/img/250208_InAs_photodiodes/viewpdf.svg" width="89.6" height="64">
<a href="https://www.photin.eu"> Ph-IA3.5-0.5-RT </a>
</td>
</tr>
<tr>
<td style="text-align:center;font-weight: bold;">
<a href="https://www.lasercomponents.com/en/product/inas-900-3500-nm/">
LaserComp. </a>
</td>
<td style="text-align:center;">
500
</td>
<td style="text-align:center;">
1.37
</td>
<td style="text-align:center;">
450
</td>
<td style="text-align:center;">
700
</td>
<td style="text-align:center;">
0.019
</td>
<td style="text-align:center;font-weight: bold;">
<img src="../../assets/img/250208_InAs_photodiodes/viewpdf.svg" width="89.6" height="64">
<a href="https://www.lasercomponents.com/fileadmin/user_upload/home/Datasheets/lc-ingaas/ia35s500-inas.pdf">
IA35 </a>
</td>
</tr>
</tbody>
</table>

The R<sub>0</sub>A is in range of 0.2-0.55 Ohm.cm2, except for Laser
Components 1.37 Ohm.cm2.  
Without doubt our results of 2.1 Ohm.cm2 clearly stand out.

Literature research at first sight shows a few publications, where InAs
detectors were developed with parameters comparable to commercial :  
- [Janet Renee Pedrazzani PhD, MBE](http://hdl.handle.net/1802/12773),
Chap.5, R0A ~0.1 Ohm.cm2  
- [Benjamin White PhD, Sheffield Univ., MBE +
MOCVD](https://etheses.whiterose.ac.uk/id/eprint/15466/1/Ben%20White%20-%20Thesis.pdf),
0.15 Ohm.cm2 or Jsat ~ 0.17 A/cm2 (at -0.5V),  
- [Zhou et al. Sheffield Univ.
MOCVD](https://doi.org/10.1109/JSEN.2015.2443563), R0A ~0.1 A/cm2

Deeper search finally shown, that state of the art InAs detectors
actually reach R0A ~2.0 Ohm.cm2, or equivalent 1e-2 A/cm2 dark current
density, and it is not MBE InAs-AlAsSb, but InAs-InAsSbP materials:

- [Chineese group using LPE
  technology](https://doi.org/10.1002/pssa.202100281),  
- [V.Tetyorkin et al. “InAs Infrared
  Photodiodes”](https://doi.org/10.5772/14084) report Ioffe devices
  reach 2.0 Ohm.cm2

### Why it matters

III-V semiconductors are used for laser, detectors, modulators, SLEDs,
and Photonics Integrated Circuits. GaAs lattice matched compounds are
used for near infrared \<1um, InP-based platform is used for 1um-~1.7um
range. InAs and GaSb based platform are used for SWIR, MWIR and LWIR
devices above 2um.  
Looking at more mature InP-platform, we have 2 competing compounds,
AlInGaAs and InGaAsP. InGaAsP devices have poorer performance than
AlInGaAs, but lack of reliability risks without Alluminum, makes still
InGaAsP very popular compound for InP devices and PICs.  
In InP-platform MBE technology use is limited for devices and PICs,
where multiple growths are required on single wafer, as MBE growth is
not conformal. Hence, majority of InP devices are grown by MOCVD, it is
technology of choice on market.

Type 2 superlattices InAs-InAsSb (T2SLs) are currently replacing HgCdTe
infrared detectors in commercial market of SWIR/MWIR/LWIR devices.  
MBE technology in SWIR/MWIR/LWIR use InAs/GaSb or InAs/InAsSb T2SLs with
AlSb/AlAsSb/AlGaAsSb barriers. The Al-based barriers give reliability
risks in similar way to AlInGaAs in InP platform.  
This is why we expect, that in longer term MOCVD InAs/InAsSbP will be
favoured for SWIR/MWIR/LWIR IR detectors and PICs applications.  

### Key take away

No other Polish company, institute or university was able so far to
showcase InAs ~3.5um detectors based on III-Sb semiconductors with
better dark current performance than our reported results.  
Currently Photin ability to grow Sb-based, 6.1A family of III-V
compounds in MOCVD provide researchers unique opportunities in SWIR/MWIR
device development.
