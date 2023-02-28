import React,{Component} from 'react';
import RSA from './npm/react-super-app/react-super-app';
import AIOService from './npm/aio-service/aio-service';
import apis from './apis';
import Axios from 'axios';
import {Icon} from '@mdi/react';
import {mdiGift,mdiPoll,mdiHome,mdiHistory,mdiHelp, mdiWallet, mdiAccountBoxOutline, mdiEmailOutline, mdiAccountCircle, mdiClose} from '@mdi/js';
import Javayez from './pages/javayez/javayez';
import ShakhesHa from './pages/shakhes-ha/shakhes-ha';
import Khane from './pages/khane/khane';
import Tarikhche from './pages/tarikhche/tarikhche';
import Wallet from './pages/wallet/wallet';
import AppContext from './app-context';
import gemSrc from './images/gem.gif';
import './App.css';
import RVD from './npm/react-virtual-dom/react-virtual-dom';
import AIOStorage from './npm/aio-storage/aio-storage'
import {OTPLogin} from './npm/aio-login/aio-login';
import clubgif from './images/club.gif';
import {Profile,RamzePardakht} from './components/profile';
export default class App extends Component{
  constructor(props){
    super(props);
    this.tokenStorage = AIOStorage('bashgak-token');
    let token = this.tokenStorage.load('token',false);
    let isAutenticated = false;
    if(token){isAutenticated = true}
    this.state = {
      isAutenticated,registered:true,token
    }
  }
  async onInterNumber(number){
    let res = await Axios.post('http://10.10.10.22:8081/sso/api/v1/user/twofactorauth', { Mobile: number })
    console.log('onInterNumber',res);
    if (res.data.IsSuccess) {
      this.setState({registered:!!res.data.Data.Status})
      return true
    }
    else {
      return alert(res.data.Message);
    }
  }
  async onInterCode({number,code,FirstName,LastName,Email}){
    debugger;
    code = code.toString();
    let res = await Axios.post(
      'http://10.10.10.22:8081/sso/api/v1/user/twofactorauthconfirm', 
      { mobile: number,OtpCode:code,FirstName,LastName,Email }
    )
    if (res.data.IsSuccess) {
      let token = res.data.Data.access_token;
      this.tokenStorage.save(token,'token');
      this.tokenStorage.save(number,'mobile');
      this.setState({token,isAutenticated:true})
    }
    else {
      return 'دریافت کیف پول با مشکل مواجه شد'
    }
  }
  onInterPassword({number, password}){

  }
  render(){
    let {isAutenticated,token,registered} = this.state;
    if(isAutenticated){
      return <Main token={token} mobile={this.tokenStorage.load('mobile')}/>
    }
    let fields = [];
    if(!registered){
      fields = [
        {label:'نام',field:'FirstName',type:'text',validations:[['required']],prefix:<Icon path={mdiAccountBoxOutline} size={1}/>},
        {label:'نام خانوادگی',field:'LastName',type:'text',validations:[['required']],prefix:<Icon path={mdiAccountBoxOutline} size={1}/>},
        {label:'ایمیل',field:'Email',type:'text',validations:[['required']],prefix:<Icon path={mdiEmailOutline} size={1}/>},
      ]
    }
    return (
      <OTPLogin
        time={30}
        verifiedCode={'1234'}
        fields={fields}
        codeLength={5}
        onInterNumber={(number) => this.onInterNumber(number)}
        onInterCode={(obj) => this.onInterCode(obj)}
        //onInterPassword={(obj) => this.onInterPassword(obj)}
      />
    )
  }
}
class Main extends Component{
  constructor(props){
    super(props);
    let Storage = AIOStorage('bashgah-storage')
    this.state = {
      apis:AIOService({apis,getState:()=>this.state,onError:this.onError.bind(this),onSuccess:this.onSuccess.bind(this),token:props.token}),
      Storage,
      mobile:props.mobile,
      gems:0,
      history:[],
      details:[],
      poorsant:0,
      score:0,
      awards:[],
      awardSorts:[
        {text:'محبوب ترین',value:'0'},
        {text:'جدید ترین',value:'1'},
        {text:'الماس از کم به زیاد',value:'2'},
        {text:'الماس از زیاد به کم',value:'3'}
      ],
      activeAwardSort:'0',
      krs:[],
      catchedAwards:[],
      user:{
        name:'کوروش شجاعی',
        number:'09123534314'
      },
      nerkhe_tabdile_har_almas: 2000,
      pishnahade_tabdile_almas: 5000,
      saghfe_enteghale_almas:5000,
      selected_credit_card:'1'
    }
  }
  openPopup(name){
    let {rsa_actions} = this.state;
    let {addPopup} = rsa_actions;
    if(name === 'profile'){
      addPopup({
        type:'fullscreen',
        body:()=><Profile/>,
        header:false
      })
    }
    else if(name === 'ramze_pardakht'){
      addPopup({
        type:'fullscreen',
        body:()=><RamzePardakht/>,
        header:false
      })
    }
  }
  onError(message,{errorTitle}){
    let {rsa_actions} = this.state;
    rsa_actions.setConfirm({
      type:'error',
      text:errorTitle,
      subtext:message
    })
  }
  onSuccess(result,{successTitle}){
    if(!successTitle){return false}
    let {rsa_actions} = this.state;
    rsa_actions.setConfirm({
      type:'success',
      text:successTitle,
    })
  }
  async getGems(){
    const {apis,mobile} = this.state;
    let gems = await apis({api:'gems',parameter:{mobile}});
    this.setState({gems})
  }
  async getProfile(){
    const {apis} = this.state;
    let profile = await apis({api:'getProfile'});
    this.setState({profile})
  }
  async getHistory(){
    const {apis} = this.state;
    let history = await apis({api:'history'});
    this.setState({history})
  }
  async getDetails(){
    const {apis} = this.state;
    let details = await apis({api:'details'});
    this.setState({details})
  }
  async getPoorsant(){
    const {apis} = this.state;
    let poorsant = await apis({api:'poorsant'});
    this.setState({poorsant})
  }
  async getScore(){
    const {apis} = this.state;
    let score = await apis({api:'score'});
    this.setState({score})
  }
  async getAwards(activeAwardSort = '0'){
    const {apis} = this.state;
    let awards = await apis({api:'awards',parameter:activeAwardSort});
    this.setState({awards})
  }
  async getCatchedAwards(){
    const {apis} = this.state;
    let catchedAwards = await apis({api:'catchedAwards'});
    this.setState({catchedAwards})
  }
  async getKRs(){
    const {apis} = this.state;
    let krs = await apis({api:'KRS'});
    this.setState({krs})
  }
  async componentDidMount(){
     this.getGems();
     this.getProfile();
     this.getPoorsant();
     this.getScore();
     this.getDetails();
     this.getAwards();
  }
  getContext(){
    return {
      ...this.state,
      logout:this.props.logout,
      openPopup:this.openPopup.bind(this),
      getAwards:this.getAwards.bind(this),
      getHistory:this.getHistory.bind(this),
      getScore:this.getScore.bind(this),
      getPoorsant:this.getPoorsant.bind(this),
      getCatchedAwards:this.getCatchedAwards.bind(this),
      getKRs:this.getKRs.bind(this),
      openPopup:this.openPopup.bind(this),
      SetState:(obj)=>this.setState(obj),
      changeAwardSort:async (activeAwardSort)=>{
        await this.getAwards(activeAwardSort);
        this.setState({activeAwardSort});
      }
    }
  }
  openPopup(name,parameter){
    let {rsa_actions} = this.state;
    let {addPopup} = rsa_actions;
    if(name === 'profile'){
      addPopup({
        body:()=><Profile/>,
        header:false
      })
    }
    else if(name === 'ramze_pardakht'){
      addPopup({
        body:()=><RamzePardakht/>,
        header:false
      })
    }
  }
  render(){
    return (
      <AppContext.Provider value={this.getContext()}>
        <RSA
          navs={[
            {icon:()=><Icon path={mdiGift} size={1}/>,id:'javayez'},
            {icon:()=><Icon path={mdiPoll} size={1}/>,id:'shakhes_ha'},
            {icon:()=><Icon path={mdiHome} size={1}/>,id:'khane'},
            {icon:()=><Icon path={mdiHistory} size={1}/>,id:'tarikhche'},
            {icon:()=><Icon path={mdiWallet} size={1}/>,id:'wallet'},
          ]}
          header={false}
          body={({navId})=>{
            if(navId === 'javayez'){return <Javayez/>}
            if(navId === 'shakhes_ha'){return <ShakhesHa/>}
            if(navId === 'khane'){return <Khane/>}
            if(navId === 'tarikhche'){return <Tarikhche/>}
            if(navId === 'wallet'){return <Wallet/>}
          }}
          splash={()=><Splash/>}
          splashTime={6000}
          getActions={({addPopup,removePopup,setConfirm})=>{
              let actions =  {
                addPopup,removePopup,setConfirm
              }
              this.state.rsa_actions = actions;
              this.setState({
                rsa_actions:actions
              })
          }}
        />
      </AppContext.Provider>
    )
  }
}


