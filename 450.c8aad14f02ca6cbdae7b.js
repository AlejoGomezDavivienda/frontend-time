"use strict";(self.webpackChunkfrontend_time=self.webpackChunkfrontend_time||[]).push([[450],{2450:(y,h,a)=>{a.r(h),a.d(h,{AdminDashboardModule:()=>z});var u=a(8583),A=a(4655),v=a(8239),l=a(2789),m=a(3962),s=a(3679),o=a(2238),e=a(7716),f=a(8295),C=a(9983),p=a(3220),_=a(1095);function M(t,r){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Invalid start date"),e.qZA())}function U(t,r){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Invalid end date"),e.qZA())}let P=(()=>{class t{constructor(i,n){this.dialogRef=i,this.data=n,this.range=new s.cw({start:new s.NI("",s.kI.required),end:new s.NI("",s.kI.required)})}ngOnInit(){}onNoClick(){this.dialogRef.close()}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(o.so),e.Y36(o.WI))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-add-general-activity"]],decls:31,vars:9,consts:[[1,"container","mt-2","text-center"],["mat-dialog-title",""],["mat-dialog-content",""],[1,"row","justify-content-center"],["appearance","fill",1,"inputs"],["matInput","","placeholder","Ingrese el nombre de la actividad que desea registrar",3,"ngModel","ngModelChange"],["type","number","min","0","matInput","","placeholder","N\xfamero de horas estimadas para la finalizaci\xf3n!",3,"ngModel","ngModelChange"],["appearance","fill",1,"filtro"],[3,"rangePicker"],["matStartDate","","placeholder","Start date",3,"ngModel","ngModelChange"],["matEndDate","","placeholder","End date",3,"ngModel","ngModelChange"],["matSuffix","",3,"for"],["picker",""],[4,"ngIf"],["mat-dialog-actions","",1,"justify-content-center"],["mat-button","",3,"click"],["mat-raised-button","","color","primary","cdkFocusInitial","",3,"mat-dialog-close"]],template:function(i,n){if(1&i&&(e.TgZ(0,"div",0),e.TgZ(1,"h1",1),e._uU(2,"Agregar Actividad General"),e.qZA(),e.TgZ(3,"div",2),e.TgZ(4,"p"),e._uU(5,"Registrar una actividad que todos los usuarios tendr\xe1n en el project plan:"),e.qZA(),e.TgZ(6,"div",3),e.TgZ(7,"mat-form-field",4),e.TgZ(8,"mat-label"),e._uU(9,"Actividad"),e.qZA(),e.TgZ(10,"input",5),e.NdJ("ngModelChange",function(c){return n.data.name=c}),e.qZA(),e.qZA(),e.TgZ(11,"mat-form-field",4),e.TgZ(12,"mat-label"),e._uU(13,"Horas Estimadas"),e.qZA(),e.TgZ(14,"input",6),e.NdJ("ngModelChange",function(c){return n.data.estimated_hours=c}),e.qZA(),e.qZA(),e.TgZ(15,"mat-form-field",7),e.TgZ(16,"mat-label"),e._uU(17,"Seleccione fecha inicial y final"),e.qZA(),e.TgZ(18,"mat-date-range-input",8),e.TgZ(19,"input",9),e.NdJ("ngModelChange",function(c){return n.data.initial_date=c}),e.qZA(),e.TgZ(20,"input",10),e.NdJ("ngModelChange",function(c){return n.data.end_date=c}),e.qZA(),e.qZA(),e._UZ(21,"mat-datepicker-toggle",11),e._UZ(22,"mat-date-range-picker",null,12),e.YNc(24,M,2,0,"mat-error",13),e.YNc(25,U,2,0,"mat-error",13),e.qZA(),e.qZA(),e.qZA(),e.TgZ(26,"div",14),e.TgZ(27,"button",15),e.NdJ("click",function(){return n.onNoClick()}),e._uU(28,"Cancelar"),e.qZA(),e.TgZ(29,"button",16),e._uU(30,"Guardar"),e.qZA(),e.qZA(),e.qZA()),2&i){const d=e.MAs(23);e.xp6(10),e.Q6J("ngModel",n.data.name),e.xp6(4),e.Q6J("ngModel",n.data.estimated_hours),e.xp6(4),e.Q6J("rangePicker",d),e.xp6(1),e.Q6J("ngModel",n.data.initial_date),e.xp6(1),e.Q6J("ngModel",n.data.end_date),e.xp6(1),e.Q6J("for",d),e.xp6(3),e.Q6J("ngIf",n.range.controls.start.hasError("matStartDateInvalid")),e.xp6(1),e.Q6J("ngIf",n.range.controls.end.hasError("matEndDateInvalid")),e.xp6(4),e.Q6J("mat-dialog-close",n.data)}},directives:[o.uh,o.xY,f.KE,f.hX,C.Nt,s.Fj,s.JJ,s.On,s.qQ,s.wV,p.wx,p.zY,p.By,p.nW,f.R9,p._g,u.O5,o.H8,_.lW,o.ZT,f.TO],styles:[".inputs[_ngcontent-%COMP%]{width:100%}"]}),t})();function q(t,r){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Invalid start date"),e.qZA())}function I(t,r){1&t&&(e.TgZ(0,"mat-error"),e._uU(1,"Invalid end date"),e.qZA())}let R=(()=>{class t{constructor(i,n){this.dialogRef=i,this.data=n,this.range=new s.cw({start:new s.NI("",s.kI.required),end:new s.NI("",s.kI.required)})}ngOnInit(){}onNoClick(){this.dialogRef.close()}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(o.so),e.Y36(o.WI))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-add-specific-activity"]],decls:31,vars:9,consts:[[1,"container","mt-2","text-center"],["mat-dialog-title",""],["mat-dialog-content",""],[1,"row","justify-content-center"],["appearance","fill",1,"inputs"],["matInput","","placeholder","Ingrese el nombre de la actividad que desea registrar",3,"ngModel","ngModelChange"],["type","number","min","0","matInput","","placeholder","N\xfamero de horas estimadas para la finalizaci\xf3n!",3,"ngModel","ngModelChange"],["appearance","fill",1,"filtro"],[3,"rangePicker"],["matStartDate","","placeholder","Start date",3,"ngModel","ngModelChange"],["matEndDate","","placeholder","End date",3,"ngModel","ngModelChange"],["matSuffix","",3,"for"],["picker",""],[4,"ngIf"],["mat-dialog-actions","",1,"justify-content-center"],["mat-button","",3,"click"],["mat-raised-button","","color","primary","cdkFocusInitial","",3,"mat-dialog-close"]],template:function(i,n){if(1&i&&(e.TgZ(0,"div",0),e.TgZ(1,"h1",1),e._uU(2,"Agregar Actividad General"),e.qZA(),e.TgZ(3,"div",2),e.TgZ(4,"p"),e._uU(5,"Registrar una actividad que todos los usuarios tendr\xe1n en el project plan:"),e.qZA(),e.TgZ(6,"div",3),e.TgZ(7,"mat-form-field",4),e.TgZ(8,"mat-label"),e._uU(9,"Actividad"),e.qZA(),e.TgZ(10,"input",5),e.NdJ("ngModelChange",function(c){return n.data.name=c}),e.qZA(),e.qZA(),e.TgZ(11,"mat-form-field",4),e.TgZ(12,"mat-label"),e._uU(13,"Horas Estimadas"),e.qZA(),e.TgZ(14,"input",6),e.NdJ("ngModelChange",function(c){return n.data.estimated_hours=c}),e.qZA(),e.qZA(),e.TgZ(15,"mat-form-field",7),e.TgZ(16,"mat-label"),e._uU(17,"Seleccione fecha inicial y final"),e.qZA(),e.TgZ(18,"mat-date-range-input",8),e.TgZ(19,"input",9),e.NdJ("ngModelChange",function(c){return n.data.initial_date=c}),e.qZA(),e.TgZ(20,"input",10),e.NdJ("ngModelChange",function(c){return n.data.end_date=c}),e.qZA(),e.qZA(),e._UZ(21,"mat-datepicker-toggle",11),e._UZ(22,"mat-date-range-picker",null,12),e.YNc(24,q,2,0,"mat-error",13),e.YNc(25,I,2,0,"mat-error",13),e.qZA(),e.qZA(),e.qZA(),e.TgZ(26,"div",14),e.TgZ(27,"button",15),e.NdJ("click",function(){return n.onNoClick()}),e._uU(28,"Cancelar"),e.qZA(),e.TgZ(29,"button",16),e._uU(30,"Guardar"),e.qZA(),e.qZA(),e.qZA()),2&i){const d=e.MAs(23);e.xp6(10),e.Q6J("ngModel",n.data.name),e.xp6(4),e.Q6J("ngModel",n.data.estimated_hours),e.xp6(4),e.Q6J("rangePicker",d),e.xp6(1),e.Q6J("ngModel",n.data.initial_date),e.xp6(1),e.Q6J("ngModel",n.data.end_date),e.xp6(1),e.Q6J("for",d),e.xp6(3),e.Q6J("ngIf",n.range.controls.start.hasError("matStartDateInvalid")),e.xp6(1),e.Q6J("ngIf",n.range.controls.end.hasError("matEndDateInvalid")),e.xp6(4),e.Q6J("mat-dialog-close",n.data)}},directives:[o.uh,o.xY,f.KE,f.hX,C.Nt,s.Fj,s.JJ,s.On,s.qQ,s.wV,p.wx,p.zY,p.By,p.nW,f.R9,p._g,u.O5,o.H8,_.lW,o.ZT,f.TO],styles:[".inputs[_ngcontent-%COMP%]{width:100%}"]}),t})();var S=a(4109),D=a(9525),N=a(9133),w=a(1769),E=a(6627),Z=a(171);function x(t,r){1&t&&(e.TgZ(0,"th",20),e._uU(1," Actividad "),e.qZA())}function J(t,r){if(1&t&&(e.TgZ(0,"td",21),e._uU(1),e.qZA()),2&t){const i=r.$implicit;e.xp6(1),e.hij(" ",i.name," ")}}function j(t,r){1&t&&(e.TgZ(0,"th",20),e._uU(1," Fecha Inicio "),e.qZA())}function O(t,r){if(1&t&&(e.TgZ(0,"td",21),e._uU(1),e.ALo(2,"date"),e.qZA()),2&t){const i=r.$implicit;e.xp6(1),e.hij(" ",e.xi3(2,1,i.initial_date,"dd/MM/yyyy")," ")}}function Q(t,r){1&t&&(e.TgZ(0,"th",20),e._uU(1," Fecha Fin "),e.qZA())}function b(t,r){if(1&t&&(e.TgZ(0,"td",21),e._uU(1),e.ALo(2,"date"),e.qZA()),2&t){const i=r.$implicit;e.xp6(1),e.hij(" ",e.xi3(2,1,i.end_date,"dd/MM/yyyy")," ")}}function Y(t,r){1&t&&e._UZ(0,"tr",22)}function G(t,r){1&t&&e._UZ(0,"tr",23)}function F(t,r){if(1&t&&(e.ynx(0),e.TgZ(1,"p",24),e._uU(2),e.qZA(),e.BQk()),2&t){const i=r.$implicit,n=e.oxw().$implicit,d=e.oxw();e.xp6(2),e.Oqu(d.getUserResume(n,i))}}function k(t,r){if(1&t&&(e.TgZ(0,"mat-expansion-panel"),e.TgZ(1,"mat-expansion-panel-header"),e.TgZ(2,"mat-panel-title"),e._uU(3),e.qZA(),e.TgZ(4,"mat-panel-description"),e._uU(5),e.ALo(6,"date"),e.ALo(7,"date"),e.qZA(),e.qZA(),e.YNc(8,F,3,1,"ng-container",19),e.qZA()),2&t){const i=r.$implicit;e.xp6(3),e.AsE(" ",i.name," - ",i.estimated_hours," Horas "),e.xp6(2),e.AsE(" ",e.xi3(6,5,i.initial_date,"dd/MM/yyyy")," - ",e.xi3(7,8,i.end_date,"dd/MM/yyyy")," "),e.xp6(3),e.Q6J("ngForOf",i.users)}}const B=[{path:"",component:(()=>{class t{constructor(i,n,d,c){this.activityService=i,this.userService=n,this.dialog=d,this.sweetAlert=c,this.generalActivities=[],this.specificActivities=[],this.data={name:"Hola",initial_date:new Date,end_date:new Date,estimated_hours:0,open_state:!1,is_general:!0},this.length=this.generalActivities.length,this.pageSize=5,this.pageSizeOptions=[5,this.generalActivities.length/2,this.generalActivities.length],this.displayedColumns=["name","inicio-date","fin-date"],this.displayedColumnsSpecific=["name","inicio-date","fin-date"],this.generalActivitiesSource=new l.by,this.specificActivitiesSource=new l.by}ngOnInit(){this.loadData()}ngAfterViewInit(){}loadData(){this.activityService.getActivities().subscribe(i=>{this.generalActivities=i.activities.filter(n=>n.is_general),this.specificActivities=i.activities.filter(n=>!n.is_general),this.generalActivitiesSource=new l.by(this.generalActivities),this.specificActivitiesSource=new l.by(this.specificActivities)},i=>{console.log(i)})}addGeneral(){this.dialog.open(P,{width:"85%",data:this.data}).afterClosed().subscribe(n=>{if(n)if(this.verifyActivityData(n)){const c=n;c.is_general=!0,this.activityService.createActivity(c).subscribe(g=>{this.generalActivities.push(g.activity),this.sweetAlert.presentSuccess("Actividad Agregada Correctamente!")},g=>{console.log(g)})}else this.sweetAlert.presentError("Informaci\xf3n Inv\xe1lida!")})}getUserNameById(i){var n=this;return(0,v.Z)(function*(){const d=yield n.userService.getUserById(i);return console.log("user: ",d),"Generic"})()}addSpecific(){this.dialog.open(R,{width:"85%",data:this.data}).afterClosed().subscribe(n=>{if(n)if(this.verifyActivityData(n)){const c=n;c.is_general=!1,this.activityService.createActivity(c).subscribe(g=>{this.specificActivities.push(g.activity),this.sweetAlert.presentSuccess("Actividad Agregada Correctamente!")},g=>{console.log(g)})}else this.sweetAlert.presentError("Informaci\xf3n Inv\xe1lida!")})}verifyActivityData(i){return!!(i.name&&i.initial_date&&i.end_date&&i.estimated_hours)}getUserResume(i,n){var d;let c=0,g="";if(g+=n.user.name.toUpperCase(),-1!==(null===(d=i.users)||void 0===d?void 0:d.findIndex(T=>T.user._id==n.user._id))){const T=n.worked_hours||0;try{c=100*T/i.estimated_hours}catch(K){console.error("Division 0/0")}}return g+=` --- Indicador: ${c.toFixed(2)}%`,g}}return t.\u0275fac=function(i){return new(i||t)(e.Y36(S.M),e.Y36(D.K),e.Y36(o.uw),e.Y36(N.T))},t.\u0275cmp=e.Xpm({type:t,selectors:[["app-resume-project-plan"]],viewQuery:function(i,n){if(1&i&&e.Gf(m.NW,5),2&i){let d;e.iGM(d=e.CRH())&&(n.paginator=d.first)}},decls:45,vars:4,consts:[[1,"container","mt-3","mb-3"],[1,"row","ml-1","md-6","justify-content-center"],[1,"row"],[1,"col-md-4","col-xs-4"],["mat-raised-button","","color","primary",1,"boton","mt-3",3,"click"],[1,"row","mt-2","ml-1"],[1,"mt-2","ml-2"],[1,"row","mt-1"],[1,"mat-elevation-z8",2,"width","100%"],["mat-table","",3,"dataSource"],["matColumnDef","name"],["mat-header-cell","",4,"matHeaderCellDef"],["mat-cell","",4,"matCellDef"],["matColumnDef","inicio-date"],["matColumnDef","fin-date"],["mat-header-row","",4,"matHeaderRowDef"],["mat-row","",4,"matRowDef","matRowDefColumns"],[1,"row","mt-2"],[1,"w-100"],[4,"ngFor","ngForOf"],["mat-header-cell",""],["mat-cell",""],["mat-header-row",""],["mat-row",""],[2,"color","red"]],template:function(i,n){1&i&&(e.TgZ(0,"div",0),e.TgZ(1,"div",1),e.TgZ(2,"h1"),e._uU(3,"Resumen General del Project Plan"),e.qZA(),e.qZA(),e._UZ(4,"mat-divider"),e.TgZ(5,"div",2),e.TgZ(6,"div",3),e.TgZ(7,"button",4),e.NdJ("click",function(){return n.addGeneral()}),e._uU(8," Agregar General "),e.TgZ(9,"mat-icon"),e._uU(10,"add"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(11,"div",5),e.TgZ(12,"h2"),e._uU(13,"Actividades Generales:"),e.qZA(),e.TgZ(14,"p",6),e._uU(15,"Son aquellas actividades que todos los usuarios tienen en com\xfan"),e.qZA(),e.qZA(),e.TgZ(16,"div",7),e.TgZ(17,"div",8),e.TgZ(18,"table",9),e.ynx(19,10),e.YNc(20,x,2,0,"th",11),e.YNc(21,J,2,1,"td",12),e.BQk(),e.ynx(22,13),e.YNc(23,j,2,0,"th",11),e.YNc(24,O,3,4,"td",12),e.BQk(),e.ynx(25,14),e.YNc(26,Q,2,0,"th",11),e.YNc(27,b,3,4,"td",12),e.BQk(),e.YNc(28,Y,1,0,"tr",15),e.YNc(29,G,1,0,"tr",16),e.qZA(),e.qZA(),e.qZA(),e._UZ(30,"mat-divider"),e.TgZ(31,"div",17),e.TgZ(32,"div",3),e.TgZ(33,"button",4),e.NdJ("click",function(){return n.addSpecific()}),e._uU(34," Agregar Espec\xedfico "),e.TgZ(35,"mat-icon"),e._uU(36,"add"),e.qZA(),e.qZA(),e.qZA(),e.qZA(),e.TgZ(37,"div",5),e.TgZ(38,"h2"),e._uU(39,"Actividades Espec\xedficas:"),e.qZA(),e.TgZ(40,"p",6),e._uU(41,"Son aquellas actividades que se le pueden asignar a un usuario en concreto"),e.qZA(),e.qZA(),e.TgZ(42,"div",7),e.TgZ(43,"mat-accordion",18),e.YNc(44,k,9,11,"mat-expansion-panel",19),e.qZA(),e.qZA(),e.qZA()),2&i&&(e.xp6(18),e.Q6J("dataSource",n.generalActivitiesSource),e.xp6(10),e.Q6J("matHeaderRowDef",n.displayedColumns),e.xp6(1),e.Q6J("matRowDefColumns",n.displayedColumns),e.xp6(15),e.Q6J("ngForOf",n.specificActivities))},directives:[w.d,_.lW,E.Hw,l.BZ,l.w1,l.fO,l.Dz,l.as,l.nj,Z.pp,u.sg,l.ge,l.ev,l.XQ,l.Gk,Z.ib,Z.yz,Z.yK,Z.u4],pipes:[u.uU],styles:[".mat-form-field[_ngcontent-%COMP%] + .mat-form-field[_ngcontent-%COMP%]{margin-left:8px}.w-100[_ngcontent-%COMP%]{width:100%}table[_ngcontent-%COMP%]{width:100%}"]}),t})()},{path:"users",loadChildren:()=>a.e(364).then(a.bind(a,8364)).then(t=>t.UsersModule)}];let L=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[A.Bz.forChild(B)],A.Bz]}),t})();var $=a(37);let z=(()=>{class t{}return t.\u0275fac=function(i){return new(i||t)},t.\u0275mod=e.oAB({type:t}),t.\u0275inj=e.cJS({imports:[[u.ez,L,$.m]]}),t})()},4109:(y,h,a)=>{a.d(h,{M:()=>l});var u=a(1841),A=a(2340),v=a(7716);let l=(()=>{class m{constructor(o){this.http=o}createActivity(o){return this.http.post(`${A.N.API_URL}/activities`,o)}getActivities(o){const e={params:(new u.LE).set("specific",!!o)};return this.http.get(`${A.N.API_URL}/activities`,e)}assignActivity(o){return this.http.patch(`${A.N.API_URL}/activities/${o.activity_id}`,o)}}return m.\u0275fac=function(o){return new(o||m)(v.LFG(u.eN))},m.\u0275prov=v.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),m})()},9525:(y,h,a)=>{a.d(h,{K:()=>l});var u=a(2340),A=a(7716),v=a(1841);let l=(()=>{class m{constructor(o){this.http=o}getAllUsers(){return this.http.get(`${u.N.API_URL}/users`)}createUser(o){return this.http.post(`${u.N.API_URL}/users`,o)}getUserById(o){return this.http.get(`${u.N.API_URL}/users/${o}`)}}return m.\u0275fac=function(o){return new(o||m)(A.LFG(v.eN))},m.\u0275prov=A.Yz7({token:m,factory:m.\u0275fac,providedIn:"root"}),m})()}}]);