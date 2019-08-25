export const getTask = () => ({
  description: [
    `Изучить теорию`,
    `Сделать домашку`,
    `Пройти интенсив на соточку`
  ][Math.floor(Math.random() * 3)],
  dueDate: Math.round(Math.random()) ? Date.now() + 1 + Math.floor(Math.random() * 7) * 24 * 60 * 60 * 1000 : Date.now() + 1 + Math.floor(Math.random() * 7 - 7) * 24 * 60 * 60 * 1000,
  repeatingDays: {
    mo: false,
    tu: false,
    we: false,
    th: Boolean(Math.round(Math.random())),
    fr: false,
    sa: false,
    su: false,
  },
  tags: [...new Set([
    `homework`,
    `theory`,
    `practice`,
  ])].filter(() => Math.random() > 0.5),
  color: [
    `black`,
    `yellow`,
    `blue`,
    `green`,
    `pink`,
  ][Math.floor(Math.random() * 5)],
  isFavorite: Boolean(Math.round(Math.random())),
  isArchive: Boolean(Math.round(Math.random())),
});

export const getFilter = () => ([
  {
    title: `All`,
    count: 0,
    checked: true,
  },
  {
    title: `Overdue`,
    count: 0,
    checked: false,
  },
  {
    title: `Today`,
    count: 0,
    checked: false,
  },
  {
    title: `Favorites`,
    count: 0,
    checked: false,
  },
  {
    title: `Repeating`,
    count: 0,
    checked: false,
  },
  {
    title: `Tags`,
    count: 0,
    checked: false,
  },
  {
    title: `Archive`,
    count: 0,
    checked: false,
  },
]);
