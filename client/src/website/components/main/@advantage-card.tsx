import {StyleRules, WithStyles, createStyles, withStyles} from '@material-ui/core/styles';
import React, {Component, ReactNode} from 'react';

const styles = (): StyleRules =>
  createStyles({
    card: {
      width: 345,
      display: 'flex',
      flexDirection: 'column',
    },
    img: {
      width: 50,
      height: 50,
      display: 'block',
      margin: '0 auto',
    },
    title: {
      fontSize: 16,
      lineHeight: '30px',
      color: '#333',
      opacity: 0.8,
      textAlign: 'center',
      marginTop: 15,
      marginBottom: 0,
    },
    content: {
      color: '#999',
      fontSize: 12,
      lineHeight: '26px',
      textAlign: 'center',
      marginTop: 10,
      marginBottom: 0,
      padding: '0 20px',
    },
  });

export interface AdvantageCardProps extends WithStyles<typeof styles> {
  title: string;
  content: string;
  img: string;
}

export class TAdvantageCard extends Component<AdvantageCardProps> {
  render(): ReactNode {
    const {classes, title, content, img} = this.props;

    return (
      <div className={classes.card}>
        <img className={classes.img} src={img} />
        <p className={classes.title}>{title}</p>
        <p className={classes.content}>{content}</p>
      </div>
    );
  }
}

export const AdvantageCard = withStyles(styles)(TAdvantageCard);
