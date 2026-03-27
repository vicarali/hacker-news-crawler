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
  },
} as const;

export default Paths;
