/*!
 * jquery.numscroll.js -- (Digital rolling cumulative animation)
 * version 1.0.0
 * 27.07.2023
 * author: Maria Rangelova
 * API: https://github.com/chaorenzeng/jquery.numscroll.js.git
 * Exchange Q група: 814798690
 */


(function ($) {
  // Is the jQuery library included before using the
  //$.fn.numScroll function

  if (typeof jQuery === 'undefined') {
    throw new Error('jQuery library is required.');
}
    $.fn.numScroll = function (options) {
    
      let settings = $.extend(
        {
          number: '0', // value
          step: 1, // step size
          time: 2000, // Limited use time (0 time is not limited)
          delay: 0, // delay(ms)
          symbol: false, // display separators
          fromZero: true, // Whether to start counting from zero(If not, count from the original value)
        },
        // default value for the options
        options = options || {}
      );
      
      settings.number = settings.number.toString(); // Number to String
  
      return this.each(function () {
        // Initial configuration
        const $this = $(this),
          oldNum = $this.text() || '0';
        // Separator display 
        if (settings.number.indexOf(',') > 0) {
          // If the value contains a delimiter, the delimiter is required to be displayed by default
          settings.symbol = true;
        }
        if (options && options.symbol === false) {
          // When the separator is not displayed manually, the separator is not displayed
          settings.symbol = false;
        }
        // show initial value
        let targetNum = settings.number.replace(/,/g, '') || 0,
          oldRealNum = oldNum.replace(/,/g, '');
        if (settings.symbol) {
          $this.text(oldNum);
        } else {
          $this.text(oldRealNum);
        }
        // Determine whether to start counting from 0 or start counting from the original value
        if (settings.fromZero) {
          oldRealNum = 0;
        }
        // non-numeric processing
        if (isNaN(oldRealNum)) {
          oldRealNum = 0;
        }
        if (isNaN(targetNum)) {
          return;
        }
        // Initial value target value preparation
        targetNum = parseFloat(targetNum);
        oldRealNum = parseFloat(oldRealNum);
        let tempNum = oldRealNum,
          numIsInt = isInt(targetNum),
          numIsFloat = isFloat(targetNum),
          step = !settings.time
            ? 1
            : (Math.abs(targetNum - oldRealNum) * 10) / settings.time,
          numScroll;
        // update method
        function numInitUpdate() {
          let showNum = '';
          // integer or float
          if (numIsInt) {
            showNum = Math.floor(tempNum);
          } else if (numIsFloat != -1) {
            showNum = tempNum.toFixed(numIsFloat);
          } else {
            showTarget(targetNum);
            clearInterval(numScroll);
            return;
          }
          // Thousands digit display
          if (settings.symbol) {
            showNum = formatSymbol(showNum);
          }
          $this.text(showNum);
        }
  
        // final display
        function showTarget(num) {
          let targetNum = num.toString().replace(/,/g, '');
          if (settings.symbol) {
            targetNum = formatSymbol(targetNum);
          }
          $this.text(targetNum);
        }
  
        // timed start
        setTimeout(function () {
          numScroll = setInterval(function () {
            numInitUpdate();
            if (oldRealNum < targetNum) {
              // increase
              tempNum += step;
              if (tempNum > targetNum) {
                showTarget(targetNum);
                clearInterval(numScroll);
              }
            } else if (oldRealNum === targetNum) {
              clearInterval(numScroll);
            } else {
              // decrease
              tempNum -= step;
              if (tempNum < targetNum) {
                showTarget(targetNum);
                clearInterval(numScroll);
              }
            }
          }, 1);
        }, settings.delay);
      });
    };
  
    /*
     * Determine whether the value is an integer
     * @param num {Number} 
     * @return {Boolean} 
     */
    function isInt(num) {
      let res = false;
      try {
        if (String(num).indexOf('.') == -1 && String(num).indexOf(',') == -1) {
          res = parseInt(num) % 1 === 0 ? true : false;
        }
      } catch (e) {
        res = false;
      }
      return res;
    }
  
    /*
     * Determine whether the value is a decimal
     * @param num {Number} value
     * @return {Number} Decimal places (-1 is not a decimal)
     */
    function isFloat(num) {
      let res = -1;
      try {
        if (String(num).indexOf('.') != -1) {
          let index = String(num).indexOf('.') + 1; // Get the position of the decimal point
          let count = String(num).length - index; // Get the number after the decimal point
          if (index > 0) {
            res = count;
          }
        }
      } catch (e) {
        res = -1;
      }
      return res;
    }
  
    /*
     * Display value thousands separator
     * @param num {Number} Value
     * @return {String} Value with delimiter
     */
    function formatSymbol(num) {
      let res = '';
      let str = num + '',
        strLeft = '',
        strRight = '';
      let floatNum = isFloat(num);
      if (floatNum != -1) {
        // Cut when there are decimals
        let splitStr = str.split('.');
        strLeft = splitStr[0];
        strRight = splitStr[1];
      } else {
        strLeft = str;
      }
      // The integer part adds a separator every 3 digits
      res = strLeft
        .split('')
        .reverse()
        .reduce(function (prev, next, index) {
          return (index % 3 ? next : next + ',') + prev;
        });
      // Concatenation of decimal parts
      if (strRight != '') {
        res = res + '.' + strRight;
      }
      return res;
    }
  })(jQuery);