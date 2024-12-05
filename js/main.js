(() => {
    // Variables
    const hotspots = document.querySelectorAll(".Hotspot");
    const materialTemplate = document.querySelector("#material-template");
    const materialList = document.querySelector("#material-list");
    const model = document.querySelector("#model");
    const materialData = document.querySelector("#material-data");
    const loader = document.querySelector("#loader");
    const peoplecon = document.querySelector("#people-con");
    
    let errors = 0; 
    


    // 1 function for both errors
    function displayError(error) {
      if (errors > 0) return;
  
      console.log(error);
  
        loader.classList.toggle("hidden");
        model.classList.toggle("hidden");
        materialData.classList.toggle("hidden");
  
        const errorMessage = document.createElement("p");
        errorMessage.textContent = "Something is wrong with your internet connection please try again later.";
        peoplecon.appendChild(errorMessage);
      
        errors++;
    }
  
    function loadInfoBoxes() {
      fetch("https://swiftpixel.com/earbud/api/infoboxes")
        .then(response => response.json())
        .then(infoBoxes => {
          console.log(infoBoxes);
          infoBoxes.forEach((infoBox, index) => {
            let selected = document.querySelector(`#hotspot-${index + 1}`);
  
            const titleElement = document.createElement("h2");
            titleElement.textContent = infoBox.heading;
  
            const textElement = document.createElement("p");
            textElement.textContent = infoBox.description;
  
            const image = document.createElement("img");
           
            image.src = `images/${infoBox.thumbnail}`;
  
  
            selected.appendChild(titleElement);
            selected.appendChild(textElement);
            selected.appendChild(image);
          });
        })
        .catch(error => {
          console.error(error);
          displayError();
        });
    }
  
    function loadMaterialInfo() {
      fetch("https://swiftpixel.com/earbud/api/materials")
        .then(response => response.json())
        .then(materials => {
          console.log(materials);
          materials.forEach(material => {
            const clone = materialTemplate.content.cloneNode(true);
  
            const materialHeading = clone.querySelector(".material-heading");
            materialHeading.textContent = material.heading;
  
            const materialDescription = clone.querySelector(".material-description");
            materialDescription.textContent = material.description;
  
            materialList.appendChild(clone);
            materialData.appendChild(materialList);
          });
        })
        .catch(error => {
          console.error(error);
          displayError();
        });
    }
  
    function showInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 1 });
    }
  
    function hideInfo() {
      let selected = document.querySelector(`#${this.slot}`);
      gsap.to(selected, 1, { autoAlpha: 0 });
    }
  
    // Load data
    loadInfoBoxes();
    loadMaterialInfo();
  
    // Event listeners
    hotspots.forEach(function (hotspot) {
      hotspot.addEventListener("mouseenter", showInfo);
      hotspot.addEventListener("mouseleave", hideInfo);
    });
  })();
  