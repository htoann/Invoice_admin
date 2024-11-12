import { PageHeader } from '@/components/page-header';
import { LayoutContent } from '@/layout/LayoutContent';
import { API_TAX_PAYER } from '@/service/apiConst';
import { useList } from 'hooks/useListCommon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import DataTable from './components/DataTable';
import { columnTaxPayer } from './utils';

const Customers = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    pagination: { current: 1, pageSize: 20 },
  });

  const { pagination } = state;
  const { current, pageSize } = pagination;

  const { list, loading, getList } = useList(state, setState, API_TAX_PAYER, t('Invoice_TaxPayer_Info'));

  useEffect(() => {
    getList();
  }, [current, pageSize]);

  const tableDataSource =
    list?.map((item, index) => ({
      key: item.id,
      stt: (current - 1) * pageSize + index + 1,
      ...Object.fromEntries(Object.entries(item).map(([key, value]) => [key, <span key={key}>{value}</span>])),
    })) || [];

  const dataTableColumn = columnTaxPayer.map((col) => ({
    title: t(col.title),
    dataIndex: col.dataIndex,
    key: col.key,
    sorter:
      col.key !== 'stt'
        ? (a, b) => a?.[col.dataIndex]?.props?.children?.localeCompare(b?.[col.dataIndex]?.props?.children)
        : false,
    fixed: col?.fixed,
    width: col?.width,
  }));

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Invoice_TaxPayer_Info')} />
      <LayoutContent borderLessHeading cards cardsProps={{ headless: 'headless' }}>
        <DataTable
          tableData={tableDataSource}
          columns={dataTableColumn}
          setState={setState}
          loading={loading}
          getList={getList}
          pagination={pagination}
        />
      </LayoutContent>
    </>
  );
};

export default Customers;
