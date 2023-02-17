import axios from "axios"


// let res = await axios.get(url);
// let res = await axios.post(url,body);

export default function apis({ getState }) {
  return {
    async gems() {
      let { mobile } = getState();
      let res = await axios.post('http://10.10.10.22:8081/wallet/api/v1/User/wallet/balance', { mobile: mobile })
      if (res.data.isSuccess) {
        return res.data[0].Balance;
      }
      else {
        return 'دریافت میزان الماس کاربر با مشکل مواجه شد'
      }
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
      return [
        { start: 2, end: 7, value: 3, score: 175, points: [2, 5, 7], title: 'استمرار خرید', text: 'واسه هر فاکتورت امتیاز بگیر!', affix: '' },
        { start: 50, end: 200, value: 90, score: 140, points: [50, 100, 200], title: 'حجم خرید', text: 'سبدت هرچی پر تر امتیازت بیشتر!', affix: 'میلیون' },
        { start: 7, end: 15, value: 11, score: 290, points: [7, 10, 15], title: 'SKU', text: 'فاکتور طولانی، امتیاز نورانی', affix: 'نوع' },
      ]
    },
    async getAward() {
      return {}
    },
    async details() {
      return [
        { title: 'استمرار خرید', text: 'برای فاکتور های 4 تا 7 میلیون تومانی 15 امتیاز و بیشتر از 7 میلیون 42 امتیاز', max: 10, value: 3, labelStep: 1, affix: 'بار', mileStones: [2, 5, 7] },
        { title: 'حجم خرید', text: 'به ازای هر یک میلیون تومان خرید 1/5 امتیاز ', max: 250, value: 85, labelStep: 50, affix: 'میلیون', mileStones: [50, 100, 200] },
        { title: 'تنوع سبد خرید', text: 'برای فاکتور های 4 تا 7 میلیون تومانی 15 امتیاز و بیشتر از 7 میلیون 42 امتیاز', max: 20, value: 15, labelStep: 1, affix: 'قلم', mileStones: [7, 10, 15] },
      ]
    },
    async hazfe_hesab(id) {
      //اگر حذف موفقیت آمیز بود ریترن ترو
      return true

      //اگر خطایی رخ داد ریترن متن خطا
      //return 'خطایی رخ داد'
    }
  }
}
