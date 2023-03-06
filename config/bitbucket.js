module.exports = {
    USERNAME: process.env.BITBUCKET_USER || 'USERNAME',
    PASSWORD: process.env.BITBUCKET_PASSWORD || 'PASSWORD',
    WORKSPACE: process.env.BITBUCKET_WORKSPACE || 'YOUR_WORKSPACE',
    REPO_SLUG: process.env.BITBUCKET_REPO_SLUG || 'storyblok'
}