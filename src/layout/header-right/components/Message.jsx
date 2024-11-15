import Heading from '@/components/heading';
import { Popover } from '@/components/popup';
import { Scrollbars } from '@pezhmanparsaee/react-custom-scrollbars';
import { Badge } from 'antd';
import { useAppState } from 'context/AppContext';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import { ReactSVG } from 'react-svg';
import { UserActionDropDown } from '../style';

const MessageBox = React.memo(() => {
  const { rtl } = useAppState();

  function renderThumb({ style }) {
    const thumbStyle = {
      borderRadius: 6,
      backgroundColor: '#F1F2F6',
    };
    return <div style={{ ...style, ...thumbStyle }} />;
  }

  const renderTrackVertical = () => {
    const thumbStyle = {
      position: 'absolute',
      width: '6px',
      transition: 'opacity 200ms ease 0s',
      opacity: 0,
      [rtl ? 'left' : 'right']: '2px',
      bottom: '2px',
      top: '2px',
      borderRadius: '3px',
    };
    return <div className="hello" style={thumbStyle} />;
  };

  function renderView({ style }) {
    const customStyle = {
      marginRight: rtl && 'auto',
      [rtl ? 'marginLeft' : 'marginRight']: '-17px',
    };
    return <div style={{ ...style, ...customStyle }} />;
  }

  renderThumb.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  renderView.propTypes = {
    style: PropTypes.shape(PropTypes.object),
  };

  const content = (
    <UserActionDropDown className="invoice-top-dropdown">
      <Heading className="invoice-top-dropdown__title" as="h5">
        <span className="title-text">Messages</span>
        <Badge className="badge-success" count={3} />
      </Heading>
      <Scrollbars
        autoHeight
        autoHide
        renderThumbVertical={renderThumb}
        renderView={renderView}
        renderTrackVertical={renderTrackVertical}
        renderTrackHorizontal={(props) => <div {...props} style={{ display: 'none' }} className="track-horizontal" />}
      >
        <div className="invoice-top-dropdown-menu">
          <ul className="invoice-top-dropdown__nav">
            <li>
              <Link to="#">
                <figure className="invoice-top-dropdown__content">
                  <img loading="lazy" src={require('@/static/img/avatar/NoPath.png')} alt="" />
                  <figcaption>
                    <Heading as="h5">
                      Software <span className="color-success">3 hrs ago</span>
                    </Heading>
                    <div>
                      <span className="invoice-top-dropdownText">Lorem ipsum dolor amet cosec...</span>
                      <span>
                        <Badge className="badge-success" count={3} />
                      </span>
                    </div>
                  </figcaption>
                </figure>
              </Link>
            </li>
            <li>
              <Link to="#">
                <figure className="invoice-top-dropdown__content">
                  <img loading="lazy" src={require('@/static/img/avatar/NoPath.png')} alt="" />
                  <figcaption>
                    <Heading as="h5">
                      Software <span className="color-success">3 hrs ago</span>
                    </Heading>
                    <div>
                      <span className="invoice-top-dropdownText">Lorem ipsum dolor amet cosec...</span>
                      <span>
                        <Badge className="badge-success" count={3} />
                      </span>
                    </div>
                  </figcaption>
                </figure>
              </Link>
            </li>
            <li>
              <Link to="#">
                <figure className="invoice-top-dropdown__content">
                  <img loading="lazy" src={require('@/static/img/avatar/NoPath.png')} alt="" />
                  <figcaption>
                    <Heading as="h5">
                      Software <span className="color-success">3 hrs ago</span>
                    </Heading>
                    <div>
                      <span className="invoice-top-dropdownText">Lorem ipsum dolor amet cosec...</span>
                      <span>
                        <Badge className="badge-success" count={3} />
                      </span>
                    </div>
                  </figcaption>
                </figure>
              </Link>
            </li>
            <li>
              <Link to="#">
                <figure className="invoice-top-dropdown__content">
                  <img loading="lazy" src={require('@/static/img/avatar/NoPath.png')} alt="" />
                  <figcaption>
                    <Heading as="h5">
                      Software <span className="color-success">3 hrs ago</span>
                    </Heading>
                    <div>
                      <span className="invoice-top-dropdownText">Lorem ipsum dolor amet cosec...</span>
                      <span>
                        <Badge className="badge-success" count={3} />
                      </span>
                    </div>
                  </figcaption>
                </figure>
              </Link>
            </li>
            <li>
              <Link to="#">
                <figure className="invoice-top-dropdown__content">
                  <img loading="lazy" src={require('@/static/img/avatar/NoPath.png')} alt="" />
                  <figcaption>
                    <Heading as="h5">
                      Software <span className="color-success">3 hrs ago</span>
                    </Heading>
                    <div>
                      <span className="invoice-top-dropdownText">Lorem ipsum dolor amet cosec...</span>
                      <span>
                        <Badge className="badge-success" count={3} />
                      </span>
                    </div>
                  </figcaption>
                </figure>
              </Link>
            </li>
            <ul />
          </ul>
        </div>
      </Scrollbars>
      <Link className="btn-seeAll" to="#">
        See all messages
      </Link>
    </UserActionDropDown>
  );

  return (
    <div className="invoice-nav-actions__item invoice-nav-actions__message">
      <Popover placement="bottomLeft" content={content} action="click">
        <Badge dot offset={[-8, -5]}>
          <Link to="#" className="invoice-nav-action-link">
            <ReactSVG src={require('@/static/img/icon/envelope.svg').default} />
          </Link>
        </Badge>
      </Popover>
    </div>
  );
});

MessageBox.propTypes = {
  rtl: PropTypes.bool,
};

export default MessageBox;
