import { Octokit, App } from "octokit";

export default async function Authorization() {
    const octokit = new Octokit({
        authStrategy: createAppAuth,
        auth: {
            appId: 1,
            privateKey: "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",
            installationId: 123,
        },
    });


    const {
        data: {slug},
    } = await octokit.rest.apps.getAuthenticated();
}