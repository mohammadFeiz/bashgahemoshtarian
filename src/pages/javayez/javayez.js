
import React,{Component} from "react";
import RVD from './../../npm/react-virtual-dom/react-virtual-dom';
import AppContext from './../../app-context';
import Header from "../../components/header/header";
import Titr from "../../components/header/titr/titr";
export default class Javayez extends Component{
    static contextType = AppContext;
    cards(){
      let {catchedAwards} = this.context;
      return {
        flex:1,scroll:'v',className:'padding-12',gap:12,column:catchedAwards.map((o)=>this.card(o)),style:{background:'#F1F2F3'}
      }
    }
    getStatusText(id){
      let colors = ['#FFDAB8','#CFFFB8']
      return <div style={{background:colors[id],padding:3,borderRadius:4}} className='bold size12'>{['در حال بررسی','در انتظار استفاده'][id]}</div>
    }
    card({title,payedGems,status,src}){
      return {
        style:{background:'#fff',borderRadius:3},
        column:[
          {
            flex:1,
            className:'padding-12',
            row:[
              {size:120,html:<img src={src} alt="" width='100%'/>,align:'vh'},
              {size:6},
              {
                childsProps:{align:'v'},flex:1,
                column:[
                  {size:24,html:title,className:'size12 bold'},
                  {size:24,html:payedGems + ' الماس پرداخت شده',className:'size10'},
                  {size:24,row:[{flex:1,html:'وضعیت سفارش: '},{html:this.getStatusText(status)}],className:'size10'},
                ]
              }
            ]
          },
          {
            size:36,align:'vh',html:'مشاهده جزییات',className:'size10 color10BABE',
            style:{borderTop:'1px dashed #ddd'}
          }
        ]
      }
    }
    async componentDidMount(){
      this.context.getCatchedAwards();
    }
    render(){
      return (
        <RVD
          layout={{
            className:'page',
            column:[
              {html:<Header/>},
              {html:<Titr text={'جوایز دریافتی'}/>},
              this.cards()
            ]
          }}
        />
      )
    }
  }