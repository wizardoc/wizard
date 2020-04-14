import React, {ReactNode, Component} from 'react';
import styled from 'styled-components';
import {observable} from 'mobx';
import {observer} from 'mobx-react';

import {OverviewSide, View, OrganizationPanel} from '../components';

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
`;

type Overviews = {
  [name in View]?: ReactNode;
};

@observer
export class OverviewPage extends Component {
  @observable
  currentView: View = 'organization';

  overviews: Overviews = {
    organization: <OrganizationPanel />,
  };

  render(): ReactNode {
    const ViewPanel = this.overviews[this.currentView];

    return (
      <Wrapper>
        <OverviewSide onItemClick={(view: View) => (this.currentView = view)} />
        {ViewPanel}
      </Wrapper>
    );
  }
}
