import React,{Component} from "react";
import RVD from "../../../npm/react-virtual-dom/react-virtual-dom";
import {Icon} from "@mdi/react";
import { mdiChevronRight } from "@mdi/js";
import './titr.css';
 export default class Titr extends Component{
    render(){
        let {text,onBack} = this.props;
        return (
            <RVD
                layout={{
                    className:'titr',
                    row:[
                        {
                            show:!!onBack,size:36,align:'vh',html:<Icon path={mdiChevronRight} size={1}/>,
                            onClick:()=>onBack()
                        },
                        {
                            html:text,className:'padding-0-12 size14 bold',align:'v'
                        }
                    ]
                }}
            />
        )
    }
 }