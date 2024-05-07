
class Carousel extends HTMLElement{
  constructor()
  {
    super();
    const shadow = this.attachShadow({ mode: 'open'});

    const style = document.createElement("style");
    var slideIndex = 0;
    style.textContent = `
    h1 {
      font-weight:normal;
      letter-spacing:2px;
      color:var(--primary-color);
    }
    .carousel {
      position: relative;
      margin: auto;
      display: grid;
      grid-template-columns: 1fr;
      margin-bottom: 10px;
    }
  
    .gallery {
      width:100%;
      
      overflow:hidden;
      margin:auto;
    }
  
    /* Hide the images by default */
    .mySlides {
      display: none;
    }
  
    .gallery > div > img {
      width:100%;
    }
  
    .arrows_container {
      display: flex;
      justify-content: space-between;
      position: absolute;
      width: 120%;
      height: 500px;
      align-items: center;
      left:-10%;
    }
  
    /* Next & previous buttons */
    .prev, .next {
      cursor: pointer;
      position: absolute;
      top: 50%;
      width: 30px;
      margin-top: -22px;
      padding: 16px;
      color: white;
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
      user-select: none;
    }

    .prev {
      transform:rotate(180deg);
    }

    .prev > img, .next > img {
      width:100%;
    }
  
    /* Position the "next button" to the right */
    .next {
      right: 0;
      border-radius: 3px 0 0 3px;
    }

    .playButton {
      border:1px solid var(--tersary-color);
      margin:1rem auto ;
      max-width:200px;
      padding:0.1rem;
      width:10%;
      min-width:100px;
      cursor:pointer;
      selectable:none;
    }
  
  
    /* Caption text */
    .text {
      color: #f2f2f2;
      font-size: 15px;
      padding: 8px 12px;
      position: absolute;
      bottom: 8px;
      width: 100%;
      text-align: center;
    }
  
    /* Number text (1/3 etc) */
    .numbertext {
      color: #f2f2f2;
      font-size: 12px;
      padding: 8px 12px;
      position: absolute;
      top: 0;
    }
  
    /* The dots/bullets/indicators */
    .dot {
      cursor: pointer;
      height: 15px;
      width: 15px;
      margin: 0 2px;
      background-color: #bbb;
      border-radius: 50%;
      display: inline-block;
      transition: background-color 0.6s ease;
    }
  
    .active, .dot:hover {
      background-color: #717171;
    }
  
    .active {
      display:block;
    }

    .dotActive {
      background-color: #717171;
    }
  
    /* Fading animation */
    .fade {
      animation-name: fade;
      animation-duration: 1.5s;
    }
  
    @keyframes fade {
      from {opacity: .4}
      to {opacity: 1}
    }
    `;
    let template = document.createElement("template");
    template.innerHTML = `
    <div class="carousel" onload="initGallery()"> 
      <div>
        <h1 id='title'></h1>
        <div id="pause-play" class="playButton">PLAY
        </div>
        <div id="gallery" class="gallery" name="gallery">
        <!-- Next and previous buttons -->
        <div class="arrows_container">
          <a id="prev" class="prev" onclick="plusSlides(-1)">
            <img src="./images/arrow.svg"/>
          </a>
          <a id="next" class="next" onclick="plusSlides(1)">
            <img src="./images/arrow.svg"/>
          </a>
        </div>
        </div>
        <div id="dot_container" style="text-align:center">
        </div>
      </div>
    </div>
    `;

    var script = document.createElement('script');
    script.textContent = `
    let slideIndex = 0;
    `;

    shadow.appendChild(template.content.cloneNode(true));
    shadow.appendChild(style);
    
    
    shadow.querySelector("#next").onclick = () => {
      let slides = shadow.querySelectorAll("#slide");
      let dots = shadow.querySelectorAll("#dot");
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        let slides = shadow.querySelectorAll("#slide");
        let dots = shadow.querySelectorAll("#dot");
        this.changeSlide(1,slides, dots);
      }, 5000);
      this.changeSlide(1, slides, dots);
    }

    shadow.querySelector("#prev").onclick = () => {
      let slides = shadow.querySelectorAll("#slide");
      let dots = shadow.querySelectorAll("#dot");
      clearInterval(slideInterval);
      slideInterval = setInterval(() => {
        let slides = shadow.querySelectorAll("#slide");
        let dots = shadow.querySelectorAll("#dot");
        this.changeSlide(1,slides, dots);
      }, 5000);
      this.changeSlide(-1, slides, dots);
    }

    shadow.querySelector("#pause-play").onclick = () => {
      if(!slideInterval)
      {
        slideInterval = setInterval(() => {
          let slides = shadow.querySelectorAll("#slide");
          let dots = shadow.querySelectorAll("#dot");
          this.changeSlide(1,slides, dots);
        }, 5000);
      }
      else
      {
        clearInterval(slideInterval);
        slideInterval = null;
      }
    }


    shadow.getElementById('title').innerText = this.getAttribute('title');
    var imagesString = this.getAttribute('images');
    var imagesArray = imagesString.split(",");
    var captionString = this.getAttribute('captions');
    var captionArray = captionString.split("/#");
    let index = 0;
    imagesArray.forEach(image => {
      var imageDiv = document.createElement("div");
      imageDiv.id = "slide";
      var imageNode = document.createElement("img");
      var imageCaption = document.createElement("p");
      
      imageCaption.innerText = "";
      imageNode.src = image;
      imageDiv.className = "mySlides fade";
      
      imageDiv.appendChild(imageNode);
      imageDiv.appendChild(imageCaption);
      shadow.getElementById('gallery').appendChild(imageDiv);
      if(this.getAttribute("showDots"))
      {
          let dotNode = document.createElement("span");
          dotNode.id = "dot";
          dotNode.className = "dot";
          dotNode.onclick = (index) => {
          let slides = shadow.querySelectorAll("#slide");
          let dots = shadow.querySelectorAll("#dot");
          this.setSlide(index, slides, dots);
          }
  
          shadow.getElementById("dot_container").append(dotNode);
      }
      index++;
      });

    shadow.getElementById('gallery').lastChild.className += " active";
    shadow.appendChild(script);

    // Update count when element content changes
    var slideInterval = setInterval(() => {
      let slides = shadow.querySelectorAll("#slide");
      let dots = shadow.querySelectorAll("#dot");
      this.changeSlide(1,slides, dots);
    }, 5000);
  }

  initGallery()
  {
    let slides = shadow.querySelectorAll("#slide");
    let dots = shadow.querySelectorAll("#dot");
    this.setSlide(0, slides, dots);
    
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
    if(dots.length>0)
      dots[slideIndex].className += " dotActive";
  }

  setSlide(n, slides, dots)
  {
    this.resetSlides(slides);
    slideIndex = n;
    slides[slideIndex].style.display = "block";
    if(dots.length>0)
      dots[slideIndex].className += " dotActive";
  }

  resetSlides(slides, dots)
  {
    let i = 0; 
    for (i = 0; i < slides.length; i++)
    {
      slides[i].style.display = "none";
      if(dots.length>0)
          dots[i].className = dots[i].className.replace(" dotActive","");
    }
  }

}

window.customElements.define('custom-carousel', Carousel);

