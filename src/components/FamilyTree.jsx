// FamilyTree.js
import React, { useState } from 'react';


const Person = ({ name, children }) => {
  return (
    <div style={{ border: '1px solid black', padding: '10px', margin: '10px', display: 'inline-block' }}>
      <p>{name}</p>
      <div style={{ display: 'flex' }}>
        {children}
      </div>
    </div>
  );
};

const FamilyTree = () => {
  const [family, setFamily] = useState([
    { name: '親1', children: [] },
    { name: '親2', children: [] },
  ]);

  const handleMarriage = () => {
    setFamily(prevFamily => [
      ...prevFamily,
      { name: `新親${prevFamily.length + 1}`, children: [] },
    ]);
  };

  const handleBirth = (parentIndex) => {
    setFamily(prevFamily => {
      const newChild = { name: `子${prevFamily[parentIndex].children.length + 1}`, children: [] };
      const updatedFamily = [...prevFamily];
      updatedFamily[parentIndex].children.push(newChild);
      return updatedFamily;
    });
  };

  const renderFamily = (members, parentIndex) => {
    return members.map((member, index) => (
      <React.Fragment key={index}>
        <Person name={member.name}>
          {member.children.length > 0 && renderFamily(member.children, index)}
        </Person>
        <button onClick={() => handleBirth(parentIndex)}>出産</button>
      </React.Fragment>
    ));
  };

  return (
    <div>
      <h2>家系図</h2>
      <div style={{ display: 'flex' }}>
        {family.map((parent, index) => (
          <div key={index}>
            <Person name={parent.name}>
              {parent.children.length > 0 && renderFamily(parent.children, index)}
            </Person>
            {index < family.length - 1 && <button onClick={handleMarriage}>結婚</button>}
            {index < family.length - 1 && <button onClick={() => handleBirth(index)}>出産</button>}
          </div>
        ))}
      </div>
    </div>
  );
};



export default FamilyTree;
