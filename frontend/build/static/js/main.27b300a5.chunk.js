(this.webpackJsonpphonebook=this.webpackJsonpphonebook||[]).push([[0],{38:function(e,n,t){},39:function(e,n,t){},40:function(e,n,t){"use strict";t.r(n);var r=t(14),c=t.n(r),a=t(3),o=t(2),i=t(0),u=function(e){var n=e.filterName,t=e.handleFilterNameChange;return Object(i.jsxs)("form",{children:[Object(i.jsx)("h2",{children:"Filter results"}),Object(i.jsx)("label",{htmlFor:"filterName",children:"Name contains: "}),Object(i.jsx)("input",{id:"filterName",value:n,onChange:function(e){return t(e)}})]})},s=function(e){var n=e.newName,t=e.newNumber,r=e.handleNameChange,c=e.handleNumberChange,a=e.addPerson;return Object(i.jsxs)("form",{children:[Object(i.jsx)("h2",{children:"Add a new person"}),Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"newName",children:"Name: "}),Object(i.jsx)("input",{id:"newName",value:n,onChange:function(e){return r(e)}})]}),Object(i.jsxs)("div",{children:[Object(i.jsx)("label",{htmlFor:"newNumber",children:"Number: "}),Object(i.jsx)("input",{id:"newNumber",value:t,onChange:function(e){return c(e)}})]}),Object(i.jsx)("div",{children:Object(i.jsx)("button",{type:"submit",onClick:a,children:"add"})})]})},l=function(e){var n=e.persons,t=e.filterName,r=e.deleteHandler;return Object(i.jsxs)(i.Fragment,{children:[Object(i.jsx)("h2",{children:"Numbers"}),Object(i.jsx)("ul",{children:n.filter((function(e){return e.name.toLowerCase().includes(t.toLowerCase())})).map((function(e){return Object(i.jsx)(d,{name:e.name,number:e.number,id:e.id,deleteHandler:r},e.id)}))})," "]})},d=function(e){var n=e.name,t=e.number,r=e.id,c=e.deleteHandler;return Object(i.jsxs)("li",{children:[n," ",t," ",Object(i.jsx)("button",{onClick:function(){return c(r,n)},children:"delete"})]})},b=t(4),j=t.n(b),f="/api/persons",m=function(){return j.a.get(f)},h=function(e){return j.a.post(f,e)},O=function(e,n){return j.a.put("".concat(f,"/").concat(e),n)},x=function(e){return j.a.delete("".concat(f,"/").concat(e))},p=(t(38),function(e){var n=e.notification,t=n.message,r=n.status;if(""===t)return null;return Object(i.jsx)("div",{style:{display:"block",fontSize:"1.5rem",boxSizing:"border-box",padding:"0 1rem"},className:r,children:Object(i.jsx)("p",{children:t})})}),N=function(){var e=Object(o.useState)([]),n=Object(a.a)(e,2),t=n[0],r=n[1],c=Object(o.useState)(""),d=Object(a.a)(c,2),b=d[0],j=d[1],f=Object(o.useState)(""),N=Object(a.a)(f,2),g=N[0],v=N[1],w=Object(o.useState)(""),C=Object(a.a)(w,2),y=C[0],k=C[1],F=Object(o.useState)({message:"",status:""}),S=Object(a.a)(F,2),E=S[0],H=S[1];Object(o.useEffect)((function(){m().then((function(e){r(e.data)}))}),[]);var P=function(e){var n=e.id,c=e.name,a=e.number;window.confirm("Do you want to update ".concat(c,"?"))&&O(n,{name:c,number:a}).then((function(e){console.log(e),r(t.map((function(t){return t.id!==n?t:e.data}))),j(""),v(""),z("success","".concat(c," updated successfully"))})).catch((function(e){console.error(e),z("error","Error updating person: ".concat(e))}))},z=function(e,n){H({status:e,message:n}),setTimeout((function(){A()}),3e3)},A=function(){H({status:"",message:""})};return Object(i.jsxs)("main",{role:"main",children:[Object(i.jsx)("h1",{children:"Phonebook"}),Object(i.jsx)(p,{notification:E}),Object(i.jsx)(u,{filterName:y,handleFilterNameChange:function(e){k(e.target.value)}}),Object(i.jsx)(s,{newName:b,newNumber:g,handleNameChange:function(e){j(e.target.value)},handleNumberChange:function(e){v(e.target.value)},addPerson:function(e){e.preventDefault();var n=t.find((function(e){return e.name===b}));n?P({id:n.id,name:b,number:g}):h({name:b,number:g}).then((function(e){r(t.concat(e.data)),j(""),v(""),z("success","".concat(b," added successfully"))})).catch((function(e){console.error(e),z("error","Error adding person: ".concat(e))}))}}),Object(i.jsx)(l,{persons:t,filterName:y,deleteHandler:function(e,n){window.confirm("Are you sure you want to delete ".concat(n,"?"))&&x(e).then((function(c){r(t.filter((function(n){return n.id!==e}))),z("success","".concat(n," deleted successfully"))})).catch((function(e){console.error(e),z("error","Information of ".concat(n," already deleted from the server"))}))}})]})};t(39);c.a.render(Object(i.jsx)(N,{}),document.getElementById("root"))}},[[40,1,2]]]);
//# sourceMappingURL=main.27b300a5.chunk.js.map