import React, {Component, ReactNode} from 'react';
import styled from 'styled-components';
import {Typography, IconButton} from '@material-ui/core';
import {Inject} from '@wizardoc/injector';
import ThumbUpOutlinedIcon from '@material-ui/icons/ThumbUpOutlined';
import ThumbDownOutlinedIcon from '@material-ui/icons/ThumbDownOutlined';
import SmsOutlinedIcon from '@material-ui/icons/SmsOutlined';
import {observer} from 'mobx-react';
import {observable} from 'mobx';

import {DocumentComment, Time, CommentStatus} from 'website/services';

import {Avatar} from '../../avatar';

export interface DocumentCommentItemProps {
  commentInfo: DocumentComment;
  onUpDownClick(status: CommentStatus): void;
}

interface StyledIconButtonProps {
  isClick?: boolean;
}

const Wrapper = styled.div`
  width: 690px;
  margin-top: 18px;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 300px;
  max-width: 690px;
  width: fit-content;
  padding: 10px;
  background: ${props => props.theme.white};
  box-shadow: ${props => props.theme.flatShadow};
  border-radius: 5px;
`;

const AvatarContainer = styled.div``;

const CommentInfo = styled.div`
  width: 100%;
  margin-left: 12px;
`;

const CommentInfoHeader = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const UserName = styled(Typography)`
  font-size: 14px !important;
`;

const CommentContent = styled(Typography)`
  font-size: 15px !important;
  color: ${props => props.theme.commentColor};
  margin-top: 8px !important;
`;

const PublishTime = styled.div`
  font-size: 13px;
  color: ${props => props.theme.commentGray};
`;

const StyledIconButton = styled(IconButton)<StyledIconButtonProps>`
  width: 40px;
  height: 40px;

  svg {
    font-size: 16px !important;

    ${props => props.isClick && `color:${props.theme.primaryColor}`}
  }
`;

const Count = styled.span<StyledIconButtonProps>`
  font-size: 13px;

  ${props => props.isClick && `color:${props.theme.primaryColor}`}
`;

const CommentBody = styled.div`
  display: flex;
  align-items: flex-start;
`;

const CommentFooter = styled.div`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

@observer
export class DocumentCommentItem extends Component<DocumentCommentItemProps> {
  @Inject
  time!: Time;

  @observable
  commentStatus: CommentStatus;

  @observable
  commentInfo: DocumentComment;

  constructor(props: DocumentCommentItemProps) {
    super(props);

    this.commentInfo = props.commentInfo;
    this.commentStatus = props.commentInfo.status;
  }

  handleUpClick(): void {
    this.setIconClickStatus(CommentStatus.UP);
  }

  handleDownClick(): void {
    this.setIconClickStatus(CommentStatus.DOWN);
  }

  render(): ReactNode {
    const {
      user: {username, avatar},
      content,
      createTime,
      up,
      down,
    } = this.commentInfo;
    const parseCount = (count: number): number | boolean => !!count && count;
    const isClickUp = this.commentStatus === CommentStatus.UP;
    const isClickDown = this.commentStatus === CommentStatus.DOWN;

    return (
      <Wrapper>
        <Card>
          <CommentBody>
            <AvatarContainer>
              <Avatar lnk={avatar} displayName={username} />
            </AvatarContainer>
            <CommentInfo>
              <CommentInfoHeader>
                <UserName>{username}</UserName>
                <PublishTime>
                  {this.time.new(createTime).format('YYYY/MM/DD hh:mm:ss')}
                </PublishTime>
              </CommentInfoHeader>
              <CommentContent>{content}</CommentContent>
            </CommentInfo>
          </CommentBody>
          <CommentFooter>
            <StyledIconButton isClick={isClickUp} onClick={() => this.handleUpClick()}>
              <ThumbUpOutlinedIcon />
              <Count isClick={isClickUp}>{parseCount(up)}</Count>
            </StyledIconButton>
            <StyledIconButton
              isClick={isClickDown}
              onClick={() => this.handleDownClick()}
            >
              <ThumbDownOutlinedIcon />
              <Count isClick={isClickDown}>{parseCount(down)}</Count>
            </StyledIconButton>
            <StyledIconButton>
              <SmsOutlinedIcon />
            </StyledIconButton>
          </CommentFooter>
        </Card>
      </Wrapper>
    );
  }

  private setIconClickStatus(status: CommentStatus): void {
    switch (this.commentStatus) {
      case CommentStatus.UP:
        if (status === CommentStatus.UP) {
          this.commentStatus = CommentStatus.NONE;
          this.commentInfo.up--;
        } else {
          this.commentStatus = status;
          this.commentInfo.down++;
          this.commentInfo.up--;
        }

        break;
      case CommentStatus.DOWN:
        if (status === CommentStatus.DOWN) {
          this.commentStatus = CommentStatus.NONE;
          this.commentInfo.down--;
        } else {
          this.commentStatus = status;
          this.commentInfo.up++;
          this.commentInfo.down--;
        }

        break;
      default:
        this.commentStatus = status;

        if (status === CommentStatus.DOWN) {
          this.commentInfo.down++;
        } else {
          this.commentInfo.up++;
        }

        break;
    }

    this.props.onUpDownClick(this.commentStatus);
  }
}
