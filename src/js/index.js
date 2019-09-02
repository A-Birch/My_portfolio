import html2canvas from 'html2canvas';
import $ from 'jquery'
/*
// THANOS ANIMATION

//var Chance = require('chance');

// Instantiate Chance so it can be used
//var chance = new Chance();
var chance = require('chance').Chance();



// GUI CONTROLS
const controls = {
    duration: 2,
    blur: 3,
    windX: 70,
    windY: -100,
    scatter: 15,
    detail: 10
  }
//   const gui = new dat.GUI()
//   const durationGUI = gui.add(controls,"duration",1,10).step(.1);
//   const blurGUI = gui.add(controls,"blur",1,16).step(0.1);
//   gui.add(controls,"windX",-600,600).step(10);
//   gui.add(controls,"windY",-600,600).step(10);
//   gui.add(controls,"scatter",0,100).step(5);
//   gui.add(controls,"detail",10,70).step(1);
  
//   durationGUI.onChange((e) => {
//     updateCSSvars('fade-time', round(e,2), 's');
//     updateCSSvars('blur-time', round(e,2), 's');
//     updateCSSvars('quickFade-time', round(e-e*(e*.1),2), 's');
//   });
  
//   blurGUI.onChange((e) => {
//     updateCSSvars('blur-amount', round(e/16,3), 'em');
//   })
  
  
//   const updateCSSvars = (key, value, units) => {
//     document.documentElement.style.setProperty(`--${key}`, `${round(value,2)}${units}`);
//   }
  
//   const round = (value, precision) => {
//     const multiplier = Math.pow(10, precision);
//     return Math.round(value * multiplier) / multiplier;
//   }
//   // END: GUI CONTROLS
  
  document.getElementById('start-btn').addEventListener('click',(e) => {
    const target = document.querySelector(e.target.dataset.target);
    
    if(target.style.display === "none") {
      target.style.display = "";
    };
  
    Array.from(target.children).map(el => {
      el.classList.remove('quickFade');
    });
  
    snap(target);
  });
  
  const snap = (target) => {
    html2canvas(target,{
      allowTaint: false,
      useCORS: true,
      backgroundColor: 'transparent',
      scale: 1
    }).then(canvas => {
      //capture all div data as image
      const canvasCount = controls.detail;
      const ctx = canvas.getContext("2d");
      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelArr = imageData.data;
      const data = imageData.data.slice(0).fill(0);
      let imageDataArray = Array.from({length: canvasCount}, e => data.slice(0));
  
      //put pixel info to imageDataArray (Weighted Distributed)
      for (let i = 0; i < pixelArr.length; i+=4) {
        //find the highest probability canvas the pixel should be in
        const p = Math.floor((i/pixelArr.length) * canvasCount);
        const a = imageDataArray[weightedRandomDistrib(p,canvasCount)];
        
        // assign RGBA values from image to dust canvas
        a[i] = pixelArr[i];
        a[i+1] = pixelArr[i+1];
        a[i+2] = pixelArr[i+2];
        a[i+3] = pixelArr[i+3];
      }
  
      //create canvas for each imageData and append to target element
      for (let i = 0; i < canvasCount; i++) {
        const c = newCanvasFromImageData(imageDataArray[i], canvas.width, canvas.height);
        c.classList.add("dust");
        // c.style.zIndex = canvasCount - i;
        
        const d = controls.duration * 1000
        
        //apply animation
        setTimeout(() => {
          animateTransform(c,controls.windX,controls.windY,chance.integer({ min: -controls.scatter, max: controls.scatter }),d);
          c.classList.add('blur');
          setTimeout(() => {
            c.remove();
          }, d + 50);
        }, 65 * i + 4 * controls.duration);
        
        //append dust to target
        target.appendChild(c);
        
      }
      
      Array.from(target.querySelectorAll(':not(.dust)')).map(el => {
        el.classList.add('quickFade');
      });
             
    }).catch(function(error) {
      console.log(error);
    });
  }
  
  const weightedRandomDistrib = (peak,count) => {
    const prob = [], seq = [];
    for(let i=0;i<count;i++) {
      prob.push(Math.pow(count-Math.abs(peak-i),controls.detail/2));
      seq.push(i);
    }
    return chance.weighted(seq, prob);
  }
  
  const animateTransform = (elem,sx,sy,angle,duration) => {
    const td=0, tx=0, ty=0;
    elem.animate([
      // keyframes
      { transform: 'rotate(0) translate(0, 0)' },
      { transform: 'rotate(' + angle + 'deg) translate(' + sx + 'px,'+ sy +'px)' }
    ], { 
      // timing options
      duration: duration,
      easing: 'ease-in'
    });
  }
  
  const newCanvasFromImageData = (imageDataArray ,w , h) => {
    const canvas = document.createElement('canvas');
    canvas.width = w;
    canvas.height = h;
    const tempCtx = canvas.getContext("2d");
    tempCtx.putImageData(new ImageData(imageDataArray, w , h), 0, 0);
        
    return canvas;
  }
*/
// ANIMATION

