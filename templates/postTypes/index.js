// templates/postTypes/index.js
import { NEWS_POST_TEMPLATE } from './news';
import { SERVICES_POST_TEMPLATE } from './services';
// import { JOBS_POST_TEMPLATE } from './jobs'; etc...

export const POST_TYPE_TEMPLATES = {
  news: {
    key: 'news',
    label: 'News Article',
    template: NEWS_POST_TEMPLATE,
  },
  services: {
    key: 'services',
    label: 'Service',
    template: SERVICES_POST_TEMPLATE,
  },
  // jobs: { key: 'jobs', label: 'Job', template: JOBS_POST_TEMPLATE },
};