import { routes } from '@/routes/const';
import { formatCurrency, handleDataTable, isPurchase } from '@/utils/index';
import i18next from 'i18next';
import { Fragment } from 'react';
// import { UilCheckCircle, UilExclamationTriangle, UilInfoCircle } from '@tooni/iconscout-unicons-react';

// export const statusTypeMap = {
//   1: 'info',
//   2: 'success',
//   3: 'error',
// };

// export const statusTextMap = {
//   1: 'Đang chờ kết nối',
//   2: 'Kết nối thành công',
//   3: 'Kết nối thất bại',
// };

// export const statusIconMap = {
//   1: <UilInfoCircle />,
//   2: <UilCheckCircle />,
//   3: <UilExclamationTriangle />,
// };

export const EStatusTax = {
  Waiting: 1,
  Success: 2,
  Failure: 3,
};

/* spell-checker: disable */
export const handleTableDataSource = (invoiceList = [], current, pageSize) =>
  invoiceList.map((item, index) => ({
    key: item.id || item.no,
    stt: (current - 1) * pageSize + index + 1,
    ...item,
    tgtcthue: formatCurrency(item.tgtcthue),
    tgtthue: formatCurrency(item.tgtthue),
    ttcktmai: formatCurrency(item.ttcktmai),
    thttlphi: formatCurrency(item.thttlphi),
    tgtttbso: formatCurrency(item.tgtttbso),
    loaitd: item?.loaitd?.split('\n')?.map((line, index) => <Fragment key={index}>{line}</Fragment>),
  }));

export const columns = (invoiceType) => {
  const isPurchaseType = isPurchase(invoiceType);
  const columns = [
    { title: 'Common_STT', dataIndex: 'stt' },
    { title: 'Invoice_ModelCode', dataIndex: 'khmshdon', sorterType: 'numeric' },
    { title: 'Invoice_InvoiceCode', dataIndex: 'khhdon' },
    { title: 'Invoice_InvoiceNumber', dataIndex: 'shdon', sorterType: 'numeric', fixedPosition: 'left' },
    { title: 'Invoice_CreationDate', dataIndex: 'nlap' },
    { title: 'Invoice_InvoiceSignDate', dataIndex: 'nky' },
    { title: 'Invoice_InvoiceGroup', dataIndex: 'nhomhd' },
    { title: 'Invoice_BranchSource', dataIndex: 'chinhanh' },
    { title: isPurchaseType ? 'Invoice_SellerTaxCode' : 'Invoice_BuyerTaxCode', dataIndex: 'mst' },
    { title: isPurchaseType ? 'Invoice_SellerName' : 'Invoice_BuyerName', dataIndex: 'ten' },
    { title: isPurchaseType ? 'Common_SellerAddress' : 'Common_BuyerAddress', dataIndex: 'dchi' },
    { title: 'Invoice_TotalBeforeTax', dataIndex: 'tgtcthue', sorterType: 'numeric' },
    { title: 'Invoice_TotalTax', dataIndex: 'tgtthue', sorterType: 'numeric' },
    { title: 'Invoice_TotalCommercialDiscount', dataIndex: 'ttcktmai', sorterType: 'numeric' },
    { title: 'Invoice_TotalFees', dataIndex: 'thttlphi', sorterType: 'numeric' },
    { title: 'Invoice_TotalPayment', dataIndex: 'tgtttbso', sorterType: 'numeric' },
    { title: 'Invoice_Currency', dataIndex: 'dvtte' },
    { title: 'Invoice_Status', dataIndex: 'tthai' },
    { title: 'Invoice_CheckResult', dataIndex: 'ttxly' },
    { title: 'Invoice_TraceCode', dataIndex: 'matracuu' },
    { title: 'Invoice_OriginalInvoiceNumber', dataIndex: 'sohdgoc', sorterType: 'numeric' },
    { title: 'Invoice_OriginalInvoiceDate', dataIndex: 'sohdgocngay' },
    { title: 'Invoice_ChangeType', dataIndex: 'loaitd' },
    { title: 'Invoice_ChangeDate', dataIndex: 'ngaytd' },
    { title: 'Common_TaxCode', dataIndex: 'msttd' },
    { title: 'Invoice_CompanyName', dataIndex: 'tentd' },
    { title: 'Common_Address', dataIndex: 'diachitd' },
    { title: 'Invoice_InformationVerificationResult', dataIndex: 'ketquadoichieu' },
    { title: 'Invoice_CompanyStatus', dataIndex: 'tinhtrangdn' },
    { title: 'Invoice_PublicationDate', dataIndex: 'ngaycongbo' },
  ];

  return handleDataTable(columns);
};

export const pageRoutes = [
  { path: routes.invoice, breadcrumbName: i18next.t('Invoice_Management') },
  { path: routes.invoice, breadcrumbName: i18next.t('Invoice_List') },
];
