
class CustomHeader extends HTMLElement{
  constructor()
  {
    super();
    const shadow = this.attachShadow({ mode: 'open'});

    const style = document.createElement("style");
    style.textContent = `
    h2
     {
      font-weight:normal;
      letter-spacing:2px;
      color:var(--primary-color);
    }
    `;
    let template = document.createElement("template");
    template.innerHTML = `
    <header>
            <div class="main-title">
                <a href="./index.html">
                    <img src="./images/logo.png"/>
                </a>
            </div>
            <nav>
                    <a href="./index.html">HOME</a>
                    <a href="./about.html">ABOUT</a>
                    <div class="dropdown">
                        <a class="dropbtn">PORTFOLIO 
                          <i class="fa fa-caret-down"></i>
                        </a>
                        <div class="dropdown-content">
                          <a href="./baby.html">BABY APPAREL</a>
                          <a href="./kidswear.html">KIDS APPAREL</a>
                          <a href="./outerwear.html">OUTERWEAR AND OCCASION</a>
                          <a href="./swimwear.html">KIDS SWIMWEAR</a>
                          <a href="./womenswear.html">WOMENS OUTERWEAR</a>
                          <a href="./menswear.html">MENSWEAR & MENS OUTERWEAR</a>
                        </div>
                      </div>
                    <a href="./testimonials.html">TESTIMONIALS</a>
                    <a href="./contact.html">CONTACT</a>
            </nav>
        </header>
    `;

    var script = document.createElement('script');
    script.textContent = `
    
    `;

    shadow.appendChild(template.content.cloneNode(true));
    shadow.appendChild(style);

    shadow.getElementById('title').innerText = this.getAttribute('title');

    shadow.appendChild(script);
  }

}

window.customElements.define('custom-header', CustomHeader);

