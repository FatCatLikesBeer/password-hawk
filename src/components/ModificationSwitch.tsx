import Switch from '@mui/material/Switch'

export default function ModificationSwitch(props: any) {
  const onChange = () => {
    props.setState(!props.state)
  }
  return (
    <>
      <div className="modSwitch">
        <Switch
          checked={props.state}
          onChange={onChange}
          name={props.name}
        />
        {props.title}
      </div>
    </>
  )
}

