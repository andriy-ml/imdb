import { Avatar, Card, CardContent, CardHeader, CardMedia, makeStyles, Typography } from "@material-ui/core";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  card: {
    width: 345,
    margin: 20
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  noImage: {
    height: 0,
    paddingTop: '56.25%', // 16:9
    background: 'gray'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function(props): JSX.Element | null {
  const classes = useStyles();

  return (props.movies || []).map((movie, index) => (<Card  key={'card' + index} className={classes.card}>
    <CardHeader
      avatar={
        <Avatar
          aria-label="recipe"
          className={classes.avatar}>
          {movie.Title[0]}
        </Avatar>
      }
      title={movie.Title}
    />
    {
      !!movie.Poster && movie.Poster !== "N/A" ?
      <CardMedia
        className={classes.media}
        key={'img' + index}
        image={movie.Poster}
        title={movie.Title}
      /> : <div className={classes.noImage}/>
    }
    <CardContent>
      <Typography
        variant="body2"
        color="textSecondary"
        component="p">
          Year: {movie.Year}
      </Typography>
    </CardContent>
  </Card>) );
}
