
export function donnager() {
  fetch('/public/images/donnager_ship.svg')
      .then(response => response.text())
      .then(svgContent => {
        document.getElementById('svg-container').innerHTML = svgContent;
        const svgElement = document.querySelector('#svg-container svg');
        let posX = 0;
        const speed = 2;

        function moveSvg() {
          posX += speed;
          svgElement.style.transform = `translateX(${posX}px`;
          if (posX > window.innerWidth) {
            posX = -svgElement.getBoundingClientRect().width;
          }
          requestAnimationFrame(moveSvg)
        }

        moveSvg();
      }).catch(err => console.error('failed to load svg:', err));
}
