import React,{Component} from "react";
import RVD from './../../npm/react-virtual-dom/react-virtual-dom';
import Form from './../../npm/aio-form-react/aio-form-react';
import getSvg from "../../getSvg";
import AIOButton from './../../npm/aio-button/aio-button';
import AppContext from "../../app-context";
import './header.css';
import Icon from "@mdi/react";
import { mdiAccount, mdiAccountCircle } from "@mdi/js";

export default class Header extends Component{
    static contextType = AppContext;
    render(){
        let {gems,logout,profile,openPopup} = this.context;
        debugger;
        return (
            <>
                <RVD
                layout={{
                    column:[
                        {size:24},
                        {
                          align:'v',className:'margin-0-12',
                          style:{color:'#fff'},
                          row:[
                            {
                                column:[
                                    {html:getSvg('burux'),attrs:{onClick:()=>logout()}},
                                    {
                                        row:[
                                            {html:<Icon path={mdiAccountCircle} size={1}/>,align:'vh'},
                                            {
                                                html:(
                                                    <AIOButton
                                                        style={{background:'none',color:'#fff',background:'none',padding:'12px 0'}}
                                                        caret={false}
                                                        type='select'
                                                        text={profile.FirstName + ' ' + profile.LastName}
                                                        options={[
                                                            {text:'ویرایش اطلاعات کاربری',value:'0'},
                                                            {text:'رمز پرداخت',value:'1'},
                                                            {text:'خروج از حساب کاربری',value:'2'},
                                                        ]}
                                                        onChange={(value)=>{
                                                            if(value === '0'){
                                                                openPopup('profile')
                                                            }
                                                            else if(value === '1'){
                                                                openPopup('ramze_pardakht')
                                                            }
                                                            else if(value === '2'){
                                                                logout()
                                                            }
                                                        }}
                                                    />
                                                )
                                            }
                                        ]
                                    }
                                ]
                            },
                            {flex:1},
                            {html:gems,className:'header-score'},{html:getSvg('gem1')}]
                        }
                    ]
                }}
            />
            </>
        )
    }
}



