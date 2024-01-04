import { getUserData } from './data.js'; // Import the getUserData function from data.js

// Function to handle the draw
function performDraw() {
  const winnerDisplay = document.getElementById('winner');
  const tickets = getUserData(); // Retrieve tickets using the imported function

  try {
    if (tickets.length > 0) {
      const randomIndex = Math.floor(Math.random() * tickets.length);
      const winner = tickets[randomIndex];

      // Play the sound effect when a winner is selected
      const audio = new Audio('success-fanfare-trumpets-6185.mp3');
      audio.play();

      // Display the winner's name
      winnerDisplay.innerText = `${winner.name}`;

      // Add an animation effect to the winner display
      winnerDisplay.classList.add('win-animation'); // Replace 'win-animation' with your desired CSS animation class
    } else {
      winnerDisplay.innerText = "No tickets to draw from.";
    }
  } catch (error) {
    // If an error occurs during the draw operation, display an alert
    alert("An error occurred while performing the draw. Please try again.");
    console.error("Error:", error); // Log the error to the console for debugging
  }
}

// Event listener for the Draw button
document.getElementById('draw').addEventListener('click', performDraw);
