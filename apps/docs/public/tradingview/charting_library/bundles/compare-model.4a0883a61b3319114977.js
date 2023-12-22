"use strict";(self.webpackChunktradingview=self.webpackChunktradingview||[]).push([[7271],{460:(e,t,s)=>{s.d(t,{qualifyProName:()=>r,QualifiedSources:()=>o});var o,n=s(16282),i=s(7424);function r(e){return e}!function(e){function t(e){return e.pro_name}function s(e){{const t=i.enabled("pay_attention_to_ticker_not_symbol")?e.ticker:e.full_name;return(0,n.ensureDefined)(t)}}e.fromQuotesResponse=function(e){const{values:s,symbolname:o,status:n}=e;return"error"===n&&o?o:t(s)},e.fromQuotes=t,e.fromSymbolSearchResult=function(e,t){{const{ticker:s,full_name:o}=null!=t?t:e;return i.enabled("pay_attention_to_ticker_not_symbol")?(0,n.ensureDefined)(null!=s?s:o):(0,n.ensureDefined)(o)}},e.fromSymbolInfo=s,e.fromSymbolMessage=function(e,t){return"symbol_resolved"===t.method?s(t.params[1]):e}}(o||(o={}))},4760:(e,t,s)=>{function o(e){if(e.fullName)return e.fullName;let t;return t=e.prefix||e.exchange?(e.prefix||e.exchange)+":"+e.name:e.name,t.replace(/<\/?[^>]+(>|$)/g,"")}function n(e){return""===e.value}function i(){const e=a();return e.find(n)||e[0]||null}function r(){return a()}function a(){return window.ChartApiInstance.supportedExchangesList().map(e=>({...e,country:"",providerId:"",flag:""}))}function l(){return window.ChartApiInstance.supportedSymbolsTypes()}function c(){return""}function d(){return!1}s.d(t,{getSymbolFullName:()=>o,isAllExchanges:()=>n,getDefaultExchange:()=>i,getAvailableExchanges:()=>r,getAvailableSymbolTypes:()=>l,getAllSymbolTypesValue:()=>c,exchangeSelectDisabled:()=>d})},19534:(e,t,s)=>{s.r(t),s.d(t,{CompareModel:()=>k});var o=s(16282),n=s(7424),i=s(87086),r=s(39046),a=s(19160),l=s.n(a),c=s(4188),d=s(64401),h=s(43120),u=s(460),m=s(4760);new Set(["short_name","description","exchange","type","country_code","provider_id"]);const y=(0,m.getAvailableExchanges)(),_={};for(const e of y)_[e.value]={country:e.country,providerId:e.providerId};function S(e){return e instanceof d.study_Overlay||e instanceof h.StudyCompare}function f(e){if(!e)return;const[t,s]=e.split(":");return s&&t&&_[t]?_[t]:void 0}function p(e,t,s){const o=u.QualifiedSources.fromSymbolInfo(e),n=f(o);return{id:(null==s?void 0:s.id())||o,symbol:o,checked:t,title:e.name,description:e.description,exchangeName:e.exchange,country:null==n?void 0:n.country,providerId:null==n?void 0:n.providerId,marketType:e.type,study:s}}function b(e,t,s,o){return{id:void 0!==s?s.id():e,symbol:e,checked:t,title:e,study:s,description:o}}var g=s(69671),v=s(69449),I=s(80478);class k{constructor(e){this._contentItemList=new(l())([]),this._checkedSymbols=new Map,this._recentLength=10,this._adapter=v.quoteSessionAdapters.get("compare-dialog-adapter"),this._isDataReady=new(l())(!1),this._highlightedSymbol=new(l())(null),this._defaultSymbolsDescriptions=new Map,this._idToStudyMap=new Map,this._chartSession=null,this._recentSymbolsEnabled=n.enabled("compare_recent_symbols_enabled"),this._preventHandleSourcesChange=!0,this.removeStudy=e=>{const{symbol:t,study:s}=e;if(!s)return;this._chartWidget.model().removeSource(s,!1);const o=this._checkedSymbols.get(t)
;o&&o.length>1?this._removeStudyIdFromCheckedSymbols(t,s.id()):this._checkedSymbols.delete(t),this._updateContentItemList(this._contentItemList.value(),!0)},this._getResolveSymbolPromise=(e,t=(0,i.makeNextSymbolId)())=>{const s=(0,r.encodeExtendedSymbolOrGetSimpleSymbolString)({symbol:e});return new Promise(e=>{(0,o.ensureNotNull)(this._chartSession).resolveSymbol(t,s,t=>{e(t)})})},this._chartWidget=e.activeChartWidget.value(),this._chartSession=this._chartWidget.model().model().chartApi();const t=new Set(this._loadRecent().reverse()),s=new Set,a=new Set,c=this._chartWidget.model().model().dataSources().filter(S),d=c.map(e=>{const t=e.symbolInfo();if(t)return Promise.resolve(u.QualifiedSources.fromSymbolInfo(t));const s=e.symbol();return(0,u.qualifyProName)(s)});Promise.all(d).then(e=>{const o=e.map((e,t)=>void 0!==e?c[t]:void 0).filter(w);e.filter(w).forEach((e,n)=>{const i=o[n],r=i.id();this._addStudyIdToCheckedSymbols(e,r),this._idToStudyMap.set(r,i),t.has(e)?s.add(e):a.add(e)});const n=Array.from(t).filter(e=>this._checkedSymbols.has(e)).reduce((e,t)=>(s.has(t)&&e.push(t),e),[]).concat(Array.from(a)),r=Array.from(t);if(r.length<this._recentLength){let e;e=[],this._chartWidget.compareSymbols()&&this._chartWidget.compareSymbols().forEach(t=>{e.push((0,u.qualifyProName)(t.symbol)),this._defaultSymbolsDescriptions.set(t.symbol,t.title)});const t=[...r,...e];n.push(...t)}else n.push(...r);const l=Array.from(new Set(n));{const e=new Map,t=l.map(t=>{const s=(0,i.makeNextSymbolId)();return e.set(t,s),this._getResolveSymbolPromise(t,s)});Promise.all(t).then(t=>this._handleInitProcess(n,s=>{const o=e.get(s);return t.find(e=>e.params[0]===o)},(e,t)=>u.QualifiedSources.fromSymbolMessage(t,e),(e,t,s,o)=>"symbol_resolved"===e.method?p(e.params[1],s,o):b(t,s,o,this._getSymbolDescription(t))))}})}chartModel(){return this._chartWidget.model().model()}handleSourcesChange(){if(this._preventHandleSourcesChange)return;const e=this.chartModel().dataSources().filter(S),t=new Set(e.map(e=>e.id()));Array.from(t).forEach(e=>{if(!this._checkedStudiesIds().has(e)){const t=this.chartModel().dataSourceForId(e)||null;if(null!==t&&S(t)){const t=this._getContentItemByStudyId(e);if(!t)return;this._addStudyIdToCheckedSymbols(t.symbol,e),this._saveRecent(t.symbol),this._updateContentItemList(this._contentItemList.value(),!0)}}});Array.from(this._checkedStudiesIds()).forEach(e=>{if(!t.has(e)){const t=this._getContentItemByStudyId(e);if(!t)return;const s=this._checkedSymbols.get(t.symbol);s&&s.length>1?this._removeStudyIdFromCheckedSymbols(t.symbol,e):this._checkedSymbols.delete(t.symbol),this._updateContentItemList(this._contentItemList.value(),!0)}})}studies(){return this._contentItemList.readonly()}isDataReady(){return this._isDataReady.readonly()}highlightedSymbol(){return this._highlightedSymbol.readonly()}applyStudy(e,t,s){const o=this._chartWidget;if(!o)return;if((0,I.isSeparatorItem)(e))return;let n;switch(t){case c.CompareOption.SameScale:n=o.addCompareAsOverlay(e,s);break;case c.CompareOption.NewPriceScale:n=o.addOverlayStudy(e,!0,s);break
;case c.CompareOption.NewPane:n=o.addOverlayStudy(e,!1,s)}Promise.all([this._getResolveSymbolPromise(e),n]).then(t=>this._handleApplyProcess(t,t=>u.QualifiedSources.fromSymbolMessage(e,t),(e,t,s)=>"symbol_resolved"===e.method?p(e.params[1],!0,s):b(t,!0,s)))}_handleApplyProcess(e,t,s){const[o,n]=e;if(!o||null===n)return;const i=n.id(),r=t(o),a=s(o,r,n);this._saveRecent(r),this._addStudyIdToCheckedSymbols(r,i),this._showNewItem(a,r,i)}_handleInitProcess(e,t,s,o){const n=[];for(const i of e){const e=t(i);if(!e)continue;const r=s(e,i),a=this._checkedSymbols.get(r),l=-1!==n.findIndex(e=>e.symbol===r);if(void 0===a||l)this._recentSymbolsEnabled&&n.push(o(e,r,!1));else for(const t of a)n.push(o(e,r,!0,this._idToStudyMap.get(t)))}this._updateContentItemList(n),this._isDataReady.setValue(!0)}_showNewItem(e,t,s){const o=this._contentItemList.value().map(this._updateChecked,this);o.unshift(e),this._recentSymbolsEnabled&&o.unshift({...e,id:t,study:void 0,checked:!1}),this._updateContentItemList(o),this._highlightedSymbol.setValue(s),setTimeout(()=>this._highlightedSymbol.setValue(null),500)}_addStudyIdToCheckedSymbols(e,t){const s=this._checkedSymbols.get(e)||[];this._checkedSymbols.set(e,[...s,t])}_removeStudyIdFromCheckedSymbols(e,t){const s=this._checkedSymbols.get(e);if(s){const o=s.indexOf(t);s.splice(o,1),this._checkedSymbols.set(e,s)}}_updateChecked(e){var t;const s=this._checkedSymbols.get(e.symbol),o=null===(t=e.study)||void 0===t?void 0:t.id();return o?{...e,checked:Boolean(s&&s.includes(o))}:e}_updateContentItemList(e,t){const s=t?e.map(this._updateChecked,this):e,o=s.filter(e=>e.checked);if(this._recentSymbolsEnabled){const e=new Set,t=s.reduce((t,s)=>(s.checked||e.has(s.symbol)||(t.push(s),e.add(s.symbol)),t),[]).slice(0,this._recentLength);this._contentItemList.setValue(o.concat(t))}else this._contentItemList.setValue(o)}_checkedStudiesIds(){const e=[].concat(...Array.from(this._checkedSymbols.values()));return new Set(e)}_getContentItemByStudyId(e){const t=this._contentItemList.value(),s=t.findIndex(t=>t.study&&t.study.id()===e);return t[s]}_loadRecent(){return this._recentSymbolsEnabled?g.getJSON("CompareDialog.recent",[]):[]}_saveRecent(e){if(!this._recentSymbolsEnabled)return;const t=new Set(this._loadRecent());t.has(e)&&t.delete(e),t.add(e),g.setJSON("CompareDialog.recent",Array.from(t).slice(-this._recentLength))}_getSymbolDescription(e){var t;return this._defaultSymbolsDescriptions.size&&null!==(t=this._defaultSymbolsDescriptions.get(e))&&void 0!==t?t:""}}function w(e){return void 0!==e}},4188:(e,t,s)=>{var o;s.d(t,{CompareOption:()=>o}),function(e){e[e.SameScale=0]="SameScale",e[e.NewPriceScale=1]="NewPriceScale",e[e.NewPane=2]="NewPane"}(o||(o={}))}}]);