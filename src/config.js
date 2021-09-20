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