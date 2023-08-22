import { ListType } from '@/types';
import _get from 'lodash/get';
import { mockImgs, imgServicePrefix } from '@/constants';

export const priceTranslationFn = (price: string) => `${price ? `$${price}/month`: '价格待议'}`;

const thresholds = [
    {
      val: 1000 * 60 * 1,
      text: '刚刚',
    },
    {
      val: 1000 * 60 * 60,
      text: '分钟前',
    },
    {
      val: 1000 * 60 * 60 * 24,
      text: '小时前',
    },
    {
      val: 1000 * 60 * 60 * 24 * 30,
      text: '天前',
    },
    {
      val: 1000 * 60 * 60 * 24 * 365,
      text: '个月前',
    },
    {
      val: 1000 * 60 * 60 * 24 * 365,
      text: '年前',
    },
  ].reverse();
  
export const getDateDiff = (pre: string, curr = new Date()) => {
    const preTime = new Date(pre).getTime();
    const currTime = new Date(curr).getTime();
    const diff = currTime - preTime;
    let surfix = '';
    let prefix = '';
    thresholds.some(eachT => {
      surfix = eachT.text;
      prefix = `${Math.floor(diff / eachT.val)}`;
      if (eachT.val < diff) {
        if (eachT.val === 1000 * 60 * 1) {
          prefix = '';
        }
        return true;
      }
    });
    return `${prefix} ${surfix}`;
  };

export const getRandomArbitrary = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min) + min);
};

export const splitListItems = (listData: ListType[], gap: number) => {
  const sortedData = listData
  .sort((pre: ListType, next: ListType) => {
      const preTime = _get(pre, 'lastUpdated', '');
      const nextTime = _get(next, 'lastUpdated', '');
      return new Date(preTime).getTime() < new Date(nextTime).getTime() ? 1 : -1;
  });
  return [sortedData.slice(0, gap), sortedData.slice(gap)];
};

export const randomSetupImg = (x: { imageIds: string[]}) => {
  const imageId = _get(x, 'imageIds[0]', '');
  if (!imageId) {
    x.imageIds = [ mockImgs[getRandomArbitrary(0, mockImgs.length - 1)]];
  }
};