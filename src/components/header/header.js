import React,{Component} from "react";
import RVD from './../../npm/react-virtual-dom/react-virtual-dom';
import getSvg from "../../getSvg";
import AppContext from "../../app-context";
import './header.css';
export default class Header extends Component{
    static contextType = AppContext;
    render(){
        let {gems,logout,user,openPopup} = this.context;
        return (
            <RVD
                layout={{
                    column:[
                        {size:48},
                        {
                          align:'v',className:'margin-0-12',
                          row:[
                            {
                                column:[
                                    {html:getSvg('burux'),attrs:{onClick:()=>logout()}},
                                    {
                                        html:user.name,className:'colorfff fs-12',
                                        onClick:()=>{
                                            openPopup('profile')
                                        }
                                    }
                                ]
                            },
                            {flex:1},
                            {html:gems,className:'header-score'},{html:getSvg('gem1')}]
                        }
                    ]
                }}
            />
        )
    }
}