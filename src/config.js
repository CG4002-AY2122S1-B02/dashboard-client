export const emptySessionData = {
    position: [],
    user_1: null,
    user_2: null,
    user_3: null,
    empty: true
}

export const DashboardServerPath = "localhost:8081/apis/"
export const User1Port = "8881/"
export const User2Port = "8882/"
export const User3Port = "8883/"
const HTTP = "http://"

//stream api
export const PathStreamAll = "ws://" + DashboardServerPath + "stream/ws/"
export const PathPositionStream = "ws://" + DashboardServerPath + "stream/position"
export const PathStreamCommand = HTTP + DashboardServerPath + "stream/command"

//attributes
export const PathDanceMove = "dance+move"
export const PathAccuracy = "accuracy"
export const PathEpochMs = "epoch+ms"

//account api
export const PathLogin = HTTP + DashboardServerPath + "account/login"
export const PathLogout = HTTP + DashboardServerPath + "account/logout"
export const PathCreateUsers = HTTP + DashboardServerPath + "account/users/register"

//session api
export const PathUploadSession = HTTP + DashboardServerPath + "session/upload"
export const PathGetCurrentSession = HTTP + DashboardServerPath + "session/current"

//dance api
export const PathDanceOverview = HTTP + DashboardServerPath + "dance/overview"
export const PathDanceProgress = HTTP + DashboardServerPath + "dance/progress"