
class ExtendableTemplate extends HTMLElement{
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
    <div>
      <h2 id="title"></h2>
    </div>
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

    shadow.getElementById('title').innerText = this.getAttribute('title');

    shadow.appendChild(script);
  }

}

window.customElements.define('extendable-template', ExtendableTemplate);

