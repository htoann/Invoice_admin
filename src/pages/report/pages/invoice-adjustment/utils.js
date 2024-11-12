/* spell-checker: disable */
import { routes } from '@/routes/const';
import { formatCurrency, handleDataTable, isPurchase } from '@/utils/index';
import i18next from 'i18next';

export const handleTableDataSource = (invoiceList = [], current, pageSize) =>
  invoiceList.map((item, index) => ({
    key: item?.id || item?.no,
    stt: (current - 1) * pageSize + index + 1,
    ...item,
    tgtcthue: formatCurrency(item.tgtcthue),
    tgtthue: formatCurrency(item.tgtthue),
    original_tgtcthue: formatCurrency(item.original_tgtcthue),
    original_tgtthue: formatCurrency(item.original_tgtthue),
  }));

export const columns = (invoiceType) => {
  const isPurchaseType = isPurchase(invoiceType);
  const columns = [
    { title: 'Common_STT', dataIndex: 'stt' },
    { title: 'Invoice_ModelCode', dataIndex: 'khmshdon', sorterType: 'numeric' },
    { title: 'Invoice_InvoiceCode', dataIndex: 'khhdon' },
    { title: 'Invoice_InvoiceSignDate', dataIndex: 'nky' },
    { title: isPurchaseType ? 'Invoice_SellerTaxCode' : 'Invoice_BuyerTaxCode', dataIndex: 'mst' },
    { title: isPurchaseType ? 'Invoice_SellerName' : 'Invoice_BuyerName', dataIndex: 'ten' },
    { title: 'Invoice_Status', dataIndex: 'tthai' },
    {
      title: 'Invoice_OriginalInvoiceInfo',
      children: [
        { title: 'Invoice_InvoiceNumber', dataIndex: 'original_shdon' },
        { title: 'Invoice_CreationDate', dataIndex: 'original_nlap' },
        { title: 'Invoice_TotalBeforeTax', dataIndex: 'original_tgtcthue' },
        { title: 'Invoice_TotalTax', dataIndex: 'original_tgtthue' },
      ],
    },
    {
      title: 'Invoice_AdjustmentReplacementInfo',
      children: [
        { title: 'Invoice_InvoiceNumber', dataIndex: 'shdon' },
        { title: 'Invoice_CreationDate', dataIndex: 'nlap' },
        { title: 'Invoice_TotalBeforeTax', dataIndex: 'tgtcthue' },
        { title: 'Invoice_TotalTax', dataIndex: 'tgtthue' },
      ],
    },
    { title: 'Invoice_AdjustmentReplacementReason', dataIndex: 'gchdgoc' },
    { title: 'Invoice_CompanyStatus', dataIndex: 'tinhtrangdn' },
    { title: 'Invoice_PublicationDate', dataIndex: 'ngaycongbo' },
  ];

  return handleDataTable(columns);
};

export const pageRoutes = [
  { path: routes.invoice, breadcrumbName: i18next.t('Common_Report') },
  { path: routes.invoice, breadcrumbName: i18next.t('Invoice_ReplacementAdjustmentList') },
];
