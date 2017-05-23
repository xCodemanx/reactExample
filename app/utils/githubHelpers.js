// app/utils/githubHelpers.js
import axios from 'axios'

var id = "0370655df85744e6b9d3";
var sec = "5a3c024001d5c935571e09d42f346cd044796b37";
var param = "?client_id=" + id + "&client_secret=" + sec;

function getUserInfo(username) {
    return axios.get('https://api.github.com/users/' + username + param);
}

function getRepos(username) {
    return axios.get('https://api.github.com/users/' + username + '/repos' + param + '&per_page=100');
}

function getTotalStars(repos) {
    return repos.data.reduce(function (prev, current) {
        return prev + current.stargazers_count
    }, 0)
}

function getPlayersData(player) {
    return getRepos(player.login)
        .then(getTotalStars)
        .then(function (totalStars) {
            return {
                followers: player.followers,
                totalStars: totalStars
            }
        })
}

function calculateScores(players) {
    return [
        players[0].followers * 3 + players[0].totalStars,
        players[1].followers * 3 + players[1].totalStars
    ]
}

var helpers = {
    getPlayersInfo: function (players) {
        return axios.all(players.map(function (username) {
            return getUserInfo(username)
        }))
            .then(function (info) {
                return info.map(function (user) {
                    return user.data
                })
            })
            .catch(function (err) { console.warn('Error in getPlayersInfo: ', err) })
    }, battle: function (players) {
        var playerOneData = getPlayersData(players[0]);
        var playerTwoData = getPlayersData(players[1]);
        return axios.all([playerOneData, playerTwoData])
            .then(calculateScores)
            .catch(function (err) { console.warn('Error in getPlayersInfo: ', err) })
    }
};

export default helpers