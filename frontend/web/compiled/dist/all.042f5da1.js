/*! sandbox */

/*!
 * CanJS - 2.1.2
 * http://canjs.us/
 * Copyright (c) 2014 Bitovi
 * Mon, 16 Jun 2014 20:44:18 GMT
 * Licensed MIT
 * Includes: CanJS default build
 * Download from: http://canjs.us/
 */

define("jquery-private",["jquery"],function(t){return t.noConflict()}),define("can/util/can",[],function(){var t=window.can||{};("undefined"==typeof GLOBALCAN||GLOBALCAN!==!1)&&(window.can=t),t.k=function(){},t.isDeferred=function(t){return t&&"function"==typeof t.then&&"function"==typeof t.pipe};var e=0;return t.cid=function(t,n){return t._cid||(e++,t._cid=(n||"")+e),t._cid},t.VERSION="2.1.2",t.simpleExtend=function(t,e){for(var n in e)t[n]=e[n];return t},t.frag=function(e){var n;return e&&"string"!=typeof e?11===e.nodeType?e:"number"==typeof e.nodeType?(n=document.createDocumentFragment(),n.appendChild(e),n):"number"==typeof e.length?(n=document.createDocumentFragment(),t.each(e,function(e){n.appendChild(t.frag(e))}),n):(n=t.buildFragment(""+e,document.body),n.childNodes.length||n.appendChild(document.createTextNode("")),n):(n=t.buildFragment(null==e?"":""+e,document.body),n.childNodes.length||n.appendChild(document.createTextNode("")),n)},t.__reading=function(){},t}),define("can/util/attr",["can/util/can"],function(t){var e=window.setImmediate||function(t){return setTimeout(t,0)},n={MutationObserver:window.MutationObserver||window.WebKitMutationObserver||window.MozMutationObserver,map:{"class":"className",value:"value",innerText:"innerText",textContent:"textContent",checked:!0,disabled:!0,readonly:!0,required:!0,src:function(t,e){return null==e||""===e?(t.removeAttribute("src"),null):(t.setAttribute("src",e),e)},style:function(t,e){return t.style.cssText=e||""}},defaultValue:["input","textarea"],set:function(e,r,i){var o;n.MutationObserver||(o=n.get(e,r));var a,u=e.nodeName.toString().toLowerCase(),s=n.map[r];"function"==typeof s?a=s(e,i):s===!0?(a=e[r]=!0,"checked"===r&&"radio"===e.type&&t.inArray(u,n.defaultValue)>=0&&(e.defaultChecked=!0)):s?(a=e[s]=i,"value"===s&&t.inArray(u,n.defaultValue)>=0&&(e.defaultValue=i)):(e.setAttribute(r,i),a=i),n.MutationObserver||a===o||n.trigger(e,r,o)},trigger:function(n,r,i){return t.data(t.$(n),"canHasAttributesBindings")?e(function(){t.trigger(n,{type:"attributes",attributeName:r,target:n,oldValue:i,bubbles:!1},[])}):void 0},get:function(t,e){var r=n.map[e];return"string"==typeof r&&t[r]?t[r]:t.getAttribute(e)},remove:function(t,e){var r;n.MutationObserver||(r=n.get(t,e));var i=n.map[e];"function"==typeof i&&i(t,void 0),i===!0?t[e]=!1:"string"==typeof i?t[i]="":t.removeAttribute(e),n.MutationObserver||null==r||n.trigger(t,e,r)},has:function(){var t=document.createElement("div");return t.hasAttribute?function(t,e){return t.hasAttribute(e)}:function(t,e){return null!==t.getAttribute(e)}}()};return n}),define("can/event",["can/util/can"],function(t){return t.addEvent=function(t,e){var n=this.__bindEvents||(this.__bindEvents={}),r=n[t]||(n[t]=[]);return r.push({handler:e,name:t}),this},t.listenTo=function(e,n,r){var i=this.__listenToEvents;i||(i=this.__listenToEvents={});var o=t.cid(e),a=i[o];a||(a=i[o]={obj:e,events:{}});var u=a.events[n];u||(u=a.events[n]=[]),u.push(r),t.bind.call(e,n,r)},t.stopListening=function(e,n,r){var i=this.__listenToEvents,o=i,a=0;if(!i)return this;if(e){var u=t.cid(e);if((o={})[u]=i[u],!i[u])return this}for(var s in o){var c,l=o[s];e=i[s].obj,n?(c={})[n]=l.events[n]:c=l.events;for(var d in c){var f=c[d]||[];for(a=0;a<f.length;)r&&r===f[a]||!r?(t.unbind.call(e,d,f[a]),f.splice(a,1)):a++;f.length||delete l.events[d]}t.isEmptyObject(l.events)&&delete i[s]}return this},t.removeEvent=function(t,e,n){if(!this.__bindEvents)return this;for(var r,i=this.__bindEvents[t]||[],o=0,a="function"==typeof e;o<i.length;)r=i[o],(n?n(r,t,e):a&&r.handler===e||!a&&(r.cid===e||!e))?i.splice(o,1):o++;return this},t.dispatch=function(t,e){var n=this.__bindEvents;if(n){"string"==typeof t&&(t={type:t});var r=t.type,i=(n[r]||[]).slice(0),o=[t];e&&o.push.apply(o,e);for(var a=0,u=i.length;u>a;a++)i[a].handler.apply(this,o);return t}},t.one=function(e,n){var r=function(){return t.unbind.call(this,e,r),n.apply(this,arguments)};return t.bind.call(this,e,r),this},t.event={on:function(){return 0===arguments.length&&t.Control&&this instanceof t.Control?t.Control.prototype.on.call(this):t.addEvent.apply(this,arguments)},off:function(){return 0===arguments.length&&t.Control&&this instanceof t.Control?t.Control.prototype.off.call(this):t.removeEvent.apply(this,arguments)},bind:t.addEvent,unbind:t.removeEvent,delegate:function(e,n,r){return t.addEvent.call(this,n,r)},undelegate:function(e,n,r){return t.removeEvent.call(this,n,r)},trigger:t.dispatch,one:t.one,addEvent:t.addEvent,removeEvent:t.removeEvent,listenTo:t.listenTo,stopListening:t.stopListening,dispatch:t.dispatch},t.event}),define("can/util/array/each",["can/util/can"],function(t){var e=function(t){var e=t.length;return"function"!=typeof arr&&(0===e||"number"==typeof e&&e>0&&e-1 in t)};return t.each=function(n,r,i){var o,a,u,s=0;if(n)if(e(n))if(t.List&&n instanceof t.List)for(a=n.attr("length");a>s&&(u=n.attr(s),r.call(i||u,u,s,n)!==!1);s++);else for(a=n.length;a>s&&(u=n[s],r.call(i||u,u,s,n)!==!1);s++);else if("object"==typeof n)if(t.Map&&n instanceof t.Map||n===t.route){var c=t.Map.keys(n);for(s=0,a=c.length;a>s&&(o=c[s],u=n.attr(o),r.call(i||u,u,o,n)!==!1);s++);}else for(o in n)if(n.hasOwnProperty(o)&&r.call(i||n[o],n[o],o,n)===!1)break;return n},t}),define("can/util/inserted",["can/util/can"],function(t){t.inserted=function(e){e=t.makeArray(e);for(var n,r,i=!1,o=t.$(document.contains?document:document.body),a=0;void 0!==(r=e[a]);a++){if(!i){if(!r.getElementsByTagName)continue;if(!t.has(o,r).length)return;i=!0}if(i&&r.getElementsByTagName){n=t.makeArray(r.getElementsByTagName("*")),t.trigger(r,"inserted",[],!1);for(var u,s=0;void 0!==(u=n[s]);s++)t.trigger(u,"inserted",[],!1)}}},t.appendChild=function(e,n){var r;r=11===n.nodeType?t.makeArray(n.childNodes):[n],e.appendChild(n),t.inserted(r)},t.insertBefore=function(e,n,r){var i;i=11===n.nodeType?t.makeArray(n.childNodes):[n],e.insertBefore(n,r),t.inserted(i)}}),define("can/util/jquery",["jquery","can/util/can","can/util/attr","can/event","can/util/array/each","can/util/inserted"],function(t,e,n){var r=function(t){return t.nodeName&&(1===t.nodeType||9===t.nodeType)||t==window};t.extend(e,t,{trigger:function(n,i,o,a){r(n)?t.event.trigger(i,o,n,!a):n.trigger?n.trigger(i,o):("string"==typeof i&&(i={type:i}),i.target=i.target||n,o&&(o.length&&"string"==typeof o?o=[o]:o.length||(o=[o])),o||(o=[]),e.dispatch.call(n,i,o))},event:e.event,addEvent:e.addEvent,removeEvent:e.removeEvent,buildFragment:function(e,n){var r;return e=[e],n=n||document,n=!n.nodeType&&n[0]||n,n=n.ownerDocument||n,r=t.buildFragment(e,n),r.cacheable?t.clone(r.fragment):r.fragment||r},$:t,each:e.each,bind:function(n,i){return this.bind&&this.bind!==e.bind?this.bind(n,i):r(this)?t.event.add(this,n,i):e.addEvent.call(this,n,i),this},unbind:function(n,i){return this.unbind&&this.unbind!==e.unbind?this.unbind(n,i):r(this)?t.event.remove(this,n,i):e.removeEvent.call(this,n,i),this},delegate:function(n,i,o){return this.delegate?this.delegate(n,i,o):r(this)?t(this).delegate(n,i,o):e.bind.call(this,i,o),this},undelegate:function(n,i,o){return this.undelegate?this.undelegate(n,i,o):r(this)?t(this).undelegate(n,i,o):e.unbind.call(this,i,o),this},proxy:function(t,e){return function(){return t.apply(e,arguments)}},attr:n}),e.on=e.bind,e.off=e.unbind,t.each(["append","filter","addClass","remove","data","get","has"],function(t,n){e[n]=function(t){return t[n].apply(t,e.makeArray(arguments).slice(1))}});var i=t.cleanData;t.cleanData=function(n){t.each(n,function(t,n){n&&e.trigger(n,"removed",[],!1)}),i(n)};var o,a=t.fn.domManip;if(t.fn.domManip=function(){for(var t=1;t<arguments.length;t++)if("function"==typeof arguments[t]){o=t;break}return a.apply(this,arguments)},t(document.createElement("div")).append(document.createElement("div")),t.fn.domManip=2===o?function(t,n,r){return a.call(this,t,n,function(t){var n;11===t.nodeType&&(n=e.makeArray(t.childNodes));var i=r.apply(this,arguments);return e.inserted(n?n:[t]),i})}:function(t,n){return a.call(this,t,function(t){var r;11===t.nodeType&&(r=e.makeArray(t.childNodes));var i=n.apply(this,arguments);return e.inserted(r?r:[t]),i})},e.attr.MutationObserver)t.event.special.attributes={setup:function(){var t=this,n=new e.attr.MutationObserver(function(n){n.forEach(function(n){var r=e.simpleExtend({},n);e.trigger(t,r,[])})});n.observe(this,{attributes:!0,attributeOldValue:!0}),e.data(e.$(this),"canAttributesObserver",n)},teardown:function(){e.data(e.$(this),"canAttributesObserver").disconnect(),t.removeData(this,"canAttributesObserver")}};else{var u=t.attr;t.attr=function(t,n){var r,i;arguments.length>=3&&(r=u.call(this,t,n));var o=u.apply(this,arguments);return arguments.length>=3&&(i=u.call(this,t,n)),i!==r&&e.attr.trigger(t,n,r),o};var s=t.removeAttr;t.removeAttr=function(t,n){var r=u.call(this,t,n),i=s.apply(this,arguments);return null!=r&&e.attr.trigger(t,n,r),i},t.event.special.attributes={setup:function(){e.data(e.$(this),"canHasAttributesBindings",!0)},teardown:function(){t.removeData(this,"canHasAttributesBindings")}}}return function(){var t="<-\n>",n=e.buildFragment(t,document);if(t!==n.childNodes[0].nodeValue){var r=e.buildFragment;e.buildFragment=function(t,e){var n=r(t,e);return 1===n.childNodes.length&&3===n.childNodes[0].nodeType&&(n.childNodes[0].nodeValue=t),n}}}(),t.event.special.inserted={},t.event.special.removed={},e}),define("can/util/library",["can/util/jquery"],function(t){return t}),define("can/util/string",["can/util/library"],function(t){var e=/_|-/,n=/\=\=/,r=/([A-Z]+)([A-Z][a-z])/g,i=/([a-z\d])([A-Z])/g,o=/([a-z\d])([A-Z])/g,a=/\{([^\}]+)\}/g,u=/"/g,s=/'/g,c=/-+(.)?/g,l=/[a-z][A-Z]/g,d=function(t,e,n){var r=t[e];return void 0===r&&n===!0&&(r=t[e]={}),r},f=function(t){return/^f|^o/.test(typeof t)},p=function(t){var e=null===t||void 0===t||isNaN(t)&&""+t=="NaN";return""+(e?"":t)};return t.extend(t,{esc:function(t){return p(t).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(u,"&#34;").replace(s,"&#39;")},getObject:function(e,n,r){var i,o,a,u,s=e?e.split("."):[],c=s.length,l=0;if(n=t.isArray(n)?n:[n||window],u=n.length,!c)return n[0];for(l;u>l;l++){for(i=n[l],a=void 0,o=0;c>o&&f(i);o++)a=i,i=d(a,s[o]);if(void 0!==a&&void 0!==i)break}if(r===!1&&void 0!==i&&delete a[s[o-1]],r===!0&&void 0===i)for(i=n[0],o=0;c>o&&f(i);o++)i=d(i,s[o],!0);return i},capitalize:function(t){return t.charAt(0).toUpperCase()+t.slice(1)},camelize:function(t){return p(t).replace(c,function(t,e){return e?e.toUpperCase():""})},hyphenate:function(t){return p(t).replace(l,function(t){return t.charAt(0)+"-"+t.charAt(1).toLowerCase()})},underscore:function(t){return t.replace(n,"/").replace(r,"$1_$2").replace(i,"$1_$2").replace(o,"_").toLowerCase()},sub:function(e,n,r){var i=[];return e=e||"",i.push(e.replace(a,function(e,o){var a=t.getObject(o,n,r===!0?!1:void 0);return void 0===a||null===a?(i=null,""):f(a)&&i?(i.push(a),""):""+a})),null===i?i:i.length<=1?i[0]:i},replacer:a,undHash:e}),t}),define("can/construct",["can/util/string"],function(t){var e=0;return t.Construct=function(){return arguments.length?t.Construct.extend.apply(t.Construct,arguments):void 0},t.extend(t.Construct,{constructorExtends:!0,newInstance:function(){var t,e=this.instance();return e.setup&&(t=e.setup.apply(e,arguments)),e.init&&e.init.apply(e,t||arguments),e},_inherit:function(e,n,r){t.extend(r||e,e||{})},_overwrite:function(t,e,n,r){t[n]=r},setup:function(e){this.defaults=t.extend(!0,{},e.defaults,this.defaults)},instance:function(){e=1;var t=new this;return e=0,t},extend:function(n,r,i){function o(){return e?void 0:this.constructor!==o&&arguments.length&&o.constructorExtends?o.extend.apply(o,arguments):o.newInstance.apply(o,arguments)}"string"!=typeof n&&(i=r,r=n,n=null),i||(i=r,r=null),i=i||{};var a,u,s,c,l,d,f,p,h=this,v=this.prototype;p=this.instance(),t.Construct._inherit(i,v,p);for(l in h)h.hasOwnProperty(l)&&(o[l]=h[l]);t.Construct._inherit(r,h,o),n&&(a=n.split("."),d=a.pop(),u=t.getObject(a.join("."),window,!0),f=u,s=t.underscore(n.replace(/\./g,"_")),c=t.underscore(d),u[d]=o),t.extend(o,{constructor:o,prototype:p,namespace:f,_shortName:c,fullName:n,_fullName:s}),void 0!==d&&(o.shortName=d),o.prototype.constructor=o;var g=[h].concat(t.makeArray(arguments)),m=o.setup.apply(o,g);return o.init&&o.init.apply(o,m||g),o}}),t.Construct.prototype.setup=function(){},t.Construct.prototype.init=function(){},t.Construct}),define("can/construct/super",["can/util/library","can/construct"],function(t){var e=t.isFunction,n=/xyz/.test(function(){return this.xyz})?/\b_super\b/:/.*/;return t.Construct._overwrite=function(t,r,i,o){t[i]=e(o)&&e(r[i])&&n.test(o)?function(t,e){return function(){var n,i=this._super;return this._super=r[t],n=e.apply(this,arguments),this._super=i,n}}(i,o):o},t.Construct._inherit=function(e,n,r){r=r||e;for(var i in e)t.Construct._overwrite(r,n,i,e[i])},t}),define("can/control",["can/util/library","can/construct"],function(t){var e,n=function(e,n,r){return t.bind.call(e,n,r),function(){t.unbind.call(e,n,r)}},r=t.isFunction,i=t.extend,o=t.each,a=[].slice,u=/\{([^\}]+)\}/g,s=t.getObject("$.event.special",[t])||{},c=function(e,n,r,i){return t.delegate.call(e,n,r,i),function(){t.undelegate.call(e,n,r,i)}},l=function(e,r,i,o){return o?c(e,t.trim(o),r,i):n(e,r,i)},d=t.Control=t.Construct({setup:function(){if(t.Construct.setup.apply(this,arguments),t.Control){var e,n=this;n.actions={};for(e in n.prototype)n._isAction(e)&&(n.actions[e]=n._action(e))}},_shifter:function(e,n){var i="string"==typeof n?e[n]:n;return r(i)||(i=e[i]),function(){return e.called=n,i.apply(e,[this.nodeName?t.$(this):this].concat(a.call(arguments,0)))}},_isAction:function(t){var e=this.prototype[t],n=typeof e;return"constructor"!==t&&("function"===n||"string"===n&&r(this.prototype[e]))&&!!(s[t]||f[t]||/[^\w]/.test(t))},_action:function(n,r){if(u.lastIndex=0,r||!u.test(n)){var i=r?t.sub(n,this._lookup(r)):n;if(!i)return null;var o=t.isArray(i),a=o?i[1]:i,s=a.split(/\s+/g),c=s.pop();return{processor:f[c]||e,parts:[a,s.join(" "),c],delegate:o?i[0]:void 0}}},_lookup:function(t){return[t,window]},processors:{},defaults:{}},{setup:function(e,n){var r,o=this.constructor,a=o.pluginName||o._fullName;return this.element=t.$(e),a&&"can_control"!==a&&this.element.addClass(a),r=t.data(this.element,"controls"),r||(r=[],t.data(this.element,"controls",r)),r.push(this),this.options=i({},o.defaults,n),this.on(),[this.element,this.options]},on:function(e,n,r,i){if(!e){this.off();var o,a,u=this.constructor,s=this._bindings,c=u.actions,d=this.element,f=t.Control._shifter(this,"destroy");for(o in c)c.hasOwnProperty(o)&&(a=c[o]||u._action(o,this.options,this),a&&(s.control[o]=a.processor(a.delegate||d,a.parts[2],a.parts[1],o,this)));return t.bind.call(d,"removed",f),s.user.push(function(e){t.unbind.call(e,"removed",f)}),s.user.length}return"string"==typeof e&&(i=r,r=n,n=e,e=this.element),void 0===i&&(i=r,r=n,n=null),"string"==typeof i&&(i=t.Control._shifter(this,i)),this._bindings.user.push(l(e,r,i,n)),this._bindings.user.length},off:function(){var t=this.element[0],e=this._bindings;e&&(o(e.user||[],function(e){e(t)}),o(e.control||{},function(e){e(t)})),this._bindings={user:[],control:{}}},destroy:function(){if(null!==this.element){var e,n=this.constructor,r=n.pluginName||n._fullName;this.off(),r&&"can_control"!==r&&this.element.removeClass(r),e=t.data(this.element,"controls"),e.splice(t.inArray(this,e),1),t.trigger(this,"destroyed"),this.element=null}}}),f=t.Control.processors;return e=function(e,n,r,i,o){return l(e,n,t.Control._shifter(o,i),r)},o(["change","click","contextmenu","dblclick","keydown","keyup","keypress","mousedown","mousemove","mouseout","mouseover","mouseup","reset","resize","scroll","select","submit","focusin","focusout","mouseenter","mouseleave","touchstart","touchmove","touchcancel","touchend","touchleave","inserted","removed"],function(t){f[t]=e}),d}),define("can",["can/util/library","can/construct","can/construct/super","can/control"],function(t){return t}),define("controllers/index",["jquery","can"],function(t,e){return e.Construct.extend("Index",{init:function(){}},{}),Index}),define("app/routes",["jquery","can"],function(t,e){return e.Control.extend("Routes",{_body:t("body"),_instance:null,init:function(){Routes._instance=new Routes,Routes._instance.run()},runController:function(t,e){new t("body",{action:e||null})},routes:{site:{controller:function(t){require(["controllers/index"],function(e){Routes.runController(e,t)})}}}},{run:function(){this.controller=Routes._body.data("controller"),this.action=Routes._body.data("action"),this.resolveController()},resolveController:function(){Routes.routes[this.controller]&&(Routes.routes[this.controller].controller?Routes.routes[this.controller].controller(this.action):Routes.routes[this.controller].callback&&Routes.routes[this.controller].callback())}}),Routes}),define("app/main",["app/routes"],function(){}),requirejs.config({baseUrl:"/js/lib",paths:{app:"../app",controllers:"../app/controllers",jquery:"//code.jquery.com/jquery-1.11.0.min"},map:{"*":{jquery:"jquery-private"},"jquery-private":{jquery:"jquery"}},shim:{can:{exports:"can",deps:["jquery"]}}}),requirejs(["app/main"]),define("app",function(){}),define("../app/build",["app"],function(){}),require(["app/main"]);