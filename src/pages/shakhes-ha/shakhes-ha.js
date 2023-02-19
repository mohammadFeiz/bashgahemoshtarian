import React,{Component} from "react";
import RVD from './../../npm/react-virtual-dom/react-virtual-dom';
import Slider from './../../npm/aio-slider/aio-slider';
import Titr from "../../components/header/titr/titr";
import Header from "../../components/header/header";
import getSvg from "../../getSvg";
import AppContext from "../../app-context";
import {Icon} from '@mdi/react';
import { mdiChevronLeft,mdiChevronDown } from "@mdi/js";
import AIODate from './../../npm/aio-date/aio-date';
import './shakhes-ha.css';
export default class ShakhesHa extends Component{
    static contextType = AppContext;
    constructor(props){
      super(props);
      this.state = {
        popup:false,
        chalesh_ha:[],
        chalesh_dic:{},
        open_dic:{}
      }
    }
    cards(){
      let {krs} = this.context;
      return {
        className:'padding-12',gap:12,column:krs.map((o)=>this.card(o)),style:{background:'#F1F2F3'}
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
      this.chalesh_ha()
    }
    async chalesh_ha(){
      let {apis} = this.context;
      let res = await apis({api:'chalesh_haye_man',errorMessage:'دریافت لیست چالش های من با خطا روبرو شد'});
      this.setState(res)
    }
    chaleshButton_layout(){
      return {
        align:'vh',
        html:(
          <div className='chalesh-haye-man' onClick={()=>{
            this.setState({popup:true})
          }}>
            <div className='chalesh-haye-man-bg'></div>
            <RVD
              layout={{
                style:{position:'absolute',width:'100%',height:'100%'},
                className:'of-visible',
                row:[
                  {
                    flex:1,gap:6,
                    className:'p-12',
                    column:[
                      {html:'چالش های من',flex:1,className:'fs-18 bold',style:{color:'#fff'}},
                      {html:<div style={{height:1,background:'#fff',width:'100%'}}></div>},
                      {
                        flex:1,
                        style:{color:'#00408E',fontSize:12},
                        row:[
                          {html:'چالش های فعال :',align:'v',className:'bold'},
                          {size:3},
                          {
                            align:'v',html:<div style={{background:'#fff',borderRadius:8,fontWeight:'bold',padding:'3px 6px'}}>{`2 از 3`}</div>
                          }
                        ]
                      },
                      
                    ]
                  },
                  {
                    flex:1,className:'of-visible',
                    html:getSvg('chalesh')
                  }
                ]
              }}
            />
          </div>
        ) 
      }
    }
    chaleshHayeMan_layout(){
      let {chalesh_ha,chalesh_dic} = this.state;
      let dic = {};
      for(let i = 0; i < chalesh_ha.length; i++){
        let chalesh = chalesh_ha[i];
        let {status} = chalesh;
        dic[status] = dic[status] || [];
        dic[status].push(chalesh);
      }
      return {
        flex:1,className:'ofy-auto p-t-12',
        style:{background:'linear-gradient(90deg, rgb(129 244 209) 0%, rgb(160 124 218) 100%)'},
        column:Object.keys(dic).map((key)=>{
          let {open_dic} = this.state;
          open_dic[key] = open_dic[key] === undefined?true:open_dic[key];
          return {
            className:'p-h-12 p-b-12',
            column:[
              {
                style:{color:'#5200FF',background:'#fff'},align:'v',
                className:'bold fs-12 br-24 h-36 m-b-12 p-h-12',
                onClick:()=>{
                  open_dic[key] = !open_dic[key];
                  this.setState({open_dic});
                },
                row:[
                  {html:<Icon path={open_dic[key]?mdiChevronDown:mdiChevronLeft} size={1} />},
                  {html:chalesh_dic[key].text},
                  {flex:1},
                  {html:`${dic[key].length} مورد`}
                ]
              },
              {
                show:!!open_dic[key],
                gap:12,
                column:dic[key].map((o)=>{
                  return {html:<ChaleshCard {...o} key={o.id} chalesh_dic={chalesh_dic}/>}
                })
              }
            ]
          }
        })
      }
    }
    render(){
      let {popup} = this.state;
      return (
        <RVD
          layout={{
            className:'page',
            column:[
                {html:<Header/>},
                {
                  show:!popup,
                  flex:1,className:'ofy-auto',
                  column:[
                    {html:<Titr text={'شاخص ها'}/>},
                    this.chaleshButton_layout(),
                    this.cards()
                  ]
                },
                {
                  show:!!popup,
                  flex:1,className:'ofy-auto',
                  column:[
                    {html:<Titr text={'چالش های من'} onBack={()=>this.setState({popup:false})}/>},
                    this.chaleshHayeMan_layout()
                  ]
                }
                
            ]
          }}
        />
      )
    }
  }


