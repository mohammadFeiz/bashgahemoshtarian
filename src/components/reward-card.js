import React,{Component} from "react";
import RVD from './../npm/react-virtual-dom/react-virtual-dom';
import getSvg from "../getSvg";
import AppContext from "../app-context";
export default class RewardCard extends Component{
    static contextType = AppContext;
    horizontal(){
        let {data} = this.props;
        let {name,details = [],price,src} = data;
        return (
            <RVD
              layout={{
                className:'home-award-card horizontal',
                onClick:()=>{
                  let {openPopup} = this.context;
                  openPopup('reward',data)
                },
                row:[
                  {size:100,html:<img src={src} alt="" width='100%'/>},
                  {size:12,style:{background:'#fff',position:'absolute',left:0,top:104,width:'100%'},className:'br-12 br-b-0'},
                  {
                    flex:1,className:'home-award-card-footer',
                    column:[
                      {html:name,align:'v',className:'padding-8 bold size12'},
                      {html:details[0],flex:1,className:'padding-8 bold color605E5C size10'},
                      {
                        childsProps:{align:'v'},className:'padding-8',
                        row:[{flex:1},{html:price},{html:getSvg('gem2')}]
                      } 
                    ]
                  }
                ]
              }}
            />
          )
    }
    render(){
      let {data,type} = this.props;
      let {name,details = [],price,src} = data;
      if(type === 'horizontal'){
        return this.horizontal()
      }
      return (
        <RVD
          layout={{
            className:'home-award-card',
            onClick:()=>{
              let {openPopup} = this.context;
              openPopup('reward',data)
            },
            column:[
              {flex:1,html:<img src={src} alt="" width='100%'/>},
              {size:12,style:{background:'#fff',position:'absolute',left:0,top:104,width:'100%'},className:'br-12 br-b-0'},
              {
                flex:1,className:'home-award-card-footer',
                column:[
                  {html:name,align:'v',className:'padding-8 bold size12'},
                  {html:details[0],flex:1,className:'padding-8 bold color605E5C size10'},
                  {
                    childsProps:{align:'v'},className:'padding-8',
                    row:[{flex:1},{html:price},{html:getSvg('gem2')}]
                  } 
                ]
              }
            ]
          }}
        />
      )
    }
  }