// ----------------------------
// Amazon PPC Image

const amazonImgSection = document.querySelector(".amazon-content-img");
const scrollContainer = document.querySelector(".amazon-ppc-content");
const blocks = document.querySelectorAll(".amazon-ppc-content-text");
const image = document.getElementById("ppcImage");

function updateContentOnScroll() {
  const rect = amazonImgSection.getBoundingClientRect();
  const sectionTop = window.scrollY + rect.top;
  const sectionHeight = rect.height;

  // Calculate scroll progress relative to the section
  const scrollY = window.scrollY;
  const progress = Math.min(Math.max((scrollY - sectionTop + window.innerHeight / 2) / sectionHeight, 0), 1);
  const index = Math.round(progress * (blocks.length - 1));
  const activeBlock = blocks[index];

  if (activeBlock) {
    // Update image if changed
    const img = activeBlock.dataset.image;
    const current = image.src.split("/").pop();
    if (img && img !== current) {
      image.src = "assets/images/Desktop/" + img;
    }

    // Highlight active block
    blocks.forEach((block, i) => {
      if (i === index) {
        block.style.opacity = 1;
      } else {
        // block.style.opacity = 0.3;
      }
    });

    // Scroll the inner container so the active block is vertically centered
    const scrollTop = activeBlock.offsetTop - scrollContainer.clientHeight / 2 + activeBlock.clientHeight / 2;
    scrollContainer.scrollTo({
      top: scrollTop,
      behavior: "smooth", // or 'auto' if you don't want smooth
    });
  }
}

window.addEventListener("scroll", updateContentOnScroll);
window.addEventListener("resize", updateContentOnScroll);

// ----------------------------
// Init
// ----------------------------
// updateCarousel();
// updateContentOnScroll();

//interactive timeline
let currentIdx = 1;
const dots = document.querySelectorAll(".dot");
const mainImage = document.getElementById("timeline-main-image");
const labels = document.querySelectorAll(".timeline-label");

