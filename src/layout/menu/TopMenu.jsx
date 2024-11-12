import { Skeleton } from 'antd';
import { useAuth } from 'context/AuthContext';
import { useLayoutEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { TopMenuStyle } from '../style';
import { WithPermission } from '../WithPermission';
import { menuItems } from './utils';

export const TopMenu = () => {
  const { t } = useTranslation();
  const { loadingUserInfo } = useAuth();

  useLayoutEffect(() => {
    const active = document.querySelector('.invoice-top-menu a.active');
    const activeDefault = () => {
      const megaMenu = active.closest('.megaMenu-wrapper');
      const hasSubMenuLeft = active.closest('.has-subMenu-left');
      if (!megaMenu) {
        active.closest('ul').previousSibling.classList.add('active');
        if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
      } else {
        active.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
      }
    };
    window.addEventListener('load', active && activeDefault);
    return () => window.removeEventListener('load', activeDefault);
  }, []);

  // const addParentActive = (event) => {
  //   document.querySelectorAll('.parent').forEach((element) => {
  //     element.classList.remove('active');
  //   });

  //   const hasSubMenuLeft = event.currentTarget.closest('.has-subMenu-left');
  //   const megaMenu = event.currentTarget.closest('.megaMenu-wrapper');
  //   if (!megaMenu) {
  //     event.currentTarget.closest('ul').previousSibling.classList.add('active');
  //     if (hasSubMenuLeft) hasSubMenuLeft.closest('ul').previousSibling.classList.add('active');
  //   } else {
  //     event.currentTarget.closest('.megaMenu-wrapper').previousSibling.classList.add('active');
  //   }
  // };

  return (
    <TopMenuStyle>
      <div className="invoice-top-menu">
        <ul>
          {loadingUserInfo
            ? Array.from({ length: 5 }).map((_, index) => (
                <li key={index}>
                  <Skeleton.Input
                    key={index}
                    style={{ width: 90, minWidth: 90, marginBottom: 8 }}
                    active
                    size="small"
                  />
                </li>
              ))
            : menuItems.map((menu) => (
                <WithPermission permissions={menu.permission} key={menu.key}>
                  <li className={menu.subMenu ? 'has-subMenu' : ''}>
                    <Link to={menu.to || '#'} className="parent">
                      {t(menu.text)}
                    </Link>

                    {menu.subMenu && (
                      <ul className="subMenu">
                        {menu.subMenu.map((subMenu) => (
                          <WithPermission key={subMenu.key} permissions={subMenu.permission}>
                            <li>
                              <Link to={subMenu.to}>{t(subMenu.text)}</Link>
                            </li>
                          </WithPermission>
                        ))}
                      </ul>
                    )}
                  </li>
                </WithPermission>
              ))}
        </ul>
      </div>
    </TopMenuStyle>
  );
};
