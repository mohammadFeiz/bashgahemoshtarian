import React,{Component} from 'react';
import RSA from './npm/react-super-app/react-super-app';
import AIOService from './npm/aio-service/aio-service';
import apis from './apis';
import {Icon} from '@mdi/react';
import {mdiGift,mdiPoll,mdiHome,mdiHistory,mdiHelp, mdiWallet} from '@mdi/js';
import Javayez from './pages/javayez/javayez';
import ShakhesHa from './pages/shakhes-ha/shakhes-ha';
import Khane from './pages/khane/khane';
import Tarikhche from './pages/tarikhche/tarikhche';
import Wallet from './pages/wallet/wallet';
import AppContext from './app-context';
import gemSrc from './images/gem.gif';
import './App.css';
import RVD from './npm/react-virtual-dom/react-virtual-dom';
export default class App extends Component{
  constructor(props){
    super(props);
    this.state = {
      apis:AIOService({apis,getState:()=>this.state}),
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
        name:'کوروش شجاعی'
      },
      nerkhe_tabdile_har_almas: 2000,
      pishnahade_tabdile_almas: 5000,
      selected_credit_card:'1'
    }
  }
  async getGems(){
    const {apis} = this.state;
    let gems = await apis({api:'gems'});
    this.setState({gems})
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
     this.getPoorsant();
     this.getScore();
     this.getDetails();
     this.getAwards();
  }
  getContext(){
    return {
      ...this.state,
      logout:this.props.logout,
      getAwards:this.getAwards.bind(this),
      getHistory:this.getHistory.bind(this),
      getScore:this.getScore.bind(this),
      getPoorsant:this.getPoorsant.bind(this),
      getCatchedAwards:this.getCatchedAwards.bind(this),
      getKRs:this.getKRs.bind(this),
      SetState:(obj)=>this.setState(obj),
      changeAwardSort:async (activeAwardSort)=>{
        await this.getAwards(activeAwardSort);
        this.setState({activeAwardSort});
      }
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
          getActions={({addPopup})=>{
              let actions =  {
                addPopup
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
            {html:'باشگاه مشتریان',align:'vh',className:'size24 bold colorfff splash-animation'},
            {flex:1},
            {html:<img src={gemSrc} alt=''/>,align:'vh'}
          ]
        }}
      />
    )
  }
}