(function(t){function e(e){for(var a,s,i=e[0],l=e[1],c=e[2],p=0,f=[];p<i.length;p++)s=i[p],Object.prototype.hasOwnProperty.call(o,s)&&o[s]&&f.push(o[s][0]),o[s]=0;for(a in l)Object.prototype.hasOwnProperty.call(l,a)&&(t[a]=l[a]);u&&u(e);while(f.length)f.shift()();return n.push.apply(n,c||[]),r()}function r(){for(var t,e=0;e<n.length;e++){for(var r=n[e],a=!0,i=1;i<r.length;i++){var l=r[i];0!==o[l]&&(a=!1)}a&&(n.splice(e--,1),t=s(s.s=r[0]))}return t}var a={},o={app:0},n=[];function s(e){if(a[e])return a[e].exports;var r=a[e]={i:e,l:!1,exports:{}};return t[e].call(r.exports,r,r.exports,s),r.l=!0,r.exports}s.m=t,s.c=a,s.d=function(t,e,r){s.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},s.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},s.t=function(t,e){if(1&e&&(t=s(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(s.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)s.d(r,a,function(e){return t[e]}.bind(null,a));return r},s.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return s.d(e,"a",e),e},s.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},s.p="/";var i=window["webpackJsonp"]=window["webpackJsonp"]||[],l=i.push.bind(i);i.push=e,i=i.slice();for(var c=0;c<i.length;c++)e(i[c]);var u=l;n.push([0,"chunk-vendors"]),r()})({0:function(t,e,r){t.exports=r("56d7")},"279a":function(t,e,r){},"279b":function(t,e,r){},2951:function(t,e,r){t.exports=r.p+"img/icon-header.aa1f63f2.png"},"56d7":function(t,e,r){"use strict";r.r(e);r("e260"),r("e6cf"),r("cca6"),r("a79d");var a=r("2b0e"),o=r("5f5b"),n=(r("f9e3"),r("2dd8"),function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{attrs:{id:"app"}},[r("router-view")],1)}),s=[],i={name:"App",components:{}},l=i,c=r("2877"),u=Object(c["a"])(l,n,s,!1,null,null,null),p=u.exports,f=r("8c4f"),m=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",[a("b-row",{attrs:{"align-h":"center"}},[a("b-col",{staticClass:"text-center",attrs:{lg:"8"}},[a("img",{staticClass:"picture",attrs:{src:r("f961"),alt:""}}),a("h1",{staticClass:"pb-5"},[t._v("Bienvenue sur votre réseau social d'entreprise")])])],1),a("b-row",{attrs:{"align-h":"center"}},[a("b-col",{attrs:{lg:"8"}},[a("b-card",{staticClass:"identification-box",attrs:{align:"center",title:"Connectez-vous"}},[a("b-col",{attrs:{"offset-lg":"2",lg:"8"}},[a("b-form",{on:{submit:t.login}},[a("b-form-input",{staticClass:"mt-4",attrs:{id:"input-1",type:"email",required:"",placeholder:"Entrez votre adresse email"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),a("b-form-input",{staticClass:"mt-3",attrs:{id:"input-2",type:"password",required:"",placeholder:"Entrez votre mot de passe"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),a("p",{staticClass:"text-center pt-4 "},[t._v("Pas de compte ? "),a("router-link",{attrs:{to:"/signup"}},[t._v("Inscription")]),a("b-button",{staticClass:"ml-5 submit",attrs:{type:"submit"},on:{click:t.login}},[t._v("Se connecter")])],1)],1)],1)],1)],1)],1)},d=[],b=r("bc3a"),v=r.n(b),h={name:"Login",data:function(){return{form:{email:"",password:""},error:""}},methods:{login:function(){console.log(t);var t={email:this.form.email,password:this.form.password};v.a.post("http://localhost:3000/api/users/login",t).then((function(t){console.log(t)})).catch((function(t){console.log(t.response)}))}}},g=h,w=(r("c349"),Object(c["a"])(g,m,d,!1,null,"47536d78",null)),x=w.exports,_=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",[a("b-row",{attrs:{"align-h":"center"}},[a("b-col",{staticClass:"text-center",attrs:{lg:"8"}},[a("img",{staticClass:"picture",attrs:{src:r("f961"),alt:""}}),a("h1",{staticClass:"pb-5"},[t._v("Bienvenue sur votre réseau social d'entreprise")])])],1),a("b-row",{attrs:{"align-h":"center"}},[a("b-col",{attrs:{lg:"8"}},[a("b-card",{staticClass:"identification-box",attrs:{align:"center",title:"Inscrivez-vous"}},[a("b-col",{attrs:{"offset-lg":"2",lg:"8"}},[a("b-form",{on:{submit:t.onSubmit}},[a("b-form-input",{staticClass:"mt-4",attrs:{id:"input-1",required:"",placeholder:"Entrez votre pseudo"},model:{value:t.form.pseudo,callback:function(e){t.$set(t.form,"pseudo",e)},expression:"form.pseudo"}}),a("b-form-input",{staticClass:"mt-3",attrs:{id:"input-2",type:"email",required:"",placeholder:"Entrez votre adresse email"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),a("b-form-input",{staticClass:"mt-3",attrs:{id:"input-3",type:"password",required:"",placeholder:"Entrez votre mot de passe"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}})],1),a("p",{staticClass:"text-center pt-4 "},[t._v("Déjà inscrit ? "),a("router-link",{attrs:{to:"/"}},[t._v("Se connecter")]),a("b-button",{staticClass:"ml-5 submit",attrs:{type:"signup"},on:{click:t.onSubmit}},[t._v("S'inscrire")])],1)],1)],1)],1)],1)],1)},C=[],y={name:"Signup",data:function(){return{form:{email:"",pseudo:"",password:""},show:!0}},methods:{onSubmit:function(){var t={email:this.form.email,pseudo:this.form.pseudo,password:this.form.password};v.a.post("http://localhost:3000/api/users",t).then((function(t){console.log(t)})).catch((function(t){console.log(t.response)}))}}},k=y,O=(r("a0fa"),Object(c["a"])(k,_,C,!1,null,"1a67ff46",null)),j=O.exports,$=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("b-container",{staticClass:"mb-4"},[a("b-navbar",{staticClass:"pt-3",attrs:{toggleable:"lg",type:"light"}},[a("b-navbar-brand",{attrs:{href:"#"}},[a("img",{staticClass:"logo",attrs:{src:r("2951"),width:"280",height:"60",alt:"Site Logo"}})]),a("b-navbar-toggle",{attrs:{target:"nav-collapse"}}),a("b-collapse",{attrs:{id:"nav-collapse","is-nav":""}},[a("b-navbar-nav",{staticClass:"ml-auto"},[a("b-nav-item",[a("router-link",{staticClass:"header-link",attrs:{to:"/header"}},[t._v("Mon profil")])],1),a("b-nav-item",[a("router-link",{staticClass:"header-link",attrs:{to:"/header"}},[t._v("Administrateur")])],1),a("b-nav-item",[a("router-link",{staticClass:"header-link",attrs:{to:"/"}},[t._v("Déconnexion")])],1)],1)],1)],1)],1)},S=[],M={name:"Header"},E=M,P=(r("6a1d"),Object(c["a"])(E,$,S,!1,null,"7b8680c6",null)),z=P.exports,H=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-container",[r("Header"),r("b-row",{attrs:{"align-h":"center"}},[r("b-col",{attrs:{lg:"8"}},[r("b-card",{staticClass:"identification-box",attrs:{align:"center",title:"Mon profil"}},[r("b-col",{attrs:{"offset-lg":"2",lg:"8"}},[r("div",[r("p",[t._v("TO DO Image profil")])]),r("div",{staticClass:"d-flex mt-4"},[r("b-form-input",{staticClass:"mr-4",attrs:{id:"input-1",placeholder:"Mon pseudo"},model:{value:t.form.pseudo,callback:function(e){t.$set(t.form,"pseudo",e)},expression:"form.pseudo"}}),r("b-button",[t._v("Modifier")])],1),r("div",{staticClass:"d-flex mt-4"},[r("b-form-input",{staticClass:"mr-4",attrs:{id:"input-2",type:"email",placeholder:"Mon adresse email"},model:{value:t.form.email,callback:function(e){t.$set(t.form,"email",e)},expression:"form.email"}}),r("b-button",[t._v("Modifier")])],1),r("div",{staticClass:"d-flex mt-4"},[r("b-form-input",{staticClass:"mr-4",attrs:{id:"input-3",type:"password",placeholder:"Mon mot de passe"},model:{value:t.form.password,callback:function(e){t.$set(t.form,"password",e)},expression:"form.password"}}),r("b-button",[t._v("Modifier")])],1)])],1)],1)],1)],1)},q=[],T={name:"Profile",components:{Header:z},data:function(){return{form:{email:"",pseudo:"",password:""}}}},D=T,I=(r("73f1"),Object(c["a"])(D,H,q,!1,null,"38060fb6",null)),L=I.exports,A=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("b-container",[r("Header")],1)},B=[],F={name:"Forum",components:{Header:z}},J=F,G=Object(c["a"])(J,A,B,!1,null,"1e00f9c1",null),K=G.exports;a["default"].use(f["a"]);var N=[{path:"/",name:"Login",component:x},{path:"/signup",name:"Signup",component:j},{path:"/header",name:"Header",component:z},{path:"/profile",name:"Profile",component:L},{path:"/forum",name:"Forum",component:K}],Q=new f["a"]({mode:"history",base:"/",routes:N}),R=Q;a["default"].use(o["a"]),a["default"].config.productionTip=!0,new a["default"]({router:R,render:function(t){return t(p)}}).$mount("#app")},"6a1d":function(t,e,r){"use strict";r("279b")},"73f1":function(t,e,r){"use strict";r("279a")},a0fa:function(t,e,r){"use strict";r("ccfa")},b473:function(t,e,r){},c349:function(t,e,r){"use strict";r("b473")},ccfa:function(t,e,r){},f961:function(t,e,r){t.exports=r.p+"img/icon-name.c1f17f3f.png"}});
//# sourceMappingURL=app.c76acc61.js.map