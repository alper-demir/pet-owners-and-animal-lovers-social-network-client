const calculateTimeAgo = (createdAt) => {
    const now = new Date();
    const postDate = new Date(createdAt);

    const timeDifference = now - postDate;

    const minute = 60 * 1000;
    const hour = minute * 60;
    const day = hour * 24;
    const week = day * 7;
    const month = day * 30;
    const year = day * 365;

    if (timeDifference < minute) {
        return Math.floor(timeDifference / 1000) + ' seconds ago';
    } else if (timeDifference < hour) {
        return Math.floor(timeDifference / minute) === 1 ? Math.floor(timeDifference / minute) + ' minute ago' : Math.floor(timeDifference / minute) + ' minutes ago'
    } else if (timeDifference < day) {
        return Math.floor(timeDifference / hour) === 1 ? Math.floor(timeDifference / hour) + ' hour ago' : Math.floor(timeDifference / hour) + ' hours ago'
    } else if (timeDifference < week) {
        return Math.floor(timeDifference / day) === 1 ? Math.floor(timeDifference / day) + ' day ago' : Math.floor(timeDifference / day) + ' days ago'
    } else if (timeDifference < month) {
        return Math.floor(timeDifference / week) === 1 ? Math.floor(timeDifference / week) + ' week ago' : Math.floor(timeDifference / week) + ' weeks ago'
    } else if (timeDifference < year) {
        return Math.floor(timeDifference / month) === 1 ? Math.floor(timeDifference / month) + ' month ago' : Math.floor(timeDifference / month) + ' months ago'
    } else {
        return Math.floor(timeDifference / year) === 1 ? Math.floor(timeDifference / year) + ' year ago' : Math.floor(timeDifference / year) + ' years ago'
    }
}

export default calculateTimeAgo;