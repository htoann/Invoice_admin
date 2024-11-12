export const routes = {
  login: 'dang-nhap',
  register: 'dang-ky',

  dashboard: '/',

  invoiceManagement: 'quan-ly-hoa-don',
  invoice: 'quan-ly-hoa-don/hoa-don',
  invoiceConnectTax: 'quan-ly-hoa-don/ket-noi-co-quan-thue',

  email: 'hop-thu',
  emailAccount: 'hop-thu/tai-khoan',
  emailInbox: 'hop-thu/hop-thu-den',
  emailSync: 'hop-thu/dong-bo',

  category: 'danh-muc',
  categoryOrg: 'danh-muc/co-cau-to-chuc',
  categoryProvider: 'danh-muc/nha-cung-cap',
  categoryCustomer: 'danh-muc/khach-hang',
  categoryProduct: 'danh-muc/hang-hoa',
  categoryExpense: 'danh-muc/khoan-muc-chi-phi',
  categoryTaxPayer: 'danh-muc/thong-tin-thue',

  report: 'bao-cao',
  reportInvoiceSummary: 'bao-cao/tong-hop-mua-vao-ban-ra',
  reportInvoiceAdjustment: 'bao-cao/bang-ke-thay-the-dieu-chinh',
  reportExportData: 'bao-cao/xuat-du-lieu',
  reportPriceCheck: 'bao-cao/kiem-tra-don-gia',
  reportInvoiceReconciliation: 'bao-cao/doi-chieu-chenh-lech-hoa-don',
  reportSupplementTax: 'bao-cao/bo-sung-doi-chieu-to-khai-thue-theo-tung-lan-kiem-tra',
};
