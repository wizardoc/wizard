import React, {ReactNode, Component} from 'react';
import {
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
} from '@material-ui/core';
import {
  StyleRules,
  WithStyles,
  createStyles,
  withStyles,
} from '@material-ui/core/styles';

const styles = (): StyleRules =>
  createStyles({
    card: {
      minWidth: 345,
      display: 'inline-block',
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
            component="img"
            alt="Contemplative Reptile"
            height="140"
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {title}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              {content}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button color="primary">查看详情</Button>
        </CardActions>
      </Card>
    );
  }
}

export const AdvantageCard = withStyles(styles)(TAdvantageCard);
