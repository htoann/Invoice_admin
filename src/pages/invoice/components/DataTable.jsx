import { Tab } from '@/components/tabs';
import { TableWrapper } from '@/container/style';
import { DATE_FORMAT_DASH, defaultPaginationConfig, formatTime, isPurchase } from '@/utils/index';
import { Space, Table } from 'antd';
import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableStyleWrap } from '../style';
import { HeaderTable } from './HeaderTable';

function DataTable({ loading, tableData, columns, state, setState, getInvoiceList }) {
  const { t } = useTranslation();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);

  const [searchParams, setSearchParams] = useState({
    taxNumber: '',
    khhdon: '',
    shdon: '',
    ten: '',
    date_from: formatTime(dayjs().subtract(1, 'month').startOf('day').toDate(), DATE_FORMAT_DASH),
    date_to: formatTime(dayjs().endOf('day').toDate(), DATE_FORMAT_DASH),
  });

  const { pagination, invoiceType } = state;
  const { current, pageSize } = pagination;
  const { taxNumber, ten, date_from, date_to } = searchParams;

  useEffect(() => {
    const mstKey = isPurchase(invoiceType) ? 'nbmst' : 'nmmst';
    const tenKey = isPurchase(invoiceType) ? 'nbten' : 'nmten';
    const newSearchParams = Object.fromEntries(
      Object.entries(searchParams).filter(([key, value]) => value && !['ten', 'taxNumber'].includes(key)),
    );

    getInvoiceList({
      loaihdon: invoiceType,
      date_from,
      date_to,
      ...newSearchParams,
      [mstKey]: taxNumber,
      [tenKey]: ten,
    });
  }, [current, pageSize, invoiceType, date_from, date_to, searchParams]);

  const handleChangeInvoiceType = (invoiceType) => {
    setState({
      ...state,
      pagination: { ...pagination, current: 1 },
      invoiceType,
    });
  };

  const rowSelection = {
    onChange: (selectedRowKeys) => {
      setSelectedRowKeys(selectedRowKeys);
    },
    getCheckboxProps: (record) => {
      return {
        id: record.id,
      };
    },
  };

  return (
    <DataTableStyleWrap>
      <div className="invoice-datatable-filter">
        <Space className="invoice-datatable-filter__input">
          <Tab
            data={[
              { key: 'purchase', tabTitle: t('Common_Purchase'), disabled: loading },
              { key: 'sold', tabTitle: t('Common_Sold'), disabled: loading },
            ]}
            onChange={handleChangeInvoiceType}
          />
        </Space>
        <HeaderTable
          state={state}
          setState={setState}
          selectedRowKeys={selectedRowKeys}
          searchParams={searchParams}
          setSearchParams={setSearchParams}
        />
      </div>

      <div className="invoice-datatable">
        <TableWrapper className="table-data-view table-responsive">
          <Table
            pagination={{ ...defaultPaginationConfig, ...pagination }}
            dataSource={tableData}
            columns={columns}
            loading={loading}
            rowSelection={rowSelection}
            onChange={(pagination) => {
              setState((prev) => ({
                ...prev,
                pagination,
              }));
            }}
          />
        </TableWrapper>
      </div>
    </DataTableStyleWrap>
  );
}

export default DataTable;
