import moment from 'moment';


export const calculateDiffToNow = beginningTime => {
  /** Return ms diff between the beginning and now **/
  return moment.duration(moment().diff(beginningTime)).asMilliseconds()
}

export const getTimerAsText = ms => {
  return ms && moment.utc(ms).format('HH:mm:ss');
}