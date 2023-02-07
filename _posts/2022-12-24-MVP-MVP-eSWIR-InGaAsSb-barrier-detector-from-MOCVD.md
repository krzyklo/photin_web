---
title: MVP - eSWIR InGaAsSb barrier detector from MOCVD
author: "Krzysztof Kłos, Jiri Pangrac, Alice Hospodkova"
date: "24/12/2022"
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

cover-img: ["/assets/img/221224_MVP/First_Detectors_Measured1.png",
"/assets/img/221224_MVP/First_Detectors.png",
"/assets/img/221224_MVP/Valley-of-death-Source-Osawa-Miyazaki-2006_crop.png",
"/assets/img/221224_MVP/samples.jpg"]
thumbnail-img: /assets/img/221224_MVP/First_Detectors_Measured1.png
share-img: /assets/img/221224_MVP/samples.jpg
tags: [news,mvp, projects]
always_allow_html: true
---

### Intro into Antimonides in MOCVD - very challenging topic

MOCVD of Antimonides are notoriously difficult due to a few challenges,
that are not present for arsenides and phosphides. They are not so
arcane, as totally esoteric MOCVD epitaxy of HgCdTe (nurtured for over
\~7 years).  
How hard are they? Any, quantifiable metric? Lets see:

1.  Have fame to contaminate reactors, and poison GaAs and InP materials
    for some time, aftermath require extensive cleanings and bakings..
    this scare-off 95% of growers with newer, shiny, metal chamber
    Planetary and ShowerHead beauties who need to run production or R&D
    based on GaAs and InP.

2.  Labs which publish some MOCVD works on Antimonides: CQD prof.
    Razeghi, Tyndall Institute, EPFL, Sheffield University they are
    politely not interested, and refuse to grow any commercial wafers
    with specs..

3.  Companies inquired, ask $1M for doing R&D project on Antimonides
    (btw. it is not Photin ;D ).

4.  Projects with $500k-750k budget, run hundreds of cal runs and show
    publications, but no real devices ( “Advanced technologies for
    semiconductor infrared optoelectronics”, PBZ−MNiSW 02/I/2007, ITME
    Poland)

Technically, problems with Antimonides stems from:

1.  InSb low melting point 525C = cap on the highest possible growth
    temperatures (pyrolysis of precursors, carbon/oxygen doping issues).

2.  Phase separation and miscibility gap for Quaternary compounds

3.  Lack of semi-insulating GaSb substrate

4.  No viable hydride Sb precursor

5.  Strict, III / V ratio close to 1, any small deviation result in Ga
    droplets on surface or Sb hillocks

6.  Low temperatures move growths range into kinetically limited regime,
    where process become very sensitive to multiple parameters

**… but we did it, despite nimble budget that would make you laugh, we
kept our focus and worked for \~3 years, to get full eSWIR Antimonide
detector structure in MOCVD to TRL5-7**

**!! BIG THANKS TO Jiri Pangrac and Alice Hospodkova !!**

*Separate big thanks to so many of you who helped us, on this way, and
for one reason or other yet, we cannot name you directly!, your help is
remembered and appreciated!!!*

What has been done:

-   analyzed literature and with MUT simulated barrier detector
    structures  
-   gathered funds and then purchase materials - MO, substrates,
    dopants,  
-   engaged with FZU MOVPE lab into cooperation project  
-   analyzed optimal MO source/hardware setup of reactor and implemented
    it  
-   [grown and optimized GaSb
    buffers](https://www.photin.eu/2022-05-07-Buffers-GaSb-on-GaSb/),  
-   grown and optimized InGaAsSb absorber,  
-   grown and optimized AlGaAsSb barriers,  
-   grown and optimized Te and Zn doping,  
-   grown 3x samples of full structure of eSWIR barrier detector  
-   found partner to process sample structures (2 types of process
    configurations)
-   found partner to measure processed detectors, and shared results,
-   [bought FZU reactor where most of development was
    done](https://www.photin.eu/2022-05-20-FZU-Aix-200-transfer)  
-   [adapted GaN Aix-200 RF from Ulm Uni. to
    antimonides](https://www.photin.eu/2022-04-25-First-Runs-GaSb-on-GaSb/)  
-   [in parallel to FZU, initiated growth experiments on Photin’s
    Aix-200 RF
    system](https://www.photin.eu/2022-05-07-Buffers-GaSb-on-GaSb/)

We not wanted to engage into processing, which is also tricky on
antimonides, but as the result of Photon Hub Inverstor Readiness
Mentoring Programme, and discussions with [Anne
Lebreton-Wolf](https://youtu.be/bYNsXqIa_iI) realized that potential
investors would expect from us to show devices, not only
epi-characterization.. so, gritting our teeth, we delved into searching
for partners in the processing challenges.  
From \~6 potential places we have started talks, selected 3 most
promising, and finally, only one partner delivered what he promised, and
got a very special place in our heart!  
**Voila! here we have our devices and full MVP!!**

<img src="/../assets/img/221224_MVP/2625_JV_planarny_300um.png" width="50%" /><img src="/../assets/img/221224_MVP/2625_Ri_planarny_300um-1.png" width="50%" />

Two processing schemes were tested: planar (above), and mesa (below).

<img src="/../assets/img/221224_MVP/2625_JV_mesa_300um.png" width="50%" /><img src="/../assets/img/221224_MVP/2625_Ri_mesa_500um.png" width="50%" />

Discussion of the test detector results, will be subject of separate
post.  
There are a few improvements, that need to be implemented, but they are
daily bread for growers - improving lattice matching, and lowering Al
mole fraction in barrier layer.. also more on the epitaxy
characterization of MVP later..

*For now, lets admire traversing whole path of semiconductor
development, from device concept, simulation, growth, characterization,
processing and measurements.*

**Looking back, it is staggeringly amazing, all this happen within 1
year!?!**

### Technology Readiness Level - TRL

<img src="/../assets/img/221224_MVP/Valley-of-death-Source-Osawa-Miyazaki-2006.png" title="Valley of death. Source: Osawa, Miyazaki, 2006" alt="Valley of death. Source: Osawa, Miyazaki, 2006" width="100%" />

It was studied and well known, that most of startup projects face
“valley-of- death” around TRL5-7. This “disaster” will be addressed in
next EU New Horizon Framework, but we have now \~1 year till outcome of
this programs will take any real effect..

Lets dive-in, we are still sliding ;-)..

TRL5: Technology validated in relevant environment (industrially
relevant environment in the case of key enabling technologies)

TRL6: Technology demonstrated in relevant environment (industrially
relevant environment in the case of key enabling technologies)

TRL7: System prototype demonstration in operational environment

Aixtron MOCVD reactors are de-facto standard for industrial production
of compound semiconductors, and growth of full structure in such reactor
fulfill TRL6 definition.  
Processing of full structure, and demonstration of detector operation is
weak TRL7, which require a few more cycles of wafer growth and
processing, to refine epitaxy parameters, and exclude processing issues
affecting measurements.

### InGaAsSb / AlGaAsSb barrier detector - IC MOVPE Poster

![](/../assets/img/221224_MVP/P19-1449x2048-InGaAsSb-MOCVD-eSWIR.png)<!-- -->

### TBC.. In next posts:

-   why antimonides are 4th generation of semiconductors  
-   the best literature results - InGaAsSb eSWIR detectors Chart  
-   issues with incumbent extended InGaAs detector technology
-   Comparison of SIMS  
-   MVP - what was proven?  
-   discussion on valuation of technology

stay tuned…

![](/../assets/img/E0_with_bubblers.jpeg)<!-- -->
