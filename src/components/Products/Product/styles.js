import { makeStyles } from '@material-ui/core/styles'

export default makeStyles(() => ({
  root: {
    maxWidth: '100%',
    border: '1px solid #902df0',
    boxShadow: '6px 6px 5px 0px rgba(0,0,0,0.1)',
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  cardContent: {
    display: 'flex',
    justifyContent: 'space-between',
  },
}))
