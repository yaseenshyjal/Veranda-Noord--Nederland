const radioOptions = document.querySelectorAll('.radio-option');
const image = document.getElementById('verandaImage');
const steps = document.querySelectorAll('.step');
const breedteInput = document.getElementById('breedte');
const diepteInput = document.getElementById('diepte');
const breedteOutput = document.getElementById('breedteOutput');
const diepteOutput = document.getElementById('diepteOutput');

let currentStep = 0;

let selections = {
  goot: 'rechte',
  kleur: 'creme',
  dak: 'Polycarbonaat-Opaal',
  breedte: 567,
  diepte: 265,
  zonwering: 'Geen zonwering',
  voorkant: 'Open voorkant',
  linkerzijde: 'Open linkerzijde',
  rechterzijde: 'Open rechterzijde',
  verlichting: 'Geen verlichting',
  montage: 'nee',

};



function updateImage() {
  let filename = 'creme.png'; // Default image

  if (currentStep === 0) {
    filename = `${selections.goot}.png`;
  } else if (currentStep === 1) {
    filename = `${selections.goot}-${selections.kleur}.png`;
  } else if (currentStep === 2) {
    filename = `${selections.kleur}-${selections.dak}.png`;
  } else if (currentStep === 4) {
    filename = `${selections.kleur}-${selections.zonwering}.png`;
  } else if (currentStep === 5) {
    filename = `${selections.kleur}-${selections.voorkant}.png`;
  } else if (currentStep === 6) {
    filename = `${selections.kleur}-${selections.linkerzijde}.png`;
  } else if (currentStep === 7) {
    filename = `${selections.kleur}-${selections.rechterzijde}.png`;
  } else if (currentStep === 8) {
    filename = `${selections.kleur}-${selections.verlichting}.png`;
  } else if (currentStep === 9) {
    filename = `${selections.kleur}-${selections.montage}.png`;
  }
  else {
    filename = `${selections.kleur}.png`;
  }

  image.classList.remove("show");
  setTimeout(() => {
    image.src = `images/${filename}`;
    image.onload = () => image.classList.add("show");
  }, 100);
}



function showStep(index) {
  steps.forEach((step, i) => {
    step.classList.toggle("active", i === index);
  });
  updateImage();
}

function validateStep(stepIndex) {
  console.log(`🧪 Starting validation for step ${stepIndex}`);

  const step = steps[stepIndex];
  const requiredFields = step.querySelectorAll('[required]');
  console.log(`➡️ Found ${requiredFields.length} required field(s)`);

  let isValid = true;
  let firstInvalidGroup = null;

  requiredFields.forEach(field => {
    const isRadio = field.type === "radio";
    const group = field.closest(".form-group") || field.parentElement;

    let groupValid = true;

    if (isRadio) {
      const radios = step.querySelectorAll(`input[name="${field.name}"]`);
      const oneChecked = [...radios].some(r => r.checked);
      groupValid = oneChecked;
      console.log(`🔘 [Radio] ${field.name} → ${groupValid ? 'valid' : 'NOT valid'}`);
    } else {
      groupValid = field.value && field.value.trim() !== "";
      console.log(`📝 [Input] ${field.name} → "${field.value}" → ${groupValid ? 'valid' : 'NOT valid'}`);
    }

    if (!groupValid) {
      group.classList.add("has-error");
      const label = field.name || field.placeholder || "onbekend veld";
      console.warn(`❌ Verplicht veld ontbreekt of leeg: ${label}`);
      console.log(`⚠️ Added 'has-error' class to .form-group of ${field.name}`);

      if (!firstInvalidGroup) {
        firstInvalidGroup = group;
      }

      isValid = false;
    } else {
      if (group.classList.contains("has-error")) {
        console.log(`✅ Removed 'has-error' class from .form-group of ${field.name}`);
      }
      group.classList.remove("has-error");
    }
  });

  if (!isValid && firstInvalidGroup) {
    console.log("📍 Scrolling to first invalid field...");
    firstInvalidGroup.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const focusInput = firstInvalidGroup.querySelector("input, textarea, select");
    if (focusInput) {
      focusInput.focus();
      console.log(`🧭 Focused on ${focusInput.name}`);
    }
  } else {
    console.log("✅ Step is valid. Proceeding to next.");
  }

  return isValid;
}



function nextStep() {
  console.log("🚀 nextStep() triggered");

  if (!validateStep(currentStep)) {
    console.warn("❌ Validation failed at step " + currentStep);
    return;
  }

  console.log("✅ Validation passed. Proceeding to next step.");

  if (currentStep < steps.length - 1) {
    currentStep++;
    showStep(currentStep);
  }
}



function prevStep() {
  if (currentStep > 0) {
    currentStep--;
    showStep(currentStep);
  }
}

