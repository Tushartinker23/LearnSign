module.exports = {
    apps: [{
        name: "nestjs-app",
        script: "./dist/main.js",
        cwd: "/var/www/html/websitev2/backend/",
        watch: true,
        // env: {
        //     NODE_ENV: "production",
        // }
        // env: {
        //     NODE_ENV: 'development'
        // },
        env: {
            NODE_ENV: 'production'
        }
    }]
};

// module.exports = {
//     apps : [{
//       name: "newapp",
//       script: "./dist/main.js",
//       cwd: "/var/www/html/websitev2/backend",
//       instances: 1,
//       autorestart: true,
//       watch: true,
//       max_memory_restart: '1G',
//       env: {
//         NODE_ENV: 'development'
//       },
//       env_production: {
//         NODE_ENV: 'production'
//       }
//     }]
//   };