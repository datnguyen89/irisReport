import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { Document, Page } from 'react-pdf'
import { pdfjs } from 'react-pdf'
import { PaginationPdf, PdfCustomViewerWrapper } from './PdfCustomViewerStyled'
import { LeftOutlined, RightOutlined } from '@ant-design/icons'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`


const PdfCustomViewer = props => {
  // region props, hook, state =================
  const { url } = props

  const [numPages, setNumPages] = useState(null)
  const [pageNumber, setPageNumber] = useState(1)
  // endregion
  // region destructuring ======================

  // endregion
  // region variable ===========================

  // endregion
  // region function handle logic ==============
  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  // endregion
  // region function render ====================

  // endregion
  // region side effect ========================

  // endregion
  return (
    <PdfCustomViewerWrapper>
      <Document
        file={url}
        onLoadSuccess={onDocumentLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>
      <PaginationPdf>
        <LeftOutlined
          style={{ cursor: 'pointer' }}
          onClick={() => setPageNumber(old => old > 1 ? old - 1 : 1)}
        />
        <span>{pageNumber}/{numPages}</span>
        <RightOutlined
          style={{ cursor: 'pointer' }}
          onClick={() => setPageNumber(old => old < numPages ? old + 1 : numPages)}
        />
      </PaginationPdf>
    </PdfCustomViewerWrapper>
  )
}

PdfCustomViewer.propTypes = {
  url: PropTypes.string.isRequired,
}

export default PdfCustomViewer