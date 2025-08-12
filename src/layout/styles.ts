import { Menu } from 'antd'
import styled from 'styled-components'

export const CustomMenu = styled(Menu)<{ $isCollapsed: boolean }>`
  padding-top: 12px;
  border: none !important;
  transition:
    border-color 0.3s,
    background 0.3s,
    padding 0.2s cubic-bezier(0.215, 0.61, 0.355, 1) !important;
  .ant-menu-item {
    display: flex !important;
    gap: 8px;
    align-items: center !important;
    justify-content: center !important;
    padding: 20px !important;
  }
  .ant-menu-title-content {
    display: ${({ $isCollapsed }) => ($isCollapsed ? 'none' : 'block')} !important;
    text-transform: uppercase !important;
    font-size: 14px !important;
    font-weight: 500 !important;
    width: 150px;
    line-height: 110%;
    white-space: normal;
  }
  .ant-menu-item-icon {
    width: 20px;
    flex-shrink: 0; /* prevent icon from shrinking */
  }

  .ant-menu .ant-menu-item .ant-menu-title-content {
    width: 200px;
  }
  /* Ensure SVG icons never shrink */
  .ant-menu-item svg,
  .ant-menu-submenu-title svg {
    flex-shrink: 0;
  }
  .ant-menu-submenu .ant-menu-submenu-title {
    display: flex;
    align-items: center;
    justify-content: center !important;
    gap: 8px;
    /* Reduce vertical padding for parent items that have sub-menus */
    padding: 12px 20px !important;
    height: auto;
  }
  .ant-menu-submenu {
    .ant-menu-item {
      margin-bottom: 0 !important;
      padding: 20px !important;
      .ant-menu-title-content {
        padding-left: 20px !important;
      }
      svg {
        fill: #004ed1 !important;
      }
    }
    .ant-menu-sub .ant-menu-title-content {
      text-transform: none !important;
    }
    .ant-menu-submenu-arrow {
      color: #004ed1;
      font-size: 18px !important;
    }
    &-popup {
      border-radius: 0 !important;
    }
  }
`

export const CollapsedToggle = styled.button`
  position: absolute;
  background-color: #004ed1;
  color: #fff;
  top: 12px;
  width: 24px;
  height: 48px;
  right: -24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 0 8px 8px 0;
  outline: none;
  border: none;
  cursor: pointer;
`
