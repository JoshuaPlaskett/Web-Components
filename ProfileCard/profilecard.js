
class ProfileCard extends HTMLElement{
    constructor(){
      super();
      const shadow = this.attachShadow({ mode: 'open'});
  
      const style = document.createElement("style");
      style.textContent = `
      .card {
        box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
        max-width: 300px;
        margin: auto;
        text-align: center;
      }
      
      .title {
        color: grey;
        font-size: 18px;
      }
      
      button {
        border: none;
        outline: 0;
        display: inline-block;
        padding: 8px;
        color: white;
        background-color: #000;
        text-align: center;
        cursor: pointer;
        width: 100%;
        font-size: 18px;
      }
      
      a {
        text-decoration: none;
        font-size: 22px;
        color: black;
      }
      
      button:hover, a:hover {
        opacity: 0.7;
      }
      `;
      let template = document.createElement("template");
      template.innerHTML = `
        <div class="card">
            <img src="${this.getAttribute('profile-image')}" alt="${this.getAttribute('profile-name')}" style="width:100%">
            <h1>${this.getAttribute('profile-name')}</h1>
            <p class="title">${this.getAttribute('profile-status')}</p>
            <p>${this.getAttribute('profile-description')}</p>
            <p><button onlick="${this.getAttribute('button-action')}">${this.getAttribute('button-text')}</button></p>
        </div>
      `;
  
      shadow.appendChild(template.content.cloneNode(true));
      shadow.appendChild(style);
      
      
  
      //shadow.getElementById('title').innerText = this.getAttribute('title');
    }
  
    changeSlide(n, slides, dots)
    {
      this.resetSlides(slides, dots);
      slideIndex += n;
      if(slideIndex >= slides.length)
        slideIndex = 0;
      else if(slideIndex < 0)
        slideIndex = slides.length-1;
      slides[slideIndex].style.display = "block";
      dots[slideIndex].className += " dotActive";
    }
  
    setSlide(n, slides, dots)
    {
      this.resetSlides(slides);
      slideIndex = n;
      slides[slideIndex].style.display = "block";
      dots[slideIndex].className += " dotActive";
    }
  
    resetSlides(slides, dots)
    {
      let i = 0; 
      for (i = 0; i < slides.length; i++)
      {
        slides[i].style.display = "none";
        dots[i].className = dots[i].className.replace(" dotActive","");
      }
    }
  
  }
  
  window.customElements.define('custom-profile-card', ProfileCard);
  
  