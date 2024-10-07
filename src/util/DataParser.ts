export function Parser(data: string): string[] {
  let splitedByComma = data.split(',');
  let emailAndusername: string[] = [];
  for (let i = 0; i < splitedByComma.length; i++) {
    let splitedByColon = splitedByComma[i].split(':');
    emailAndusername.push(splitedByColon[1]);
  }
  return emailAndusername;
}