function animateCSS(element, animationName, callback) {
  const node = document.querySelector(element)
  node.classList.add('animated', animationName)

  function handleAnimationEnd() {
      node.classList.remove('animated', animationName)
      node.removeEventListener('animationend', handleAnimationEnd)

      if (typeof callback === 'function') callback()
  }

  node.addEventListener('animationend', handleAnimationEnd)
}

animateCSS('.hero-text-box', 'bounceInLeft'); //bounceInLeft
// animateCSS('.down1', 'bounceInDown');
// animateCSS('.down2', 'bounceInDown');
// animateCSS('.down3', 'bounceInDown');

//import $ from 'jquery'

$(document).ready(function () {

// 	/* For the sticky navigation */
// 	$('.js--section-features').waypoint(function(direction) {
// 		if (direction == "down") {
// 			$('nav').addClass('sticky');
// 		} else {
// 			$('nav').removeClass('sticky');
// 		}
// 	}, {
//   offset: '60px;'
// });

	/* Scroll on buttons */

	// $('#start-btn').click(function () {
	// 	$('html, body').animate({scrollTop: $('#portfolio').offset().top}, 1000);
	// });

	
	/* Navigation scroll */
	$(function() {
	  $('a[href*="#"]:not([href="#"])').click(function() {
		if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
		  var target = $(this.hash);
		  target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
		  if (target.length) {
			$('html, body').animate({
			  scrollTop: target.offset().top
			}, 1000);
			return false;
		  }
		}
	  });
	});


	// /* Animations on scroll */
	// $('.js--wp-1').waypoint(function(direction) {
	// 	$('.js--wp-1').addClass('animated fadeIn');
	// 	}, {
	// 	offset: '50%'
	// });

	// $('.js--wp-2').waypoint(function(direction) {
	// 	$('.js--wp-2').addClass('animated fadeInUp');
	// 	}, {
	// 	offset: '50%'
	// });

	// $('.js--wp-3').waypoint(function(direction) {
	// 	$('.js--wp-3').addClass('animated fadeIn');
	// 	}, {
	// 	offset: '50%'
	// });

	// $('.js--wp-4').waypoint(function(direction) {
	// 	$('.js--wp-4').addClass('animated pulse');
	// 	}, {
	// 	offset: '50%'
	// });

	/* Mobile navigation */

	$('.js--nav-icon').click(function () {
		var nav = $('.js--main-nav');
		var icon = $('.js--nav-icon i');

		nav.slideToggle(200);

		if (icon.hasClass('icon-menu-button-of-three-horizontal-lines')) {
			icon.addClass('icon-cancel-mark');
			icon.removeClass('icon-menu-button-of-three-horizontal-lines');
		} else {
			icon.addClass('icon-menu-button-of-three-horizontal-lines');
			icon.removeClass('icon-cancel-mark');
		}

	});


});
  