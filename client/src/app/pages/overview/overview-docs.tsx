import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@material-ui/icons/Close';
import {Inject} from '@wizardoc/injector';
import {withRouter, RouteComponentProps} from 'react-router-dom';
import {Category} from '@wizardoc/shared';

import {
  OverviewDocsHeader,
  OverviewDocCards,
  TransitionFab,
  CreateDocumentCard,
  Default,
  FetchData,
  FetchDataComponentProps,
} from 'src/app/components';
import {withTheme, ThemeComponentProps} from 'src/app/theme';
import {CategoryService} from 'src/app/services';

import EmptyCategory from '../../assets/static/default_categories.png';

interface RouteParams {
  id: string;
}

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  position: relative;
  background: rgb(245, 245, 245);
  padding: 20px 40px 20px 70px;
  overflow: scroll;
`;

const AddDocumentButton = styled(TransitionFab)`
  position: absolute !important;
  right: 30px;
  bottom: 50px;
`;

const DefaultView = styled.div`
  width: 100%;
  height: 70%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const EmptyCategoryImg = styled.img`
  width: 100px;
`;

const EmptyText = styled.div`
  color: ${props => props.theme.grayTextColor};
  margin-top: 10px;
`;

@FetchData(
  async (
    {extract},
    props: RouteComponentProps<RouteParams>,
  ): Promise<Category[]> => {
    return extract(CategoryService).getAllCategories(props.match.params.id);
  },
)
@withRouter
@withTheme
export class OverviewDocs extends Component<
  Partial<
    ThemeComponentProps &
      RouteComponentProps<RouteParams> &
      FetchDataComponentProps<Category[]>
  >
> {
  @Inject
  categoryService!: CategoryService;

  render(): ReactNode {
    const {theme, match, data} = this.props;
    const {secondaryColor, flatYellow, flatDark} = theme!;

    return (
      <Wrapper>
        <OverviewDocsHeader />
        <Default
          defaultView={
            <DefaultView>
              <EmptyCategoryImg src={EmptyCategory} />
              <EmptyText>暂无文档</EmptyText>
            </DefaultView>
          }
          condition={() => this.categoryService.isEmpty(match!.params.id)}
        >
          <OverviewDocCards categories={data!} />
        </Default>
        <AddDocumentButton
          icon={<AddIcon />}
          activeIcon={<CloseIcon />}
          activeFabColor={flatYellow}
          activeColor={flatDark}
          coverColor={secondaryColor}
        >
          {close => <CreateDocumentCard close={close} />}
        </AddDocumentButton>
      </Wrapper>
    );
  }
}
