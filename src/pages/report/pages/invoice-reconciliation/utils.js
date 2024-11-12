/* spell-checker: disable */
import { routes } from '@/routes/const';
import { formatCurrency, handleDataTable, isPurchase } from '@/utils/index';
import i18next from 'i18next';

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
    loaitd: item.loaitd?.split('\n') || [],
  }));

export const columns = (invoiceType) => {
  const isPurchaseType = isPurchase(invoiceType);
  const columns = [
    { title: 'Common_STT', key: 'stt' },
    { title: 'Invoice_ModelCode', key: 'khmshdon' },
    { title: 'Invoice_InvoiceCode', key: 'khhdon' },
    { title: 'Invoice_InvoiceNumber', key: 'shdon', fixed: 'left' },
    { title: 'Invoice_CreationDate', key: 'nlap' },
    { title: 'Invoice_InvoiceSignDate', key: 'nky' },
    { title: 'Invoice_InvoiceGroup', key: 'nhomhd' },
    { title: 'Invoice_BranchSource', key: 'chinhanh' },
    {
      title: isPurchaseType ? 'Invoice_SellerTaxCode' : 'Invoice_BuyerTaxCode',
      key: 'mst',
    },
    {
      title: isPurchaseType ? 'Invoice_SellerName' : 'Invoice_BuyerName',
      key: 'ten',
    },
    {
      title: isPurchaseType ? 'Common_SellerAddress' : 'Common_BuyerAddress',
      key: 'dchi',
    },
    { title: 'Invoice_TotalBeforeTax', key: 'tgtcthue' },
    { title: 'Invoice_TotalTax', key: 'tgtthue' },
    { title: 'Invoice_TotalCommercialDiscount', key: 'ttcktmai' },
    { title: 'Invoice_TotalFees', key: 'thttlphi' },
    { title: 'Invoice_TotalPayment', key: 'tgtttbso' },
    { title: 'Invoice_Currency', key: 'dvtte' },
    { title: 'Invoice_Status', key: 'tthai' },
    { title: 'Invoice_CheckResult', key: 'ttxly' },
    { title: 'Invoice_TraceCode', key: 'matracuu' },
    { title: 'Invoice_OriginalInvoiceNumber', key: 'sohdgoc' },
    { title: 'Invoice_OriginalInvoiceDate', key: 'sohdgocngay' },
    { title: 'Invoice_ChangeType', key: 'loaitd' },
    { title: 'Invoice_ChangeDate', key: 'ngaytd' },
    { title: 'Common_TaxCode', key: 'msttd' },
    { title: 'Invoice_CompanyName', key: 'tentd' },
    { title: 'Common_Address', key: 'diachitd' },
    { title: 'Invoice_InformationVerificationResult', key: 'ketquadoichieu' },
    { title: 'Invoice_CompanyStatus', key: 'tinhtrangdn' },
    { title: 'Invoice_PublicationDate', key: 'ngaycongbo' },
  ];

  return handleDataTable(columns);
};

export const pageRoutes = [
  { path: routes.invoice, breadcrumbName: i18next.t('Common_Report') },
  { path: routes.invoice, breadcrumbName: i18next.t('Invoice_ReplacementAdjustmentList') },
];
