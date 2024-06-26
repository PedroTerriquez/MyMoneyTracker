import I18n from "i18n-js";
import * as RNLocalize from "react-native-localize";
import moment from 'moment'
import en from "./en";
import es from "./es";

const locales = RNLocalize.getLocales();

if (Array.isArray(locales)) {
  I18n.locale = locales[0].languageTag;
  if (locales[0].languageTag === 'es-US') { require('moment/locale/es') }
}

I18n.fallbacks = true;
I18n.translations = { en, es };

export default I18n;
