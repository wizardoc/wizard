import React, {Component, ReactNode, createRef} from 'react';
import styled from 'styled-components';
import {TextField} from '@material-ui/core';
import {observable} from 'mobx';
import {observer} from 'mobx-react';
import {Inject} from '@wizardoc/injector';

import {
  DialogComponentProps,
  ActionDialog,
  ParsedActionButtons,
  MessageService,
  SendMessagePayload,
  Toast,
} from 'src/app/services';
import {FormControl, Rules} from 'src/app/ui';

interface WordsCountProps {
  overflow: boolean;
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 450px;
  margin-top: -10px;
`;

const StyledTextField = styled(TextField)`
  margin-top: 20px !important;
`;

const StyledBody = styled.textarea`
  border-radius: 5px;
  height: 200px;
  margin: 20px 0 5px 0;
  border-color: ${props => props.theme.deepGray};
  padding: 10px;
  font-size: 15px;
  outline: none;
`;

const WordsCount = styled.div<WordsCountProps>`
  width: 100%;
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
  font-size: 14px;

  color: ${props =>
    props.overflow ? props.theme.errorRed : props.theme.black};
`;

const MAX_MESSAGE_BODY = 500;
const DYING_WORDS = 10;

const messageSenderFormRules: Rules = {
  to: {required: true, errMsg: '收信人不能为空'},
  body: {required: true, errMsg: '信息主体不能为空'},
  title: {required: true, errMsg: '标题不能为空'},
};

@observer
export class SendMessageDialog extends Component<DialogComponentProps>
  implements ActionDialog {
  @Inject
  private messageService!: MessageService;

  @Inject
  private toast!: Toast;

  @observable
  private currentWords = 0;

  private formControlRef = createRef<FormControl>();

  formData: SendMessagePayload | undefined;

  actionButtons(): ParsedActionButtons[] {
    return [
      {
        text: '发送',
        cb: async () => {
          if (!this.formControlRef.current?.validate()) {
            return;
          }

          const result = await this.messageService.newMessage(this.formData!);

          result
            .success(() => {
              this.toast.success('发送成功！');
              this.props.close();
            })
            .expect(() => {});
        },
        props: {color: 'primary'},
      },
    ];
  }

  handleMessageBodyChange(val: string): void {
    this.currentWords = val.length;
  }

  handleFormDataChange(data: SendMessagePayload): void {
    this.formData = data;
  }

  get remainWords(): number {
    return MAX_MESSAGE_BODY - this.currentWords;
  }

  render(): ReactNode {
    return (
      <Wrapper>
        <FormControl
          ref={this.formControlRef}
          rules={messageSenderFormRules}
          onFormDataChange={data => this.handleFormDataChange(data)}
        >
          <StyledTextField
            name="to"
            label="收信人"
            InputLabelProps={{
              shrink: true,
            }}
          />
          <StyledTextField
            name="title"
            label="标题"
            inputProps={{
              maxLength: 20,
            }}
            InputLabelProps={{
              shrink: true,
            }}
          />
          <StyledBody
            name="body"
            onChange={val =>
              this.handleMessageBodyChange((val as unknown) as string)
            }
            maxLength={MAX_MESSAGE_BODY}
            placeholder="消息内容，500 字以内"
          />
        </FormControl>
        <WordsCount overflow={this.remainWords <= DYING_WORDS}>
          剩余字数：{this.remainWords}
        </WordsCount>
      </Wrapper>
    );
  }
}
