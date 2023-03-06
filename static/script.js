// const submitBtn = document.getElementById("submit-btn");
// const baseWordingInput = document.getElementById("base-wording");
// const shiftedWordingInput = document.getElementById("shifted-wording");

// // Get the radio buttons for the theme question
// var themeInputs = document.getElementsByName("theme");
// var toneInputs = document.getElementsByName("tone");
// var lengthInputs = document.getElementsByName("length");
// var theme = ''
// var tone = ''
// var length=''

// // Add a change event listener to each radio button
// themeInputs.forEach(function(input) {
//   input.addEventListener("change", function() {
//     // Update the theme variable with the selected value
//     theme = document.querySelector('input[name="theme"]:checked') ? document.querySelector('input[name="theme"]:checked').value : null;
//     // Log the values of the variables to the console
//     console.log(theme);
//   });
// });

// // Add a change event listener to each radio button
// toneInputs.forEach(function(input) {
//   input.addEventListener("change", function() {
//     // Update the theme variable with the selected value
//     tone = document.querySelector('input[name="tone"]:checked') ? document.querySelector('input[name="tone"]:checked').value : null;
//     // Log the values of the variables to the console
//     console.log(tone);
//   });
// });

// // Add a change event listener to each radio button
// lengthInputs.forEach(function(input) {
//   input.addEventListener("change", function() {
//     // Update the theme variable with the selected value
//     length = document.querySelector('input[name="length"]:checked') ? document.querySelector('input[name="length"]:checked').value : null;
//     // Log the values of the variables to the console
//     console.log(length);
//   });
// });


// // Add event listener to submit button
// submitBtn.addEventListener("click", async() => {
//   const response = await fetch("/shiftwording/", {
//         method: "POST",
//         headers: { "content-type": "application/json" },
//         body: JSON.stringify({ 'baseWording': baseWordingInput.value, 'theme': theme, 'tone': tone, 'length': length})
//   });
//   const data = await response.json();
//   shiftedWordingInput.value = data;
// });



// Get references to DOM elements
const submitBtn = document.getElementById("submit-btn");
const baseWordingInput = document.getElementById("base-wording");
const shiftedWordingInput = document.getElementById("shifted-wording");
const learningObjectiveInput = document.getElementById("learning-objective")

// Initialize variables for selected options
let selectedTheme = document.querySelector('input[name="theme"]:checked')?.value || 'Music';
let selectedTone = document.querySelector('input[name="tone"]:checked')?.value || 'Playful';
let selectedLength = document.querySelector('input[name="length"]:checked')?.value || 'Medium';


// Get references to radio buttons for theme, tone, and length questions
const themeInputs = document.getElementsByName("theme");
const toneInputs = document.getElementsByName("tone");
const lengthInputs = document.getElementsByName("length");

// Add change event listeners to radio buttons
themeInputs.forEach(function(input) {
  input.addEventListener("change", function() {
    selectedTheme = document.querySelector('input[name="theme"]:checked')?.value;
    console.log(`Selected theme: ${selectedTheme}`);
  });
});

toneInputs.forEach(function(input) {
  input.addEventListener("change", function() {
    selectedTone = document.querySelector('input[name="tone"]:checked')?.value;
    console.log(`Selected tone: ${selectedTone}`);
  });
});

lengthInputs.forEach(function(input) {
  input.addEventListener("change", function() {
    selectedLength = document.querySelector('input[name="length"]:checked')?.value;
    console.log(`Selected length: ${selectedLength}`);
  });
});

// Add event listener to submit button
submitBtn.addEventListener("click", async () => {
  try {
    // Send POST request to server with selected options and base wording text
    const response = await fetch("/shiftwording/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        baseWording: baseWordingInput.value,
        learningObjective: learningObjectiveInput.value,
        theme: selectedTheme, 
        tone: selectedTone, 
        length: selectedLength 
      })
    });

    // Update shifted wording input field with response from server
    const shiftedWording = await response.json();
    shiftedWordingInput.value = shiftedWording;
  } catch (error) {
    console.error(error);
  }
});
