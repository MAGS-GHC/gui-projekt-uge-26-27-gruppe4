const icon = document.querySelectorAll('.icon');
const arrow = document.querySelector('.fa-circle-info');
const slidingContent = document.getElementById('sliding-content');

for (let i = 0; i < icon.length; i++) {
    icon[i].addEventListener('click', () => {
        slidingContent.classList.toggle('open');
        slidingContent.classList.toggle('fade');
        arrow.classList.toggle('turn');

        // Disable scrolling and hide scrollbar when the content is open
        if (slidingContent.classList.contains('open')) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
    });
}
