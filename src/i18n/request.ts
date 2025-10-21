import { hasLocale } from 'next-intl';
import { getRequestConfig } from 'next-intl/server';
import {routing} from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let  locale = await requestLocale;
  if(!hasLocale(routing.locales , locale)) locale = routing.defaultLocale;
return{
  locale,
  messages: (await import(`../messages/${locale}.json`)).default
}
});