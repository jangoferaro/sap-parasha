const assert=require('node:assert/strict'),p=require('./dist/pp-model.js');
const s=p.fresh();
function rejected(fn,code){const before=JSON.stringify(s);assert.throws(fn,new RegExp(code));assert.equal(JSON.stringify(s),before)}
rejected(()=>p.create(s,0,'2026-10-28'),'quantity');
rejected(()=>p.create(s,1,'2026-02-31'),'date');
const o=p.create(s,2,'2026-10-28');
rejected(()=>p.release(s,o.id),'shortage');
p.change(s,o.id,1,'2026-10-28');
rejected(()=>p.confirm(s,o.id,1,true),'notReleased');
p.release(s,o.id);assert.equal(p.status(o),'REL');
const other=p.create(s,1,'2026-10-28');rejected(()=>p.release(s,other.id),'shortage');
rejected(()=>p.change(s,o.id,2,'2026-10-28'),'locked');
p.confirm(s,o.id,.5,false);assert.equal(p.status(o),'REL PCNF');assert.equal(s.stock,1.5);assert.equal(s.product,.5);
rejected(()=>p.confirm(s,o.id,1,true),'overdelivery');
p.confirm(s,o.id,.5,true);assert.equal(p.status(o),'REL CNF DLV');assert.equal(s.stock,0);assert.equal(s.product,1);assert.equal(s.movements.length,4);assert.equal(s.movements[0].doc,s.movements[1].doc);
rejected(()=>p.confirm(s,o.id,.1,true),'final');
const t=p.fresh(),a=p.create(t,1,'2026-10-28');p.release(t,a.id);p.confirm(t,a.id,.5,true);assert.equal(p.status(a),'REL CNF');const b=p.create(t,.5,'2026-10-28');p.release(t,b.id);p.confirm(t,b.id,.5,true);assert.equal(t.stock,0);
console.log('PP lifecycle, atomic errors, reservations, partial/final confirmations and material documents: passed');
