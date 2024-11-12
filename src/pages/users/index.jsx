import { PageHeader } from '@/components/page-header';
import { LayoutContent } from '@/layout/LayoutContent';
import { API_PROVIDERS } from '@/service';
import { useList } from 'hooks/useListCommon';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import CreateUser from './components/CreateUser';
import DataTable from './components/DataTable';
import EditUser from './components/EditUser';
import useDataTableColumn from './hooks/useDataTableColumn';
import useDataTableSource from './hooks/useDataTableSource';
import { columnDataProvider } from './utils';

const Users = () => {
  const { t } = useTranslation();

  const [state, setState] = useState({
    visible: false,
    editVisible: false,
    update: {},
    pagination: { current: 1, pageSize: 20 },
  });
  const [searchParams, setSearchParams] = useState({});

  const { list, loading, getList, setList } = useList(state, setState, API_PROVIDERS, t('Common_Provider'));

  const { pagination } = state;
  const { current, pageSize } = pagination;

  useEffect(() => {
    getList(searchParams);
  }, [current, pageSize, searchParams]);

  const tableDataSource = useDataTableSource(list, current, pageSize, setState, setList);
  const dataTableColumn = useDataTableColumn(columnDataProvider, searchParams, setSearchParams, setState);

  return (
    <>
      <PageHeader className="invoice-page-header-main" title={t('Danh sách người dùng')} />
      <LayoutContent borderLessHeading cards cardsProps={{ headless: 'headless' }}>
        <DataTable
          tableData={tableDataSource}
          columns={dataTableColumn}
          state={state}
          setState={setState}
          loading={loading}
        />
      </LayoutContent>

      {state.visible && <CreateUser state={state} setState={setState} list={list} setList={setList} />}

      {state.editVisible && <EditUser state={state} setState={setState} list={list} setList={setList} />}
    </>
  );
};

export default Users;
