import { useState } from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'

function ScoreTabs() {
  const [key, setKey] = useState('easy');

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="easy" title="Easy">
        tab 1
      </Tab>
      <Tab eventKey="med" title="Medium">
        tab 2
      </Tab>
      <Tab eventKey="hard" title="Hard">
        tab 3
      </Tab>
    </Tabs>
  );
}

export default ScoreTabs