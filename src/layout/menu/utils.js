import { routes } from '@/routes/const';
import {
  UilBox,
  UilBuilding,
  UilCreateDashboard,
  UilEnvelope,
  UilFileInfoAlt,
  UilInvoice,
  UilMoneyBill,
  UilSync,
  UilTable,
  UilTruck,
  UilUser,
  UilUserPlus,
  UilUsersAlt,
} from '@tooni/iconscout-unicons-react';
import i18next from 'i18next';
import { PERMISSIONS } from '../../utils';

export const menuItems = [
  {
    key: routes.dashboard,
    text: 'Common_Overview',
    to: routes.dashboard,
  },
  {
    key: routes.invoiceManagement,
    text: 'Invoice_Management',
    subMenu: [
      {
        key: routes.invoice,
        text: 'Common_InvoiceList',
        to: routes.invoice,
        permission: PERMISSIONS.INVOICE_LIST_VIEW,
      },
      {
        key: routes.invoiceConnectTax,
        text: 'Common_ConnectTaxAuthorities',
        to: routes.invoiceConnectTax,
        permission: PERMISSIONS.TAX_VIEW,
      },
    ],
    permission: PERMISSIONS.INVOICE_MENU,
  },
  {
    key: routes.email,
    text: 'Common_Inbox',
    subMenu: [
      {
        key: routes.emailAccount,
        text: 'Mail_AccountList_Title',
        to: routes.emailAccount,
        permission: PERMISSIONS.EMAIL_ACCOUNT_VIEW,
      },
      { key: routes.emailInbox, text: 'Common_Inbox', to: routes.emailInbox, permission: PERMISSIONS.INBOX_VIEW },
      {
        key: routes.emailSync,
        text: 'Common_SyncHistory',
        to: routes.emailSync,
        permission: PERMISSIONS.SYNC_HISTORY_VIEW,
      },
    ],
    permission: PERMISSIONS.EMAIL_MENU,
  },
  {
    key: routes.category,
    text: 'Common_Category',
    subMenu: [
      {
        key: routes.categoryOrg,
        text: 'Common_OrgStructure',
        to: routes.categoryOrg,
        permission: PERMISSIONS.ORG_STRUCTURE_VIEW,
      },
      {
        key: routes.categoryProvider,
        text: 'Common_Provider',
        to: routes.categoryProvider,
        permission: PERMISSIONS.SUPPLIER_VIEW,
      },
      {
        key: routes.categoryCustomer,
        text: 'Common_Customer',
        to: routes.categoryCustomer,
        permission: PERMISSIONS.CUSTOMER_VIEW,
      },
      { key: routes.categoryProduct, text: 'Common_Goods', to: '#', permission: PERMISSIONS.GOODS_VIEW },
      { key: routes.categoryExpense, text: 'Common_ExpenseItem', to: '#', permission: PERMISSIONS.EXPENSE_ITEM_VIEW },
      {
        key: routes.categoryTaxPayer,
        text: i18next.t('Invoice_TaxPayer_Info'),
        to: routes.categoryTaxPayer,
        permission: PERMISSIONS.TAXPAYER_VIEW,
      },
    ],
    permission: PERMISSIONS.CATEGORY_MENU,
  },

  {
    key: routes.users,
    text: 'Người dùng',
    to: routes.users,
  },
];

export const getMenuItem = (label, key, icon, children, type) => {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
};

export const iconMap = {
  [routes.dashboard]: <UilCreateDashboard />,

  [routes.invoiceManagement]: <UilInvoice />,
  [routes.invoice]: <UilFileInfoAlt />,
  [routes.invoiceConnectTax]: <UilSync />,

  [routes.email]: <UilEnvelope />,
  [routes.emailAccount]: <UilUserPlus />,
  [routes.emailInbox]: <UilEnvelope />,
  [routes.emailSync]: <UilSync />,

  [routes.category]: <UilTable />,
  [routes.categoryOrg]: <UilBuilding />,
  [routes.categoryProduct]: <UilBox />,
  [routes.categoryProvider]: <UilTruck />,
  [routes.categoryCustomer]: <UilUsersAlt />,
  [routes.categoryExpense]: <UilMoneyBill />,
  [routes.categoryTaxPayer]: <UilFileInfoAlt />,

  [routes.users]: <UilUser />,
};
