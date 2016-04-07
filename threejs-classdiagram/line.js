'use strict';

function addLine(fromClass, toClass, scene) {
    var from = fromClass.position;
    var to = toClass.position;

    var geometry = new THREE.Geometry();
    geometry.vertices.push(new THREE.Vector3(from.x, from.y + 200, from.z));
    geometry.vertices.push(new THREE.Vector3(to.x, to.y + 200, to.z));

    var material = new THREE.LineBasicMaterial({
        color: 'red'
    });

    var line = new THREE.Line(geometry, material);

    scene.add(line);
}