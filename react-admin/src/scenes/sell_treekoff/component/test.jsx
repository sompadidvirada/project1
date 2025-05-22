import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import ComponentToPrint from './ComponentToPrint';

const Apps = () => {
  const componentRef = useRef();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: 'Invoice_Print',
  });


  return (
    <div>
      <ComponentToPrint
        ref={componentRef}
        invoiceId="1001"
        customerName="John Doe"
        total="123.45"
      />
      <button onClick={handlePrint}>Print Invoice</button>
    </div>
  );
};

export default Apps;
