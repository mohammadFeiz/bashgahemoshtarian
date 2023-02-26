import React,{Component} from "react";
import RVD from './../../npm/react-virtual-dom/react-virtual-dom';
import getSvg from "../../getSvg";
import AppContext from "../../app-context";
import AIOButton from './../../npm/aio-button/aio-button';
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
                                        html:(
                                            <AIOButton
                                                style={{background:'none'}}
                                                caret={false}
                                                text={user.name}
                                                type='select'
                                                options={[
                                                    {text:'ویرایش اطلاعات کاربری',value:'0'},
                                                    {text:'تغییر رمز پرداخت',value:'1'},
                                                    {text:'خروج از حساب کاربری',value:'2'}
                                                ]}
                                                onChange={(value)=>{
                                                    if(value === '0'){
                                                        openPopup('profile')
                                                    }
                                                    else if(value === '1'){
                                                        openPopup('ramze_pardakht')
                                                    }
                                                    else if(value === '2'){
                                                        
                                                    }

                                                }}
                                            />
                                        ),className:'colorfff fs-12'
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