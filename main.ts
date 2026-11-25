import{mkdirSync,readdirSync,readFileSync,writeFileSync}from'node:fs';import{join}from'node:path';
const ops=new Set([0,1,2,3,4,5,6,7,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,32,33,34,48,49,50,51,52,64,65,80,81,82,83]);
function run(p,i){let d=new Int32Array(256),s=0,c=new Int32Array(64),q=0,m=new Int32Array(256),o=new Uint8Array(65536),z=0,x=0,pc=0,n=0,e=0;
 let end=a=>[o.subarray(0,z),a],pop=k=>{if(s<k){e=2;return 1}},push=k=>{if(s+k>256){e=3;return 1}};
 for(;;){if(n==1e6)return end(10);if(pc<0||pc>=p.length)return end(9);let a=p[pc],l=a==1?1:a==2?4:a>=48&&a<=51?2:0;
  if(!ops.has(a))return end(5);
  if(pc+l>=p.length)return end(9);n++;let t=pc+1+l;pc=t;
  if(a==0)return end(0);
  if(a==1){if(push(1))return end(e);d[s++]=(p[t-1]<<24)>>24;continue}
  if(a==2){if(push(1))return end(e);d[s++]=p[t-4]|p[t-3]<<8|p[t-2]<<16|p[t-1]<<24;continue}
  if(a==3){if(pop(1))return end(e);s--;continue}
  if(a==4){if(pop(1))return end(e);if(push(1))return end(e);d[s]=d[s-1];s++;continue}
  if(a==5){if(pop(2))return end(e);let v=d[s-1];d[s-1]=d[s-2];d[s-2]=v;continue}
  if(a==6){if(pop(2))return end(e);if(push(1))return end(e);d[s]=d[s-2];s++;continue}
  if(a==7){if(pop(3))return end(e);let v=d[s-3];d[s-3]=d[s-2];d[s-2]=d[s-1];d[s-1]=v;continue}
  if(a==23||a==27){if(pop(1))return end(e);d[s-1]=a==23?-d[s-1]:~d[s-1];continue}
  if(a>=16&&a<=34){if(pop(2))return end(e);let b=d[s-1],v=d[s-2],r;
   if(a==16)r=v+b;else if(a==17)r=v-b;else if(a==18)r=Math.imul(v,b);else if(a>=19&&a<=22){if(!b)return end(4);if(a==19)r=v==-2147483648&&b==-1?v:v/b;else if(a==20)r=b==-1?0:v%b;else if(a==21)r=Math.floor((v>>>0)/(b>>>0));else r=(v>>>0)%(b>>>0)}else if(a==24)r=v&b;else if(a==25)r=v|b;else if(a==26)r=v^b;else if(a==28)r=v<<(b&31);else if(a==29)r=v>>(b&31);else if(a==30)r=v>>>(b&31);else if(a==32)r=v==b?1:0;else if(a==33)r=v<b?1:0;else r=(v>>>0)<(b>>>0)?1:0;
   d[s-=2]=r;d[s++]|=0;continue}
  if(a>=48&&a<=50){if(a>48&&pop(1))return end(e);let r=(p[t-2]|p[t-1]<<8)<<16>>16,v=a==48?1:d[--s];if(a==48||a==49&&v==0||a==50&&v!=0)pc=t+r;continue}
  if(a==51){if(q==64)return end(7);c[q++]=t;pc=p[t-2]|p[t-1]<<8;continue}
  if(a==52){if(!q)return end(8);pc=c[--q];continue}
  if(a==64){if(pop(1))return end(e);let v=d[s-1];if(v<0||v>255)return end(6);d[s-1]=m[v];continue}
  if(a==65){if(pop(2))return end(e);let v=d[s-1];if(v<0||v>255)return end(6);m[v]=d[s-2];s-=2;continue}
  if(a==80){if(pop(1))return end(e);let b=Buffer.from(String(d[s-1]));if(z+b.length>65536)return end(11);s--;o.set(b,z);z+=b.length;continue}
  if(a==81){if(pop(1))return end(e);if(z==65536)return end(11);o[z++]=d[--s]&255;continue}
  if(a==82){if(push(1))return end(e);d[s++]=x<i.length?i[x++]:-1;continue}
  if(a==83){if(pop(1))return end(e);return end(d[--s]&255)}
 }}
let I=process.env.MAKEFUN_INPUT_DIR??'/input',O=process.env.MAKEFUN_OUTPUT_DIR??'/output';for(let id of readdirSync(I).sort()){let b=join(I,id),r=run(readFileSync(join(b,'program.bin')),readFileSync(join(b,'input.bin'))),w=join(O,id);mkdirSync(w,{recursive:true});writeFileSync(join(w,'stdout.bin'),r[0]);writeFileSync(join(w,'exit.txt'),r[1]+'\n')}
