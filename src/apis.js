import axios from "axios"
import rewardsrc from './images/kish.png';


// let res = await axios.get(url);
// let res = await axios.post(url,body);

export default function apis({ getState }) {
  let baseUrl = 'http://10.10.10.22:8081';
  return {
    async gems() {
      let res = await axios.get(`${baseUrl}/wallet/api/v1/User/wallet/balance`)
      if (res.data.IsSuccess) {
        return res.data.Data[0].Balance;
      }
      else {
        return 'دریافت میزان الماس کاربر با مشکل مواجه شد'
      }
    },
    async getProfile(){
      let res = await axios.get(`${baseUrl}/sso/api/v1/user/Profile`);
      if(res.data.IsSuccess){
        return res.data.Data
      }
    },
    async setProfile(model){
      let res = await axios.post(`${baseUrl}/sso/api/v1/user/UpdateProfile`,model);
      if(res.data.IsSuccess){
        return true
      }
      else {
        debugger;
      }
    },
    async hasPayPassword(){
      let res = await axios.get(`${baseUrl}/sso/api/v1/user/CheckPayPassword`);
      if(res.data.IsSuccess){
        return res.data.Data.Existed
      }
      else {
        return 'خطا'
      }
    },
    async updatePayPassword({currentPassword,newPassword}){
      let res = await axios.post(`${baseUrl}/api​/v1​/user​/UpdatePayPassword`,{
        CurrenyPayPassword:currentPassword,
        NewPayPassword:newPassword
      })
      if(res.data.IsSuccess){
        return true
      }
      return 'خطا'
    },
    async history() {
      return [
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: -3, score: 1, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 0, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
        { date: '1401/2/2', gem: 5, score: -10, title: 'استفاده از قانون مشتری فعال' },
      ]
    },
    async poorsant() {
      return 4500000
    },
    async score() {
      return 89500;
    },
    async awards(sortType) {
      //sortType => '0' : 'محبوب ترین'
      //sortType => '1' : 'جدید ترین'
      //sortType => '2' : 'الماس از کم به زیاد'
      //sortType => '3' : 'الماس از زیاد به کم'
      return [
        {
          title: 'سفر به کیش', text: 'بلیط دو طرفه سفر به کیش', score: 12000,
          description: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          howToUse: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          rules: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.'
        },
        {
          title: 'سفر به کیش', text: 'بلیط دو طرفه سفر به کیش', score: 12000,
          description: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          howToUse: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          rules: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.'
        },
        {
          title: 'سفر به کیش', text: 'بلیط دو طرفه سفر به کیش', score: 12000,
          description: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          howToUse: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          rules: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.'
        },
        {
          title: 'سفر به کیش', text: 'بلیط دو طرفه سفر به کیش', score: 12000,
          description: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          howToUse: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          rules: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.'
        },
        {
          title: 'سفر به کیش', text: 'بلیط دو طرفه سفر به کیش', score: 12000,
          description: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          howToUse: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          rules: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.'
        },
        {
          title: 'سفر به کیش', text: 'بلیط دو طرفه سفر به کیش', score: 12000,
          description: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          howToUse: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          rules: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.'
        },
        {
          title: 'سفر به کیش', text: 'بلیط دو طرفه سفر به کیش', score: 12000,
          description: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          howToUse: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.',
          rules: 'مشخصات و توضیحات تکمیلی جایزه موردنظر اعم از کالا، خدمت یا تخفیفات و ... به صورت توصیفی یا نمایش جدولی عنوان شود.'
        },
      ]
    },
    async catchedAwards() {
      return [
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 0, src: '' },
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 1, src: '' },
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 0, src: '' },
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 0, src: '' },
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 1, src: '' },
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 0, src: '' },
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 0, src: '' },
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 1, src: '' },
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 0, src: '' },
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 0, src: '' },
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 1, src: '' },
        { title: 'بلیط پرواز سفر به کیش', payedGems: 12000, status: 0, src: '' },

      ]
    },
    async KRS() {
      let res = await axios.get(`${baseUrl}/pe/api/v1/Group/GroupRules`);
      debugger
      let rules = res.data.Data.map((o)=>{
        debugger;
        let start = o.Rules[0].Score;
        let end = o.Rules[o.Rules.length - 1].Score;
        return { 
          start,end, 
          text:'زیر عنوان',
          value: 3, 
          score: 175, 
          points: o.Rules, 
          title: o.Name, 
          description: o.Description, 
        }
        // return {
        //   title:o.name,
        //   subtitle:'زیر عنوان',
        //   descriptioin:o.Description,
        //   mileStones,
        //   value:false
        // }
      })
      return rules;
      // return [
      //   { start: 2, end: 7, value: 3, score: 175, points: [2, 5, 7], title: 'استمرار خرید', text: 'واسه هر فاکتورت امتیاز بگیر!', affix: '' },
      //   { start: 50, end: 200, value: 90, score: 140, points: [50, 100, 200], title: 'حجم خرید', text: 'سبدت هرچی پر تر امتیازت بیشتر!', affix: 'میلیون' },
      //   { start: 7, end: 15, value: 11, score: 290, points: [7, 10, 15], title: 'SKU', text: 'فاکتور طولانی، امتیاز نورانی', affix: 'نوع' },
      // ]
    },
    async getAward() {
      return {}
    },
    async details() {
      return [
        { 
          title: 'استمرار خرید', 
          text: 'برای فاکتور های 4 تا 7 میلیون تومانی 15 امتیاز و بیشتر از 7 میلیون 42 امتیاز', 
          max: 10, value: 3, labelStep: 1, affix: 'بار', mileStones: [2, 5, 7] 
        },
        { 
          title: 'حجم خرید', 
          text: 'به ازای هر یک میلیون تومان خرید 1/5 امتیاز ', 
          max: 250, value: 85, labelStep: 50, affix: 'میلیون', mileStones: [50, 100, 200] 
        },
        { 
          title: 'تنوع سبد خرید', 
          text: 'برای فاکتور های 4 تا 7 میلیون تومانی 15 امتیاز و بیشتر از 7 میلیون 42 امتیاز', 
          max: 20, value: 15, labelStep: 1, affix: 'قلم', mileStones: [7, 10, 15] 
        }
      ]
    },
    async hazfe_hesab(id) {
      //اگر حذف موفقیت آمیز بود ریترن ترو
      return true

      //اگر خطایی رخ داد ریترن متن خطا
      //return 'خطایی رخ داد'
    },
    async daryafte_liste_tarakonesh_ha(){
      //ریترن آرایه ای از تراکنش ها با فرمت زیر
      // [
      //   { success: true, status: { type: 'واریز الماس', to: 'علی واحدی', gems: 320 }, date: '1401/4/5', time: '10:30' },
      //   { success: false, status: { type: 'تبدیل الماس به ریال', to: 40000, gems: 20 }, date: '1401/4/5', time: '10:30' },
      //   { success: true, status: { type: 'خرید الماس', to: 180000, gems: 500 }, date: '1401/4/5', time: '10:30' },
      //   { success: true, status: { type: 'دریافت الماس', to: 'علی واحدی', gems: 250 }, date: '1401/4/5', time: '10:30' },
      //   { success: true, status: { type: 'واریز الماس', to: 'علی واحدی', gems: 320 }, date: '1401/4/5', time: '10:30' },
      // ]
      //در صورت خطا ریترن متن خطا
      return 'خطایی رخ داد'
      return [
        { success: true, status: { type: 'واریز الماس', to: 'علی واحدی', gems: 320 }, date: '1401/4/5', time: '10:30' },
        { success: false, status: { type: 'تبدیل الماس به ریال', to: 40000, gems: 20 }, date: '1401/4/5', time: '10:30' },
        { success: true, status: { type: 'خرید الماس', to: 180000, gems: 500 }, date: '1401/4/5', time: '10:30' },
        { success: true, status: { type: 'دریافت الماس', to: 'علی واحدی', gems: 250 }, date: '1401/4/5', time: '10:30' },
        { success: true, status: { type: 'واریز الماس', to: 'علی واحدی', gems: 320 }, date: '1401/4/5', time: '10:30' },
      ]
    },
    async jostojooye_girandeye_almas({phoneNumber,amount,description}){
      //ریترن آرایه ای از گیرندگان با فرمت زیر
      //{name:'محمد فیض',phone:'09123534314',id:'1'}
      //در صورت خطا ریترن متن خطا
      // DestinationMobile*	string
      // maxLength: 11
      // minLength: 0
      // Amount*	integer($int64)
      // DepositTypeID*	integer($int32)
      // Description	string
      let res = await axios.post(
        `${baseUrl}/wallet/api/v1/User/Wallet/TransferRequest`,
        {
          DestinationMobile:phoneNumber,
          Amount:+amount,
          DepositTypeID:2,
          Description:'تست',
        }  
      )
      return {name:'محمد فیض',phone:phoneNumber}
    },
    async enteghale_almas({password,tedade_almas_jahate_enteghal,girande}){
      //در صورت خطا ریترن متن خطا
      //در صورت موفقیت ریترن ترو
      
      //return 'خطایی رخ داده است'
      let res = await axios.post(`${baseUrl}/wallet/api/v1/User/Wallet/TransferConfirm`,{
        "DestinationMobile": girande.phone,
        "Amount": +tedade_almas_jahate_enteghal,
        "DepositTypeID": 2,
        "Description": "string"
      })
      if(res.data.IsSuccess){return true}
      else {
        return res.data.Message
      }
      
    },
    handleNull(v,def){
      return v === null?def:v;
    },
    async rewards(){

      let res = await axios.get(`${baseUrl}/ecommerce/api/v1/Product/FindAll`);
      if(!res.data.IsSuccess){return res.Data.Message}
      return res.data.Data.map(({Name,Amount,Pic,Gem,ID})=>{
        let src = this.handleNull(Pic,rewardsrc);
        return {
          id:ID,
          name:this.handleNull(Name),
          price:this.handleNull(Amount),
          gem:Gem,
          discountPercent:undefined,
          src,
          rate:undefined,
        }


      })

    },
    async rewardDetails(id){
        let res = await axios.get(`${baseUrl}/ecommerce/api/v1/Product/ProductDetail?Id=${id}`);
        if(!res.data.IsSuccess){return res.Data.Message}
        let {Details,Rules} = res.data.Data
        return {
          details:Details.map((o)=>{
            return o.Description
          }),
          rules:Rules.map((o)=>{
            return {title:o.Title,text:o.Description}
          })
        }
        
    },
    async chalesh_haye_man(){
      let res = await axios.get(`${baseUrl}/pe/api/v1/Rule/GetChallenges`)
      debugger;
      if(res.data.IsSuccess){
        return res.data.Data.map(({RuleName,Status,Description,Gem,Score})=>{
          return {
            name:RuleName,
            status:Status,
            text:Description,
            reward:{
              gem:Gem,
              score:Score
            }

          }
        })
      }
      return res.data.Message
      let time = new Date().getTime()
      let chalesh_dic = {
        'doing':{text:'در حال اجرا',color:'#1D87B4'},
        'done':{text:'انجام شده',color:'#18B255'},
        'notStarted':{text:'شروع نشده',color:'#DFAF02'},
        'expired':{text:'منقضی شده',color:'#B21212'}
      }
      let chalesh_ha = [
        {
          name:'چالش فروش فوق العاده',
          status:'doing',
          text:'فروش 900.000.000 تومان تا پایان 2 اسفند 1401 ',
          range:{
            start:0,
            end:900,
            value:660,
            unit:'میلیون تومان'
          },
          reward:{
            gem:8000,
            score:12000
          },
          date:time + 10000000
        },
        {
          name:'چالش ویزیت',status:'doing',
          text:'انجام 120 ویزیت در 7 روز',
          range:{
            start:0,
            end:23,
            value:120,
            unit:'عدد'
          },
          reward:{
            gem:12000,
            score:800
          },
          date:time + 10000000
        },
        {
          name:'چالش ثبت نام بازار می ارزه',
          status:'notStarted',
          text:'ثبت نام 200 کاربر (الکتریکی) در بازار می ارزه',
          reward:{
            gem:50000
          },
          date:time + 10000000
        },
        {
          name:'چالش فروش 500 میلیون نقدی',
          status:'done',
          text:'فروش 500.000.000 تومان نقد تا 20 بهمن 1401',
          range:{
            start:0,
            end:500,
            value:500,
            unit:'میلیون تومان'
          },
          reward:{
            gem:12000,
            score:800
          },
          date:time + 10000000
        },
        {
          name:'چالش فروش 10 وات',
          status:'expired',
          text:'فروش 30 کارتن 10 وات در 2 روز',
          range:{
            start:0,
            end:23,
            value:120,
            unit:'عدد'
          },
          reward:{
            gem:12000,
            score:800
          },
          date:time - 1000000
        }
      ]
      return {chalesh_dic,chalesh_ha}
    }
  }
}
