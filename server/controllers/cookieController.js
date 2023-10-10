const cookieController = {};

cookieController.setUserCookie = (req, res, next) => {
  console.log('made it to set User Cookie')
  res.cookie('userID', res.locals.user._id);
  return next();
}

cookieController.setSSIDCookie = (req, res, next) => {
  console.log('made it to set SSID');
  const ssid = Math.floor(Math.random() * 1000000000) + 1;
  res.cookie('ssid', ssid, {httpOnly: true});
  res.locals.cookie = ssid;
  return next();
}

cookieController.wipeCookies = (req, res, next) => {
  res.clearCookie('userID');
  res.clearCookie('ssid');
  next();
}
module.exports = cookieController;