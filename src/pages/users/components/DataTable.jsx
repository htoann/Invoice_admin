import { ButtonPermission } from '@/components/button';
import { TableWrapper } from '@/container/style';
import { defaultPaginationConfig, PERMISSIONS } from '@/utils/index';
import { Table } from 'antd';
import { useTranslation } from 'react-i18next';
import { DataTableStyleWrap } from '../style';

const DataTable = ({ rowSelection, tableData, columns, pagination, setState, state, loading }) => {
  const { t } = useTranslation();

  return (
    <DataTableStyleWrap>
      <div className="invoice-datatable-filter">
        <div
          style={{
            display: 'flex',
            gap: 10,
            marginRight: 'auto',
            marginTop: 10,
            justifyContent: 'space-between',
            width: '100%',
          }}
        >
          <div style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
            <ButtonPermission
              permissions={PERMISSIONS.PROVIDER_ADD}
              onClick={() => {
                setState({
                  ...state,
                  visible: true,
                });
              }}
              className="btn-add_new"
              size="small"
              type="primary"
              key="1"
            >
              + {t('Thêm người dùng')}
            </ButtonPermission>
          </div>
        </div>
      </div>

      <div className="invoice-datatable">
        <TableWrapper className="table-data-view table-responsive">
          <Table
            className="table-search-selection"
            rowSelection={rowSelection}
            pagination={{ ...defaultPaginationConfig, ...pagination }}
            dataSource={tableData}
            columns={columns}
            loading={loading}
            onChange={(_pagination) => {
              setState((prev) => ({
                ...prev,
                pagination: _pagination,
              }));
            }}
          />
        </TableWrapper>
      </div>
    </DataTableStyleWrap>
  );
};
export default DataTable;
