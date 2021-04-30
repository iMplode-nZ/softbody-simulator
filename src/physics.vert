precision highp float;

uniform sampler2D isActive;
uniform sampler2D posVel;
uniform sampler2D orthoConnections;
uniform sampler2D diagConnections;

in vec2 position;

void main () {
    gl_Position = vec4(position, 0.0, 1.0);
}
