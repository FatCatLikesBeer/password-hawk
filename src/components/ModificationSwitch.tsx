import Switch from '@mui/material/Switch'
import Typography from '@mui/material/Typography'
import Stack from '@mui/material/Stack'

export default function ModificationSwitch(props) {
  const onChange = () => {
    props.setState(!props.state)
  }
  return (
    <>
      <div className="modSwitch">
        <Switch
          label={props.title}
          checked={props.state}
          onChange={onChange}
          size="large"
          name={props.name}
        />
        {props.title}
      </div>
    </>
  )
}

