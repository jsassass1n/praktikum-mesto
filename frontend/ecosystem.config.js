require('dotenv').config({ path: '.env.deploy' });

const {
  DEPLOY_USER, DEPLOY_HOST, DEPLOY_PATH, DEPLOY_REF = 'origin/master',
} = process.env;

module.exports = {
  apps: [{
    name: 'frontend',
    script: 'npm',
    args: 'start',
    cwd: './',
  }],

  deploy: {
    production: {
      user: DEPLOY_USER,
      host: DEPLOY_HOST,
      ref: DEPLOY_REF,
      repo: 'https://github.com/jsassass1n/praktikum-mesto.git',
      path: DEPLOY_PATH,
      'pre-deploy': `
        rm -rf * &&
        scp .env ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH} &&
        scp .env.deploy ${DEPLOY_USER}@${DEPLOY_HOST}:${DEPLOY_PATH}
      `,
      'post-deploy': 'npm i && npm run build && pm2 reload ecosystem.config.js --only frontend',
      'clone': true
    },
  },
};