radioOptions.forEach(label => {
  label.addEventListener('click', () => {
    const group = label.closest('.radio-group');
    const input = label.querySelector('input');
    group.querySelectorAll('.radio-option').forEach(r => r.classList.remove('selected'));
    label.classList.add('selected');

    selections[input.name] = input.value;
    updateImage();
  });
});

if (breedteInput && diepteInput) {
  breedteInput.addEventListener('input', () => {
    selections.breedte = breedteInput.value;
    breedteOutput.textContent = breedteInput.value;
  });

  diepteInput.addEventListener('input', () => {
    selections.diepte = diepteInput.value;
    diepteOutput.textContent = diepteInput.value;
  });

  // Set initial values
  breedteOutput.textContent = breedteInput.value;
  diepteOutput.textContent = diepteInput.value;
}

  /*document.querySelector('#submit-btn').addEventListener('click', (e) => {
  const finalStepIndex = document.querySelectorAll('.step').length - 1;
  if (!validateStep(finalStepIndex)) {
    e.preventDefault();
  } else {
    // submit the form or call your PDF/email logic
  }
});*/

  const submitBtn = document.getElementById('submit-btn');

  if (submitBtn) {
    submitBtn.addEventListener('click', () => {
      console.log("🚀 Submit button clicked");

      if (!validateStep(currentStep)) {
        console.warn("❌ Validation failed. Submission stopped.");
        return;
      }

      console.log("✅ Validation passed. Submitting form...");

      // Here you send data or call your WhatsApp/email logic


      const customerData = {
        voornaam: document.querySelector('[name="voornaam"]').value,
        achternaam: document.querySelector('[name="achternaam"]').value,
        email: document.querySelector('[name="email"]').value,
        telefoon: document.querySelector('[name="telefoon"]').value,
        postcode: document.querySelector('[name="postcode"]').value,
        huisnummer: document.querySelector('[name="huisnummer"]').value,
        woonplaats: document.querySelector('[name="woonplaats"]').value,
        straatnaam: document.querySelector('[name="straatnaam"]').value,
        opmerking: document.querySelector('[name="opmerking"]').value
      };

      const quoteData = {
        ...selections,
        klant: customerData
      };

      console.log("Quote Data:", quoteData);

      // Example submit
      // alert("Bedankt voor je aanvraag! Je offerte wordt verwerkt.");

      // Optional: send to backend
      fetch("send-email.php", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(selections),
      })
        .then(res => res.json())
        .then(data => {
          if (data.success) {
            alert("✅ E-mail succesvol verzonden!");
          } else {
            alert("❌ E-mail verzenden mislukt.");
          }
        });



    });
  }


function sendToWhatsApp() {
  const phone = "9567788515"; // Dutch number without leading zero
  const message = encodeURIComponent(
    `Nieuwe offerte aanvraag:\n
Type: ${selections.goot}
Kleur: ${selections.kleur}
Dak: ${selections.dak}
Afmetingen: ${selections.breedte} x ${selections.diepte} cm
Zonwering: ${selections.zonwering}
Naam: ${selections.name}
Email: ${selections.email}
Telefoon: ${selections.phone}`
  );

  const url = `https://wa.me/${phone}?text=${message}`;
  window.open(url, '_blank');
}

function validateStep(currentStepIndex) {
  const currentStep = document.querySelectorAll('.step')[currentStepIndex];
  const requiredInputs = currentStep.querySelectorAll('[required]');
  let valid = true;

  requiredInputs.forEach(input => {
    const formGroup = input.closest('.form-group') || input.parentElement;
    if (!input.value || (input.type === 'radio' && !input.checked && ![...formGroup.querySelectorAll('input')].some(r => r.checked))) {
      formGroup.classList.add('has-error');
      valid = false;
    } else {
      formGroup.classList.remove('has-error');
    }
  });

  requiredInputs.forEach(input => {
    const formGroup = input.closest('.form-group') || input.parentElement;
    let inputIsValid = true;

    if (input.type === 'radio') {
      const name = input.name;
      const groupRadios = currentStep.querySelectorAll(`input[name="${name}"]`);
      const oneChecked = [...groupRadios].some(r => r.checked);
      inputIsValid = oneChecked;
    } else if (input.type === 'email') {
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      inputIsValid = emailPattern.test(input.value.trim());
    } else if (input.type === 'tel') {
      const phonePattern = /^[0-9+\-\s]{7,15}$/;
      inputIsValid = phonePattern.test(input.value.trim());
    } else {
      inputIsValid = input.value.trim() !== '';
    }

    if (!inputIsValid) {
      formGroup.classList.add('has-error');
      valid = false;
    } else {
      formGroup.classList.remove('has-error');
    }
  });

  return valid;
}

document.querySelectorAll('.next-button').forEach((button, index) => {
  button.addEventListener('click', () => {
    if (validateStep(index)) {
      showStep(index + 1);
    }
  });
});

