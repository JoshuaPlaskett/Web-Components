
class Carousel extends HTMLElement{
  constructor(){
    super();
    const shadow = this.attachShadow({ mode: 'open'});

    const style = document.createElement("style");
    let slideIndex = 1;
    style.textContent = `
    .carousel {
      font-family: sans-serif;
      background: #f4f6f7;
      position: relative;
      margin: auto;
      display: grid;
      grid-template-columns: 1fr;
      margin-bottom: 10px;
    }
  
    .gallery {
      width:500px;
      height:500px;
      border:1px solid black;
      overflow:hidden;
      margin:auto;
    }
  
    /* Hide the images by default */
    .mySlides {
      display: none;
    }
  
    .gallery > div > img {
      max-width:500px;
      max-height:500px;
      width:100%;
    }
  
    .arrows_container {
      display: flex;
      justify-content: space-between;
      position: absolute;
      width: 500px;
      height: 500px;
      align-items: center;
    }
  
    /* Next & previous buttons */
    .prev, .next {
      cursor: pointer;
      position: absolute;
      top: 50%;
      width: auto;
      margin-top: -22px;
      padding: 16px;
      color: white;
      font-weight: bold;
      font-size: 18px;
      transition: 0.6s ease;
      border-radius: 0 3px 3px 0;
      user-select: none;
    }
  
    /* Position the "next button" to the right */
    .next {
      right: 0;
      border-radius: 3px 0 0 3px;
    }
  
    /* On hover, add a black background color with a little bit see-through */
    .prev:hover, .next:hover {
      background-color: rgba(0,0,0,0.8);
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
    <div class="carousel"> 
      <div>
        <h3 id='title'></h3>
        <div id="gallery" class="gallery" name="gallery">
        <!-- Next and previous buttons -->
        <div class="arrows_container">
          <a id="prev" class="prev" onclick="plusSlides(-1)">&#10094;</a>
          <a id="next" class="next" onclick="plusSlides(1)">&#10095;</a>
        </div>
        </div>
        <div id="dot_container" style="text-align:center">
        </div>
      </div>
    </div>
    `;

    var script = document.createElement('script');
    script.textContent = `
    let slideIndex = 1;`;

    shadow.appendChild(template.content.cloneNode(true));
    shadow.appendChild(style);
    
    
    shadow.querySelector("#next").onclick = () => {
      let slides = shadow.querySelectorAll("#slide");
      let dots = shadow.querySelectorAll("#dot");
      this.changeSlide(1, slides, dots);
    }

    shadow.querySelector("#prev").onclick = () => {
      let slides = shadow.querySelectorAll("#slide");
      let dots = shadow.querySelectorAll("#dot");
      this.changeSlide(-1, slides, dots);
    }


    shadow.getElementById('title').innerText = this.getAttribute('title');
    var imagesString = this.getAttribute('images');
    var imagesArray = imagesString.split(",")
    let index = 0;
    imagesArray.forEach(image => {
      var imageDiv = document.createElement("div");
      imageDiv.id = "slide";
      var imageNode = document.createElement("img");
      var imageCaption = document.createElement("p");
      imageCaption.innerText = "Hey";
      imageNode.src = image;
      imageDiv.className = "mySlides fade";
      
      imageDiv.appendChild(imageNode);
      imageDiv.appendChild(imageCaption);
      shadow.getElementById('gallery').appendChild(imageDiv);

      let dotNode = document.createElement("span");
      dotNode.id = "dot";
      dotNode.className = "dot";
      dotNode.onclick = (index) => {
        let slides = shadow.querySelectorAll("#slide");
        let dots = shadow.querySelectorAll("#dot");
        this.setSlide(index, slides, dots);
      }

      shadow.getElementById("dot_container").append(dotNode);
      index++;
      });

    shadow.getElementById('gallery').lastChild.className += " active";
    shadow.appendChild(script);
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

window.customElements.define('custom-carousel', Carousel);