class Splash extends Component{
  render(){
    return (
      <RVD
        layout={{
          style:{position:'fixed',left:0,top:0,width:'100%',height:'100%',background:'#000'},
          className:'page',
          column:[
            {flex:1},
            {html:<img src={clubgif} width='300'/>,align:'vh',className:'size24 bold colorfff splash-animation'},
            {flex:1},
            {html:<img src={gemSrc} alt=''/>,align:'vh'}
          ]
        }}
      />
    )
  }
}


class Profile extends Component{
  static contextType = AppContext;
  state = {model:{}}
  change(key,value){

  }
  input_layout({label,type,value,onChange}){
    return {
      column:[
        {align:'h',html:label},
        {align:'vh',html:<input type={type} value={value} onChange={onChange}/>}
      ]
    }
  }
  onClose(){
    let {rsa_actions} = this.context;
    rsa_actions.removePopup()
  }
  render(){
    let {user} = this.context;
    let {model} = this.state;
    let {onClose} = this.props;
    return (
      <RVD
        layout={{
          className:'gloss-popup',
          column:[
            {
              size:76,html:'ویرایش اطلاعات کاربری',align:'vh'
            },
            this.input_layout({
              type:'text',label:'نام',value:model.firstName,
              onChange:(e)=>this.change('firstName',e.target.value)
            }),
            {size:12},
            this.input_layout({
              type:'text',label:'نام خانوادگی',value:model.lastName,
              onChange:(e)=>this.change('lastName',e.target.value)
            }),
            {size:36},
            {
              align:'h',
              html:(
                <button style={{maxWidth:240}}>ثبت</button>
              )
            },
            {flex:1},
            {
              size:96,align:'vh',html:<Icon path={mdiClose} size={1} className='icon-button'/>,
              onClick:()=>this.onClose()
            },

          ]
        }}
      />
    )
  }
}

