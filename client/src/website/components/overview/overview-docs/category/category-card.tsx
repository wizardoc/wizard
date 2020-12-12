import React, {Component, ReactNode} from 'react';
import {Category} from '@wizardoc/shared';
import styled from 'styled-components';
import {
  Card,
  CardMedia,
  CardActionArea,
  CardActions,
  Button,
  CardContent,
  Typography,
} from '@material-ui/core';
import {observer} from 'mobx-react';

import {Popover} from 'website/ui';

import {CategoryInfo} from './@category-info';

export interface CategoryCardProps {
  info: Category;
}

const Wrapper = styled(Card)`
  width: 250px !important;
`;

const Cover = styled(CardMedia)`
  height: 140px;
  overflow: hidden !important;
  background: ${props => props.theme.flatGray};
`;

const StyledCardActions = styled(CardActions)`
  display: flex;
  justify-content: space-between;
`;

@observer
export class CategoryCard extends Component<CategoryCardProps> {
  render(): ReactNode {
    const {info} = this.props;
    const {name, cover, description} = info;

    return (
      <Popover
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        trigger="hover"
        bind={
          <Wrapper>
            <CardActionArea>
              <Cover image={cover} title={name}>
                {/* <CoverImg src={cover}></CoverImg> */}
              </Cover>
              <CardContent>
                <Typography variant="h5" component="h2">
                  {name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {description}
                </Typography>
              </CardContent>
            </CardActionArea>
            <StyledCardActions>
              <div>
                <Button size="small" color="primary">
                  删除
                </Button>
                <Button size="small" color="primary">
                  编辑
                </Button>
              </div>
            </StyledCardActions>
          </Wrapper>
        }
      >
        <CategoryInfo info={info}></CategoryInfo>
      </Popover>
    );
  }
}
