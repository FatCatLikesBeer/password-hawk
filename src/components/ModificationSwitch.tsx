import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default function ModificationSwitch(props) {
  const onChange = () => {
    props.setState(!props.state)
  }
  return (
    <>
      <Stack direction="row" spacing={1} alignItems="center">
        <Switch
          label={props.title}
          checked={props.state}
          onChange={onChange}
          size="large"
        />
        <Typography>{props.title}</Typography>
      </Stack>
    </>
  )
}


