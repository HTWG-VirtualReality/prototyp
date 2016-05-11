var FizzyText = function () {
    this.message = 'Control- Panel';
    this.height = 1;
    this.width = 1;
    // Define render logic ...
};


window.onload = function () {
    var text = new FizzyText();
    var gui = new dat.GUI();
    gui.add(text, 'message');

    var heightController = gui.add(text, 'height', -5, 5);
    var widthController = gui.add(text, 'width', -5, 5);
    //gui.add(text, 'explode');


    heightController.onFinishChange(function (value) {
        alert('huhu, deine neue value ist: ' + value);
    })
};
