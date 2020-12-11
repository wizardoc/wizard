import {Component} from 'react';
import {withRouter, RouteComponentProps} from 'react-router-dom';

export interface ViewPanelProps {
  isClick: boolean;
}

@withRouter
export class ViewPanel extends Component<
  RouteComponentProps & ViewPanelProps
> {}
