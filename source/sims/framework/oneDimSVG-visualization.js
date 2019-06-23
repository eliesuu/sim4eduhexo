var svg={NS:"http://www.w3.org/2000/svg",XLINK_NS:"http://www.w3.org/1999/xlink",createSVG:function(e){var t=document.createElementNS(svg.NS,"svg");return t.setAttribute("version","1.1"),e.id&&(t.id=e.id),e.class&&(t.class=e.class),e.width&&t.setAttribute("width",e.width),e.height&&t.setAttribute("height",e.height),e.viewBox&&t.setAttribute("viewBox",e.viewBox),t},createDefs:function(){return document.createElementNS(svg.NS,"defs")},setOptionalAttr:function(e,t){void 0===t&&(t={}),t.id&&(e.id=t.id),t.class&&(e.class=t.class),e.setAttribute("stroke",t.stroke||"black"),e.setAttribute("stroke-width",t.strokeWidth||"1"),e.setAttribute("fill",t.fill||"white")},createRect:function(e,t,i,s,r){var n=document.createElementNS(svg.NS,"rect");return n.setAttribute("x",e),n.setAttribute("y",t),n.setAttribute("width",i),n.setAttribute("height",s),svg.setOptionalAttr(n,r),n},createCircle:function(e,t,i,s){var r=document.createElementNS(svg.NS,"circle");return r.setAttribute("cx",e),r.setAttribute("cy",t),r.setAttribute("r",i),svg.setOptionalAttr(r,s),r},createLine:function(e,t,i,s,r){var n=document.createElementNS(svg.NS,"line");return n.setAttribute("x1",e),n.setAttribute("y1",t),n.setAttribute("x2",i),n.setAttribute("y2",s),svg.setOptionalAttr(n,r),n},createPath:function(e,t){var i=document.createElementNS(svg.NS,"path");return i.setAttribute("d",e),svg.setOptionalAttr(i,t),i},createGroup:function(e){var t=document.createElementNS(svg.NS,"g");return svg.setOptionalAttr(t,e),t},createText:function(e,t,i,s){var r=document.createElementNS(svg.NS,"text");return r.textContent=i,r.setAttribute("x",e),r.setAttribute("y",t),s&&(r.style=s),r},createShape:function(e,t,i,s){var r=document.createElementNS(svg.NS,e);return Object.keys(t).forEach(function(e){var i;i="function"==typeof t[e]?t[e](s):t[e],r.setAttribute(e,i)}),i&&r.setAttribute("style",i),r},createShapeFromDefRec:function(e,t){var i=document.createElementNS(svg.NS,e.shapeName),s=e.shapeAttributes;return Object.keys(s).forEach(function(e){var r;switch(r="function"==typeof s[e]?s[e](t):s[e],e){case"textContent":i.textContent=r;break;case"file":i.setAttributeNS(svg.XLINK_NS,"href",r);break;default:i.setAttribute(e,r)}}),e.style&&i.setAttribute("style",e.style),i},createImageFillPattern:function(e,t,i){var s=document.createElementNS(svg.NS,"pattern"),r=document.createElementNS(svg.NS,"image");return i||(i={}),r.setAttributeNS(svg.XLINK_NS,"href",t),r.setAttribute("width",i.width||20),r.setAttribute("height",i.height||20),s.appendChild(r),s.id=e,s.setAttribute("patternUnits","userSpaceOnUse"),s.setAttribute("width",i.width||20),s.setAttribute("height",i.height||20),i.x&&s.setAttribute("x",i.x),i.y&&s.setAttribute("y",i.y),s}},oes=oes||{};oes.ui=oes.ui||{},oes.ui.space=oes.ui.space||{},oes.ui.space.oneDim={SVG:{objectViewDefaultSize:10,objectViewDefaultColors:["blue","green","yellow","red"]}},oes.ui.space.oneDim.SVG.convertPos2SvgCoordinates=function(e){var t=e%sim.spaceView.circumference/sim.spaceView.r,i=sim.spaceView.r*Math.cos(t),s=sim.spaceView.r*Math.sin(t);return[i+sim.spaceView.cx,sim.spaceView.cy-s]},oes.ui.space.oneDim.SVG.renderInitialObjectView=function(e){var t=this.convertPos2SvgCoordinates(e.pos[0]),i=this.objectViewDefaultColors[e.id-1],s=this.objectViewDefaultSize;sim.objectViews[String(e.id)]=svg.createCircle(t[0],t[1],s,{fill:i}),sim.visualEl.appendChild(sim.objectViews[String(e.id)])},oes.ui.space.oneDim.SVG.updateObjectView=function(e){var t=this.convertPos2SvgCoordinates(e.pos[0]);sim.objectViews[String(e.id)].setAttribute("cx",t[0]),sim.objectViews[String(e.id)].setAttribute("cy",t[1])},oes.ui.space.oneDim.SVG.setup=function(e){var t=null,i=0,s=null,r=0;t=e||document.body,sim.config.observationUI&&sim.config.observationUI.spaceView&&(sim.config.observationUI.spaceView.trackDiameter?i=sim.config.observationUI.spaceView.trackDiameter:(s=getComputedStyle(t,null),i=Math.floor(parseInt(s.getPropertyValue("width"))/2))),r=Math.floor(i/2),sim.spaceView={cx:r+50,cy:r+20,r:r},sim.spaceView.circumference=2*Math.PI*sim.spaceView.r,sim.visualEl=svg.createSVG({width:i+100,height:i+50}),sim.visualEl.appendChild(svg.createCircle(sim.spaceView.cx,sim.spaceView.cy,sim.spaceView.r,{stroke:"lightgrey",strokeWidth:"20"})),t.appendChild(sim.visualEl),Object.keys(ObjectInOneDimSpace.instances).forEach(function(e){var t=ObjectInOneDimSpace.instances[e];oes.ui.space.oneDim.SVG.renderInitialObjectView(t)})},oes.ui.space.oneDim.SVG.reset=function(){},oes.ui.space.oneDim.SVG.renderSimState=function(){var e=Object.keys(ObjectInOneDimSpace.instances),t=0,i=null,s="";for(t=0;t<e.length;t++)s=e[t],i=ObjectInOneDimSpace.instances[s],oes.ui.space.oneDim.SVG.updateObjectView(i)};