import Styled from 'styled-components';

export const StyleTransfer = Styled.div`
  .ant-btn-primary {
    background-color:  ${({ isDark }) => (isDark ? '#282828' : '#a9a9a9')};
    color:  ${({ isDark }) => (isDark ? '#FFF' : '#FFF')};
  }
  .ant-transfer-list-body {
    //background-color:  ${({ isDark }) => (isDark ? '#FFF' : '#000000')};
    color:  ${({ isDark }) => (isDark ? '#000' : '#FFF')};
  }
  .ant-transfer-list-content-item-text {
    color:  ${({ isDark }) => (isDark ? '#FFF' : '#000')};
  }
  .ant-transfer-list-header  {
    color:  ${({ isDark }) => (isDark ? '#FFF' : '#000')};
    background:  ${({ isDark }) => (isDark ? '#282828' : '#FFF')};
  }
  .ant-pagination-simple-pager {
    color:  ${({ isDark }) => (isDark ? '#FFF' : '#000')};
  }
  .ant-pagination.ant-pagination-simple .ant-pagination-simple-pager input {
    background-color:  ${({ isDark }) => (isDark ? '#282828' : '#fff')};
  }
  span.anticon.anticon-left {
    color:  ${({ isDark }) => (isDark ? '#fff' : '#282828')};
  }
  span.anticon.anticon-right {
    color:  ${({ isDark }) => (isDark ? '#fff' : '#282828')};
  }
`;
