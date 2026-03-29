"use client";

import { useEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/Button";
import { BowlerMascot } from "@/components/mascot/BowlerMascot";
import { ArrowRight } from "lucide-react";

const CIRCUIT_SCRIPT = `
(function(){
  var c=document.getElementById('circuit-canvas');
  if(!c)return;
  var ctx=c.getContext('2d');
  if(!ctx)return;
  var parent=c.parentElement;
  var mx=-500,my=-500,pmx=-500,pmy=-500;
  var segs=[],pads=[],vias=[],chips=[],pulses=[],sparks=[],ripples=[];
  var CY='0,255,213';var VIO='14,116,144';var NEON='0,255,136';
  var time=0;

  function resize(){
    var dpr=Math.min(devicePixelRatio||1,2);
    var r=parent.getBoundingClientRect();
    c.width=r.width*dpr;c.height=r.height*dpr;
    c.style.width=r.width+'px';c.style.height=r.height+'px';
    ctx.setTransform(dpr,0,0,dpr,0,0);
    build(r.width,r.height);
  }

  function build(w,h){
    segs=[];pads=[];vias=[];chips=[];pulses=[];
    var step=90;
    var cols=Math.ceil(w/step)+2, rows=Math.ceil(h/step)+2;
    var grid=[];
    for(var r=0;r<rows;r++){
      grid[r]=[];
      for(var cc=0;cc<cols;cc++){
        grid[r][cc]={x:cc*step, y:r*step};
      }
    }
    for(var r=0;r<rows;r++){
      for(var cc=0;cc<cols;cc++){
        var n=grid[r][cc];
        if(Math.random()>.4 && cc<cols-1){
          var span=1+Math.floor(Math.random()*3);
          var endC=Math.min(cc+span,cols-1);
          var endN=grid[r][endC];
          var tw=Math.random()>.6?2:1;
          segs.push({pts:[{x:n.x,y:n.y},{x:endN.x,y:n.y}],w:tw});
          if(Math.random()>.5 && r<rows-1){
            var dropR=Math.min(r+1+Math.floor(Math.random()*2),rows-1);
            var dropN=grid[dropR][endC];
            segs.push({pts:[{x:endN.x,y:n.y},{x:endN.x,y:dropN.y}],w:tw});
            pads.push({x:endN.x,y:n.y,r:3.5});
            if(Math.random()>.5 && endC<cols-2){
              var ext=Math.min(endC+1+Math.floor(Math.random()*2),cols-1);
              segs.push({pts:[{x:endN.x,y:dropN.y},{x:grid[dropR][ext].x,y:dropN.y}],w:tw});
              pads.push({x:endN.x,y:dropN.y,r:3.5});
            }
          }
        }
        if(Math.random()>.82) vias.push({x:n.x,y:n.y,r:4,ir:1.5});
        if(Math.random()>.75) pads.push({x:n.x,y:n.y,r:Math.random()>.5?4:3});
      }
    }
    for(var i=0;i<Math.floor(w*h/120000);i++){
      var cw=30+Math.random()*40, ch=15+Math.random()*25;
      chips.push({x:50+Math.random()*(w-100),y:50+Math.random()*(h-100),w:cw,h:ch,pins:Math.floor(cw/8)});
    }
    for(var j=0;j<40;j++) spawnPulse();
  }

  function spawnPulse(){
    if(!segs.length)return;
    var s=segs[Math.floor(Math.random()*segs.length)];
    if(!s||s.pts.length<2)return;
    var p0=s.pts[0],p1=s.pts[s.pts.length-1];
    var fwd=Math.random()>.5;
    var sx=fwd?p0.x:p1.x, sy=fwd?p0.y:p1.y;
    var ex=fwd?p1.x:p0.x, ey=fwd?p1.y:p0.y;
    var dx=ex-sx,dy=ey-sy,len=Math.sqrt(dx*dx+dy*dy);
    if(len<5)return;
    var sp=.5+Math.random()*1;
    pulses.push({x:sx,y:sy,vx:dx/len*sp,vy:dy/len*sp,life:len/sp});
  }

  function dist(ax,ay,bx,by){return Math.sqrt((ax-bx)*(ax-bx)+(ay-by)*(ay-by));}
  function prox(x,y){var d=dist(x,y,mx,my);return Math.max(0,1-d/300);}

  function draw(){
    var r=parent.getBoundingClientRect(),w=r.width,h=r.height;
    ctx.clearRect(0,0,w,h);
    ctx.lineCap='round';ctx.lineJoin='round';
    time+=0.016;

    for(var i=0;i<segs.length;i++){
      var s=segs[i];if(s.pts.length<2)continue;
      var midx=0,midy=0;
      for(var j=0;j<s.pts.length;j++){midx+=s.pts[j].x;midy+=s.pts[j].y;}
      midx/=s.pts.length;midy/=s.pts.length;
      var p=prox(midx,midy),a=.05+p*.22;
      ctx.beginPath();ctx.moveTo(s.pts[0].x,s.pts[0].y);
      for(var j=1;j<s.pts.length;j++) ctx.lineTo(s.pts[j].x,s.pts[j].y);
      ctx.strokeStyle='rgba('+CY+','+a+')';ctx.lineWidth=s.w;ctx.stroke();
    }

    for(var i=0;i<pads.length;i++){
      var pd=pads[i],p=prox(pd.x,pd.y),a=.08+p*.4;
      ctx.beginPath();ctx.arc(pd.x,pd.y,pd.r,0,6.28);
      ctx.strokeStyle='rgba('+CY+','+a+')';ctx.lineWidth=1.2;ctx.stroke();
      ctx.beginPath();ctx.arc(pd.x,pd.y,pd.r*.5,0,6.28);
      ctx.fillStyle='rgba('+CY+','+(a*.6)+')';ctx.fill();
    }

    for(var i=0;i<vias.length;i++){
      var v=vias[i],p=prox(v.x,v.y),a=.1+p*.5;
      ctx.beginPath();ctx.arc(v.x,v.y,v.r,0,6.28);
      ctx.strokeStyle='rgba('+CY+','+a+')';ctx.lineWidth=1.5;ctx.stroke();
      ctx.beginPath();ctx.arc(v.x,v.y,v.ir,0,6.28);
      ctx.fillStyle='rgba(5,5,8,'+(0.8+p*.2)+')';ctx.fill();
      ctx.strokeStyle='rgba('+CY+','+(a*.7)+')';ctx.lineWidth=.8;ctx.stroke();
    }

    for(var i=0;i<chips.length;i++){
      var ch=chips[i],p=prox(ch.x+ch.w/2,ch.y+ch.h/2),a=.06+p*.2;
      ctx.strokeStyle='rgba('+CY+','+a+')';ctx.lineWidth=1;
      ctx.strokeRect(ch.x,ch.y,ch.w,ch.h);
      ctx.beginPath();ctx.arc(ch.x+4,ch.y+ch.h/2,2,0,6.28);
      ctx.strokeStyle='rgba('+CY+','+(a*.8)+')';ctx.stroke();
      var pinStep=ch.w/ch.pins;
      for(var j=0;j<ch.pins;j++){
        var px=ch.x+pinStep*j+pinStep/2;
        ctx.beginPath();ctx.moveTo(px,ch.y);ctx.lineTo(px,ch.y-5);
        ctx.strokeStyle='rgba('+CY+','+(a*.7)+')';ctx.lineWidth=1;ctx.stroke();
        ctx.beginPath();ctx.moveTo(px,ch.y+ch.h);ctx.lineTo(px,ch.y+ch.h+5);ctx.stroke();
      }
    }

    for(var i=pulses.length-1;i>=0;i--){
      var p=pulses[i];p.x+=p.vx;p.y+=p.vy;p.life-=1;
      var d=dist(p.x,p.y,mx,my);if(d<200){p.vx*=1.03;p.vy*=1.03;}
      ctx.save();ctx.shadowColor='rgba('+CY+',.9)';ctx.shadowBlur=18;
      ctx.beginPath();ctx.arc(p.x,p.y,2.5,0,6.28);
      ctx.fillStyle='rgba('+CY+',.85)';ctx.fill();ctx.restore();
      ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(p.x-p.vx*10,p.y-p.vy*10);
      ctx.strokeStyle='rgba('+CY+',.25)';ctx.lineWidth=2;ctx.stroke();
      if(p.life<=0){pulses.splice(i,1);spawnPulse();}
    }

    if(mx>0&&my>0){
      var grad=ctx.createRadialGradient(mx,my,0,mx,my,250);
      grad.addColorStop(0,'rgba('+CY+',.06)');
      grad.addColorStop(0.4,'rgba('+VIO+',.02)');
      grad.addColorStop(1,'rgba(0,0,0,0)');
      ctx.fillStyle=grad;ctx.fillRect(mx-250,my-250,500,500);
    }

    var mSpeed=dist(mx,my,pmx,pmy);
    if(mSpeed>8&&mx>0){
      for(var si=0;si<Math.min(Math.floor(mSpeed/4),5);si++){
        var ang=Math.random()*6.28,spd=1+Math.random()*3;
        sparks.push({x:mx,y:my,vx:Math.cos(ang)*spd,vy:Math.sin(ang)*spd,life:30+Math.random()*20,maxLife:50,
          col:Math.random()>.6?NEON:(Math.random()>.5?VIO:CY)});
      }
    }
    pmx=mx;pmy=my;

    for(var si=sparks.length-1;si>=0;si--){
      var sp=sparks[si];sp.x+=sp.vx;sp.y+=sp.vy;sp.vx*=.96;sp.vy*=.96;sp.life-=1;
      var sa=sp.life/sp.maxLife,sz=1+sa*2;
      ctx.save();ctx.shadowColor='rgba('+sp.col+',.8)';ctx.shadowBlur=8;
      ctx.beginPath();ctx.arc(sp.x,sp.y,sz,0,6.28);
      ctx.fillStyle='rgba('+sp.col+','+sa+')';ctx.fill();ctx.restore();
      if(sp.life<=0)sparks.splice(si,1);
    }

    if(Math.random()>.985&&pads.length){
      var rp=pads[Math.floor(Math.random()*pads.length)];
      ripples.push({x:rp.x,y:rp.y,radius:0,maxRadius:120+Math.random()*80,speed:1.5+Math.random(),life:1});
    }
    for(var ri=ripples.length-1;ri>=0;ri--){
      var rr=ripples[ri];rr.radius+=rr.speed;rr.life=1-rr.radius/rr.maxRadius;
      if(rr.life<=0){ripples.splice(ri,1);continue;}
      ctx.beginPath();ctx.arc(rr.x,rr.y,rr.radius,0,6.28);
      ctx.strokeStyle='rgba('+CY+','+(rr.life*.3)+')';ctx.lineWidth=1.5;ctx.stroke();
    }

    var scanY=(time*40)%(h+200)-100;
    ctx.beginPath();ctx.moveTo(0,scanY);ctx.lineTo(w,scanY);
    ctx.strokeStyle='rgba('+CY+',.04)';ctx.lineWidth=60;ctx.stroke();
    ctx.strokeStyle='rgba('+CY+',.08)';ctx.lineWidth=1;ctx.stroke();

    var hud=12,ha=.15+Math.sin(time*2)*.05;
    ctx.strokeStyle='rgba('+CY+','+ha+')';ctx.lineWidth=1;
    ctx.beginPath();ctx.moveTo(20,20+hud);ctx.lineTo(20,20);ctx.lineTo(20+hud,20);ctx.stroke();
    ctx.beginPath();ctx.moveTo(w-20-hud,20);ctx.lineTo(w-20,20);ctx.lineTo(w-20,20+hud);ctx.stroke();
    ctx.beginPath();ctx.moveTo(20,h-20-hud);ctx.lineTo(20,h-20);ctx.lineTo(20+hud,h-20);ctx.stroke();
    ctx.beginPath();ctx.moveTo(w-20-hud,h-20);ctx.lineTo(w-20,h-20);ctx.lineTo(w-20,h-20-hud);ctx.stroke();

    requestAnimationFrame(draw);
  }

  c.addEventListener('click',function(e){
    var r=c.getBoundingClientRect();var cx=e.clientX-r.left,cy=e.clientY-r.top;
    ripples.push({x:cx,y:cy,radius:0,maxRadius:200,speed:3,life:1});
    for(var i=0;i<20;i++){
      var ang=Math.random()*6.28,spd=2+Math.random()*5;
      sparks.push({x:cx,y:cy,vx:Math.cos(ang)*spd,vy:Math.sin(ang)*spd,life:40+Math.random()*30,maxLife:70,
        col:i%3==0?NEON:(i%3==1?VIO:CY)});
    }
  });

  window.addEventListener('mousemove',function(e){var r=c.getBoundingClientRect();mx=e.clientX-r.left;my=e.clientY-r.top;});
  window.addEventListener('resize',resize);
  resize();
  requestAnimationFrame(draw);
})();
`;

export function HeroSection() {
  const t = useTranslations("home.hero");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;
    const script = document.createElement("script");
    script.textContent = CIRCUIT_SCRIPT;
    document.head.appendChild(script);
    return () => {
      try { script.remove(); } catch {}
    };
  }, []);

  return (
    <>
      {/* ── HERO ── */}
      <section className="relative flex min-h-screen items-center overflow-hidden bg-background">
        <canvas ref={canvasRef} id="circuit-canvas" className="absolute inset-0 z-0 cursor-crosshair" />

        {/* Ambient glow */}
        <div className="pointer-events-none absolute -left-40 -top-40 z-[1] h-[600px] w-[600px] rounded-full bg-cyber-cyan/[0.08] blur-[120px] animate-float" />
        <div className="pointer-events-none absolute -right-32 top-1/3 z-[1] h-[400px] w-[400px] rounded-full bg-cyber-cyan/[0.05] blur-[100px] animate-float" style={{ animationDelay: "3s" }} />

        <div className="relative z-10 mx-auto w-full max-w-7xl px-6 py-32 lg:py-40">
          {/* Eyebrow */}
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyber-cyan/70 md:text-sm">
            {"// "}{t("eyebrow")}
          </p>

          {/* Big name */}
          <h1 className="mt-6 text-[clamp(3.5rem,10vw,8rem)] font-bold leading-[0.95] tracking-tight">
            <span className="text-txt-primary/25">Mark </span>
            <span className="bg-gradient-to-r from-txt-primary/50 via-cyber-cyan to-cyber-cyan bg-clip-text text-transparent">
              Systems
            </span>
          </h1>

          {/* Description paragraph — style image 1 */}
          <p className="mt-8 max-w-xl text-base leading-relaxed text-txt-secondary md:text-lg">
            {t("description")}
          </p>

          {/* CTAs — filled + outline style */}
          <div className="mt-10 flex flex-wrap gap-4">
            <Button href="/services" size="lg">
              {t("ctaServices")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button href="/brief" size="lg" variant="secondary">
              {t("ctaPrimary")}
            </Button>
          </div>

          {/* Bowler mascot */}
          <div className="mt-10 flex items-center gap-4">
            <BowlerMascot mood="waving" size="lg" message={t("ctaSecondary")} showBubbleOnHover />
          </div>

          {/* Stats strip */}
          <div className="mt-12 flex flex-wrap gap-10 border-t border-white/[0.06] pt-8">
            {(["agents", "score", "sites", "workflows"] as const).map((key) => (
              <div key={key}>
                <span className="block font-mono text-3xl font-bold text-cyber-cyan text-glow-cyan">
                  {t(`stats.${key}.value`)}
                </span>
                <span className="block font-mono text-[10px] uppercase tracking-[0.2em] text-txt-secondary">
                  {t(`stats.${key}.label`)}
                </span>
                <span className="block font-mono text-[9px] uppercase tracking-[0.15em] text-txt-tertiary">
                  {t(`stats.${key}.sub`)}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRIDGE SECTION ── */}
      <section className="relative border-t border-white/[0.06] bg-background py-20 md:py-28">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <p className="font-mono text-xs uppercase tracking-[0.35em] text-cyber-cyan/70">
            {"// "}{t("bridge.eyebrow")}
          </p>
          <h2 className="mt-4 text-[clamp(1.75rem,4vw,3rem)] font-bold leading-tight text-txt-primary">
            {t("bridge.title")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-txt-secondary">
            {t("bridge.description")}
          </p>
        </div>
      </section>
    </>
  );
}
