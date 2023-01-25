import React, { Component } from "react";
import RVD from "../../npm/react-virtual-dom/react-virtual-dom";
import Header from "../../components/header/header";
import AIOButton from './../../npm/aio-button/aio-button';
import Titr from "../../components/header/titr/titr";
import CreditCard from './../../components/credit-card/credit-card';
import { splitNumber } from './../../npm/react-super-app/react-super-app';
import { Icon } from "@mdi/react";
import { mdiCheckbook, mdiCheckboxBlank, mdiCheckboxBlankOutline, mdiCheckboxMarked, mdiCloseCircleOutline, mdiDiamond, mdiPlusBoxOutline } from '@mdi/js';
import AppContext from "../../app-context";
import './wallet.css';
export default class Wallet extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            page: 'hesab_haye_man',
            
        }
    }
    async componentDidMount() {

    }
    mojoodi_layout() {
        let { gems , nerkhe_tabdile_har_almas } = this.context;
        return {
            className: 'wallet-mojoodi-bg of-visible',
            size: 76,
            row: [
                { size: 12 },
                {
                    size:160,
                    column:[
                        {
                            row:[
                                {flex:1},
                                { html: gems, align: 'v', className: 'size24 bold color005478' },
                                { size: 6 },
                                { html: 'الماس', align: 'v', className: 'size14 bold color005478' }
                            ]
                        },
                        {
                            row:[
                                {flex:1},
                                { html:splitNumber( gems * nerkhe_tabdile_har_almas ), align: 'v', className: 'size24 bold color005478' },
                                { size: 6 },
                                { html: 'تومان', align: 'v', className: 'size14 bold color005478' },
                            ]
                        }
                    ]
                },
                { size: 24 },
                { html: <Icon path={mdiPlusBoxOutline} size={1} />, align: 'vh', className: 'color005478' },
                { flex: 1 },
                {align: 'vh', html: getSvg('svg1'), className: 'of-visible'}

            ]
        }
    }
    nerkh_layout() {
        let { nerkhe_tabdile_har_almas } = this.context;
        return {
            className: 'size14', size: 24, align: 'v',
            row: [
                { size: 36 },
                { html: 'نرخ تبدیل هر الماس :' },
                { flex: 1 },
                { html: `${nerkhe_tabdile_har_almas} تومان` },
                { size: 36 }
            ]
        }
    }
    pishnahad_layout() {
        let { pishnahade_tabdile_almas } = this.context;
        return {
            className: 'size14', size: 24, align: 'v',
            row: [
                { size: 36 },
                { html: 'پیشنهاد تبدیل :' },
                { flex: 1 },
                { html: `${pishnahade_tabdile_almas} الماس` },
                { size: 6 },
                { html: 'جزییات', className: 'color10BABE' },
                { size: 36 }
            ]
        }
    }
    cardRow_layout(row) {
        return {
            row: [
                { flex: 1 },
                {
                    gap: 12,
                    row: row.map(({ text, icon, id }) => {
                        return {
                            align: 'vh',
                            style: { border: '2px solid #413FB5', borderRadius: 12, width: 144 },
                            onClick: () => this.setState({ page: id }),
                            column: [
                                { size: 6 },
                                { size: 72, html: getSvg(icon), align: 'vh' },
                                { size: 6 },
                                { size: 24, html: text, className: 'size14 bold' },
                                { size: 6 }
                            ]
                        }
                    })
                },
                { flex: 1 },

            ]
        }
    }
    render() {
        let { page } = this.state;
        if (page === 'forooshgahe_almas') { return <ForooshgaheAlmas onClose={() => this.setState({ page: false })} /> }
        if (page === 'tarakoneshe_almas') { return <TarakonesheAlmas onClose={() => this.setState({ page: false })} /> }
        if (page === 'tabdile_almas') { return <TabdileAlmas onClose={() => this.setState({ page: false })} /> }
        if (page === 'hesab_haye_man') { return <HesabHayeMan onClose={() => this.setState({ page: false })} /> }
        return (
            <RVD
                layout={{
                    className: 'page',
                    column: [
                        { html: <Header /> },
                        { html: <Titr text='کیف پول' /> },
                        {
                            style: { background: '#fff' },
                            flex: 1, className: 'ofy-auto',
                            column: [
                                this.mojoodi_layout(),
                                { size: 16 },
                                this.nerkh_layout(),
                                this.pishnahad_layout(),
                                { size: 12 },
                                this.cardRow_layout([
                                    { text: 'فروشگاه الماس', icon: 'forooshgahe_almas', id: 'forooshgahe_almas' },
                                    { text: 'تراکنش الماس', icon: 'tarakoneshe_almas', id: 'tarakoneshe_almas' }
                                ]),
                                { size: 12 },
                                this.cardRow_layout([
                                    { text: 'تبدیل الماس', icon: 'tabdile_almas', id: 'tabdile_almas' },
                                    { text: 'حساب های من', icon: 'hesab_haye_man', id: 'hesab_haye_man' }
                                ]),
                                { size: 12 },
                                this.cardRow_layout([
                                    { text: 'افزایش اعتبار', icon: 'afzayeshe_etebar', id: 'afzayeshe_etebar' },
                                    { text: 'تسویه اعتبار', icon: 'tasvie_etebar', id: 'tasvie_etebar' }
                                ])
                            ]
                        }
                    ]
                }}
            />
        )
    }
}
class ForooshgaheAlmas extends Component {
    constructor(props) {
        super(props);
        this.state = {
            packs: [
                { text: 'پک 100 عددی الماس', price: 50000, icon: 'svg6' },
                { text: 'پک 200 عددی الماس', price: 80000, icon: 'svg7' },
                { text: 'پک 500 عددی الماس', price: 180000, icon: 'svg8' },
                { text: 'پک 2000 عددی الماس', price: 600000, icon: 'svg9' },
                { text: 'پک 10000 عددی الماس', price: 2000000, icon: 'svg10' },
                { text: 'الماس زماندار', price: 3000000, icon: 'svg11', subtext: 'بی نهایت الماس فقط در 1 دقیقه' }
            ]
        }
    }
    button_layout(text) {
        return {
            className: 'of-visible', align: 'vh',
            html: (
                <button
                    style={{
                        height: 48, background: '#fff', border: 'none',
                        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 20%)',
                        borderRadius: 12,
                        padding: '0 12px'
                    }}
                    className='color2BA4D8 bold size12'
                >{text}</button>
            )
        }
    }
    buttons_layout() {
        return {
            className: 'bgE0F6FF',
            size: 60,
            row: [
                { flex: 1 },
                this.button_layout('الماس رایگان'),
                { size: 12 },
                this.button_layout('الماس اعتباری'),
                { flex: 1 }
            ]
        }
    }
    cards_layout() {
        let { packs } = this.state;
        return {
            gap: 6, flex: 1, className: 'ofy-auto', column: packs.map((o) => this.card_layout(o))
        }
    }
    card_layout({ text, price, icon }) {
        return {
            style: { border: '1px solid #558ADD' },
            className: 'br-8 m-h-12 p-6',
            row: [
                {
                    flex: 1,
                    column: [
                        { html: text, className: 'size14 bold' },
                        { html: `${price} تومان`, className: 'size12' }
                    ]
                },
                {
                    html: getSvg(icon), align: 'vh'
                }
            ]
        }
    }
    render() {
        let { onClose } = this.props;
        return (
            <RVD
                layout={{
                    className: 'page',
                    column: [
                        { html: <Header /> },
                        { html: <Titr text='فروشگاه الماس' onBack={() => onClose()} /> },
                        {
                            style: { background: '#fff' },
                            flex: 1, scroll: 'v',
                            column: [
                                layout('hints', {
                                    icon: getSvg('forooshgahe_almas'),
                                    hints: [
                                        'خرید الماس فقط از طریق کارت های بانکی امکان پذیر است',
                                        'سقف خرید الماس روزانه 10000 عدد است'
                                    ]
                                }),
                                this.buttons_layout(),
                                { size: 12 },
                                this.cards_layout()
                            ]
                        }
                    ]
                }}
            />
        )
    }
}

