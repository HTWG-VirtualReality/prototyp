// datastruct for size
VrSizeDatastruct = function(min, max, percentage) {
    // TODO: check if percentage exist or min and max are the same
    return {
        calculateSize: function (width, propWidth, height, propHeight) {
            var result = { width: 0, height: 0};
            console.log(propHeight)

            result.width = width * (percentage.width * propWidth);
            result.height = height * (percentage.height * propHeight);

            var diff = calculateDiff(min, result.height);
            // adjust diff to minimum
            console.log("diff: " + diff)
            if(diff < 0) { result.height -= diff; }

            return {
                size: result,
                diffMinHeight: (diff < 0) ? -(result.height) : 0,
                percentageHeight:  (diff > 0) ? percentage.height : 0
            }

            function calculateDiff(obj, height) {
                return height - ((exists(obj) && exists(obj.height)) ? obj.height : 0);
            }

            function exists(value) { return value !== null && value !== undefined && value !== {}; }
        },

        isAdaptable: function() {
            return (exists(percentage) || exists(min) || exists(max)) ? false : true;
            function exists(value) { return value !== null && value !== undefined && value !== {}; }
        },

        getMaxHeight: function() {
            return (exists(max) && exists(max.height)) ? max.height : null;
            function exists(value) { return value !== null && value !== undefined && value !== {}; }
        },

        getPercentageHeight: function() {
            return (exists(percentage) && exists(percentage.height)) ? percentage.height : null;
            function exists(value) { return value !== null && value !== undefined && value !== {}; }
        }
    }
}
