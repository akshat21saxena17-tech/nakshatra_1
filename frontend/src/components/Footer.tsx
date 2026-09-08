export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div className="footer-brand">
          <span className="footer-logo">NAKSHATRA-X</span>
          <p className="footer-tagline">
            AI + satellite intelligence for manganese mapping.
          </p>
        </div>

        <div className="footer-links">
          <div className="footer-col">
            <h4>Product</h4>
            <a href="#">Reserve Mapping</a>
            <a href="#">Production Planning</a>
            <a href="#">Documentation</a>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <a href="#">About</a>
            <a href="#">Research</a>
            <a href="#">Careers</a>
          </div>
          <div className="footer-col">
            <h4>Connect</h4>
            <a href="#">Twitter</a>
            <a href="#">GitHub</a>
            <a href="#">Discord</a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <span>&copy; 2026 NAKSHATRA-X. All rights reserved.</span>
      </div>
    </footer>
  )
}
