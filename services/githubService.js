import axios from "axios";

export const getGithubProfile = async (username) => {

    const response = await axios.get(
        `https://api.github.com/users/${username}`,
        {
            headers: {
                "User-Agent": "github-profile-analyzer",
                "Authorization": `Bearer ${process.env.GITHUB_TOKEN}`,
                "Accept": "application/vnd.github+json"
            }
        }
    );

    return response.data;
};
