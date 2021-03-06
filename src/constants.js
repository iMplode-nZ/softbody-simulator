'use strict';

const DATA_TEXTURE_WIDTH = 4096;
const FRAME_TIME = 1000 / 600;

function generateConstantsAndUtils(code, canvas) {
    return `#version 300 es

precision highp float;
precision highp isampler2D;
precision highp usampler2D;

const int DATA_TEXTURE_WIDTH = ${DATA_TEXTURE_WIDTH};
const int DATA_TEXTURE_WIDTH_POWER = ${Math.log2(DATA_TEXTURE_WIDTH)};
const uint DATA_TEXTURE_WIDTH_U = ${DATA_TEXTURE_WIDTH}u;
const uint DATA_TEXTURE_WIDTH_POWER_U = ${Math.log2(DATA_TEXTURE_WIDTH)}u;
const vec2 HALF_WORLD_SIZE = vec2(${canvas.width / 2}.0, ${canvas.height / 2}.0);
const float FRAME_TIME = ${FRAME_TIME};
const float GRAVITY = ${0.000002};
const float COLLIDE_FRICTION = ${0.4}; // TODO: Rename to WORLD_COLLISION_RESPONSE.
const float BREAKING_DISTANCE = ${1.02};
const float SPRING_CONSTANT = ${0.04};
const float DAMPING_CONSTANT = ${0.03};
const float AIR_FRICTION = ${0.0}.0;

${require('./utils.glsl')}
${code}`;
}

module.exports = {
    DATA_TEXTURE_WIDTH,
    FRAME_TIME,
    generateConstantsAndUtils,
};
