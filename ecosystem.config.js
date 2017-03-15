module.exports = {
  /**
   * Application configuration section
   * http://pm2.keymetrics.io/docs/usage/application-declaration/
   */
    apps: [
        {
            name: 'rss-source',
            script: 'src/app.js',
            env: {
                COMMON_VARIABLE: 'true',
                NODE_SERVER: 'true',
                NODE_ENV: 'beta'
            },
            env_production: {
                NODE_SERVER: 'true',
                NODE_ENV: 'production'
            }
        }
    ],

  /**
   * Deployment section
   * http://pm2.keymetrics.io/docs/usage/deployment/
   */
    deploy: {
        production: {
            user: 'root',
            host: '122.114.42.81',
            port: '2222',
            ref: 'origin/master',
            repo: 'git@github.com:XueRainey/rss-source.git',
            path: '/root/rss-source',
            'post-deploy': 'git pull && npm install && pm2 startOrRestart ecosystem.config.js --env production',
            env: {
                NODE_ENV: 'production'
            }
        }
    }
};