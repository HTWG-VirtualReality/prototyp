function Model(container) {
  var renderer = createRenderer(container);
  var scene = new THREE.Scene();
  var camera = createCamera();
  createGroup();

  function createRenderer(container) {
    var renderer = new THREE.WebGLRenderer({ antialias: true });
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
    group.rotateX(Math.PI / 180 * 20);
    group.position.set(0, 0, -200);
    scene.add(group);
    return group;
  }

  this.render = function() {
    renderer.render(scene, camera);
  };
}