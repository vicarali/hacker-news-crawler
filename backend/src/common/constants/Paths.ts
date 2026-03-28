const Paths = {
  _: '/api',
  Users: {
    _: '/users',
    Get: '/all',
    Add: '/add',
    Update: '/update',
    Delete: '/delete/:id',
  },
  HackerNews: {
    _: '/hacker-news',
    Get: '/all',
    GetLessOrEqualToFiveWords: '/less-or-equal-to-5-words',
    GetMoreThanFiveWords: '/more-than-5-words',
  },
} as const;

export default Paths;
