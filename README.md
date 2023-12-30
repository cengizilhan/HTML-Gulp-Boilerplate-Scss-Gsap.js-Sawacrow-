# HTML Gulp Boilerplate ( Scss,Gsap.js, Sawacrow )

This HTML boilerplate is prepared by bringing together essential packages such as SCSS, jQuery, form mask js, animation js, Bootstrap, mobile menu, desktop multi-menu, and Swiper js, creating a ready-to-use template for every HTML project.

https://github.com/cengizilhan

https://github.com/otabekgh

## Install and Run
1) install /npm install or /yarn install
2) /npm run dev or /gulp for start

## Vendors
1) Bootstrap
2) DDFullScreenMenu - Mobile menu
3) Glightbox - Lightbox alternative but better ( video support )
4) InputMask 
5) sawaMotion - Scroll based animation trigger helper script for Gsap.js
6) superfish - Desktop multi menu
7) swiper 
8) Gsap - animation library

### Input Mask

run by attribute
```
<input data-inputmask="'alias': 'email'" />
<input data-inputmask="'alias': 'datetime'" />
<input data-inputmask="'mask': '9', 'repeat': 10, 'greedy' : false" />
<input data-inputmask="'mask': '99-9999999'" />
<input  type="text" class="form-control"  data-inputmask="'mask': 'a', 'repeat': 30, 'greedy' : false"  aria-describedby="emailHelp" placeholder="First Name*">
letters only
<input placeholder="testt" id="example232"  data-inputmask-regex="[a-zA-Z- ]*" />
```
https://github.com/RobinHerbots/Inputmask

### Flatpickr
```
<input class="flatpickr flatpickr-input" type="text" placeholder="Select Date.." data-id="minDate" readonly="readonly">

https://flatpickr.js.org/examples/#mindate-and-maxdate

```
