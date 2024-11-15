import i18n from '@/i18n/config';
import enUS from 'antd/lib/locale/en_US';
import viVN from 'antd/lib/locale/vi_VN';
import i18next from 'i18next';
import { removeCookie } from './cookie';
import dayjs from './dayjs';
import { removeLocalStorage } from './localStorage';

export const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT;
export const HDDT_CAPTCHA_ENDPOINT = process.env.REACT_APP_HDDT_CAPTCHA;
export const HDDT_CAPTCHA_AUTH_ENDPOINT = 'https://hoadondientu.gdt.gov.vn:30000/security-taxpayer/authenticate';
export const REACT_MODE = process.env.REACT_APP_MODE;

export const ACCESS_TOKEN = 'accessToken';
export const REFRESH_TOKEN = 'refreshToken';
export const LOGGED_IN = 'loggedIn';
export const ORG_ID = 'orgId';
export const ORG_LIST = 'orgList';

export const DATE_FORMAT_DASH = 'DD-MM-YYYY';
export const DATE_FORMAT_SLASH = 'DD/MM/YYYY';

export const fakePermissions = [
  'INVOICE_MENU',
  'INVOICE_LIST_VIEW',
  'INVOICE_LIST_DOWNLOAD',
  'INVOICE_LIST_EXPORT',
  'TAX_VIEW',
  'TAX_VIEW_UPDATE',

  // Email-related permissions
  'EMAIL_MENU',
  'EMAIL_ACCOUNT_VIEW',
  'EMAIL_ACCOUNT_ADD_ACCOUNT',
  'INBOX_VIEW',
  'SYNC_HISTORY_VIEW',

  // Category-related permissions
  'CATEGORY_MENU',
  'ORG_STRUCTURE_VIEW',
  'PROVIDER_VIEW',
  'PROVIDER_ADD',
  'CUSTOMER_VIEW',
  'CUSTOMER_ADD',
  'PRODUCT_VIEW',
  'EXPENSE_ITEM_VIEW',
  'TAXPAYER_VIEW',
  'TAXPAYER_IMPORT',
  'TAXPAYER_EXPORT',

  // Report-related permissions
  'REPORT_MENU',
  'REPORT_INVOICE_SUMMARY',
  'REPORT_INVOICE_ADJUSTMENT',
  'REPORT_INVOICE_ADJUSTMENT_EXPORT',
  'EXPORT_DATA',
  'REPORT_PRICE_CHECK',
  'REPORT_INVOICE_RECONCILIATION',
  'SUPPLEMENT_TAX_REPORT',
];

export const PERMISSIONS = {
  INVOICE_MENU: 'INVOICE_MENU',
  INVOICE_LIST_VIEW: 'INVOICE_LIST_VIEW',
  INVOICE_LIST_DOWNLOAD: 'INVOICE_LIST_DOWNLOAD',
  INVOICE_LIST_EXPORT: 'INVOICE_LIST_EXPORT',

  TAX_VIEW: 'TAX_VIEW',
  TAX_VIEW_UPDATE: 'TAX_VIEW_UPDATE',

  // Email-related permissions
  EMAIL_MENU: 'EMAIL_MENU',
  EMAIL_ACCOUNT_VIEW: 'EMAIL_ACCOUNT_VIEW',
  EMAIL_ACCOUNT_ADD_ACCOUNT: 'EMAIL_ACCOUNT_ADD_ACCOUNT',
  INBOX_VIEW: 'INBOX_VIEW',
  SYNC_HISTORY_VIEW: 'SYNC_HISTORY_VIEW',

  // Category-related permissions
  CATEGORY_MENU: 'CATEGORY_MENU',
  ORG_STRUCTURE_VIEW: 'ORG_STRUCTURE_VIEW',
  PROVIDER_VIEW: 'PROVIDER_VIEW',
  PROVIDER_ADD: 'PROVIDER_ADD',
  CUSTOMER_VIEW: 'CUSTOMER_VIEW',
  CUSTOMER_ADD: 'CUSTOMER_ADD',
  PRODUCT_VIEW: 'PRODUCT_VIEW',
  EXPENSE_ITEM_VIEW: 'EXPENSE_ITEM_VIEW',
  TAXPAYER_VIEW: 'TAXPAYER_VIEW',
  TAXPAYER_IMPORT: 'TAXPAYER_IMPORT',
  TAXPAYER_EXPORT: 'TAXPAYER_EXPORT',

  // Report-related permissions
  REPORT_MENU: 'REPORT_MENU',
  REPORT_INVOICE_SUMMARY: 'REPORT_INVOICE_SUMMARY',
  REPORT_INVOICE_ADJUSTMENT: 'REPORT_INVOICE_ADJUSTMENT',
  REPORT_INVOICE_ADJUSTMENT_EXPORT: 'REPORT_INVOICE_ADJUSTMENT_EXPORT',
  EXPORT_DATA: 'EXPORT_DATA',
  REPORT_PRICE_CHECK: 'REPORT_PRICE_CHECK',
  REPORT_INVOICE_RECONCILIATION: 'REPORT_INVOICE_RECONCILIATION',
  SUPPLEMENT_TAX_REPORT: 'SUPPLEMENT_TAX_REPORT',
};

const getFileName = (response) => {
  try {
    const contentDisposition = response?.headers?.get('Content-Disposition');

    if (contentDisposition) {
      const enCodedUTFFilesName = contentDisposition.split('filename*=')[1];
      if (enCodedUTFFilesName) {
        const deCodedFilesName = decodeURI(
          enCodedUTFFilesName
            .split(';')[0]
            .trim()
            .replace("UTF-8''", '')
            .replace(/^"(.*)"$/, '$1'),
        );
        return deCodedFilesName;
      }

      return contentDisposition
        .split('filename=')[1]
        .split(';')[0]
        .trim()
        .replace(/^"(.*)"$/, '$1');
    }
  } catch (error) {
    console.error(error);
  }
};

