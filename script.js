const wheelArea = document.querySelector(".wheel-area");
const wheelSpin = document.getElementById("wheelSpin");
const center = document.getElementById("wheelCenter");
const modal = document.getElementById("modal");
const modalButton = document.getElementById("modalButton");

let isSpinning = false;
let currentRotation = 0;

const spinSettings = {
  fullTurns: 6,
  stopAngle: 0,
  duration: 5200,
};

const getRotationAngle = (element) => {
  const style = window.getComputedStyle(element);
  const transform = style.transform;
  if (!transform || transform === "none") {
    return 0;
  }
  const values = transform.split("(")[1].split(")")[0].split(",");
  const a = Number(values[0]);
  const b = Number(values[1]);
  return Math.round(Math.atan2(b, a) * (180 / Math.PI));
};

const startSpin = () => {
  if (isSpinning) return;
  isSpinning = true;

  const angle = getRotationAngle(wheelSpin);
  currentRotation = angle;
  wheelSpin.style.transition = "none";
  wheelSpin.style.transform = `rotate(${currentRotation}deg)`;

  const targetRotation = currentRotation + spinSettings.fullTurns * 360 + spinSettings.stopAngle;

  requestAnimationFrame(() => {
    wheelSpin.style.transition = `transform ${spinSettings.duration}ms cubic-bezier(0.1, 0.8, 0.2, 1)`;
    wheelSpin.style.transform = `rotate(${targetRotation}deg)`;
  });

  window.setTimeout(() => {
    wheelArea.classList.add("is-winning");
  }, spinSettings.duration - 900);

  window.setTimeout(() => {
    modal.classList.add("is-visible");
    modal.setAttribute("aria-hidden", "false");
    isSpinning = false;
  }, spinSettings.duration + 200);
};

center.addEventListener("click", startSpin);
center.addEventListener("keydown", (event) => {
  if (event.key === "Enter" || event.key === " ") {
    event.preventDefault();
    startSpin();
  }
});

document.addEventListener("click", (event) => {
  if (event.target.closest(".modal__button")) {
    return;
  }
  startSpin();
});

modalButton.addEventListener("click", () => {
  window.open("https://x.com", "_blank", "noopener,noreferrer");
});
