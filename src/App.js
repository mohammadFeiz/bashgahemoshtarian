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
import Reward from './components/reward';
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      isAutenticated:false,registered:true,timer:12
    }
  }
  async componentDidMount(){
    this.mounted = true;
    this.tokenStorage = AIOStorage('bashgak-token');
    let token = this.tokenStorage.load('token',false);
    let isAutenticated = false;
    if(token){
      try{
        const config = {
          headers: { Authorization: `Bearer ${token}` }
        };
        let res = await Axios.get(`http://10.10.10.22:8081/sso/api/v1/user/Profile`,config).catch((err)=>{
        });
        if(res.status === 200){isAutenticated = true}
      }
      catch(err){
        if(err.message){
          this.setState({error:err.message})
          return
        }
        isAutenticated = false;
      }
    }
    console.log(isAutenticated)
    this.setState({
      isAutenticated,token
    })
    
      
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
      return '???????????? ?????? ?????? ???? ???????? ?????????? ????'
    }
  }
  onInterPassword({number, password}){

  }
  render(){
    if(!this.mounted){return null}
    let {isAutenticated,token,registered,error,timer} = this.state;
    if(error){
      setTimeout(()=>{
        if(timer === 1){window.location.reload()}
        this.setState({timer:timer - 1})
      },1000)
      return (
        <div className='fullscreen align-vh fd-column'>
          {error}
          <span>{timer}</span>
          <div style={{height:36}}></div>
          <button className='button-1' onClick={()=>window.location.reload()}>???????????????? ????????</button>
        </div>
      )
    }
    if(isAutenticated){
      return <Main token={token} mobile={this.tokenStorage.load('mobile')}/>
    }
    let fields = [];
    if(!registered){
      fields = [
        {label:'??????',field:'FirstName',type:'text',validations:[['required']],prefix:<Icon path={mdiAccountBoxOutline} size={1}/>},
        {label:'?????? ????????????????',field:'LastName',type:'text',validations:[['required']],prefix:<Icon path={mdiAccountBoxOutline} size={1}/>},
        {label:'??????????',field:'Email',type:'text',validations:[['required']],prefix:<Icon path={mdiEmailOutline} size={1}/>},
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
      profile:{},
      apis:AIOService({apis,getState:()=>this.state,onError:this.onError.bind(this),onSuccess:this.onSuccess.bind(this),token:props.token}),
      Storage,
      mobile:props.mobile,
      gems:0,
      history:[],
      details:[],
      poorsant:0,
      score:0,
      awards:[],
      rewards:[],
      awardSorts:[
        {text:'?????????? ????????',value:'0'},
        {text:'???????? ????????',value:'1'},
        {text:'?????????? ???? ???? ???? ????????',value:'2'},
        {text:'?????????? ???? ???????? ???? ????',value:'3'}
      ],
      activeAwardSort:'0',
      krs:[],
      catchedAwards:[],
      user:{
        name:'?????????? ??????????',
        number:'09123534314'
      },
      nerkhe_tabdile_har_almas: 2000,
      pishnahade_tabdile_almas: 5000,
      saghfe_enteghale_almas:5000,
      selected_credit_card:'1',
      hasPayPassword:false,
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
  async getRewards(activeAwardSort = '0'){
    const {apis} = this.state;
    let rewards = await apis({api:'rewards',parameter:activeAwardSort});
    this.setState({rewards})
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
  async getHasPayPassword(){
    const {apis} = this.state;
    let hasPayPassword = await apis({api:'hasPayPassword'});
    if(typeof hasPayPassword === 'boolean'){this.setState({hasPayPassword})}
  }
  async componentDidMount(){
     this.getGems();
     this.getProfile();
     this.getPoorsant();
     this.getScore();
     this.getDetails();
     this.getRewards();
     this.getHasPayPassword()
  }
  getContext(){
    return {
      ...this.state,
      logout:this.props.logout,
      openPopup:this.openPopup.bind(this),
      getRewards:this.getRewards.bind(this),
      getHistory:this.getHistory.bind(this),
      getScore:this.getScore.bind(this),
      getPoorsant:this.getPoorsant.bind(this),
      getCatchedAwards:this.getCatchedAwards.bind(this),
      getKRs:this.getKRs.bind(this),
      SetState:(obj)=>this.setState(obj),
      changeAwardSort:async (activeAwardSort)=>{
        await this.getRewards(activeAwardSort);
        this.setState({activeAwardSort});
      }
    }
  }
  async openPopup(name,parameter){
    let {rsa_actions,apis} = this.state;
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
    else if(name === 'reward'){
      let res = await apis({api:'rewardDetails',parameter:parameter.id});
      let {details,rules} = res;
      addPopup({
        type:'fullscreen',
        body:()=><Reward {...parameter} details={details} rules={rules}/>,
        title:'???????????? ??????????'
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