export const downloadFile = (response, fileName = getFileName(response)) => {
  if (!fileName) return;
  if (response?.data) {
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', fileName);
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(link.href);
    document.body.removeChild(link);
  }
};

export const formatTime = (date, format = 'DD-MM-YYYY-HHmmss') => {
  return dayjs(date || new Date()).format(format);
};

export const formatDate = (date, format = 'DD/MM/YYYY') => {
  return dayjs(date || new Date()).format(format);
};

export const getAntdLocale = (language = i18n.language) => {
  switch (language) {
    case 'en':
      return enUS;
    default:
      return viVN;
  }
};

export const getAntdLocaleString = (language = i18n.language) => {
  switch (language) {
    case 'en':
      return 'en_US';
    default:
      return 'vi_VN';
  }
};

export const formatDataSize = (byteSize) => {
  if (!byteSize) return '0 ' + i18next.t('Common_DataSize_Bytes');

  const units = [
    i18next.t('Common_DataSize_Bytes'),
    i18next.t('Common_DataSize_KB'),
    i18next.t('Common_DataSize_MB'),
    i18next.t('Common_DataSize_GB'),
    i18next.t('Common_DataSize_TB'),
  ];

  const index = Math.floor(Math.log(byteSize) / Math.log(1024));
  const size = (byteSize / Math.pow(1024, index)).toFixed(2);

  return `${size} ${units[index]}`;
};

export const clearLogoutLocalStorageAndCookie = () => {
  removeCookie(ACCESS_TOKEN);
  removeCookie(REFRESH_TOKEN);
  removeLocalStorage(LOGGED_IN);
  removeLocalStorage(ORG_ID);
  removeLocalStorage(ORG_LIST);
};

export const watchObject = (object = {}, methods = [], callbackBefore = () => {}, callbackAfter = () => {}) => {
  methods.forEach((method) => {
    const original = object[method].bind(object);
    const newMethod = (...args) => {
      callbackBefore(method, ...args);
      const result = method === 'getItem' ? original(...args) : original(...args);
      if (method === 'getItem') {
        callbackAfter(method, ...args, result);
        return result;
      } else {
        callbackAfter(method, ...args);
        return result;
      }
    };
    object[method] = newMethod.bind(object);
  });
};

export const formatCurrency = (amount = 0) => {
  return amount?.toLocaleString('en-US');
};

export const defaultPaginationConfig = {
  showSizeChanger: true,
  showPrevNextJumpers: true,
  pageSize: 20,
  showTotal: (total) => (
    <span style={{ marginTop: 4, display: 'flex' }}>
      {i18next.t('Common_TotalItems')} {total}
    </span>
  ),
  // showQuickJumper: true,
};

export const createOptions = (list = [], labelKey, hasAll = true) => [
  ...(hasAll ? [{ label: i18next.t('Common_All'), value: '' }] : []),
  ...list.map((item) => ({
    value: item.id,
    label: item[labelKey],
  })),
];

export const convertKeysToSnakeCase = (obj) => {
  return Object.entries(obj).reduce((acc, [key, value]) => {
    const snakeCaseKey = key.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`).replace(/^_/, '');

    acc[snakeCaseKey] = value;
    return acc;
  }, {});
};

export const filterEmptyFieldObject = (arrayObject) => {
  return Object.fromEntries(Object.entries(arrayObject).filter(([, v]) => v));
};

export const debounce = (func, delay) => {
  let timerId;
  return (...args) => {
    if (timerId) {
      clearTimeout(timerId);
    }
    timerId = setTimeout(() => func(...args), delay);
  };
};

export const customLocale = {
  ...getAntdLocale(),
  DatePicker: {
    lang: {
      ...getAntdLocale().DatePicker?.lang,
      firstDayOfWeek: 1,
      ...(i18n.language === 'vi' && {
        shortWeekDays: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
        shortMonths: ['Th1', 'Th2', 'Th3', 'Th4', 'Th5', 'Th6', 'Th7', 'Th8', 'Th9', 'Th10', 'Th11', 'Th12'],
      }),
    },
  },
};

// export const useI18n = () => {
//   const getI18n = (key, values) => {
//     let i18nStr = i18next.t(key);
//     if (values?.length > 0) {
//       values.forEach((item, index) => {
//         i18nStr = i18nStr.replace('{' + index + '}', item);
//       });
//     }
//     return i18nStr;
//   };

//   return getI18n;
// };

export const getI18n = (key, values, isLowercase = true) => {
  if (values?.length) {
    return values.reduce(
      (str, item, index) => str.replace(`{${index}}`, isLowercase ? item?.toLowerCase() : item),
      i18next.t(key),
    );
  } else {
    return i18next.t(key);
  }
};

export const isPurchase = (invoiceType) => {
  return invoiceType === 'purchase';
};

const createColumn = ({ title, dataIndex, sorterType, fixedPosition }) => ({
  title: i18next.t(title),
  dataIndex,
  key: dataIndex,
  sorter:
    dataIndex !== 'stt' &&
    dataIndex !== 'id' &&
    (sorterType === 'numeric'
      ? (a, b) => a?.[dataIndex] - b?.[dataIndex]
      : (a, b) => a?.[dataIndex]?.localeCompare(b?.[dataIndex])),
  ...(fixedPosition ? { fixed: fixedPosition } : {}),
});

export const handleDataTable = (columns = []) => {
  return columns.map(({ children, ...columnProps }) => ({
    ...createColumn(columnProps),
    ...(children ? { children: children.map(createColumn) } : {}),
  }));
};
