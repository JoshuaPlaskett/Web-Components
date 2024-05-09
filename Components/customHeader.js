
class CustomHeader extends HTMLElement{
  static observedAttributes = ["logo","nav-items"];
  constructor()
  {
    super();
    const shadow = this.attachShadow({ mode: 'open'});

    const style = document.createElement("style");
    style.textContent = `
    @import url( '../base.css' )
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
        <div class="main-title" id="main-title">
            <a href="./index.html">
                <img id='logo' src="./images/logo.svg"/>
            </a>
        </div>
        <nav id='nav-menu'>
        </nav>
      </header>
    `;

    var script = document.createElement('script');
    script.textContent = `
    
    `;

    let lnk = document.createElement("link");
    lnk.rel = "stylesheet";
    lnk.href = "../base.css";

    shadow.appendChild(template.content.cloneNode(true));
    shadow.appendChild(lnk);
    shadow.appendChild(style);

   // if(this.getAttribute('title') !== "")
    let title = document.createElement("h1");
    title.innerText = this.getAttribute('title');
    shadow.querySelector('#main-title').appendChild(title);
    shadow.querySelector('#logo').src = this.getAttribute('logo');
    let navigation = this.getAttribute('nav-items');
    navigation = JSON.parse(navigation);
    var navMenu = shadow.querySelector('#nav-menu');
    for(var i = 0; i < navigation.length; i++)
    {
      console.log(navigation[i]);
      let navItemHTML = "";
      if(false) //value.length > 0)
      {
        navItemHTML = `<div class="dropdown">
        <a class="dropbtn">PORTFOLIO 
          <i class="fa fa-caret-down"></i>
        </a>
        <div class="dropdown-content">`;
        value.forEach(subElement => {
          navItemHTML += `<a href="` + subElement.link + `">` + subElement.text + `</a>`
        })
        navItemHTML += `</div></div>`
      }
      else
      {
        navItemHTML += `<a href="` + navigation[i].link + `">` + navigation[i].text + `</a>`
      }
      navMenu.innerHTML += navItemHTML;
    };

    shadow.appendChild(script);
  }

}
/**
 * 
 */
window.customElements.define('custom-header', CustomHeader);

