const wrapIndex = (index, length) => (index + length) % length;

function bindPhotoControls(container, changePhoto) {
  container.querySelector('[data-prev]').addEventListener('click', () => changePhoto(-1));
  container.querySelector('[data-next]').addEventListener('click', () => changePhoto(1));
  container.querySelector('.image-controls').hidden = false;

  container.addEventListener('keydown', (event) => {
    if (!['ArrowLeft', 'ArrowRight'].includes(event.key)) return;
    event.preventDefault();
    changePhoto(event.key === 'ArrowRight' ? 1 : -1);
  });

  let start;
  container.addEventListener('touchstart', (event) => {
    start = event.touches.length === 1 ? event.touches[0] : undefined;
  }, { passive: true });
  container.addEventListener('touchend', (event) => {
    if (!start) return;
    const touch = event.changedTouches[0];
    const horizontal = touch.clientX - start.clientX;
    const vertical = touch.clientY - start.clientY;
    if (Math.abs(horizontal) > 45 && Math.abs(horizontal) > Math.abs(vertical)) {
      changePhoto(horizontal < 0 ? 1 : -1);
    }
    start = undefined;
  }, { passive: true });
}

const hero = document.querySelector('[data-carousel]');
const heroSlides = [...hero.querySelectorAll('[data-slide]')];
const heroPosition = hero.querySelector('.image-position');
let activeHero = 0;
heroPosition.textContent = `1 / ${heroSlides.length}`;
bindPhotoControls(hero, (direction) => {
  heroSlides[activeHero].hidden = true;
  activeHero = wrapIndex(activeHero + direction, heroSlides.length);
  heroSlides[activeHero].hidden = false;
  heroPosition.textContent = `${activeHero + 1} / ${heroSlides.length}`;
});

const dialog = document.querySelector('.lightbox');
if (typeof dialog.showModal === 'function') {
  const galleryLinks = [...document.querySelectorAll('.gallery-link')];
  const frame = dialog.querySelector('.lightbox-frame');
  const caption = dialog.querySelector('figcaption');
  const position = dialog.querySelector('.image-position');
  let activePhoto = 0;
  let opener;

  function showPhoto(index) {
    activePhoto = wrapIndex(index, galleryLinks.length);
    const link = galleryLinks[activePhoto];
    const photo = link.querySelector('.photo-window').cloneNode(true);
    photo.querySelector('img').loading = 'eager';
    frame.replaceChildren(photo);
    caption.textContent = link.closest('figure').querySelector('figcaption').textContent;
    position.textContent = `${activePhoto + 1} / ${galleryLinks.length}`;
  }

  galleryLinks.forEach((link, index) => {
    link.addEventListener('click', (event) => {
      if (event.metaKey || event.ctrlKey || event.altKey || event.shiftKey) return;
      event.preventDefault();
      opener = link;
      showPhoto(index);
      dialog.showModal();
    });
  });
  bindPhotoControls(dialog, (direction) => showPhoto(activePhoto + direction));
  dialog.querySelector('.lightbox-close').addEventListener('click', () => dialog.close());
  dialog.addEventListener('close', () => opener?.focus());
}

const mapButton = document.querySelector('.map-toggle');
const mapPanel = document.getElementById('location-map');
mapButton.hidden = false;
mapButton.addEventListener('click', () => {
  if (!mapPanel.firstElementChild) {
    const map = document.createElement('iframe');
    map.title = 'Google map of Luxury Boys Hostel F-11, Islamabad';
    map.src = mapPanel.dataset.src;
    map.referrerPolicy = 'strict-origin-when-cross-origin';
    map.allowFullscreen = true;
    mapPanel.append(map);
  }
  mapPanel.hidden = !mapPanel.hidden;
  mapButton.setAttribute('aria-expanded', String(!mapPanel.hidden));
  mapButton.textContent = mapPanel.hidden ? 'Show map' : 'Hide map';
});
