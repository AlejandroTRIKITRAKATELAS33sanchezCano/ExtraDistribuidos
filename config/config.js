module.exports = {
    data: {
        cpu: {
            active: true,
        },
        cpuCurrentspeed: {
            active: true,
        },
        mem: {
            active: true,
        },
    },
    server: {
        port: process.env.PORT ,
        refreshRate: 10
    },
};