  class ChaleshCard extends Component{
    state = {days:0,hours:0,minutes:0,seconds:0}
    header_layout(){
      let {name,status,chalesh_dic,text} = this.props;
      return {
        row:[
          {
            column:[
              {
                row:[
                  {html:name,style:{color:'#562FC6'},className:'fs-14 bold',align:'v'}
                ]
              },
              {size:6},
              {
                html:(
                  <div 
                    style={{background:`${chalesh_dic[status].color}20`,color:chalesh_dic[status].color}}
                    className='fs-12 bold p-h-6'
                  >{chalesh_dic[status].text}</div>
                ),
                align:'v'
              },
              {size:6},
              {html:text,className:'fs-12 bold'}
            ]
          },
          {
            size:72,html:<img alt='' src=''/>
          }
        ]
      }
    }
    componentDidMount(){
      this.update();
      setInterval(()=>{
        this.update()
      },1000)
    }
    update(){
      let {date} = this.props;
      if(!date){return}
      let res = AIODate().getDateOffset(date);
      let {days,hours,minutes,seconds,type} = res;
      if(type === 'passed'){
        this.setState({days:0,hours:0,minutes:0,seconds:0});
      }
      else{
        this.setState({days,hours,minutes,seconds});
      }
    }
    body_layout(){
      let {range} = this.props;
      if(!range){return false}
      return {
        column:[
          {size:12},
          {html:'میزان پیشرفت',className:'fs-12'},
          {
            className:'p-h-36',
            html:(
              <Slider
                pointStyle={{display:'none'}}
                fillStyle={(index)=>{
                  if(index === 0){return {borderRadius:6,background:'#1D87B4',height:5}}
                }}
                editLabel={(value)=>`${range.unit} ${value}`}
                lineStyle={{height:5,borderRadius:6}}
                editValue={(value )=>`${value} ${range.unit}`}
                labelStyle={()=>{return {background:'#F0F0F0'}}}
                valueStyle={{borderRadius:16,background:'#D4FCFF',color:'#333',padding:'0 6px',fontWeight:'bold'}}
                start={range.start}
                end={range.end}
                points={[range.value]}
                showValue={true}
                labelStep={[range.start,range.end]}
              />
            )
          }
        ]
      }
    }
    footer_layout(){
      return {
        row:[
          this.reward_layout(),
          {flex:1},
          this.timer_layout()
        ]
      }
    }
    reward_layout(){
      let {reward} = this.props;
      return {
        show:!!reward,
        style:{background:'#E7EBFF'},
        className:'p-6 br-8',
        column:[
          {html:'جایزه اتمام چالش',className:'fs-12',align:'h'},
          {
            className:'fs-14 bold',align:'h',
            gap:6,
            row:[
              {show:!!reward.gem,html:reward.gem + ' الماس'},
              {html:'|',show:!!reward.gem && !!reward.score},
              {show:!!reward.score,html:reward.score + ' امتیاز'}
            ]
          }
        ]
      }
    }
    timer_layout(){
      let {days,hours,minutes,seconds} = this.state;
      return {
        gap:3,
        row:[
          this.timer_box_layout(seconds,'ثانیه'),
          this.timer_box_layout(minutes,'دقیقه'),
          this.timer_box_layout(hours,'ساعت'),
          this.timer_box_layout(days,'روز'), 
        ]
      }
    }
    timer_box_layout(value,unit){
      return {
        size:32,
        style:{border:'1px solid #000AFF',color:'#000AFF'},
        className:'fs-14 br-8',
        column:[
          {flex:1,html:value,className:'bold',align:'vh'},
          {flex:1,html:unit,align:'vh',className:'fs-10'}
        ]
      }
    }
    render(){
      return (
        <RVD
          layout={{
            className:'br-16 p-12',
            style:{background:'#fff'},
            column:[
              this.header_layout(),
              this.body_layout(),
              {size:6},
              this.footer_layout()
            ]
          }}
        />
      )
    }
  }