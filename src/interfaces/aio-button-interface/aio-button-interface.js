import React,{Component} from 'react';
import AIOButton from './../../npm/aio-button/aio-button';
import './index.css';
export default class AIOButtonInterface extends Component{
  render(){
    let {mode,popupHeader} = this.props;
    let props = {caret:false,...this.props}
    if(mode === 'bottom-popover'){
      props = {...props,popupAttrs:{className:'bottom-popover'},animate:{bottom:0},backColor:'rgba(0,0,0,.5)'}
    }
    if(typeof popupHeader === 'string'){
      props.popupHeader = <div className='popover-header'>{popupHeader}</div>
    }
    return <AIOButton {...props}/>
  }
}