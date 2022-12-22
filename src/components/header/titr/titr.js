import React,{Component} from "react";
import RVD from "../../../npm/react-virtual-dom/react-virtual-dom";
import './titr.css';
 export default class Titr extends Component{
    render(){
        let {text} = this.props;
        return (
            <RVD
                layout={{
                    html:text,className:'padding-0-12 size14 bold titr',align:'v'
                }}
            />
        )
    }
 }