precision mediump float;

uniform vec2 uResolution;
uniform float uTime;
varying vec2 vTexCoord;

const float TWO_PI = 6.283185307179586;

mat2 rotate(float angle) {
  return mat2(
    cos(angle), -sin(angle),
    sin(angle), cos(angle));
}


void main() {
  vec2 uv = vTexCoord - 0.5;
  uv.x *= uResolution.x / uResolution.y;
  uv *= rotate(uTime * TWO_PI / 16.0);
  uv *= 4.0;

  vec3 c = vec3(0.0);
  vec2 gv = fract(uv + 0.5) - 0.5;

  c.rg = gv.xy;
  // c.b = gv.x + gv.y;

  float p = uTime * TWO_PI / 8.0;

  for (float y = -1.0; y <= 1.0; y++) {
    for (float x = -10.; x <= 1.0; x++) {
      vec2 offs = vec2(x, y);
      float d = length(gv + offs);
      float r = sin(p - length(4.0 * uv)) / 2.0 + 0.5;
      c.rg *= rotate((-p + r) / 16.0);
      c += vec3(step(d, r));
      c.rgb = vec3(1.0) - c.rgb;
    }
  }

  gl_FragColor = vec4(c, 1.0);
}
