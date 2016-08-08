!function t(e,n,o){function r(s,a){if(!n[s]){if(!e[s]){var c="function"==typeof require&&require;if(!a&&c)return c(s,!0);if(i)return i(s,!0);var p=new Error("Cannot find module '"+s+"'");throw p.code="MODULE_NOT_FOUND",p}var u=n[s]={exports:{}};e[s][0].call(u.exports,function(t){var n=e[s][1][t];return r(n?n:t)},u,u.exports,t,e,n,o)}return n[s].exports}for(var i="function"==typeof require&&require,s=0;s<o.length;s++)r(o[s]);return r}({1:[function(t,e,n){"use strict";var o={fontNo:"A",dpi:203};n.config=o},{}],2:[function(t){"use strict";t("./src/components/component"),t("./src/components/text"),t("./src/components/rect"),t("./src/components/ellipse"),t("./src/components/line"),t("./src/components/image"),t("./src/components/barcode")},{"./src/components/barcode":3,"./src/components/component":4,"./src/components/ellipse":5,"./src/components/image":6,"./src/components/line":7,"./src/components/rect":8,"./src/components/text":9}],3:[function(t,e,n){"use strict";var o=t("../../config").config;scene.Barcode.prototype._toZpl=function(){var t=this.model,e=t.symbol,n=t.scale_w,r=void 0===n?1:n,i=t.showText,s=void 0===i?"Y":i,a=t.textAbove,c=void 0===a?"":a,p=this.labelingBounds,u=p.left,h=p.top,f=(p.width,p.height),l=this.text,d=this.orientation,g=[],m=3,b=100;g.push(["^BY"+r,m,b]),g.push(["^FO"+u,h]),s&&"qrcode"!=e&&(f-=6*r+8);o.dpi;switch(e){case"code11":g.push(["^B1"+d,,f,s,c]);break;case"interleaved2of5":g.push(["^B2"+d,f,s,c]);break;case"code39":g.push(["^B3"+d,,f,s,c]);break;case"code49":g.push(["^B4"+d,f,s]);break;case"planet":g.push(["^B5"+d,f,s,c]);break;case"pdf417":g.push(["^B7"+d,f,,,,]);break;case"ean8":g.push(["^B8"+d,f,s,c]);break;case"upce":g.push(["^B9"+d,f,s,c]);break;case"code93":g.push(["^BA"+d,f,s,c]);break;case"codablock":g.push(["^BB"+d,f,,,,]);break;case"code128":g.push(["^BC"+d,f,s,c,,]);break;case"maxicode":g.push(["^BD"+d,,f,s,c]);break;case"ean13":g.push(["^BE"+d,f,s,c]);break;case"micropdf417":g.push(["^BF2",,]);break;case"industrial2of5":g.push(["^BI"+d,f,s,c]);break;case"standard2of5":g.push(["^BJ"+d,f,s,c]);break;case"ansicodabar":g.push(["^BK"+d,,f,s,c,,]);break;case"logmars":g.push(["^BL"+d,f,c]);break;case"msi":g.push(["^BM"+d,,f,s,c]);break;case"plessey":g.push(["^BP"+d,,f,s,c]);break;case"qrcode":g.push(["^BQ"+d,2,Math.round(f/19.54)]);break;case"upca":g.push(["^BU"+d,f,s,c]);break;case"datamatrix":g.push(["^BX"]);break;case"postal":g.push(["^BZ"+d,f,s,c])}g.push("qrcode"===e?["^FDQ","A"+l]:["^FD"+l]),g.push(["^FS"]);var v=g.map(function(t){return t.join(",")}).join("\n")+"\n";return v},n.Barcode=scene.Barcode},{"../../config":1}],4:[function(t,e,n){"use strict";function o(t){return"black"===t||"#000"===t||"#000000"===t}var r={NORMAL:"N",ROTATE_90:"R",INVERTED_180:"I",BOTTOM_UP_270:"B"};scene.Scene.prototype.toZpl=function(){var t=this;return new Promise(function(e,n){t.root.toZpl().then(function(t){e(["^XA","^PW"+80/2.54*203+"\n",t,"^XZ"].join("\n"))},function(t){n(t)})})},scene.Component.prototype.toZpl=function(){var t=this;return new Promise(function(e,n){try{e(t._toZpl())}catch(o){n(o)}})},scene.Container.prototype.toZpl=function(){var t=this;return new Promise(function(e,n){var o=t.components.map(function(t){return t.toZpl()});Promise.all(o).then(function(t){e(t.join("\n"))},function(t){n(t)})})},Object.defineProperty(scene.Component.prototype,"lineColor",{get:function(){var t=this.model,e=t.strokeStyle,n=t.fillStyle;return o(e)||o(n)?"B":"W"}}),Object.defineProperty(scene.Component.prototype,"borderThickness",{get:function(){var t=this.model,e=t.fillStyle,n=t.lineWidth,r=this.labelingBounds,i=r.width,s=r.height;return o(e)?Math.min(i,s)/2:n}}),Object.defineProperty(scene.Component.prototype,"textBounds",{get:function(){var t=this.bounds,e=t.left,n=t.top,o=t.width,r=t.height;return e+=this.paddingLeft||0,n+=this.paddingTop||0,o-=(this.paddingLeft||0)+(this.paddingRight||0),r-=(this.paddingTop||0)+(this.paddingBottom||0),{left:e,top:n,width:o,height:r}}}),Object.defineProperty(scene.Component.prototype,"labelingTextBounds",{get:function(){var t=this.textBounds,e=t.left,n=t.top,o=t.width,r=t.height;return e+=this.paddingLeft||0,n+=this.paddingTop||0,o-=(this.paddingLeft||0)+(this.paddingRight||0),r-=(this.paddingTop||0)+(this.paddingBottom||0),{left:e,top:n,width:o,height:r}}}),Object.defineProperty(scene.Component.prototype,"labelingBounds",{get:function(){var t=this.bounds,e=t.left,n=t.top,o=t.width,r=t.height,i=this.transcoordS2T(e,n),s=this.transcoordS2T(e+o,n+r),e=Math.min(i.x,s.x),n=Math.min(i.y,s.y),o=Math.abs(s.x-i.x),r=Math.abs(s.y-i.y);return{left:e,top:n,width:o,height:r}}}),Object.defineProperty(scene.Component.prototype,"absoluteRotation",{get:function(){for(var t=0,e=this;e;)t+=e.get("rotation")||0,e=e.parent;return t}}),Object.defineProperty(scene.Component.prototype,"orientation",{get:function(){var t=this.absoluteRotation%(2*Math.PI);return Math.PI*-.25<t&&t<=.25*Math.PI?r.NORMAL:.25*Math.PI<t&&t<=.75*Math.PI?r.ROTATE_90:.75*Math.PI<t&&t<=1.25*Math.PI||-1.25*Math.PI<t&&t<=Math.PI*-.75?r.INVERTED_180:Math.PI<1.25*t&&t<=1.75*Math.PI||Math.PI*-.75<t&&t<=Math.PI*-.25?r.BOTTOM_UP_270:void 0}}),n.Component=scene.Component},{}],5:[function(t,e,n){"use strict";t("./text"),scene.Component.prototype.toZplForEllipse=function(t,e,n){var o=t.top,r=t.left,i=t.width,s=t.height,a=[];return a.push(["^FO"+r,o]),a.push(i===s?["^GC"+i,n,e]:["^GE"+i,s,n,e]),a.push(["^FS"]),a.map(function(t){return t.join(",")}).join("\n")+"\n"},scene.Ellipse.prototype._toZpl=function(){var t=this.toZplForEllipse(this.labelingBounds,this.lineColor,this.borderThickness);return this.text&&(t+=this.toZplForText()),t},n.Ellipse=scene.Ellipse},{"./text":9}],6:[function(t,e,n){"use strict";function o(){function t(){return Math.floor(65536*(1+Math.random())).toString(16).substring(1)}return t()+t()+t()+t()+t()+t()+t()+t()}function r(t){var e,n=t.model.src,o=t.bounds,r=(o.top,o.left,o.width),i=o.height;"undefined"==typeof document?e=new Canvas(r,i):(e=document.createElement("canvas"),e.width=r,e.height=i);var c=new Image,p=new Promise(function(t,n){c.onload=function(){var n=e.getContext("2d");n.drawImage(c,0,0,r,i);var o=n.getImageData(0,0,r,i),p=o.data,u=s(r,i,a.binarize(r,i,p));t(u)},c.onerror=function(t){n(t)}});return c.src=n,p}function i(t){return parseInt(t,2).toString(16).toUpperCase()||""}function s(t,e,n){for(var o="",r=Math.ceil(t/8),s=0;e>s;s++){for(var a="",c=0,p=0;t>p;p++)a+=0==n[4*(t*s+p)+1]?"1":"0",a.length>7&&(o+=i(a.substring(0,4))+i(a.substring(4,8)),a="",c++);if(a.length>0){for(;a.length<8;)a+="0";o+=i(a.substring(0,4))+i(a.substring(4,8)),a="",c++}for(;c++<r;)o+=i("0000")+i("0000");o+="\n"}return r*e+","+r+","+o}var a=t("../utils/rgb-binarize");scene.ImageView.prototype.toZpl=function(){var t=this.labelingBounds,e=t.top,n=t.left,i=this;return new Promise(function(t,s){r(i).then(function(r){var i=o(),s=[["~DG"+i,r],["^FO"+n,e],["^XGR:"+i,1,1],["^PQ1"],["^FS"]],a=s.map(function(t){return t.join(",")}).join("\n")+"\n";console.log(a),t(a)},function(t){s(t)})})},n.Image=scene.ImageView},{"../utils/rgb-binarize":10}],7:[function(t,e,n){"use strict";t("./rect"),t("./text"),scene.Component.prototype.toZplForLine=function(t,e,n,o){var r=t.left,i=t.top,s=t.width,a=t.height,c=[["^FO"+r,i],["^GD"+s,a,n,e,o],["^FS"]];return c.map(function(t){return t.join(",")}).join("\n")+"\n"},scene.Line.prototype._toZpl=function(){var t,e=this.labelingBounds;if(0==e.width||0==e.height)t=this.toZplForRect(e,this.lineColor,this.borderThickness,0);else{var n=this.model,o=n.x1,r=n.x2,i=n.y1,s=n.y2,a=this.transcoordS2T(o,i),c=this.transcoordS2T(r,s),p=(a.x-c.x)*(a.y-c.y)>0?"L":"R";t=this.toZplForLine(e,this.lineColor,this.borderThickness,p)}return this.text&&(t+=this.toZplForText()),t},n.Line=scene.Line},{"./rect":8,"./text":9}],8:[function(t,e,n){"use strict";t("./text"),scene.Component.prototype.toZplForRect=function(t,e,n,o){var r=t.top,i=t.left,s=t.width,a=t.height,c=[["^FO"+i,r],["^GB"+s,a,n,e,Math.round(8*o/100)],["^FS"]];return c.map(function(t){return t.join(",")}).join("\n")+"\n"},scene.Rect.prototype._toZpl=function(){var t=this.model.round,e=void 0===t?0:t,n=this.toZplForRect(this.labelingBounds,this.lineColor,this.borderThickness,e);return this.text&&(n+=this.toZplForText()),n},n.Rect=scene.Rect},{"./text":9}],9:[function(t,e,n){"use strict";var o=t("../../config").config,r=10;scene.Component.prototype.toZplForText=function(){var t,e=this.model,n=e.textWrap,i=e.textAlign,s=(e.textBaseline,this.labelingTextBounds),a=s.left,c=s.top,p=s.width,u=(s.height,this.orientation),h=this.lineHeight-this.fontSize,f=this.text,l=this.fontSize,d=this.fontSize,g=o.fontNo||"A";if(n){switch(i){case"right":t="R";break;case"justify":t="J";break;case"center":t="C";break;case"left":default:t="L"}var m=0,b=[["^FO"+a,c],["^A"+g+u,l,d],["^FB"+p,r,h,t,m],["^FD"+f],["^FS"]]}else var b=[["^FO"+a,c],["^A"+g+u,l,d],["^FD"+f],["^FS"]];return b.map(function(t){return t.join(",")}).join("\n")+"\n"},scene.Text.prototype._toZpl=function(){return this.toZplForText()},n.Text=scene.Text},{"../../config":1}],10:[function(t,e,n){"use strict";function o(t,e,n){for(var o=[],r=0;e>r;r++)for(var i=0;t>i;i++){var s=4*(t*r+i),a=.21*n[s+c]+.71*n[s+p]+.07*n[s+u];a+=(255-n[s+h])*(255-a)/255,o[s+c]=a,o[s+p]=a,o[s+u]=a,o[s+h]=n[s+h]}return o}function r(t,e,n){for(var o=[],r=0;a>r;r++)o[r]=0;for(var i=0;e>i;i++)for(var s=0;t>s;s++){var p=4*(t*i+s),u=Math.round(n[p+c]);o[u]++}return o}function i(t,e,n){for(var o=r(t,e,n),i=0,s=0;a>s;s++)i+=s*o[s];for(var c=0,p=0,u=0,h=0,f=0,l=t*e,d=0;a>d;d++)if(p+=o[d],0!=p){if(u=l-p,0==u)break;c+=d*o[d];var g=c/p,m=(i-c)/u,b=p*u*(g-m)*(g-m);b>h&&(h=b,f=d)}return f}function s(t,e,n){for(var r=o(t,e,n),s=i(t,e,r),a=[],f=0;e>f;f++)for(var l=0;t>l;l++){var d=4*(f*t+l);r[d]>s?(a[d+c]=255,a[d+p]=255,a[d+u]=255):(a[d+c]=0,a[d+p]=0,a[d+u]=0),a[d+h]=r[d+h]}return a}Object.defineProperty(n,"__esModule",{value:!0}),n.binarize=s;var a=256,c=0,p=1,u=2,h=3},{}]},{},[2]);