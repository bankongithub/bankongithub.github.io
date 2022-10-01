import{U as m,R as _,h as b,o as r,c,b as d,r as o,a as p,j as g,n as h,e as y,w as x,v,q as w,t as u}from"./index.9d761b97.js";var C={name:"Fieldset",emits:["update:collapsed","toggle"],props:{legend:String,toggleable:Boolean,collapsed:Boolean,toggleButtonProps:String},data(){return{d_collapsed:this.collapsed}},watch:{collapsed(e){this.d_collapsed=e}},methods:{toggle(e){this.d_collapsed=!this.d_collapsed,this.$emit("update:collapsed",this.d_collapsed),this.$emit("toggle",{originalEvent:e,value:this.d_collapsed})},onKeyDown(e){(e.code==="Enter"||e.code==="Space")&&(this.toggle(e),e.preventDefault())}},computed:{iconClass(){return["p-fieldset-toggler pi ",{"pi-minus":!this.d_collapsed,"pi-plus":this.d_collapsed}]},ariaId(){return m()}},directives:{ripple:_}};const k={class:"p-fieldset-legend"},B=["id"],I=["id","aria-controls","aria-expanded","aria-label"],S={class:"p-fieldset-legend-text"},D=["id","aria-labelledby"],E={class:"p-fieldset-content"};function N(e,a,n,s,t,l){const f=b("ripple");return r(),c("fieldset",{class:h(["p-fieldset p-component",{"p-fieldset-toggleable":n.toggleable}])},[d("legend",k,[n.toggleable?p("",!0):o(e.$slots,"legend",{key:0},()=>[d("span",{id:l.ariaId+"_header",class:"p-fieldset-legend-text"},u(n.legend),9,B)]),n.toggleable?g((r(),c("a",{key:1,id:l.ariaId+"_header",tabindex:"0",role:"button","aria-controls":l.ariaId+"_content","aria-expanded":!t.d_collapsed,"aria-label":n.toggleButtonProps||n.legend,onClick:a[0]||(a[0]=(...i)=>l.toggle&&l.toggle(...i)),onKeydown:a[1]||(a[1]=(...i)=>l.onKeyDown&&l.onKeyDown(...i))},[d("span",{class:h(l.iconClass)},null,2),o(e.$slots,"legend",{},()=>[d("span",S,u(n.legend),1)])],40,I)),[[f]]):p("",!0)]),y(w,{name:"p-toggleable-content"},{default:x(()=>[g(d("div",{id:l.ariaId+"_content",class:"p-toggleable-content",role:"region","aria-labelledby":l.ariaId+"_header"},[d("div",E,[o(e.$slots,"default")])],8,D),[[v,!t.d_collapsed]])]),_:3})],2)}function K(e,a){a===void 0&&(a={});var n=a.insertAt;if(!(!e||typeof document=="undefined")){var s=document.head||document.getElementsByTagName("head")[0],t=document.createElement("style");t.type="text/css",n==="top"&&s.firstChild?s.insertBefore(t,s.firstChild):s.appendChild(t),t.styleSheet?t.styleSheet.cssText=e:t.appendChild(document.createTextNode(e))}}var T=`
.p-fieldset-legend > a,
.p-fieldset-legend > span {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
        -ms-flex-align: center;
            align-items: center;
    -webkit-box-pack: center;
        -ms-flex-pack: center;
            justify-content: center;
}
.p-fieldset-toggleable .p-fieldset-legend a {
    cursor: pointer;
    -webkit-user-select: none;
       -moz-user-select: none;
        -ms-user-select: none;
            user-select: none;
    overflow: hidden;
    position: relative;
    text-decoration: none;
}
.p-fieldset-legend-text {
    line-height: 1;
}
`;K(T);C.render=N;export{C as s};
