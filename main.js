const inputImage = document.getElementById("Image");
const imgContainer = document.querySelector(".img-container");
const textOutput = document.querySelector(".text");

inputImage.addEventListener('change' , function(event){
  const file = event.target.files[0];
  console.log(file);
  
  if(file){
    const fileReader = new FileReader();
    
    fileReader.onload = function(e) {
      const img = document.createElement('img')
      img.src = e.target.result;
      console.log(e.target.result);
      console.log(img.src);

      imgContainer.innerHTML = "";
      imgContainer.appendChild(img);
      imgContainer.style.border = "none";

      Tesseract.recognize(
        img.src,
        'eng',
        {
          logger: info => console.log(info)
        }
      ).then(({data: {text}}) => {
        // textOutput.textContent = text
        displayText(text, textOutput)
      }).catch(err => {
        textOutput.textContent = "Error Reading text from Image";
        console.log(err)
      })
    }

    fileReader.readAsDataURL(file);
  }
})

function displayText(text, textElement){
  let index = 0;
  textElement.textContent = "";
  const speed = 10;

  function typeCharacter () {
    if(index < text.length){
      textElement.textContent += text[index];
      index++;
      setTimeout(typeCharacter, speed);
    }
  }

  typeCharacter();
}