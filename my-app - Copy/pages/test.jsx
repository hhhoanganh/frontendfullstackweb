import React, { useState } from 'react';

const MyWindow = () => {
  const [show, setShow] = useState(false);

  return (
    <>
      <button onClick={() => setShow(true)}>Hiện cửa sổ</button>
      {show && (
        <div
          onClick={() => setShow(false)}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0,0,0,0.5)',
          }}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '18%',
              height: 100,
              backgroundColor: 'lightblue',
              borderRadius: 10,
              marginTop: 35
            }}
          >
            <div className="author" style={{float: 'left'}}>
              <a href="#">
                <img style={{borderRadius: 20, width: '20%', height: '20%'}}
                  className="avatar border-gray"
                  src="../assets/img/mike.jpg"
                  alt="..."
                />
              </a>
              
            </div>
            <div style={{float: 'left'}}>
            <button className='btn'>Logout</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MyWindow;
