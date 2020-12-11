import React, {Component, ReactNode} from 'react';
import {Tabs, Tab} from '@material-ui/core';
import {withRouter, RouteComponentProps} from 'react-router-dom';

interface WizardTabProps {
  tabs: WizardTabConfig[];
  baseLineColor?: string;
  onTabChange?(config: WizardTabConfig): void;
}

export interface WizardTabConfig {
  text: string;
  route?: string;
  query?: string;
  /**
   * tab 切换的通常动作是切换一个路由，设置 isNewPage 以改变是否往 history 里 push 一个
   * 新的历史
   */
  isNewPage?: boolean;
}

/**
 * Tab 组件 base on @material-ui/tab
 * 用于渲染一组 tab，所有 tab 的跳转通常为改变 route 来变更页面，由于现有的 router 是
 * 扁平的（see src/services/route），因此跳转局部 tab 应当用 query 进行路由状态保持
 * @author Younccat
 */
@withRouter
export class WizardTab extends Component<
  WizardTabProps & Partial<RouteComponentProps>
> {
  currentTabIndex: number = 0;

  render(): ReactNode {
    const {baseLineColor = 'primary', tabs} = this.props;
    const parsedTabs = tabs.map(tab => <Tab key={tab.text} label={tab.text} />);

    return (
      <Tabs
        {...this.props}
        value={this.currentTabIndex}
        indicatorColor={baseLineColor as any}
        textColor={baseLineColor as any}
        onChange={(_, index) => this.handleTabChange(index)}
      >
        {parsedTabs}
      </Tabs>
    );
  }

  handleTabChange(index: number): void {
    const {onTabChange = (): void => {}, tabs} = this.props;
    const config = tabs[index];

    this.currentTabIndex = index;
    this.parseTabClickHandler(config);
    onTabChange(config);
  }

  parseTabClickHandler({route, query, isNewPage}: WizardTabConfig): void {
    const {history} = this.props;
    const {push, replace} = history!;

    if (route) {
      const jumper = isNewPage ? push : replace;

      return jumper(route);
    }

    if (query) {
      push({
        search: `tab=${query}`,
      });
    }
  }
}
