---
title: Trumpf / Huttinger TIG/BIG Analog RF Generators for Induction Heating
subtitle: Induction Heater Repair at End Of Life 
author: "Krzysztof Kłos"
date: "06/08/2025"
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

cover-img: ["../assets/img/250208_InAs_photodiodes/hot_reactor.png"]
thumbnail-img: /assets/img/250208_InAs_photodiodes/mesa1.png
share-img: /assets/img/250208_InAs_photodiodes/mesa1.png
tags: [news, MOCVD, Trumpf, Huttinger, Induction Heater, RF Generator, TIG 10/100]
always_allow_html: true
---

### Trumpf / Huttinger TIG/BIG Induction Heaters

Over the 20 years, we have never seen TIG/BIG RF Induction Heater fail
in the field! Never!, until **our one** in Aix-200RF reactor just
stopped working in beginning of 2025.

<figure>

<img src="{{site.url}}/assets/img/250806_Huttinger/LED28_Mismatch.png" alt="Huttinger TIG 10/100 Failure"/>

<figcaption>
Fig. 1. Huttinger TIG 10/100 Failure - LED 28 Mismatch
</figcaption>
</figure>

We have in total 4x Huttinger RF Induction Heaters. One of them
venerable 42-years old hero manufactured in 1984, which served reliably
for all those years in Aixtron nr 1 commercial reactor from 1985 (serial
nr 1101/814), acquired from FZU.

<figure>

<img src="{{site.url}}/assets/img/250806_Huttinger/venerable_one.png" alt="Huttinger Hero"/>

<figcaption>
Fig. 2. Venerable Huttinger RF Heating Hero from 1984
</figcaption>
</figure>

### Trumpf EOL

In the first contact with Huttinger now Trumpf service team we learned,
that our TIG heater are just at EOL for support in ~2months.

<figure>
<img src="{{site.url}}/assets/img/250806_Huttinger/EOL.png" alt="EOL for TIG/BIG Huttinger RF heaters"/>
<figcaption>
Fig. 3. EOL for TIG/BIG Huttinger Analog RF Generators / Heaters
</figcaption>
</figure>

It was surprising to see how many variants and models of this induction
heaters were manufactured.  
[EOL see the
PDF](/assets/img/250806_Huttinger/2023_12_Customer-Letter_End-of-Service-Life_BIG_TIG_Analog.pdf)  
We had incomplete, poor quality paper documentation of our TIG, and
can’t obtain PDF version, so searching for clues and understanding in
paper documentation was long and painful.  
Weeks passed, our generator was disassembled to pieces, and still we
couldn’t find reason for “LED 28 Mismatch Error”.  
To our surprise, despite production site for newer RF/HF generators in
Poland(Zielonka), there was no engineer in Poland, who know old analog
RF/HF generators, and we can’t get any service support in Poland from
Trumpf.  
Getting Trumpf service engineer from Germany is very expensive. So
expensive, that it was difficult to justify it without running out of
all other options, and we were scrambling in panic against EOL
deadline.  
Big thanks to CELEM capacitors team in France:
<https://www.celem.com/Conduction_cooled_capacitors>! If anyone need
reliable Induction Capacitors, CELEM is the right choice. They looked on
the pictures we sent in email, and told us straight, that their
capacitors are not root cause issue :-)!!  
Of course we needed to be 100% sure, so we paid local CELEM distributor
company, to test them (they also wanted to take our TIG as “hostage” for
repair, but we decided to keep repairs on site, as were not impressed by
technical prowess of their local technicians).  
Those marvelous tank capacitors, which every second get beating of
THOUSANDS!! of Volts, they just work! after 30 years in the field!!
WOW!!

<figure>
<img src="{{site.url}}/assets/img/250806_Huttinger/Celem_capacitors.png" alt="Celem Tank capacitors just work! after 30 years of being beated by 1kV"/>
<figcaption>
Fig. 5. Celem Tank capacitors just work! after 30 years of being beated
by 1kV
</figcaption>
</figure>

### Solution!!