class RamzePardakht extends Component{
  static contextType = AppContext;
  state = {
    hasPass:true,

    model:{
      currentPass:'',
      newPass:'',
      rePass:'',
    }
  }
  change(key,value){
    let {model} = this.state;
    model[key] = value;
    this.setState({model})
  }
  input_layout({label,type,value,onChange,placeholder,show = true}){
    if(show === false){return false}
    return {
      column:[
        {align:'h',html:label},
        {align:'vh',html:<input type={type} value={value} onChange={onChange} placeholder={placeholder}/>}
      ]
    }
  }
  onClose(){
    let {rsa_actions} = this.context;
    rsa_actions.removePopup()
  }
  error_layout(key){
    let {model,hasPass} = this.state;
    if(hasPass && key === 'currentPass'){
      if(model.currentPass.length !== 6){
        return {
          html:'رمز عبور فعلی باید 6 کاراکتر باشد',align:'h',className:'fs-12',style:{color:'orange'}
        }
      }
    }
    if(key === 'newPass'){
      if(model.newPass.length !== 6){
        return {
          html:'رمز عبور باید 6 کاراکتر باشد',align:'h',className:'fs-12',style:{color:'orange'}
        }
      }
    }
    if(key === 'rePass'){
      if(model.newPass !== model.rePass){
        return {
          html:'رمز عبور و تکرار رمز عبور مطابقت ندارند ',align:'h',className:'fs-12',style:{color:'orange'}
        }
      }
    }
    
  }
  render(){
    let {model,hasPass} = this.state;
    return (
      <RVD
        layout={{
          className:'gloss-popup',
          column:[
            {
              size:76,html:hasPass?'ویرایش رمز پرداخت':'ایجاد رمز پرداخت',align:'vh'
            },
            {
              html:'رمز پرداخت باید 6 رقم و شامل اعداد باشد',align:'vh'
            },
            {flex:1},
            this.input_layout({
              type:'password',label:'رمز فعلی',value:model.currentPass,placeholder:'------',
              onChange:(e)=>this.change('currentPass',e.target.value),show:!!hasPass
            }),
            this.error_layout('currentPass'),
            
            this.input_layout({
              type:'password',label:'رمز جدید',value:model.newPass,placeholder:'------',
              onChange:(e)=>this.change('newPass',e.target.value)
            }),
            this.error_layout('newPass'),
            {size:12},
            this.input_layout({
              type:'password',label:'تکرار رمز',value:model.rePass,
              onChange:(e)=>this.change('rePass',e.target.value)
            }),
            this.error_layout('rePass'),
            {size:48},
            {
              align:'h',
              html:(
                <button style={{maxWidth:240}}>ثبت</button>
              )
            },
            {flex:1},
            
            {
              size:96,align:'vh',html:<Icon path={mdiClose} size={1} className='icon-button'/>,
              onClick:()=>this.onClose()
            },

          ]
        }}
      />
    )
  }
}


// {
//   row:[
//     {html:<Icon path={mdiAccountCircle} size={2.4}/>,align:'vh'},
//     {
//       column:[
//         {html:user.name,flex:1},
//         {html:user.number,flex:1}
//       ]
//     }
//   ]
// }