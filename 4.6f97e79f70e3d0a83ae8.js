(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{"4obj":function(e,t,s){"use strict";s.r(t),s.d(t,"AssignmentsModule",function(){return D});var i=s("ofXK"),n=s("tyNb"),r=s("fXoL"),c=s("lJxs"),a=s("XNiG"),o=s("quSY");class h extends o.a{constructor(e,t){super()}schedule(e,t=0){return this}}class u extends h{constructor(e,t){super(e,t),this.scheduler=e,this.work=t,this.pending=!1}schedule(e,t=0){if(this.closed)return this;this.state=e;const s=this.id,i=this.scheduler;return null!=s&&(this.id=this.recycleAsyncId(i,s,t)),this.pending=!0,this.delay=t,this.id=this.id||this.requestAsyncId(i,this.id,t),this}requestAsyncId(e,t,s=0){return setInterval(e.flush.bind(e,this),s)}recycleAsyncId(e,t,s=0){if(null!==s&&this.delay===s&&!1===this.pending)return t;clearInterval(t)}execute(e,t){if(this.closed)return new Error("executing a cancelled action");this.pending=!1;const s=this._execute(e,t);if(s)return s;!1===this.pending&&null!=this.id&&(this.id=this.recycleAsyncId(this.scheduler,this.id,null))}_execute(e,t){let s=!1,i=void 0;try{this.work(e)}catch(n){s=!0,i=!!n&&n||new Error(n)}if(s)return this.unsubscribe(),i}_unsubscribe(){const e=this.id,t=this.scheduler,s=t.actions,i=s.indexOf(this);this.work=null,this.state=null,this.pending=!1,this.scheduler=null,-1!==i&&s.splice(i,1),null!=e&&(this.id=this.recycleAsyncId(t,e,null)),this.delay=null}}class d extends u{constructor(e,t){super(e,t),this.scheduler=e,this.work=t}schedule(e,t=0){return t>0?super.schedule(e,t):(this.delay=t,this.state=e,this.scheduler.flush(this),this)}execute(e,t){return t>0||this.closed?super.execute(e,t):this._execute(e,t)}requestAsyncId(e,t,s=0){return null!==s&&s>0||null===s&&this.delay>0?super.requestAsyncId(e,t,s):e.flush(this)}}let l=(()=>{class e{constructor(t,s=e.now){this.SchedulerAction=t,this.now=s}schedule(e,t=0,s){return new this.SchedulerAction(this,e).schedule(s,t)}}return e.now=()=>Date.now(),e})();class p extends l{constructor(e,t=l.now){super(e,()=>p.delegate&&p.delegate!==this?p.delegate.now():t()),this.actions=[],this.active=!1,this.scheduled=void 0}schedule(e,t=0,s){return p.delegate&&p.delegate!==this?p.delegate.schedule(e,t,s):super.schedule(e,t,s)}flush(e){const{actions:t}=this;if(this.active)return void t.push(e);let s;this.active=!0;do{if(s=e.execute(e.state,e.delay))break}while(e=t.shift());if(this.active=!1,s){for(;e=t.shift();)e.unsubscribe();throw s}}}class b extends p{}const m=new b(d);var g=s("7o/Q"),f=s("EY2u"),w=s("LRne"),x=s("HDdC");let v=(()=>{class e{constructor(e,t,s){this.kind=e,this.value=t,this.error=s,this.hasValue="N"===e}observe(e){switch(this.kind){case"N":return e.next&&e.next(this.value);case"E":return e.error&&e.error(this.error);case"C":return e.complete&&e.complete()}}do(e,t,s){switch(this.kind){case"N":return e&&e(this.value);case"E":return t&&t(this.error);case"C":return s&&s()}}accept(e,t,s){return e&&"function"==typeof e.next?this.observe(e):this.do(e,t,s)}toObservable(){switch(this.kind){case"N":return Object(w.a)(this.value);case"E":return e=this.error,new x.a(t=>t.error(e));case"C":return Object(f.b)()}var e;throw new Error("unexpected notification kind value")}static createNext(t){return void 0!==t?new e("N",t):e.undefinedValueNotification}static createError(t){return new e("E",void 0,t)}static createComplete(){return e.completeNotification}}return e.completeNotification=new e("C"),e.undefinedValueNotification=new e("N",void 0),e})();class y extends g.a{constructor(e,t,s=0){super(e),this.scheduler=t,this.delay=s}static dispatch(e){const{notification:t,destination:s}=e;t.observe(s),this.unsubscribe()}scheduleMessage(e){this.destination.add(this.scheduler.schedule(y.dispatch,this.delay,new I(e,this.destination)))}_next(e){this.scheduleMessage(v.createNext(e))}_error(e){this.scheduleMessage(v.createError(e)),this.unsubscribe()}_complete(){this.scheduleMessage(v.createComplete()),this.unsubscribe()}}class I{constructor(e,t){this.notification=e,this.destination=t}}var N=s("9ppp"),_=s("Ylt2");class T extends a.a{constructor(e=Number.POSITIVE_INFINITY,t=Number.POSITIVE_INFINITY,s){super(),this.scheduler=s,this._events=[],this._infiniteTimeWindow=!1,this._bufferSize=e<1?1:e,this._windowTime=t<1?1:t,t===Number.POSITIVE_INFINITY?(this._infiniteTimeWindow=!0,this.next=this.nextInfiniteTimeWindow):this.next=this.nextTimeWindow}nextInfiniteTimeWindow(e){if(!this.isStopped){const t=this._events;t.push(e),t.length>this._bufferSize&&t.shift()}super.next(e)}nextTimeWindow(e){this.isStopped||(this._events.push(new k(this._getNow(),e)),this._trimBufferThenGetEvents()),super.next(e)}_subscribe(e){const t=this._infiniteTimeWindow,s=t?this._events:this._trimBufferThenGetEvents(),i=this.scheduler,n=s.length;let r;if(this.closed)throw new N.a;if(this.isStopped||this.hasError?r=o.a.EMPTY:(this.observers.push(e),r=new _.a(this,e)),i&&e.add(e=new y(e,i)),t)for(let c=0;c<n&&!e.closed;c++)e.next(s[c]);else for(let c=0;c<n&&!e.closed;c++)e.next(s[c].value);return this.hasError?e.error(this.thrownError):this.isStopped&&e.complete(),r}_getNow(){return(this.scheduler||m).now()}_trimBufferThenGetEvents(){const e=this._getNow(),t=this._bufferSize,s=this._windowTime,i=this._events,n=i.length;let r=0;for(;r<n&&!(e-i[r].time<s);)r++;return n>t&&(r=Math.max(r,n-t)),r>0&&i.splice(0,r),i}}class k{constructor(e,t){this.time=e,this.value=t}}var A=s("tk/3");let E=(()=>{class e{constructor(e){this.httpClient=e,this.URL="assets/mock",this.getAssignments$=this.httpClient.get(this.URL+"/assignments.json").pipe(Object(c.a)(e=>e.payload),function(e,t,s){let i;return i=e&&"object"==typeof e?e:{bufferSize:e,windowTime:void 0,refCount:!1,scheduler:void 0},e=>e.lift(function({bufferSize:e=Number.POSITIVE_INFINITY,windowTime:t=Number.POSITIVE_INFINITY,refCount:s,scheduler:i}){let n,r,c=0,a=!1,o=!1;return function(h){let u;c++,!n||a?(a=!1,n=new T(e,t,i),u=n.subscribe(this),r=h.subscribe({next(e){n.next(e)},error(e){a=!0,n.error(e)},complete(){o=!0,r=void 0,n.complete()}}),o&&(r=void 0)):u=n.subscribe(this),this.add(()=>{c--,u.unsubscribe(),u=void 0,r&&!o&&s&&0===c&&(r.unsubscribe(),r=void 0,n=void 0)})}}(i))}({bufferSize:1,refCount:!0}))}getAssignment(e){return this.httpClient.get(`${this.URL}/assignment/assignment${e}.json`).pipe(Object(c.a)(e=>e.payload))}}return e.\u0275fac=function(t){return new(t||e)(r.Jb(A.a))},e.\u0275prov=r.yb({token:e,factory:e.\u0275fac,providedIn:"root"}),e})();function S(e,t){if(1&e&&(r.Gb(0,"article"),r.Gb(1,"h1"),r.cc(2),r.Fb(),r.Gb(3,"p"),r.cc(4),r.Fb(),r.Fb()),2&e){const e=t.ngIf;r.tb(2),r.dc(e.assingmentName),r.tb(2),r.ec(" ",e.assignmentDetails," ")}}let C=(()=>{class e{constructor(e,t){this.router=e,this.assignmentsService=t}ngOnInit(){this.router.params.subscribe(e=>{console.log(e.id),this.getAssignment(Number(e.id))})}getAssignment(e){this.assignment$=this.assignmentsService.getAssignment(e)}}return e.\u0275fac=function(t){return new(t||e)(r.Cb(n.a),r.Cb(E))},e.\u0275cmp=r.wb({type:e,selectors:[["db-assignment"]],decls:5,vars:3,consts:[[1,"assigmnent-page"],[1,"ad-panel"],[4,"ngIf"]],template:function(e,t){1&e&&(r.Gb(0,"main",0),r.Db(1,"aside",1),r.ac(2,S,5,2,"article",2),r.Pb(3,"async"),r.Db(4,"aside",1),r.Fb()),2&e&&(r.tb(2),r.Rb("ngIf",r.Qb(3,1,t.assignment$)))},directives:[i.k],pipes:[i.b],styles:["article{margin:0 auto;width:60%;padding:10px 20px;border-radius:5px;box-shadow:0 .5rem 1rem rgba(0,0,0,.15)}h1{font-size:1.8rem;display:flex;justify-content:center}p{margin-top:10px}.assigmnent-page{margin-top:20px;display:flex;width:100%;padding-bottom:20px;padding-top:40px}.ad-panel{width:20%}@media screen and (max-width:812px){.ad-panel{width:0;display:none}article{width:80%;margin:0 auto}}"],encapsulation:3,changeDetection:0}),e})(),F=(()=>{class e{constructor(){this.assignmentNumber=new r.n}ngOnInit(){}checkAssignment(e){this.assignmentNumber.emit(e)}}return e.\u0275fac=function(t){return new(t||e)},e.\u0275cmp=r.wb({type:e,selectors:[["db-assignment-card"]],inputs:{assignment:"assignment"},outputs:{assignmentNumber:"assignmentNumber"},decls:5,vars:2,consts:[[3,"click"]],template:function(e,t){1&e&&(r.Gb(0,"article",0),r.Mb("click",function(){return t.checkAssignment(t.assignment.id)}),r.Gb(1,"h1"),r.cc(2),r.Fb(),r.Gb(3,"p"),r.cc(4),r.Fb(),r.Fb()),2&e&&(r.tb(2),r.dc(t.assignment.applicationName),r.tb(2),r.ec(" ",t.assignment.description," "))},styles:["article{margin:20px 0;padding:10px 20px;border-radius:5px}article:hover{box-shadow:0 2px 4px -1px rgba(0,0,0,.2),0 4px 5px 0 rgba(0,0,0,.14),0 1px 10px 0 rgba(0,0,0,.12);cursor:pointer}"],encapsulation:3,changeDetection:0}),e})();function O(e,t){if(1&e){const e=r.Hb();r.Gb(0,"db-assignment-card",4),r.Mb("assignmentNumber",function(t){return r.Xb(e),r.Ob().checkAssignment(t)}),r.Fb()}2&e&&r.Rb("assignment",t.$implicit)}const G=[{path:"",component:(()=>{class e{constructor(e,t){this.assignmentsService=e,this.router=t}ngOnInit(){this.assignments$=this.assignmentsService.getAssignments$}checkAssignment(e){this.router.navigate(["assignments",e])}}return e.\u0275fac=function(t){return new(t||e)(r.Cb(E),r.Cb(n.b))},e.\u0275cmp=r.wb({type:e,selectors:[["db-assignments"]],decls:6,vars:3,consts:[[1,"assigmnent-page"],[1,"ad-panel"],[1,"main-content"],["ngFor","",3,"ngForOf"],[3,"assignment","assignmentNumber"]],template:function(e,t){1&e&&(r.Gb(0,"main",0),r.Db(1,"aside",1),r.Gb(2,"div",2),r.ac(3,O,1,1,"ng-template",3),r.Pb(4,"async"),r.Fb(),r.Db(5,"aside",1),r.Fb()),2&e&&(r.tb(3),r.Rb("ngForOf",r.Qb(4,1,t.assignments$)))},directives:[i.j,F],pipes:[i.b],styles:[".assigmnent-page{width:100%;margin:20px auto 0;padding-bottom:20px;padding-top:40px;display:flex;background-color:#fff;color:#000}.ad-panel{width:20%}.main-content{display:flex;flex-direction:column;width:60%}@media screen and (max-width:812px){.ad-panel{width:0;display:none}.main-content{width:90%;margin:0 auto}}"],encapsulation:3,changeDetection:0}),e})()},{path:":id",component:C}];let j=(()=>{class e{}return e.\u0275mod=r.Ab({type:e}),e.\u0275inj=r.zb({factory:function(t){return new(t||e)},imports:[[n.e.forChild(G)],n.e]}),e})(),D=(()=>{class e{}return e.\u0275mod=r.Ab({type:e}),e.\u0275inj=r.zb({factory:function(t){return new(t||e)},imports:[[i.c,j]]}),e})()}}]);