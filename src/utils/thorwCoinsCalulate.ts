export function calculate(count: number, gap: number): number {
    let sum: number = 0;
    let condition: number = 0;
    let j: number = 0;
    for (let i: number = 0; i < count; i++) {
      condition = 0;
      for(j = 1; ; j++){
        let randomInt: number = Math.floor(Math.random() * 2);
        if (randomInt == 0) {
          condition--;
        } else {
          condition++;
        }
        if(Math.abs(condition) >= gap) break;
      }
      sum += j;
    }
    return sum / count;
  }