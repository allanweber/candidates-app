export class ApplicationUtilities {
  static getStatusColor(status: string): string {
    if (status === 'PENDING') {
      return 'hsl(0, 0%, 4%)';
    } else if (status === 'ACCEPTED') {
      return 'hsl(204, 86%, 53%)';
    } else if (status === 'DONE') {
      return 'hsl(141, 71%, 48%)';
    } else if (status === 'ERROR') {
      return 'hsl(348, 100%, 61%)';
    } else if (
      status === 'DENIED' ||
      status === 'NOT_INTERESTING' ||
      status === 'NOT_MY_PROFILE' ||
      status === 'NOT_MY_SALARY' ||
      status === 'NO_EXPERIENCE' ||
      status === 'OTHER'
    ) {
      return '#FF9933';
    } else {
      return 'hsl(0, 0%, 4%)';
    }
  }
}
