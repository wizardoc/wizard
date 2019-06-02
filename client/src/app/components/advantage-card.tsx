import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import {
  StyleRules,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';
import React, {Component, ReactNode} from 'react';

// todo 图片可配置化
import RegisterSuccess from '../assets/static/register_successful.png';

const styles = (): StyleRules =>
  createStyles({
    card: {
      width: 345,
      display: 'flex',
      flexDirection: 'column',
    },
    cardActions: {
      marginTop: 'auto',
    },
    cardImg: {
      width: 180,
      height: 180,
      display: 'block',
      margin: '0 auto',
    },
    cardTitle: {
      textAlign: 'center',
      fontSize: 18,
      color: '#1f2f3d',
      fontWeight: 400,
    },
    cardContent: {
      textAlign: 'center',
      fontSize: 14,
      color: '#99a9bf',
      padding: '0 25px',
      lineHeight: '20px',
    },
    cardBtn: {
      width: '100%',
    },
  });

export interface AdvantageCardProps extends WithStyles<typeof styles> {
  title: string;
  content: string;
}

export class TAdvantageCard extends Component<AdvantageCardProps> {
  render(): ReactNode {
    const {classes, title, content} = this.props;

    return (
      <Card className={classes.card}>
        <CardActionArea>
          <CardMedia
            className={classes.cardImg}
            image={RegisterSuccess}
            component="img"
            alt="Contemplative Reptile"
            height="140"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography
              className={classes.cardTitle}
              gutterBottom
              variant="h5"
              component="h2"
            >
              {title}
            </Typography>
            <Typography
              className={classes.cardContent}
              variant="body2"
              color="textSecondary"
              component="p"
            >
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions className={classes.cardActions}>
          <Button className={classes.cardBtn} color="primary">
            查看详情
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export const AdvantageCard = withStyles(styles)(TAdvantageCard);
