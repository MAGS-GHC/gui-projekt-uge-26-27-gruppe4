const zones = document.querySelectorAll('.zone');
    zones.forEach(zone => {
      zone.addEventListener('mouseover', () => {
        zone.classList.add('highlight');
      });

      zone.addEventListener('mouseout', () => {
        zone.classList.remove('highlight');
      });
    });