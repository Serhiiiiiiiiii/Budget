import { DropdownButton } from "react-bootstrap";
import DropdownItem from "react-bootstrap/esm/DropdownItem";

function SelectYear({uniqueDates, setYear, year}) {

  let uniqueDatesjsx = uniqueDates.map(item => {
    return (
      <DropdownItem eventKey={item} key={item}>{item}</DropdownItem>
    )
  })

  return (
    <div>
      <DropdownButton id="dropdown-basic-button" title={year} onSelect={(eventKey)=>setYear(eventKey)}>
        {uniqueDatesjsx}
      </DropdownButton>
    </div>
  );
}

export default SelectYear;
