// ==============================
// PART 1: BMI logic
// (no web page code here, so you can test it alone)
// ==============================

// The user types centimetres, but the formula needs metres, so we convert first.
function calculateBmi(weightKg, heightCm) {
  const heightM = heightCm / 100;
  return weightKg / (heightM * heightM);
}

// Returns an OBJECT with the category name and the CSS class that colours it.
// Checked from the lowest band upwards, so each "else if" only runs
// for values that failed the earlier checks.
function getCategory(bmi) {
  if (bmi < 18.5) {
    return { name: "Underweight", className: "underweight" };
  } else if (bmi < 25) {
    return { name: "Normal", className: "normal" };
  } else if (bmi < 30) {
    return { name: "Overweight", className: "overweight" };
  } else {
    return { name: "Obese", className: "obese" };
  }
}

// A comparison already gives true or false, so no "if" is needed.
function isHealthyRange(bmi) {
  return bmi >= 18.5 && bmi < 25;
}

// Combines the functions above into ONE object.
// It contains no BMI rules of its own, so each rule lives in one place only.
function makeResult(weightKg, heightCm) {
  const bmi = calculateBmi(weightKg, heightCm);
  const category = getCategory(bmi);

  return {
    weight: weightKg,
    height: heightCm,
    bmi: bmi,
    category: category.name,
    className: category.className,
    healthy: isHealthyRange(bmi)
  };
}

// Returns true only if the typed text is a number between min and max.
// Empty text must be rejected first, because Number("") gives 0.
function isValidNumber(text, min, max) {
  if (text === "") {
    return false;
  }

  const number = Number(text);

  if (Number.isNaN(number)) {
    return false;
  }

  return number >= min && number <= max;
}


// ==============================
// PART 2: Connecting to the web page
// ==============================

function showError(message) {
  const errorBox = document.getElementById("error");
  errorBox.textContent = message;
  errorBox.className = "error";                                      // visible
  document.getElementById("results").className = "results hidden";   // hide old results
}

function showResult(result) {
  document.getElementById("error").className = "error hidden";
  document.getElementById("results").className = "results";

  // toFixed is used ONLY for display. The real BMI stays unrounded.
  document.getElementById("bmiText").textContent = result.bmi.toFixed(1);

  const categoryElement = document.getElementById("categoryText");
  categoryElement.textContent = result.category;
  categoryElement.className = "category " + result.className;

  const healthyElement = document.getElementById("healthyText");
  if (result.healthy) {
    healthyElement.textContent = "You are within the normal BMI range.";
  } else {
    healthyElement.textContent = "You are outside the normal BMI range.";
  }
}

// Runs when the button is clicked (see onclick in index.html)
function calculate() {
  // .value is always TEXT, even in a number box
  const weightText = document.getElementById("weight").value;
  const heightText = document.getElementById("height").value;

  // Weight: 1 to 500 kg. Height: 50 to 250 cm.
  // These limits reject impossible values such as 0 or 5000.
  if (!isValidNumber(weightText, 1, 500)) {
    showError("Please enter a weight between 1 and 500 kg");
    return;   // stop here, do not calculate
  }

  if (!isValidNumber(heightText, 50, 250)) {
    showError("Please enter a height between 50 and 250 cm");
    return;
  }

  // Convert text to numbers before calculating
  const result = makeResult(Number(weightText), Number(heightText));
  showResult(result);
}