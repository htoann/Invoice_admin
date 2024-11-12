import { ButtonPermission } from '@/components/button';
import { TableWrapper } from '@/container/style';
import { API_TAX_PAYER_EXCEL } from '@/service/apiConst';
import { dataService } from '@/service/dataService';
import { defaultPaginationConfig, downloadFile, formatTime, PERMISSIONS } from '@/utils/index';
import { DownloadOutlined } from '@ant-design/icons';
import { notification, Table } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { DataTableStyleWrap } from '../style';
import { UploadFile } from './UploadFile';

function DataTable({ tableData, columns, pagination, setState, loading, getList }) {
  const { t } = useTranslation();

  const [loadingExport, setLoadingExport] = useState(false);

  const handleExport = async () => {
    setLoadingExport(true);
    try {
      const response = await dataService.get(API_TAX_PAYER_EXCEL, {}, { responseType: 'blob' });
      downloadFile(response, `TTNNT_${formatTime(new Date(), 'YYYYMMDDHHmm')}.xlsx`);
    } catch {
      notification.error({
        message: t('Common_Error'),
        description: t('Common_CanNotExportInvoiceExcel'),
      });
    } finally {
      setLoadingExport(false);
    }
  };

  return (
    <DataTableStyleWrap>
      <div className="invoice-datatable-filter">
        <div style={{ justifyContent: 'space-between', display: 'flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <div style={{ display: 'flex', marginLeft: 'auto', gap: 10 }}>
            <UploadFile getList={getList} />
            <ButtonPermission
              permissions={PERMISSIONS.TAXPAYER_EXPORT}
              type="primary"
              size="small"
              outlined
              onClick={handleExport}
              disabled={loadingExport}
              loading={loadingExport}
            >
              <DownloadOutlined />
              {t('Common_ExportExcel')}
            </ButtonPermission>
          </div>
        </div>
      </div>

      <div className="invoice-datatable">
        <TableWrapper className="table-data-view table-responsive">
          <Table
            loading={loading}
            pagination={{ ...defaultPaginationConfig, ...pagination }}
            dataSource={tableData}
            columns={columns}
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
}

export default DataTable;
