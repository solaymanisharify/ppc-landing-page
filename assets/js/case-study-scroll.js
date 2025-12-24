 "use strict";

      const sticky = document.querySelector(".sticky");
      const stickyParent = document.querySelector(".sticky-parent");
      const horizontal = document.querySelector(".horizontal");

      function horizontalScroll() {
        const parentRect = stickyParent.getBoundingClientRect();

        // Check if we're in the scroll zone
        if (parentRect.top <= 0 && parentRect.bottom > window.innerHeight) {
          // Calculate scroll progress (0 to 1)
          const scrollProgress = -parentRect.top / (parentRect.height - window.innerHeight);

          // Calculate max scroll distance
          const maxScroll = horizontal.scrollWidth - sticky.clientWidth;

          // Apply horizontal transform
          const scrollAmount = scrollProgress * maxScroll;
          horizontal.style.transform = `translateX(-${scrollAmount}px)`;
        }
      }

      // Use requestAnimationFrame for smooth scrolling
      let ticking = false;
      document.addEventListener("scroll", () => {
        if (!ticking) {
          window.requestAnimationFrame(() => {
            horizontalScroll();
            ticking = false;
          });
          ticking = true;
        }
      });