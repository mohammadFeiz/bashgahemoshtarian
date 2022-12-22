import React,{Component} from "react";
import AIOButton from "../../interfaces/aio-button-interface/aio-button-interface";
import Slider from './../../npm/aio-slider/aio-slider';
import RVD from "../../npm/react-virtual-dom/react-virtual-dom";
import AppContext from "../../app-context";
import getSvg from "../../getSvg";
import './khane.css';
import Header from "../../components/header/header";
export default class Khane extends Component{
    static contextType = AppContext;
    state = {
      openAwards:false,maxScore:300000,showDetails:false,activeAwardTab:'0',showAward:false,
      tabs:[
        'همه','کالا','خدمات','تخفیف'
      ]
    }
    card(){
      let {showDetails} = this.state;
      let {user,poorsant,score,homeCardDetails = {}} = this.context;
      // let homeCardDetails = {
      //   type:'برنزی',
  
      // }
        return {
        size:202,
        className:'home-card margin-0-12',
        attrs:{onClick:()=>this.setState({showDetails:!showDetails})},
        column:[
          {
            flex:1,
            row:[
              {
                flex:1,
                column:[
                  {size:20},
                  {
                    size:28,
                    row:[{size:20},{className:'home-card-circle'},{size:6},{html:user.name,className:'home-card-name',align:'v'}]
                  },
                  {size:16},
                  {
                    show:false,row:[
                      {size:20},{size:28,html:getSvg('cash'),align:'vh'},{size:6},
                      {html:'پورسانت هفتگی من',className:'home-card-poorsant-title bold',align:'v'},{size:6},
                      {html:poorsant + ' تومان',className:'home-card-poorsant-value bold',align:'v'},
                    ]
                  }
                ]
              },
              {
                size:120,align:'h',
                column:[
                  {html:homeCardDetails.type,className:'home-card-label',align:'vh'},
                  {html:'',className:'home-card-label-arrow'},
                  {html:getSvg('bronze'),align:'vh'}
                ]
              }
            ]
          },
          {
            size:48,
            row:[
              {size:20},
              {className:'home-card-score',html:score + ' امتیاز'},
              {
                flex:1,
                html:(
                  <Slider
                    attrs={{style:{padding:'0 24px',paddingBottom:24}}}
                    start={0} end={300} scaleStep={100} labelStep={100}
                    scaleStyle={()=>{return {width:12,height:12,zIndex:100,borderRadius:'100%',transform:'translate(-6px,-6px)'}}}
                    editLabel={(value)=>{
                      if(value === 100){return 75000}
                      if(value === 200){return 150000}
                      if(value === 300){return 300000}
                      return value
                    }}
                    labelStyle={()=>{return {color:'#fff',fontSize:10,top:30}}}
                    points={[score / 1000]}
                    fillStyle={(index)=>{
                      if(index !== 0){return}
                      return {height:3,background:'#006F9E'}
                    }}
                    pointStyle={()=>{return {display:'none'}}}
                    lineStyle={()=>{return {background:'#fff',height:5}}}
                  />
                )
              },
              {size:24}
            ]
          },
        ]
      }
    }
    
