// datastruct for size
VrSizeDatastruct = function(min, max, percentage) {
    return {
        calculateSize: function (width, height) {
            var result = { width: 0, height: 0};

            if(exists(percentage)) { result = calculate(percentage, result, calc(width,height,multiply)); };
            if(exists(min)) { result = calculate(min, result, comp(greater)); }
            if(exists(max)) { result = calculate(max, result, comp(smaller)); }

            return result;

            function calculate(sizeObj, currentResult, func) {
                var result = {};
                result["width"] = exists(sizeObj.width) ? func(sizeObj, currentResult, "width") : currentResult.width;
                result["height"] = exists(sizeObj.height) ? func(sizeObj, currentResult, "height") : currentResult.height;
                return result;
            }

            function calc(width, height, func) {
                var operands = {width: width, height: height}
                return function(a, b, key) {
                    return func(a[key], operands[key]);
                }
            }

            function comp(func) {
                return function(a, b, key) {
                    return func(a[key], b[key])
                }
            }

            function multiply(a,b) { return a*b; }
            function smaller(a,b) { return (a<b) ? a : b; }
            function greater(a,b) { return (a>b) ? a : b; }
            function exists(value) { return value !== null && value !== undefined && value !== {}; }
        },

        isAdaptable: function() {
            return (exists(percentage) || exists(min) || exists(max)) ? false : true;
            function exists(value) { return value !== null && value !== undefined && value !== {}; }
        }
    }
}
