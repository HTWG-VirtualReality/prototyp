function Text(text) {
  var geometry;
  var mesh;
  var loader = new THREE.FontLoader();
  var addList = [];

  loader.load('../threejs/helvetiker_regular.typeface.js', function (font) {
    geometry = createGeometry(text, font);
    mesh = createMesh(geometry, 0xffffff);
    mesh.position.x = -10;

    for (var i = 0; i < addList.length; i++) {
      addList[i].add(mesh);
    }
  });

  function createGeometry(text, font) {
    return new THREE.TextGeometry( text, {
      font: font,
      weight: 'regular',
      size: 10,
      height: 20,
      curveSegments: 0,
      material: 0,
      extrudeMaterial: 1
    });
  }

  function createMesh(geometry, color) {
    var material = new THREE.MeshPhongMaterial({ color: color });
    return new THREE.Mesh(geometry, material);
  }

  this.added = function(element) {
    if (typeof mesh === "undefined") {
      addList.push(element);
    } else {
      element.add(mesh);
    }
  };
}