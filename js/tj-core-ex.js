function _typeof(o) {
	"@babel/helpers - typeof";
	return (
		(_typeof =
			"function" == typeof Symbol && "symbol" == typeof Symbol.iterator
				? function (o) {
						return typeof o;
				  }
				: function (o) {
						return o &&
							"function" == typeof Symbol &&
							o.constructor === Symbol &&
							o !== Symbol.prototype
							? "symbol"
							: typeof o;
				  }),
		_typeof(o)
	);
}

/* global TJ_ADDONS_JS */
(function ($) {
	/**
	 * @param $scope The Widget wrapper element as a jQuery element
	 * @param $ The jQuery alias
	 */
	// Make sure you run this code under Elementor.
	$(window).on("elementor/frontend/init", function () {
		var device_width = $(window).width();
		var elementorBreakpoints =
			elementorFrontend.config.responsive.activeBreakpoints;
		var Modules = elementorModules.frontend.handlers.Base;

		if (
			"object" === (typeof gsap === "undefined" ? "undefined" : _typeof(gsap))
		) {
			// Pin Element
			var PingArea = Modules.extend({
				bindEvents: function bindEvents() {
					if (this.isEdit) {
						return;
					}
					if ("yes" !== this.getElementSettings("tj_enable_pin_area")) {
						return;
					}
					if (this.getElementSettings("tj_pin_breakpoint")) {
						if (
							device_width >
							elementorBreakpoints[this.getElementSettings("tj_pin_breakpoint")]
								.value
						) {
							this.run();
						}
					} else {
						this.run();
					}
				},
				run: function run() {
					var pin_area = this.$element;
					var pin_area_start = this.getElementSettings("tj_pin_area_start");
					var pin_area_end = this.getElementSettings("tj_pin_area_end");
					var end_trigger = this.getElementSettings("tj_pin_end_trigger");
					var pin_status = this.getElementSettings("tj_pin_status");
					var tj_pin_spacing = this.getElementSettings("tj_pin_spacing");
					var tj_pin_type = this.getElementSettings("tj_pin_type");
					var tj_pin_scrub = this.getElementSettings("tj_pin_scrub");
					var tj_pin_markers = this.getElementSettings("tj_pin_markers");
					if ("number" === tj_pin_scrub) {
						tj_pin_scrub = this.getElementSettings("tj_pin_scrub_number");
					} else {
						tj_pin_scrub = tj_pin_scrub == "true" ? true : false;
					}
					if ("custom" === tj_pin_spacing) {
						tj_pin_spacing = this.getElementSettings("tj_pin_spacing_custom");
					} else {
						tj_pin_spacing = tj_pin_spacing == "true" ? true : false;
					}
					if ("custom" === pin_status) {
						pin_status = this.getElementSettings("tj_pin_custom");
					} else {
						pin_status = pin_status == "true" ? true : false;
					}
					if ("custom" === pin_area_start) {
						pin_area_start = this.getElementSettings(
							"tj_pin_area_start_custom"
						);
					}
					if ("custom" === pin_area_end) {
						pin_area_end = this.getElementSettings("tj_pin_area_end_custom");
					}
					if (this.getElementSettings("tj_custom_pin_area")) {
						pin_area = this.getElementSettings("tj_custom_pin_area");
					}
					gsap.to(this.$element, {
						scrollTrigger: {
							trigger: pin_area,
							endTrigger: end_trigger,
							pin: pin_status,
							pinSpacing: tj_pin_spacing,
							pinType: tj_pin_type,
							start: pin_area_start,
							end: pin_area_end,
							scrub: tj_pin_scrub,
							delay: 0.5,
							markers: tj_pin_markers == "true" ? true : false,
						},
					});
					this.$element.css("transition", "none");
				},
			});
			elementorFrontend.hooks.addAction(
				"frontend/element_ready/container",
				function ($scope) {
					elementorFrontend.elementsHandler.addHandler(PingArea, {
						$element: $scope,
					});
				}
			);
		}
	});
})(jQuery);
