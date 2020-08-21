import moment from 'moment';

export function getEventDateString(date){
  let dateText = '';
  if(date) {
    if(new Date() < new Date(date)) { // if the scheduled date is in the future...
      dateText = "Scheduled for " + moment(date).format("MMMM DD, YYYY");
    } else {
      dateText = "Given on " + moment(date).format("MMMM DD, YYYY");
    }
  } else {
    dateText = "Date To Be Decided";
  }

  return dateText;
}