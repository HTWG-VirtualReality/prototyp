function Model(container) {
  var renderer = createRenderer(container);
  var scene = new THREE.Scene();
  var camera = createCamera();
  var group = createGroup();
  var elements = [];

  function createRenderer(container) {
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setClearColor( 0xf0f0f0 );
    renderer.setPixelRatio(window.devicePixelRatio );
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);
    return renderer;
  }

  function createCamera() {
    var camera = new THREE.PerspectiveCamera(90, window.innerWidth / window.innerHeight, 1, 1000);
    camera.add(new THREE.PointLight(0xffffff));
    scene.add(camera);
    return camera;
  }

  function createGroup() {
    var group = new THREE.Group();
    group.position.set(-200, 0, -200);
    group.rotateX(Math.PI / 180 * 20);
    group.rotateY(Math.PI / 180 * 5);
    scene.add(group);
    return group;
  }

  function addBox(box) {
    box.added(group);

    if (elements.length > 0) {
      var latest = elements[elements.length - 1];
      var position = latest.getPosition();
      var dimensionLatest = latest.getDimension();
      var dimensionNew = box.getDimension();
      var newX = position.x + dimensionLatest.x/2 + dimensionNew.x/2 + 50;
      box.setPosition(newX, position.y, position.z);
    }

    elements.push(box);
  }

  function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
  }

  this.render = function() {
    render();
  };

  this.add = function(element) {
    if (element instanceof Box) {
      addBox(element);
    }
    return this;
  };
}