import { PageHeader } from '@/components/page-header';
import { LayoutContent } from '@/layout/LayoutContent';
import { API_INVOICE_ADJUSTMENT } from '@/service/apiConst';
import { useList } from 'hooks/useListCommon';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from './components/DataTable';
import { columns, handleTableDataSource, pageRoutes } from './utils';

function InvoiceReconciliation() {
  const { t } = useTranslation();

  const [state, setState] = useState({
    invoiceAdjustmentList: [],
    pagination: { current: 1, pageSize: 20 },
    invoiceType: 'purchase',
  });

  const { invoiceType, invoiceAdjustmentList, pagination } = state;
  const { current, pageSize } = pagination;

  const handleResponse = (response) => {
    setState((prev) => ({
      ...prev,
      invoiceAdjustmentList: response?.data?.results,
      pagination: {
        ...prev.pagination,
        total: Number(response?.data?.count) || 0,
      },
    }));
  };

  const { loading, getList: getList } = useList(
    state,
    setState,
    API_INVOICE_ADJUSTMENT,
    t('Report_InvoiceReconciliation'),
    handleResponse,
  );

  // const pageTitle = `${t('Invoice_ReplacementAdjustmentList')} ${isPurchase(invoiceType) ? t('Common_Purchase') : t('Common_Sold')}`;

  return (
    <>
      <PageHeader title={t('Report_InvoiceReconciliation')} routes={pageRoutes} />
      <LayoutContent borderLessHeading cards cardsProps={{ headless: true }}>
        <DataTable
          tableData={handleTableDataSource(invoiceAdjustmentList, current, pageSize)}
          columns={columns(invoiceType)}
          state={state}
          setState={setState}
          getList={getList}
          loading={loading}
        />
      </LayoutContent>
    </>
  );
}

export default InvoiceReconciliation;
