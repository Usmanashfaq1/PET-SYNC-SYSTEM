
(function() {
  "use strict";

  /**
   * Easy selector helper function
   */
  //its loading the page 
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

 

  

  /**
   * Preloader 
   */
  let preloader = select('#preloader');
  if (preloader) {
    window.addEventListener('load', () => {
      preloader.remove() //here removing pre loader
    });
  }

 

  

  /**
   * Initiate Pure Counter 
   */
  new PureCounter();

})()