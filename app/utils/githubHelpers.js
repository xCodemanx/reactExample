// app/utils/githubHelpers.js
import axios from 'axios'

const id = "0370655df85744e6b9d3";
const sec = "5a3c024001d5c935571e09d42f346cd044796b37";
const param = `?client_id=${id}&client_secret=${sec}`;

function getUserInfo(username = 'himaeng') {
    return axios.get(`https://api.github.com/users/${username + param}`);
}

function getRepos(username = 'himaeng') {
    return axios.get(`https://api.github.com/users/${username}/repos${param}&per_page=100`);
}

function getTotalStars(repos) {
    return repos.data.reduce((prev, current) => {
        return prev + current.stargazers_count
    }, 0)
}

function getPlayersData(player) {
    return getRepos(player.login)
        .then(getTotalStars)
        .then((totalStars) => {
            return {
                followers: player.followers,
                totalStars
            }
        })
}

function calculateScores(players) {
    return [
        players[0].followers * 3 + players[0].totalStars,
        players[1].followers * 3 + players[1].totalStars
    ]
}

const helpers = {
    getPlayersInfo(players) {
        return axios.all(players.map((username) => {
            return getUserInfo(username)
        }))
            .then((info) => {
                return info.map((user) => {
                    return user.data
                })
            })
            .catch((err) => { console.warn('Error in getPlayersInfo: ', err) })
    }, battle(players) {
        const playerOneData = getPlayersData(players[0]);
        const playerTwoData = getPlayersData(players[1]);
        return axios.all([playerOneData, playerTwoData])
            .then(calculateScores)
            .catch((err) => { console.warn('Error in getPlayersInfo: ', err) })
    }
};

export default helpers