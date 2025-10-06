/*--------------- TABLE OF CONTENTS -------------

01. Preloader Js
02. Data BG Js
03. Header Sticky Js
04. Search Bar Js
05. Hamburger Menu Js
06. Nice Select Js
07. Blog Slider Js
08. Rating Js Js
09. Fun Fact Js
10. Project 3 Active Js
11. Circle Proggess Bar Js
12. VenoBox Js
13. Mouse Js
14. Backtotop Js
15. Price box Js
16. Gsap Js

-------------------------------------------------*/

(function ($) {
  "use strict";

  /* ------------- Preloader Js -------------*/

  var wind = $(window);
  wind.on("load", function () {
    $(".preloader").fadeOut(600);
  });

  /* ------------- Data BG Js -------------*/

  $("[data-bg-image]").each(function () {
    var $this = $(this),
      $image = $this.data("bg-image");
    $this.css("background-image", "url(" + $image + ")");
  });
  $("[data-mask]").each(function () {
    var $this = $(this),
      $mask_image = $this.data("mask");
    $this.css("mask-image", "url(" + $mask_image + ")");
  });

  /* ------------- Header Sticky Js -------------*/

  var lastScrollTop = "";
  function stickyMenu($targetMenu, $toggleClass) {
    var st = $(window).scrollTop();
    if ($(window).scrollTop() > 500) {
      if (st > lastScrollTop) {
        $targetMenu.removeClass($toggleClass);
      } else {
        $targetMenu.addClass($toggleClass);
      }
    } else {
      $targetMenu.removeClass($toggleClass);
    }

    lastScrollTop = st;
  }

  $(window).on("scroll", function () {
    if ($(".tj-header-area").length) {
      stickyMenu($(".header-sticky"), "sticky");
    }
  });

  /* ------------- Search Bar Js -------------*/

  $(".header_search").on("click", function () {
    $(".search_popup").addClass("search-opened");
    $(".search-popup-overlay").addClass("opened");
  });
  $(".search_close_btn").on("click", function () {
    $(".search_popup").removeClass("search-opened");
    $(".search-popup-overlay").removeClass("opened");
  });
  $(".search-popup-overlay").on("click", function () {
    $(".search_popup").removeClass("search-opened");
    $(this).removeClass("opened");
  });

  /* ------------- Hamburger Menu  Js -------------*/

  $("#main-menu").meanmenu({
    meanMenuContainer: ".mobile_menu",
    meanScreenWidth: "1024",
    meanExpand: ['<i class="tji-angle-down"></i>'],
  });

  $(".menu_btn").on("click", function () {
    $(".hamburger-area").addClass("opened");
    $(".body-overlay").addClass("opened");
  });
  $(".hamburgerCloseBtn").on("click", function () {
    $(".hamburger-area").removeClass("opened");
    $(".body-overlay").removeClass("opened");
  });
  $(".body-overlay").on("click", function () {
    $(".hamburger-area").removeClass("opened");
    $(".body-overlay").removeClass("opened");
  });

  /* ------------- Nice Select  Js -------------*/

  if ($("select").length > 0) {
    $("select").niceSelect();
  }

  /* ------------- Blog Slider  Js -------------*/

  if ($(".blog-standard-slider").length > 0) {
    var blog = new Swiper(".blog-standard-slider", {
      slidesPerView: 1,
      loop: true,
      speed: 1200,
      autoplay: {
        delay: 5000,
      },
      navigation: {
        nextEl: ".slider-next",
        prevEl: ".slider-prev",
      },
    });
  }

  // Portfolio Js
  function initPortfolioFilter() {
    const $gridContainer = $(".grid");
    if (!$gridContainer.length) {
      return;
    }
    const $filterButtons = $(".filter-button-group");
    const $portfolioMenuButtons = $(".portfolio-menu button");

    $gridContainer.imagesLoaded(function () {
      const $grid = $gridContainer.isotope();

      $filterButtons.on("click", "button", function () {
        const filterValue = $(this).attr("data-filter");
        $grid.isotope({ filter: filterValue });
      });

      $portfolioMenuButtons.on("click", function (event) {
        event.preventDefault();
        $portfolioMenuButtons.removeClass("active");
        $(this).addClass("active");
      });
    });
  }
  initPortfolioFilter();

  /* ------------- Project 3 Active Js -------------*/

  $(".project-style-3").on("mouseenter", function () {
    $(this).addClass("active").siblings().removeClass("active");
  });

  // Accordion functionality
  $(".header").on("click", function () {
    const $header = $(this);
    const $caseItem = $header.parent();
    const isActive = $caseItem.hasClass("active");

    // Close all sections
    $(".case-item").removeClass("active").find(".icon").removeClass("active");

    // Toggle current section
    if (!isActive) {
      $caseItem.addClass("active");
      $header.find(".icon").addClass("active");
    }
  });

  /* ------------- VenoBox Js -------------*/

  if ($(".ig-gallery").length > 0) {
    new VenoBox({
      selector: ".ig-gallery",
      numeration: true,
      spinner: "pulse",
    });
  }
  if ($(".video-popup").length > 0) {
    new VenoBox({
      selector: ".video-popup",
      numeration: true,
      spinner: "pulse",
    });
  }

  /* ------------- Mouse Js -------------*/

  $(".slider-drag").on("mouseenter", function () {
    $(".mouseCursor").addClass("cursor-big");
  });
  $(".slider-drag").on("mouseleave", function () {
    $(".mouseCursor").removeClass("cursor-big");
  });

  $("a,.sub-menu").on("mouseenter", function () {
    $(".mouseCursor,.tj-cursor").addClass("d-none");
  });
  $("a,.sub-menu").on("mouseleave", function () {
    $(".mouseCursor,.tj-cursor").removeClass("d-none");
  });

  $(".project-slider-one").on("mouseenter", function () {
    $(".mouseCursor").addClass("d-none");
  });
  $(".project-slider-one").on("mouseleave", function () {
    $(".mouseCursor").removeClass("d-none");
  });

  $(".view-project").on("mouseenter", function () {
    $(".mouseCursor").addClass("project-cursor");
  });
  $(".view-project").on("mouseleave", function () {
    $(".mouseCursor").removeClass("project-cursor");
  });

  function itCursor() {
    var myCursor = jQuery(".mouseCursor");
    if (myCursor.length) {
      if ($("body")) {
        const e = document.querySelector(".cursor-inner"),
          t = document.querySelector(".cursor-outer");
        let n,
          i = 0,
          o = !1;
        (window.onmousemove = function (s) {
          o || (t.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (e.style.transform = "translate(" + s.clientX + "px, " + s.clientY + "px)"),
            (n = s.clientY),
            (i = s.clientX);
        }),
          $("body").on("mouseenter", "button, a, .cursor-pointer", function () {
            e.classList.add("cursor-hover"), t.classList.add("cursor-hover");
          }),
          $("body").on("mouseleave", "button, a, .cursor-pointer", function () {
            ($(this).is("a", "button") && $(this).closest(".cursor-pointer").length) || (e.classList.remove("cursor-hover"), t.classList.remove("cursor-hover"));
          }),
          (e.style.visibility = "visible"),
          (t.style.visibility = "visible");
      }
    }
  }
  itCursor();

  if ($(".cursor-inner").length > 0) {
    const cursorInner = document.querySelector(".cursor-inner span");
    const sliders = document.querySelectorAll(".slider-drag.content");
    const originalContent = cursorInner.innerHTML;

    sliders.forEach((slider) => {
      slider.addEventListener("mouseenter", () => {
        const newText = slider.getAttribute("data-text");
        if (newText) {
          cursorInner.innerHTML = newText;
        }
      });

      slider.addEventListener("mouseleave", () => {
        cursorInner.innerHTML = originalContent;
      });
    });
  }

  /* ------------- Backtotop Js -------------*/

  function back_to_top() {
    var btn = $("#back_to_top");
    var btn_wrapper = $(".back-to-top-wrapper");
    $(window).on("scroll", function () {
      if ($(window).scrollTop() > 800) {
        btn_wrapper.addClass("back-to-top-btn-show");
      } else {
        btn_wrapper.removeClass("back-to-top-btn-show");
      }
    });
    btn.on("click", function (e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "300");
    });
  }
  back_to_top();

  /* ------------- Price box Js -------------*/

  var year = $(".yearly");
  var month = $(".monthly");

  var price = $(".price-number");
  var period = $(".period");

  year.on("click", function () {
    $(this).addClass("active");
    month.removeClass("active");
    price.each(function () {
      $(this).text($(this).data("year-price"));
    });
    period.each(function () {
      $(this).text($(this).data("year-period"));
    });
  });
  month.on("click", function () {
    $(this).addClass("active");
    year.removeClass("active");
    price.each(function () {
      $(this).text($(this).data("month-price"));
    });
    period.each(function () {
      $(this).text($(this).data("month-period"));
    });
  });

  /* Animated Wow Js */

  $(window).on("load", function () {
    var wow = new WOW({
      boxClass: "wow",
      animateClass: "animated",
      offset: 80, // default
      callback: function (box) {
        $(box).css("visibility", "visible");
        $(box).css("opacity", "1");
      },
    });
    wow.init();
  });

  // header top toggler
  if ($(".header-topbar-toggler").length > 0) {
    const headerTop = document.querySelector(".header-topbar");
    const headerTopToggler = headerTop.querySelector(".header-topbar-toggler");

    if (headerTop) {
      headerTop.style.height = `${headerTop.offsetHeight}px`;
      headerTop.style.padding = `0px`;
      headerTopToggler.addEventListener("click", function () {
        headerTop.style.height = `0px`;
      });
    }
  }

  /* ------------- Gsap Js -------------*/

  gsap.registerPlugin(ScrollTrigger, TweenMax);

  gsap.config({
    nullTargetWarn: false,
  });

  let device_width = window.innerWidth;
  function initStickySidebar() {
    if (device_width >= 1024) {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      const startPoint = device_width >= 1024 ? 100 : 120;
      gsap.to(".tj-sticky", {
        scrollTrigger: {
          trigger: ".tj-sticky",
          start: `top ${startPoint}`,
          end: `bottom ${startPoint}`,
          pin: true,
          scrub: 1,
        },
      });
    }
  }
  initStickySidebar();
  window.addEventListener("resize", () => {
    initStickySidebar();
  });

  /* Text Effect Animation */
  if ($(".text-anim").length) {
    let staggerAmount = 0.03,
      translateXValue = 20,
      delayValue = 0.1,
      easeType = "power2.out",
      animatedTextElements = document.querySelectorAll(".text-anim");

    animatedTextElements.forEach((element) => {
      let animationSplitText = new SplitText(element, { type: "chars, words" });
      gsap.from(animationSplitText.chars, {
        duration: 1,
        delay: delayValue,
        x: translateXValue,
        autoAlpha: 0,
        stagger: staggerAmount,
        ease: easeType,
        scrollTrigger: { trigger: element, start: "top 85%" },
      });
    });
  }

  if ($(".hero-text-anim").length) {
    let staggerAmount = 0.05,
      delayValue = 0.4,
      easeType = "power1.out",
      heroTextElements = document.querySelectorAll(".hero-text-anim");

    heroTextElements.forEach((element) => {
      let animationSplitText = new SplitText(element, { type: "chars, words" });
      gsap.from(animationSplitText.chars, {
        opacity: 0,
        duration: 0.4,
        delay: delayValue,
        ease: easeType,
        stagger: staggerAmount,
        scrollTrigger: { trigger: element, start: "top 85%" },
      });
    });
  }

  // Text Invert
  if ($(".tj-text-invert").length) {
    const split = new SplitText(".tj-text-invert", { type: "lines" });
    split.lines.forEach((target) => {
      gsap.to(target, {
        backgroundPositionX: 0,
        ease: "none",
        scrollTrigger: {
          trigger: target,
          scrub: 1,
          start: "top 85%",
          end: "bottom center",
        },
      });
    });
  }

  // border radius animation
  if ($(".tj-about-section").length) {
    gsap.set(".tj-about-section", {
      "--br-bottom-left": "0px",
    });
    gsap.to(".tj-about-section", {
      "--br-bottom-left": "410px",
      ease: "power3.out", // extra smoothness on top of scrub
      scrollTrigger: {
        trigger: ".tj-about-section",
        start: "bottom 120%",
        end: "bottom 50%", // longer scroll for slower animation
        scrub: 0.8, // smooth scrub with inertia feel
        // markers: true,
      },
    });
  }

  // Parallax GSAP
  ScrollTrigger.matchMedia({
    "(min-width: 768px)": function () {
      document.querySelectorAll(".tjParallaxSection").forEach((section, i) => {
        const image = section.querySelector(".tjParallaxImage");
        if (image) {
          gsap.to(image, {
            y: "-25%",
            ease: "none",
            scrollTrigger: {
              trigger: section,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
              // id: "parallax-" + i, // optional for debugging
              // markers: true,
            },
          });
        }
      });
    },
  });

  // itemScrollAnimation
  const teamItems = document.querySelectorAll(".itemScrollAnimate");
  teamItems.forEach((item, index) => {
    const isEven = index % 2 === 0;
    gsap.fromTo(
      item,
      {
        transform: isEven ? "perspective(1000px) rotateX(50deg)" : "perspective(1000px) rotateX(-50deg)",
      },
      {
        transform: isEven ? "perspective(1000px) rotateX(0deg)" : "perspective(1000px) rotateX(0deg)",
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          id: `teamItemTrigger-${index}`,
          trigger: item,
          start: "top 100%",
          end: "top 40%",
          scrub: true,
          // markers: true,
        },
      }
    );
  });

  // SVG Animation
  document.querySelectorAll(".svg-animate").forEach((box) => {
    // Check if the element has the class .svg-animate
    if (box.classList.contains("svg-animate")) {
      const paths = box.querySelectorAll("path");

      paths.forEach((path) => {
        const length = path.getTotalLength();

        // Set initial state
        gsap.set(path, {
          strokeDasharray: length,
          strokeDashoffset: length,
          visibility: "visible",
          opacity: 1,
        });

        // Animate on scroll
        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 1.5,
          ease: "power2.out",
          scrollTrigger: {
            trigger: box,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });
      });
    }
  });

  // right swipe
  document.querySelectorAll(".rightSwipeWrap").forEach((wrap, i) => {
    gsap.set(wrap.querySelectorAll(".right-swipe"), {
      transformPerspective: 1200,
      x: "10rem",
      rotateY: -20,
      opacity: 0,
      transformOrigin: "right center",
    });
    gsap.to(wrap.querySelectorAll(".right-swipe"), {
      transformPerspective: 1200,
      x: 0,
      rotateY: 0,
      opacity: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: wrap,
        start: "top 80%",
        id: "rightSwipeWrap-" + i,
        toggleActions: "play none none none",
      },
    });
  });

  // left swipe
  document.querySelectorAll(".leftSwipeWrap").forEach((wrap, i) => {
    gsap.set(wrap.querySelectorAll(".left-swipe"), {
      transformPerspective: 1200,
      x: "-10rem",
      rotateY: 20,
      opacity: 0,
      transformOrigin: "left center",
    });
    gsap.to(wrap.querySelectorAll(".left-swipe"), {
      transformPerspective: 1200,
      x: 0,
      rotateY: 0,
      opacity: 1,
      delay: 0.3,
      ease: "power3.out",
      scrollTrigger: {
        trigger: wrap,
        start: "top 80%",
        id: "leftSwipeWrap-" + i,
        toggleActions: "play none none none",
      },
    });
  });

  // Hero banner parallax
  ScrollTrigger.matchMedia({
    "(min-width: 992px)": function () {
      const hero = document.querySelector(".heroStack .tj-hero-section");
      const overlay = document.querySelector(".heroStack .stackOverlay");

      if (hero) {
        // Parallax move of the whole hero section
        gsap.to(hero, {
          y: "30%",
          opacity: 0,
          ease: "none",
          scrollTrigger: {
            trigger: hero,
            start: "top top",
            end: "bottom top",
            scrub: true,
            // markers: true,
          },
        });
      }
    },
  });

  /**
   * Elementor JS Hooks
   */
})(jQuery);
