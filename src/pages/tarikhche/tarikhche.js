import React,{Component} from "react";
import RVD from "../../npm/react-virtual-dom/react-virtual-dom";
import Header from "../../components/header/header";
import Titr from "../../components/header/titr/titr";
import getSvg from "../../getSvg";
import AppContext from "../../app-context";
export default class Tarikhche extends Component{
    static contextType = AppContext;
    card({date,gem = 0,score = 0,title}){
      return {
        style:{borderBottom:'1px solid #ddd',minHeight:96,background:'#fff'},
        row:[
          {size:12},
          {
            flex:1,
            column:[
              {flex:1},
              {size:36,html:title,align:'v',className:'size14 bold'},
              {size:36,html:'تاریخ : ' + date,align:'v'},
              {flex:1}
            ]
          },
          {
            align:'v',
            column:[
              {
                size:36,show:gem !== 0,
                childsProps:{align:'vh'},
                row:[
                  {size:24,html:gem,className:'size16 bold ' + (gem < 0?'colorA4262C':'color107C10')},
                  {size:24,html:getSvg(gem > 0?'arrowUp':'arrowDown')},
                  {size:24,html:getSvg('gem2')}
                ]
              },
              {
                size:36,show:score !== 0,
                childsProps:{align:'vh'},
                row:[
                  {size:24,html:score,className:'size16 bold ' + (score < 0?'colorA4262C':'color107C10')},
                  {size:24,html:getSvg(score > 0?'arrowUp':'arrowDown')},
                  {size:24,html:getSvg('star')}
                ]
              }
            ]
          },
          {size:12}
        ]
      }
    }
    async componentDidMount(){
      this.context.getHistory();
      this.context.getPoorsant();
    }
    render(){
      let {history} = this.context;
      return (
        <RVD
          layout={{
            className:'page',
            column:[
              {html:<Header/>},
              {html:<Titr text='تاریخچه'/>},
              {flex:1,scroll:'v',column:history.map((o)=>this.card(o))}
            ]
          }}
        />
      )
    }
  }