class TarakonesheAlmas extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            items: [
                { success: true, status: { type: 'واریز الماس', to: 'علی واحدی', gems: 320 }, date: '1401/4/5', time: '10:30' },
                { success: false, status: { type: 'تبدیل الماس به ریال', to: 40000, gems: 20 }, date: '1401/4/5', time: '10:30' },
                { success: true, status: { type: 'خرید الماس', to: 180000, gems: 500 }, date: '1401/4/5', time: '10:30' },
                { success: true, status: { type: 'دریافت الماس', to: 'علی واحدی', gems: 250 }, date: '1401/4/5', time: '10:30' },
                { success: true, status: { type: 'واریز الماس', to: 'علی واحدی', gems: 320 }, date: '1401/4/5', time: '10:30' },
            ],
            tedade_almas_jahate_enteghal:0
        }
    }
    addPopup(){
        let {rsa_actions} = this.context;
        let {tedade_almas_jahate_enteghal} = this.state;
        rsa_actions.addPopup({
            header:false,
            body:()=>{
                return (
                    <RVD
                        layout={{
                            className:'gloss-popup',
                            column:[
                                {size:120,align:'vh',html:'انتقال جدید'},
                                {
                                    html:<input type='number' value={tedade_almas_jahate_enteghal} onChange={(e)=>this.setState({tedade_almas_jahate_enteghal:e.target.value})}/>
                                },
                                {
                                    html:<Icon path={mdiCloseCircleOutline} size={2}/>
                                }
                            ]
                        }}
                    />
                )
            }
        })
    }
    cards_layout() {
        let { items } = this.state;
        return {
            gap: 6, flex: 1, className: 'ofy-auto', column: items.map((o) => this.card_layout(o))
        }
    }
    card_layout({ status, date, time, success }) {
        let { type, to, gems } = status;
        return {
            style: { borderBottom: '1px solid #ddd' },
            className: 'm-h-12 p-6 size14',
            column: [
                {
                    row: [
                        { html: type, className: '' },
                        { html: '|', align: 'vh', size: 12 },
                        { html: 'موفق', className: 'color107C10', show: !!success },
                        { html: 'نا موفق', className: 'colorA4262C', show: !success },
                        { flex: 1 },
                        { html: typeof to === 'number' ? (to + ' تومان') : `به ${to}`, className: 'color005478 size12 bold' },
                        { html: '|', align: 'vh', size: 12 },
                        { html: gems, className: 'color8B1DCF' },
                        { html: <Icon path={mdiDiamond} size={0.8} />, className: 'color005478' }
                    ]
                },
                {
                    className: 'size12',
                    row: [
                        { html: 'زمان : ' },
                        { flex: 1 },
                        { html: date },
                        { html: '|', align: 'vh', size: 12 },
                        { html: time }
                    ]
                }

            ]
        }
    }
    render() {
        let { onClose } = this.props;
        let { items } = this.state;
        return (
            <RVD
                layout={{
                    className: 'page',
                    column: [
                        { html: <Header /> },
                        { html: <Titr text='تراکنش الماس' onBack={() => onClose()} /> },
                        {
                            style: { background: '#fff' },
                            flex: 1, scroll: 'v',
                            column: [
                                layout('hints', {
                                    icon: getSvg('tarakoneshe_almas'),
                                    hints: [
                                        'امکان انتقال الماس به دوستان فراهم است',
                                        'سقف انتقال الماس روزانه 5000 عدد است',
                                    ]
                                }),
                                { size: 12 },
                                layout('add_button', { text: 'انتقال جدید',onClick:()=>this.addPopup() }),
                                { size: 12 },
                                layout('list_header', { length: items.length, text: 'لیست تراکنش ها' }),
                                this.cards_layout()
                            ]
                        }
                    ]
                }}
            />
        )
    }
}
class TabdileAlmas extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            nerkhe_tabdile_har_almas: 2000,
            saghfe_roozane: 1000,
            type: '2',
            gemsForChange: 0,
        }
    }
    button_layout(text) {
        return {
            className: 'of-visible', align: 'vh',
            html: (
                <button
                    style={{
                        height: 48, background: '#fff', border: 'none',
                        boxShadow: '0 1px 2px 0 rgb(0 0 0 / 20%)',
                        borderRadius: 12,
                        padding: '0 12px'
                    }}
                    className='color2BA4D8 bold size12'
                >{text}</button>
            )
        }
    }
    cards_header_layout() {
        let { items } = this.state;
        return {
            size: 36, align: 'v', className: 'p-h-12 size12 bold',
            row: [
                { html: 'لیست تراکنش ها' },
                { flex: 1 },
                { html: `${items.length} مورد` }
            ]
        }
    }
    tabdil_layout() {
        let { gems } = this.context;
        let { type, gemsForChange, nerkhe_tabdile_har_almas, saghfe_roozane } = this.state;
        let submitText = 'درخواست تبدیل';
        let disabled = false;
        if (gemsForChange > saghfe_roozane) {
            disabled = true;
            submitText = 'بالاتر از سقف مجاز'
        }
        if (!gemsForChange || isNaN(+gemsForChange)) { disabled = true; }
        return {
            className: 'p-h-16 size12 bold',
            column: [
                {
                    align: 'vh',
                    html: (
                        <AIOButton
                            type='radio'
                            options={[
                                { text: 'کل الماس ها', value: '1' },
                                { text: 'بخشی از الماس ها', value: '2' }
                            ]}
                            value={type}
                            onChange={(type) => {
                                if (type === '1') { gemsForChange = gems }
                                else { gemsForChange = 0 }
                                this.setState({ type, gemsForChange });
                            }}
                        />
                    )
                },
                {
                    size: 48,
                    row: [
                        {
                            flex: 1,
                            row: [
                                { flex: 1 },
                                { html: 'تعداد الماس برای تبدیل', align: 'v' },
                            ]
                        },
                        { size: 24 },
                        {
                            flex: 1,
                            row: [
                                {
                                    align: 'v',
                                    html: (
                                        <input
                                            type='number' value={gemsForChange} disabled={type === '1'}
                                            onChange={(e) => {
                                                let value = e.target.value;
                                                this.setState({ gemsForChange: value })
                                            }}
                                            className='h-36 w-168 br-8'
                                            style={{ border: '1px solid #ddd', textAlign: 'center', boxSizing: 'border-box' }}
                                        />
                                    )
                                },
                                { flex: 1 }
                            ]
                        }
                    ]
                },
                {
                    size: 48,
                    row: [
                        {
                            flex: 1,
                            row: [
                                { flex: 1 },
                                { html: 'معادل الماس ها به تومان', align: 'v' },
                            ]

                        },
                        { size: 24 },
                        {
                            flex: 1,
                            row: [
                                {
                                    align: 'v',
                                    html: (
                                        <div
                                            onChange={(e) => this.setState({ gemsFormChange: e.target.value })}
                                            className='align-vh h-36 w-168 br-8 bgE0F6FF color005478'
                                        >{splitNumber(nerkhe_tabdile_har_almas * gemsForChange)}</div>
                                    )
                                },
                                { flex: 1 }
                            ]
                        },
                    ]
                },
                { size: 12 },
                {
                    align: 'vh',
                    html: (
                        <button disabled={disabled} style={{ maxWidth: 240, background: '#00ADF6', color: '#fff', border: 'none' }} className='w-100 h-36 br-8'>{submitText}</button>
                    )
                }
            ]

        }
    }
    render() {
        let { onClose } = this.props;
        return (
            <RVD
                layout={{
                    className: 'page',
                    column: [
                        { html: <Header /> },
                        { html: <Titr text='تبدیل الماس' onBack={() => onClose()} /> },
                        {
                            style: { background: '#fff' },
                            flex: 1, scroll: 'v',
                            column: [
                                layout('hints', {
                                    icon: getSvg('tabdile_almas'),
                                    hints: [
                                        `نرخ تبدیل هر الماس 2000 تومان است`,
                                        'سقف فروش الماس روزانه 1000 عدد است',
                                        'واریز وجه 24 ساعته انجام می شود'
                                    ]
                                }),
                                { size: 12 },
                                this.tabdil_layout(),
                                { size: 12 },
                            ]
                        }
                    ]
                }}
            />
        )
    }
}
class HesabHayeMan extends Component {
    static contextType = AppContext;
    constructor(props) {
        super(props);
        this.state = {
            items:[
                {number:'6219861033538751',name:'محمد شریف فیض',id:'1'},
                {number:'6219861033538751',name:'محمد شریف فیض',id:'2'},
                {number:'6219861033538751',name:'محمد شریف فیض',id:'3'},
                {number:'6219861033538751',name:'محمد شریف فیض',id:'4'},
                {number:'6219861033538751',name:'محمد شریف فیض',id:'5'},
            ],
            saghfe_roozane: 1000,
            type: '2',
            gemsForChange: 0,
        }
    }
    cards_layout() {
        let { items } = this.state;
        return {
            gap: 6, flex: 1, className: 'ofy-auto', column: items.map((o,i) => this.card_layout(o,i))
        }
    }
    card_layout({ name,number,id },index) {
        let {selected_credit_card,SetState} = this.context;
        let active = id === selected_credit_card;
        return {
            onClick:()=>SetState({selected_credit_card:id}),
            className:'of-visible',
            row:[
                {flex:1},
                {size:60,html:(
                    <Icon path={active?mdiCheckboxMarked:mdiCheckboxBlankOutline} size={1}/>
                ),align:'vh',style:{color:active?'dodgerblue':'#333'}},
                {size:280,html:<CreditCard index={index} number={number} name={name}/>,className:'of-visible'},
                {flex:1}
            ]
        }
    }
    render() {
        let { onClose } = this.props;
        let {items} = this.state;
        return (
            <RVD
                layout={{
                    className: 'page',
                    column: [
                        { html: <Header /> },
                        { html: <Titr text='حساب های من' onBack={() => onClose()} /> },
                        {
                            style: { background: '#fff' },
                            flex: 1, scroll: 'v',
                            column: [
                                layout('hints', {
                                    icon: getSvg('hesab_haye_man'),
                                    hints: [
                                        'حساب منتخب شما با نشانک آبی نمایش داده می شود',
                                        'جهت اضافه کردن حساب جدید دکمه زیر را فشار دهید'
                                    ]
                                }),
                                { size: 12 },
                                layout('add_button',{text:'افزودن حساب جدید'}),
                                {size:12},
                                layout('list_header',{text:'حساب های من',length:items.length}),
                                this.cards_layout(),
                                { size: 12 },
                            ]
                        }
                    ]
                }}
            />
        )
    }
}
function layout(type, parameter) {
    if (type === 'list_header') {
        let { text, length } = parameter;
        return {
            size: 36, align: 'v', className: 'p-h-12 size12 bold',
            row: [
                { html: text },
                { flex: 1 },
                { html: `${length} مورد` }
            ]
        }
    }
    if (type === 'add_button') {
        let { text,onClick } = parameter;
        return {
            size: 36, align: 'v', className: 'm-h-12 br-8',
            style: { color: '#00ADF6', border: '1px solid #00ADF6' },
            onClick,
            row: [
                { flex: 1 },
                { html: text, align: 'v' },
                { size: 6 },
                { html: '+', align: 'vh' },
                { flex: 1 }
            ]

        }
    }
    if (type === 'hints') {
        let { icon, hints } = parameter;
        return {
            className: 'bgE0F6FF',
            row: [
                { size: 24 },
                { html: icon, align: 'vh' },
                {
                    column: [
                        { size: 12 },
                        {
                            column: hints.map((o) => {
                                return {
                                    size: 24, align: 'v',
                                    className: 'size10 bold',
                                    row: [
                                        { size: 12 },
                                        { size: 36, align: 'vh', html: (<div className='w-8 h-8 br-100' style={{ background: '#0093D2' }}></div>) },
                                        { html: o }
                                    ]
                                }
                            })
                        },
                        { size: 12 }
                    ]
                },
            ]
        }
    }
}
function getSvg(type) {
    if (type === 'svg1') {
        return (
            <svg width="70" height="159" viewBox="0 0 116 159" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-15.0962 66.0869C-19.4933 66.8313 -22.4292 71.4923 -21.5971 76.4077C-20.7527 81.3954 -16.4585 84.7581 -12.0614 84.0137L88.3614 67.013C92.8232 66.2577 95.7591 61.5966 94.927 56.6812C94.0826 51.6935 89.7884 48.3309 85.3266 49.0862L-15.0962 66.0869Z" fill="#9A5F3B" />
                <path d="M-8.8754 83.4746L96.4444 65.6449L94.927 56.6815L-3.0985 73.2764C-7.12957 73.9588 -9.71398 78.5212 -8.8754 83.4746Z" fill="#FFFAD1" />
                <g clipPath="url(#clip0_2691_15896)">
                    <path d="M64.8664 25.1264L45.2413 23.4867L25.6163 21.847L7.65493 36.6042L39.9147 87.2386L80.1298 42.6597L64.8664 25.1264Z" fill="#5575A6" />
                    <path d="M7.65491 36.604L30.852 38.5422L39.9147 87.2384L7.65491 36.604Z" fill="#3F587E" />
                    <path d="M80.1298 42.6596L56.9326 40.7214L39.9147 87.2385L80.1298 42.6596Z" fill="#3F587E" />
                    <path d="M64.8664 25.1266L25.6163 21.8472L30.8521 38.5426L56.9327 40.7217L64.8664 25.1266Z" fill="#3F587E" />
                    <path d="M30.862 31.1612L32.3409 36.5767L37.3616 38.9544L32.0159 40.466L29.6589 45.561L28.18 40.1455L23.1593 37.7678L28.505 36.2562L30.862 31.1612Z" fill="white" />
                </g>
                <path d="M-21.5924 76.4351L-9.15423 149.907C-8.38382 154.458 -4.12605 157.536 0.284867 156.79L101.022 139.736C105.498 138.978 108.505 134.67 107.735 130.119L106.35 121.941L96.6813 64.825L-12.1645 83.2516C-16.5754 83.9983 -20.8332 80.9199 -21.5924 76.4351Z" fill="#B06C45" />
                <path d="M100.484 136.163L96.6568 136.811L96.4 135.294L100.227 134.646C100.551 134.591 100.865 134.471 101.113 134.361L101.813 135.735C101.37 135.878 100.938 136.086 100.484 136.163ZM91.6621 137.657L86.6674 138.502L86.4106 136.985L91.4053 136.14L91.6621 137.657ZM81.7375 139.337L76.7428 140.182L76.486 138.665L81.4807 137.82L81.7375 139.337ZM71.7481 141.028L66.7534 141.874L66.4966 140.357L71.4913 139.511L71.7481 141.028ZM61.8235 142.708L56.8288 143.554L56.572 142.037L61.5667 141.191L61.8235 142.708ZM51.8341 144.399L46.8394 145.245L46.5826 143.728L51.5773 142.882L51.8341 144.399ZM41.8447 146.09L36.85 146.936L36.5932 145.419L41.5879 144.573L41.8447 146.09ZM31.9201 147.77L26.9254 148.616L26.6686 147.099L31.6633 146.254L31.9201 147.77ZM21.9307 149.462L16.936 150.307L16.6792 148.79L21.6739 147.945L21.9307 149.462ZM12.0062 151.142L7.01146 151.987L6.75466 150.47L11.7494 149.625L12.0062 151.142ZM2.01675 152.833L-2.91309 153.667L-3.16989 152.15L1.75995 151.316L2.01675 152.833ZM104.274 130.569L102.782 130.822L101.923 125.743L103.415 125.491L104.274 130.569Z" fill="#FFFAD1" />
                <path d="M102.187 118.236L100.695 118.489L101.119 120.995L102.611 120.742L102.187 118.236Z" fill="#FFFAD1" />
                <path d="M96.6711 85.6547L95.1792 85.9072L95.6035 88.4135L97.0954 88.1609L96.6711 85.6547Z" fill="#FFFAD1" />
                <path d="M95.1526 76.6844L93.6606 76.937L94.4199 81.4218L95.9118 81.1693L95.1526 76.6844Z" fill="#FFFAD1" />
                <path d="M94.393 72.2002L92.901 72.4528L92.6107 70.738L90.8593 71.0345L90.6025 69.5176L93.8459 68.9685L94.393 72.2002Z" fill="#FFFAD1" />
                <path d="M86.0594 71.847L81.2593 72.6596L81.0025 71.1427L85.8026 70.3301L86.0594 71.847ZM76.4592 73.4722L71.6591 74.2848L71.4023 72.7679L76.2024 71.9553L76.4592 73.4722ZM66.859 75.0975L62.0588 75.9101L61.802 74.3932L66.6022 73.5805L66.859 75.0975ZM57.3236 76.7117L52.5235 77.5243L52.2667 76.0074L57.0668 75.1948L57.3236 76.7117ZM47.7234 78.3369L42.9233 79.1496L42.6665 77.6326L47.4666 76.82L47.7234 78.3369ZM38.1232 79.9622L33.323 80.7748L33.0662 79.2579L37.8664 78.4453L38.1232 79.9622ZM28.5229 81.5874L23.7228 82.4L23.466 80.8831L28.2661 80.0705L28.5229 81.5874ZM18.9227 83.2126L14.1226 84.0253L13.8658 82.5083L18.6659 81.6957L18.9227 83.2126ZM9.3225 84.8379L4.52238 85.6505L4.26558 84.1336L9.06569 83.3209L9.3225 84.8379ZM-0.212859 86.4521L-5.01297 87.2647L-5.26977 85.7478L-0.469661 84.9352L-0.212859 86.4521ZM-9.81308 88.0774L-14.6132 88.89L-14.87 87.373L-10.0699 86.5604L-9.81308 88.0774Z" fill="#FFFAD1" />
                <path d="M103.476 91.5593L91.2813 93.6238C86.2218 94.4803 82.7737 99.3382 83.6558 104.548L84.1247 107.319C84.9956 112.463 89.7968 115.992 94.9212 115.125L107.116 113.06C109.386 112.676 110.944 110.445 110.553 108.136L108.331 95.0115C107.94 92.7032 105.811 91.1639 103.476 91.5593Z" fill="#9A5F3B" />
                <path d="M99.1867 103.274C99.6445 105.979 97.8835 108.583 95.1592 109.045C92.4996 109.495 89.9257 107.692 89.4568 104.922C88.9878 102.152 90.76 99.6127 93.4844 99.1515C96.2087 98.6903 98.729 100.57 99.1867 103.274Z" fill="#FFFAD1" />
                <defs>
                    <clipPath id="clip0_2691_15896">
                        <rect width="72.7274" height="70.4547" fill="white" transform="translate(9.54346 14.001) rotate(4.77611)" />
                    </clipPath>
                </defs>
            </svg>

        )

    }
    if (type === 'forooshgahe_almas') {
        return (
            <svg width="66" height="91" viewBox="0 0 66 91" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2691_15950)">
                    <path d="M25.2606 4.6823L16.7507 6.31511L8.24087 7.94792L2.38065 16.331L22.0549 33.9594L33.8074 10.3011L25.2606 4.6823Z" fill="#5575A6" />
                    <path d="M2.38062 16.3311L12.4394 14.401L22.0549 33.9594L2.38062 16.3311Z" fill="#3F587E" />
                    <path d="M33.8074 10.3009L23.7486 12.231L22.0549 33.9592L33.8074 10.3009Z" fill="#3F587E" />
                    <path d="M25.2607 4.68213L8.24097 7.94775L12.4395 14.4008L23.7487 12.2309L25.2607 4.68213Z" fill="#3F587E" />
                    <path d="M11.5682 11.2725L12.8371 13.3917L15.2465 13.8037L13.1607 15.0782L12.7663 17.5165L11.4974 15.3973L9.08805 14.9853L11.1738 13.7108L11.5682 11.2725Z" fill="white" />
                </g>
                <g clipPath="url(#clip1_2691_15950)">
                    <path d="M44.4757 11.9376L37.8031 10.0961L31.1305 8.25461L23.9672 12.1853L31.821 31.7721L48.6091 18.9859L44.4757 11.9376Z" fill="#8FACD9" />
                    <path d="M23.9673 12.1851L31.8544 14.3617L31.8211 31.7719L23.9673 12.1851Z" fill="#3C6AB1" />
                    <path d="M48.609 18.9858L40.7219 16.8091L31.821 31.772L48.609 18.9858Z" fill="#3C6AB1" />
                    <path d="M44.4756 11.9374L31.1304 8.25439L31.8542 14.3617L40.7218 16.809L44.4756 11.9374Z" fill="#3C6AB1" />
                    <path d="M32.3373 11.8128L32.4963 13.7796L34.0761 14.9272L32.1313 15.102L30.9861 16.7088L30.8271 14.742L29.2473 13.5945L31.192 13.4197L32.3373 11.8128Z" fill="white" />
                </g>
                <g clipPath="url(#clip2_2691_15950)">
                    <path d="M11.042 24.5L8.04761 84.1168H50.488L53.6421 81.1058H57.6346L54.0414 24.5H11.042Z" fill="#007863" />
                    <path d="M4.49439 24.5L1.5 84.1168H50.4881L47.4938 24.5H4.49439Z" fill="#00A083" />
                    <path d="M25.9741 58.4232C18.4682 58.4232 12.3596 52.2808 12.3596 44.7334V32.0071C12.3596 31.164 13.0383 30.4414 13.9167 30.4414C14.7951 30.4414 15.4738 31.1239 15.4738 32.0071V44.7735C15.4738 50.5947 20.1849 55.3319 25.9741 55.3319C31.7632 55.3319 36.5143 50.5947 36.5143 44.7334V32.0071C36.5143 31.164 37.1931 30.4414 38.0714 30.4414C38.9098 30.4414 39.6285 31.1239 39.6285 32.0071V44.7735C39.5886 52.321 33.48 58.4232 25.9741 58.4232Z" fill="#FFFAD1" />
                    <path d="M60.4294 61.876H26.9721C24.1773 61.876 21.9016 64.1643 21.9016 66.9745V85.4417C21.9016 88.2519 24.1773 90.5402 26.9721 90.5402H60.4294C63.2241 90.5402 65.4999 88.2519 65.4999 85.4417V66.9745C65.4999 64.1242 63.2241 61.876 60.4294 61.876Z" fill="#C99B36" />
                    <path d="M58.7526 61.876H25.2953C22.5006 61.876 20.2249 64.1643 20.2249 66.9745V85.4417C20.2249 88.2519 22.5006 90.5402 25.2953 90.5402H58.7526C61.5474 90.5402 63.8231 88.2519 63.8231 85.4417V66.9745C63.8231 64.1242 61.5474 61.876 58.7526 61.876Z" fill="#F7CA41" />
                    <path d="M63.7832 78.3359H20.2249V84.117H63.7832V78.3359Z" fill="#4D4D4F" />
                    <path d="M60.0702 69.1426H53.6821V75.5659H60.0702V69.1426Z" fill="#FFFAD1" />
                    <path d="M37.6722 74.3613H24.0178V75.5657H37.6722V74.3613Z" fill="#FFFAD1" />
                    <path d="M37.6722 71.752H24.0178V72.9563H37.6722V71.752Z" fill="#FFFAD1" />
                    <path d="M37.6722 69.1426H24.0178V70.347H37.6722V69.1426Z" fill="#FFFAD1" />
                </g>
                <defs>
                    <clipPath id="clip0_2691_15950">
                        <rect width="32" height="31" fill="white" transform="translate(0.5 6.52979) rotate(-10.8615)" />
                    </clipPath>
                    <clipPath id="clip1_2691_15950">
                        <rect width="25.5631" height="24.7642" fill="white" transform="translate(26.0881 4.5) rotate(15.4283)" />
                    </clipPath>
                    <clipPath id="clip2_2691_15950">
                        <rect width="64" height="66" fill="white" transform="translate(1.5 24.5)" />
                    </clipPath>
                </defs>
            </svg>

        )
    }
    if (type === 'tarakoneshe_almas') {
        return (
            <svg width="76" height="33" viewBox="0 0 76 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M8.8627 0.404811L7.09031 0.404812L7.43979 14.1645C7.53965 14.3893 7.6395 14.639 7.73935 14.8887C8.01395 15.5879 8.3884 16.3621 8.78781 17.1862C8.98752 17.6107 9.23715 18.0352 9.46182 18.4597C9.58664 18.6845 9.71145 18.9092 9.83627 19.134C9.96109 19.3588 10.1109 19.5835 10.2606 19.8083C10.8098 20.7073 11.4589 21.6312 12.1579 22.5302C12.5323 22.9797 12.8818 23.4292 13.2812 23.8787C13.4809 24.1035 13.6806 24.3033 13.8803 24.528C14.08 24.7528 14.2797 24.9525 14.5044 25.1773C14.9537 25.5768 15.3781 26.0014 15.8524 26.4009L16.5514 26.9753C16.801 27.1501 17.0257 27.3249 17.2753 27.5247C18.2489 28.2489 19.2724 28.8732 20.2709 29.4226C20.7952 29.6723 21.2944 29.947 21.8186 30.1717C22.0683 30.2966 22.3179 30.3965 22.5925 30.4964C22.8421 30.5963 23.1167 30.6962 23.3664 30.796C23.616 30.8959 23.8656 30.9958 24.1153 31.0707C24.3649 31.1457 24.6145 31.2455 24.8642 31.3205C25.3634 31.4703 25.8377 31.6201 26.312 31.72C27.2606 31.9697 28.1593 32.1196 28.9831 32.2444C30.6557 32.4692 32.0286 32.5191 33.0022 32.4942C33.9758 32.4692 34.5 32.4192 34.5 32.4192C34.5 32.4192 33.9508 32.3443 33.0521 32.0946C32.1285 31.8449 30.8554 31.4453 29.4075 30.796C28.6836 30.4714 27.9097 30.0968 27.1358 29.6473C26.7364 29.4226 26.362 29.1728 25.9626 28.9231C25.7628 28.7983 25.5631 28.6484 25.3884 28.5236C25.1887 28.3987 24.989 28.2489 24.8142 28.099C24.6145 27.9492 24.4398 27.7994 24.2401 27.6745C24.0653 27.5247 23.8656 27.3748 23.6659 27.2C23.2915 26.9004 22.942 26.5508 22.5675 26.2261C21.8686 25.5269 21.1946 24.8027 20.5954 24.0286L20.1461 23.4542L19.7217 22.8049C19.4471 22.4054 19.2225 21.9808 18.9728 21.5813C18.848 21.3815 18.7482 21.1817 18.6233 20.957C18.5235 20.7572 18.4236 20.5324 18.2988 20.3327C18.0991 19.9331 17.9244 19.4836 17.7496 19.0841C17.4251 18.26 17.1256 17.4359 16.9258 16.6617C16.8759 16.462 16.801 16.2872 16.7511 16.0874C16.7012 15.8876 16.6762 15.7128 16.6263 15.513C16.5514 15.1384 16.4515 14.7888 16.4016 14.4392C16.2768 13.74 16.2019 12.7661 16.152 12.1917L21.0947 11.2927L8.8627 0.404811Z" fill="#C99B36" />
                <path d="M7.06534 0.404812L0.499999 15.0885L5.64244 14.1395C5.74229 14.3643 5.84214 14.614 5.942 14.8637C6.21659 15.563 6.59104 16.3371 6.99045 17.1612C7.19016 17.5857 7.43979 18.0102 7.66446 18.4348C7.78928 18.6595 7.9141 18.8843 8.03891 19.109C8.16373 19.3338 8.31351 19.5585 8.46329 19.7833C9.01248 20.6823 9.66153 21.6063 10.3605 22.5053C10.7349 22.9548 11.0844 23.4043 11.4838 23.8538C11.6836 24.0785 11.8833 24.2783 12.083 24.503C12.2827 24.7278 12.4824 24.9276 12.707 25.1523C13.1564 25.5519 13.5808 25.9764 14.0551 26.376L14.754 26.9503C15.0037 27.1251 15.2283 27.2999 15.478 27.4997C16.4515 28.2239 17.475 28.8482 18.4736 29.3976C18.9978 29.6473 19.4971 29.922 20.0213 30.1468C20.2709 30.2716 20.5206 30.3715 20.7952 30.4714C21.0448 30.5713 21.3194 30.6712 21.569 30.7711C21.8187 30.871 22.0683 30.9708 22.3179 31.0458C22.5675 31.1207 22.8172 31.2206 23.0668 31.2955C23.5661 31.4453 24.0404 31.5952 24.5147 31.695C25.4633 31.9448 26.362 32.0946 27.1858 32.2195C28.8583 32.4442 30.2313 32.4942 31.2048 32.4692C32.1784 32.4442 32.7026 32.3943 32.7026 32.3943C32.7026 32.3943 32.1535 32.3193 31.2548 32.0696C30.3311 31.8199 29.058 31.4203 27.6101 30.7711C26.8862 30.4464 26.1123 30.0718 25.3385 29.6223C24.9391 29.3976 24.5646 29.1479 24.1652 28.8982C23.9655 28.7733 23.7658 28.6235 23.591 28.4986C23.3913 28.3737 23.1916 28.2239 23.0169 28.0741C22.8172 27.9242 22.6424 27.7744 22.4427 27.6495C22.268 27.4997 22.0683 27.3499 21.8686 27.1751C21.4941 26.8754 21.1446 26.5258 20.7702 26.2011C20.0712 25.5019 19.3972 24.7777 18.7981 24.0036L18.3488 23.4292L17.9493 22.8299C17.6747 22.4303 17.4501 22.0058 17.2004 21.6063C17.0756 21.4065 16.9758 21.2067 16.851 20.9819C16.7511 20.7822 16.6512 20.5574 16.5264 20.3576C16.3267 19.9581 16.152 19.5086 15.9772 19.109C15.6527 18.2849 15.3532 17.4609 15.1535 16.6867C15.1035 16.4869 15.0286 16.3121 14.9787 16.1124C14.9288 15.9126 14.9038 15.7378 14.8539 15.538C14.779 15.1634 14.6791 14.8138 14.6292 14.4642C14.5044 13.765 14.4046 13.1407 14.3546 12.5413L19.3473 11.6174L7.06534 0.404812Z" fill="#F7CA41" />
                <path d="M67.1373 32.5952L68.9097 32.5952L68.5602 18.8355C68.4604 18.6107 68.3605 18.361 68.2606 18.1113C67.986 17.4121 67.6116 16.6379 67.2122 15.8138C67.0125 15.3893 66.7628 14.9648 66.5382 14.5403C66.4134 14.3155 66.2885 14.0907 66.1637 13.866C66.0389 13.6412 65.8891 13.4165 65.7394 13.1917C65.1902 12.2927 64.5411 11.3688 63.8421 10.4698C63.4677 10.0203 63.1182 9.57077 62.7188 9.12127C62.5191 8.89652 62.3194 8.69674 62.1197 8.47199C61.92 8.24724 61.7203 8.04746 61.4956 7.82271C61.0463 7.42316 60.6219 6.99863 60.1476 6.59907L59.4486 6.02471C59.199 5.84991 58.9743 5.6751 58.7247 5.47532C57.7511 4.75113 56.7276 4.12682 55.7291 3.57743C55.2048 3.32771 54.7056 3.05301 54.1814 2.82826C53.9317 2.7034 53.6821 2.60351 53.4075 2.50362C53.1579 2.40373 52.8833 2.30385 52.6336 2.20396C52.384 2.10407 52.1344 2.00418 51.8847 1.92926C51.6351 1.85434 51.3855 1.75446 51.1358 1.67954C50.6366 1.52971 50.1623 1.37987 49.688 1.27998C48.7394 1.03026 47.8407 0.880427 47.0169 0.755565C45.3443 0.530815 43.9714 0.48087 42.9978 0.505843C42.0242 0.530815 41.5 0.580759 41.5 0.580759C41.5 0.580759 42.0492 0.655676 42.9479 0.905398C43.8715 1.15512 45.1446 1.55468 46.5925 2.20396C47.3164 2.5286 48.0903 2.90318 48.8642 3.35268C49.2636 3.57743 49.638 3.82715 50.0374 4.07688C50.2372 4.20174 50.4369 4.35157 50.6116 4.47643C50.8113 4.60129 51.011 4.75113 51.1858 4.90096C51.3855 5.05079 51.5602 5.20063 51.7599 5.32549C51.9347 5.47532 52.1344 5.62516 52.3341 5.79996C52.7085 6.09963 53.058 6.44924 53.4325 6.77388C54.1314 7.4731 54.8054 8.1973 55.4046 8.97144L55.8539 9.5458L56.2783 10.1951C56.5529 10.5946 56.7775 11.0192 57.0272 11.4187C57.152 11.6185 57.2518 11.8183 57.3767 12.043C57.4765 12.2428 57.5764 12.4676 57.7012 12.6673C57.9009 13.0669 58.0756 13.5164 58.2504 13.9159C58.5749 14.74 58.8744 15.5641 59.0742 16.3383C59.1241 16.538 59.199 16.7128 59.2489 16.9126C59.2988 17.1124 59.3238 17.2872 59.3737 17.487C59.4486 17.8616 59.5485 18.2112 59.5984 18.5608C59.7232 19.26 59.7981 20.2339 59.848 20.8083L54.9053 21.7073L67.1373 32.5952Z" fill="#C99B36" />
                <path d="M68.9347 32.5952L75.5 17.9115L70.3576 18.8605C70.2577 18.6357 70.1579 18.386 70.058 18.1363C69.7834 17.437 69.409 16.6629 69.0095 15.8388C68.8098 15.4143 68.5602 14.9898 68.3355 14.5652C68.2107 14.3405 68.0859 14.1157 67.9611 13.891C67.8363 13.6662 67.6865 13.4415 67.5367 13.2167C66.9875 12.3177 66.3385 11.3937 65.6395 10.4947C65.2651 10.0452 64.9156 9.59574 64.5162 9.14624C64.3164 8.92149 64.1167 8.72171 63.917 8.49696C63.7173 8.27221 63.5176 8.07244 63.293 7.84769C62.8436 7.44813 62.4192 7.0236 61.9449 6.62405L61.246 6.04968C60.9963 5.87488 60.7717 5.70007 60.522 5.50029C59.5485 4.7761 58.525 4.15179 57.5264 3.6024C57.0022 3.35268 56.5029 3.07798 55.9787 2.85323C55.7291 2.72837 55.4794 2.62848 55.2048 2.5286C54.9552 2.42871 54.6806 2.32882 54.431 2.22893C54.1813 2.12904 53.9317 2.02915 53.6821 1.95423C53.4325 1.87932 53.1828 1.77943 52.9332 1.70451C52.4339 1.55468 51.9596 1.40484 51.4853 1.30496C50.5367 1.05523 49.638 0.905399 48.8142 0.780537C47.1417 0.555787 45.7687 0.505842 44.7952 0.530815C43.8216 0.555787 43.2974 0.605731 43.2974 0.605731C43.2974 0.605731 43.8465 0.680649 44.7452 0.930371C45.6689 1.18009 46.942 1.57965 48.3899 2.22893C49.1138 2.55357 49.8877 2.92815 50.6615 3.37765C51.0609 3.6024 51.4354 3.85212 51.8348 4.10185C52.0345 4.22671 52.2342 4.37654 52.409 4.5014C52.6087 4.62627 52.8084 4.7761 52.9831 4.92593C53.1828 5.07577 53.3576 5.2256 53.5573 5.35046C53.732 5.50029 53.9317 5.65013 54.1314 5.82493C54.5059 6.1246 54.8554 6.47421 55.2298 6.79885C55.9288 7.49807 56.6028 8.22227 57.2019 8.99641L57.6512 9.57077L58.0507 10.1701C58.3253 10.5697 58.5499 10.9942 58.7996 11.3937C58.9244 11.5935 59.0242 11.7933 59.149 12.0181C59.2489 12.2178 59.3488 12.4426 59.4736 12.6424C59.6733 13.0419 59.848 13.4914 60.0228 13.891C60.3473 14.7151 60.6468 15.5391 60.8465 16.3133C60.8965 16.5131 60.9714 16.6879 61.0213 16.8876C61.0712 17.0874 61.0962 17.2622 61.1461 17.462C61.221 17.8366 61.3209 18.1862 61.3708 18.5358C61.4956 19.235 61.5954 19.8593 61.6454 20.4587L56.6527 21.3826L68.9347 32.5952Z" fill="#F7CA41" />
                <g clipPath="url(#clip0_2691_15937)">
                    <path d="M45.3112 6.8916H38H30.6888L24.5 12.8705L38 30.5001L51.5 12.8705L45.3112 6.8916Z" fill="#5575A6" />
                    <path d="M24.5 12.8706H33.1419L38 30.5002L24.5 12.8706Z" fill="#3F587E" />
                    <path d="M51.5 12.8706H42.8581L38 30.5002L51.5 12.8706Z" fill="#3F587E" />
                    <path d="M45.311 6.8916H30.6887L33.1418 12.8705H42.858L45.311 6.8916Z" fill="#3F587E" />
                    <path d="M32.9175 10.1558L33.632 12.1019L35.5629 12.822L33.632 13.5421L32.9175 15.4883L32.2029 13.5421L30.272 12.822L32.2029 12.1019L32.9175 10.1558Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_2691_15937">
                        <rect width="27" height="26" fill="white" transform="translate(24.5 4.5)" />
                    </clipPath>
                </defs>
            </svg>

        )
    }
    if (type === 'tabdile_almas') {
        return (
            <svg width="88" height="63" viewBox="0 0 88 63" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2691_15948)">
                    <path d="M57.3931 4.875H42.5H27.6069L15 17.0627L42.5 52.9999L70 17.0627L57.3931 4.875Z" fill="#49B8E8" />
                    <path d="M15 17.0625H32.6039L42.5 52.9997L15 17.0625Z" fill="#2984AB" />
                    <path d="M70 17.0625H52.3961L42.5 52.9997L70 17.0625Z" fill="#2984AB" />
                    <path d="M57.3932 4.875H27.6069L32.604 17.0627H52.3961L57.3932 4.875Z" fill="#2984AB" />
                    <path d="M32.1468 11.5288L33.6023 15.4959L37.5357 16.9639L33.6023 18.4318L32.1468 22.3989L30.6913 18.4318L26.7578 16.9639L30.6913 15.4959L32.1468 11.5288Z" fill="white" />
                </g>
                <path d="M69.5199 46.9021C67.6191 45.7724 64.7327 45.0664 61.4943 45.0664C58.2559 45.0664 55.3695 45.7724 53.4687 46.9021H51.1807V50.0087C51.1807 52.727 55.7919 54.951 61.4591 54.951C67.1263 54.951 71.7375 52.727 71.7375 50.0087V46.9021H69.5199Z" fill="#C99B36" />
                <path d="M61.4942 51.8446C67.1708 51.8446 71.7726 49.6318 71.7726 46.9023C71.7726 44.1727 67.1708 41.96 61.4942 41.96C55.8176 41.96 51.2158 44.1727 51.2158 46.9023C51.2158 49.6318 55.8176 51.8446 61.4942 51.8446Z" fill="#F7CA41" />
                <path d="M58.1501 47.8554C58.6077 47.9613 59.0653 48.0319 59.4525 48.0672C59.8397 48.1025 60.1917 48.1378 60.4733 48.1378C60.7197 48.1378 60.9309 48.1025 61.1069 48.0672C61.2829 47.9966 61.3885 47.926 61.3885 47.82C61.3885 47.7847 61.3885 47.7847 61.3533 47.7494C61.3533 47.7141 61.3181 47.7141 61.2829 47.6788C61.2477 47.6435 61.2125 47.6435 61.1773 47.6082C61.1421 47.5729 61.0717 47.5376 61.0365 47.5376C61.0013 47.5023 60.8605 47.4317 60.5789 47.3258C59.8045 46.9728 59.3117 46.7257 59.0653 46.5845C58.8541 46.4786 58.7133 46.3374 58.6077 46.1961C58.5021 46.0549 58.4317 45.9137 58.4317 45.7725C58.4317 45.6666 58.4669 45.5607 58.5373 45.4548C58.6077 45.3489 58.7133 45.243 58.8189 45.1724C58.9597 45.0665 59.1005 44.9959 59.2765 44.9253C59.4525 44.8547 59.6285 44.7841 59.8397 44.7488C60.0509 44.7135 60.3677 44.6429 60.7549 44.6076C60.7549 44.537 60.7549 44.5017 60.7549 44.4663V44.2545V43.8662C61.2829 43.8662 61.7053 43.8662 62.0573 43.8662C62.4445 43.8662 62.8669 43.8662 63.3597 43.8662C63.3245 44.1133 63.3245 44.2545 63.3245 44.3251V44.537C63.7821 44.5723 64.2749 44.6076 64.7325 44.6782C64.7677 45.0665 64.8029 45.4195 64.8733 45.8431C64.4861 45.7725 64.1341 45.7019 63.8173 45.6666C63.5005 45.6313 63.2189 45.596 63.0077 45.596C62.7613 45.596 62.5501 45.6313 62.4093 45.6666C62.2333 45.7372 62.1629 45.8078 62.1629 45.8784C62.1629 45.949 62.1981 46.0196 62.3037 46.0902C62.4093 46.1608 62.5149 46.2315 62.6909 46.3021C63.3245 46.5845 63.7821 46.7963 64.0637 46.9728C64.3453 47.1493 64.5565 47.2905 64.6973 47.467C64.8029 47.6082 64.8733 47.7494 64.8733 47.926C64.8733 48.0319 64.8381 48.1731 64.7677 48.279C64.6973 48.3849 64.5917 48.4908 64.4861 48.5614C64.3453 48.6673 64.2045 48.7379 64.0637 48.8085C63.8877 48.8791 63.7469 48.9497 63.5709 48.985C63.3949 49.0203 63.1485 49.0909 62.7965 49.1615V49.5852C62.7965 49.7264 62.7965 49.8676 62.7965 50.0088C62.2685 50.0088 61.8461 50.0088 61.5645 50.0088C61.2477 50.0088 60.7901 50.0088 60.2269 50.0088C60.2621 49.8323 60.2621 49.6558 60.2621 49.4086V49.2674C59.8749 49.2321 59.5581 49.2321 59.2765 49.1968C59.0301 49.1615 58.7133 49.1262 58.3261 49.0556C58.2557 48.4555 58.1853 48.0672 58.1501 47.8554Z" fill="#FFFAD1" />
                <path d="M69.5199 42.948C67.6191 41.8183 64.7327 41.1123 61.4943 41.1123C58.2559 41.1123 55.3695 41.8183 53.4687 42.948H51.1807V46.0546C51.1807 48.7729 55.7919 50.9969 61.4591 50.9969C67.1263 50.9969 71.7375 48.7729 71.7375 46.0546V42.948H69.5199Z" fill="#C99B36" />
                <path d="M61.4942 47.8904C67.1708 47.8904 71.7726 45.6777 71.7726 42.9482C71.7726 40.2186 67.1708 38.0059 61.4942 38.0059C55.8176 38.0059 51.2158 40.2186 51.2158 42.9482C51.2158 45.6777 55.8176 47.8904 61.4942 47.8904Z" fill="#F7CA41" />
                <path d="M58.1501 43.9012C58.6077 44.0072 59.0653 44.0778 59.4525 44.1131C59.8397 44.1837 60.1917 44.1837 60.4733 44.1837C60.7197 44.1837 60.9309 44.1484 61.1069 44.1131C61.2829 44.0425 61.3885 43.9718 61.3885 43.8659C61.3885 43.8306 61.3885 43.8306 61.3533 43.7953C61.3533 43.76 61.3181 43.76 61.2829 43.7247C61.2477 43.6894 61.2125 43.6894 61.1773 43.6541C61.1421 43.6188 61.0717 43.5835 61.0365 43.5835C61.0013 43.5482 60.8605 43.4776 60.5789 43.3717C59.8045 43.0187 59.3117 42.7716 59.0653 42.6304C58.8541 42.5245 58.7133 42.3833 58.6077 42.242C58.5021 42.1008 58.4317 41.9596 58.4317 41.8184C58.4317 41.7125 58.4669 41.6066 58.5373 41.5007C58.6077 41.3948 58.7133 41.2889 58.8189 41.2183C58.9597 41.1124 59.1005 41.0418 59.2765 40.9712C59.4525 40.9006 59.6285 40.83 59.8397 40.7947C60.0509 40.7594 60.3677 40.6888 60.7549 40.6535C60.7549 40.5828 60.7549 40.5475 60.7549 40.5122V40.3004V39.9121C61.2829 39.9121 61.7053 39.9121 62.0573 39.9121C62.4445 39.9121 62.8669 39.9121 63.3597 39.9121C63.3245 40.1592 63.3245 40.3004 63.3245 40.371V40.6535C63.7821 40.6888 64.2749 40.7241 64.7325 40.7947C64.7677 41.183 64.8029 41.536 64.8733 41.9596C64.4861 41.889 64.1341 41.8184 63.8173 41.7831C63.5005 41.7478 63.2189 41.7125 63.0077 41.7125C62.7613 41.7125 62.5501 41.7478 62.4093 41.7831C62.2333 41.8537 62.1629 41.9243 62.1629 41.9949C62.1629 42.0655 62.1981 42.1361 62.3037 42.2067C62.4093 42.2774 62.5149 42.348 62.6909 42.4186C63.3245 42.701 63.7821 42.9128 64.0637 43.0893C64.3453 43.2658 64.5565 43.407 64.6973 43.5835C64.8029 43.7247 64.8733 43.8659 64.8733 44.0425C64.8733 44.1484 64.8381 44.2896 64.7677 44.3955C64.6973 44.5014 64.5917 44.6073 64.4861 44.6779C64.3453 44.7838 64.2045 44.8544 64.0637 44.925C63.8877 44.9956 63.7469 45.0662 63.5709 45.1015C63.3949 45.1368 63.1485 45.2074 62.7965 45.278V45.7017C62.7965 45.8429 62.7965 45.9841 62.7965 46.1253C62.2685 46.1253 61.8461 46.1253 61.5645 46.1253C61.2477 46.1253 60.7901 46.1253 60.2269 46.1253C60.2621 45.9488 60.2621 45.7723 60.2621 45.5251V45.3839C59.8749 45.3486 59.5581 45.3486 59.2765 45.3133C59.0301 45.278 58.7133 45.2427 58.3261 45.1721C58.2557 44.5014 58.1853 44.1131 58.1501 43.9012Z" fill="#FFFAD1" />
                <path d="M69.5199 38.9944C67.6191 37.8647 64.7327 37.1587 61.4943 37.1587C58.2559 37.1587 55.3695 37.8647 53.4687 38.9944H51.1807V42.101C51.1807 44.8192 55.7919 47.0433 61.4591 47.0433C67.1263 47.0433 71.7375 44.8192 71.7375 42.101V38.9944H69.5199Z" fill="#C99B36" />
                <path d="M71.8078 38.9945C71.8078 41.7128 67.1966 43.9368 61.5294 43.9368C55.8622 43.9368 51.251 41.7128 51.251 38.9945C51.251 36.2763 55.8622 34.0522 61.5294 34.0522C67.1966 34.0522 71.8078 36.2763 71.8078 38.9945Z" fill="#F7CA41" />
                <path d="M58.1501 39.9476C58.6077 40.0535 59.0653 40.1241 59.4525 40.1594C59.8397 40.1947 60.1917 40.2301 60.4733 40.2301C60.7197 40.2301 60.9309 40.1947 61.1069 40.1594C61.2829 40.0888 61.3885 40.0182 61.3885 39.9123C61.3885 39.877 61.3885 39.877 61.3533 39.8417C61.3533 39.8064 61.3181 39.8064 61.2829 39.7711C61.2477 39.7358 61.2125 39.7358 61.1773 39.7005C61.1421 39.6652 61.0717 39.6299 61.0365 39.6299C61.0013 39.5946 60.8605 39.524 60.5789 39.4181C59.8045 39.0651 59.3117 38.818 59.0653 38.6768C58.8541 38.5709 58.7133 38.4296 58.6077 38.2884C58.5021 38.1472 58.4317 38.006 58.4317 37.8648C58.4317 37.7589 58.4669 37.653 58.5373 37.5471C58.6077 37.4412 58.7133 37.3353 58.8189 37.2647C58.9597 37.1588 59.1005 37.0882 59.2765 37.0176C59.4525 36.947 59.6285 36.8764 59.8397 36.841C60.0509 36.8057 60.3677 36.7351 60.7549 36.6998C60.7549 36.6292 60.7549 36.5939 60.7549 36.5586V36.3468V35.9585C61.2829 35.9585 61.7053 35.9585 62.0573 35.9585C62.4445 35.9585 62.8669 35.9585 63.3597 35.9585C63.3245 36.2056 63.3245 36.3468 63.3245 36.4174V36.6998C63.7821 36.7351 64.2749 36.7704 64.7325 36.841C64.7677 37.2294 64.8029 37.5824 64.8733 38.006C64.4861 37.9354 64.1341 37.8648 63.8173 37.8295C63.5005 37.7942 63.2189 37.7589 63.0077 37.7589C62.7613 37.7589 62.5501 37.7942 62.4093 37.8295C62.2333 37.9001 62.1629 37.9707 62.1629 38.0413C62.1629 38.1119 62.1981 38.1825 62.3037 38.2531C62.4093 38.3237 62.5149 38.3943 62.6909 38.4649C63.3245 38.7474 63.7821 38.9592 64.0637 39.1357C64.3453 39.3122 64.5565 39.4534 64.6973 39.6299C64.8029 39.7711 64.8733 39.9123 64.8733 40.0888C64.8733 40.1947 64.8381 40.336 64.7677 40.4419C64.6973 40.5478 64.5917 40.6537 64.4861 40.7243C64.3453 40.8302 64.2045 40.9008 64.0637 40.9714C63.8877 41.042 63.7469 41.1126 63.5709 41.1479C63.3949 41.1832 63.1485 41.2538 62.7965 41.3244V41.748C62.7965 41.8892 62.7965 42.0305 62.7965 42.1717C62.2685 42.1717 61.8461 42.1717 61.5645 42.1717C61.2477 42.1717 60.7901 42.1717 60.2269 42.1717C60.2621 41.9952 60.2621 41.8186 60.2621 41.5715V41.3597C59.8749 41.3244 59.5581 41.3244 59.2765 41.2891C59.0301 41.2538 58.7133 41.2185 58.3261 41.1479C58.2557 40.5831 58.1853 40.1947 58.1501 39.9476Z" fill="#FFFAD1" />
                <path d="M69.5199 35.0755C67.6191 33.9458 64.7327 33.2397 61.4943 33.2397C58.2559 33.2397 55.3695 33.9458 53.4687 35.0755H51.1807V38.182C51.1807 40.9003 55.7919 43.1243 61.4591 43.1243C67.1263 43.1243 71.7375 40.9003 71.7375 38.182V35.0755H69.5199Z" fill="#C99B36" />
                <path d="M71.8078 35.0756C71.8078 37.7939 67.1966 40.0179 61.5294 40.0179C55.8622 40.0179 51.251 37.7939 51.251 35.0756C51.251 32.3573 55.8622 30.1333 61.5294 30.1333C67.1966 30.1333 71.8078 32.322 71.8078 35.0756Z" fill="#F7CA41" />
                <path d="M58.1501 36.0287C58.6077 36.1346 59.0653 36.2052 59.4525 36.2405C59.8397 36.2758 60.1917 36.3111 60.4733 36.3111C60.7197 36.3111 60.9309 36.2758 61.1069 36.2405C61.2829 36.1699 61.3885 36.0993 61.3885 35.9934C61.3885 35.9581 61.3885 35.9581 61.3533 35.9228C61.3533 35.8875 61.3181 35.8875 61.2829 35.8522C61.2477 35.8169 61.2125 35.8169 61.1773 35.7816C61.1421 35.7463 61.0717 35.711 61.0365 35.711C61.0013 35.6757 60.8605 35.6051 60.5789 35.4992C59.8045 35.1461 59.3117 34.899 59.0653 34.7578C58.8541 34.6519 58.7133 34.5107 58.6077 34.3695C58.5021 34.2283 58.4317 34.0871 58.4317 33.9459C58.4317 33.84 58.4669 33.7341 58.5373 33.6281C58.6077 33.5222 58.7133 33.4163 58.8189 33.3457C58.9597 33.2398 59.1005 33.1692 59.2765 33.0986C59.4525 33.028 59.6285 32.9574 59.8397 32.9221C60.0509 32.8868 60.3677 32.8162 60.7549 32.7809C60.7549 32.7103 60.7549 32.675 60.7549 32.6397V32.4279V32.0396C61.2829 32.0396 61.7053 32.0396 62.0573 32.0396C62.4445 32.0396 62.8669 32.0396 63.3597 32.0396C63.3245 32.2867 63.3245 32.4279 63.3245 32.4985V32.7809C63.7821 32.8162 64.2749 32.8515 64.7325 32.9221C64.7677 33.3104 64.8029 33.6634 64.8733 34.0871C64.4861 34.0165 64.1341 33.9459 63.8173 33.9106C63.5005 33.8753 63.2189 33.84 63.0077 33.84C62.7613 33.84 62.5501 33.8753 62.4093 33.9106C62.2333 33.9812 62.1629 34.0518 62.1629 34.1224C62.1629 34.193 62.1981 34.2636 62.3037 34.3342C62.4093 34.4048 62.5149 34.4754 62.6909 34.546C63.3245 34.8284 63.7821 35.0402 64.0637 35.2167C64.3453 35.3933 64.5565 35.5345 64.6973 35.711C64.8029 35.8522 64.8733 35.9934 64.8733 36.1699C64.8733 36.2758 64.8381 36.417 64.7677 36.5229C64.6973 36.6288 64.5917 36.7347 64.4861 36.8053C64.3453 36.9112 64.2045 36.9818 64.0637 37.0525C63.8877 37.1231 63.7469 37.1937 63.5709 37.229C63.3949 37.2643 63.1485 37.3349 62.7965 37.4055V37.8291C62.7965 37.9703 62.7965 38.1115 62.7965 38.2527C62.2685 38.2527 61.8461 38.2527 61.5645 38.2527C61.2477 38.2527 60.7901 38.2527 60.2269 38.2527C60.2621 38.0762 60.2621 37.8997 60.2621 37.6526V37.5114C59.8749 37.4761 59.5581 37.4761 59.2765 37.4408C59.0301 37.4055 58.7133 37.3702 58.3261 37.2996C58.2557 36.6288 58.1853 36.2405 58.1501 36.0287Z" fill="#FFFAD1" />
                <path d="M69.5199 31.1218C67.6191 29.9922 64.7327 29.2861 61.4943 29.2861C58.2559 29.2861 55.3695 29.9922 53.4687 31.1218H51.1807V34.2284C51.1807 36.9467 55.7919 39.1707 61.4591 39.1707C67.1263 39.1707 71.7375 36.9467 71.7375 34.2284V31.1218H69.5199Z" fill="#C99B36" />
                <path d="M71.8078 31.122C71.8078 33.8402 67.1966 36.0643 61.5294 36.0643C55.8622 36.0643 51.251 33.8402 51.251 31.122C51.251 28.4037 55.8622 26.1797 61.5294 26.1797C67.1966 26.1797 71.8078 28.4037 71.8078 31.122Z" fill="#F7CA41" />
                <path d="M58.1501 32.0751C58.6077 32.181 59.0653 32.2516 59.4525 32.2869C59.8397 32.3222 60.1917 32.3575 60.4733 32.3575C60.7197 32.3575 60.9309 32.3222 61.1069 32.2869C61.2829 32.2163 61.3885 32.1457 61.3885 32.0398C61.3885 32.0045 61.3885 32.0045 61.3533 31.9692C61.3533 31.9339 61.3181 31.9339 61.2829 31.8986C61.2477 31.8633 61.2125 31.8633 61.1773 31.828C61.1421 31.7927 61.0717 31.7574 61.0365 31.7574C61.0013 31.7221 60.8605 31.6514 60.5789 31.5455C59.8045 31.1925 59.3117 30.9454 59.0653 30.8042C58.8541 30.6983 58.7133 30.5571 58.6077 30.4159C58.5021 30.2747 58.4317 30.1335 58.4317 29.9923C58.4317 29.8863 58.4669 29.7804 58.5373 29.6745C58.6077 29.5686 58.7133 29.4627 58.8189 29.3921C58.9597 29.2862 59.1005 29.2156 59.2765 29.145C59.4525 29.0744 59.6285 29.0038 59.8397 28.9685C60.0509 28.9332 60.3677 28.8626 60.7549 28.8273C60.7549 28.7567 60.7549 28.7214 60.7549 28.6861V28.4743V28.0859C61.2829 28.0859 61.7053 28.0859 62.0573 28.0859C62.4445 28.0859 62.8669 28.0859 63.3597 28.0859C63.3245 28.3331 63.3245 28.4743 63.3245 28.5449V28.8273C63.7821 28.8626 64.2749 28.8979 64.7325 28.9685C64.7677 29.3568 64.8029 29.7098 64.8733 30.1335C64.4861 30.0629 64.1341 29.9923 63.8173 29.9569C63.5005 29.9216 63.2189 29.8863 63.0077 29.8863C62.7613 29.8863 62.5501 29.9216 62.4093 29.9569C62.2333 30.0276 62.1629 30.0982 62.1629 30.1688C62.1629 30.2394 62.1981 30.31 62.3037 30.3806C62.4093 30.4512 62.5149 30.5218 62.6909 30.5924C63.3245 30.8748 63.7821 31.0866 64.0637 31.2631C64.3453 31.4396 64.5565 31.5808 64.6973 31.7574C64.8029 31.8986 64.8733 32.0398 64.8733 32.2163C64.8733 32.3222 64.8381 32.4634 64.7677 32.5693C64.6973 32.6752 64.5917 32.7811 64.4861 32.8517C64.3453 32.9576 64.2045 33.0282 64.0637 33.0988C63.8877 33.1694 63.7469 33.24 63.5709 33.2753C63.3949 33.3106 63.1485 33.3813 62.7965 33.4519V33.8755C62.7965 34.0167 62.7965 34.1579 62.7965 34.2991C62.2685 34.2991 61.8461 34.2991 61.5645 34.2991C61.2477 34.2991 60.7901 34.2991 60.2269 34.2991C60.2621 34.1226 60.2621 33.9461 60.2621 33.699V33.5578C59.8749 33.5225 59.5581 33.5225 59.2765 33.4872C59.0301 33.4519 58.7133 33.4166 58.3261 33.346C58.2557 32.6752 58.1853 32.2869 58.1501 32.0751Z" fill="#FFFAD1" />
                <path d="M85.712 50.2913C83.8112 49.1616 80.9248 48.4556 77.6864 48.4556C74.448 48.4556 71.5616 49.1616 69.6608 50.2913H67.3728V53.3979C67.3728 56.1161 71.984 58.3402 77.6512 58.3402C83.3184 58.3402 87.9296 56.1161 87.9296 53.3979V50.2913H85.712Z" fill="#C99B36" />
                <path d="M87.9999 50.2914C87.9999 53.0097 83.3887 55.2337 77.7215 55.2337C72.0543 55.2337 67.4431 53.0097 67.4431 50.2914C67.4431 47.5732 72.0543 45.3491 77.7215 45.3491C83.3887 45.3491 87.9999 47.5732 87.9999 50.2914Z" fill="#F7CA41" />
                <path d="M74.3774 51.2445C74.835 51.3504 75.2926 51.421 75.6798 51.4563C76.067 51.4916 76.419 51.5269 76.7006 51.5269C76.947 51.5269 77.1582 51.4916 77.3342 51.4563C77.5102 51.3857 77.6158 51.3151 77.6158 51.2092C77.6158 51.1739 77.6158 51.1739 77.5806 51.1386C77.5806 51.1033 77.5454 51.1033 77.5102 51.068C77.475 51.0327 77.4398 51.0327 77.4046 50.9974C77.3694 50.9621 77.299 50.9268 77.2638 50.9268C77.2286 50.8915 77.0878 50.8209 76.8062 50.715C76.0318 50.362 75.539 50.1148 75.2926 49.9736C75.0814 49.8677 74.9406 49.7265 74.835 49.5853C74.7294 49.4441 74.659 49.3029 74.659 49.1617C74.659 49.0558 74.6942 48.9499 74.7646 48.844C74.835 48.7381 74.9406 48.6322 75.0462 48.5616C75.187 48.4556 75.3278 48.385 75.5038 48.3144C75.6798 48.2438 75.8558 48.1732 76.067 48.1379C76.2782 48.1026 76.595 48.032 76.9822 47.9967C76.9822 47.9261 76.9822 47.8908 76.9822 47.8555V47.6437V47.2554C77.5102 47.2554 77.9326 47.2554 78.2846 47.2554C78.6718 47.2554 79.0942 47.2554 79.587 47.2554C79.5518 47.5025 79.5518 47.6437 79.5518 47.7143V47.9967C80.0094 48.032 80.5022 48.0673 80.9598 48.1379C80.995 48.5262 81.0302 48.8793 81.1006 49.3029C80.7134 49.2323 80.3614 49.1617 80.0446 49.1264C79.7278 49.0911 79.4462 49.0558 79.235 49.0558C78.9886 49.0558 78.7774 49.0911 78.6366 49.1264C78.4606 49.197 78.3902 49.2676 78.3902 49.3382C78.3902 49.4088 78.4254 49.4794 78.531 49.55C78.6366 49.6206 78.7422 49.6912 78.9182 49.7618C79.5518 50.0442 80.0094 50.256 80.291 50.4326C80.5726 50.6091 80.7838 50.7503 80.9246 50.9268C81.0302 51.068 81.1006 51.2092 81.1006 51.3857C81.1006 51.4916 81.0654 51.6328 80.995 51.7387C80.9246 51.8446 80.819 51.9506 80.7134 52.0212C80.5726 52.1271 80.4318 52.1977 80.291 52.2683C80.115 52.3389 79.9742 52.4095 79.7982 52.4448C79.6222 52.4801 79.3758 52.5507 79.0238 52.6213V53.0449C79.0238 53.1861 79.0238 53.3273 79.0238 53.4685C78.4958 53.4685 78.0734 53.4685 77.7918 53.4685C77.475 53.4685 77.0174 53.4685 76.4542 53.4685C76.4894 53.292 76.4894 53.1155 76.4894 52.8684V52.6566C76.1022 52.6213 75.7854 52.6213 75.5038 52.586C75.2574 52.5507 74.9406 52.5154 74.5534 52.4448C74.4478 51.8446 74.4126 51.4563 74.3774 51.2445Z" fill="#FFFAD1" />
                <path d="M85.712 46.3372C83.8112 45.2075 80.9248 44.5015 77.6864 44.5015C74.448 44.5015 71.5616 45.2075 69.6608 46.3372H67.3728V49.4438C67.3728 52.162 71.984 54.3861 77.6512 54.3861C83.3184 54.3861 87.9296 52.162 87.9296 49.4438V46.3372H85.712Z" fill="#C99B36" />
                <path d="M87.9999 46.3373C87.9999 49.0556 83.3887 51.2796 77.7215 51.2796C72.0543 51.2796 67.4431 49.0556 67.4431 46.3373C67.4431 43.6191 72.0543 41.395 77.7215 41.395C83.3887 41.395 87.9999 43.6191 87.9999 46.3373Z" fill="#F7CA41" />
                <path d="M74.3774 47.2904C74.835 47.3963 75.2926 47.4669 75.6798 47.5022C76.067 47.5375 76.419 47.5728 76.7006 47.5728C76.947 47.5728 77.1582 47.5375 77.3342 47.5022C77.5102 47.4316 77.6158 47.361 77.6158 47.2551C77.6158 47.2198 77.6158 47.2198 77.5806 47.1845C77.5806 47.1492 77.5454 47.1492 77.5102 47.1139C77.475 47.0786 77.4398 47.0786 77.4046 47.0433C77.3694 47.008 77.299 46.9727 77.2638 46.9727C77.2286 46.9374 77.0878 46.8668 76.8062 46.7609C76.0318 46.4079 75.539 46.1607 75.2926 46.0195C75.0814 45.9136 74.9406 45.7724 74.835 45.6312C74.7294 45.49 74.659 45.3488 74.659 45.2076C74.659 45.1017 74.6942 44.9958 74.7646 44.8899C74.835 44.784 74.9406 44.6781 75.0462 44.6074C75.1518 44.5368 75.3278 44.4309 75.5038 44.3603C75.6798 44.2897 75.8558 44.2191 76.067 44.1838C76.2782 44.1485 76.595 44.0779 76.9822 44.0426C76.9822 43.972 76.9822 43.9367 76.9822 43.9014V43.6896V43.3013C77.5102 43.3013 77.9326 43.3013 78.2846 43.3013C78.6718 43.3013 79.0942 43.3013 79.587 43.3013C79.5518 43.5484 79.5518 43.6896 79.5518 43.7602V44.0426C80.0094 44.0779 80.5022 44.1132 80.9598 44.1838C80.995 44.5721 81.0302 44.9252 81.1006 45.3488C80.7134 45.2782 80.3614 45.2076 80.0446 45.1723C79.7278 45.137 79.4462 45.1017 79.235 45.1017C78.9886 45.1017 78.7774 45.137 78.6366 45.1723C78.4606 45.2429 78.3902 45.3135 78.3902 45.3841C78.3902 45.4547 78.4254 45.5253 78.531 45.5959C78.6366 45.6665 78.7422 45.7371 78.9182 45.8077C79.5518 46.0901 80.0094 46.3019 80.291 46.4785C80.5726 46.655 80.7838 46.7962 80.9246 46.9727C81.0302 47.1139 81.1006 47.2551 81.1006 47.4316C81.1006 47.5375 81.0654 47.6787 80.995 47.7846C80.9246 47.8905 80.819 47.9964 80.7134 48.0671C80.5726 48.173 80.4318 48.2436 80.291 48.3142C80.115 48.3848 79.9742 48.4554 79.7982 48.4907C79.6222 48.526 79.3758 48.5966 79.0238 48.6672V49.0908C79.0238 49.232 79.0238 49.3732 79.0238 49.5144C78.4958 49.5144 78.0734 49.5144 77.7918 49.5144C77.475 49.5144 77.0174 49.5144 76.4542 49.5144C76.4894 49.3379 76.4894 49.1614 76.4894 48.9143V48.7731C76.1022 48.7378 75.7854 48.7378 75.5038 48.7025C75.2574 48.6672 74.9406 48.6319 74.5534 48.5613C74.4478 47.9258 74.4126 47.5022 74.3774 47.2904Z" fill="#FFFAD1" />
                <path d="M85.712 42.4187C83.8112 41.289 80.9248 40.583 77.6864 40.583C74.448 40.583 71.5616 41.289 69.6608 42.4187H67.3728V45.5253C67.3728 48.2436 71.984 50.4676 77.6512 50.4676C83.3184 50.4676 87.9296 48.2436 87.9296 45.5253V42.4187H85.712Z" fill="#C99B36" />
                <path d="M77.7215 47.3612C83.3981 47.3612 87.9999 45.1484 87.9999 42.4189C87.9999 39.6893 83.3981 37.4766 77.7215 37.4766C72.0449 37.4766 67.4431 39.6893 67.4431 42.4189C67.4431 45.1484 72.0449 47.3612 77.7215 47.3612Z" fill="#F7CA41" />
                <path d="M74.3774 43.3719C74.835 43.4779 75.2926 43.5485 75.6798 43.5838C76.067 43.6191 76.419 43.6544 76.7006 43.6544C76.947 43.6544 77.1582 43.6191 77.3342 43.5838C77.5102 43.5132 77.6158 43.4426 77.6158 43.3366C77.6158 43.3013 77.6158 43.3013 77.5806 43.266C77.5806 43.2307 77.5454 43.2307 77.5102 43.1954C77.475 43.1601 77.4398 43.1601 77.4046 43.1248C77.3694 43.0895 77.299 43.0542 77.2638 43.0542C77.2286 43.0189 77.0878 42.9483 76.8062 42.8424C76.0318 42.4894 75.539 42.2423 75.2926 42.1011C75.0814 41.9952 74.9406 41.854 74.835 41.7128C74.7294 41.5715 74.659 41.4303 74.659 41.2891C74.659 41.1832 74.6942 41.0773 74.7646 40.9714C74.835 40.8655 74.9406 40.7596 75.0462 40.689C75.1518 40.6184 75.3278 40.5125 75.5038 40.4419C75.6798 40.3713 75.8558 40.3007 76.067 40.2654C76.2782 40.2301 76.595 40.1595 76.9822 40.1242C76.9822 40.0536 76.9822 40.0182 76.9822 39.9829V39.7711V39.3828C77.5102 39.3828 77.9326 39.3828 78.2846 39.3828C78.6718 39.3828 79.0942 39.3828 79.587 39.3828C79.5518 39.6299 79.5518 39.7711 79.5518 39.8417V40.1242C80.0094 40.1595 80.5022 40.1948 80.9598 40.2654C80.995 40.6537 81.0302 41.0067 81.1006 41.4303C80.7134 41.3597 80.3614 41.2891 80.0446 41.2538C79.7278 41.2185 79.4462 41.1832 79.235 41.1832C78.9886 41.1832 78.7774 41.2185 78.6366 41.2538C78.4606 41.3244 78.3902 41.395 78.3902 41.4656C78.3902 41.5362 78.4254 41.6068 78.531 41.6774C78.6366 41.7481 78.7422 41.8187 78.9182 41.8893C79.5518 42.1717 80.0094 42.3835 80.291 42.56C80.5726 42.7365 80.7838 42.8777 80.9246 43.0542C81.0302 43.1954 81.1006 43.3366 81.1006 43.5132C81.1006 43.6191 81.0654 43.7603 80.995 43.8662C80.9246 43.9721 80.819 44.078 80.7134 44.1486C80.5726 44.2545 80.4318 44.3251 80.291 44.3957C80.115 44.4663 79.9742 44.5369 79.7982 44.5722C79.6222 44.6075 79.3758 44.6781 79.0238 44.7487V45.1724C79.0238 45.3136 79.0238 45.4548 79.0238 45.596C78.4958 45.596 78.0734 45.596 77.7918 45.596C77.475 45.596 77.0174 45.596 76.4542 45.596C76.4894 45.4195 76.4894 45.243 76.4894 44.9958V44.8546C76.1022 44.8193 75.7854 44.8193 75.5038 44.784C75.2574 44.7487 74.9406 44.7134 74.5534 44.6428C74.4478 43.9721 74.4126 43.5838 74.3774 43.3719Z" fill="#FFFAD1" />
                <path d="M65.7535 54.9509C63.8527 53.8213 60.9663 53.1152 57.7279 53.1152C54.4895 53.1152 51.6031 53.8213 49.7023 54.9509H47.4143V58.0575C47.4143 60.7758 52.0255 62.9998 57.6927 62.9998C63.3599 62.9998 67.9711 60.7758 67.9711 58.0575V54.9509H65.7535Z" fill="#C99B36" />
                <path d="M57.7279 59.8934C63.4045 59.8934 68.0063 57.6806 68.0063 54.9511C68.0063 52.2215 63.4045 50.0088 57.7279 50.0088C52.0513 50.0088 47.4495 52.2215 47.4495 54.9511C47.4495 57.6806 52.0513 59.8934 57.7279 59.8934Z" fill="#F7CA41" />
                <path d="M54.3838 55.9042C54.8414 56.0101 55.299 56.0807 55.6862 56.116C56.0734 56.1513 56.4254 56.1866 56.707 56.1866C56.9534 56.1866 57.1646 56.1513 57.3406 56.116C57.5166 56.0454 57.6222 55.9748 57.6222 55.8689C57.6222 55.8336 57.6222 55.8336 57.587 55.7983C57.587 55.763 57.5518 55.763 57.5166 55.7277C57.4814 55.6924 57.4462 55.6924 57.411 55.6571C57.3758 55.6218 57.3054 55.5865 57.2702 55.5865C57.235 55.5512 57.0942 55.4805 56.8126 55.3746C56.0382 55.0216 55.5454 54.7745 55.299 54.6333C55.0878 54.5274 54.947 54.3862 54.8414 54.245C54.7358 54.1038 54.6654 53.9626 54.6654 53.8214C54.6654 53.7154 54.7006 53.6095 54.771 53.5036C54.8414 53.3977 54.947 53.2918 55.0526 53.2212C55.1934 53.1153 55.3342 53.0447 55.5102 52.9741C55.6862 52.9035 55.8622 52.8329 56.0734 52.7976C56.2846 52.7623 56.6014 52.6917 56.9886 52.6564C56.9886 52.5858 56.9886 52.5505 56.9886 52.5152V52.3034V51.915C57.5166 51.915 57.939 51.915 58.291 51.915C58.6782 51.915 59.1006 51.915 59.5934 51.915C59.5582 52.1622 59.5582 52.3034 59.5582 52.374V52.6564C60.0158 52.6917 60.5086 52.727 60.9662 52.7976C61.0014 53.1859 61.0366 53.5389 61.107 53.9626C60.7198 53.892 60.3678 53.8214 60.051 53.786C59.7342 53.7507 59.4526 53.7154 59.2414 53.7154C58.995 53.7154 58.7838 53.7507 58.643 53.786C58.467 53.8567 58.3966 53.9273 58.3966 53.9979C58.3966 54.0685 58.4318 54.1391 58.5374 54.2097C58.643 54.2803 58.7486 54.3509 58.9246 54.4215C59.5582 54.7039 60.0158 54.9157 60.2974 55.0922C60.579 55.2687 60.7902 55.4099 60.931 55.5865C61.0366 55.7277 61.107 55.8689 61.107 56.0454C61.107 56.1513 61.0718 56.2925 61.0014 56.3984C60.931 56.5043 60.8254 56.6102 60.7198 56.6808C60.579 56.7867 60.4382 56.8573 60.2974 56.9279C60.1214 56.9985 59.9806 57.0691 59.8046 57.1044C59.6286 57.1398 59.3822 57.2104 59.0302 57.281V57.7046C59.0302 57.8458 59.0302 57.987 59.0302 58.1282C58.5022 58.1282 58.0798 58.1282 57.7982 58.1282C57.4814 58.1282 57.0238 58.1282 56.4606 58.1282C56.4958 57.9517 56.4958 57.7752 56.4958 57.5281V57.3869C56.1086 57.3516 55.7918 57.3516 55.5102 57.3163C55.2638 57.281 54.947 57.2457 54.5598 57.1751C54.4542 56.5043 54.419 56.116 54.3838 55.9042Z" fill="#FFFAD1" />
                <defs>
                    <clipPath id="clip0_2691_15948">
                        <rect width="55" height="53" fill="white" transform="translate(15)" />
                    </clipPath>
                </defs>
            </svg>

        )
    }
    if (type === 'hesab_haye_man') {
        return (
            <svg width="82" height="87" viewBox="0 0 82 87" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2691_15988)">
                    <path d="M65.3547 16.5H11.3731C6.83945 16.5 3.18945 20.1538 3.18945 24.6538V54.3462C3.18945 58.8462 6.83945 62.5 11.3347 62.5H65.3163C69.8116 62.5 73.4616 58.8462 73.4616 54.3462V24.6538C73.5 20.1538 69.85 16.5 65.3547 16.5Z" fill="#3D5F96" />
                    <path d="M62.6653 16.5H8.64526C4.15 16.5 0.5 20.1538 0.5 24.6538V54.3462C0.5 58.8462 4.15 62.5 8.64526 62.5H62.6268C67.1221 62.5 70.7721 58.8462 70.7721 54.3462V24.6538C70.8105 20.1538 67.1605 16.5 62.6653 16.5Z" fill="#5575A6" />
                    <path d="M70.8105 43H0.5V52.2692H70.8105V43Z" fill="#4D4D4F" />
                    <path d="M64.74 28.1538H54.4431V38.4615H64.74V28.1538Z" fill="#FFFAD1" />
                    <path d="M28.5858 36.5386H6.57056V38.5001H28.5858V36.5386Z" fill="#FFFAD1" />
                    <path d="M28.5858 32.3462H6.57056V34.3077H28.5858V32.3462Z" fill="#FFFAD1" />
                    <path d="M28.5858 28.1538H6.57056V30.1153H28.5858V28.1538Z" fill="#FFFAD1" />
                </g>
                <g clipPath="url(#clip1_2691_15988)">
                    <path d="M81.3541 51.1774C73.3635 50.6399 66.0145 44.5 66.0145 44.5C66.0145 44.5 58.6363 50.6399 50.6457 51.1774C50.6457 51.1774 47.9044 74.2939 65.9853 79.5C84.0954 74.2939 81.3541 51.1774 81.3541 51.1774Z" fill="#C99B36" />
                    <path d="M66.0147 76.1045C60.2988 74.1239 56.5368 69.6534 54.8162 62.7779C53.9413 59.3543 53.7955 56.0721 53.8247 53.9501C58.9573 52.9032 63.4775 50.2435 66.0147 48.5176C68.5519 50.2435 73.0721 52.9032 78.2047 53.9501C78.2339 56.0721 78.0881 59.3543 77.2132 62.7779C75.4634 69.6817 71.7014 74.1522 66.0147 76.1045Z" fill="#F3C43E" />
                    <path d="M65.8397 69.6254L58.1699 62.7216L59.9197 60.8825L65.3731 65.8057L72.4305 55.7329L74.5885 57.1476L65.8397 69.6254Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_2691_15988">
                        <rect width="73" height="46" fill="white" transform="translate(0.5 16.5)" />
                    </clipPath>
                    <clipPath id="clip1_2691_15988">
                        <rect width="31" height="35" fill="white" transform="translate(50.5 44.5)" />
                    </clipPath>
                </defs>
            </svg>

        )
    }
    if (type === 'svg6') {
        return (
            <svg width="58" height="47" viewBox="0 0 58 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2692_16408)">
                    <path d="M30.3112 9.9834H23H15.6888L9.5 16.1922L23 34.4999L36.5 16.1922L30.3112 9.9834Z" fill="#558ADD" />
                    <path d="M9.5 16.1924H18.1419L23 34.5L9.5 16.1924Z" fill="#1F54A5" />
                    <path d="M36.5 16.1924H27.8581L23 34.5L36.5 16.1924Z" fill="#1F54A5" />
                    <path d="M30.3111 9.9834H15.6887L18.1418 16.1922H27.858L30.3111 9.9834Z" fill="#1F54A5" />
                    <path d="M17.9175 13.373L18.632 15.394L20.5629 16.1418L18.632 16.8897L17.9175 18.9106L17.2029 16.8897L15.272 16.1418L17.2029 15.394L17.9175 13.373Z" fill="white" />
                </g>
                <g clipPath="url(#clip1_2692_16408)">
                    <path d="M44.6033 24.0635H40H35.3967L31.5 27.9727L40 39.4998L48.5 27.9727L44.6033 24.0635Z" fill="#558ADD" />
                    <path d="M31.5 27.9727H36.9412L40 39.4997L31.5 27.9727Z" fill="#1F54A5" />
                    <path d="M48.5 27.9727H43.0588L40 39.4997L48.5 27.9727Z" fill="#1F54A5" />
                    <path d="M44.6034 24.0635H35.3967L36.9413 27.9727H43.0588L44.6034 24.0635Z" fill="#1F54A5" />
                    <path d="M36.8 26.1978L37.2498 27.4702L38.4656 27.9411L37.2498 28.4119L36.8 29.6844L36.3501 28.4119L35.1343 27.9411L36.3501 27.4702L36.8 26.1978Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_2692_16408">
                        <rect width="27" height="27" fill="white" transform="translate(9.5 7.5)" />
                    </clipPath>
                    <clipPath id="clip1_2692_16408">
                        <rect width="17" height="17" fill="white" transform="translate(31.5 22.5)" />
                    </clipPath>
                </defs>
            </svg>

        )
    }
    if (type === 'svg7') {
        return (
            <svg width="58" height="23" viewBox="0 0 58 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2692_16431)">
                    <path d="M33.6033 7.56348H29H24.3967L20.5 11.4727L29 22.9998L37.5 11.4727L33.6033 7.56348Z" fill="#558ADD" />
                    <path d="M20.5 11.4727H25.9412L29 22.9997L20.5 11.4727Z" fill="#1F54A5" />
                    <path d="M37.5 11.4727H32.0588L29 22.9997L37.5 11.4727Z" fill="#1F54A5" />
                    <path d="M33.6034 7.56348H24.3967L25.9413 11.4727H32.0588L33.6034 7.56348Z" fill="#1F54A5" />
                    <path d="M25.8 9.69775L26.2498 10.9702L27.4656 11.4411L26.2498 11.9119L25.8 13.1844L25.3501 11.9119L24.1343 11.4411L25.3501 10.9702L25.8 9.69775Z" fill="white" />
                </g>
                <g clipPath="url(#clip1_2692_16431)">
                    <path d="M50.6033 1.56348H46H41.3967L37.5 5.47274L46 16.9998L54.5 5.47274L50.6033 1.56348Z" fill="#558ADD" />
                    <path d="M37.5 5.47266H42.9412L46 16.9997L37.5 5.47266Z" fill="#1F54A5" />
                    <path d="M54.5 5.47266H49.0588L46 16.9997L54.5 5.47266Z" fill="#1F54A5" />
                    <path d="M50.6034 1.56348H41.3967L42.9413 5.47274H49.0588L50.6034 1.56348Z" fill="#1F54A5" />
                    <path d="M42.8 3.69775L43.2498 4.97022L44.4656 5.44107L43.2498 5.91193L42.8 7.18439L42.3501 5.91193L41.1343 5.44107L42.3501 4.97022L42.8 3.69775Z" fill="white" />
                </g>
                <g clipPath="url(#clip2_2692_16431)">
                    <path d="M16.6033 1.56348H12H7.39667L3.5 5.47274L12 16.9998L20.5 5.47274L16.6033 1.56348Z" fill="#558ADD" />
                    <path d="M3.5 5.47266H8.94121L12 16.9997L3.5 5.47266Z" fill="#1F54A5" />
                    <path d="M20.5 5.47266H15.0588L12 16.9997L20.5 5.47266Z" fill="#1F54A5" />
                    <path d="M16.6034 1.56348H7.39673L8.94127 5.47274H15.0588L16.6034 1.56348Z" fill="#1F54A5" />
                    <path d="M8.79995 3.69775L9.24984 4.97022L10.4656 5.44107L9.24984 5.91193L8.79995 7.18439L8.35007 5.91193L7.13428 5.44107L8.35007 4.97022L8.79995 3.69775Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_2692_16431">
                        <rect width="17" height="17" fill="white" transform="translate(20.5 6)" />
                    </clipPath>
                    <clipPath id="clip1_2692_16431">
                        <rect width="17" height="17" fill="white" transform="translate(37.5)" />
                    </clipPath>
                    <clipPath id="clip2_2692_16431">
                        <rect width="17" height="17" fill="white" transform="translate(3.5)" />
                    </clipPath>
                </defs>
            </svg>

        )
    }
    if (type === 'svg8') {
        return (
            <svg width="58" height="31" viewBox="0 0 58 31" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2692_16432)">
                    <path d="M13.7494 7.604H10.5H7.25059L4.5 10.3635L10.5 18.5002L16.5 10.3635L13.7494 7.604Z" fill="#558ADD" />
                    <path d="M4.5 10.3633H8.34086L10.5 18.5L4.5 10.3633Z" fill="#1F54A5" />
                    <path d="M16.5 10.3633H12.6591L10.5 18.5L16.5 10.3633Z" fill="#1F54A5" />
                    <path d="M13.7493 7.604H7.25049L8.34075 10.3635H12.659L13.7493 7.604Z" fill="#1F54A5" />
                    <path d="M8.2412 9.11035L8.55877 10.0086L9.41697 10.3409L8.55877 10.6733L8.2412 11.5715L7.92364 10.6733L7.06543 10.3409L7.92364 10.0086L8.2412 9.11035Z" fill="white" />
                </g>
                <g clipPath="url(#clip1_2692_16432)">
                    <path d="M50.7494 8.604H47.5H44.2506L41.5 11.3635L47.5 19.5002L53.5 11.3635L50.7494 8.604Z" fill="#558ADD" />
                    <path d="M41.5 11.3633H45.3409L47.5 19.5L41.5 11.3633Z" fill="#1F54A5" />
                    <path d="M53.5 11.3633H49.6591L47.5 19.5L53.5 11.3633Z" fill="#1F54A5" />
                    <path d="M50.7493 8.604H44.2505L45.3407 11.3635H49.659L50.7493 8.604Z" fill="#1F54A5" />
                    <path d="M45.2412 10.1104L45.5588 11.0086L46.417 11.3409L45.5588 11.6733L45.2412 12.5715L44.9236 11.6733L44.0654 11.3409L44.9236 11.0086L45.2412 10.1104Z" fill="white" />
                </g>
                <g clipPath="url(#clip2_2692_16432)">
                    <path d="M31.7494 7.604H28.5H25.2506L22.5 10.3635L28.5 18.5002L34.5 10.3635L31.7494 7.604Z" fill="#558ADD" />
                    <path d="M22.5 10.3633H26.3409L28.5 18.5L22.5 10.3633Z" fill="#1F54A5" />
                    <path d="M34.5 10.3633H30.6591L28.5 18.5L34.5 10.3633Z" fill="#1F54A5" />
                    <path d="M31.7493 7.604H25.2505L26.3407 10.3635H30.659L31.7493 7.604Z" fill="#1F54A5" />
                    <path d="M26.2412 9.11035L26.5588 10.0086L27.417 10.3409L26.5588 10.6733L26.2412 11.5715L25.9236 10.6733L25.0654 10.3409L25.9236 10.0086L26.2412 9.11035Z" fill="white" />
                </g>
                <g clipPath="url(#clip3_2692_16432)">
                    <path d="M31.7494 19.604H28.5H25.2506L22.5 22.3635L28.5 30.5002L34.5 22.3635L31.7494 19.604Z" fill="#558ADD" />
                    <path d="M22.5 22.3633H26.3409L28.5 30.5L22.5 22.3633Z" fill="#1F54A5" />
                    <path d="M34.5 22.3633H30.6591L28.5 30.5L34.5 22.3633Z" fill="#1F54A5" />
                    <path d="M31.7493 19.604H25.2505L26.3407 22.3635H30.659L31.7493 19.604Z" fill="#1F54A5" />
                    <path d="M26.2412 21.1104L26.5588 22.0086L27.417 22.3409L26.5588 22.6733L26.2412 23.5715L25.9236 22.6733L25.0654 22.3409L25.9236 22.0086L26.2412 21.1104Z" fill="white" />
                </g>
                <g clipPath="url(#clip4_2692_16432)">
                    <path d="M22.7494 13.604H19.5H16.2506L13.5 16.3635L19.5 24.5002L25.5 16.3635L22.7494 13.604Z" fill="#558ADD" />
                    <path d="M13.5 16.3633H17.3409L19.5 24.5L13.5 16.3633Z" fill="#1F54A5" />
                    <path d="M25.5 16.3633H21.6591L19.5 24.5L25.5 16.3633Z" fill="#1F54A5" />
                    <path d="M22.7493 13.604H16.2505L17.3407 16.3635H21.659L22.7493 13.604Z" fill="#1F54A5" />
                    <path d="M17.2412 15.1104L17.5588 16.0086L18.417 16.3409L17.5588 16.6733L17.2412 17.5715L16.9236 16.6733L16.0654 16.3409L16.9236 16.0086L17.2412 15.1104Z" fill="white" />
                </g>
                <g clipPath="url(#clip5_2692_16432)">
                    <path d="M40.7494 13.604H37.5H34.2506L31.5 16.3635L37.5 24.5002L43.5 16.3635L40.7494 13.604Z" fill="#558ADD" />
                    <path d="M31.5 16.3633H35.3409L37.5 24.5L31.5 16.3633Z" fill="#1F54A5" />
                    <path d="M43.5 16.3633H39.6591L37.5 24.5L43.5 16.3633Z" fill="#1F54A5" />
                    <path d="M40.7493 13.604H34.2505L35.3407 16.3635H39.659L40.7493 13.604Z" fill="#1F54A5" />
                    <path d="M35.2412 15.1104L35.5588 16.0086L36.417 16.3409L35.5588 16.6733L35.2412 17.5715L34.9236 16.6733L34.0654 16.3409L34.9236 16.0086L35.2412 15.1104Z" fill="white" />
                </g>
                <g clipPath="url(#clip6_2692_16432)">
                    <path d="M22.7494 1.604H19.5H16.2506L13.5 4.36348L19.5 12.5002L25.5 4.36348L22.7494 1.604Z" fill="#558ADD" />
                    <path d="M13.5 4.36328H17.3409L19.5 12.5L13.5 4.36328Z" fill="#1F54A5" />
                    <path d="M25.5 4.36328H21.6591L19.5 12.5L25.5 4.36328Z" fill="#1F54A5" />
                    <path d="M22.7493 1.604H16.2505L17.3407 4.36348H21.659L22.7493 1.604Z" fill="#1F54A5" />
                    <path d="M17.2412 3.11035L17.5588 4.00856L18.417 4.34093L17.5588 4.6733L17.2412 5.57151L16.9236 4.6733L16.0654 4.34093L16.9236 4.00856L17.2412 3.11035Z" fill="white" />
                </g>
                <g clipPath="url(#clip7_2692_16432)">
                    <path d="M40.7494 1.604H37.5H34.2506L31.5 4.36348L37.5 12.5002L43.5 4.36348L40.7494 1.604Z" fill="#558ADD" />
                    <path d="M31.5 4.36328H35.3409L37.5 12.5L31.5 4.36328Z" fill="#1F54A5" />
                    <path d="M43.5 4.36328H39.6591L37.5 12.5L43.5 4.36328Z" fill="#1F54A5" />
                    <path d="M40.7493 1.604H34.2505L35.3407 4.36348H39.659L40.7493 1.604Z" fill="#1F54A5" />
                    <path d="M35.2412 3.11035L35.5588 4.00856L36.417 4.34093L35.5588 4.6733L35.2412 5.57151L34.9236 4.6733L34.0654 4.34093L34.9236 4.00856L35.2412 3.11035Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_2692_16432">
                        <rect width="12" height="12" fill="white" transform="translate(4.5 6.5)" />
                    </clipPath>
                    <clipPath id="clip1_2692_16432">
                        <rect width="12" height="12" fill="white" transform="translate(41.5 7.5)" />
                    </clipPath>
                    <clipPath id="clip2_2692_16432">
                        <rect width="12" height="12" fill="white" transform="translate(22.5 6.5)" />
                    </clipPath>
                    <clipPath id="clip3_2692_16432">
                        <rect width="12" height="12" fill="white" transform="translate(22.5 18.5)" />
                    </clipPath>
                    <clipPath id="clip4_2692_16432">
                        <rect width="12" height="12" fill="white" transform="translate(13.5 12.5)" />
                    </clipPath>
                    <clipPath id="clip5_2692_16432">
                        <rect width="12" height="12" fill="white" transform="translate(31.5 12.5)" />
                    </clipPath>
                    <clipPath id="clip6_2692_16432">
                        <rect width="12" height="12" fill="white" transform="translate(13.5 0.5)" />
                    </clipPath>
                    <clipPath id="clip7_2692_16432">
                        <rect width="12" height="12" fill="white" transform="translate(31.5 0.5)" />
                    </clipPath>
                </defs>
            </svg>

        )
    }
    if (type === 'svg9') {
        return (
            <svg width="58" height="43" viewBox="0 0 58 43" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2692_16464)">
                    <path d="M13.7494 7.104H10.5H7.25059L4.5 9.86348L10.5 18.0002L16.5 9.86348L13.7494 7.104Z" fill="#558ADD" />
                    <path d="M4.5 9.86328H8.34086L10.5 18L4.5 9.86328Z" fill="#1F54A5" />
                    <path d="M16.5 9.86328H12.6591L10.5 18L16.5 9.86328Z" fill="#1F54A5" />
                    <path d="M13.7493 7.104H7.25049L8.34075 9.86348H12.659L13.7493 7.104Z" fill="#1F54A5" />
                    <path d="M8.2412 8.61035L8.55877 9.50856L9.41697 9.84093L8.55877 10.1733L8.2412 11.0715L7.92364 10.1733L7.06543 9.84093L7.92364 9.50856L8.2412 8.61035Z" fill="white" />
                </g>
                <g clipPath="url(#clip1_2692_16464)">
                    <path d="M50.7494 8.104H47.5H44.2506L41.5 10.8635L47.5 19.0002L53.5 10.8635L50.7494 8.104Z" fill="#558ADD" />
                    <path d="M41.5 10.8633H45.3409L47.5 19L41.5 10.8633Z" fill="#1F54A5" />
                    <path d="M53.5 10.8633H49.6591L47.5 19L53.5 10.8633Z" fill="#1F54A5" />
                    <path d="M50.7493 8.104H44.2505L45.3407 10.8635H49.659L50.7493 8.104Z" fill="#1F54A5" />
                    <path d="M45.2412 9.61035L45.5588 10.5086L46.417 10.8409L45.5588 11.1733L45.2412 12.0715L44.9236 11.1733L44.0654 10.8409L44.9236 10.5086L45.2412 9.61035Z" fill="white" />
                </g>
                <g clipPath="url(#clip2_2692_16464)">
                    <path d="M31.7494 7.104H28.5H25.2506L22.5 9.86348L28.5 18.0002L34.5 9.86348L31.7494 7.104Z" fill="#558ADD" />
                    <path d="M22.5 9.86328H26.3409L28.5 18L22.5 9.86328Z" fill="#1F54A5" />
                    <path d="M34.5 9.86328H30.6591L28.5 18L34.5 9.86328Z" fill="#1F54A5" />
                    <path d="M31.7493 7.104H25.2505L26.3407 9.86348H30.659L31.7493 7.104Z" fill="#1F54A5" />
                    <path d="M26.2412 8.61035L26.5588 9.50856L27.417 9.84093L26.5588 10.1733L26.2412 11.0715L25.9236 10.1733L25.0654 9.84093L25.9236 9.50856L26.2412 8.61035Z" fill="white" />
                </g>
                <g clipPath="url(#clip3_2692_16464)">
                    <path d="M22.7494 1.104H19.5H16.2506L13.5 3.86348L19.5 12.0002L25.5 3.86348L22.7494 1.104Z" fill="#558ADD" />
                    <path d="M13.5 3.86328H17.3409L19.5 12L13.5 3.86328Z" fill="#1F54A5" />
                    <path d="M25.5 3.86328H21.6591L19.5 12L25.5 3.86328Z" fill="#1F54A5" />
                    <path d="M22.7493 1.104H16.2505L17.3407 3.86348H21.659L22.7493 1.104Z" fill="#1F54A5" />
                    <path d="M17.2412 2.61035L17.5588 3.50856L18.417 3.84093L17.5588 4.1733L17.2412 5.07151L16.9236 4.1733L16.0654 3.84093L16.9236 3.50856L17.2412 2.61035Z" fill="white" />
                </g>
                <g clipPath="url(#clip4_2692_16464)">
                    <path d="M40.7494 1.104H37.5H34.2506L31.5 3.86348L37.5 12.0002L43.5 3.86348L40.7494 1.104Z" fill="#558ADD" />
                    <path d="M31.5 3.86328H35.3409L37.5 12L31.5 3.86328Z" fill="#1F54A5" />
                    <path d="M43.5 3.86328H39.6591L37.5 12L43.5 3.86328Z" fill="#1F54A5" />
                    <path d="M40.7493 1.104H34.2505L35.3407 3.86348H39.659L40.7493 1.104Z" fill="#1F54A5" />
                    <path d="M35.2412 2.61035L35.5588 3.50856L36.417 3.84093L35.5588 4.1733L35.2412 5.07151L34.9236 4.1733L34.0654 3.84093L34.9236 3.50856L35.2412 2.61035Z" fill="white" />
                </g>
                <g clipPath="url(#clip5_2692_16464)">
                    <path d="M13.7494 26.104H10.5H7.25059L4.5 28.8635L10.5 37.0002L16.5 28.8635L13.7494 26.104Z" fill="#558ADD" />
                    <path d="M4.5 28.8633H8.34086L10.5 37L4.5 28.8633Z" fill="#1F54A5" />
                    <path d="M16.5 28.8633H12.6591L10.5 37L16.5 28.8633Z" fill="#1F54A5" />
                    <path d="M13.7493 26.104H7.25049L8.34075 28.8635H12.659L13.7493 26.104Z" fill="#1F54A5" />
                    <path d="M8.2412 27.6104L8.55877 28.5086L9.41697 28.8409L8.55877 29.1733L8.2412 30.0715L7.92364 29.1733L7.06543 28.8409L7.92364 28.5086L8.2412 27.6104Z" fill="white" />
                </g>
                <g clipPath="url(#clip6_2692_16464)">
                    <path d="M50.7494 27.104H47.5H44.2506L41.5 29.8635L47.5 38.0002L53.5 29.8635L50.7494 27.104Z" fill="#558ADD" />
                    <path d="M41.5 29.8633H45.3409L47.5 38L41.5 29.8633Z" fill="#1F54A5" />
                    <path d="M53.5 29.8633H49.6591L47.5 38L53.5 29.8633Z" fill="#1F54A5" />
                    <path d="M50.7493 27.104H44.2505L45.3407 29.8635H49.659L50.7493 27.104Z" fill="#1F54A5" />
                    <path d="M45.2412 28.6104L45.5588 29.5086L46.417 29.8409L45.5588 30.1733L45.2412 31.0715L44.9236 30.1733L44.0654 29.8409L44.9236 29.5086L45.2412 28.6104Z" fill="white" />
                </g>
                <g clipPath="url(#clip7_2692_16464)">
                    <path d="M31.7494 26.104H28.5H25.2506L22.5 28.8635L28.5 37.0002L34.5 28.8635L31.7494 26.104Z" fill="#558ADD" />
                    <path d="M22.5 28.8633H26.3409L28.5 37L22.5 28.8633Z" fill="#1F54A5" />
                    <path d="M34.5 28.8633H30.6591L28.5 37L34.5 28.8633Z" fill="#1F54A5" />
                    <path d="M31.7493 26.104H25.2505L26.3407 28.8635H30.659L31.7493 26.104Z" fill="#1F54A5" />
                    <path d="M26.2412 27.6104L26.5588 28.5086L27.417 28.8409L26.5588 29.1733L26.2412 30.0715L25.9236 29.1733L25.0654 28.8409L25.9236 28.5086L26.2412 27.6104Z" fill="white" />
                </g>
                <g clipPath="url(#clip8_2692_16464)">
                    <path d="M22.7494 32.104H19.5H16.2506L13.5 34.8635L19.5 43.0002L25.5 34.8635L22.7494 32.104Z" fill="#558ADD" />
                    <path d="M13.5 34.8633H17.3409L19.5 43L13.5 34.8633Z" fill="#1F54A5" />
                    <path d="M25.5 34.8633H21.6591L19.5 43L25.5 34.8633Z" fill="#1F54A5" />
                    <path d="M22.7493 32.104H16.2505L17.3407 34.8635H21.659L22.7493 32.104Z" fill="#1F54A5" />
                    <path d="M17.2412 33.6104L17.5588 34.5086L18.417 34.8409L17.5588 35.1733L17.2412 36.0715L16.9236 35.1733L16.0654 34.8409L16.9236 34.5086L17.2412 33.6104Z" fill="white" />
                </g>
                <g clipPath="url(#clip9_2692_16464)">
                    <path d="M40.7494 32.104H37.5H34.2506L31.5 34.8635L37.5 43.0002L43.5 34.8635L40.7494 32.104Z" fill="#558ADD" />
                    <path d="M31.5 34.8633H35.3409L37.5 43L31.5 34.8633Z" fill="#1F54A5" />
                    <path d="M43.5 34.8633H39.6591L37.5 43L43.5 34.8633Z" fill="#1F54A5" />
                    <path d="M40.7493 32.104H34.2505L35.3407 34.8635H39.659L40.7493 32.104Z" fill="#1F54A5" />
                    <path d="M35.2412 33.6104L35.5588 34.5086L36.417 34.8409L35.5588 35.1733L35.2412 36.0715L34.9236 35.1733L34.0654 34.8409L34.9236 34.5086L35.2412 33.6104Z" fill="white" />
                </g>
                <g clipPath="url(#clip10_2692_16464)">
                    <path d="M22.7494 20.104H19.5H16.2506L13.5 22.8635L19.5 31.0002L25.5 22.8635L22.7494 20.104Z" fill="#558ADD" />
                    <path d="M13.5 22.8633H17.3409L19.5 31L13.5 22.8633Z" fill="#1F54A5" />
                    <path d="M25.5 22.8633H21.6591L19.5 31L25.5 22.8633Z" fill="#1F54A5" />
                    <path d="M22.7493 20.104H16.2505L17.3407 22.8635H21.659L22.7493 20.104Z" fill="#1F54A5" />
                    <path d="M17.2412 21.6104L17.5588 22.5086L18.417 22.8409L17.5588 23.1733L17.2412 24.0715L16.9236 23.1733L16.0654 22.8409L16.9236 22.5086L17.2412 21.6104Z" fill="white" />
                </g>
                <g clipPath="url(#clip11_2692_16464)">
                    <path d="M40.7494 20.104H37.5H34.2506L31.5 22.8635L37.5 31.0002L43.5 22.8635L40.7494 20.104Z" fill="#558ADD" />
                    <path d="M31.5 22.8633H35.3409L37.5 31L31.5 22.8633Z" fill="#1F54A5" />
                    <path d="M43.5 22.8633H39.6591L37.5 31L43.5 22.8633Z" fill="#1F54A5" />
                    <path d="M40.7493 20.104H34.2505L35.3407 22.8635H39.659L40.7493 20.104Z" fill="#1F54A5" />
                    <path d="M35.2412 21.6104L35.5588 22.5086L36.417 22.8409L35.5588 23.1733L35.2412 24.0715L34.9236 23.1733L34.0654 22.8409L34.9236 22.5086L35.2412 21.6104Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(4.5 6)" />
                    </clipPath>
                    <clipPath id="clip1_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(41.5 7)" />
                    </clipPath>
                    <clipPath id="clip2_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(22.5 6)" />
                    </clipPath>
                    <clipPath id="clip3_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(13.5)" />
                    </clipPath>
                    <clipPath id="clip4_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(31.5)" />
                    </clipPath>
                    <clipPath id="clip5_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(4.5 25)" />
                    </clipPath>
                    <clipPath id="clip6_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(41.5 26)" />
                    </clipPath>
                    <clipPath id="clip7_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(22.5 25)" />
                    </clipPath>
                    <clipPath id="clip8_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(13.5 31)" />
                    </clipPath>
                    <clipPath id="clip9_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(31.5 31)" />
                    </clipPath>
                    <clipPath id="clip10_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(13.5 19)" />
                    </clipPath>
                    <clipPath id="clip11_2692_16464">
                        <rect width="12" height="12" fill="white" transform="translate(31.5 19)" />
                    </clipPath>
                </defs>
            </svg>

        )
    }
    if (type === 'svg10') {
        return (
            <svg width="58" height="37" viewBox="0 0 58 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2692_16665)">
                    <path d="M19.196 5.3877H17.1071H15.0182L13.25 7.16165L17.1071 12.3924L20.9643 7.16165L19.196 5.3877Z" fill="#558ADD" />
                    <path d="M13.25 7.16162H15.7191L17.1071 12.3924L13.25 7.16162Z" fill="#1F54A5" />
                    <path d="M20.9643 7.16162H18.4952L17.1072 12.3924L20.9643 7.16162Z" fill="#1F54A5" />
                    <path d="M19.1961 5.3877H15.0183L15.7192 7.16165H18.4952L19.1961 5.3877Z" fill="#1F54A5" />
                    <path d="M15.655 6.35645L15.8592 6.93387L16.4109 7.14753L15.8592 7.3612L15.655 7.93862L15.4509 7.3612L14.8992 7.14753L15.4509 6.93387L15.655 6.35645Z" fill="white" />
                </g>
                <g clipPath="url(#clip1_2692_16665)">
                    <path d="M42.9817 6.03076H40.8928H38.8039L37.0356 7.80471L40.8928 13.0355L44.7499 7.80471L42.9817 6.03076Z" fill="#558ADD" />
                    <path d="M37.0356 7.80469H39.5048L40.8928 13.0354L37.0356 7.80469Z" fill="#1F54A5" />
                    <path d="M44.75 7.80469H42.2808L40.8928 13.0354L44.75 7.80469Z" fill="#1F54A5" />
                    <path d="M42.9818 6.03076H38.804L39.5048 7.80471H42.2809L42.9818 6.03076Z" fill="#1F54A5" />
                    <path d="M39.4407 6.99951L39.6448 7.57693L40.1965 7.7906L39.6448 8.00426L39.4407 8.58168L39.2365 8.00426L38.6848 7.7906L39.2365 7.57693L39.4407 6.99951Z" fill="white" />
                </g>
                <g clipPath="url(#clip2_2692_16665)">
                    <path d="M30.7676 5.3877H28.6787H26.5898L24.8215 7.16165L28.6787 12.3924L32.5358 7.16165L30.7676 5.3877Z" fill="#558ADD" />
                    <path d="M24.8215 7.16162H27.2907L28.6787 12.3924L24.8215 7.16162Z" fill="#1F54A5" />
                    <path d="M32.5359 7.16162H30.0667L28.6787 12.3924L32.5359 7.16162Z" fill="#1F54A5" />
                    <path d="M30.7677 5.3877H26.5898L27.2907 7.16165H30.0668L30.7677 5.3877Z" fill="#1F54A5" />
                    <path d="M27.2266 6.35645L27.4307 6.93387L27.9824 7.14753L27.4307 7.3612L27.2266 7.93862L27.0224 7.3612L26.4707 7.14753L27.0224 6.93387L27.2266 6.35645Z" fill="white" />
                </g>
                <g clipPath="url(#clip3_2692_16665)">
                    <path d="M24.9817 1.53076H22.8928H20.8039L19.0356 3.30471L22.8928 8.53547L26.7499 3.30471L24.9817 1.53076Z" fill="#558ADD" />
                    <path d="M19.0356 3.30469H21.5048L22.8928 8.53544L19.0356 3.30469Z" fill="#1F54A5" />
                    <path d="M26.75 3.30469H24.2808L22.8928 8.53544L26.75 3.30469Z" fill="#1F54A5" />
                    <path d="M24.9818 1.53076H20.804L21.5048 3.30471H24.2809L24.9818 1.53076Z" fill="#1F54A5" />
                    <path d="M21.4407 2.49951L21.6448 3.07693L22.1965 3.2906L21.6448 3.50426L21.4407 4.08168L21.2365 3.50426L20.6848 3.2906L21.2365 3.07693L21.4407 2.49951Z" fill="white" />
                </g>
                <g clipPath="url(#clip4_2692_16665)">
                    <path d="M36.5532 1.53076H34.4643H32.3754L30.6072 3.30471L34.4643 8.53547L38.3215 3.30471L36.5532 1.53076Z" fill="#558ADD" />
                    <path d="M30.6072 3.30469H33.0763L34.4643 8.53544L30.6072 3.30469Z" fill="#1F54A5" />
                    <path d="M38.3215 3.30469H35.8524L34.4644 8.53544L38.3215 3.30469Z" fill="#1F54A5" />
                    <path d="M36.5533 1.53076H32.3755L33.0764 3.30471H35.8524L36.5533 1.53076Z" fill="#1F54A5" />
                    <path d="M33.0122 2.49951L33.2164 3.07693L33.7681 3.2906L33.2164 3.50426L33.0122 4.08168L32.8081 3.50426L32.2563 3.2906L32.8081 3.07693L33.0122 2.49951Z" fill="white" />
                </g>
                <g clipPath="url(#clip5_2692_16665)">
                    <path d="M11.6604 13.7451H9.5715H7.48259L5.71436 15.5191L9.5715 20.7498L13.4286 15.5191L11.6604 13.7451Z" fill="#558ADD" />
                    <path d="M5.71436 15.519H8.18348L9.5715 20.7498L5.71436 15.519Z" fill="#1F54A5" />
                    <path d="M13.4287 15.519H10.9596L9.57153 20.7498L13.4287 15.519Z" fill="#1F54A5" />
                    <path d="M11.6605 13.7451H7.48267L8.18355 15.5191H10.9596L11.6605 13.7451Z" fill="#1F54A5" />
                    <path d="M8.11938 14.7139L8.32353 15.2913L8.87523 15.505L8.32353 15.7186L8.11938 16.296L7.91523 15.7186L7.36353 15.505L7.91523 15.2913L8.11938 14.7139Z" fill="white" />
                </g>
                <g clipPath="url(#clip6_2692_16665)">
                    <path d="M21.3748 13.7451H19.2859H17.1969L15.4287 15.5191L19.2859 20.7498L23.143 15.5191L21.3748 13.7451Z" fill="#558ADD" />
                    <path d="M15.4287 15.519H17.8978L19.2859 20.7498L15.4287 15.519Z" fill="#1F54A5" />
                    <path d="M23.143 15.519H20.6739L19.2859 20.7498L23.143 15.519Z" fill="#1F54A5" />
                    <path d="M21.3748 13.7451H17.197L17.8979 15.5191H20.6739L21.3748 13.7451Z" fill="#1F54A5" />
                    <path d="M17.8337 14.7139L18.0379 15.2913L18.5896 15.505L18.0379 15.7186L17.8337 16.296L17.6296 15.7186L17.0779 15.505L17.6296 15.2913L17.8337 14.7139Z" fill="white" />
                </g>
                <g clipPath="url(#clip7_2692_16665)">
                    <path d="M31.0889 13.7451H29H26.9111L25.1428 15.5191L29 20.7498L32.8571 15.5191L31.0889 13.7451Z" fill="#558ADD" />
                    <path d="M25.1428 15.519H27.6119L29 20.7498L25.1428 15.519Z" fill="#1F54A5" />
                    <path d="M32.8571 15.519H30.388L29 20.7498L32.8571 15.519Z" fill="#1F54A5" />
                    <path d="M31.0889 13.7451H26.9111L27.612 15.5191H30.3881L31.0889 13.7451Z" fill="#1F54A5" />
                    <path d="M27.5478 14.7139L27.752 15.2913L28.3037 15.505L27.752 15.7186L27.5478 16.296L27.3437 15.7186L26.792 15.505L27.3437 15.2913L27.5478 14.7139Z" fill="white" />
                </g>
                <g clipPath="url(#clip8_2692_16665)">
                    <path d="M40.8032 13.7451H38.7143H36.6254L34.8572 15.5191L38.7143 20.7498L42.5715 15.5191L40.8032 13.7451Z" fill="#558ADD" />
                    <path d="M34.8572 15.519H37.3263L38.7143 20.7498L34.8572 15.519Z" fill="#1F54A5" />
                    <path d="M42.5715 15.519H40.1024L38.7144 20.7498L42.5715 15.519Z" fill="#1F54A5" />
                    <path d="M40.8033 13.7451H36.6255L37.3264 15.5191H40.1024L40.8033 13.7451Z" fill="#1F54A5" />
                    <path d="M37.2622 14.7139L37.4664 15.2913L38.0181 15.505L37.4664 15.7186L37.2622 16.296L37.0581 15.7186L36.5063 15.505L37.0581 15.2913L37.2622 14.7139Z" fill="white" />
                </g>
                <g clipPath="url(#clip9_2692_16665)">
                    <path d="M50.5176 13.7451H48.4287H46.3398L44.5715 15.5191L48.4287 20.7498L52.2858 15.5191L50.5176 13.7451Z" fill="#558ADD" />
                    <path d="M44.5715 15.519H47.0407L48.4287 20.7498L44.5715 15.519Z" fill="#1F54A5" />
                    <path d="M52.2859 15.519H49.8167L48.4287 20.7498L52.2859 15.519Z" fill="#1F54A5" />
                    <path d="M50.5177 13.7451H46.3398L47.0407 15.5191H49.8168L50.5177 13.7451Z" fill="#1F54A5" />
                    <path d="M46.9766 14.7139L47.1807 15.2913L47.7324 15.505L47.1807 15.7186L46.9766 16.296L46.7724 15.7186L46.2207 15.505L46.7724 15.2913L46.9766 14.7139Z" fill="white" />
                </g>
                <g clipPath="url(#clip10_2692_16665)">
                    <path d="M19.196 25.3164H17.1071H15.0182L13.25 27.0904L17.1071 32.3211L20.9643 27.0904L19.196 25.3164Z" fill="#558ADD" />
                    <path d="M13.25 27.0903H15.7191L17.1071 32.3211L13.25 27.0903Z" fill="#1F54A5" />
                    <path d="M20.9643 27.0903H18.4952L17.1072 32.3211L20.9643 27.0903Z" fill="#1F54A5" />
                    <path d="M19.1961 25.3164H15.0183L15.7192 27.0904H18.4952L19.1961 25.3164Z" fill="#1F54A5" />
                    <path d="M15.655 26.2852L15.8592 26.8626L16.4109 27.0762L15.8592 27.2899L15.655 27.8673L15.4509 27.2899L14.8992 27.0762L15.4509 26.8626L15.655 26.2852Z" fill="white" />
                </g>
                <g clipPath="url(#clip11_2692_16665)">
                    <path d="M42.9817 25.9595H40.8928H38.8039L37.0356 27.7334L40.8928 32.9642L44.7499 27.7334L42.9817 25.9595Z" fill="#558ADD" />
                    <path d="M37.0356 27.7334H39.5048L40.8928 32.9642L37.0356 27.7334Z" fill="#1F54A5" />
                    <path d="M44.75 27.7334H42.2808L40.8928 32.9642L44.75 27.7334Z" fill="#1F54A5" />
                    <path d="M42.9818 25.9595H38.804L39.5048 27.7334H42.2809L42.9818 25.9595Z" fill="#1F54A5" />
                    <path d="M39.4407 26.9282L39.6448 27.5056L40.1965 27.7193L39.6448 27.933L39.4407 28.5104L39.2365 27.933L38.6848 27.7193L39.2365 27.5056L39.4407 26.9282Z" fill="white" />
                </g>
                <g clipPath="url(#clip12_2692_16665)">
                    <path d="M30.7676 25.3164H28.6787H26.5898L24.8215 27.0904L28.6787 32.3211L32.5358 27.0904L30.7676 25.3164Z" fill="#558ADD" />
                    <path d="M24.8215 27.0903H27.2907L28.6787 32.3211L24.8215 27.0903Z" fill="#1F54A5" />
                    <path d="M32.5359 27.0903H30.0667L28.6787 32.3211L32.5359 27.0903Z" fill="#1F54A5" />
                    <path d="M30.7677 25.3164H26.5898L27.2907 27.0904H30.0668L30.7677 25.3164Z" fill="#1F54A5" />
                    <path d="M27.2266 26.2852L27.4307 26.8626L27.9824 27.0762L27.4307 27.2899L27.2266 27.8673L27.0224 27.2899L26.4707 27.0762L27.0224 26.8626L27.2266 26.2852Z" fill="white" />
                </g>
                <g clipPath="url(#clip13_2692_16665)">
                    <path d="M24.9817 29.1738H22.8928H20.8039L19.0356 30.9478L22.8928 36.1785L26.7499 30.9478L24.9817 29.1738Z" fill="#558ADD" />
                    <path d="M19.0356 30.9478H21.5048L22.8928 36.1785L19.0356 30.9478Z" fill="#1F54A5" />
                    <path d="M26.75 30.9478H24.2808L22.8928 36.1785L26.75 30.9478Z" fill="#1F54A5" />
                    <path d="M24.9818 29.1738H20.804L21.5048 30.9478H24.2809L24.9818 29.1738Z" fill="#1F54A5" />
                    <path d="M21.4407 30.1426L21.6448 30.72L22.1965 30.9337L21.6448 31.1473L21.4407 31.7247L21.2365 31.1473L20.6848 30.9337L21.2365 30.72L21.4407 30.1426Z" fill="white" />
                </g>
                <g clipPath="url(#clip14_2692_16665)">
                    <path d="M36.5532 29.1738H34.4643H32.3754L30.6072 30.9478L34.4643 36.1785L38.3215 30.9478L36.5532 29.1738Z" fill="#558ADD" />
                    <path d="M30.6072 30.9478H33.0763L34.4643 36.1785L30.6072 30.9478Z" fill="#1F54A5" />
                    <path d="M38.3215 30.9478H35.8524L34.4644 36.1785L38.3215 30.9478Z" fill="#1F54A5" />
                    <path d="M36.5533 29.1738H32.3755L33.0764 30.9478H35.8524L36.5533 29.1738Z" fill="#1F54A5" />
                    <path d="M33.0122 30.1426L33.2164 30.72L33.7681 30.9337L33.2164 31.1473L33.0122 31.7247L32.8081 31.1473L32.2563 30.9337L32.8081 30.72L33.0122 30.1426Z" fill="white" />
                </g>
                <g clipPath="url(#clip15_2692_16665)">
                    <path d="M24.9817 21.4595H22.8928H20.8039L19.0356 23.2334L22.8928 28.4642L26.7499 23.2334L24.9817 21.4595Z" fill="#558ADD" />
                    <path d="M19.0356 23.2334H21.5048L22.8928 28.4642L19.0356 23.2334Z" fill="#1F54A5" />
                    <path d="M26.75 23.2334H24.2808L22.8928 28.4642L26.75 23.2334Z" fill="#1F54A5" />
                    <path d="M24.9818 21.4595H20.804L21.5048 23.2334H24.2809L24.9818 21.4595Z" fill="#1F54A5" />
                    <path d="M21.4407 22.4282L21.6448 23.0056L22.1965 23.2193L21.6448 23.433L21.4407 24.0104L21.2365 23.433L20.6848 23.2193L21.2365 23.0056L21.4407 22.4282Z" fill="white" />
                </g>
                <g clipPath="url(#clip16_2692_16665)">
                    <path d="M36.5532 21.4595H34.4643H32.3754L30.6072 23.2334L34.4643 28.4642L38.3215 23.2334L36.5532 21.4595Z" fill="#558ADD" />
                    <path d="M30.6072 23.2334H33.0763L34.4643 28.4642L30.6072 23.2334Z" fill="#1F54A5" />
                    <path d="M38.3215 23.2334H35.8524L34.4644 28.4642L38.3215 23.2334Z" fill="#1F54A5" />
                    <path d="M36.5533 21.4595H32.3755L33.0764 23.2334H35.8524L36.5533 21.4595Z" fill="#1F54A5" />
                    <path d="M33.0122 22.4282L33.2164 23.0056L33.7681 23.2193L33.2164 23.433L33.0122 24.0104L32.8081 23.433L32.2563 23.2193L32.8081 23.0056L33.0122 22.4282Z" fill="white" />
                </g>
                <defs>
                    <clipPath id="clip0_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(13.25 4.67822)" />
                    </clipPath>
                    <clipPath id="clip1_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(37.0356 5.32129)" />
                    </clipPath>
                    <clipPath id="clip2_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(24.8215 4.67822)" />
                    </clipPath>
                    <clipPath id="clip3_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(19.0356 0.821289)" />
                    </clipPath>
                    <clipPath id="clip4_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(30.6072 0.821289)" />
                    </clipPath>
                    <clipPath id="clip5_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(5.71436 13.0356)" />
                    </clipPath>
                    <clipPath id="clip6_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(15.4287 13.0356)" />
                    </clipPath>
                    <clipPath id="clip7_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(25.1428 13.0356)" />
                    </clipPath>
                    <clipPath id="clip8_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(34.8572 13.0356)" />
                    </clipPath>
                    <clipPath id="clip9_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(44.5715 13.0356)" />
                    </clipPath>
                    <clipPath id="clip10_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(13.25 24.6069)" />
                    </clipPath>
                    <clipPath id="clip11_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(37.0356 25.25)" />
                    </clipPath>
                    <clipPath id="clip12_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(24.8215 24.6069)" />
                    </clipPath>
                    <clipPath id="clip13_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(19.0356 28.4644)" />
                    </clipPath>
                    <clipPath id="clip14_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(30.6072 28.4644)" />
                    </clipPath>
                    <clipPath id="clip15_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(19.0356 20.75)" />
                    </clipPath>
                    <clipPath id="clip16_2692_16665">
                        <rect width="7.71429" height="7.71429" fill="white" transform="translate(30.6072 20.75)" />
                    </clipPath>
                </defs>
            </svg>

        )
    }
    if (type === 'svg11') {
        return (
            <svg width="42" height="39" viewBox="0 0 42 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_2693_17050)">
                    <path d="M26.3213 3.08154H17.25H8.17874L0.5 10.7851L17.25 33.5001L34 10.7851L26.3213 3.08154Z" fill="#558ADD" />
                    <path d="M0.5 10.7852H11.2224L17.25 33.5002L0.5 10.7852Z" fill="#1F54A5" />
                    <path d="M34 10.7852H23.2776L17.25 33.5002L34 10.7852Z" fill="#1F54A5" />
                    <path d="M26.3212 3.08154H8.17871L11.2224 10.7851H23.2776L26.3212 3.08154Z" fill="#1F54A5" />
                    <path d="M10.944 7.28711L11.8305 9.79461L14.2263 10.7225L11.8305 11.6503L10.944 14.1578L10.0574 11.6503L7.66162 10.7225L10.0574 9.79461L10.944 7.28711Z" fill="white" />
                </g>
                <path d="M19.5 27C19.5 32.5263 23.9737 37 29.5 37C35.0263 37 39.5 32.5263 39.5 27C39.5 21.4737 35.0263 17 29.5 17C23.9737 17 19.5 21.4737 19.5 27ZM28.5 26.9474V22C28.5 21.4561 28.9561 21 29.5 21C30.0439 21 30.5 21.4561 30.5 22V26.5789L33.8684 29.9649C34.0614 30.1404 34.1667 30.386 34.1667 30.6667C34.1667 31.2105 33.7105 31.6667 33.1667 31.6667C32.886 31.6667 32.6404 31.5614 32.4649 31.3684L28.8333 27.7368C28.6228 27.5439 28.5 27.2281 28.5 26.9474Z" fill="#F2B805" />
                <defs>
                    <clipPath id="clip0_2693_17050">
                        <rect width="33.5" height="33.5" fill="white" transform="translate(0.5)" />
                    </clipPath>
                </defs>
            </svg>

        )
    }
    if (type === 'afzayeshe_etebar') {
        return (
            <svg width="50" height="44" viewBox="0 0 50 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M-1.29256e-06 3.89159L-1.70109e-07 29.5703C-7.63481e-08 31.7153 1.7563 33.4619 3.91317 33.4619L18.0868 33.4619C20.2437 33.4619 22 31.7153 22 29.5703L22 3.89159C22 1.74659 20.2437 -4.66612e-05 18.0868 -4.6567e-05L3.91317 -4.59474e-05C1.72549 -4.58518e-05 -1.38632e-06 1.74659 -1.29256e-06 3.89159Z" fill="#C99B36" />
                <path d="M-1.29256e-06 5.17822L-1.70109e-07 30.8569C-7.6348e-08 33.0019 1.7563 34.7485 3.91317 34.7485L18.0868 34.7485C20.2437 34.7485 22 33.0019 22 30.8569L22 5.17822C22 3.03322 20.2437 1.28657 18.0868 1.28657L3.91317 1.28658C1.72549 1.28658 -1.38632e-06 3.03322 -1.29256e-06 5.17822Z" fill="#F7CA41" />
                <path d="M12.6328 1.31722L12.6328 34.7485L17.0698 34.7485L17.0698 1.31722L12.6328 1.31722Z" fill="#4D4D4F" />
                <path d="M5.57617 4.16746L5.57617 9.07031L10.5061 9.07031L10.5061 4.16746L5.57617 4.16746Z" fill="#FFFAD1" />
                <path d="M9.58203 21.359L9.58203 31.8389L10.5064 31.8389L10.5064 21.359L9.58203 21.359Z" fill="#FFFAD1" />
                <path d="M7.58008 21.359L7.58008 31.8389L8.50445 31.8389L8.50445 21.359L7.58008 21.359Z" fill="#FFFAD1" />
                <path d="M5.57617 21.359L5.57617 31.8389L6.50054 31.8389L6.50054 21.359L5.57617 21.359Z" fill="#FFFAD1" />
                <path d="M36.821 32.8934C35.5466 32.136 33.6114 31.6626 31.4402 31.6626C29.269 31.6626 27.3338 32.136 26.0594 32.8934H24.5254V34.9762C24.5254 36.7987 27.617 38.2898 31.4166 38.2898C35.2162 38.2898 38.3078 36.7987 38.3078 34.9762V32.8934H36.821Z" fill="#C99B36" />
                <path d="M31.44 36.2068C35.2459 36.2068 38.3312 34.7232 38.3312 32.8932C38.3312 31.0631 35.2459 29.5796 31.44 29.5796C27.6341 29.5796 24.5488 31.0631 24.5488 32.8932C24.5488 34.7232 27.6341 36.2068 31.44 36.2068Z" fill="#F7CA41" />
                <path d="M29.1973 33.5324C29.5041 33.6035 29.8109 33.6508 30.0705 33.6745C30.3301 33.6981 30.5661 33.7218 30.7549 33.7218C30.9201 33.7218 31.0617 33.6981 31.1797 33.6745C31.2977 33.6271 31.3685 33.5798 31.3685 33.5088C31.3685 33.4851 31.3685 33.4851 31.3449 33.4614C31.3449 33.4378 31.3213 33.4378 31.2977 33.4141C31.2741 33.3904 31.2505 33.3904 31.2269 33.3668C31.2033 33.3431 31.1561 33.3194 31.1325 33.3194C31.1089 33.2958 31.0145 33.2484 30.8257 33.1774C30.3065 32.9407 29.9761 32.7751 29.8109 32.6804C29.6693 32.6094 29.5749 32.5147 29.5041 32.42C29.4333 32.3254 29.3861 32.2307 29.3861 32.136C29.3861 32.065 29.4097 31.994 29.4569 31.923C29.5041 31.852 29.5749 31.781 29.6457 31.7336C29.7401 31.6626 29.8345 31.6153 29.9525 31.568C30.0705 31.5206 30.1885 31.4733 30.3301 31.4496C30.4717 31.426 30.6841 31.3786 30.9437 31.3549C30.9437 31.3076 30.9437 31.2839 30.9437 31.2603V31.1183V30.8579C31.2977 30.8579 31.5809 30.8579 31.8169 30.8579C32.0765 30.8579 32.3597 30.8579 32.6901 30.8579C32.6665 31.0236 32.6665 31.1183 32.6665 31.1656V31.3076C32.9733 31.3313 33.3037 31.3549 33.6105 31.4023C33.6341 31.6626 33.6577 31.8993 33.7049 32.1833C33.4453 32.136 33.2093 32.0887 32.9969 32.065C32.7845 32.0413 32.5957 32.0177 32.4541 32.0177C32.2889 32.0177 32.1473 32.0413 32.0529 32.065C31.9349 32.1123 31.8877 32.1597 31.8877 32.207C31.8877 32.2544 31.9113 32.3017 31.9821 32.349C32.0529 32.3964 32.1237 32.4437 32.2417 32.491C32.6665 32.6804 32.9733 32.8224 33.1621 32.9407C33.3509 33.0591 33.4925 33.1538 33.5869 33.2721C33.6577 33.3668 33.7049 33.4614 33.7049 33.5798C33.7049 33.6508 33.6813 33.7455 33.6341 33.8165C33.5869 33.8875 33.5161 33.9585 33.4453 34.0058C33.3509 34.0768 33.2565 34.1242 33.1621 34.1715C33.0441 34.2188 32.9497 34.2662 32.8317 34.2898C32.7137 34.3135 32.5485 34.3608 32.3125 34.4082V34.6922C32.3125 34.7869 32.3125 34.8815 32.3125 34.9762C31.9585 34.9762 31.6753 34.9762 31.4865 34.9762C31.2741 34.9762 30.9673 34.9762 30.5897 34.9762C30.6133 34.8579 30.6133 34.7395 30.6133 34.5739V34.4792C30.3537 34.4555 30.1413 34.4555 29.9525 34.4318C29.7873 34.4082 29.5749 34.3845 29.3153 34.3372C29.2681 33.9348 29.2209 33.6745 29.1973 33.5324Z" fill="#FFFAD1" />
                <path d="M36.821 30.2425C35.5466 29.4851 33.6114 29.0117 31.4402 29.0117C29.269 29.0117 27.3338 29.4851 26.0594 30.2425H24.5254V32.3253C24.5254 34.1478 27.617 35.6389 31.4166 35.6389C35.2162 35.6389 38.3078 34.1478 38.3078 32.3253V30.2425H36.821Z" fill="#C99B36" />
                <path d="M31.44 33.5559C35.2459 33.5559 38.3312 32.0723 38.3312 30.2423C38.3312 28.4123 35.2459 26.9287 31.44 26.9287C27.6341 26.9287 24.5488 28.4123 24.5488 30.2423C24.5488 32.0723 27.6341 33.5559 31.44 33.5559Z" fill="#F7CA41" />
                <path d="M29.1973 30.8816C29.5041 30.9526 29.8109 30.9999 30.0705 31.0236C30.3301 31.0709 30.5661 31.0709 30.7549 31.0709C30.9201 31.0709 31.0617 31.0472 31.1797 31.0236C31.2977 30.9762 31.3685 30.9289 31.3685 30.8579C31.3685 30.8342 31.3685 30.8342 31.3449 30.8106C31.3449 30.7869 31.3213 30.7869 31.2977 30.7632C31.2741 30.7396 31.2505 30.7396 31.2269 30.7159C31.2033 30.6922 31.1561 30.6686 31.1325 30.6686C31.1089 30.6449 31.0145 30.5975 30.8257 30.5265C30.3065 30.2899 29.9761 30.1242 29.8109 30.0295C29.6693 29.9585 29.5749 29.8638 29.5041 29.7691C29.4333 29.6745 29.3861 29.5798 29.3861 29.4851C29.3861 29.4141 29.4097 29.3431 29.4569 29.2721C29.5041 29.2011 29.5749 29.1301 29.6457 29.0828C29.7401 29.0118 29.8345 28.9644 29.9525 28.9171C30.0705 28.8697 30.1885 28.8224 30.3301 28.7987C30.4717 28.7751 30.6841 28.7277 30.9437 28.7041C30.9437 28.6567 30.9437 28.6331 30.9437 28.6094V28.4674V28.207C31.2977 28.207 31.5809 28.207 31.8169 28.207C32.0765 28.207 32.3597 28.207 32.6901 28.207C32.6665 28.3727 32.6665 28.4674 32.6665 28.5147V28.7041C32.9733 28.7277 33.3037 28.7514 33.6105 28.7987C33.6341 29.0591 33.6577 29.2958 33.7049 29.5798C33.4453 29.5325 33.2093 29.4851 32.9969 29.4615C32.7845 29.4378 32.5957 29.4141 32.4541 29.4141C32.2889 29.4141 32.1473 29.4378 32.0529 29.4615C31.9349 29.5088 31.8877 29.5561 31.8877 29.6035C31.8877 29.6508 31.9113 29.6981 31.9821 29.7455C32.0529 29.7928 32.1237 29.8402 32.2417 29.8875C32.6665 30.0768 32.9733 30.2188 33.1621 30.3372C33.3509 30.4555 33.4925 30.5502 33.5869 30.6686C33.6577 30.7632 33.7049 30.8579 33.7049 30.9762C33.7049 31.0472 33.6813 31.1419 33.6341 31.2129C33.5869 31.2839 33.5161 31.3549 33.4453 31.4023C33.3509 31.4733 33.2565 31.5206 33.1621 31.568C33.0441 31.6153 32.9497 31.6626 32.8317 31.6863C32.7137 31.71 32.5485 31.7573 32.3125 31.8046V32.0887C32.3125 32.1833 32.3125 32.278 32.3125 32.3727C31.9585 32.3727 31.6753 32.3727 31.4865 32.3727C31.2741 32.3727 30.9673 32.3727 30.5897 32.3727C30.6133 32.2543 30.6133 32.136 30.6133 31.9703V31.8756C30.3537 31.852 30.1413 31.852 29.9525 31.8283C29.7873 31.8046 29.5749 31.781 29.3153 31.7336C29.2681 31.2839 29.2209 31.0236 29.1973 30.8816Z" fill="#FFFAD1" />
                <path d="M36.821 27.5916C35.5466 26.8342 33.6114 26.3608 31.4402 26.3608C29.269 26.3608 27.3338 26.8342 26.0594 27.5916H24.5254V29.6744C24.5254 31.4969 27.617 32.988 31.4166 32.988C35.2162 32.988 38.3078 31.4969 38.3078 29.6744V27.5916H36.821Z" fill="#C99B36" />
                <path d="M38.3547 27.5914C38.3547 29.4139 35.2631 30.905 31.4635 30.905C27.6639 30.905 24.5723 29.4139 24.5723 27.5914C24.5723 25.7689 27.6639 24.2778 31.4635 24.2778C35.2631 24.2778 38.3547 25.7689 38.3547 27.5914Z" fill="#F7CA41" />
                <path d="M29.1973 28.2307C29.5041 28.3017 29.8109 28.349 30.0705 28.3727C30.3301 28.3964 30.5661 28.42 30.7549 28.42C30.9201 28.42 31.0617 28.3964 31.1797 28.3727C31.2977 28.3254 31.3685 28.278 31.3685 28.207C31.3685 28.1834 31.3685 28.1834 31.3449 28.1597C31.3449 28.136 31.3213 28.136 31.2977 28.1123C31.2741 28.0887 31.2505 28.0887 31.2269 28.065C31.2033 28.0413 31.1561 28.0177 31.1325 28.0177C31.1089 27.994 31.0145 27.9467 30.8257 27.8757C30.3065 27.639 29.9761 27.4733 29.8109 27.3786C29.6693 27.3076 29.5749 27.2129 29.5041 27.1183C29.4333 27.0236 29.3861 26.9289 29.3861 26.8342C29.3861 26.7632 29.4097 26.6922 29.4569 26.6212C29.5041 26.5502 29.5749 26.4792 29.6457 26.4319C29.7401 26.3609 29.8345 26.3135 29.9525 26.2662C30.0705 26.2189 30.1885 26.1715 30.3301 26.1479C30.4717 26.1242 30.6841 26.0769 30.9437 26.0532C30.9437 26.0059 30.9437 25.9822 30.9437 25.9585V25.8165V25.5562C31.2977 25.5562 31.5809 25.5562 31.8169 25.5562C32.0765 25.5562 32.3597 25.5562 32.6901 25.5562C32.6665 25.7218 32.6665 25.8165 32.6665 25.8638V26.0532C32.9733 26.0769 33.3037 26.1005 33.6105 26.1479C33.6341 26.4082 33.6577 26.6449 33.7049 26.9289C33.4453 26.8816 33.2093 26.8342 32.9969 26.8106C32.7845 26.7869 32.5957 26.7632 32.4541 26.7632C32.2889 26.7632 32.1473 26.7869 32.0529 26.8106C31.9349 26.8579 31.8877 26.9053 31.8877 26.9526C31.8877 26.9999 31.9113 27.0473 31.9821 27.0946C32.0529 27.1419 32.1237 27.1893 32.2417 27.2366C32.6665 27.426 32.9733 27.568 33.1621 27.6863C33.3509 27.8047 33.4925 27.8993 33.5869 28.0177C33.6577 28.1123 33.7049 28.207 33.7049 28.3254C33.7049 28.3964 33.6813 28.491 33.6341 28.562C33.5869 28.6331 33.5161 28.7041 33.4453 28.7514C33.3509 28.8224 33.2565 28.8697 33.1621 28.9171C33.0441 28.9644 32.9497 29.0117 32.8317 29.0354C32.7137 29.0591 32.5485 29.1064 32.3125 29.1538V29.4378C32.3125 29.5325 32.3125 29.6271 32.3125 29.7218C31.9585 29.7218 31.6753 29.7218 31.4865 29.7218C31.2741 29.7218 30.9673 29.7218 30.5897 29.7218C30.6133 29.6035 30.6133 29.4851 30.6133 29.3194V29.1774C30.3537 29.1538 30.1413 29.1538 29.9525 29.1301C29.7873 29.1064 29.5749 29.0828 29.3153 29.0354C29.2681 28.6567 29.2209 28.3964 29.1973 28.2307Z" fill="#FFFAD1" />
                <path d="M36.821 24.9646C35.5466 24.2073 33.6114 23.7339 31.4402 23.7339C29.269 23.7339 27.3338 24.2073 26.0594 24.9646H24.5254V27.0475C24.5254 28.8699 27.617 30.3611 31.4166 30.3611C35.2162 30.3611 38.3078 28.8699 38.3078 27.0475V24.9646H36.821Z" fill="#C99B36" />
                <path d="M38.3547 24.9645C38.3547 26.7869 35.2631 28.278 31.4635 28.278C27.6639 28.278 24.5723 26.7869 24.5723 24.9645C24.5723 23.142 27.6639 21.6509 31.4635 21.6509C35.2631 21.6509 38.3547 23.1183 38.3547 24.9645Z" fill="#F7CA41" />
                <path d="M29.1973 25.6037C29.5041 25.6747 29.8109 25.7221 30.0705 25.7457C30.3301 25.7694 30.5661 25.7931 30.7549 25.7931C30.9201 25.7931 31.0617 25.7694 31.1797 25.7457C31.2977 25.6984 31.3685 25.6511 31.3685 25.5801C31.3685 25.5564 31.3685 25.5564 31.3449 25.5327C31.3449 25.5091 31.3213 25.5091 31.2977 25.4854C31.2741 25.4617 31.2505 25.4617 31.2269 25.4381C31.2033 25.4144 31.1561 25.3907 31.1325 25.3907C31.1089 25.3671 31.0145 25.3197 30.8257 25.2487C30.3065 25.012 29.9761 24.8463 29.8109 24.7517C29.6693 24.6807 29.5749 24.586 29.5041 24.4913C29.4333 24.3966 29.3861 24.302 29.3861 24.2073C29.3861 24.1363 29.4097 24.0653 29.4569 23.9943C29.5041 23.9233 29.5749 23.8523 29.6457 23.8049C29.7401 23.7339 29.8345 23.6866 29.9525 23.6393C30.0705 23.5919 30.1885 23.5446 30.3301 23.5209C30.4717 23.4972 30.6841 23.4499 30.9437 23.4262C30.9437 23.3789 30.9437 23.3552 30.9437 23.3316V23.1896V22.9292C31.2977 22.9292 31.5809 22.9292 31.8169 22.9292C32.0765 22.9292 32.3597 22.9292 32.6901 22.9292C32.6665 23.0949 32.6665 23.1896 32.6665 23.2369V23.4262C32.9733 23.4499 33.3037 23.4736 33.6105 23.5209C33.6341 23.7813 33.6577 24.0179 33.7049 24.302C33.4453 24.2546 33.2093 24.2073 32.9969 24.1836C32.7845 24.16 32.5957 24.1363 32.4541 24.1363C32.2889 24.1363 32.1473 24.16 32.0529 24.1836C31.9349 24.231 31.8877 24.2783 31.8877 24.3256C31.8877 24.373 31.9113 24.4203 31.9821 24.4676C32.0529 24.515 32.1237 24.5623 32.2417 24.6097C32.6665 24.799 32.9733 24.941 33.1621 25.0594C33.3509 25.1777 33.4925 25.2724 33.5869 25.3907C33.6577 25.4854 33.7049 25.5801 33.7049 25.6984C33.7049 25.7694 33.6813 25.8641 33.6341 25.9351C33.5869 26.0061 33.5161 26.0771 33.4453 26.1244C33.3509 26.1954 33.2565 26.2428 33.1621 26.2901C33.0441 26.3375 32.9497 26.3848 32.8317 26.4085C32.7137 26.4321 32.5485 26.4795 32.3125 26.5268V26.8108C32.3125 26.9055 32.3125 27.0002 32.3125 27.0948C31.9585 27.0948 31.6753 27.0948 31.4865 27.0948C31.2741 27.0948 30.9673 27.0948 30.5897 27.0948C30.6133 26.9765 30.6133 26.8582 30.6133 26.6925V26.5978C30.3537 26.5741 30.1413 26.5741 29.9525 26.5505C29.7873 26.5268 29.5749 26.5031 29.3153 26.4558C29.2681 26.0061 29.2209 25.7457 29.1973 25.6037Z" fill="#FFFAD1" />
                <path d="M36.821 22.3138C35.5466 21.5564 33.6114 21.083 31.4402 21.083C29.269 21.083 27.3338 21.5564 26.0594 22.3138H24.5254V24.3966C24.5254 26.2191 27.617 27.7102 31.4166 27.7102C35.2162 27.7102 38.3078 26.2191 38.3078 24.3966V22.3138H36.821Z" fill="#C99B36" />
                <path d="M38.3547 22.3136C38.3547 24.1361 35.2631 25.6272 31.4635 25.6272C27.6639 25.6272 24.5723 24.1361 24.5723 22.3136C24.5723 20.4911 27.6639 19 31.4635 19C35.2631 19 38.3547 20.4911 38.3547 22.3136Z" fill="#F7CA41" />
                <path d="M29.1973 22.9529C29.5041 23.0239 29.8109 23.0712 30.0705 23.0949C30.3301 23.1185 30.5661 23.1422 30.7549 23.1422C30.9201 23.1422 31.0617 23.1185 31.1797 23.0949C31.2977 23.0475 31.3685 23.0002 31.3685 22.9292C31.3685 22.9055 31.3685 22.9055 31.3449 22.8819C31.3449 22.8582 31.3213 22.8582 31.2977 22.8345C31.2741 22.8108 31.2505 22.8108 31.2269 22.7872C31.2033 22.7635 31.1561 22.7398 31.1325 22.7398C31.1089 22.7162 31.0145 22.6688 30.8257 22.5978C30.3065 22.3611 29.9761 22.1955 29.8109 22.1008C29.6693 22.0298 29.5749 21.9351 29.5041 21.8404C29.4333 21.7458 29.3861 21.6511 29.3861 21.5564C29.3861 21.4854 29.4097 21.4144 29.4569 21.3434C29.5041 21.2724 29.5749 21.2014 29.6457 21.1541C29.7401 21.083 29.8345 21.0357 29.9525 20.9884C30.0705 20.941 30.1885 20.8937 30.3301 20.87C30.4717 20.8464 30.6841 20.799 30.9437 20.7754C30.9437 20.728 30.9437 20.7044 30.9437 20.6807V20.5387V20.2783C31.2977 20.2783 31.5809 20.2783 31.8169 20.2783C32.0765 20.2783 32.3597 20.2783 32.6901 20.2783C32.6665 20.444 32.6665 20.5387 32.6665 20.586V20.7754C32.9733 20.799 33.3037 20.8227 33.6105 20.87C33.6341 21.1304 33.6577 21.3671 33.7049 21.6511C33.4453 21.6038 33.2093 21.5564 32.9969 21.5327C32.7845 21.5091 32.5957 21.4854 32.4541 21.4854C32.2889 21.4854 32.1473 21.5091 32.0529 21.5327C31.9349 21.5801 31.8877 21.6274 31.8877 21.6748C31.8877 21.7221 31.9113 21.7694 31.9821 21.8168C32.0529 21.8641 32.1237 21.9114 32.2417 21.9588C32.6665 22.1481 32.9733 22.2901 33.1621 22.4085C33.3509 22.5268 33.4925 22.6215 33.5869 22.7398C33.6577 22.8345 33.7049 22.9292 33.7049 23.0475C33.7049 23.1185 33.6813 23.2132 33.6341 23.2842C33.5869 23.3552 33.5161 23.4262 33.4453 23.4736C33.3509 23.5446 33.2565 23.5919 33.1621 23.6392C33.0441 23.6866 32.9497 23.7339 32.8317 23.7576C32.7137 23.7813 32.5485 23.8286 32.3125 23.8759V24.1599C32.3125 24.2546 32.3125 24.3493 32.3125 24.444C31.9585 24.444 31.6753 24.444 31.4865 24.444C31.2741 24.444 30.9673 24.444 30.5897 24.444C30.6133 24.3256 30.6133 24.2073 30.6133 24.0416V23.9469C30.3537 23.9233 30.1413 23.9233 29.9525 23.8996C29.7873 23.8759 29.5749 23.8523 29.3153 23.8049C29.2681 23.3552 29.2209 23.0949 29.1973 22.9529Z" fill="#FFFAD1" />
                <path d="M47.6765 35.1653C46.4021 34.4079 44.4669 33.9346 42.2957 33.9346C40.1245 33.9346 38.1893 34.4079 36.9149 35.1653H35.3809V37.2482C35.3809 39.0706 38.4725 40.5617 42.2721 40.5617C46.0717 40.5617 49.1633 39.0706 49.1633 37.2482V35.1653H47.6765Z" fill="#C99B36" />
                <path d="M49.2101 35.1651C49.2101 36.9876 46.1185 38.4787 42.3189 38.4787C38.5193 38.4787 35.4277 36.9876 35.4277 35.1651C35.4277 33.3427 38.5193 31.8516 42.3189 31.8516C46.1185 31.8516 49.2101 33.3427 49.2101 35.1651Z" fill="#F7CA41" />
                <path d="M40.0762 35.8044C40.383 35.8754 40.6898 35.9228 40.9494 35.9464C41.209 35.9701 41.445 35.9938 41.6338 35.9938C41.799 35.9938 41.9406 35.9701 42.0586 35.9464C42.1766 35.8991 42.2474 35.8518 42.2474 35.7808C42.2474 35.7571 42.2474 35.7571 42.2238 35.7334C42.2238 35.7097 42.2002 35.7097 42.1766 35.6861C42.153 35.6624 42.1294 35.6624 42.1058 35.6387C42.0822 35.6151 42.035 35.5914 42.0114 35.5914C41.9878 35.5677 41.8934 35.5204 41.7046 35.4494C41.1854 35.2127 40.855 35.047 40.6898 34.9524C40.5482 34.8813 40.4538 34.7867 40.383 34.692C40.3122 34.5973 40.265 34.5027 40.265 34.408C40.265 34.337 40.2886 34.266 40.3358 34.195C40.383 34.124 40.4538 34.053 40.5246 34.0056C40.619 33.9346 40.7134 33.8873 40.8314 33.8399C40.9494 33.7926 41.0674 33.7453 41.209 33.7216C41.3506 33.6979 41.563 33.6506 41.8226 33.6269C41.8226 33.5796 41.8226 33.5559 41.8226 33.5322V33.3902V33.1299C42.1766 33.1299 42.4598 33.1299 42.6958 33.1299C42.9554 33.1299 43.2386 33.1299 43.569 33.1299C43.5454 33.2956 43.5454 33.3902 43.5454 33.4376V33.6269C43.8522 33.6506 44.1826 33.6743 44.4894 33.7216C44.513 33.9819 44.5366 34.2186 44.5838 34.5027C44.3242 34.4553 44.0882 34.408 43.8758 34.3843C43.6634 34.3606 43.4746 34.337 43.333 34.337C43.1678 34.337 43.0262 34.3606 42.9318 34.3843C42.8138 34.4316 42.7666 34.479 42.7666 34.5263C42.7666 34.5737 42.7902 34.621 42.861 34.6683C42.9318 34.7157 43.0026 34.763 43.1206 34.8103C43.5454 34.9997 43.8522 35.1417 44.041 35.26C44.2298 35.3784 44.3714 35.4731 44.4658 35.5914C44.5366 35.6861 44.5838 35.7808 44.5838 35.8991C44.5838 35.9701 44.5602 36.0648 44.513 36.1358C44.4658 36.2068 44.395 36.2778 44.3242 36.3251C44.2298 36.3961 44.1354 36.4435 44.041 36.4908C43.923 36.5381 43.8286 36.5855 43.7106 36.6091C43.5926 36.6328 43.4274 36.6802 43.1914 36.7275V37.0115C43.1914 37.1062 43.1914 37.2009 43.1914 37.2955C42.8374 37.2955 42.5542 37.2955 42.3654 37.2955C42.153 37.2955 41.8462 37.2955 41.4686 37.2955C41.4922 37.1772 41.4922 37.0588 41.4922 36.8932V36.7512C41.2326 36.7275 41.0202 36.7275 40.8314 36.7038C40.6662 36.6802 40.4538 36.6565 40.1942 36.6091C40.1234 36.2068 40.0998 35.9464 40.0762 35.8044Z" fill="#FFFAD1" />
                <path d="M47.6765 32.5149C46.4021 31.7575 44.4669 31.2842 42.2957 31.2842C40.1245 31.2842 38.1893 31.7575 36.9149 32.5149H35.3809V34.5978C35.3809 36.4202 38.4725 37.9113 42.2721 37.9113C46.0717 37.9113 49.1633 36.4202 49.1633 34.5978V32.5149H47.6765Z" fill="#C99B36" />
                <path d="M49.2101 32.5148C49.2101 34.3372 46.1185 35.8283 42.3189 35.8283C38.5193 35.8283 35.4277 34.3372 35.4277 32.5148C35.4277 30.6923 38.5193 29.2012 42.3189 29.2012C46.1185 29.2012 49.2101 30.6923 49.2101 32.5148Z" fill="#F7CA41" />
                <path d="M40.0762 33.154C40.383 33.225 40.6898 33.2724 40.9494 33.296C41.209 33.3197 41.445 33.3434 41.6338 33.3434C41.799 33.3434 41.9406 33.3197 42.0586 33.296C42.1766 33.2487 42.2474 33.2014 42.2474 33.1304C42.2474 33.1067 42.2474 33.1067 42.2238 33.083C42.2238 33.0594 42.2002 33.0594 42.1766 33.0357C42.153 33.012 42.1294 33.012 42.1058 32.9883C42.0822 32.9647 42.035 32.941 42.0114 32.941C41.9878 32.9173 41.8934 32.87 41.7046 32.799C41.1854 32.5623 40.855 32.3966 40.6898 32.302C40.5482 32.231 40.4538 32.1363 40.383 32.0416C40.3122 31.9469 40.265 31.8523 40.265 31.7576C40.265 31.6866 40.2886 31.6156 40.3358 31.5446C40.383 31.4736 40.4538 31.4026 40.5246 31.3552C40.5954 31.3079 40.7134 31.2369 40.8314 31.1895C40.9494 31.1422 41.0674 31.0949 41.209 31.0712C41.3506 31.0475 41.563 31.0002 41.8226 30.9765C41.8226 30.9292 41.8226 30.9055 41.8226 30.8819V30.7398V30.4795C42.1766 30.4795 42.4598 30.4795 42.6958 30.4795C42.9554 30.4795 43.2386 30.4795 43.569 30.4795C43.5454 30.6452 43.5454 30.7398 43.5454 30.7872V30.9765C43.8522 31.0002 44.1826 31.0239 44.4894 31.0712C44.513 31.3316 44.5366 31.5682 44.5838 31.8523C44.3242 31.8049 44.0882 31.7576 43.8758 31.7339C43.6634 31.7103 43.4746 31.6866 43.333 31.6866C43.1678 31.6866 43.0262 31.7103 42.9318 31.7339C42.8138 31.7813 42.7666 31.8286 42.7666 31.8759C42.7666 31.9233 42.7902 31.9706 42.861 32.0179C42.9318 32.0653 43.0026 32.1126 43.1206 32.16C43.5454 32.3493 43.8522 32.4913 44.041 32.6097C44.2298 32.728 44.3714 32.8227 44.4658 32.941C44.5366 33.0357 44.5838 33.1304 44.5838 33.2487C44.5838 33.3197 44.5602 33.4144 44.513 33.4854C44.4658 33.5564 44.395 33.6274 44.3242 33.6747C44.2298 33.7457 44.1354 33.7931 44.041 33.8404C43.923 33.8877 43.8286 33.9351 43.7106 33.9588C43.5926 33.9824 43.4274 34.0298 43.1914 34.0771V34.3611C43.1914 34.4558 43.1914 34.5505 43.1914 34.6451C42.8374 34.6451 42.5542 34.6451 42.3654 34.6451C42.153 34.6451 41.8462 34.6451 41.4686 34.6451C41.4922 34.5268 41.4922 34.4085 41.4922 34.2428V34.1481C41.2326 34.1244 41.0202 34.1244 40.8314 34.1008C40.6662 34.0771 40.4538 34.0534 40.1942 34.0061C40.1234 33.5801 40.0998 33.296 40.0762 33.154Z" fill="#FFFAD1" />
                <path d="M47.6765 29.8875C46.4021 29.1301 44.4669 28.6567 42.2957 28.6567C40.1245 28.6567 38.1893 29.1301 36.9149 29.8875H35.3809V31.9703C35.3809 33.7928 38.4725 35.2839 42.2721 35.2839C46.0717 35.2839 49.1633 33.7928 49.1633 31.9703V29.8875H47.6765Z" fill="#C99B36" />
                <path d="M42.3189 33.2009C46.1248 33.2009 49.2101 31.7174 49.2101 29.8873C49.2101 28.0573 46.1248 26.5737 42.3189 26.5737C38.513 26.5737 35.4277 28.0573 35.4277 29.8873C35.4277 31.7174 38.513 33.2009 42.3189 33.2009Z" fill="#F7CA41" />
                <path d="M40.0762 30.5266C40.383 30.5976 40.6898 30.6449 40.9494 30.6686C41.209 30.6923 41.445 30.7159 41.6338 30.7159C41.799 30.7159 41.9406 30.6923 42.0586 30.6686C42.1766 30.6213 42.2474 30.5739 42.2474 30.5029C42.2474 30.4792 42.2474 30.4792 42.2238 30.4556C42.2238 30.4319 42.2002 30.4319 42.1766 30.4082C42.153 30.3846 42.1294 30.3846 42.1058 30.3609C42.0822 30.3372 42.035 30.3136 42.0114 30.3136C41.9878 30.2899 41.8934 30.2426 41.7046 30.1716C41.1854 29.9349 40.855 29.7692 40.6898 29.6745C40.5482 29.6035 40.4538 29.5088 40.383 29.4142C40.3122 29.3195 40.265 29.2248 40.265 29.1301C40.265 29.0591 40.2886 28.9881 40.3358 28.9171C40.383 28.8461 40.4538 28.7751 40.5246 28.7278C40.5954 28.6804 40.7134 28.6094 40.8314 28.5621C40.9494 28.5148 41.0674 28.4674 41.209 28.4438C41.3506 28.4201 41.563 28.3728 41.8226 28.3491C41.8226 28.3018 41.8226 28.2781 41.8226 28.2544V28.1124V27.8521C42.1766 27.8521 42.4598 27.8521 42.6958 27.8521C42.9554 27.8521 43.2386 27.8521 43.569 27.8521C43.5454 28.0177 43.5454 28.1124 43.5454 28.1597V28.3491C43.8522 28.3728 44.1826 28.3964 44.4894 28.4438C44.513 28.7041 44.5366 28.9408 44.5838 29.2248C44.3242 29.1775 44.0882 29.1301 43.8758 29.1065C43.6634 29.0828 43.4746 29.0591 43.333 29.0591C43.1678 29.0591 43.0262 29.0828 42.9318 29.1065C42.8138 29.1538 42.7666 29.2012 42.7666 29.2485C42.7666 29.2958 42.7902 29.3432 42.861 29.3905C42.9318 29.4378 43.0026 29.4852 43.1206 29.5325C43.5454 29.7219 43.8522 29.8639 44.041 29.9822C44.2298 30.1006 44.3714 30.1952 44.4658 30.3136C44.5366 30.4082 44.5838 30.5029 44.5838 30.6213C44.5838 30.6923 44.5602 30.7869 44.513 30.8579C44.4658 30.9289 44.395 31 44.3242 31.0473C44.2298 31.1183 44.1354 31.1656 44.041 31.213C43.923 31.2603 43.8286 31.3076 43.7106 31.3313C43.5926 31.355 43.4274 31.4023 43.1914 31.4497V31.7337C43.1914 31.8284 43.1914 31.923 43.1914 32.0177C42.8374 32.0177 42.5542 32.0177 42.3654 32.0177C42.153 32.0177 41.8462 32.0177 41.4686 32.0177C41.4922 31.8994 41.4922 31.781 41.4922 31.6153V31.5207C41.2326 31.497 41.0202 31.497 40.8314 31.4733C40.6662 31.4497 40.4538 31.426 40.1942 31.3787C40.1234 30.929 40.0998 30.6686 40.0762 30.5266Z" fill="#FFFAD1" />
                <path d="M34.2956 38.2898C33.0212 37.5325 31.086 37.0591 28.9148 37.0591C26.7436 37.0591 24.8084 37.5325 23.534 38.2898H22V40.3727C22 42.1951 25.0916 43.6862 28.8912 43.6862C32.6908 43.6862 35.7824 42.1951 35.7824 40.3727V38.2898H34.2956Z" fill="#C99B36" />
                <path d="M28.9146 41.6032C32.7205 41.6032 35.8058 40.1197 35.8058 38.2897C35.8058 36.4596 32.7205 34.9761 28.9146 34.9761C25.1087 34.9761 22.0234 36.4596 22.0234 38.2897C22.0234 40.1197 25.1087 41.6032 28.9146 41.6032Z" fill="#F7CA41" />
                <path d="M26.6719 38.9289C26.9787 38.9999 27.2855 39.0473 27.5451 39.0709C27.8047 39.0946 28.0407 39.1183 28.2295 39.1183C28.3947 39.1183 28.5363 39.0946 28.6543 39.0709C28.7723 39.0236 28.8431 38.9763 28.8431 38.9053C28.8431 38.8816 28.8431 38.8816 28.8195 38.8579C28.8195 38.8343 28.7959 38.8343 28.7723 38.8106C28.7487 38.7869 28.7251 38.7869 28.7015 38.7633C28.6779 38.7396 28.6307 38.7159 28.6071 38.7159C28.5835 38.6922 28.4891 38.6449 28.3003 38.5739C27.7811 38.3372 27.4507 38.1715 27.2855 38.0769C27.1439 38.0059 27.0495 37.9112 26.9787 37.8165C26.9079 37.7218 26.8607 37.6272 26.8607 37.5325C26.8607 37.4615 26.8843 37.3905 26.9315 37.3195C26.9787 37.2485 27.0495 37.1775 27.1203 37.1301C27.2147 37.0591 27.3091 37.0118 27.4271 36.9644C27.5451 36.9171 27.6631 36.8698 27.8047 36.8461C27.9463 36.8224 28.1587 36.7751 28.4183 36.7514C28.4183 36.7041 28.4183 36.6804 28.4183 36.6568V36.5147V36.2544C28.7723 36.2544 29.0555 36.2544 29.2915 36.2544C29.5511 36.2544 29.8343 36.2544 30.1647 36.2544C30.1411 36.4201 30.1411 36.5147 30.1411 36.5621V36.7514C30.4479 36.7751 30.7783 36.7988 31.0851 36.8461C31.1087 37.1065 31.1323 37.3431 31.1795 37.6272C30.9199 37.5798 30.6839 37.5325 30.4715 37.5088C30.2591 37.4852 30.0703 37.4615 29.9287 37.4615C29.7635 37.4615 29.6219 37.4852 29.5275 37.5088C29.4095 37.5562 29.3623 37.6035 29.3623 37.6508C29.3623 37.6982 29.3859 37.7455 29.4567 37.7928C29.5275 37.8402 29.5983 37.8875 29.7163 37.9349C30.1411 38.1242 30.4479 38.2662 30.6367 38.3846C30.8255 38.5029 30.9671 38.5976 31.0615 38.7159C31.1323 38.8106 31.1795 38.9053 31.1795 39.0236C31.1795 39.0946 31.1559 39.1893 31.1087 39.2603C31.0615 39.3313 30.9907 39.4023 30.9199 39.4496C30.8255 39.5206 30.7311 39.568 30.6367 39.6153C30.5187 39.6627 30.4243 39.71 30.3063 39.7337C30.1883 39.7573 30.0231 39.8047 29.7871 39.852V40.136C29.7871 40.2307 29.7871 40.3254 29.7871 40.42C29.4331 40.42 29.1499 40.42 28.9611 40.42C28.7487 40.42 28.4419 40.42 28.0643 40.42C28.0879 40.3017 28.0879 40.1834 28.0879 40.0177V39.923C27.8283 39.8993 27.6159 39.8993 27.4271 39.8757C27.2619 39.852 27.0495 39.8283 26.7899 39.781C26.7191 39.3313 26.6955 39.0709 26.6719 38.9289Z" fill="#FFFAD1" />
            </svg>

        )
    }
    if (type === 'tasvie_etebar') {
        return (
            <svg width="48" height="39" viewBox="0 0 48 39" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.3114 5.16062C9.07597 5.36976 8.25113 6.67928 8.48492 8.06028C8.72215 9.46159 9.92862 10.4063 11.164 10.1972L39.3781 5.42081C40.6316 5.20859 41.4565 3.89907 41.2227 2.51807C40.9855 1.11676 39.779 0.172012 38.5254 0.384228L10.3114 5.16062Z" fill="#9A5F3B" />
                <path d="M12.0591 10.0461L41.649 5.03681L41.2227 2.51852L13.6822 7.18089C12.5496 7.37262 11.8235 8.65444 12.0591 10.0461Z" fill="#FFFAD1" />
                <path d="M8.48828 8.06787L11.9828 28.7101C12.1993 29.9886 13.3955 30.8535 14.6348 30.6437L42.9373 25.8524C44.1947 25.6395 45.0396 24.4291 44.8232 23.1505L44.4342 20.8528L41.7176 4.80599L11.1371 9.983C9.89783 10.1928 8.70159 9.3279 8.48828 8.06787Z" fill="#B06C45" />
                <path d="M42.7898 24.8489L41.7145 25.031L41.6424 24.6048L42.7176 24.4227C42.8087 24.4073 42.8967 24.3734 42.9665 24.3425L43.1631 24.7285C43.0386 24.7687 42.9173 24.8273 42.7898 24.8489ZM40.3112 25.2685L38.908 25.5061L38.8358 25.0799L40.2391 24.8423L40.3112 25.2685ZM37.5229 25.7406L36.1196 25.9781L36.0475 25.5519L37.4508 25.3144L37.5229 25.7406ZM34.7164 26.2157L33.3131 26.4532L33.2409 26.0271L34.6442 25.7895L34.7164 26.2157ZM31.928 26.6877L30.5247 26.9253L30.4526 26.4991L31.8559 26.2615L31.928 26.6877ZM29.1215 27.1628L27.7182 27.4004L27.646 26.9742L29.0493 26.7367L29.1215 27.1628ZM26.3149 27.638L24.9116 27.8755L24.8395 27.4493L26.2428 27.2118L26.3149 27.638ZM23.5266 28.11L22.1233 28.3476L22.0511 27.9214L23.4544 27.6838L23.5266 28.11ZM20.72 28.5851L19.3167 28.8227L19.2446 28.3965L20.6479 28.1589L20.72 28.5851ZM17.9317 29.0572L16.5284 29.2947L16.4563 28.8686L17.8595 28.631L17.9317 29.0572ZM15.1251 29.5323L13.7401 29.7668L13.6679 29.3406L15.053 29.1061L15.1251 29.5323ZM43.8547 23.2772L43.4355 23.3482L43.194 21.9214L43.6131 21.8504L43.8547 23.2772Z" fill="#FFFAD1" />
                <path d="M43.2668 19.8119L42.8477 19.8828L42.9669 20.5869L43.386 20.516L43.2668 19.8119Z" fill="#FFFAD1" />
                <path d="M41.7141 10.659L41.2949 10.73L41.4141 11.4341L41.8333 11.3632L41.7141 10.659Z" fill="#FFFAD1" />
                <path d="M41.2863 8.13851L40.8672 8.20947L41.0805 9.4695L41.4997 9.39854L41.2863 8.13851Z" fill="#FFFAD1" />
                <path d="M41.0747 6.8787L40.6555 6.94966L40.574 6.46788L40.0819 6.55119L40.0098 6.125L40.921 5.97074L41.0747 6.8787Z" fill="#FFFAD1" />
                <path d="M38.7334 6.77951L37.3848 7.00782L37.3126 6.58163L38.6612 6.35333L38.7334 6.77951ZM36.0362 7.23613L34.6875 7.46443L34.6154 7.03825L35.964 6.80994L36.0362 7.23613ZM33.3389 7.69274L31.9903 7.92105L31.9182 7.49486L33.2668 7.26656L33.3389 7.69274ZM30.66 8.14627L29.3114 8.37458L29.2392 7.94839L30.5878 7.72008L30.66 8.14627ZM27.9627 8.60288L26.6141 8.83119L26.542 8.405L27.8906 8.1767L27.9627 8.60288ZM25.2655 9.0595L23.9169 9.2878L23.8448 8.86162L25.1934 8.63331L25.2655 9.0595ZM22.5683 9.51611L21.2197 9.74442L21.1476 9.31823L22.4962 9.08992L22.5683 9.51611ZM19.8711 9.97272L18.5225 10.201L18.4504 9.77485L19.799 9.54654L19.8711 9.97272ZM17.1739 10.4293L15.8253 10.6576L15.7531 10.2315L17.1018 10.0032L17.1739 10.4293ZM14.4949 10.8829L13.1463 11.1112L13.0742 10.685L14.4228 10.4567L14.4949 10.8829ZM11.7977 11.3395L10.4491 11.5678L10.377 11.1416L11.7256 10.9133L11.7977 11.3395Z" fill="#FFFAD1" />
                <path d="M43.6273 12.3163L40.2011 12.8964C38.7796 13.137 37.8109 14.5019 38.0587 15.9657L38.1905 16.744C38.4352 18.1893 39.7841 19.1808 41.2238 18.9371L44.65 18.3571C45.2878 18.2491 45.7254 17.6222 45.6156 16.9737L44.9913 13.2863C44.8815 12.6377 44.2834 12.2053 43.6273 12.3163Z" fill="#9A5F3B" />
                <path d="M42.424 15.6081C42.5526 16.3678 42.0579 17.0997 41.2924 17.2292C40.5452 17.3557 39.8221 16.8491 39.6903 16.0709C39.5586 15.2926 40.0565 14.5793 40.8219 14.4498C41.5873 14.3202 42.2954 14.8484 42.424 15.6081Z" fill="#FFFAD1" />
                <path d="M31.2801 31.306C29.5688 30.289 26.9702 29.6533 24.0547 29.6533C21.1392 29.6533 18.5407 30.289 16.8294 31.306H14.7695V34.1028C14.7695 36.55 18.9209 38.5523 24.023 38.5523C29.1252 38.5523 33.2766 36.55 33.2766 34.1028V31.306H31.2801Z" fill="#C99B36" />
                <path d="M24.0504 35.7549C29.161 35.7549 33.3039 33.7628 33.3039 31.3054C33.3039 28.8481 29.161 26.856 24.0504 26.856C18.9398 26.856 14.7969 28.8481 14.7969 31.3054C14.7969 33.7628 18.9398 35.7549 24.0504 35.7549Z" fill="#F7CA41" />
                <path d="M21.041 32.1636C21.453 32.259 21.865 32.3225 22.2135 32.3543C22.5621 32.3861 22.879 32.4179 23.1326 32.4179C23.3544 32.4179 23.5445 32.3861 23.703 32.3543C23.8614 32.2908 23.9565 32.2272 23.9565 32.1319C23.9565 32.1001 23.9565 32.1001 23.9248 32.0683C23.9248 32.0365 23.8931 32.0365 23.8614 32.0047C23.8297 31.9729 23.7981 31.9729 23.7664 31.9412C23.7347 31.9094 23.6713 31.8776 23.6396 31.8776C23.6079 31.8458 23.4812 31.7823 23.2276 31.6869C22.5304 31.3691 22.0868 31.1466 21.865 31.0195C21.6748 30.9241 21.5481 30.797 21.453 30.6699C21.3579 30.5428 21.2945 30.4156 21.2945 30.2885C21.2945 30.1932 21.3262 30.0978 21.3896 30.0025C21.453 29.9071 21.5481 29.8118 21.6431 29.7482C21.7699 29.6529 21.8966 29.5893 22.0551 29.5257C22.2135 29.4622 22.372 29.3986 22.5621 29.3668C22.7523 29.335 23.0375 29.2715 23.3861 29.2397C23.3861 29.1761 23.3861 29.1443 23.3861 29.1126V28.9219V28.5723C23.8614 28.5723 24.2417 28.5723 24.5586 28.5723C24.9072 28.5723 25.2875 28.5723 25.7312 28.5723C25.6995 28.7947 25.6995 28.9219 25.6995 28.9854V29.2397C26.1114 29.2715 26.5551 29.3033 26.9671 29.3668C26.9988 29.7164 27.0305 30.0342 27.0938 30.4156C26.7452 30.3521 26.4283 30.2885 26.1431 30.2567C25.8579 30.2249 25.6044 30.1931 25.4143 30.1931C25.1924 30.1931 25.0023 30.2249 24.8755 30.2567C24.7171 30.3203 24.6537 30.3838 24.6537 30.4474C24.6537 30.511 24.6854 30.5745 24.7805 30.6381C24.8755 30.7017 24.9706 30.7652 25.129 30.8288C25.6995 31.083 26.1114 31.2737 26.365 31.4326C26.6185 31.5916 26.8086 31.7187 26.9354 31.8776C27.0305 32.0047 27.0938 32.1319 27.0938 32.2908C27.0938 32.3861 27.0621 32.5132 26.9988 32.6086C26.9354 32.7039 26.8403 32.7993 26.7452 32.8628C26.6185 32.9582 26.4917 33.0218 26.365 33.0853C26.2065 33.1489 26.0797 33.2124 25.9213 33.2442C25.7628 33.276 25.541 33.3396 25.2241 33.4031V33.7845C25.2241 33.9116 25.2241 34.0388 25.2241 34.1659C24.7488 34.1659 24.3685 34.1659 24.115 34.1659C23.8297 34.1659 23.4178 34.1659 22.9107 34.1659C22.9424 34.007 22.9424 33.8481 22.9424 33.6256V33.4985C22.5938 33.4667 22.3086 33.4667 22.0551 33.4349C21.8333 33.4031 21.5481 33.3714 21.1995 33.3078C21.1044 32.7039 21.0727 32.3543 21.041 32.1636Z" fill="#FFFAD1" />
                <path d="M20.5379 28.6204C18.8266 27.6034 16.228 26.9678 13.3126 26.9678C10.3971 26.9678 7.79847 27.6034 6.0872 28.6204H4.02734V31.4173C4.02734 33.8645 8.17875 35.8667 13.2809 35.8667C18.383 35.8667 22.5344 33.8645 22.5344 31.4173V28.6204H20.5379Z" fill="#C99B36" />
                <path d="M13.3082 33.0694C18.4188 33.0694 22.5617 31.0773 22.5617 28.6199C22.5617 26.1625 18.4188 24.1704 13.3082 24.1704C8.19763 24.1704 4.05469 26.1625 4.05469 28.6199C4.05469 31.0773 8.19763 33.0694 13.3082 33.0694Z" fill="#F7CA41" />
                <path d="M10.2988 29.4781C10.7108 29.5734 11.1228 29.637 11.4714 29.6688C11.82 29.7006 12.1369 29.7323 12.3904 29.7323C12.6122 29.7323 12.8023 29.7006 12.9608 29.6688C13.1192 29.6052 13.2143 29.5417 13.2143 29.4463C13.2143 29.4145 13.2143 29.4145 13.1826 29.3827C13.1826 29.351 13.1509 29.351 13.1192 29.3192C13.0876 29.2874 13.0559 29.2874 13.0242 29.2556C12.9925 29.2238 12.9291 29.1921 12.8974 29.1921C12.8657 29.1603 12.739 29.0967 12.4854 29.0014C11.7883 28.6835 11.3446 28.4611 11.1228 28.3339C10.9326 28.2386 10.8059 28.1115 10.7108 27.9843C10.6157 27.8572 10.5524 27.7301 10.5524 27.6029C10.5524 27.5076 10.584 27.4123 10.6474 27.3169C10.7108 27.2216 10.8059 27.1262 10.9009 27.0627C11.0277 26.9673 11.1545 26.9037 11.3129 26.8402C11.4714 26.7766 11.6298 26.7131 11.82 26.6813C12.0101 26.6495 12.2953 26.5859 12.6439 26.5541C12.6439 26.4906 12.6439 26.4588 12.6439 26.427V26.2363V25.8867C13.1192 25.8867 13.4995 25.8867 13.8164 25.8867C14.165 25.8867 14.5453 25.8867 14.989 25.8867C14.9573 26.1092 14.9573 26.2363 14.9573 26.2999V26.5541C15.3692 26.5859 15.8129 26.6177 16.2249 26.6813C16.2566 27.0309 16.2883 27.3487 16.3516 27.7301C16.0031 27.6665 15.6862 27.6029 15.4009 27.5712C15.1157 27.5394 14.8622 27.5076 14.6721 27.5076C14.4502 27.5076 14.2601 27.5394 14.1333 27.5712C13.9749 27.6347 13.9115 27.6983 13.9115 27.7619C13.9115 27.8254 13.9432 27.889 14.0383 27.9526C14.1333 28.0161 14.2284 28.0797 14.3869 28.1432C14.9573 28.3975 15.3692 28.5882 15.6228 28.7471C15.8763 28.906 16.0664 29.0331 16.1932 29.1921C16.2883 29.3192 16.3516 29.4463 16.3516 29.6052C16.3516 29.7006 16.32 29.8277 16.2566 29.923C16.1932 30.0184 16.0981 30.1137 16.0031 30.1773C15.8763 30.2726 15.7495 30.3362 15.6228 30.3998C15.4643 30.4633 15.3376 30.5269 15.1791 30.5587C15.0207 30.5905 14.7988 30.654 14.4819 30.7176V31.099C14.4819 31.2261 14.4819 31.3532 14.4819 31.4804C14.0066 31.4804 13.6263 31.4804 13.3728 31.4804C13.0876 31.4804 12.6756 31.4804 12.1685 31.4804C12.2002 31.3214 12.2002 31.1625 12.2002 30.9401V30.8129C11.8516 30.7812 11.5664 30.7812 11.3129 30.7494C11.0911 30.7176 10.8059 30.6858 10.4573 30.6222C10.3622 30.0184 10.3305 29.6688 10.2988 29.4781Z" fill="#FFFAD1" />
                <path d="M16.5106 21.9061C14.7993 20.8891 12.2007 20.2534 9.28521 20.2534C6.36972 20.2534 3.77112 20.8891 2.05986 21.9061H0V24.7029C0 27.1501 4.15141 29.1524 9.25352 29.1524C14.3556 29.1524 18.507 27.1501 18.507 24.7029V21.9061H16.5106Z" fill="#C99B36" />
                <path d="M9.28477 26.355C14.3953 26.355 18.5383 24.3629 18.5383 21.9055C18.5383 19.4482 14.3953 17.4561 9.28477 17.4561C4.17419 17.4561 0.03125 19.4482 0.03125 21.9055C0.03125 24.3629 4.17419 26.355 9.28477 26.355Z" fill="#F7CA41" />
                <path d="M6.27344 22.7642C6.68541 22.8596 7.09738 22.9231 7.44597 22.9549C7.79456 22.9867 8.11147 23.0185 8.36499 23.0185C8.58682 23.0185 8.77696 22.9867 8.93541 22.9549C9.09386 22.8914 9.18893 22.8278 9.18893 22.7324C9.18893 22.7007 9.18893 22.7007 9.15724 22.6689C9.15724 22.6371 9.12555 22.6371 9.09386 22.6053C9.06217 22.5735 9.03048 22.5735 8.99879 22.5417C8.9671 22.51 8.90372 22.4782 8.87203 22.4782C8.84034 22.4464 8.71358 22.3828 8.46005 22.2875C7.76287 21.9697 7.31921 21.7472 7.09738 21.6201C6.90724 21.5247 6.78048 21.3976 6.68541 21.2705C6.59034 21.1433 6.52696 21.0162 6.52696 20.8891C6.52696 20.7937 6.55865 20.6984 6.62203 20.603C6.68541 20.5077 6.78048 20.4124 6.87555 20.3488C7.00231 20.2534 7.12907 20.1899 7.28752 20.1263C7.44597 20.0627 7.60442 19.9992 7.79456 19.9674C7.98471 19.9356 8.26991 19.8721 8.6185 19.8403C8.6185 19.7767 8.6185 19.7449 8.6185 19.7131V19.5225V19.1729C9.09386 19.1729 9.47414 19.1729 9.79104 19.1729C10.1396 19.1729 10.5199 19.1729 10.9636 19.1729C10.9319 19.3953 10.9319 19.5225 10.9319 19.586V19.8403C11.3439 19.8721 11.7875 19.9038 12.1995 19.9674C12.2312 20.317 12.2629 20.6348 12.3263 21.0162C11.9777 20.9526 11.6608 20.8891 11.3755 20.8573C11.0903 20.8255 10.8368 20.7937 10.6467 20.7937C10.4248 20.7937 10.2347 20.8255 10.1079 20.8573C9.94949 20.9209 9.88611 20.9844 9.88611 21.048C9.88611 21.1116 9.9178 21.1751 10.0129 21.2387C10.1079 21.3022 10.203 21.3658 10.3615 21.4294C10.9319 21.6836 11.3439 21.8743 11.5974 22.0332C11.8509 22.1921 12.041 22.3193 12.1678 22.4782C12.2629 22.6053 12.3263 22.7324 12.3263 22.8914C12.3263 22.9867 12.2946 23.1138 12.2312 23.2092C12.1678 23.3045 12.0727 23.3999 11.9777 23.4634C11.8509 23.5588 11.7241 23.6223 11.5974 23.6859C11.4389 23.7495 11.3122 23.813 11.1537 23.8448C10.9953 23.8766 10.7734 23.9402 10.4565 24.0037V24.3851C10.4565 24.5122 10.4565 24.6394 10.4565 24.7665C9.98118 24.7665 9.6009 24.7665 9.34738 24.7665C9.06217 24.7665 8.65019 24.7665 8.14315 24.7665C8.17484 24.6076 8.17484 24.4487 8.17484 24.2262V24.0991C7.82625 24.0673 7.54104 24.0673 7.28752 24.0355C7.06569 24.0037 6.78048 23.9719 6.43189 23.9084C6.33682 23.3045 6.30513 22.9549 6.27344 22.7642Z" fill="#FFFAD1" />
            </svg>

        )
    }

}