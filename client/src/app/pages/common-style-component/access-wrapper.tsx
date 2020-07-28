import styled from 'styled-components';

export const Wrapper = styled.div`
  height: calc(100vh - ${props => props.theme.headerBarHeight});
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #eceff1;
`;

export const AccessBox = styled.div`
  width: 500px;
  height: 100%;
  background: #fff;
  border-radius: 0 10px 10px 0;
`;
