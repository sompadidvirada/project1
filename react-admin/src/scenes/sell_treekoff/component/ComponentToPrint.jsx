// ComponentToPrint.jsx
import React from 'react';

// Use forwardRef to allow ref from parent
const ComponentToPrint = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ padding: 20 }}>
    <h1>Invoice #{props.invoiceId}</h1>
    <p>Customer: {props.customerName}</p>
    <p>Total: ${props.total}</p>
  </div>
));

export default ComponentToPrint;