dots.forEach((dot) => {
  dot.addEventListener("click", () => {
    const dotsArr = Array.from(dots);
    const newIndex = Number(dot.dataset.index);

    dots.forEach((d) => d.classList.remove("active"));
    dot.classList.add("active");

    mainImage.src = dot.dataset.image;

    document.querySelectorAll(".timeline-text").forEach((text) => {
      text.classList.remove("timeline-text-visible");
    });

    labels.forEach((label) => label.classList.remove("timeline-label-active"));

    const targetId = dot.dataset.target;
    const activeContent = document.querySelector(`#${targetId} .timeline-text`);
    if (activeContent) {
      if (newIndex > currentIdx) activeContent.classList.add("from-bottom");
      else activeContent.classList.add("from-top");
      void activeContent.offsetHeight;
      activeContent.classList.add("timeline-text-visible");
    }

    if (activeContent) activeContent.classList.add("timeline-text-visible");

    const activeLabel = document.querySelector(`#${targetId} h4`);
    if (activeLabel) activeLabel.classList.add("timeline-label-active");

    // Reset all transforms
    document.getElementById("content-broad").style.transform = "";
    document.getElementById("content-phrase").style.transform = "";
    document.getElementById("content-exact").style.transform = "";
    document.querySelector(".timeline-dot-1").style.transform = "";
    document.querySelector(".timeline-dot").style.transform = "";
    document.querySelector(".timeline-dot-3").style.transform = "";

    const width = window.innerWidth;
    let contentOffset, dotOffset;

    if (width > 1200) {
      // desktop
      contentOffset = {
        broad: 24,
        phrase: 0,
        exact: -80,
      };
      dotOffset = {
        broad: 100,
        phrase: 90,
        exact: -80,
      };
    } else if (width >= 768) {
      // tablet
      contentOffset = {
        broad: 18,
        phrase: 0,
        exact: -60,
      };
      dotOffset = {
        broad: 70,
        phrase: 0,
        exact: -60,
      };
    } else {
      // mobile
      contentOffset = {
        broad: 12,
        phrase: -22,
        exact: -40,
      };
      dotOffset = {
        broad: 50,
        phrase: 265,
        exact: -280,
      };
    }
    if (window.innerWidth < 640) {
      document.querySelectorAll(".timeline-image-mobile").forEach((img) => {
        // remove previous state
        img.classList.remove("active", "from-bottom", "from-top");

        // reset clip-path for future animation
        img.style.webkitClipPath = "";
        img.style.clipPath = "";
      });

      const activeBlock = document.getElementById(targetId);
      const mobileImg = activeBlock.nextElementSibling;

      if (mobileImg && mobileImg.classList.contains("timeline-image-mobile")) {
        // decide direction
        if (newIndex > currentIdx) {
          // opening from bottom → top
          mobileImg.classList.add("from-bottom");
        } else if (newIndex < currentIdx) {
          // opening from top → bottom
          mobileImg.classList.add("from-top");
        }
        // else, same item clicked, default top → bottom
        else {
          mobileImg.classList.add("from-top");
        }

        // FORCE REPAINT
        void mobileImg.offsetWidth;

        // show image
        mobileImg.classList.add("active");
      }
    }
    currentIdx = newIndex;

    // Apply transforms for content
    if (targetId === "content-broad") {
      document.getElementById("content-phrase").style.transform = `translateY(${contentOffset.broad}px)`;
      document.querySelector(".timeline-dot").style.transform = `translateY(${dotOffset.phrase}px)`;
      const phraseImg = document.querySelector('.timeline-image-mobile[data-target="content-phrase"]');
      const phraseContent = document.getElementById("content-phrase");
      if (window.innerWidth < 640) {
        phraseImg.style.marginTop = "250px";
        // phraseContent.style.transform = `translateY(${contentOffset.broad * -1}px)`;
      }
    } else if (targetId === "content-phrase") {
      if (window.innerWidth < 640) {
        const phraseImg = document.querySelector('.timeline-image-mobile[data-target="content-phrase"]');
        const phraseContent = document.getElementById("content-phrase");
        if (phraseImg) {
          phraseImg.style.marginTop = "0px";
          phraseContent.style.transform = `translateY( ${contentOffset.phrase}px)`;
        }
      }
      const exactImg = document.querySelector('.timeline-image-mobile[data-target="content-exact"]');
      if (exactImg) {
        exactImg.style.marginTop = "300px";
      }
    } else if (targetId === "content-exact") {
      // document.getElementById('content-phrase').style.transform = `translateY(${contentOffset.exact * -1}px)`;
      document.querySelector(".timeline-dot-3").style.transform = `translateY(${dotOffset.exact}px)`;
      document.getElementById("content-exact").style.transform = `translateY(${0}px)`;
      if (window.innerWidth < 640) {
        document.getElementById("content-exact").style.transform = `translateY(${-200}px)`;
        const exactImg = document.querySelector('.timeline-image-mobile[data-target="content-exact"]');
        const phraseContent = document.getElementById("content-phrase");
        if (exactImg) {
          exactImg.style.marginTop = "200px";
        }
      }
    }
  });
});

// Enhanced Accordion JS - Remove border from previous item for positions 2,3,4
document.addEventListener("DOMContentLoaded", function () {
  const headers = document.querySelectorAll(".accordion-header");
  const items = document.querySelectorAll(".accordion-item"); // All items for indexing

  headers.forEach((header, index) => {
    // index starts at 0
    header.addEventListener("pointerdown", function (e) {
      // Prevent default if needed (e.g., for images), but optional here
      e.preventDefault();

      const content = this.nextElementSibling;
      const currentItem = this.parentElement; // Current .accordion-item
      const isActive = content.classList.contains("active");
      const position = index + 1; // 1-based position (1st, 2nd, etc.)

      // Close all other accordions and reset borders
      headers.forEach((h) => {
        const c = h.nextElementSibling;
        const i = h.parentElement;
        h.classList.remove("active");
        c.classList.remove("active");
        i.classList.remove("active");
        i.classList.remove("no-border"); // Restore border if it was removed
      });

      // If opening (not already active)
      if (!isActive) {
        // Open current
        this.classList.add("active");
        content.classList.add("active");
        currentItem.classList.add("active");

        // For ANY position >=2: Remove border from previous item (includes last item)
        if (position >= 2) {
          const previousItem = items[index - 1]; // Previous .accordion-item
          if (previousItem) {
            previousItem.classList.add("no-border"); // Hide its bottom border
          }
        }
      }
      // Note: When closing, borders restore automatically via the reset loop above
    });
  });
});
