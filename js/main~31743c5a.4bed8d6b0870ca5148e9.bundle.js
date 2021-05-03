(self.webpackChunkwebpack_starter=self.webpackChunkwebpack_starter||[]).push([[321],{163:(n,o,e)=>{var t=e(180)((function(n){return n[1]}));t.push([n.id,"body{background:#353940;color:#d5dce8;font-family:sans-serif;margin:0}\n",""]),n.exports=t},235:(n,o,e)=>{"use strict";e.r(o),e.d(o,{default:()=>a});var t=e(565),i=e.n(t),r=e(163),s=e.n(r),c={insert:"head",singleton:!1};i()(s(),c);const a=s().locals||{}},279:(n,o,e)=>{"use strict";const t=4096,i=1e3/600;n.exports={DATA_TEXTURE_WIDTH:t,FRAME_TIME:i,generateConstantsAndUtils:function(n,o){return`#version 300 es\n\nprecision highp float;\nprecision highp isampler2D;\nprecision highp usampler2D;\n\nconst int DATA_TEXTURE_WIDTH = 4096;\nconst int DATA_TEXTURE_WIDTH_POWER = ${Math.log2(t)};\nconst uint DATA_TEXTURE_WIDTH_U = 4096u;\nconst uint DATA_TEXTURE_WIDTH_POWER_U = ${Math.log2(t)}u;\nconst vec2 HALF_WORLD_SIZE = vec2(${o.width/2}.0, ${o.height/2}.0);\nconst float FRAME_TIME = ${i};\nconst float GRAVITY = 0.000002;\nconst float COLLIDE_FRICTION = 0.4;\nconst float BREAKING_DISTANCE = 1.01;\nconst float SPRING_CONSTANT = 0.04;\nconst float DAMPING_CONSTANT = 0.03;\n\n${e(566)}\n${n}`}}},138:(n,o,e)=>{"use strict";const{FRAME_TIME:t}=e(279),{mod:i,m:r}=e(451),s=i("root",((n,o,i)=>(n(e(235)),{view:()=>i._(i.canvas$simulation({height:512,width:512})),oncreate(n){const o=n.instance.children[0].dom,i=e(227)(o),r=performance.now();let s=0;requestAnimationFrame((function n(){const o=performance.now()-r,e=Math.floor((o-s)/t);if(e>50)throw new Error("Unable to keep up!");for(let n=0;n<e;n++)console.log("Updating"),i();s=Math.floor(o/t)*t,requestAnimationFrame(n)}))}})));r.mount(document.body,s.component)},440:n=>{"use strict";const o=";base64,";n.exports=function(n){console.log("Loading map");const e=function(n){const e=n.indexOf(o)+o.length,t=n.substring(e),i=window.atob(t),r=i.length,s=new Uint8Array(new ArrayBuffer(r));for(let n=0;n<r;n++)s[n]=i.charCodeAt(n);return s.buffer}(n),[t,i]=Array.from(new Uint32Array(e,0,2));console.log(`Width of map: ${t}`),console.log(`Height of map: ${i}`);const r=new Uint8Array(e,8);function s(n,o){return!(n<=0||o<=0||n>=t||o>=i)&&1===r[n+(i-o)*t]}let c=0;for(let n=0;n<t;n++)for(let o=0;o<i;o++)s(n,o)&&c++;c++;const a={isActive:new Uint8Array(c),posVel:new Float32Array(4*c),orthoConnections:new Uint32Array(4*c),diagConnections:new Uint32Array(4*c)},l=new Map;{let n=1;for(let o=0;o<t;o++)for(let e=0;e<i;e++)s(o,e)&&(l.set(JSON.stringify([o,e]),n),n++)}{let n=1;for(let o=0;o<t;o++)for(let e=0;e<i;e++)if(s(o,e)){const r=4*n;a.isActive[n]=1,a.posVel.set([o-t/2,e-i/2,0,0],r);{const n=[];s(o-1,e)&&n.push(l.get(JSON.stringify([o-1,e]))),s(o+1,e)&&n.push(l.get(JSON.stringify([o+1,e]))),s(o,e-1)&&n.push(l.get(JSON.stringify([o,e-1]))),s(o,e+1)&&n.push(l.get(JSON.stringify([o,e+1]))),a.orthoConnections.set(n,r)}{const n=[];s(o-1,e-1)&&n.push(l.get(JSON.stringify([o-1,e-1]))),s(o+1,e-1)&&n.push(l.get(JSON.stringify([o+1,e-1]))),s(o-1,e+1)&&n.push(l.get(JSON.stringify([o-1,e+1]))),s(o+1,e+1)&&n.push(l.get(JSON.stringify([o+1,e+1]))),a.diagConnections.set(n,r)}n++}}return console.log("Finished loading map:"),console.log(a),{sources:a,width:t,height:i}}},474:n=>{"use strict";n.exports="uniform usampler2D isActive;\nuniform sampler2D posVel;\nuniform usampler2D orthoConnections;\nuniform usampler2D diagConnections;\n\nlayout(location = 0) out uint o_isActive;\nlayout(location = 1) out vec4 o_posVel;\nlayout(location = 2) out uvec4 o_orthoConnections;\nlayout(location = 3) out uvec4 o_diagConnections;\n\n\nuint connectionForce(inout vec2 force, float connectionLength, vec4 thisPosVel, uint connection) {\n    ivec2 connectionPos = idFromUint(connection);\n    if (texelFetch(isActive, connectionPos, 0).x == 0u) {\n        return connection;\n    }\n    vec4 otherPosVel = texelFetch(posVel, connectionPos, 0);\n    vec4 delta = otherPosVel - thisPosVel;\n    float length = length(delta.xy);\n    vec2 direction = delta.xy / length;\n    float lengthRatioSq = length / connectionLength;\n    lengthRatioSq *= lengthRatioSq;\n    float forceMag = (lengthRatioSq - 1.0 / lengthRatioSq) * SPRING_CONSTANT + dot(delta.zw, direction) * DAMPING_CONSTANT;\n    force += forceMag * direction;\n    return length >= BREAKING_DISTANCE * connectionLength ? 0u : connection;\n}\n\nvoid main() {\n    ivec2 idPos = ivec2(gl_FragCoord.xy - vec2(0.5));\n\n    uint isActive = texelFetch(isActive, idPos, 0).x;\n    vec4 posVel = texelFetch(posVel, idPos, 0);\n    uvec4 orthoConnections = texelFetch(orthoConnections, idPos, 0);\n    uvec4 diagConnections = texelFetch(diagConnections, idPos, 0);\n\n    vec2 force = vec2(0, -GRAVITY);\n    orthoConnections.x &= connectionForce(force, 1.0, posVel, orthoConnections.x);\n    orthoConnections.y &= connectionForce(force, 1.0, posVel, orthoConnections.y);\n    orthoConnections.z &= connectionForce(force, 1.0, posVel, orthoConnections.z);\n    orthoConnections.w &= connectionForce(force, 1.0, posVel, orthoConnections.w);\n    diagConnections.x &= connectionForce(force, 1.41421356, posVel, diagConnections.x);\n    diagConnections.y &= connectionForce(force, 1.41421356, posVel, diagConnections.y);\n    diagConnections.z &= connectionForce(force, 1.41421356, posVel, diagConnections.z);\n    diagConnections.w &= connectionForce(force, 1.41421356, posVel, diagConnections.w);\n\n    posVel.zw += force * FRAME_TIME;\n    posVel.xy += posVel.zw * FRAME_TIME;\n    if (abs(posVel.x) > HALF_WORLD_SIZE.x) {\n        posVel.z = -posVel.z * COLLIDE_FRICTION;\n    }\n    if (abs(posVel.y) > HALF_WORLD_SIZE.y) {\n        posVel.w = -posVel.w * COLLIDE_FRICTION;\n    }\n\n    o_isActive = isActive;\n    o_posVel = posVel;\n    o_orthoConnections = orthoConnections;\n    o_diagConnections = diagConnections;\n}\n"},797:n=>{"use strict";n.exports="uniform usampler2D isActive;\nuniform sampler2D posVel;\nuniform usampler2D orthoConnections;\nuniform usampler2D diagConnections;\n\nin vec2 position;\n\nvoid main() {\n    gl_Position = vec4(position, 0.0, 1.0);\n}\n"},141:n=>{"use strict";n.exports="flat in uint toKeep;\n\nout vec4 o_color;\n\nvoid main() {\n    if (toKeep == 0u) {\n        discard;\n    }\n    o_color = vec4(1.0, 1.0, 1.0, 1.0);\n}\n"},11:n=>{"use strict";n.exports="uniform usampler2D isActive;\nuniform sampler2D posVel;\nuniform usampler2D orthoConnections;\nuniform usampler2D diagConnections;\n\nin float unused;\nflat out uint toKeep;\n\nvoid main() {\n    ivec2 idPos = idFromInt(gl_VertexID);\n    vec2 pos = texelFetch(posVel, idPos, 0).xy;\n    toKeep = texelFetch(isActive, idPos, 0).x;\n    gl_Position = vec4(pos / HALF_WORLD_SIZE, 0.0, 1.0);\n    gl_PointSize = 3.0;\n}\n"},451:(n,o,e)=>{"use strict";const t=e(22),i=e(216),r=e(367),s=i({h:t,textConvert:n=>`${n}`,combineId:!0,combineClasses:!0}),c=r(s,{partialApply:!0,useDefault:!0});n.exports={mod:c,m:t,HTML:s}},227:(n,o,e)=>{"use strict";const t=e(872),{generateConstantsAndUtils:i}=e(279),{particleTexturesAndFrameBuffer:r}=e(431),s=e(440);n.exports=n=>{console.log("Initializing");const o=t.getContext(n,{powerPreference:"high-performance",failIfMajorPerformanceCaveat:!0,antialias:!1});if(null===o)throw new Error("Unable to get high-performance webgl2 context");const{sources:c,width:a,height:l}=s(e(777));n.width=a,n.height=l,n.style.width=a+"px",n.style.height=l+"px";const u=t.createProgramInfo(o,[i(e(797),n),i(e(474),n)]),f=t.createProgramInfo(o,[i(e(11),n),i(e(141),n)]);let h=r(o,c),p=r(o,c);const g=h.size,d=t.createBufferInfoFromArrays(o,{position:{numComponents:2,data:[-1,-1,1,-1,-1,1,-1,1,1,-1,1,1]}}),A=t.createBufferInfoFromArrays(o,{unused:{numComponents:1,data:new Array(g[0]*g[1]).fill(0)}});return console.log("Finished initializing"),function(){t.bindFramebufferInfo(o,p.framebuffer),o.useProgram(u.program),o.drawBuffers([o.COLOR_ATTACHMENT0,o.COLOR_ATTACHMENT1,o.COLOR_ATTACHMENT2,o.COLOR_ATTACHMENT3]),t.setUniformsAndBindTextures(u,h.textures),t.setBuffersAndAttributes(o,u,d),t.drawBufferInfo(o,d);{const n=p;p=h,h=n}t.bindFramebufferInfo(o),o.useProgram(f.program),t.setUniformsAndBindTextures(f,h.textures),t.setBuffersAndAttributes(o,f,A),t.drawBufferInfo(o,A,o.POINTS)}}},431:(n,o,e)=>{"use strict";const t=e(872),{DATA_TEXTURE_WIDTH:i}=e(279);n.exports={particleTexturesAndFrameBuffer:function(n,o){const e={isActive:1,posVel:4,orthoConnections:4,diagConnections:4},r=Object.entries({isActive:{internalFormat:n.R8UI,format:n.RED_INTEGER},posVel:{internalFormat:n.RGBA32F,format:n.RGBA},orthoConnections:{internalFormat:n.RGBA32UI,format:n.RGBA_INTEGER},diagConnections:{internalFormat:n.RGBA32UI,format:n.RGBA_INTEGER}}).reduce(((t,[r,s])=>{const c=o[r],a=e[r],l=Math.ceil(c.length/(i*a)),u=new ArrayBuffer(i*l*a*c.BYTES_PER_ELEMENT),f=new c.constructor(u);return f.set(c),t[r]={min:n.NEAREST,max:n.NEAREST,width:i,height:l,src:f,...s},t}),{}),s=r.isActive.height;Object.values(r).forEach((n=>{if(n.height!==s)throw new Error("Heights are not consistent")}));const c=t.createTextures(n,r);return{textures:c,framebuffer:t.createFramebufferInfo(n,[{attachment:c.isActive},{attachment:c.posVel},{attachment:c.orthoConnections},{attachment:c.diagConnections}],i,s),size:[i,s]}}}},566:n=>{"use strict";n.exports="ivec2 idFromInt(int id) {\n    return ivec2(id & (DATA_TEXTURE_WIDTH - 1), id >> DATA_TEXTURE_WIDTH_POWER);\n}\nivec2 idFromUint(uint id) {\n    return ivec2(id & (DATA_TEXTURE_WIDTH_U - 1u), id >> DATA_TEXTURE_WIDTH_POWER_U);\n}\n"}},n=>{"use strict";n.O(0,[332,754,175,872,347],(()=>{return o=138,n(n.s=o);var o}));n.O()}]);