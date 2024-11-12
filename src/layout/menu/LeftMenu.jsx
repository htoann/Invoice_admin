import { routes } from '@/routes/const';
import { UilEllipsisV } from '@tooni/iconscout-unicons-react';
import { Menu, Tooltip } from 'antd';
import { useAppState } from 'context/AppContext';
import { usePermission } from 'hooks/usePermission';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import './Menu.scss';
import { getMenuItem, iconMap, menuItems } from './utils';

export const LeftMenu = ({ toggleCollapsed }) => {
  const { t } = useTranslation();
  const checkPermission = usePermission();
  const { topMenu } = useAppState();

  const pathName = window.location.pathname;
  const pathArray = pathName && pathName !== '/' ? pathName.split('/') : [];
  const mainPath = pathArray.length > 1 ? pathArray[1] : '';
  const mainPathSplit = mainPath.split('/');

  const [openKeys, setOpenKeys] = useState(
    !topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : mainPathSplit?.[0] || '/'}`] : [],
  );

  const onOpenChange = (keys) => {
    setOpenKeys(keys[keys.length - 1] !== 'recharts' ? [keys.length && keys[keys.length - 1]] : keys);
  };

  const onClick = (item) => {
    if (item.keyPath.length === 1) setOpenKeys([]);
  };

  const createNavLink = (pathLink, textKey, isSubMenu = false) => (
    <Link
      onClick={toggleCollapsed}
      to={pathLink}
      className={isSubMenu ? 'subMenu' : ''}
      style={{ display: 'block', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}
    >
      <Tooltip title={t(textKey)} placement="right" className="left-menu-navbar-title">
        {t(textKey)}
      </Tooltip>
    </Link>
  );

  const createMenuItems = (items, isSubMenu = false) =>
    items
      .map((item) => {
        if (checkPermission(item.permission)) {
          return getMenuItem(
            createNavLink(item.to, item.text, isSubMenu),
            item.key,
            iconMap[item.key] || null,
            item.subMenu && createMenuItems(item.subMenu, true),
          );
        }
        return null;
      })
      .filter(Boolean);

  const items = menuItems
    .filter((item) => checkPermission(item.permission))
    .map((item) => {
      const menuTitle = item.subMenu ? t(item.text) : createNavLink(item.to, item.text);
      const menuIcon = iconMap[item.key] || null;

      return getMenuItem(menuTitle, item.key, menuIcon, item.subMenu && createMenuItems(item.subMenu, true));
    });

  const childPath = pathArray.slice(1, 3).join('/');

  return (
    <Menu
      onOpenChange={onOpenChange}
      onClick={onClick}
      mode={!topMenu || window.innerWidth <= 1328 ? 'inline' : 'horizontal'}
      defaultSelectedKeys={!topMenu ? [`${childPath.length === 1 ? routes.dashboard : childPath}`] : []}
      defaultOpenKeys={!topMenu ? [`${mainPathSplit.length > 2 ? mainPathSplit[1] : 'dashboard'}`] : []}
      overflowedIndicator={<UilEllipsisV />}
      openKeys={openKeys}
      items={items}
    />
  );
};
