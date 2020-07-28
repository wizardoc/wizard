import styled from 'styled-components';

export const SettingTitle = styled.div`
  font-size: 35px;
  color: ${props => props.theme.titleGray};
`;

export const SettingSubTitle = styled(SettingTitle)`
  font-size: 22px;
  color: ${props => props.theme.titleGray};
`;
