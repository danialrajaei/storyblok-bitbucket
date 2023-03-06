const Bitbucket = require("bitbucket");
const Bitbucket_configs = require("./config/bitbucket");
const logger = require('npmlog');


let bitbucket;

const authenticate = (user, password) => {
    if (bitbucket) {
        return bitbucket;
    }
    user = user ?? Bitbucket_configs.USERNAME
    password = password ?? Bitbucket_configs.PASSWORD
    if (!user) {
        return Promise.reject()
    }
    const clientOptions = {
        auth: {
            username: user,
            password: password,
        },
    }

    bitbucket = new Bitbucket(clientOptions);
    return bitbucket;
}


export const triggerPipeline = async () => {
    if (!bitbucket) {
        authenticate();
    }
    const pipelinesCreateParam = {
        _body: {
            target: {
                ref_type: "branch",
                type: "pipeline_ref_target",
                ref_name: "main"
            },
            type: ''
        },
        repo_slug: Bitbucket_configs.REPO_SLUG,
        workspace: Bitbucket_configs.WORKSPACE
    };
    try {
        const value = await bitbucket.pipelines.create(pipelinesCreateParam);
        logger.info('BITBUCKET', value)
    } catch (error) {
        console.error('BITBUCKET', error);
    }
}