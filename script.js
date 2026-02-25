const workItems = [
  {
    title: "Product UGC Angle",
    thumbnail: "./assets/work-thumbs/work-1.jpg",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1",
  },
  {
    title: "Founder Story Hook",
    thumbnail: "./assets/work-thumbs/work-2.jpg",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1",
  },
  {
    title: "Offer Breakdown",
    thumbnail: "./assets/work-thumbs/work-3.jpg",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1",
  },
  {
    title: "Problem-Solution Ad",
    thumbnail: "./assets/work-thumbs/work-4.jpg",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1",
  },
  {
    title: "Customer POV",
    thumbnail: "./assets/work-thumbs/work-5.jpg",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1",
  },
  {
    title: "Product Demo",
    thumbnail: "./assets/work-thumbs/work-6.jpg",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1",
  },
  {
    title: "Ad Iteration #01",
    thumbnail: "./assets/work-thumbs/work-7.jpg",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1",
  },
  {
    title: "Ad Iteration #02",
    thumbnail: "./assets/work-thumbs/work-8.jpg",
    videoUrl: "https://www.youtube.com/embed/aqz-KE-bpKQ?autoplay=1",
  },
];

const revealElements = document.querySelectorAll(".reveal");
const workGrid = document.getElementById("workGrid");
const modal = document.getElementById("videoModal");
const heroIframe = document.getElementById("heroIframe");
const closeVideoModal = document.getElementById("closeVideoModal");
const scrollToBookButtons = document.querySelectorAll(".scroll-to-book");
const bookSection = document.getElementById("book");
const intro = document.getElementById("intro");
const scrollProgress = document.getElementById("scrollProgress");
const magneticButtons = document.querySelectorAll(".magnetic");

function renderWorkGrid() {
  if (!workGrid) return;

  const cards = workItems
    .map(
      (item, index) => `
        <button class="work-card" type="button" data-video="${item.videoUrl}" aria-label="Play ${item.title}">
          <img src="${item.thumbnail}" alt="${item.title}" loading="lazy" />
          <div class="work-card__overlay">
            <span>${item.title}</span>
          </div>
          <span class="work-card__play">&#9658;</span>
        </button>
      `
    )
    .join("");

  workGrid.innerHTML = cards;

  const workButtons = workGrid.querySelectorAll(".work-card");
  workButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const url = button.dataset.video || "";
      openVideoModal(url);
    });
  });
}

function openVideoModal(videoUrl) {
  if (!modal || !heroIframe) return;
  heroIframe.src = videoUrl;
  modal.showModal();
}

function closeModal() {
  if (!modal || !heroIframe) return;
  modal.close();
  heroIframe.src = "";
}

function initRevealAnimation() {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.2 }
  );

  revealElements.forEach((el) => observer.observe(el));
}

function initScrollButtons() {
  scrollToBookButtons.forEach((button) => {
    button.addEventListener("click", () => {
      bookSection?.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });
}

function initIntro() {
  document.body.classList.add("is-intro-active");

  window.setTimeout(() => {
    intro?.classList.add("is-hidden");
    document.body.classList.remove("is-intro-active");
    document.body.classList.add("page-ready");
  }, 1900);
}

function initScrollProgress() {
  const updateProgress = () => {
    if (!scrollProgress) return;
    const doc = document.documentElement;
    const scrollTop = doc.scrollTop || document.body.scrollTop;
    const scrollHeight = doc.scrollHeight - doc.clientHeight;
    const progress = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    scrollProgress.style.width = `${progress}%`;
  };

  updateProgress();
  window.addEventListener("scroll", updateProgress, { passive: true });
}

function initMagneticButtons() {
  const supportsHover = window.matchMedia("(hover: hover)").matches;
  if (!supportsHover) return;

  magneticButtons.forEach((button) => {
    button.addEventListener("mousemove", (event) => {
      const rect = button.getBoundingClientRect();
      const x = event.clientX - rect.left - rect.width / 2;
      const y = event.clientY - rect.top - rect.height / 2;
      button.style.transform = `translate(${x * 0.12}px, ${y * 0.16}px)`;
    });

    button.addEventListener("mouseleave", () => {
      button.style.transform = "translate(0, 0)";
    });
  });
}

closeVideoModal?.addEventListener("click", closeModal);
modal?.addEventListener("click", (event) => {
  const target = event.target;
  if (target === modal) closeModal();
});

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && modal?.open) closeModal();
});

renderWorkGrid();
initIntro();
initRevealAnimation();
initScrollButtons();
initScrollProgress();
initMagneticButtons();
