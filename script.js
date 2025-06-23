// Configuration
const ZOOM_LINK = "https://us02web.zoom.us/webinar/register/WN_bA6j5cemSfquew66LWKDmg#/registration" // Replace with your actual Zoom link
const PDF_PATH = "Inversión-Florida.pdf" // Replace with your actual PDF path

// Countdown functionality with CORRECTED 2025 date
function initializeCountdown() {
  // Set the target date - July 8, 2025 at 19:00 Spain time (13:00 Miami time)
  const targetDate = new Date("2025-07-08T19:00:00+02:00").getTime()

  const daysElement = document.getElementById("days")
  const hoursElement = document.getElementById("hours")
  const minutesElement = document.getElementById("minutes")
  const secondsElement = document.getElementById("seconds")
  const countdownTimer = document.getElementById("countdown")

  if (!daysElement || !hoursElement || !minutesElement || !secondsElement) {
    return
  }

  // Initialize digit structure for each element
  initializeDigitStructure(daysElement)
  initializeDigitStructure(hoursElement)
  initializeDigitStructure(minutesElement)
  initializeDigitStructure(secondsElement)

  function initializeDigitStructure(element) {
    const currentValue = element.textContent || "00"
    element.innerHTML = ""
    element.classList.add("digit-container")

    for (let i = 0; i < currentValue.length; i++) {
      const digitSpan = document.createElement("span")
      digitSpan.className = "digit"
      digitSpan.textContent = currentValue[i]
      digitSpan.setAttribute("data-position", i)
      element.appendChild(digitSpan)
    }
  }

  function updateCountdown() {
    const now = new Date().getTime()
    const distance = targetDate - now

    if (distance < 0) {
      // Event has passed
      setElementValue(daysElement, "00")
      setElementValue(hoursElement, "00")
      setElementValue(minutesElement, "00")
      setElementValue(secondsElement, "00")

      // Add expired class for styling
      if (countdownTimer) {
        countdownTimer.classList.add("countdown-expired")
      }
      return
    }

    // Calculate time units
    const days = Math.floor(distance / (1000 * 60 * 60 * 24))
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    const seconds = Math.floor((distance % (1000 * 60)) / 1000)

    // Format numbers with leading zeros
    const newDays = String(days).padStart(2, "0")
    const newHours = String(hours).padStart(2, "0")
    const newMinutes = String(minutes).padStart(2, "0")
    const newSeconds = String(seconds).padStart(2, "0")

    // Animate number changes with intelligent digit detection
    animateSmartNumberChange(daysElement, newDays)
    animateSmartNumberChange(hoursElement, newHours)
    animateSmartNumberChange(minutesElement, newMinutes)
    animateSmartNumberChange(secondsElement, newSeconds)

    // Add urgency styling when less than 24 hours remain
    if (countdownTimer) {
      if (days === 0 && hours < 24) {
        countdownTimer.classList.add("countdown-urgent")
      } else {
        countdownTimer.classList.remove("countdown-urgent")
      }
    }
  }

  function getCurrentValue(element) {
    const digits = element.querySelectorAll(".digit")
    return Array.from(digits)
      .map((digit) => digit.textContent)
      .join("")
  }

  function setElementValue(element, value) {
    const digits = element.querySelectorAll(".digit")
    for (let i = 0; i < value.length && i < digits.length; i++) {
      digits[i].textContent = value[i]
    }
  }

  function animateSmartNumberChange(element, newValue) {
    const currentValue = getCurrentValue(element)
    const isSeconds = element.id === "seconds"

    if (currentValue === newValue) return

    const digits = element.querySelectorAll(".digit")

    // Compare each digit and animate only the ones that changed
    for (let i = 0; i < newValue.length; i++) {
      if (i < currentValue.length && currentValue[i] !== newValue[i]) {
        animateDigit(digits[i], newValue[i], isSeconds)
      }
    }
  }

  function animateDigit(digitElement, newValue, isSeconds = false) {
    if (isSeconds) {
      // Special descending animation for seconds
      digitElement.setAttribute("data-next", newValue)
      digitElement.classList.add("digit-descending")

      setTimeout(() => {
        digitElement.textContent = newValue
        digitElement.classList.remove("digit-descending")
      }, 300)

      setTimeout(() => {
        digitElement.removeAttribute("data-next")
      }, 600)
    } else {
      // Normal flip animation for other digits
      digitElement.classList.add("digit-changing")

      setTimeout(() => {
        digitElement.textContent = newValue
      }, 300)

      setTimeout(() => {
        digitElement.classList.remove("digit-changing")
      }, 600)
    }
  }

  // Update countdown immediately to show real numbers
  updateCountdown()

  // Update countdown every second
  const countdownInterval = setInterval(updateCountdown, 1000)

  // Store interval ID for cleanup if needed
  window.countdownInterval = countdownInterval
}

