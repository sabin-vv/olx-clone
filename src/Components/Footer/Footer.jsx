import "./footer.css"

export default function Footer() {
    return (
        <div className="footer-wrapper">
            <div className="footer-top">
                <section className="footer-column">
                    <h4>Popular Locations</h4>
                    <ul>
                        <li><a href="/kolkata_g4157275">Kolkata</a></li>
                        <li><a href="/mumbai_g4058997">Mumbai</a></li>
                        <li><a href="/chennai_g4059162">Chennai</a></li>
                        <li><a href="/pune_g4059014">Pune</a></li>
                    </ul>
                </section>

                <section className="footer-column">
                    <h4>Trending Locations</h4>
                    <ul>
                        <li><a href="/bhubaneshwar_g4059049">Bhubaneshwar</a></li>
                        <li><a href="/hyderabad_g4058526">Hyderabad</a></li>
                        <li><a href="/chandigarh_g4058651">Chandigarh</a></li>
                        <li><a href="/nashik_g4059002">Nashik</a></li>
                    </ul>
                </section>

                <section className="footer-column">
                    <h4>About Us</h4>
                    <ul>
                        <li><a href="https://tech.olx.in/" target="_blank">Tech@OLX</a></li>
                        <li><a href="https://careers.olx.in/" target="_blank">Careers</a></li>
                    </ul>
                </section>

                <section className="footer-column">
                    <h4>OLX</h4>
                    <ul>
                        <li><a href="https://www.olx.in/blog" target="_blank">Blog</a></li>
                        <li><a href="https://help.olx.in/hc/en-us" target="_blank">Help</a></li>
                        <li><a href="/sitemap/most-popular">Sitemap</a></li>
                        <li><a href="https://help.olx.in/hc/en-us/categories/10781706981149-Legal-Privacy-information" target="_blank">Legal & Privacy information</a></li>
                        <li><a href="https://bugbase.ai/programs/olx" target="_blank">Vulnerability Disclosure Program</a></li>
                    </ul>
                </section>
                <div className="footer-bottom">
                    <div className="follow-section">
                        <span>Follow Us</span>
                        <div className="social-icons">
                            <a href="https://www.facebook.com/olxindia/" target="_blank"><img src="https://apollo.olx.in/v1/files/alias-facebook-icon/image;original=true" /></a>
                            <a href="https://www.instagram.com/olx_india/?hl=en" target="_blank"><img src="https://apollo.olx.in/v1/files/alias-instagram-icon/image;original=true" /></a>
                            <a href="https://www.youtube.com/@olx_india" target="_blank"><img src="https://apollo.olx.in/v1/files/alias-youtube-icon/image;original=true" /></a>
                            <a href="https://x.com/OLX_India" target="_blank"><img src="https://apollo.olx.in/v1/files/alias-twitter-icon/image;original=true" /></a>
                            <a href="" target="_blank"><img src="https://apollo.olx.in/v1/files/alias-whatsapp-icon/image;original=true" /></a>
                            <a href="https://www.linkedin.com/company/olxindia/" target="_blank"><img src="https://apollo.olx.in/v1/files/alias-linkedin-icon/image;original=true" /></a>
                        </div>
                    </div>

                    <div className="app-section">
                        <a href="https://play.google.com/store/apps/details?id=com.olx.southasia" target="_blank">
                            <img src="https://statics.olx.in/external/base/img//playstore_3x.png" alt="Playstore" />
                        </a>
                        <a href="https://itunes.apple.com/in/app/olx-buy-sell-near-you/id913492792?mt=8" target="_blank">
                            <img src="https://statics.olx.in/external/base/img//appstore_3x.png" alt="Appstore" />
                        </a>
                    </div>
                </div>
            </div>


        </div>
    )
};
