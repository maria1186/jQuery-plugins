function walrusBox(amount, interval = 5000, direction = 'left') {
  const box = document.getElementById('walrusBox');
  if (!box) {
    console.warn('walrusBox: #walrusBox not found in DOM');
    return;
  }

  // The parent is the visible area
  const container = box.parentElement;

  // Dynamic container width
  let width = container.offsetWidth;

  // Creating a container for triggers
  const triggerSection = document.createElement('section');
  triggerSection.id = 'walrusBoxTriggers';
  const ul = document.createElement('ul');
  triggerSection.appendChild(ul);
  box.insertAdjacentElement('afterend', triggerSection);

  // Creating triggers (circles)
  let currentId = direction === 'left' ? 1 : amount;
  for (let i = 1; i <= amount; i++) {
    const li = document.createElement('li');
    li.id = i;
    li.className = (i === currentId) ? 'blackTrigger' : 'greyTrigger';
    ul.appendChild(li);
  }

  const triggers = triggerSection.querySelectorAll('li');

  // Slide styles
  box.style.position = 'relative';
  box.style.display = 'flex';
  box.style.left = direction === 'right' ? `-${(amount - 1) * width}px` : '0px';
  box.style.transition = 'left 0.5s ease';

  const slides = box.children;
  for (let slide of slides) {
    slide.style.minWidth = width + 'px';
    slide.style.flexShrink = '0';
  }

  let timeoutId;

  function updateTriggers(activeId) {
    triggers.forEach(trigger => {
      trigger.classList.remove('blackTrigger', 'greyTrigger');
      trigger.classList.add(trigger.id == activeId ? 'blackTrigger' : 'greyTrigger');
    });
  }

  function changeNews() {
    let current = triggerSection.querySelector('.blackTrigger');
    let id = parseInt(current.id, 10);

    if (direction === 'left') {
      id = (id < amount) ? id + 1 : 1;
    } else {
      id = (id > 1) ? id - 1 : amount;
    }

    box.style.left = `-${(id - 1) * width}px`;
    updateTriggers(id);
    timeoutId = setTimeout(changeNews, interval);
  }

  // Start of the cycle
  timeoutId = setTimeout(changeNews, interval);

  // Clicking on triggers
  triggers.forEach(trigger => {
    trigger.addEventListener('click', () => {
      clearTimeout(timeoutId);
      const id = parseInt(trigger.id, 10);
      box.style.left = `-${(id - 1) * width}px`;
      updateTriggers(id);
      timeoutId = setTimeout(changeNews, interval);
    });
  });

  // 🖥️ When resizing, recalculate the width and position
  window.addEventListener('resize', () => {
    width = container.offsetWidth;
    for (let slide of slides) slide.style.minWidth = width + 'px';

    const current = triggerSection.querySelector('.blackTrigger');
    const id = parseInt(current.id, 10);
    box.style.left = `-${(id - 1) * width}px`;
  });
  
}
