// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDb4Iq3mlbWpmQ4R2d7v9X7iXdrFUU2a1c",
  authDomain: "class-8a08b.firebaseapp.com",
  projectId: "class-8a08b",
  storageBucket: "class-8a08b.firebasestorage.app",
  messagingSenderId: "934149070736",
  appId: "1:934149070736:web:c251d0c53cc5e267d01d15",
  measurementId: "G-HD0F9YVLCL",
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const forms = document.querySelector(".forms"),
  pwShowHide = document.querySelectorAll(".eye-icon"),
  links = document.querySelectorAll(".link");

// Password show/hide functionality
pwShowHide.forEach((eyeIcon) => {
  eyeIcon.addEventListener("click", () => {
    let pwFields =
      eyeIcon.parentElement.parentElement.querySelectorAll(".password");
    pwFields.forEach((password) => {
      if (password.type === "password") {
        password.type = "text";
        eyeIcon.classList.replace("bx-hide", "bx-show");
        return;
      }
      password.type = "password";
      eyeIcon.classList.replace("bx-show", "bx-hide");
    });
  });
});

// Form toggle functionality
links.forEach((link) => {
  link.addEventListener("click", (e) => {
    e.preventDefault();
    forms.classList.toggle("show-signup");
  });
});

// Google Sign In Provider
const googleProvider = new firebase.auth.GoogleAuthProvider();

// Handle Google Sign In
async function handleGoogleSignIn(e) {
  e.preventDefault();
  try {
    const result = await firebase.auth().signInWithPopup(googleProvider);
    const user = result.user;

    // Store user info in localStorage
    localStorage.setItem(
      "user",
      JSON.stringify({
        email: user.email,
        name: user.displayName,
        picture: user.photoURL,
      })
    );

    // Redirect to home page
      window.location.href = "p.html";
  } catch (error) {
    console.error("Error during Google sign in:", error);
    alert("Failed to sign in with Google. Please try again.");
  }
}

// Add event listeners for Google Sign-In buttons
document
  .getElementById("loginWithGoogle")
  .addEventListener("click", handleGoogleSignIn);
document
  .getElementById("signupWithGoogle")
  .addEventListener("click", handleGoogleSignIn);
