(function(root){'use strict';
const round=n=>Math.round(n*1000000)/1000000;
function today(){const d=new Date();return [d.getFullYear(),String(d.getMonth()+1).padStart(2,'0'),String(d.getDate()).padStart(2,'0')].join('-')}
function fresh(){return{version:1,seq:0,stock:3,product:0,orders:[],confirmations:[],movements:[],changes:[]};}
function fail(code){throw Error(code);}
function qty(value){const n=Number(value);if(!Number.isFinite(n)||n<=0||n>999999||Math.abs(n*1000-Math.round(n*1000))>1e-7)fail('quantity');return n;}
function id(s,prefix){return prefix+String(++s.seq).padStart(8,'0');}
function order(s,key){const o=s.orders.find(o=>o.id===key);if(!o)fail('order');return o;}
function log(s,type,ref){s.changes.push({type,ref,user:'GOD',at:new Date().toISOString()});}
function create(s,value,date){const amount=qty(value);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||(!Number.isFinite(Date.parse(date+'T00:00:00Z'))||new Date(date+'T00:00:00Z').toISOString().slice(0,10)!==date))fail('date');const o={id:id(s,'10'),qty:amount,date,material:'Z_UGOT',plant:'MAM1',released:false,confirmed:0,final:false};s.orders.push(o);log(s,'CREATE',o.id);return o;}
function change(s,key,value,date){const o=order(s,key);if(o.released)fail('locked');const amount=qty(value);if(!/^\d{4}-\d{2}-\d{2}$/.test(date)||(!Number.isFinite(Date.parse(date+'T00:00:00Z'))||new Date(date+'T00:00:00Z').toISOString().slice(0,10)!==date))fail('date');o.qty=amount;o.date=date;log(s,'CHANGE',o.id);return o;}
function freeStock(s,key){const reserved=s.orders.filter(o=>o.id!==key&&o.released&&!o.final).reduce((n,o)=>n+3*(o.qty-o.confirmed),0);return Math.max(0,round(s.stock-reserved));}
function available(s,key){const o=order(s,key);return freeStock(s,key)+1e-8>=round(3*(o.qty-o.confirmed));}
function release(s,key){const o=order(s,key);if(o.released)fail('released');if(!available(s,key))fail('shortage');o.released=true;log(s,'RELEASE',o.id);return o;}
function confirm(s,key,value,final){const o=order(s,key);if(!o.released)fail('notReleased');if(o.final)fail('final');const amount=qty(value),total=round(o.confirmed+amount),consumed=round(amount*3);if(total>o.qty)fail('overdelivery');if(consumed>freeStock(s,key)+1e-8)fail('stock');const c={id:id(s,'20'),order:key,operation:'0010',yield:amount,final:!!final,user:'GOD',date:today()};const doc=id(s,'50');s.confirmations.push(c);s.movements.push({doc,item:'1',year:c.date.slice(0,4),date:c.date,type:'261',material:'Z_FLOUR',qty:-consumed,unit:'SEA',plant:'MAM1',sloc:'0001',order:key,confirmation:c.id},{doc,item:'2',year:c.date.slice(0,4),date:c.date,type:'101',material:'Z_UGOT',qty:amount,unit:'LOT',plant:'MAM1',sloc:'0001',order:key,confirmation:c.id});o.confirmed=total;o.final=!!final;s.stock=round(s.stock-consumed);s.product=round(s.product+amount);log(s,'CONFIRM',c.id);return c;}
function status(o){return !o.released?'CRTD':['REL',...(o.final?['CNF']:o.confirmed?['PCNF']:[]),...(o.confirmed===o.qty?['DLV']:[])].join(' ');}
const api={today,fresh,create,change,order,freeStock,available,release,confirm,status};root.PP=api;if(typeof module!=='undefined')module.exports=api;
})(typeof window!=='undefined'?window:globalThis);
