import corn from 'node-cron';

export default function SchedulePostCheck() {
  corn.schedule('*/1 * * * *', () => {
    console.log('Running a task every minute');
  });
}