After 2 months of attempts to repair, decided to change tactic, drop
repair for the time being, and just swap our TIG 10/100 to 2nd spare TIG
10/100 unit (though risky tactic, as 2nd one was never tested by us so
far, and standing in warehouse for emergency problems like this one
;/).  
2nd unit turned out to be different inside: different PCBs, different
interconnections, some pins different on plugs.. all despite having the
same model brand name “TIG 10/100”. No so easy swap!!  
<figure>
<img src="{{site.url}}/assets/img/250806_Huttinger/old_and_replacement_TIG.jpeg" alt="Replacement of TIG 1st to TIG 2nd"/>
<figcaption>
Fig. 4. Two different TIG 10/100 next to each other to be swapped.
</figcaption>
</figure>
We even dragged venerable 1984 hero as backup, and started to wire it up
for heat up test in parallel.. but..  
Finally, after long 3 months of fighting, 2nd unit started to work!!
This was the biggest downtime we had so far.  
Painful deep-tech lesson in RF heating.. but now we are way more
prepared to tackle quickly any problems with TIGs.  
<figure>
<img src="{{site.url}}/assets/img/250806_Huttinger/front.jpeg" alt="First tests of slow heating up"/>
<figcaption>
Fig. 5. You could only imagine what euphoria it was to see our TIG
10/100 wake up again, and see temperatures goes up up uup.. WOHOHOO!!!
YEAHH!!
</figcaption>
</figure>

### Key take away - EOL situation

So it is Aug 2025, and we are now on our own with 4x units of TIGs. The
TIG/BIG Huttinger Analog RF Generators are no longer supported, and we
work in background to get working 2nd and 3rd spare TIG/BIG.  
We have some spare parts for them, and we believe that we will be able
to keep them working for a few years more.  
Our insight suggest, that most frequently failures are located in the
Oscillator board, which we have now **one original unit as spare**.  
We are devoted 6R “zeals”. We Refuse to throw away old equipment, and
make insane efforts to Repair and Recycle as much as possible.  
As usual with old EOL equipment, users need to unite. If anyone has
problem with Trumpf Huttinger TIG/BIG Analog RF Generators for Induction
Heating, please lets get in touch.  
After EOL all users are on their own, and need to build up network of
community users and local hands-on engineers support for such equipment.

### Quick Comparison of MOCVD Heating Technologies

Over the 20 years of working with MOCVD reactors, we have been able to
use in field all heating technologies applied by Aixtron. Induction is
the best technology as we see it.

Nowadays, produced CCS and Planetary reactors use just three heating
techs:

1.  Tungsten heaters in nitride and HT CCS reactors. Very fragile and
    delicate.  
2.  Graphite heaters in As/P CCS reactors. Usually lifetime of a few
    years of industrial use.  
3.  Induction heaters used in all Planetary reactors. Most reliable and
    convenient, but TC are to be replaced with pyrometers.

Older Horizontal reactors with quartz reactor tube and first generations
of Planetary reactors, used also IR halogen heaters, and Induction
heaters.  
IR halogens require quite often replacements, but it is external and
outside of reactor tube, so it is just 1-2h of work to replace such
broken IR halogen lamp, but they disrupt straightforward in-situ
reflectance monitoring.  
Planetary and CCS reactors are less efficient than horizontal reactor
technology, from energy consumption for heating/cooling point of view.
Their metal chambers are actively cooled down to ~30-60 degC, so cooling
capacity need to be larger than dissipated heating power. Heat and cool
reactor chamber at the same time. Heating graphite susceptor inside, and
at the same time cooling base plate, whole reactor walls and ceiling to
limit deposition on them.  
In Aix-200 type of quartz reactors for As/P/Sb materials, there is no
such race between heating and cooling of chamber, the only cooled part
is RF Coil or IR reflectors, and reactor chamber is passively cooled by
air (sometimes with 1-2 fans to make sure o-rings works below
~60degC).  
GaN Aix-200 though, have also cooled quartz chamber, as they could be
heated above 1200C, where quartz become soft, and active cooling by
water of quartz is necessary.