// Enhanced notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`

  const bgColor =
    type === "success"
      ? "var(--success-green)"
      : type === "warning"
        ? "var(--accent-gold)"
        : type === "error"
          ? "#ff4757"
          : "var(--primary-blue)"

  notification.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: ${bgColor};
    color: white;
    padding: 15px 25px;
    border-radius: 10px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.3);
    z-index: 10000;
    animation: slideInDown 0.5s ease;
    max-width: 90vw;
    font-size: clamp(0.8rem, 2vw, 0.9rem);
    font-weight: 600;
    text-align: center;
    border: 2px solid rgba(255, 255, 255, 0.2);
  `

  notification.textContent = message
  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutUp 0.5s ease forwards"
    setTimeout(() => {
      notification.remove()
    }, 500)
  }, 4000)
}

// Check for milestone notifications - UPDATED to 2025
function checkCountdownMilestones() {
  const targetDate = new Date("2025-07-08T19:00:00+02:00").getTime()
  const now = new Date().getTime()
  const distance = targetDate - now

  if (distance < 0) return

  const days = Math.floor(distance / (1000 * 60 * 60 * 24))
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

  // Show notifications at key milestones
  if (days === 7 && hours === 0) {
    showNotification("¡Solo queda 1 semana para la sesión exclusiva!", "warning")
  } else if (days === 3 && hours === 0) {
    showNotification("¡Últimos 3 días para reservar tu lugar!", "warning")
  } else if (days === 1 && hours === 0) {
    showNotification("¡Mañana es el gran día! ¿Ya tienes tu lugar reservado?", "warning")
  } else if (days === 0 && hours === 1) {
    showNotification("¡Solo queda 1 hora! La sesión está a punto de comenzar", "error")
  }
}

// Action functions
function joinZoom() {
  // Track the action
  console.log("User clicked Zoom button")

  // Show confirmation
  showNotification("¡Perfecto! Te estamos redirigiendo al Zoom...", "success")

  // Open Zoom link
  setTimeout(() => {
    window.open(ZOOM_LINK, "_blank")
  }, 1000)
}

function downloadPDF() {
  // Track the action
  console.log("User clicked PDF download")

  // Show confirmation
  showNotification("¡Genial! Tu guía se está descargando...", "success")

  // Create download link
  const link = document.createElement("a")
  link.href = PDF_PATH
  link.download = "Inversión-Florida.pdf" // Ensure the file name is correct
  document.body.appendChild(link)
  link.click()
  document.body.removeChild(link)
}

// Counter animation for stats
function animateCounters() {
  const counters = document.querySelectorAll(".counter")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.textContent.replace(/[^\d]/g, ""))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current) + (counter.textContent.includes("%") ? "%" : "+")
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = counter.textContent // Keep original format
      }
    }

    updateCounter()
  })
}

// Función para animar el contador del 15% - LIMITADO A 15%
function animatePercentageCounter() {
  const counter = document.getElementById("percentage-counter")
  if (!counter) return

  const target = 15 // MÁXIMO 15%
  const duration = 2000 // 2 segundos
  const increment = target / (duration / 16) // 60fps
  let current = 0

  const updateCounter = () => {
    if (current < target) {
      current += increment
      const displayValue = Math.min(Math.floor(current), 15) // Asegurar que no pase de 15
      counter.textContent = displayValue
      requestAnimationFrame(updateCounter)
    } else {
      counter.textContent = 15 // Asegurar que termine en 15
    }
  }

  updateCounter()
}

// Scroll animations
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")

        // Trigger counter animation for stats
        if (entry.target.classList.contains("hero-stats")) {
          setTimeout(animateCounters, 500)
        }

        // Trigger percentage counter animation
        if (entry.target.classList.contains("roi-percentage")) {
          setTimeout(animatePercentageCounter, 500)
        }

        // Stagger animation for multiple items
        if (entry.target.classList.contains("stagger-item")) {
          const siblings = entry.target.parentElement.querySelectorAll(".stagger-item")
          siblings.forEach((sibling, index) => {
            setTimeout(() => {
              sibling.classList.add("visible")
            }, index * 200)
          })
        }
      }
    })
  }, observerOptions)

  // Observe all animated elements including roi-percentage
  const animatedElements = document.querySelectorAll(
    ".reveal-fade, .reveal-left, .reveal-right, .reveal-scale, .stagger-item, .roi-percentage",
  )
  animatedElements.forEach((el) => observer.observe(el))
}

// Smooth scrolling for anchor links
function initSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })
}

// Performance optimization
function optimizePerformance() {
  // Lazy load images
  const images = document.querySelectorAll("img[data-src]")
  const imageObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.src = img.dataset.src
        img.removeAttribute("data-src")
        imageObserver.unobserve(img)
      }
    })
  })

  images.forEach((img) => imageObserver.observe(img))
}

// Initialize everything when DOM is loaded
document.addEventListener("DOMContentLoaded", () => {
  console.log("Miami Investment Landing Page Loaded")

  // Initialize all functionality
  initializeCountdown()
  initScrollAnimations()
  initSmoothScrolling()
  optimizePerformance()

  // Check milestones every hour
  setInterval(checkCountdownMilestones, 3600000)

  // Add some interactive feedback
  document.addEventListener("click", (e) => {
    if (e.target.matches(".action-btn, .cta-button, .countdown-btn")) {
      e.target.style.transform = "scale(0.95)"
      setTimeout(() => {
        e.target.style.transform = ""
      }, 150)
    }
  })
})

// Add dynamic styles for notifications and digit animations
const notificationStyles = document.createElement("style")
notificationStyles.textContent = `
@keyframes slideInDown {
  from {
    opacity: 0;
    transform: translateX(-50%) translateY(-50px);
  }
  to {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
}

@keyframes slideOutUp {
  from {
    opacity: 1;
    transform: translateX(-50%) translateY(0);
  }
  to {
    opacity: 0;
    transform: translateX(-50%) translateY(-50px);
  }
}

.countdown-expired {
  opacity: 0.6;
}

.countdown-expired .countdown-item {
  background: rgba(255, 71, 87, 0.1);
  border-color: rgba(255, 71, 87, 0.3);
}

.countdown-expired .countdown-number {
  color: #ff4757;
}

/* Digit container styles */
.digit-container {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.digit {
  display: inline-block;
  position: relative;
  transition: all 0.3s ease;
  min-width: 0.6em;
  text-align: center;
}

/* Normal digit change animation */
.digit.digit-changing {
  animation: digitFlip 0.6s ease-in-out;
}

@keyframes digitFlip {
  0% {
    transform: perspective(400px) rotateX(0deg);
  }
  50% {
    transform: perspective(400px) rotateX(-90deg);
  }
  100% {
    transform: perspective(400px) rotateX(0deg);
  }
}

/* Special descending animation for seconds */
.digit.digit-descending {
  position: relative;
  overflow: hidden;
}

.digit.digit-descending::before {
  content: attr(data-next);
  position: absolute;
  top: -100%;
  left: 0;
  right: 0;
  color: inherit;
  font-size: inherit;
  font-weight: inherit;
  text-align: center;
  animation: descendDigit 0.6s ease-in-out;
}

.digit.digit-descending {
  animation: currentDigitExit 0.6s ease-in-out;
}

@keyframes descendDigit {
  0% {
    top: -100%;
    opacity: 0;
  }
  100% {
    top: 0;
    opacity: 1;
  }
}

@keyframes currentDigitExit {
  0% {
    transform: translateY(0);
    opacity: 1;
  }
  100% {
    transform: translateY(100%);
    opacity: 0;
  }
}
`
document.head.appendChild(notificationStyles)

// Export functions for global access
window.joinZoom = joinZoom
window.downloadPDF = downloadPDF
