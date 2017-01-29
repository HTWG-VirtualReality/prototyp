// datastruct for size
VrSizeDatastruct = function(min, max, percentage) {
    if(!exists(percentage)) {
        console.error("Percentage is required.");
        return function() { console.error("Percentage is empty."); };
    }

    return function (width, propWidth, height, propHeight) {
        var result = { width: 0, height: 0};

        // calculate new sizes
        result.width = width * (percentage.width * propWidth);
        result.height = height * (percentage.height * propHeight);

        // check if new height outruns min or max height
        var diff = calculateDiffBetweenHeightAndMinMaxHeight(min, max, result.height);

        // adjust height to found diff
        result.height = handleDiff(diff, result.height);

        return {
            size: result,
            diffHeight: outruns(diff) ? -(result.height) : 0,
            percentageHeight: outruns(diff) ? 0 : percentage.height
        };

        function calculateDiffBetweenHeightAndMinMaxHeight(min, max, height) {
            return {
                min: sub(order1, min, height),
                max: sub(order2, max, height)
            }
        }

        function sub(func, obj, height) {
            if ((exists(obj) && exists(obj.height))) { return func(height, obj.height); }
            return 0;
        }

        function handleDiff(diff, dimension) {
            if(diff.min < 0) { return dimension -= diff.min; }
            else if(diff.max < 0) { return dimension += diff.max; }
            return dimension;
        }

        function outruns(diff) { return diff.min < 0 || diff.max < 0}
        function order1(a,b) {return a-b;}
        function order2(a,b) {return b-a;}
    };

    function exists(value) { return value !== null && value !== undefined && value !== {}; }
};