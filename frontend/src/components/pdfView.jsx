import { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';

// Direct our PDF companion to the local haven in /public
pdfjs.GlobalWorkerOptions.workerSrc = '/pdf.worker.min.js';

export default function PdfViewer() {
  const [pdfFile, setPdfFile] = useState(null);
  const [numPages, setNumPages] = useState(null);
  const [text, setText] = useState('');

  const onFileChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === 'application/pdf') {
      setPdfFile(file);
    } else {
      setPdfFile(null);
      alert('Please select a PDF file.');
    }
  };

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ display: 'flex', height: '100vh', fontFamily: 'Georgia, serif' }}>
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', background: '#f9f9f9', borderRight: '1px solid #ccc' }}>
        {pdfFile ? (
          <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        ) : (
          <div style={{ textAlign: 'center', marginTop: '40%' }}>
            <p style={{ color: '#555', fontSize: '1.2rem' }}>Upload a PDF to see it unfold...</p>
          </div>
        )}
        <div style={{ textAlign: 'center', marginTop: '1rem' }}>
          <input type="file" onChange={onFileChange} accept="application/pdf" />
        </div>
      </div>

      <div style={{ flex: 1, padding: '1rem', background: '#fff' }}>
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          style={{
            width: '100%',
            height: '100%',
            resize: 'none',
            border: '1px solid #ccc',
            padding: '1rem',
            fontSize: '1rem',
            fontFamily: 'inherit',
            backgroundColor: '#fafafa'
          }}
          placeholder="Let your words dance upon this page..."
        />
      </div>
    </div>
  );
}
