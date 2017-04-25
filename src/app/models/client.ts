import { GuidHelper } from '../helpers/guid.helper';

export class Client {
  public name: string;
  public clientId: string;
  public address: string;

  constructor(name?: string, clientId?: string, address?: string) {
    this.name = name || '';
    this.clientId = clientId || GuidHelper.generateGUID();
    this.address = address || '';
  }
}
