import React,{Component} from 'react';
import RVD from './../npm/react-virtual-dom/react-virtual-dom';
import Form from './../npm/aio-form-react/aio-form-react';
import {Icon} from '@mdi/react';
import { mdiCheck, mdiClose } from "@mdi/js";
import AppContext from '../app-context';
export class Profile extends Component{
    static contextType = AppContext;
    state = {model:{FirstName:'',LastName:''},error:true}
    componentDidMount(){
        let {profile} = this.context;
        let model = {...profile}
        this.setState({model})
    }
    header_layout(){
        return {
            html:'ویرایش اطلاعات کاربری',align:'vh',size:72
        }
    }
    onClose(){
        let {rsa_actions} = this.context;
        rsa_actions.removePopup()
    }
    async onSubmit(){
        let {error,model} = this.state;
        if(error){return false}
        let {apis} = this.context;
        let res = await apis({
            api:'setProfile',
            parameter:model,
            successMessage:'تغییر اطلاعات کاربری با موفقیت انجام شد',
            errorMessage:'تغییر اطلاعات کاربری با خطا روبرو شد'
        })
        if(res === true){
            this.onClose()
        }
    }
    form_layout(){
        let {model} = this.state
        return {
            flex:1,
            html:(
                <Form
                    lang='fa'
                    style={{background:'none'}}
                    theme={{
                        labelStyle:{
                            color:'#fff'
                        }
                    }}
                    model={model}
                    inputs={[
                        {type:'text',field:'model.FirstName',label:'نام',validations:[['required']]},
                        {type:'text',field:'model.LastName',label:'نام خانوادگی',validations:[['required']]},
                        {type:'text',field:'model.Email',label:'ایمیل',validations:[['required']]},
                    ]}
                    onSubmit={()=>this.onSubmit()}
                    onChange={(model,error)=>this.setState({model,error})}
                />
            )
        }
    }
    footer_layout(){
        let {error} = this.state;
        return {
            size:96,gap:12,
            row:[
                {flex:1},
                {align:'vh',html:<Icon path={mdiCheck} size={1} className={'glass-icon' + (error?' disabled':'')}/>,onClick:()=>this.onSubmit()},
                {align:'vh',html:<Icon path={mdiClose} size={1} className='glass-icon'/>,onClick:()=>this.onClose()},
                {flex:1}
            ]
        }
    }
    render(){
        return (
            <RVD
                layout={{
                    className:'glass-popup',
                    style:{color:'#fff',height:'100%'},
                    column:[
                        this.header_layout(),
                        this.form_layout(),
                        this.footer_layout()
                    ]
                }}
            />
        )
    }
}

export class RamzePardakht extends Component{
    static contextType = AppContext;
    state = {model:{currentPassword:'',newPassword:'',rePassword:''},hasPassword:false}
    async componentDidMount(){
        let {hasPayPassword} = this.context;

        this.setState({hasPassword:hasPayPassword})
    }
    header_layout(){
        let {hasPassword} = this.state;
        return {
            html:!hasPassword?'ایجاد رمز پرداخت':'تغییر رمز پرداخت',align:'vh',size:72
        }
    }
    async onSubmit(){
        debugger;
        let {apis} = this.context;
        let {newPassword,currentPassword} = this.state.model;
        let res = await apis({api:'updatePayPassword',parameter:{currentPassword,newPassword}})
        if(res === true){
            this.onClose()
        }
    }
    form_layout(){
        let {model,hasPassword} = this.state
        return {
            flex:1,
            html:(
                <Form
                    lang='fa'
                    style={{background:'none'}}
                    model={model}
                    inputs={[
                        {
                            type:'password',field:'model.currentPassword',label:'رمز پرداخت فعلی',show:!!hasPassword,
                            theme:{inputStyle:{fontSize:36,textAlign:'center'}},
                            validations:[['required'],['length',6]]
                        },
                        {
                            type:'password',field:'model.newPassword',label:'رمز پرداخت جدید',theme:{inputStyle:{fontSize:36,textAlign:'center'}},
                            validations:[['required'],['length',6]]
                        },
                        {
                            type:'password',field:'model.rePassword',label:'تکرار رمز پرداخت جدید',theme:{inputStyle:{fontSize:36,textAlign:'center'}},
                            validations:[['=','model.newPassword',{message:'رمز جدید با تکرار آن مطابقت ندارد'}]]
                        },
                    ]}
                    onChange={(model)=>this.setState({model})}
                />
            )
        }
    }
    onClose(){
        let {rsa_actions} = this.context;
        rsa_actions.removePopup()
    }
    footer_layout(){
        return {
            size:96,gap:12,
            row:[
                {flex:1},
                {align:'vh',html:<Icon path={mdiCheck} size={1} className='glass-icon'/>,onClick:()=>this.onSubmit()},
                {align:'vh',html:<Icon path={mdiClose} size={1} className='glass-icon'/>,onClick:()=>this.onClose()},
                {flex:1}
            ]
        }
    }
    render(){
        return (
            <RVD
                layout={{
                    className:'glass-popup',
                    style:{color:'#fff',height:'100%'},
                    column:[
                        this.header_layout(),
                        this.form_layout(),
                        this.footer_layout()
                    ]
                }}
            />
        )
    }
}