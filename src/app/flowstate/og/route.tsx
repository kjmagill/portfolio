import { ImageResponse } from "next/og";
export const dynamic = "force-static";
export function GET() {
  return new ImageResponse(<div style={{ width:"100%", height:"100%", display:"flex", flexDirection:"column", background:"#101310", color:"#eceee3", padding:"60px 70px", position:"relative" }}>
    <div style={{ display:"flex", fontSize:34, letterSpacing:-1 }}>flowstate labs</div>
    <div style={{ position:"absolute", right:-100, top:0, width:650, height:650, border:"1px solid #596b44", borderRadius:"50%", display:"flex", alignItems:"center", justifyContent:"center" }}><div style={{ width:530,height:530,border:"1px solid #445437",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center" }}><div style={{width:400,height:400,border:"1px solid #39482e",borderRadius:"50%"}} /></div></div>
    <div style={{ display:"flex", flexDirection:"column", marginTop:74,fontSize:88,letterSpacing:-5,lineHeight:1.05 }}><span>Find the flow.</span><span style={{color:"#d3ed98"}}>Build what’s next.</span></div>
    <div style={{display:"flex",fontSize:25,color:"#a5ad9f",marginTop:"auto"}}>Independent software &amp; product studio</div>
  </div>, {width:1200,height:630});
}
