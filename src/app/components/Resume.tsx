export default function Resume() {

    //display resume from /public/Dylan_Kotzer.pdf



    return (
      <div style={{ width: '100%', height: '100%' }}>
        <object
          data='/dylan_kotzer.pdf'
          type='application/pdf'
          width='100%'
          height='100%'
          aria-labelledby='PDF document'
          title='Embedded PDF Viewer'
          
        >
          <p>
            Your browser does not support PDFs.
            <a href='/dylan_kotzer.pdf'>Download the PDF</a>
          </p>
        </object>
      </div>
    )

}