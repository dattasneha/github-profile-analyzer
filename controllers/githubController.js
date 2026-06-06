import db from '../config/db.js';
import { getGithubProfile } from '../services/githubService.js';

const analyzeProfile = async (req, res) => {

    try {

        const { username } = req.params;

        const profile = await getGithubProfile(username);

        const createdDate = new Date(profile.created_at);
        const today = new Date();

        const accountAgeDays = Math.floor(
            (today - createdDate) / (1000 * 60 * 60 * 24)
        );

        const sql = `
        INSERT INTO github_profiles
        (
            username,
            name,
            public_repos,
            followers,
            following,
            public_gists,
            account_age_days,
            profile_url,
            avatar_url
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            public_repos=VALUES(public_repos),
            followers=VALUES(followers),
            following=VALUES(following),
            public_gists=VALUES(public_gists),
            account_age_days=VALUES(account_age_days)
        `;

        db.query(
            sql,
            [
                profile.login,
                profile.name,
                profile.public_repos,
                profile.followers,
                profile.following,
                profile.public_gists,
                accountAgeDays,
                profile.html_url,
                profile.avatar_url
            ],
            (err) => {

                if (err) {
                    return res.status(500).json(err);
                }

                res.json({
                    success: true,
                    data: profile
                });
            }
        );

    } catch (error) {

        res.status(500).json({
            message: error.message
        });
    }
};

const getAllProfiles = (req, res) => {

    db.query(
        'SELECT * FROM github_profiles',
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            res.json(results);
        }
    );
};

const getSingleProfile = (req, res) => {

    const { username } = req.params;

    db.query(
        'SELECT * FROM github_profiles WHERE username=?',
        [username],
        (err, results) => {

            if (err) {
                return res.status(500).json(err);
            }

            if (results.length === 0) {

                return res.status(404).json({
                    message: 'Profile not found'
                });
            }

            res.json(results[0]);
        }
    );
};

export {
    analyzeProfile,
    getAllProfiles,
    getSingleProfile
};