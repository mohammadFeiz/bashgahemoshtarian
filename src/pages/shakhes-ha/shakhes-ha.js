import React,{Component} from "react";
import RVD from './../../npm/react-virtual-dom/react-virtual-dom';
import Slider from './../../npm/aio-slider/aio-slider';
import Titr from "../../components/header/titr/titr";
import Header from "../../components/header/header";
import getSvg from "../../getSvg";
import AppContext from "../../app-context";
export default class ShakhesHa extends Component{
    static contextType = AppContext;
    cards(){
      let {krs} = this.context;
      return {
        flex:1,scroll:'v',className:'padding-12',gap:12,column:krs.map((o)=>this.card(o)),style:{background:'#F1F2F3'}
      }
    }
    card({title,text,score,start,end,value,points,affix}){
      return {
        column:[
          {
            style:{background:'#fff',borderRadius:12},
            size:54,
            row:[
              {
                size:160,
                html:(
                  <div style={{position:'relative'}}>
                    {getSvg('krBG')}
                    <span style={{position:'absolute',right:24,top:19,fontSize:14,color:'#fff',fontWeight:'bold'}}>{title}</span>
                  </div>
                )
              },
              {flex:1},
              {html:text,align:'v',className:'color005478 bold size14'},
              {size:24}
            ]
          },
          {
            size:48,
            row:[
              {html:'روند دریافت امتیاز :',className:'size14 bold',align:'v'},
              {flex:1},
              {html:'جزِییات',className:'color2BA4D8 bold size12',align:'v'}
            ]
          },
          {
            size:60,
            row:[
              {html:'امتیاز شما از این شاخص: ' + score + ' امتیاز',className:'color004578 size12',align:'v'},
              {flex:1},
              {size:36,html:<div style={{background:'#FFB500',width:8,height:8,borderRadius:'100%'}}></div>,align:'vh'},
              {html:'موقعیت شما',align:'v',className:'size12'},
              {size:36,html:<div style={{background:'#005478',width:8,height:8,borderRadius:'100%'}}></div>,align:'vh'},
              {html:'دفعات خرید',align:'v',className:'size12'}
            ]
          },
          {size:60,html:(
                <Slider
                  attrs={{style:{padding:'0 36px',paddingTop:20}}}
                  pointStyle={()=>{return {background:'orange'}}}
                  start={start} end={end} points={[value]}
                  scaleStep={points}
                  labelStep={points}
                  labelStyle={()=>{return {top:-5,color:'#005478',fontSize:14}}}
                  editLabel={(value)=>value + ' ' + affix}
                  scaleStyle={()=>{
                    return {
                      width:12,height:12,transform:'translate(-6px,-6px)',borderRadius:'100%',background:'#005478',zIndex:100
                    }
                  }}
                  lineStyle={()=>{return {background:'#2BA4D8',height:4}}}
                />
              )}
  
        ]
      }
    }
    async componentDidMount(){
      this.context.getKRs();
    }
    render(){
      return (
        <RVD
          layout={{
            className:'page',
            column:[
                {html:<Header/>},
                {html:<Titr text={'شاخص ها'}/>},
                this.cards()
            ]
          }}
        />
      )
    }
  }