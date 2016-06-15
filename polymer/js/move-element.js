// Singleton MoveElementClass
// can be accessed by global: MoveElement
(function(global) {

    var MoveElementClass = function() {
        // overhead for singelton pattern
        if( MoveElementClass.prototype._singletonInstance ) {
            return MoveElementClass.prototype._singletonInstance;
        }
        MoveElementClass.prototype._singletonInstance = this;

        // variables
        this.element = null;
        var position = { x: 0, y: 0 }

        // method
        this.setElement = function(element) {
            this.element = element;
        }

        // listeners
        window.onmousedown = function(e) {
            position.x = e.clientX;
            position.y = e.clientY;
        }

        window.onmousemove = function(e) {
            if(this.element == null) return;

            // calculate new position of element
            this.element.xPos += e.clientX - position.x;
            this.element.yPos += e.clientY - position.y;

            // update position
            position.x = e.clientX;
            position.y = e.clientY;
        }.bind(this)

        window.onmouseup = function() {
            this.element = null;
        }.bind(this)
    }

    global.MoveElement = new MoveElementClass();

}(window));
