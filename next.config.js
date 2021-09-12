const withImages = require('next-images')

module.exports = (

    withImages(),
    {
        eslint: {
            ignoreDuringBuilds: true,
        },
    }
)
