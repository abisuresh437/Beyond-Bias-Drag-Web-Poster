console.log("test")

document.addEventListener('DOMContentLoaded', () => {
    const draggableElements = document.querySelectorAll('.event');
  
    draggableElements.forEach((element) => {
      element.addEventListener('mousedown', dragStart);
    });
  
    function dragStart(e) {
      e.preventDefault(); // Prevent unwanted text selection
      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();
      const offsetX = e.clientX - rect.left;
      const offsetY = e.clientY - rect.top;
  
      function mouseMoveHandler(e) {
        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
      }
  
      function mouseUpHandler() {
        document.removeEventListener('mousemove', mouseMoveHandler);
        document.removeEventListener('mouseup', mouseUpHandler);
        snapElement(element);
      }
  
      document.addEventListener('mousemove', mouseMoveHandler);
      document.addEventListener('mouseup', mouseUpHandler);
    }
  

    function snapElement(element) {
      const threshold = 100; 

      const targets = {
        "maria-carolina-cambre": { left: 0, top: 0 },
        "isabel-machado": { left: window.innerWidth / 2, top: 0 },
        "daniel-wildberger": { left: 0, top: window.innerHeight / 2 },
        "shima-rashnoodi": { left: window.innerWidth / 2, top: window.innerHeight / 2 }
      };
  
      const target = targets[element.id];
      if (target) {
        const currentLeft = parseInt(element.style.left, 10);
        const currentTop = parseInt(element.style.top, 10);
  
        if (Math.abs(currentLeft - target.left) < threshold &&
            Math.abs(currentTop - target.top) < threshold) {
          element.style.left = `${target.left}px`;
          element.style.top = `${target.top}px`;
        }
      }
    }
  });