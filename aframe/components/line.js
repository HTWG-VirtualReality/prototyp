// source: https://aframe.io/docs/core/component.html
var coordinates = AFRAME.utils.coordinates;

AFRAME.registerComponent('line', {
    schema: {
        color: { default: '#333' },

        from: {
            default: null
        },

        to: {
            default: null
        }
    },

    // Create or update the line geometry.
    update: function(oldData) {
        if (!this.data.from || !this.data.to) {
            console.warn("properties 'from' and 'to' must be set.");
            return;
        }

        var fromTarget = this.el.sceneEl.querySelector(this.data.from);
        var toTarget = this.el.sceneEl.querySelector(this.data.to);

        // Set color with material.
        var material = new THREE.LineBasicMaterial({
            color: this.data.color,
            linewidth: 2
        });

        // Add vertices to geometry.
        var geometry = new THREE.Geometry();
        this._addVertices(geometry.vertices, fromTarget.components.position.data);
        this._addVertices(geometry.vertices, toTarget.components.position.data);

        // Apply mesh.
        this.el.setObject3D('mesh', new THREE.Line(geometry, material));
    },

    // Remove the line geometry.
    remove: function() {
        this.el.removeObject3D('mesh');
    },

    _addVertices: function(vertices, data) {
        vertices.push(
            new THREE.Vector3(data.x, data.y, data.z)
        );
    }
});
