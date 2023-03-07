// Get references to DOM elements
const submitBtn = document.getElementById("submit-btn");
const baseWordingInput = document.getElementById("base-wording");
const shiftedWordingInput = document.getElementById("shifted-wording");

const subjectInput= document.getElementById("subject")
const blockInput = document.getElementById("block")
const topicInput = document.getElementById("topic")
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
    subjectInput.value = "hola"
    blockInput.value = "hola"
    topicInput.value = "hola"
    learningObjectiveInput.value = "hola"

    subjectInput.style.display = "block";
    blockInput.style.display = "block";
    topicInput.style.display = "block";
    learningObjectiveInput.style.display = "block";


  } catch (error) {
    console.error(error);
  }
});
