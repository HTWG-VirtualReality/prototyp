// datastruct for size
VrSizeDatastruct = function(min, max, percentage) {
    if(!exists(percentage)) {
        console.error("Percentage is required.");
        return function() { console.error("Percentage is empty."); }; }

    return function (width, propWidth, height, propHeight) {
        var result = { width: 0, height: 0};

        result.width = width * (percentage.width * propWidth);
        result.height = height * (percentage.height * propHeight);

        var diff = calculateDiff(min, max, result.height);

        if(diff.min) { result.height -= diff.value }
        else if(diff.max) { result.height += diff.value }

        return {
            size: result,
            diffMinHeight: (diff.value < 0) ? -(result.height) : 0,
            percentageHeight:  (diff.value >= 0) ? percentage.height : 0
        }

        function calculateDiff(min, max, height) {
            var diff = sub(order1, min, height);
            var min = (diff < 0) ? true : false;
            diff = (diff < 0) ? diff : sub(order2, max, height);
            return {
                value: diff,
                min: min,
                max: (diff < 0 && !min) ? true : false
            }
        }

        function sub(func, obj, height) {
            if ((exists(obj) && exists(obj.height))) { return func(height, obj.height); }
            return 0;
        }

        function order1(a,b) {return a-b;}
        function order2(a,b) {return b-a;}

        // function exists(value) { return value !== null && value !== undefined && value !== {}; }
    };

    function exists(value) { return value !== null && value !== undefined && value !== {}; }
}
