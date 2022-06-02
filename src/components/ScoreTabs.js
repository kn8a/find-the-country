import { useState } from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import Table from 'react-bootstrap/Table'

function ScoreTabs(props) {
  const [key, setKey] = useState('all');
  console.log('these are scores',props.scores)

  return (
    <Tabs
      id="controlled-tab"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mb-3"
    >
      <Tab eventKey="all" title="All levels">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Errors</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
        {props.scores.map((score) => {
              return( 
                <tr>
                  <td>{score.name}</td>
                  <td>{score.time}</td>
                  <td>{score.errors}</td>
                  <td>{score.level}</td>
                </tr>
              )
          })}
        </tbody>
      </Table>
      </Tab>
      <Tab eventKey="easy" title="Easy">
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Time</th>
            <th>Errors</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
        {props.scores.map((score) => {
            if (score.level == 'easy'){
              return( 
                <tr>
                  <td>{score.name}</td>
                  <td>{score.time}</td>
                  <td>{score.errors}</td>
                  <td>{score.level}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </Table>
      </Tab>
      <Tab eventKey="med" title="Medium">
      <Table striped bordered hover>
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Time</th>
            <th>Errors</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
        {props.scores.map((score) => {
            if (score.level == 'med'){
              return( 
                <tr>
                  <td>{score.name}</td>
                  <td>{score.time}</td>
                  <td>{score.errors}</td>
                  <td>{score.level}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </Table>
      </Tab>
      <Tab eventKey="hard" title="Hard">
      <Table striped bordered hover>
        <thead>
          <tr>
            
            <th>Name</th>
            <th>Time</th>
            <th>Errors</th>
            <th>Level</th>
          </tr>
        </thead>
        <tbody>
        {props.scores.map((score) => {
            if (score.level == 'hard'){
              return( 
                <tr>
                  <td>{score.name}</td>
                  <td>{score.time}</td>
                  <td>{score.errors}</td>
                  <td>{score.level}</td>
                </tr>
              )
            }
          })}
        </tbody>
      </Table>
      </Tab>
    </Tabs>
  );
}

export default ScoreTabs