    tabs(){
      let {tabs,activeAwardTab} = this.state;
      return {
        row:[
          {flex:1},
          {
            gap:6,
            row:tabs.map((o,i)=>{
              let index = i.toString();
              return this.tab({text:o,id:index,active:activeAwardTab === index,onClick:()=>this.setState({activeAwardTab:index})})
            })
          },
          {flex:1}
        ]
      }
    }
    tab({text,active,onClick}){
      return {
        size:60,className:'home-tab' + (active?' active':''),align:'vh',
        html:text,
        attrs:{onClick:()=>onClick()}
      }
    }
    awardsHandle(){
      let {openAwards} = this.state;
      return {
        html:<div className='home-awards-handle'></div>,
        align:'vh',size:36,className:'home-awards-header',
        attrs:{onClick:()=>this.setState({openAwards:!openAwards})}
      }
    }
    awardsSort(){
      let {awardSorts,activeAwardSort,changeAwardSort} = this.context;
      return {
        size:36,childsProps:{align:'v'},className:'margin-0-12 color383A39 bold size14',
        row:[
          {html:awardSorts[activeAwardSort].text},
          {flex:1},
          {
            html:(
              <AIOButton 
                mode='bottom-popover'
                popupHeader={'دسته بندی بر اساس'}
                activeAwardSort={activeAwardSort}
                text={getSvg('sort')} type='select'
                optionChecked='option.value === this.props.activeAwardSort'
                options={awardSorts}
                onChange={(activeAwardSort)=>changeAwardSort(activeAwardSort)}
              />
            )
          }]
      }
    }
    awardsCards(){
      let {awards} = this.context;
      return {
        flex:1,className:'home-award-cards',
        column:awards.map((o)=>this.awardCard(o))
      }
    }
    awardCard(o){
      let {title,text,score,src} = o;
      return {
        className:'home-award-card',attrs:{onClick:()=>this.setState({showAward:o})},
        column:[
          {flex:1,html:<img src={src} alt="" width='100%'/>},
          {
            flex:1,className:'home-award-card-footer',
            column:[
              {html:title,align:'v',className:'padding-8 bold size12'},
              {html:text,flex:1,className:'padding-8 bold color605E5C size10'},
              {
                childsProps:{align:'v'},className:'padding-8',
                row:[{flex:1},{html:score},{html:getSvg('gem2')}]
              } 
            ]
          }
        ]
      }
    }
    detailsCards(){
      let {details} = this.context;
      return {
        gap:12,scroll:'v',flex:1,className:'home-details-cards',
        column:details.map(({title,text,max,value,mileStones,labelStep,affix})=>{
          return {
            className:'home-detail-card margin-0-12',
            column:[
              {html:title,className:'size16 bold color005478 padding-12'},
              {flex:1,html:text,className:'size10 color005478 padding-0-12'},
              {
                html:(
                  <Slider 
                    pointStyle={()=>{return {background:'none'}}}
                    getPointHTML={()=>{
                      return getSvg('spark')
                    }}
                    start={0}
                    end={max}
                    points={[value]}
                    fillStyle={(index)=>{return {height:3,background:index === 0?'#006F9E':'none'}}}
                    labelStep={labelStep}
                    scaleStep={labelStep}
                    scaleStyle={(val)=>{
                      let index = mileStones.indexOf(val);
                      if(index === -1){return {display:'none'}}
                    }}
                    labelStyle={()=>{return {top:6,color:'#fff'}}}
                    editLabel={(value)=>mileStones.indexOf(value) === -1?'':value + ' ' + affix}
  
                  />
                )
              }
            ]
  
          }
        })
      }
    }
    awardsLabel(){
      return {html:'لیست جوایز',size:36,align:'v',className:'size14 colorfff margin-0-12'}
    }
    header(){
      return {align:'v',className:'margin-0-12',row:[{html:getSvg('burux')},{flex:1},{html:22567,className:'home-score'},{html:getSvg('gem1')}]}
    }
    awards(){
      return {
        flex:1,
        column:[
          this.awardsLabel(),
          this.tabs(),
          {
            flex:1,
            className:'home-awards',
            column:[
              this.awardsHandle(),
              this.awardsSort(),
              this.awardsCards()
            ]
          }
        ]
      }
    }
    async getAward(){
        let {apis} = this.context;
        let {showAward} = this.state;
        let res = await apis({api:'getAward',parameter:showAward})
        this.setState({showAward:false})
    }
    award(){
      let {showAward} = this.state;
      let {title,score,description,howToUse,rules} = showAward;
      return {
        style:{background:'#fff'},flex:1,scroll:'v',
        column:[
          {size:161,html:'تصویر',align:'vh'},
          {size:36,html:title,className:'size14 bold padding-0-24',align:'v'},
          {
            size:36,className:'padding-0-24',
            row:[
              {html:score,className:'size10 bold',align:'v'},
              {size:5},
              {html:'الماس',className:'size10 bold',align:'v'},
              {size:5},
              {html:getSvg('gem3'),className:'size10 bold',align:'v'},
              {size:5},
              {html:'مورد نیاز',className:'size10',align:'v'}
            ]
          },
          {size:36,html:<div style={{height:2,width:'100%',background:'#ddd'}}></div>,align:'v'},
          {size:36,html:'توضیحات و مشخصات :',className:'size14 bold padding-0-24',align:'v'},
          {size:36,html:description,className:'size12 padding-0-24',align:'v'},
          {size:36,html:<div style={{height:2,width:'100%',background:'#ddd'}}></div>,align:'v'},
          {size:36,html:'نحوه استفاده :',className:'size14 bold padding-0-24',align:'v'},
          {size:36,html:howToUse,className:'size12 padding-0-24',align:'v'},
          {size:36,html:<div style={{height:2,width:'100%',background:'#ddd'}}></div>,align:'v'},
          {size:36,html:'قوانین و مقررات :',className:'size14 bold padding-0-24',align:'v'},
          {size:36,html:rules,className:'size12 padding-0-24',align:'v'},
          {size:36,html:<div style={{height:2,width:'100%',background:'#ddd'}}></div>,align:'v'},
          {html:<button style={{background:'#0094D4',color:'#fff',height:45,border:'none',padding:'0 36px',borderRadius:4,fontFamily:'inherit'}}
          onClick={()=>this.getAward()}>دریافت جایزه</button>,align:'vh'}
          
          
        ]
      }
    }
    async componentDidMount(){
      this.context.getScore();
      this.context.getAwards();
    }
    render(){
      let {showDetails,openAwards,showAward} = this.state;
      let {logout} = this.context;
      return (
        <RVD
          layout={{
            className:'page',
            column:[
              {html:<Header/>},
              {size:12},
              openAwards || showAward?false:this.card(),
              showDetails || showAward?false:this.awards(),
              !showDetails || showAward?false:this.detailsCards(),
              !showAward?false:this.award()
            ]
          }}
        />
      )
    }
  }