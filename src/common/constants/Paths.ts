const Paths = {
  _: '/api',
  HackerNews: {
    _: '/hacker-news',
    Get: '/all',
    GetLessOrEqualToFiveWords: '/less-or-equal-to-5-words',
    GetMoreThanFiveWords: '/more-than-5-words',
  },
} as const;

export default Paths;
