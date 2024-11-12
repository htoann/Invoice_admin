import { Cards } from '@/components/card';
import { BorderLessHeading, TableDefaultStyle } from '@/container/style';
import { Table } from 'antd';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

export const invoicesChange = [
  {
    trangThai: 'Đã thanh toán',
    kyHieu: 'AB123',
    soHoaDon: '001',
    ngayLap: '2024-07-20',
    thongTinNguoiBan: 'Công ty A',
  },
  {
    trangThai: 'Chưa thanh toán',
    kyHieu: 'CD456',
    soHoaDon: '002',
    ngayLap: '2024-07-21',
    thongTinNguoiBan: 'Công ty B',
  },
  {
    trangThai: 'Đã hủy',
    kyHieu: 'EF789',
    soHoaDon: '003',
    ngayLap: '2024-07-22',
    thongTinNguoiBan: 'Công ty C',
  },
  {
    trangThai: 'Chờ thanh toán',
    kyHieu: 'GH012',
    soHoaDon: '004',
    ngayLap: '2024-07-23',
    thongTinNguoiBan: 'Công ty D',
  },
  {
    trangThai: 'Đang xử lý',
    kyHieu: 'IJ345',
    soHoaDon: '005',
    ngayLap: '2024-07-24',
    thongTinNguoiBan: 'Công ty E',
  },
];

const InvoicesChange = React.memo(() => {
  const { t } = useTranslation();
  const [list, setList] = useState(invoicesChange);

  const tableColumns = [
    {
      title: 'Trạng Thái',
      dataIndex: 'trangThai',
      key: 'trangThai',
    },
    {
      title: 'Ký Hiệu',
      dataIndex: 'kyHieu',
      key: 'kyHieu',
    },
    {
      title: 'Số Hóa Đơn',
      dataIndex: 'soHoaDon',
      key: 'soHoaDon',
    },
    {
      title: 'Ngày Lập',
      dataIndex: 'ngayLap',
      key: 'ngayLap',
    },
    {
      title: 'Thông Tin Người Bán',
      dataIndex: 'thongTinNguoiBan',
      key: 'thongTinNguoiBan',
    },
  ];

  const getList = async () => {
    try {
      // const response = await axios.get(API_INVOICES_CHANGE);
      // setList(response?.data?.invoicesChange || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getList();
  }, []);

  const listData =
    list?.length > 0 &&
    list.map((value, index) => {
      const { trangThai, kyHieu, soHoaDon, ngayLap, thongTinNguoiBan } = value;
      return {
        key: index,
        trangThai,
        kyHieu,
        soHoaDon,
        ngayLap,
        thongTinNguoiBan,
      };
    });

  return (
    <div className="full-width-table">
      <BorderLessHeading>
        <Cards title={t('Dashboard_InvoicesChange')} size="large">
          <TableDefaultStyle className="invoice-having-header-bg">
            <div className="table-responsive">
              <Table columns={tableColumns} dataSource={listData} pagination={false} />
            </div>
          </TableDefaultStyle>
        </Cards>
      </BorderLessHeading>
    </div>
  );
});

export default InvoicesChange;
