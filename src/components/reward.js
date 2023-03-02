import React, { Component } from "react";
import RVD from './../npm/react-virtual-dom/react-virtual-dom';
import src from './../images/9f74c7.jpg';
import Icon from "@mdi/react";
import { mdiChevronLeft, mdiStar, mdiStarOutline, mdiAccountCircleOutline, mdiDiamond } from '@mdi/js';
export default class Reward extends Component {
    image_layout() {
        let {src} = this.props;
        if(!src){return false}
        return {
            html: (
                <img src={src} alt='' width='100%' />
            )
        }
    }
    rate_layout() {
        let { rate } = this.props;
        if(typeof rate !== 'number'){return false}
        return {
            row: [
                { html: 'امتیاز از نگاه کاربران :', align: 'v', className: 'fs-12 p-h-12' },
                {
                    align: 'v', style: { direction: 'ltr' },
                    row: Array(5).fill(0).map((o, i) => {
                        return {
                            html: <Icon path={i < rate ? mdiStar : mdiStarOutline} size={0.8} />, style: { color: '#FF7A00' }
                        }
                    })
                }
            ]
        }
    }
    details_layout() {
        let { details } = this.props;
        if(!Array.isArray(details) || !details.length){return false}
        return {
            column: [
                {
                    size: 36, className: 'p-h-12 m-t-12',
                    row: [
                        { html: <div style={{ width: 4, height: 16, background: 'orange' }}></div>, align: 'v' },
                        { size: 6 },
                        { html: 'مشخصات', className: 'bold fs-14', align: 'v' }
                    ]
                },
                {
                    className: 'fs-12 bold',
                    column: details.map((o) => {
                        return {
                            row: [
                                { size: 24, html: <div style={{ width: 5, height: 5, background: '#aaa' }}></div>, align: 'vh' },
                                { html: o }
                            ]
                        }
                    })
                }
            ]
        }

    }
    rules_layout() {
        let { rules } = this.props;
        if(!Array.isArray(rules) || !rules.length){return false}
        return {
            column: [
                {
                    size: 36, className: 'p-h-12 m-t-12',
                    row: [
                        { html: <div style={{ width: 4, height: 16, background: 'orange' }}></div>, align: 'v' },
                        { size: 6 },
                        { html: 'قوانین', className: 'bold fs-14', align: 'v' }
                    ]
                },
                {
                    column: rules.map((o) => {
                        return {
                            column: [
                                {
                                    row: [
                                        { size: 24, html: <div style={{ width: 5, height: 5, background: '#aaa' }}></div>, align: 'vh' },
                                        { html: o.title, className: 'fs-12 bold' }
                                    ]
                                },
                                { html: o.text, style: { color: '#676767' }, className: 'fs-12 p-r-24 p-l-12' },
                                { size: 12 }
                            ]
                        }
                    })
                }
            ]
        }
    }
    comments_layout() {
        let { comments } = this.props;
        if (!Array.isArray(comments) || !comments.length) { return false }
        return {
            className: 'p-h-12',
            column: [
                {
                    row: [
                        { html: <div style={{ width: 4, height: 16, background: 'orange' }}></div>, align: 'v' },
                        { size: 6 },
                        { html: 'نظرات', className: 'bold fs-14', align: 'v' },
                        { size: 12 },
                        { html: '|' },
                        { html: `${comments.length} نظر` },
                        { html: <Icon path={mdiChevronLeft} size={0.5} />, align: 'vh', style: { color: 'orange' } }
                    ]
                },
                {
                    gap: 12,
                    column: comments.map(({ name, type, date, text }) => {
                        return {
                            style: { border: '1px solid #aaa' },
                            className: 'br-12 p-12',
                            column: [
                                {
                                    row: [
                                        { html: <Icon path={mdiAccountCircleOutline} size={1} />, align: 'vh', style: { color: 'orange' } },
                                        { size: 3 },
                                        { html: name, align: 'v', className: 'fs-14 bold' },
                                        { html: '|', size: 12, align: 'vh' },
                                        { html: date, className: 'fs-10', style: { color: '#666' }, align: 'v' },
                                        { size: 12 },
                                        { html: <div style={{ background: '#ccc', fontSize: 12, padding: '3px 12px', borderRadius: 6 }}>{type}</div> }
                                    ]
                                },
                                {
                                    html: text, className: 'fs-12 p-12'
                                }
                            ]
                        }
                    })
                },
            ]
        }
    }
    render() {
        let { name,price, discountPercent} = this.props;
        return (
            <RVD
                layout={{
                    style: { height: '100%', background: '#fff' },
                    column: [
                        {
                            flex: 1, className: 'ofy-auto',
                            column: [
                                this.image_layout(),
                                { size: 36, html: name, className: 'fs-14 bold p-h-12', align: 'v' },
                                this.rate_layout(),
                                this.details_layout(),
                                this.rules_layout(),
                                this.comments_layout()
                            ]
                        },
                        {
                            size:72,
                            className:'p-6',
                            row:[
                                {
                                    align:'v',
                                    html:(
                                        <button style={{background:'#2BA4D8',color:'#fff',height:36,border:'none'}} className='fs-14 br-36 p-h-24'>افزودن به سبد خرید</button>
                                    )
                                },
                                {flex:1},
                                {
                                    column:[
                                        {
                                            flex:1,
                                            row:[
                                                {html:price,className:'fs-12',align:'vh'},
                                                {align:'v',html:<div style={{background:'orange',height:16,color:'#fff'}} className='br-16 p-h-12 fs-12'>{discountPercent + '%'}</div>}
                                            ]
                                        },
                                        {
                                            flex:1,
                                            row:[
                                                {html:price - (price * discountPercent / 100)},
                                                {html:<Icon path={mdiDiamond} size={0.8}/>,style:{color:'dodgerblue'}}
                                            ]
                                        }

                                    ]
                                }
                            ]
                        }
                    ]
                }}
            />
        )
    }
}