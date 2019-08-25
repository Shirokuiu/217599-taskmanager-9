export const APP_SETTINGS = {
  totalTasks: 16,
  tasksToShow: 8,
  loadTaskItems: 8,
  currentTasks: 0,
};

export const Position = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`,
};

export const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;
  return newElement.firstChild;
};

export const render = (container, component, place) => {
  switch (place) {
    case Position.AFTERBEGIN:
      container.prepend(component);
      break;
    case Position.BEFOREEND:
      container.append(component);
      break;
  }
};

export const unrender = (component) => {
  if (component) {
    component.remove();
  }
};

