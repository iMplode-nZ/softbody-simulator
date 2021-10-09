(self.webpackChunkwebpack_starter=self.webpackChunkwebpack_starter||[]).push([[321],{163:(n,o,e)=>{var t=e(180)((function(n){return n[1]}));t.push([n.id,"body{background:#353940;color:#d5dce8;font-family:sans-serif;margin:0}#simulation{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%)}#error{position:absolute;top:50%;left:50%;width:50%;height:50%;transform:translate(-50%, -50%)}\n",""]),t.locals={simulation:"simulation",error:"error"},n.exports=t},235:(n,o,e)=>{"use strict";e.r(o),e.d(o,{default:()=>a});var t=e(565),r=e.n(t),i=e(163),s=e.n(i),c={insert:"head",singleton:!1};r()(s(),c);const a=s().locals||{}},279:(n,o,e)=>{"use strict";const t=4096,r=1e3/600;n.exports={DATA_TEXTURE_WIDTH:t,FRAME_TIME:r,generateConstantsAndUtils:function(n,o){return`#version 300 es\n\nprecision highp float;\nprecision highp isampler2D;\nprecision highp usampler2D;\n\nconst int DATA_TEXTURE_WIDTH = 4096;\nconst int DATA_TEXTURE_WIDTH_POWER = ${Math.log2(t)};\nconst uint DATA_TEXTURE_WIDTH_U = 4096u;\nconst uint DATA_TEXTURE_WIDTH_POWER_U = ${Math.log2(t)}u;\nconst vec2 HALF_WORLD_SIZE = vec2(${o.width/2}.0, ${o.height/2}.0);\nconst float FRAME_TIME = ${r};\nconst float GRAVITY = 0.000002;\nconst float COLLIDE_FRICTION = 0.4; // TODO: Rename to WORLD_COLLISION_RESPONSE.\nconst float BREAKING_DISTANCE = 1.02;\nconst float SPRING_CONSTANT = 0.04;\nconst float DAMPING_CONSTANT = 0.03;\nconst float AIR_FRICTION = 0.0;\n\n${e(566)}\n${n}`}}},138:(n,o,e)=>{"use strict";const{FRAME_TIME:t}=e(279),{mod:r,m:i}=e(451),s=r("root",((n,o,r)=>{n(e(235));let s=!1;return{view(){const n=[r.canvas$simulation()];return s&&n.push(r._$error("Error: Unable to acquire high-performance webgl context. Please make sure that your browser is fully to date and there are no other tabs open.")),r._(n)},oncreate(n){const o=n.instance.children[0].dom;try{const n=e(227)(o),r=performance.now();let i=0;requestAnimationFrame((function o(){const e=performance.now()-r,s=Math.floor((e-i)/t);if(console.log(s),s>=50)return console.log("Unable to keep up! Skipping frame."),i=Math.floor(e/t)*t,void requestAnimationFrame(o);for(let o=0;o<s;o++)n();i=Math.floor(e/t)*t,requestAnimationFrame(o)}))}catch(n){s=!0,i.redraw()}}}}));i.mount(document.body,s.component)},440:n=>{"use strict";const o=";base64,";n.exports=function(n){console.log("Loading map");const e=function(n){const e=n.indexOf(o)+o.length,t=n.substring(e),r=window.atob(t),i=r.length,s=new Uint8Array(new ArrayBuffer(i));for(let n=0;n<i;n++)s[n]=r.charCodeAt(n);return s.buffer}(n),[t,r]=Array.from(new Uint32Array(e,0,2));console.log(`Width of map: ${t}`),console.log(`Height of map: ${r}`);const i=new Uint8Array(e,8);function s(n,o){return n<=0||o<=0||n>=t||o>=r?0:i[n+(r-o)*t]}let c=0;for(let n=0;n<t;n++)for(let o=0;o<r;o++)0!==s(n,o)&&c++;c++;const a={type:new Uint8Array(c),posVel:new Float32Array(4*c),orthoConnections:new Uint32Array(4*c),diagConnections:new Uint32Array(4*c)},l=new Map;{let n=1;for(let o=0;o<t;o++)for(let e=0;e<r;e++)s(o,e)&&(l.set(JSON.stringify([o,e]),n),n++)}function u(n,o,e){0!==s(o,e)&&n.push(l.get(JSON.stringify([o,e])))}{let n=1;for(let o=0;o<t;o++)for(let e=0;e<r;e++){const i=s(o,e);if(0!==i){const s=4*n;a.type[n]=i,a.posVel.set([o-t/2,e-r/2,0,0],s);{const n=[];u(n,o-1,e),u(n,o+1,e),u(n,o,e-1),u(n,o,e+1),a.orthoConnections.set(n,s)}{const n=[];u(n,o-1,e-1),u(n,o+1,e-1),u(n,o-1,e+1),u(n,o+1,e+1),a.diagConnections.set(n,s)}n++}}}return console.log("Finished loading map:"),console.log(a),{sources:a,width:t,height:r}}},474:n=>{"use strict";n.exports="uniform usampler2D type;\nuniform sampler2D posVel;\nuniform usampler2D orthoConnections;\nuniform usampler2D diagConnections;\n\nlayout(location = 0) out uint o_type;\nlayout(location = 1) out vec4 o_posVel;\nlayout(location = 2) out uvec4 o_orthoConnections;\nlayout(location = 3) out uvec4 o_diagConnections;\n\n// TODO: Make force the return value and mutate connection.\nuint connectionForce(inout vec2 force, const float connectionLength, vec4 thisPosVel, uint connection) {\n    ivec2 connectionPos = idFromUint(connection);\n    if (texelFetch(type, connectionPos, 0).x == 0u) {\n        return connection;\n    }\n    vec4 otherPosVel = texelFetch(posVel, connectionPos, 0);\n    vec4 delta = otherPosVel - thisPosVel;\n    float length = length(delta.xy);\n    vec2 direction = delta.xy / length;\n    float lengthRatioSq = length / connectionLength;\n    lengthRatioSq *= lengthRatioSq;\n    float forceMag = (lengthRatioSq - 1.0 / lengthRatioSq) * SPRING_CONSTANT + dot(delta.zw, direction) * DAMPING_CONSTANT;\n    force += forceMag * direction;\n    return length >= BREAKING_DISTANCE * connectionLength ? 0u : connection;\n}\n\nvoid main() {\n    ivec2 idPos = ivec2(gl_FragCoord.xy - vec2(0.5));\n\n    uint type = texelFetch(type, idPos, 0).x;\n    vec4 posVel = texelFetch(posVel, idPos, 0);\n    uvec4 orthoConnections = texelFetch(orthoConnections, idPos, 0);\n    uvec4 diagConnections = texelFetch(diagConnections, idPos, 0);\n\n    vec2 force = vec2(0, -GRAVITY);\n    force -= posVel.zw * AIR_FRICTION;\n    orthoConnections.x &= connectionForce(force, 1.0, posVel, orthoConnections.x);\n    orthoConnections.y &= connectionForce(force, 1.0, posVel, orthoConnections.y);\n    orthoConnections.z &= connectionForce(force, 1.0, posVel, orthoConnections.z);\n    orthoConnections.w &= connectionForce(force, 1.0, posVel, orthoConnections.w);\n    diagConnections.x &= connectionForce(force, 1.41421356, posVel, diagConnections.x);\n    diagConnections.y &= connectionForce(force, 1.41421356, posVel, diagConnections.y);\n    diagConnections.z &= connectionForce(force, 1.41421356, posVel, diagConnections.z);\n    diagConnections.w &= connectionForce(force, 1.41421356, posVel, diagConnections.w);\n\n    if (type != 2u) { // Not Fixed\n        posVel.zw += force * FRAME_TIME;\n        posVel.xy += posVel.zw * FRAME_TIME;\n    }\n    if (abs(posVel.x) > HALF_WORLD_SIZE.x) {\n        // TODO: Replace with multiplication.\n        posVel.z = -posVel.z * COLLIDE_FRICTION;\n    }\n    if (abs(posVel.y) > HALF_WORLD_SIZE.y) {\n        posVel.w = -posVel.w * COLLIDE_FRICTION;\n    }\n\n    o_type = type;\n    o_posVel = posVel;\n    o_orthoConnections = orthoConnections;\n    o_diagConnections = diagConnections;\n}\n"},797:n=>{"use strict";n.exports="uniform usampler2D type;\nuniform sampler2D posVel;\nuniform usampler2D orthoConnections;\nuniform usampler2D diagConnections;\n\nin vec2 position;\n\nvoid main() {\n    gl_Position = vec4(position, 0.0, 1.0);\n}\n"},141:n=>{"use strict";n.exports="flat in uint toKeep;\n\nout vec4 o_color;\n\nvoid main() {\n    if (toKeep == 0u) {\n        discard;\n    }\n    o_color = vec4(1.0, 1.0, 1.0, 1.0);\n}\n"},11:n=>{"use strict";n.exports="uniform usampler2D type;\nuniform sampler2D posVel;\nuniform usampler2D orthoConnections;\nuniform usampler2D diagConnections;\n\nin float unused;\nflat out uint toKeep;\n\nvoid main() {\n    ivec2 idPos = idFromInt(gl_VertexID);\n    vec2 pos = texelFetch(posVel, idPos, 0).xy;\n    toKeep = texelFetch(type, idPos, 0).x;\n    gl_Position = vec4(pos / HALF_WORLD_SIZE, 0.0, 1.0);\n    gl_PointSize = 3.0;\n}\n"},451:(n,o,e)=>{"use strict";const t=e(22),r=e(216),i=e(367),s=r({h:t,textConvert:n=>`${n}`,combineId:!0,combineClasses:!0}),c=i(s,{partialApply:!0,useDefault:!0});n.exports={mod:c,m:t,HTML:s}},227:(n,o,e)=>{"use strict";const t=e(872),{generateConstantsAndUtils:r}=e(279),{particleTexturesAndFrameBuffer:i}=e(431),s=e(440);n.exports=n=>{console.log("Initializing");const o=t.getContext(n,{powerPreference:"high-performance",antialias:!1});if(null===o)throw new Error("Unable to get high-performance webgl2 context");const{sources:c,width:a,height:l}=s(e(777));n.width=a,n.height=l,n.style.width=a+"px",n.style.height=l+"px";const u=t.createProgramInfo(o,[r(e(797),n),r(e(474),n)]),f=t.createProgramInfo(o,[r(e(11),n),r(e(141),n)]);let p=i(o,c),h=i(o,c);const d=p.size,m=t.createBufferInfoFromArrays(o,{position:{numComponents:2,data:[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]}}),g=t.createBufferInfoFromArrays(o,{unused:{numComponents:1,data:new Array(d[0]*d[1]).fill(0)}});return console.log("Finished initializing"),function(){t.bindFramebufferInfo(o,h.framebuffer),o.useProgram(u.program),o.drawBuffers([o.COLOR_ATTACHMENT0,o.COLOR_ATTACHMENT1,o.COLOR_ATTACHMENT2,o.COLOR_ATTACHMENT3]),t.setUniformsAndBindTextures(u,p.textures),t.setBuffersAndAttributes(o,u,m),t.drawBufferInfo(o,m);{const n=h;h=p,p=n}t.bindFramebufferInfo(o),o.useProgram(f.program),t.setUniformsAndBindTextures(f,p.textures),t.setBuffersAndAttributes(o,f,g),t.drawBufferInfo(o,g,o.POINTS)}}},431:(n,o,e)=>{"use strict";const t=e(872),{DATA_TEXTURE_WIDTH:r}=e(279);n.exports={particleTexturesAndFrameBuffer:function(n,o){const e={type:1,posVel:4,orthoConnections:4,diagConnections:4},i=Object.entries({type:{internalFormat:n.R8UI,format:n.RED_INTEGER},posVel:{internalFormat:n.RGBA32F,format:n.RGBA},orthoConnections:{internalFormat:n.RGBA32UI,format:n.RGBA_INTEGER},diagConnections:{internalFormat:n.RGBA32UI,format:n.RGBA_INTEGER}}).reduce(((t,[i,s])=>{const c=o[i],a=e[i],l=Math.ceil(c.length/(r*a)),u=new ArrayBuffer(r*l*a*c.BYTES_PER_ELEMENT),f=new c.constructor(u);return f.set(c),t[i]={min:n.NEAREST,max:n.NEAREST,width:r,height:l,src:f,...s},t}),{}),s=i.type.height;Object.values(i).forEach((n=>{if(n.height!==s)throw new Error("Heights are not consistent")}));const c=t.createTextures(n,i);return{textures:c,framebuffer:t.createFramebufferInfo(n,[{attachment:c.type},{attachment:c.posVel},{attachment:c.orthoConnections},{attachment:c.diagConnections}],r,s),size:[r,s]}}}},566:n=>{"use strict";n.exports="ivec2 idFromInt(int id) {\n    return ivec2(id & (DATA_TEXTURE_WIDTH - 1), id >> DATA_TEXTURE_WIDTH_POWER);\n}\nivec2 idFromUint(uint id) {\n    return ivec2(id & (DATA_TEXTURE_WIDTH_U - 1u), id >> DATA_TEXTURE_WIDTH_POWER_U);\n}\n"}},n=>{"use strict";n.O(0,[332,754,175,872,347],(()=>{return o=138,n(n.s=o);var o}));n.O()}]);