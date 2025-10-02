import './style.css'

document.querySelector('#app').innerHTML = `
  <div class="container">
    <h1>Certificate Generator</h1>

    <div class="form-container">
      <form id="certificate-form">
        <div class="form-group">
          <label for="recipientName">Recipient Name</label>
          <input type="text" id="recipientName" required placeholder="Enter recipient name">
        </div>

        <div class="form-group">
          <label for="participantCollege">Participant College</label>
          <input type="text" id="participantCollege" required placeholder="Enter participant's college">
        </div>

        <div class="form-group">
          <label for="course">Course / Achievement</label>
          <input type="text" id="course" required placeholder="Enter course or achievement">
        </div>

        <div class="form-group">
          <label for="date">Date</label>
          <input type="date" id="date" required>
        </div>

        <div class="form-group">
          <label for="organization">Organizing College / Institution</label>
          <input type="text" id="organization" required placeholder="Enter organizing college">
        </div>

        <div class="form-group">
          <label for="instructor">Instructor / Authority</label>
          <input type="text" id="instructor" required placeholder="Enter instructor or authority name">
        </div>

        <button type="submit" class="btn-generate">Generate Certificate</button>
      </form>
    </div>

    <div id="certificate-preview" class="certificate-preview hidden">
      <h2>Certificate Preview</h2>
      <div id="certificate" class="certificate">
        <div class="certificate-border">
          <div class="gold-corner-tl"></div>
          <div class="gold-corner-tr"></div>
          <div class="gold-corner-bl"></div>
          <div class="gold-corner-br"></div>

          <div class="certificate-content">
            <div class="certificate-header">
              <h3 class="organization-name" id="cert-org"></h3>
              <h1 class="certificate-title">Certificate</h1>
              <p class="certificate-subtitle">OF ACHIEVEMENT</p>
            </div>

            <div class="certificate-body">
              <p class="certificate-text">This is to certify that</p>
              <h2 class="recipient-name" id="cert-recipient"></h2>
              <p class="participant-college" id="cert-participant-college"></p>

              <p class="certificate-text">has successfully completed</p>
              <h3 class="course-name" id="cert-course"></h3>

              <div class="badge-container">
                <svg class="gold-badge" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="50" cy="50" r="45" fill="#d4af37" stroke="#b8941f" stroke-width="2"/>
                  <circle cx="50" cy="50" r="38" fill="#f4e5a1" stroke="#d4af37" stroke-width="2"/>
                  <circle cx="50" cy="50" r="30" fill="#d4af37" stroke="#b8941f" stroke-width="1"/>
                  <path d="M50 25 L55 40 L70 42 L60 52 L62 67 L50 60 L38 67 L40 52 L30 42 L45 40 Z" fill="#b8941f"/>
                </svg>
              </div>

              <div class="certificate-footer">
                <div class="footer-left">
                  <div class="signature-line"></div>
                  <p class="footer-date" id="cert-date"></p>
                  <p class="footer-label">DATE</p>
                </div>
                <div class="footer-right">
                  <div class="signature-line"></div>
                  <p class="footer-instructor" id="cert-instructor"></p>
                  <p class="footer-label">INSTRUCTOR</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button id="download-btn" class="btn-download">Download Certificate</button>
      <button id="reset-btn" class="btn-reset">Create Another</button>
    </div>
  </div>
`

const form = document.getElementById('certificate-form')
const certificatePreview = document.getElementById('certificate-preview')
const downloadBtn = document.getElementById('download-btn')
const resetBtn = document.getElementById('reset-btn')

form.addEventListener('submit', (e) => {
  e.preventDefault()

  const recipientName = document.getElementById('recipientName').value
  const participantCollege = document.getElementById('participantCollege').value
  const course = document.getElementById('course').value
  const date = document.getElementById('date').value
  const organization = document.getElementById('organization').value
  const instructor = document.getElementById('instructor').value

  const formattedDate = new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  document.getElementById('cert-recipient').textContent = recipientName
  document.getElementById('cert-participant-college').textContent = participantCollege
  document.getElementById('cert-course').textContent = course
  document.getElementById('cert-date').textContent = formattedDate
  document.getElementById('cert-org').textContent = organization
  document.getElementById('cert-instructor').textContent = instructor

  certificatePreview.classList.remove('hidden')
  certificatePreview.scrollIntoView({ behavior: 'smooth' })
})

downloadBtn.addEventListener('click', async () => {
  const certificate = document.getElementById('certificate')

  try {
    const canvas = await html2canvas(certificate, {
      scale: 2,
      backgroundColor: '#ffffff',
      logging: false
    })

    const link = document.createElement('a')
    link.download = 'certificate.png'
    link.href = canvas.toDataURL('image/png')
    link.click()
  } catch (error) {
    console.error('Error generating certificate:', error)
    alert('Error generating certificate. Please try again.')
  }
})

resetBtn.addEventListener('click', () => {
  form.reset()
  certificatePreview.classList.add('hidden')
  window.scrollTo({ top: 0, behavior: 'smooth' })
})

const script = document.createElement('script')
script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2canvas/1.4.1/html2canvas.min.js'
document.head.appendChild(script)
