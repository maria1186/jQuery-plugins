/*
Copyright 2013 Michael Costello.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

     http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

Author: Michael Costello (michael.a.costello@gmail.com)
Maria Rangelova further developed the idea https://github.com/maria1186/jQuery-plugins
*/

(function($) {
	/*
	 * Tranistions text by clipping to the left, then expanding to
	 * reveal the next text.
	 *
	 * @example .slideTextLeft(word, [delay])
	 * @param {String} a single word to tranistion to once
	 * @param {Number} the time to wait before the transistion
	 *
	 * @example .slideTextLeft(words, [delay])
	 * @param {Array} multiple words to tranistion through in a loop
	 * @param {Number} the time to wait before the transistion
	 *
	 * @example .slideTextLeft(settings)
	 * @param {Object} setting object with "words" & optionally "delay" members
	 *
	*/
	$.fn.slideTextLeft = function(words, delay) {
		let isSingleWord = false;

		// map arguments
		let opts = $.fn.slideTextLeft.defaults;

		if (typeof delay === "number") {
			opts.delay = delay;
		}
			
		if ($.isArray(words)) {
			opts.words = words;
		} else if (typeof words === "string") {
			opts.words = words;
			isSingleWord = true;
		} else if ($.isPlainObject(words)) {
			opts = $.extend({}, $.fn.slideTextLeft.defaults, words);
		}

		// iterate and reformat each matched element
		return this.each(function() {
			let $this = $(this);
			let initialText = $this.text();
			let o = $.meta ? $.extend({}, opts, $this.data()) : opts;
			let i = 0;

			if (!o.words.length) {
				return;
			}

			$this.css({
				"white-space": "nowrap",
				"overflow": "hidden",
				"vertical-align": "bottom",
			});

			if (!initialText.length || initialText === o.words[0]) {
				$this.text(o.words[0]);
				i = 1;
			}

			//start animation
			(function loop() {
				let word = isSingleWord ? o.words : o.words[i];
				let upper = word.toUpperCase();
				let callback = isSingleWord ? null : loop;
				$this.animate({
					'fontSize': '1.2em',
					'opacity': .3,
					'rotate': '-4deg',
				  })
				transitionText(upper, $this, o.delay, callback);
				
				i = (i + 1) % o.words.length;
			})();
		});
	};
	function transitionText(text, $this, delay, callback) {
		$this.delay(delay)
			.animate({ 'width':'4.6em'}, $.proxy($this.text, $this, text)).css({'color':'orange','rotate':'8deg'})
			.animate({ 'rotate':'-5deg', 'opacity':'1' }, callback);
			
	}
			
	
	// plugin defaults
	$.fn.slideTextLeft.defaults = {
		words: [],
		delay: 2000
	};
})(jQuery);

