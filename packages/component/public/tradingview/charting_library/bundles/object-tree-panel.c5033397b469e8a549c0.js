"use strict";(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[5031],{76480:(e,t,n)=>{function i(e){return s(e,o)}function r(e){return s(e,a)}function s(e,t){const n=Object.entries(e).filter(t),i={};for(const[e,t]of n)i[e]=t;return i}function o(e){const[t,n]=e;return 0===t.indexOf("data-")&&"string"==typeof n}function a(e){return 0===e[0].indexOf("aria-")}n.d(t,{filterDataProps:()=>i,filterAriaProps:()=>r,filterProps:()=>s,isDataAttribute:()=>o,isAriaAttribute:()=>a})},28675:(e,t,n)=>{function i(e,t,n,i,r){function s(r){if(e>r.timeStamp)return;const s=r.target;void 0!==n&&null!==t&&null!==s&&s.ownerDocument===i&&(t.contains(s)||n(r))}return r.click&&i.addEventListener("click",s,!1),r.mouseDown&&i.addEventListener("mousedown",s,!1),r.touchEnd&&i.addEventListener("touchend",s,!1),r.touchStart&&i.addEventListener("touchstart",s,!1),()=>{i.removeEventListener("click",s,!1),i.removeEventListener("mousedown",s,!1),i.removeEventListener("touchend",s,!1),i.removeEventListener("touchstart",s,!1)}}n.d(t,{addOutsideEventListener:()=>i})},11140:(e,t,n)=>{n.d(t,{setFixedBodyState:()=>d});var i=n(76861);const r=()=>!window.matchMedia("screen and (min-width: 768px)").matches,s=()=>!window.matchMedia("screen and (min-width: 1280px)").matches;let o=0,a=!1;function d(e){const{body:t}=document,n=t.querySelector(".widgetbar-wrap");if(e&&1==++o){const e=(0,i.getCSSProperty)(t,"overflow"),r=(0,i.getCSSPropertyNumericValue)(t,"padding-right");"hidden"!==e.toLowerCase()&&t.scrollHeight>t.offsetHeight&&((0,i.setStyle)(n,"right",(0,i.getScrollbarWidth)()+"px"),t.style.paddingRight=r+(0,i.getScrollbarWidth)()+"px",a=!0),t.classList.add("i-no-scroll")}else if(!e&&o>0&&0==--o&&(t.classList.remove("i-no-scroll"),a)){(0,i.setStyle)(n,"right","0px");let e=0;e=n?(d=(0,i.getContentWidth)(n),r()?0:s()?46:Math.min(Math.max(d,46),450)):0,t.scrollHeight<=t.clientHeight&&(e-=(0,i.getScrollbarWidth)()),t.style.paddingRight=(e<0?0:e)+"px",a=!1}var d}},18351:(e,t,n)=>{n.d(t,{useOutsideEvent:()=>s});var i=n(67294),r=n(28675);function s(e){const{click:t,mouseDown:n,touchEnd:s,touchStart:o,handler:a,reference:d,ownerDocument:c=document}=e,u=(0,i.useRef)(null),h=(0,i.useRef)(new CustomEvent("timestamp").timeStamp);return(0,i.useLayoutEffect)(()=>{const e={click:t,mouseDown:n,touchEnd:s,touchStart:o},i=d?d.current:u.current;return(0,r.addOutsideEventListener)(h.current,i,a,c,e)},[t,n,s,o,a]),d||u}},46403:(e,t,n)=>{n.d(t,{MatchMedia:()=>r});var i=n(67294);class r extends i.PureComponent{constructor(e){super(e),this._handleChange=()=>{this.forceUpdate()},this.state={query:window.matchMedia(this.props.rule)}}componentDidMount(){this._subscribe(this.state.query)}componentDidUpdate(e,t){this.state.query!==t.query&&(this._unsubscribe(t.query),this._subscribe(this.state.query))}componentWillUnmount(){this._unsubscribe(this.state.query)}render(){return this.props.children(this.state.query.matches)}static getDerivedStateFromProps(e,t){return e.rule!==t.query.media?{query:window.matchMedia(e.rule)}:null}_subscribe(e){e.addListener(this._handleChange)}
_unsubscribe(e){e.removeListener(this._handleChange)}}},28595:(e,t,n)=>{n.d(t,{OverlapManager:()=>s,getRootOverlapManager:()=>a});var i=n(16282);class r{constructor(){this._storage=[]}add(e){this._storage.push(e)}remove(e){this._storage=this._storage.filter(t=>e!==t)}has(e){return this._storage.includes(e)}getItems(){return this._storage}}class s{constructor(e=document){this._storage=new r,this._windows=new Map,this._index=0,this._document=e,this._container=e.createDocumentFragment()}setContainer(e){const t=this._container,n=null===e?this._document.createDocumentFragment():e;!function(e,t){Array.from(e.childNodes).forEach(e=>{e.nodeType===Node.ELEMENT_NODE&&t.appendChild(e)})}(t,n),this._container=n}registerWindow(e){this._storage.has(e)||this._storage.add(e)}ensureWindow(e,t={position:"fixed",direction:"normal"}){const n=this._windows.get(e);if(void 0!==n)return n;this.registerWindow(e);const i=this._document.createElement("div");if(i.style.position=t.position,i.style.zIndex=this._index.toString(),i.dataset.id=e,void 0!==t.index){const e=this._container.childNodes.length;if(t.index>=e)this._container.appendChild(i);else if(t.index<=0)this._container.insertBefore(i,this._container.firstChild);else{const e=this._container.childNodes[t.index];this._container.insertBefore(i,e)}}else"reverse"===t.direction?this._container.insertBefore(i,this._container.firstChild):this._container.appendChild(i);return this._windows.set(e,i),++this._index,i}unregisterWindow(e){this._storage.remove(e);const t=this._windows.get(e);void 0!==t&&(null!==t.parentElement&&t.parentElement.removeChild(t),this._windows.delete(e))}getZindex(e){const t=this.ensureWindow(e);return parseInt(t.style.zIndex||"0")}moveToTop(e){if(this.getZindex(e)!==this._index){this.ensureWindow(e).style.zIndex=(++this._index).toString()}}removeWindow(e){this.unregisterWindow(e)}}const o=new WeakMap;function a(e=document){const t=e.getElementById("overlap-manager-root");if(null!==t)return(0,i.ensureDefined)(o.get(t));{const t=new s(e),n=function(e){const t=e.createElement("div");return t.style.position="absolute",t.style.zIndex=150..toString(),t.style.top="0px",t.style.left="0px",t.id="overlap-manager-root",t}(e);return o.set(n,t),t.setContainer(n),e.body.appendChild(n),t}}},22165:(e,t,n)=>{n.d(t,{Portal:()=>d,PortalContext:()=>c});var i=n(67294),r=n(73935),s=n(80068),o=n(28595),a=n(66189);class d extends i.PureComponent{constructor(){super(...arguments),this._uuid=(0,s.guid)()}componentWillUnmount(){this._manager().removeWindow(this._uuid)}render(){const e=this._manager().ensureWindow(this._uuid,this.props.layerOptions);return e.style.top=this.props.top||"",e.style.bottom=this.props.bottom||"",e.style.left=this.props.left||"",e.style.right=this.props.right||"",e.style.pointerEvents=this.props.pointerEvents||"",r.createPortal(i.createElement(c.Provider,{value:this},this.props.children),e)}moveToTop(){this._manager().moveToTop(this._uuid)}_manager(){return null===this.context?(0,o.getRootOverlapManager)():this.context}}d.contextType=a.SlotContext
;const c=i.createContext(null)},66189:(e,t,n)=>{n.d(t,{Slot:()=>r,SlotContext:()=>s});var i=n(67294);class r extends i.Component{shouldComponentUpdate(){return!1}render(){return i.createElement("div",{style:{position:"fixed",zIndex:150,left:0,top:0},ref:this.props.reference})}}const s=i.createContext(null)}}]);