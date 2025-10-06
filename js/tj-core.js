(function ($) {
  "use strict";
  /**
   * @param $scope The Widget wrapper element as a jQuery element
   * @param $ The jQuery alias
   */
  // Make sure you run this code under Elementor.
  $(window).on("elementor/frontend/init", function () {
    // global widget
    elementorFrontend.hooks.addAction("frontend/element_ready/widget", function ($scope, $) {
      // background image
      let bgImage = $scope.find("[data-bg-image]");
      if (bgImage.length > 0) {
        bgImage.each(function () {
          $(this).css("background-image", "url(" + $(this).attr("data-bg-image") + ")");
        });
      }

      let maskImage = $scope.find("[data-mask]");
      if (maskImage.length > 0) {
        maskImage.each(function () {
          $(this).css("mask-image", "url(" + $(this).attr("data-mask") + ")");
        });
      }

      // PureCounter initialization
      let pureCounter = $scope.find(".purecounter");
      if (pureCounter.length > 0 && typeof PureCounter !== "undefined") {
        // Clear previous counter instance if necessary
        if (window.pureCounter) {
          window.pureCounter.destroy && window.pureCounter.destroy(); // optional cleanup if needed
        }
        // Create new counter instance
        window.pureCounter = new PureCounter();
      }

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
            // markers: true,
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
            // markers: true,
          },
        });
      });
    });

    // tj-hero-slider
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-hero-banner-slider.default",

      function ($scope, $) {
        let heroSlider = $scope.find(".full-slider-active");

        let bannerWrap = $scope.find(".bannerWrap");

        let loop = bannerWrap.attr("data-loop") == "yes" ? true : false;
        let nav = bannerWrap.attr("data-nav") == "yes" ? true : false;
        let autoplay = bannerWrap.attr("data-autoplay") == "yes" ? true : false;
        let delay = bannerWrap.attr("data-delay") ? bannerWrap.attr("data-delay") : "5000";

        if (heroSlider.length > 0) {
          const sliderId = heroSlider.attr("id");

          var heroSlide = new Swiper(`#${sliderId}`, {
            slidesPerView: 1,
            spaceBetween: 0,
            effect: "fade",
            loop: loop,
            speed: 2000,
            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                  },
                }
              : {}),
            ...(nav
              ? {
                  navigation: {
                    prevEl: ".tj-btn-prev",
                    nextEl: ".tj-btn-next",
                  },
                }
              : {}),
            pagination: {
              el: ".tj-sw-pagination",
              type: "fraction",
              clickable: true,
              renderFraction: function (currentClass, totalClass) {
                return '<span class="' + currentClass + '"></span>' + ' <span class="dash"><span class="dash-inner"></span></span> ' + '<span class="' + totalClass + '"></span>';
              },
            },
            on: {
              init: function () {
                updateDashWidth(this);
              },
              slideChange: function () {
                updateDashWidth(this);
              },
            },
          });
          function updateDashWidth(swiper) {
            const dashInner = swiper.el.querySelector(".dash-inner");
            if (dashInner) {
              const realIndex = swiper.realIndex;
              const totalSlides = swiper.slides.length - swiper.loopedSlides * 2;
              const progressPercent = ((realIndex + 1) / totalSlides) * 100;
              dashInner.style.width = progressPercent + "%";
            }
          }
        }
      }
    );

    // tj-counter-two
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-counter-two.default",

      function ($scope, $) {
        var $counterItem = $scope.find(".funfact-item-two");

        if ($counterItem.length > 0) {
          var $counter = $counterItem.find(".odometer");

          if (!$counter.length) {
            return;
          }

          $counter.appear(
            function () {
              var odo = $counter;
              odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
              });
            },
            {
              offset: "80%",
            }
          );
        }
      }
    );

    // tj-counter
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-counter.default",

      function ($scope, $) {
        var $counterItem = $scope.find(".counter-item");
        if ($counterItem.length > 0) {
          var $counter = $counterItem.find(".odometer");
          if (!$counter.length) {
            return;
          }

          $counter.appear(
            function () {
              var odo = $counter;
              odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
              });
            },
            {
              offset: "80%",
            }
          );
        }
      }
    );

    // tj-about
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-about.default",

      function ($scope, $) {
        var $counterItem = $scope.find(".funfact-item-one");
        if ($counterItem.length > 0) {
          var $counter = $counterItem.find(".odometer");
          if (!$counter.length) {
            return;
          }
          $counter.appear(
            function () {
              var odo = $counter;
              odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
              });
            },
            {
              offset: "80%",
            }
          );
        }
      }
    );

    // tj-about-two
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-about-two.default",

      function ($scope, $) {
        var $counterItem = $scope.find(".counter-item");
        if ($counterItem.length > 0) {
          var $counter = $counterItem.find(".odometer");
          if (!$counter.length) {
            return;
          }
          $counter.appear(
            function () {
              var odo = $counter;
              odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
              });
            },
            {
              offset: "80%",
            }
          );
        }
      }
    );

    // tj-about-image
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-about-image.default",

      function ($scope, $) {
        var $counterItem = $scope.find(".testimonial-funfact");
        if ($counterItem.length > 0) {
          var $counter = $counterItem.find(".odometer");
          if (!$counter.length) {
            return;
          }
          $counter.appear(
            function () {
              var odo = $counter;
              odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
              });
            },
            {
              offset: "80%",
            }
          );
        }
      }
    );

    // tj-banner-four
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-banner-four.default",

      function ($scope, $) {
        var $counterItem = $scope.find(".counter-item");
        if ($counterItem.length > 0) {
          var $counter = $counterItem.find(".odometer");
          if (!$counter.length) {
            return;
          }
          $counter.appear(
            function () {
              var odo = $counter;
              odo.each(function () {
                var countNumber = $(this).attr("data-count");
                $(this).html(countNumber);
              });
            },
            {
              offset: "80%",
            }
          );
        }
      }
    );

    // image slider
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-image-slider.default",

      function ($scope, $) {
        let wrap = $scope.find(".carouselWrap");

        var loop = wrap.attr("data-loop") == "yes" ? true : false;
        var autoplay = wrap.attr("data-autoplay") == "yes" ? true : false;
        var delay = wrap.attr("data-delay") ? wrap.attr("data-delay") : "1";

        // Image Slider 1
        let imageSlider = $scope.find(".h6-hero-slider");
        if (imageSlider.length > 0) {
          let sliderId = imageSlider.attr("id");

          var imageSlide = new Swiper(`#${sliderId}`, {
            slidesPerView: "auto",
            spaceBetween: 30,
            freemode: true,
            centeredSlides: true,
            loop: loop,
            speed: 8000,
            allowTouchMove: false,

            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                  },
                }
              : {}),

            breakpoints: {
              0: {
                spaceBetween: 20,
              },
              1400: {
                spaceBetween: 30,
              },
            },
          });
        }
      }
    );

    // tj-services
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-services.default",

      function ($scope, $) {
        let wrap = $scope.find(".carouselWrap");

        var loop = wrap.attr("data-loop") == "yes" ? true : false;
        var dot = wrap.attr("data-dot") == "yes" ? true : false;
        var autoplay = wrap.attr("data-autoplay") == "yes" ? true : false;
        var delay = wrap.attr("data-delay") ? wrap.attr("data-delay") : "5000";

        // Service Slider 1
        let serviceSlider = $scope.find(".tj-service-slider");
        if (serviceSlider.length > 0) {
          let sliderId = serviceSlider.attr("id");

          var serviceSlide = new Swiper(`#${sliderId}`, {
            slidesPerView: 3,
            spaceBetween: 24,
            loop: loop,
            speed: 1500,

            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                  },
                }
              : {}),

            ...(dot
              ? {
                  pagination: {
                    el: ".service-pagination",
                    clickable: true,
                  },
                }
              : {}),
            navigation: {
              nextEl: ".slider-next",
              prevEl: ".slider-prev",
            },

            breakpoints: {
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 3,
              },
            },
          });
        }

        let serviceSlider6 = $scope.find(".h6-services-slider");
        if (serviceSlider6.length > 0) {
          let sliderId6 = serviceSlider6.attr("id");

          var serviceSlide6 = new Swiper(`#${sliderId6}`, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: loop,
            speed: 1500,

            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                  },
                }
              : {}),

            ...(dot
              ? {
                  pagination: {
                    el: ".swiper_pagination",
                    clickable: true,
                  },
                }
              : {}),
            breakpoints: {
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
            },
          });
        }

        // GSAP ScrollTrigger Animation
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);

          const serviceStack = $scope.find(".service-stack");

          if (serviceStack.length > 0 && window.innerWidth > 991) {
            serviceStack.each(function () {
              gsap.to(this, {
                opacity: 0,
                scale: 0.9,
                y: 50,
                scrollTrigger: {
                  trigger: this,
                  scrub: true,
                  start: "top top",
                  pin: true,
                  pinSpacing: false,
                  markers: false,
                },
              });
            });
          }
        }
      }
    );

    // service list
    elementorFrontend.hooks.addAction("frontend/element_ready/tj-service-list.default", function ($scope, $) {
      const wrap = $scope.find(".carouselWrap");

      const loop = wrap.attr("data-loop") === "yes";
      const dot = wrap.attr("data-dot") == "yes" ? true : false;
      const autoplay = wrap.attr("data-autoplay") === "yes";
      const delay = parseInt(wrap.attr("data-delay") || "5000");

      let serviceContent = $scope.find(".h5-service-content");
      let serviceItem = $scope.find(".service-style-5");
      $(serviceContent).on("mouseover", function () {
        $(this).parent(serviceItem).addClass("active").siblings().removeClass("active");
      });

      // home 9 service slider
      const serviceSlider9 = $scope.find(".h9-services-slider");
      if (serviceSlider9.length > 0) {
        const sliderId = serviceSlider9.attr("id");

        new Swiper(`#${sliderId}`, {
          slidesPerView: 1,
          spaceBetween: 30,
          loop: loop,
          speed: 1500,
          ...(autoplay && {
            autoplay: {
              delay: delay,
            },
          }),
          ...(dot
            ? {
                pagination: {
                  el: ".swiper_pagination",
                  clickable: true,
                },
              }
            : {}),
          breakpoints: {
            0: {
              slidesPerView: 1,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
          },
        });
      }
    });

    // tj-project
    elementorFrontend.hooks.addAction("frontend/element_ready/tj-project-carousel.default", function ($scope, $) {
      const wrap = $scope.find(".carouselWrap");

      const loop = wrap.attr("data-loop") === "yes";
      const dot = wrap.attr("data-dot") == "yes" ? true : false;
      const nav = wrap.attr("data-nav") == "yes" ? true : false;
      const autoplay = wrap.attr("data-autoplay") === "yes";
      const delay = parseInt(wrap.attr("data-delay") || "5000");

      // Find Swiper inside this widget
      const projectSlider = $scope.find(".project-slider");
      if (projectSlider.length > 0) {
        const sliderId = projectSlider.attr("id");

        new Swiper(`#${sliderId}`, {
          slidesPerView: 4,
          spaceBetween: 24,
          loop: loop,
          speed: 2000,
          ...(autoplay && {
            autoplay: {
              delay: delay,
            },
          }),
          ...(nav && {
            navigation: {
              nextEl: ".project-next",
              prevEl: ".project-prev",
            },
          }),
          breakpoints: {
            375: {
              slidesPerView: 1,
            },
            576: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            992: {
              slidesPerView: 3,
            },
            1200: {
              slidesPerView: 3,
            },
            1400: {
              slidesPerView: 4,
            },
          },
        });
      }
      // Custom Cursor Logic
      const cursor = document.querySelector(".tj-cursor"); // global
      const container = $scope[0].querySelector(".project-slider-one"); // scoped swiper container

      if (cursor && container) {
        // Initial GSAP setup
        gsap.set(cursor, { xPercent: -50, yPercent: -50 });

        // Move cursor on pointer
        document.addEventListener("pointermove", (e) => {
          gsap.to(cursor, {
            duration: 0,
            x: e.clientX,
            y: e.clientY,
          });
        });

        // Show/hide on hover within this widget's container
        container.addEventListener("mouseenter", () => {
          cursor.style.opacity = "1";
          cursor.style.visibility = "visible";
        });

        container.addEventListener("mouseleave", () => {
          cursor.style.opacity = "0";
          cursor.style.visibility = "hidden";
        });

        // Wrap `cursor` with jQuery
        const $cursor = $(cursor);

        $("a, .sub-menu").on("mouseenter", function () {
          $cursor.addClass("d-none");
        });
        $("a, .sub-menu").on("mouseleave", function () {
          $cursor.removeClass("d-none");
        });
      }

      // home 5 projects
      const projectSlider5 = $scope.find(".h5-case-study-slider");
      if (projectSlider5.length > 0) {
        const sliderId = projectSlider5.attr("id");

        new Swiper(`#${sliderId}`, {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: loop,
          speed: 2000,
          arrow: false,
          ...(autoplay && {
            autoplay: {
              delay: delay,
            },
          }),
          ...(dot
            ? {
                pagination: {
                  el: ".swiper_pagination",
                  clickable: true,
                },
              }
            : {}),
          breakpoints: {
            992: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          },
        });
      }

      // home 7 projects
      const project7Slider = $scope.find(".h7-case-study-slider");
      if (project7Slider.length > 0) {
        const sliderId = project7Slider.attr("id");

        var project7 = new Swiper(`#${sliderId}`, {
          slidesPerView: 1,
          loop: loop,
          speed: 1800,
          effect: "coverflow",
          grabCursor: true,
          centeredSlides: true,
          spaceBetween: -100,
          coverflowEffect: {
            rotate: 0,
            stretch: 0,
            depth: 800,
            modifier: 1,
            slideShadows: false,
          },
          ...(autoplay && {
            autoplay: {
              delay: delay,
            },
          }),
          ...(dot
            ? {
                pagination: {
                  el: ".swiper_pagination",
                  clickable: true,
                },
              }
            : {}),
          ...(nav
            ? {
                navigation: {
                  nextEl: ".tj-project-nav-next",
                  prevEl: ".tj-project-nav-prev",
                },
              }
            : {}),
        });
      }

      // home 8 projects
      const projectSlider8 = $scope.find(".h8-case-study-slider");
      if (projectSlider8.length > 0) {
        const sliderId = projectSlider8.attr("id");

        new Swiper(`#${sliderId}`, {
          slidesPerView: 1,
          spaceBetween: 20,
          loop: loop,
          speed: 2000,
          arrow: false,
          ...(autoplay && {
            autoplay: {
              delay: delay,
            },
          }),
          ...(dot
            ? {
                pagination: {
                  el: ".swiper_pagination",
                  clickable: true,
                },
              }
            : {}),
          breakpoints: {
            992: {
              slidesPerView: 2,
              spaceBetween: 30,
            },
          },
        });
      }

      // home 9 projects
      let h8BlogWrap = $scope.find(".h9-case-study-wrapper");
      if (h8BlogWrap.length > 0) {
        $(".h9-case-study-item").on("mouseover", function () {
          $(this).addClass("active").siblings().removeClass("active");
        });
      }
    });

    // tj project stack
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-project-list-2.default",

      function ($scope, $) {
        // GSAP ScrollTrigger Animation
        if (typeof gsap !== "undefined" && typeof ScrollTrigger !== "undefined") {
          gsap.registerPlugin(ScrollTrigger);

          const h6ProjectStack = $scope.find(".project-stack");

          if (h6ProjectStack.length > 0 && window.innerWidth > 991) {
            h6ProjectStack.each(function () {
              gsap.to(this, {
                scrollTrigger: {
                  trigger: this,
                  scrub: true,
                  start: "top top",
                  pin: true,
                  pinSpacing: false,
                  markers: false,
                },
              });
            });
          }

          const h10ProjectStack = $scope.find(".service-stack");
          if (h10ProjectStack.length > 0 && window.innerWidth > 991) {
            h10ProjectStack.each(function () {
              gsap.to(this, {
                opacity: 0,
                scale: 0.9,
                y: 50,
                scrollTrigger: {
                  trigger: this,
                  scrub: true,
                  start: "top top",
                  pin: true,
                  pinSpacing: false,
                  markers: false,
                },
              });
            });
          }
        }
      }
    );

    // tj-brand-carousel
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-brand-carousel.default",

      function ($scope, $) {
        let wrap = $scope.find(".carouselWrap");

        var loop = wrap.attr("data-loop") == "yes" ? true : false;
        var autoplay = wrap.attr("data-autoplay") == "yes" ? true : false;
        var delay = wrap.attr("data-delay") ? wrap.attr("data-delay") : "1";

        // brand 1
        let brandCarouselWrap1 = $scope.find(".brand-slider-1");
        if (brandCarouselWrap1.length > 0) {
          let carouselId = brandCarouselWrap1.attr("id");
          var brandCarousel = new Swiper(`#${carouselId}`, {
            slidesPerView: "auto",
            spaceBetween: 30,
            freemode: true,
            centeredSlides: true,
            allowTouchMove: false,
            loop: loop,
            speed: 3000,
            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                    disableOnInteraction: false,
                  },
                }
              : {}),
            breakpoints: {
              0: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 2.5,
              },
              768: {
                slidesPerView: 3.3,
              },
              992: {
                slidesPerView: 4.5,
              },
              1200: {
                slidesPerView: 5.2,
              },
              1400: {
                slidesPerView: 6,
              },
            },
          });
        }

        // brand 2
        let brandCarouselWrap2 = $scope.find(".brand-slider-2");
        if (brandCarouselWrap2.length > 0) {
          let carouselId = brandCarouselWrap2.attr("id");
          var brandCarousel2 = new Swiper(`#${carouselId}`, {
            slidesPerView: "auto",
            spaceBetween: 30,
            freemode: true,
            centeredSlides: true,
            allowTouchMove: false,
            loop: loop,
            speed: 3000,
            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                    disableOnInteraction: false,
                  },
                }
              : {}),
            breakpoints: {
              0: {
                slidesPerView: 2,
              },
              576: {
                slidesPerView: 2.5,
              },
              768: {
                slidesPerView: 3.3,
              },
              992: {
                slidesPerView: 4.5,
              },
              1200: {
                slidesPerView: 5.2,
              },
              1400: {
                slidesPerView: 6,
              },
            },
          });
        }
      }
    );

    // tj-marquee
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-marquee.default",

      function ($scope, $) {
        let marquee = $scope.find(".marquee-slider");

        if (marquee.length > 0) {
          const marqueeId = marquee.attr("id");

          var marqueeSlider = new Swiper(`#${marqueeId}`, {
            slidesPerView: "auto",
            spaceBetween: 0,
            freemode: true,
            centeredSlides: true,
            loop: true,
            speed: 4000,
            allowTouchMove: false,
            autoplay: {
              delay: 1,
              disableOnInteraction: true,
            },
          });
        }

        // home 6
        let h6Marquee = $scope.find(".h6-marquee-slider");
        if (h6Marquee.length > 0) {
          const marqueeId = h6Marquee.attr("id");

          let marqueeSlider = new Swiper(`#${marqueeId}`, {
            slidesPerView: "auto",
            spaceBetween: 20,
            freemode: true,
            centeredSlides: true,
            loop: true,
            speed: 4000,
            allowTouchMove: false,
            autoplay: {
              delay: 1,
            },
          });
        }
      }
    );

    // tj-project-list
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-project-list.default",

      function ($scope, $) {
        let scrollContent = $scope.find(".marquee-slider-wrapper-two");

        if (scrollContent.length > 0) {
          gsap.to(".marquee-slider-wrapper-two", {
            scrollTrigger: {
              trigger: ".tj-project-section-two",
              start: "top center-=200",
              pin: ".marquee-slider-wrapper-two",
              end: "bottom bottom-=200",
              markers: false,
              pinSpacing: false,
              scrub: 1,
            },
          });
        }
      }
    );

    // tj-team
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-team.default",

      function ($scope, $) {
        let wrap = $scope.find(".carouselWrap");

        let loop = wrap.attr("data-loop") == "yes" ? true : false;
        let dot = wrap.attr("data-dot") == "yes" ? true : false;
        let autoplay = wrap.attr("data-autoplay") == "yes" ? true : false;
        let delay = wrap.attr("data-delay") ? wrap.attr("data-delay") : "5000";

        let teamSlider = $scope.find(".tj-team-slider");
        if (teamSlider.length > 0) {
          const sliderId = teamSlider.attr("id");

          var teamslide = new Swiper(`#${sliderId}`, {
            slidesPerView: 4,
            spaceBetween: 24,
            loop: loop,
            speed: 1500,
            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                  },
                }
              : {}),
            ...(dot
              ? {
                  pagination: {
                    el: ".service-pagination",
                    clickable: true,
                  },
                }
              : {}),
            breakpoints: {
              0: {
                slidesPerView: 1,
              },
              460: {
                slidesPerView: 2,
              },
              768: {
                slidesPerView: 2,
              },
              992: {
                slidesPerView: 3,
              },
              1024: {
                slidesPerView: 4,
              },
            },
          });
        }

        // home 10 team
        let teamWrapper = $scope.find(".h10-team-wrapper");
        if (teamWrapper.length > 0) {
          $(".h10-team-item").on("mouseover", function () {
            $(this).addClass("active").siblings().removeClass("active");
          });
        }
      }
    );

    // tj-testimonial
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-testimonial.default",

      function ($scope, $) {
        let wrap = $scope.find(".carouselWrap");

        let loop = wrap.attr("data-loop") == "yes" ? true : false;
        let nav = wrap.attr("data-nav") == "yes" ? true : false;
        let dot = wrap.attr("data-dot") == "yes" ? true : false;
        let autoplay = wrap.attr("data-autoplay") == "yes" ? true : false;
        let delay = wrap.attr("data-delay") ? wrap.attr("data-delay") : "5000";

        let testimonialSlider = $scope.find(".tj-testimonial-slider");
        if (testimonialSlider.length > 0) {
          const sliderId = testimonialSlider.attr("id");

          var testimonial = new Swiper(`#${sliderId}`, {
            slidesPerView: 3,
            spaceBetween: 24,
            loop: loop,
            speed: 1500,
            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                  },
                }
              : {}),
            ...(nav
              ? {
                  navigation: {
                    nextEl: ".slider-next",
                    prevEl: ".slider-prev",
                  },
                }
              : {}),
            ...(dot
              ? {
                  pagination: {
                    el: ".testimonial-pagination",
                    clickable: true,
                  },
                }
              : {}),
            breakpoints: {
              0: {
                slidesPerView: 1,
              },
              768: {
                slidesPerView: 1,
              },
              992: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 2,
              },
            },
          });
          var star_rating_width = $(".fill-ratings span").width();
          $(".star-ratings").width(star_rating_width);
        }

        // testimonial slider 2
        let testimonialSlider2 = $scope.find(".tj-testimonial-slider-two");
        if (testimonialSlider2.length > 0) {
          const sliderId = testimonialSlider2.attr("id");
          var testimonial = new Swiper(`#${sliderId}`, {
            slidesPerView: 1,
            spaceBetween: 0,
            loop: loop,
            speed: 1500,
            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                  },
                }
              : {}),
            ...(nav
              ? {
                  navigation: {
                    nextEl: ".slider-next",
                    prevEl: ".slider-prev",
                  },
                }
              : {}),
          });
          var star_rating_width = $(".fill-ratings span").width();
          $(".star-ratings").width(star_rating_width);
        }

        // testimonial slider 3
        let testimonialSlider3 = $scope.find(".testimonial-slider-two");
        if (testimonialSlider3.length > 0) {
          const sliderId = testimonialSlider3.attr("id");

          var testimonial = new Swiper(`#${sliderId}`, {
            slidesPerView: 3,
            spaceBetween: 65,
            centeredSlides: true,
            loop: loop,
            speed: 2000,
            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                  },
                }
              : {}),
            ...(dot
              ? {
                  pagination: {
                    el: ".testimonial-pagination",
                    clickable: true,
                  },
                }
              : {}),
            breakpoints: {
              320: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 1.5,
              },
              992: {
                slidesPerView: 1.5,
              },
              1200: {
                slidesPerView: 1.9,
              },
              1440: {
                slidesPerView: 2.9,
              },
            },
          });
          var star_rating_width = $(".fill-ratings span").width();
          $(".star-ratings").width(star_rating_width);
        }

        // testimonial slider 4
        let testimonialSlider4 = $scope.find(".h6-testimonial-slider");
        if (testimonialSlider4.length > 0) {
          let slider4Id = testimonialSlider4.attr("id");

          let testimonial = new Swiper(`#${slider4Id}`, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: loop,
            speed: 1500,
            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                  },
                }
              : {}),
            ...(nav
              ? {
                  navigation: {
                    nextEl: ".slider-next",
                    prevEl: ".slider-prev",
                  },
                }
              : {}),
            ...(dot
              ? {
                  pagination: {
                    el: ".testimonial-pagination",
                    clickable: true,
                  },
                }
              : {}),
            breakpoints: {
              450: {
                slidesPerView: 1.5,
              },
              576: {
                slidesPerView: 1.5,
              },
              768: {
                slidesPerView: 1.5,
              },
              992: {
                slidesPerView: 2.5,
              },
              1200: {
                slidesPerView: 2.5,
              },
              1400: {
                slidesPerView: 3,
              },
            },
          });
          var star_rating_width = $(".fill-ratings span").width();
          $(".star-ratings").width(star_rating_width);
        }

        // testimonial tab
        let h7TestimonialWrap = $scope.find(".h7-testimonial-wrap");
        if (h7TestimonialWrap.length > 0) {
          $(".h7-testimonial-single .testimonial-content").on("click", function () {
            $(this).parent(".h7-testimonial-single").addClass("active").siblings().removeClass("active");
          });
          var star_rating_width = $(".fill-ratings span").width();
          $(".star-ratings").width(star_rating_width);
        }

        // testimonial slider 8

        const testimonialsMarqueeSliders = {};

        function testimonialsMarquee(selector, isReverse = false, speed = 8000) {
          const screenWidth = window.innerWidth;
          const direction = screenWidth >= 768 ? "vertical" : "horizontal";

          // Destroy previous instance if exists
          if (testimonialsMarqueeSliders[selector]) {
            testimonialsMarqueeSliders[selector].destroy(true, true);
          }

          // Init if element exists
          if ($(selector).length > 0) {
            testimonialsMarqueeSliders[selector] = new Swiper(selector, {
              slidesPerView: "auto",
              spaceBetween: screenWidth >= 768 ? 30 : 24,
              centeredSlides: true,
              loop: true,
              allowTouchMove: false,
              speed: speed,
              direction: direction,
              autoplay: {
                delay: 0,
                disableOnInteraction: false,
                reverseDirection: isReverse,
              },
            });
          }
        }

        // Use scoped selectors within widget
        const upSelector = $scope.find(".tj-slider-up");
        const downSelector = $scope.find(".tj-slider-down");

        if (upSelector.length) {
          testimonialsMarquee(`.${upSelector.attr("class").split(" ").join(".")}`, false, 8000);
        }
        if (downSelector.length) {
          testimonialsMarquee(`.${downSelector.attr("class").split(" ").join(".")}`, true, 8000);
        }

        // home 9 testimonial
        let clientThumb = $scope.find(".client-thumb");
        if (clientThumb.length > 0) {
          let clientId = clientThumb.attr("id");
          var thumbs = new Swiper(`#${clientId}`, {
            slidesPerView: 3,
            spaceBetween: 20,
            loop: true,
            speed: 1500,
            freeMode: true,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            breakpoints: {
              0: {
                slidesPerView: 1.4,
                spaceBetween: 10,
              },
              430: {
                slidesPerView: 1.6,
              },
              530: {
                slidesPerView: 2,
                spaceBetween: 10,
              },
              768: {
                slidesPerView: 2.4,
              },
              992: {
                slidesPerView: 3,
                centeredSlides: true,
              },
            },
          });
        }

        let testimonialSlider9 = $scope.find(".h9-testimonial-slider");
        if (testimonialSlider9.length > 0) {
          let slider9Id = testimonialSlider9.attr("id");

          let testimonial = new Swiper(`#${slider9Id}`, {
            slidesPerView: 1,
            spaceBetween: 28,
            loopedSlides: 3,
            loop: loop,
            speed: 1500,
            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                  },
                }
              : {}),
            ...(nav
              ? {
                  navigation: {
                    nextEl: ".slider-next",
                    prevEl: ".slider-prev",
                  },
                }
              : {}),
            ...(dot
              ? {
                  pagination: {
                    el: ".swiper_pagination",
                    clickable: true,
                  },
                }
              : {}),
          });
          testimonial.controller.control = thumbs;
          thumbs.controller.control = testimonial;
        }

        // home 10 testimonial
        let testimonialSlider10 = $scope.find(".h10-testimonial-slider");
        if (testimonialSlider10.length > 0) {
          let slider10Id = testimonialSlider10.attr("id");

          let testimonial10 = new Swiper(`#${slider10Id}`, {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: loop,
            speed: 1500,
            navigation: {
              nextEl: ".slider-next",
              prevEl: ".slider-prev",
            },
            ...(autoplay
              ? {
                  autoplay: {
                    delay: delay,
                  },
                }
              : {}),
            ...(dot
              ? {
                  pagination: {
                    el: ".testimonial-pagination",
                    clickable: true,
                  },
                }
              : {}),
            breakpoints: {
              768: {
                slidesPerView: 2,
              },
              1200: {
                slidesPerView: 3,
              },
            },
          });
        }
      }
    );

    // tj-progress-bar
    elementorFrontend.hooks.addAction(
      "frontend/element_ready/tj-progress-bar.default",

      function ($scope, $) {
        // circle progress bar
        let progressItem = $scope.find(".knob");
        if (typeof $.fn.knob != "undefined") {
          $(progressItem).each(function () {
            var $this = $(this),
              knobVal = $this.attr("data-rel");

            $this.knob({
              draw: function () {
                $(this.i).val(this.cv + "%");
              },
            });

            $this.appear(
              function () {
                $({
                  value: 0,
                }).animate(
                  {
                    value: knobVal,
                  },
                  {
                    duration: 2000,
                    easing: "swing",
                    step: function () {
                      $this.val(Math.ceil(this.value)).trigger("change");
                    },
                  }
                );
              },
              {
                accX: 0,
                accY: -150,
              }
            );
          });
        }
        // horizontal progress bar
        const progressContainers = document.querySelectorAll(".tj-progress");

        if (progressContainers?.length) {
          progressContainers.forEach((progressContainer) => {
            const targetedProgressBar = progressContainer.querySelector(".tj-progress__bar");
            const completedPercent = parseInt(targetedProgressBar.getAttribute("data-perchant"), 10) || 0;

            gsap.to(targetedProgressBar, {
              width: `${completedPercent}%`, // Correct width
              ease: "power2.out",
              duration: 1,
              scrollTrigger: {
                trigger: progressContainer, // Use container for better scroll handling
                start: "top 90%",
                end: "top 30%",
              },
              onUpdate: function () {
                let progressValue = Math.round(this.progress() * 100); // Corrected scaling
                let displayPercent = Math.round((completedPercent * progressValue) / 100); // Fixes low % issue

                const percentageText = progressContainer.querySelector(".tj-progress__perchant");
                if (percentageText) {
                  percentageText.textContent = displayPercent + "%";
                }
              },
            });
          });
        }
      }
    );

    // tj-process
    elementorFrontend.hooks.addAction("frontend/element_ready/tj-process.default", function ($scope, $) {
      let processItem = $scope.find(".h5-process_item");

      if (processItem.length > 0) {
        // Add active class to the first item by default
        processItem.first().addClass("active");

        // On hover, activate the hovered item and deactivate siblings
        processItem.on("mouseenter", function () {
          $(this).addClass("active").siblings().removeClass("active");
        });
      }

      // process style 2
      let processWrapper = $scope.find(".h7-process-inner");
      if (processWrapper.length > 0) {
        // process hover effect
        const $processContainer = $(".h7-process-inner");
        if ($processContainer.length) {
          const $processItems = $processContainer.find(".h7-process-item");
          const $processLineActive = $processContainer.find(".process-line-active");
          // add active class to item
          if ($processItems.length) {
            const totalPortion = 100 / $processItems.length;

            $processLineActive.css({
              left: "0",
              top: "0",
            });

            // Activate the first item by default
            $processItems.removeClass("active");
            $processItems.eq(0).addClass("active");
            $processLineActive.css("top", `0%`);

            $processItems.each(function (idx) {
              $(this).on("mouseenter", function () {
                $processItems.removeClass("active");
                $processLineActive.css("top", `${totalPortion * idx}%`);
                $(this).addClass("active");
              });
            });
          }
        }
      }

      // process style 3
      let processWrapper8 = $scope.find(".h8-process-inner");
      if (processWrapper8.length > 0) {
        // process hover effect
        const $processContainer8 = $(".h8-process-inner");
        if ($processContainer8.length) {
          const $processItems8 = $processContainer8.find(".process-item");
          const $processLineActive8 = $processContainer8.find(".process-line-active");
          // add active class to item
          if ($processItems8.length) {
            const totalPortion = 100 / $processItems8.length;

            $processLineActive8.css({
              left: "0",
              top: "0",
            });

            // Activate the first item by default
            $processItems8.removeClass("active");
            $processItems8.eq(0).addClass("active");
            $processLineActive8.css("left", `0%`);

            $processItems8.each(function (idx) {
              $(this).on("mouseenter", function () {
                $processItems8.removeClass("active");
                $processLineActive8.css("left", `${totalPortion * idx}%`);
                $(this).addClass("active");
              });
            });
          }
        }
      }
    });

    // tj-advanced-tab
    elementorFrontend.hooks.addAction("frontend/element_ready/tj-advanced-tab.default", function ($scope, $) {
      let wrapper = $scope.find(".h6-team-wrapper");
      let teamSlider = $scope.find(".team-tab-slider");

      let tabs = $scope.find(".h6-tab");
      let tabsContent = $scope.find(".h6-tab-content");

      if (wrapper.length > 0) {
        let sliderID = teamSlider.attr("id");

        let team = new Swiper(`#${sliderID}`, {
          slidesPerView: 1,
          spaceBetween: 24,
          loop: false,
          speed: 1500,
          breakpoints: {
            320: {
              spaceBetween: 15,
              slidesPerView: 2.5,
            },
            576: {
              slidesPerView: 3.5,
            },
            768: {
              slidesPerView: 4.2,
            },
            1024: {
              slidesPerView: 5.5,
            },
            1200: {
              slidesPerView: 6,
            },
          },
        });

        [...tabs].forEach((tab) => {
          tab.addEventListener("click", () => {
            [...tabs].forEach((t) => t.classList.remove("active"));
            [...tabsContent].forEach((c) => c.classList.remove("active"));

            tab.classList.add("active");
            const index = tab.getAttribute("data-index");
            document.getElementById("tab-" + index).classList.add("active");
          });
        });
      }
    });

    // tj-video-info
    elementorFrontend.hooks.addAction("frontend/element_ready/tj-video-info.default", function ($scope, $) {
      let videoPopup = $scope.find(".video-popup");

      if (videoPopup.length > 0) {
        new VenoBox({
          selector: ".video-popup",
          numeration: true,
          spinner: "pulse",
        });
      }
    });

    // home 8 latest post
    elementorFrontend.hooks.addAction("frontend/element_ready/tj-latest-posts.default", function ($scope, $) {
      let h8BlogWrap = $scope.find(".h8-blog-wrapper");
      if (h8BlogWrap.length > 0) {
        $(".h8-blog-item .blog-images").on("mouseover", function () {
          $(this).parent(".h8-blog-item").addClass("active").siblings().removeClass("active");
        });
      }
    });

    // home 9 hero banner
    elementorFrontend.hooks.addAction("frontend/element_ready/tj-hero-banner.default", function ($scope, $) {
      let marquee9 = $scope.find(".h9-hero-marquee-slider");
      if (marquee9.length > 0) {
        const marqueeId = marquee9.attr("id");
        var marqueeSlider = new Swiper(`#${marqueeId}`, {
          slidesPerView: "auto",
          spaceBetween: 0,
          freemode: true,
          centeredSlides: true,
          loop: true,
          speed: 8000,
          allowTouchMove: false,
          autoplay: {
            delay: 1,
            disableOnInteraction: true,
          },
        });
      }

      // Initialize Chart.js pie chart
      const ctx = $scope.find(".tj-pie-chart");
      if (ctx.length > 0 && typeof Chart !== "undefined") {
        ctx.each(function () {
          const ctxSingle = this;

          // Get data-color and sanitize
          let bgColorsAttr = ctxSingle.getAttribute("data-color");

          // Fix: support comma-separated or JSON-like string
          let backgroundColors = ["#f7f7f7", "#f7f7f7", "#0075ff"];
          if (bgColorsAttr) {
            try {
              // Try to parse as JSON first (if it's like '["#fff","#000"]')
              if (bgColorsAttr.trim().startsWith("[")) {
                backgroundColors = JSON.parse(bgColorsAttr);
              } else {
                // Fallback to comma-separated string
                backgroundColors = bgColorsAttr.split(",").map((c) => c.trim().replace(/^['"]|['"]$/g, ""));
              }
            } catch (e) {
              console.warn("Invalid data-color format", e);
            }
          }

          const data = {
            datasets: [
              {
                label: "47",
                data: [20, 12, 15],
                backgroundColor: backgroundColors,
                borderWidth: 0,
                spacing: 4,
                hoverOffset: 0,
              },
            ],
          };

          const options = {
            cutout: "60%",
          };

          new Chart(ctxSingle, {
            type: "doughnut",
            data,
            options,
          });
        });
      }
      // end
    });
  });
})(jQuery);
